import psycopg2

from src.models.dao.db_access import DBAccess
from src.models.dao.helpers.packager import Packager


class BackEnd:
    @classmethod
    def create_element(cls, model, user_id=None, prod_id=None):
        """
           Creates a new element within the corresponding Entity Model table in the database.

        :param prod_id:
        :param user_id:
        :param model: Entity Model
        :return: A copy of the information added to the database (same Entity Model as the model given)
        """
        if model.__class__.__name__ == 'UserModel':
            return cls.__db_fetch_one(
                """
                INSERT INTO usr (first_name, last_name, created_on, valid, password, phone, admin) 
                VALUES ('{}', '{}', current_timestamp, false, '{}', '{}', false) 
                RETURNING *
                """.format(
                    model.get_first_name(),
                    model.get_last_name(),
                    model.get_password(),
                    model.get_phone_num()),
                'UserModel'
            )

        elif model.__class__.__name__ == 'ProductModel':
            return cls.__db_fetch_one(
                """
                INSERT INTO products (name, description, price, category, stock, visible) \n
                VALUES ('{}', '{}', {}, '{}', {}, true)
                RETURNING *
                """.format(
                    model.get_name(),
                    model.get_desc(),
                    model.get_price(),
                    model.get_category(),
                    model.get_stock()
                ),
                'ProductModel'
            )

        elif model.__class__.__name__ == 'OrderModel':
            if user_id:
                # Since orders are divided between tables the process is divided in parts
                db_connection = DBAccess().connect_to_db()
                cursor = db_connection.cursor()

                try:
                    # Create the order
                    cursor.execute(
                        """
                        INSERT INTO orders (user_id, time_of_order)
                        VALUES ({}, current_timestamp)
                        RETURNING order_id, time_of_order
                        """.format(user_id)
                    )

                    orders_response = cursor.fetchone()

                    model.set_order_id(orders_response[0])
                    model.set_time_of_order(str(orders_response[1]))

                    # Add the products to the order
                    for item in model.get_product_list():
                        cursor.execute(
                            """
                            INSERT INTO order_products (order_id_fk, product_name, product_description, price_sold, 
                            quantity_bought) 
                            VALUES ({}, '{}', '{}', {}, {})
                            """.format(model.get_order_id(),
                                       item.get_name(),
                                       item.get_description(),
                                       item.get_price_sold(),
                                       item.get_quantity_bought()
                                       )
                        )

                    cursor.execute(
                        """
                        SELECT SUM(price_sold * quantity_bought) AS total, SUM(quantity_bought) AS total_order_quantity
                        FROM orders INNER JOIN order_products op ON orders.order_id = op.order_id_fk
                        WHERE order_id = {}
                        """.format(model.get_order_id())
                    )

                    products_response = cursor.fetchone()
                    model.set_order_total(products_response[0])
                    model.set_total_product_quantity(products_response[1])

                except psycopg2.Error as e:
                    print(e)
                    pass

                db_connection.commit()
                db_connection.close()

                return model

        elif model.__class__.__name__ == 'LikedListModel':
            # TODO: implement logic
            cls.__db_run_command(
                """
                INSERT INTO likedlist (user_id, product_id, time_like)
                VALUES ('{}','{}', current_timestamp)
                """.format(
                    user_id,
                    prod_id
                )
            )
            return "goomba"

        elif model.__class__.__name__ == 'CartModel':
            return cls.__db_run_command(
                """
                INSERT INTO cart (product_id, user_id, product_quantity, product_price)
                VALUES ({}, {}, {}, {})
                """.format(
                    model.get_product_id(),
                    model.get_user_id(),
                    model.get_product_quantity(),
                    model.get_product_price()
                )
            )

    @classmethod
    def get_element(cls, model, pk, select_attributes: str, helper=None):
        """
            Queries the corresponding entity table in the database for the given primary key.

        :param model: class instance of the desired Entity Model
        :param pk: primary key corresponding to the Entity Model
        :param select_attributes: attributes to retrieve from the database
        :param helper: in the case of the liked list, the prod_id that is being liked/disliked
        :return: Desired Entity Model with the information corresponding to the primary key queried
        """
        if model.__class__.__name__ == 'UserModel':
            # If the where_clause_statement is not empty
            # TODO: What happens if there are no results?
            return cls.__db_fetch_one(
                """
                    SELECT {}
                    FROM usr
                    WHERE user_id = {}
                    """.format(select_attributes, pk),
                'UserModel'
            )

        elif model.__class__.__name__ == 'ProductModel':
            return cls.__db_fetch_one(
                """
                    SELECT {}
                    FROM products
                    WHERE product_id = {}
                    """.format(select_attributes, pk),
                'ProductModel'
            )

        elif model.__class__.__name__ == 'OrderModel':
            from src.models.order import OrderModel
            from src.models.order import OrderProductDetails

            order = OrderModel()

            db_connection = DBAccess().connect_to_db()
            cursor = db_connection.cursor()

            try:
                # Get the main order details
                cursor.execute(
                    """
                    SELECT user_id, time_of_order
                    FROM orders
                    WHERE order_id = {}
                    """.format(pk)
                )

                db_response = cursor.fetchone()

                order.set_order_id(pk)
                order.set_user_id(db_response[0])
                order.set_time_of_order(str(db_response[1]))

                # Create a full OrderModel with all the products corresponding to it within
                if select_attributes == 'full':

                    # This could probably be applied/moved to the packager, however time is not on our side D;

                    # Add the products to the order queried
                    cursor.execute(
                        """
                        SELECT product_name, product_description, price_sold, quantity_bought 
                        FROM order_products
                        WHERE order_id_fk = {}
                        """.format(pk)
                    )

                    db_response = cursor.fetchall()
                    order.set_product_list([])

                    # Inhabit the order's product list
                    for item in db_response:
                        product = OrderProductDetails()
                        product.tuple_to_model(item)

                        order.add_product_to_model(product)

                    cursor.execute(
                        """
                        SELECT SUM(price_sold * quantity_bought) AS total, SUM(quantity_bought) AS total_order_quantity
                        FROM orders INNER JOIN order_products op ON orders.order_id = op.order_id_fk
                        WHERE order_id = {}
                        """.format(pk)
                    )

                    db_response = cursor.fetchone()
                    order.set_order_total(db_response[0])
                    order.set_total_product_quantity(db_response[1])

                    return order

                # Return only the order, its user and the time it was created
                elif select_attributes == 'order':
                    return order
                else:
                    raise AttributeError("The requested order details are not supported.")

            except psycopg2.Error as e:
                print(e)

                db_connection.commit()
                db_connection.close()

                return None

        elif model.__class__.__name__ == 'LikedListModel':
            if helper is not None:
                return cls.__db_fetch_one(
                    """
                    SELECT {}
                    FROM likedlist
                    WHERE product_id={} AND user_id={}
                    """.format(select_attributes, pk, helper),
                    'LikedListModel'
                )
            else:
                return cls.__db_fetch_one(
                    """
                    SELECT {}
                    FROM likedlist
                    WHERE product_id={}
                    """.format(select_attributes, pk),
                    'LikedListModel'
                )
        elif model.__class__.__name__ == 'CartModel':
            # TODO: implement logic
            return "goomba"

    @classmethod
    def delete_element(cls, model, pk: int, prod_id=None):
        """
            Completely removes a row from the corresponding table.

        :param prod_id: used for queries that have to do with LikedList and Cart
        :param model: class instance of the desired Entity Model
        :param pk: primary key corresponding to the Entity Model
        :return: boolean if the deletion was successfully completed
        """

        # TODO: Make the function return the boolean on completion
        if model.__class__.__name__ == 'UserModel':
            try:
                cls.__db_run_command(
                    """
                    DELETE FROM usr
                    WHERE user_id = {}
                    """.format(pk)
                )
                return True
            except psycopg2.Error as e:
                print(e)
                return False

        elif model.__class__.__name__ == 'ProductModel':
            try:
                cls.__db_run_command(
                    """
                    DELETE FROM products
                    WHERE product_id = {}
                    """.format(pk)
                )
                return True
            except psycopg2.Error as e:
                print(e)
                return False

        elif model.__class__.__name__ == 'OrderModel':
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'LikedListModel':
            if prod_id is not None:
                try:
                    cls.__db_run_command(
                        """
                        DELETE FROM likedlist
                        WHERE user_id = {} and product_id={}
                        """.format(pk, prod_id)
                    )
                    return True
                except psycopg2.Error as e:
                    print(e)
                    return False
            else:
                try:
                    cls.__db_run_command(
                        """
                        DELETE FROM likedlist
                        WHERE user_id = {}
                        """.format(pk)
                    )
                    return True
                except psycopg2.Error as e:
                    print(e)
                    return False

        elif model.__class__.__name__ == 'CartModel':
            if prod_id is not None:
                try:
                    cls.__db_run_command(
                        """
                        DELETE FROM cart
                        WHERE user_id = {} AND product_id = {}
                        """.format(pk, prod_id)
                    )
                    return True
                except psycopg2.Error as e:
                    print(e)
                    return False
            else:
                try:
                    cls.__db_run_command(
                        """
                        DELETE FROM cart
                        WHERE user_id = {}
                        """.format(pk)
                    )
                    return True
                except psycopg2.Error as e:
                    print(e)
                    return False

    @classmethod
    def get_all_elements(cls, model, select_attributes: str, filter_clause: str):
        """
            Queries the database for all the elements of the given corresponding Entity.

        :param model: class instance of the desired Entity Model
        :param select_attributes: attributes desired from the query
        :param filter_clause: specific filters desired for the query
        :return: list containing the desired Entity Models of matching query results
        """
        if model.__class__.__name__ == 'ProductModel':

            # If the where_clause_statement is not empty
            if filter_clause:
                return cls.__db_fetch_all(
                    """
                    SELECT {}
                    FROM products
                    WHERE {}
                    """.format(select_attributes, filter_clause),
                    'ProductModel'
                )
            else:
                return cls.__db_fetch_all(
                    """
                    SELECT {}
                    FROM products
                    """.format(select_attributes),
                    'ProductModel'
                )
        elif model.__class__.__name__ == 'OrderModel':
            from src.models.order import OrderModel
            from src.models.order import OrderProductDetails

            db_connection = DBAccess().connect_to_db()
            cursor = db_connection.cursor()

            orders_made = []

            try:
                # The user is not an admin, get their orders
                if filter_clause:
                    # Get orders from DB
                    cursor.execute(
                        """
                        SELECT {}
                        FROM orders
                        WHERE {}
                        """.format(select_attributes, filter_clause)
                    )

                # The user is an admin, get all the existing orders
                else:
                    # Get orders from DB
                    cursor.execute(
                        """
                        SELECT {}
                        FROM orders
                        """.format(select_attributes)
                    )

                db_response = cursor.fetchall()

                # Inhabit list of user's orders
                for transaction in db_response:
                    order = OrderModel()
                    order.set_order_id(transaction[0])
                    order.set_user_id(transaction[1])
                    order.set_time_of_order(transaction[2])

                    # Get the products related to the order
                    cursor.execute(
                        """
                        SELECT product_name, product_description, price_sold, quantity_bought
                        FROM order_products
                        WHERE order_id_fk = {}
                        """.format(order.get_order_id())
                    )

                    db_response = cursor.fetchall()

                    for product in db_response:
                        item = OrderProductDetails()
                        item.tuple_to_model(product)

                        order.add_product_to_model(item)

                    orders_made.append(order)

                return orders_made

            except psycopg2.Error as e:
                print(e)

        elif model.__class__.__name__ == 'LikedListModel':
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'CartModel':
            return cls.__db_fetch_all(
                """
                SELECT {}
                FROM cart
                WHERE {}
                """.format(select_attributes, filter_clause),
                'CartModel'
            )
        elif model.__class__.__name__ == 'UserModel':
            # If the where_clause_statement is not empty
            if filter_clause:
                return cls.__db_fetch_all(
                    """
                    SELECT {}
                    FROM usr
                    WHERE {}
                    """.format(select_attributes, filter_clause),
                    'UserModel'
                )
            else:
                return cls.__db_fetch_all(
                    """
                    SELECT {}
                    FROM usr
                    """.format(select_attributes),
                    'UserModel'
                )

    @classmethod
    def get_all_elements_ordered(
            cls, model, select_attributes: str, filter_clause: str, order_attribute: str, sort: str):
        """
            Queries the database for all the elements of the given corresponding Entity in a specified order.

        :param model: class instance of the desired Entity Model
        :param select_attributes: attributes desired from the query
        :param filter_clause: specific filters desired for the query
        :param order_attribute: specific attribute to order
        :param sort: ascending (ASC) or descending (DESC)
        :return: list containing the desired Entity Models of matching query results in the specified order
        """
        if model.__class__.__name__ == 'ProductModel':
            # If the where_clause_statement is not empty (ie no filter required)
            if filter_clause:
                return cls.__db_fetch_all(
                    """
                    SELECT {}
                    FROM products
                    WHERE {}
                    ORDER BY {} {}
                    """.format(select_attributes, filter_clause, order_attribute, sort),
                    'ProductModel'
                )
            else:
                return cls.__db_fetch_all(
                    """
                    SELECT {}
                    FROM products
                    ORDER BY {} {}
                    """.format(select_attributes, order_attribute, sort),
                    'ProductModel'
                )
        elif model.__class__.__name__ == 'OrderModel':
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'LikedListModel':
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'CartModel':
            return "goomba"

    @classmethod
    def get_all_unique_values(cls, table: str, attribute: str):
        """
            Queries the database and returns a list of all the unique values of a given attribute found in the given
            table.

        :param table: table that contains the attribute
        :param attribute: attribute to get unique values from
        """
        # Prevents password leakage?
        if attribute != 'password':
            return cls.__db_fetch_all(
                """
                SELECT DISTINCT {}
                FROM {}
                """.format(attribute, table), 'List')

    @classmethod
    def update_element_attribute(cls, table: str, change: str, filter_clause: str):
        """
            Updates a specific attribute in a given table.

        :param table: table where
        :param change: specific change to attribute
        :param filter_clause: specific filters for desired change
        """
        # Registers a user
        if table.lower() == 'usr':
            cls.__db_run_command(
                """
                UPDATE {}
                SET {}
                WHERE {}
                """.format(table, change, filter_clause)
            )

        elif table.lower() == 'products':
            cls.__db_run_command(
                """
                UPDATE {}
                SET {}
                WHERE {}
                """.format(table, change, filter_clause)
            )
        elif table.lower() == 'orders':
            cls.__db_run_command(
                """
                UPDATE {}
                SET {}
                WHERE {}
                """.format(table, change, filter_clause)
            )
        elif table.lower() == 'likedlist':
            cls.__db_run_command(
                """
                UPDATE {}
                SET {}
                WHERE {}
                """.format(table, change, filter_clause)
            )
        elif table.lower() == 'cart':
            cls.__db_run_command(
                """
                UPDATE {}
                SET {}
                WHERE {}
                """.format(table, change, filter_clause)
            )

    @classmethod
    def __db_fetch_one(cls, command: str, return_type: str):
        """
            Backend private function. Runs a query that returns a single result.

        :param command: command to be run in database
        :param return_type: type of entity model desired (String)
        :return: desired Entity Model of matching query result
        """
        db_connection = DBAccess().connect_to_db()
        cursor = db_connection.cursor()

        try:
            cursor.execute(command)
        except psycopg2.Error as e:
            print(e)
            pass

        response = cursor.fetchone()

        db_connection.commit()
        db_connection.close()

        response_object = Packager.package_response(response, return_type)
        return response_object

    @classmethod
    def __db_fetch_all(cls, command: str, return_type: str):
        """
            Backend private function. Runs a query that returns multiple results.

        :param command: command to be run in database
        :param return_type: type of entity model desired (String)
        :return: list containing the desired Entity Models of matching query results
        """
        db_connection = DBAccess().connect_to_db()
        cursor = db_connection.cursor()

        try:
            cursor.execute(command)
        except psycopg2.Error as e:
            print(e)
            pass

        response = cursor.fetchall()

        db_connection.commit()
        db_connection.close()
        return Packager().package_response(response, return_type)

    @classmethod
    def __db_run_command(cls, command: str):
        """
            Backend private function. Runs a custom query in the database.

        :param command: command to be run in database
        """
        db_connection = DBAccess().connect_to_db()
        cursor = db_connection.cursor()

        try:
            cursor.execute(command)
        except psycopg2.Error as e:
            print(e)
            pass

        db_connection.commit()
        db_connection.close()

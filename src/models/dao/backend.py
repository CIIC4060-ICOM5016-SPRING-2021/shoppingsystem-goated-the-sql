from src.models.dao.db_access import DBAccess
from src.models.dao.helpers.packager import Packager


class BackEnd:
    @classmethod
    def create_element(cls, model):
        """
           Creates a new element within the corresponding Entity Model table in the database

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
            cls.__db_run_command(
                """
                INSERT INTO products (name, description, price, category, liked_count, quantity, visible) \n
                VALUES ('{}', '{}', {}, '{}', 0, {}, true)
                """.format(
                    model.get_name(),
                    model.get_desc(),
                    model.get_price(),
                    model.get_category(),
                    model.get_quantity())
            )
        elif model.__class__.__name__ == 'OrderModel':
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'LikedListModel':
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'CartModel':
            # TODO: implement logic
            return "goomba"

    @classmethod
    def get_element(cls, model, pk, select_attributes: str):
        """
            Queries the corresponding entity table in the database for the given primary key.

        :param model: class instance of the desired Entity Model
        :param pk: primary key corresponding to the Entity Model
        :param select_attributes: attributes to retrieve from the database
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
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'LikedListModel':
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'CartModel':
            # TODO: implement logic
            return "goomba"

    @classmethod
    def delete_element(cls, model, pk):
        """
            Completely removes a row from the corresponding table.

        :param model: class instance of the desired Entity Model
        :param pk: primary key corresponding to the Entity Model
        :return: boolean if the deletion was successfully completed
        """

        # TODO: Make the function return the boolean on completion
        if model.__class__.__name__ == 'UserModel':
            cls.__db_run_command(
                """
                DELETE FROM usr
                WHERE user_id = {}
                """.format(pk)
            )

        elif model.__class__.__name__ == 'ProductModel':
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'OrderModel':
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'LikedListModel':
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'CartModel':
            # TODO: implement logic
            return "goomba"

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
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'LikedListModel':
            return cls.__db_fetch_all(
                """
                SELECT {}
                FROM likedlist
                WHERE {}
                """.format(select_attributes, filter_clause),
                'LikedListModel'
            )

        elif model.__class__.__name__ == 'CartModel':
            # TODO: implement logic
            return "goomba"
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
            # TODO: implement logic
            return "goomba"

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

        cursor.execute(command)

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

        cursor.execute(command)

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

        cursor.execute(command)

        db_connection.commit()
        db_connection.close()

from src.models.dao.db_access import DBAccess
from src.models.dao.helpers.packager import Packager


class BackEnd:
    @classmethod
    def create_element(cls, model):
        # Registers a user
        if model.__class__.__name__ == 'UserModel':
            cls.__db_run_command(
                """
                INSERT INTO usr (first_name, last_name, created_on, valid, password, phone, admin) \n
                VALUES ('{}', '{}', current_timestamp, false, '{}', '{}', false)
                """.format(
                    model.get_first_name(),
                    model.get_last_name(),
                    model.get_password(),
                    model.get_phone_num())
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
    def get_element(cls, model, pk=""):
        if model.__class__.__name__ == 'UserModel':
            return cls.__db_fetch_one(
                """
                SELECT first_name, last_name, valid, phone, admin
                FROM usr
                WHERE user_id = {}
                """.format(pk),

                'UserModel'
            )
        elif model.__class__.__name__ == 'ProductModel':
            return cls.__db_fetch_one(
                """
                SELECT name, description, price, category, liked_count, quantity, visible
                FROM products
                WHERE product_id = {}
                """.format(pk),
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
    def get_all_elements(cls, model, select_attributes: str, where_clause_statement):
        if model.__class__.__name__ == 'ProductModel':

            # If the where_clause_statement is not empty
            if where_clause_statement:
                return cls.__db_fetch_all(
                    """
                    SELECT {}
                    FROM products
                    WHERE {}
                    """.format(select_attributes, where_clause_statement),
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
            # TODO: implement logic
            return "goomba"
        elif model.__class__.__name__ == 'CartModel':
            # TODO: implement logic
            return "goomba"

    @classmethod
    def __db_fetch_one(cls, command: str, return_type: str):
        db_connection = DBAccess().connect_to_db()
        cursor = db_connection.cursor()

        cursor.execute(command)

        response = cursor.fetchone()

        db_connection.commit()
        db_connection.close()

        return Packager().package_response(response, return_type)

    @classmethod
    def __db_fetch_all(cls, command: str, return_type: str):
        db_connection = DBAccess().connect_to_db()
        cursor = db_connection.cursor()

        cursor.execute(command)

        response = cursor.fetchall()

        db_connection.commit()
        db_connection.close()
        return Packager().package_response(response, return_type)

    @classmethod
    def __db_run_command(cls, command: str):
        db_connection = DBAccess().connect_to_db()
        cursor = db_connection.cursor()

        cursor.execute(command)

        db_connection.commit()
        db_connection.close()

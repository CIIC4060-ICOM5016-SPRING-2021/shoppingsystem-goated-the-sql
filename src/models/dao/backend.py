from src.models.dao.db_access import DBAccess


class BackEnd:
    def create_element(self, model):
        # Registers a user
        if model.__class__.__name__ == 'UserModel':
            db_connection = DBAccess().connect_to_db()
            cursor = db_connection.cursor()

            cursor.execute(
                """
                INSERT INTO usr (first_name, last_name, created_on, valid, password, phone, admin) \n
                VALUES ('{}', '{}', current_timestamp, false, '{}', '{}', false)
                """.format(model.f_name, model.l_name, model.pwd, model.phone)
            )

            db_connection.commit()
            db_connection.close()
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
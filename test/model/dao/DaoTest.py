import unittest

from src.controllers.product import ProductController
from src.controllers.user import UserController
from src.models.dao.backend import BackEnd
from src.models.product import ProductModel
from src.models.user import UserModel


class DAOTest(unittest.TestCase):
    # NOTE: Make the functions public before testing the service below otherwise it will always fail
    # def test_db_credentials_getter(self):
    #     test_subject = DBAccess().__get_db_credentials("./files/test_credentials.txt")
    #
    #     self.assertEqual(test_subject.host, "goomba")
    #     self.assertEqual(test_subject.username, "goomber3000")
    #     self.assertEqual(test_subject.password, "toogoomboyou")
    #     self.assertEqual(test_subject.database, "bowsercastle")

    def test_backend_user_creation(self):
        test_usr = UserModel()
        test_usr.set_first_name("goomberson")
        test_usr.set_last_name("goomba")
        test_usr.set_phone_num("123-123-1234")
        test_usr.set_password("toogoombfoyou")

        BackEnd().create_element(test_usr)

    def test_get_user(self):
        result = UserModel().get_user("1")
        print("First Name: " + result.get_first_name())
        print("Last Name: " + result.get_last_name())
        print("Valid? " + str(result.get_validity()))
        print("Phone: " + result.get_phone_num())
        print("Admin? " + str(result.get_admin_status()))

    def test_user_is_admin(self):
        self.assertEqual(UserModel().db_is_admin(1), True)
        self.assertEqual(UserModel().db_is_admin(13), False)
        self.assertIsNot(UserModel().db_is_admin(23), True)

    def test_get_product(self):
        result = ProductModel().get_product("1")
        print("Name: " + result.get_name())
        print("Description: " + result.get_desc())
        print("Price: " + str(result.get_price()))
        print("Category: " + result.get_category())
        print("Quantity: " + str(result.get_stock()))
        print("Visible? " + str(result.get_visibility()))

    def test_get_all_products(self):
        # Used debugger to make sure the objects were correctly returned
        result = ProductModel().get_all_products()
        for product in result:
            print("Product ID: " + str(product.get_prod_id()))
            print("Name: " + product.get_name())
            print("Description: " + product.get_desc())
            print("Price: " + str(product.get_price()))
            print("Category: " + product.get_category())
            print("Quantity: " + str(product.get_stock()))
            print("Visible? " + str(product.get_visibility()))

    def test_backend_product_creation(self):
        test_prod = ProductModel()
        test_prod.set_name("Goomba Statue")
        test_prod.set_desc("The largest Goomba Mario has ever seen")
        test_prod.set_price(1299.99)
        test_prod.set_category("Figurines")
        test_prod.set_stock(1)

        BackEnd().create_element(test_prod)

    def test_product_deletion(self):
        ProductController.delete_product(11, 1)

    def test_product_update(self):
        test_request = [
            {
                "user_id": 1
            },
            {
                "product_id": 13,
                "name": "Mario Statue",
                "description": "The tiniest mario statue you have ever laid your eyes upon",
                "price": 1299.99,
                "category": "Figurines",
                "stock": 85,
                "visible": True
            }
        ]

        ProductController.update_product(13, test_request[1], test_request[0])

    # Generates a simple table in the database that correlates to the files stored in the credentials.txt file
    # def test_table_creation(self):

    # REMOVE COMMENTING IN THE LINES BELOW IF YOU ARE COMPLETELY SURE YOU WANT A TEST TABLE IN YOUR DATABASE

    # db_connection = DataAccessObject().init_db()
    # db_cursor = db_connection.cursor()
    # db_cursor.execute("""CREATE TABLE goomba(user_id serial PRIMARY KEY, name VARCHAR(50))""")
    #
    # db_connection.commit()
    # db_connection.close()

    # I manually checked the database to check if the table was created since I do not wanna spend
    # time developing whatever this mess of a check will be

    def test_create_user(self):
        json = {
            "first_name": "Ivan",
            "last_name": "Jackson",
            "password": "OrlandoSokea",
            "phone": "123456789"
        }
        print(UserController().register_user(json).get_user_id())

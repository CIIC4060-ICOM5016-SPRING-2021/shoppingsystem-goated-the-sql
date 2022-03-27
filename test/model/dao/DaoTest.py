import unittest

from src.models.dao.backend import BackEnd
from src.models.dao.db_access import DBAccess
from src.models.user import UserModel


class DAOTest(unittest.TestCase):
    # NOTE: Make the functions public before testing the service below otherwise it will always fail
    def test_db_credentials_getter(self):
        test_subject = DBAccess().__get_db_credentials("./files/test_credentials.txt")

        self.assertEqual(test_subject.host, "goomba")
        self.assertEqual(test_subject.username, "goomber3000")
        self.assertEqual(test_subject.password, "toogoomboyou")
        self.assertEqual(test_subject.database, "bowsercastle")

    def test_backend_user_creation(self):
        test_usr = UserModel()
        test_usr.f_name = "goomberson"
        test_usr.l_name = "goomba"
        test_usr.phone = "123-123-1234"
        test_usr.pwd = "toogoombfoyou"

        BackEnd().create_element(test_usr)

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

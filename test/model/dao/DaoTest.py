import unittest

from src.models.dao.data_access_object import DataAccessObject


class DAOTest(unittest.TestCase):
    # NOTE: Make the functions public before testing otherwise they will always fail
    def test_db_credentials_getter(self):
        test_subject = DataAccessObject().__get_db_credentials("./files/test_credentials.txt")

        self.assertEqual(test_subject.host, "goomba")
        self.assertEqual(test_subject.username, "goomber3000")
        self.assertEqual(test_subject.password, "toogoomboyou")
        self.assertEqual(test_subject.database, "bowsercastle")

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

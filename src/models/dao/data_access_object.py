from src.models.dao.helpers.dir_traversal import DirectoryTraversal
from src.models.dao.helpers.parser import Parser
from src.models.dao.credentials import Credentials
import psycopg2
import os


current_dir = os.path.dirname(__file__)


class DataAccessObject:

    def init_db(self):
        creds = self.__get_db_credentials(DirectoryTraversal().go_up_dir(2, current_dir) + "/files/credentials.txt")
        try:
            db = self.__connect_to_db(creds)
            return db

        # I have no idea what type of error this could produce, that is why it is currently generic
        # TODO: find out what type of error this could be/produce
        except:
            print("An error has occurred when connecting to the database")

    # Initiates the connection to the database using the given credentials and returns the connection
    def __connect_to_db(self, credentials_obj: Credentials):
        db_connection = psycopg2.connect(
            host=credentials_obj.host,
            user=credentials_obj.username,
            password=credentials_obj.password,
            database=credentials_obj.database
        )
        return db_connection

    # Parses through the given file for the values that it is looking for
    def __get_db_credentials(self, file_path: str):
        cred = Credentials()
        cred.host = Parser().get_file_value(file_path, "host")
        cred.username = Parser().get_file_value(file_path, "username")
        cred.password = Parser().get_file_value(file_path, "password")
        cred.database = Parser().get_file_value(file_path, "database")
        return cred

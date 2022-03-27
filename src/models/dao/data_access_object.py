from src.models.dao.helpers.dir_traversal import Directories
from src.models.dao.helpers.parser import Parser
from src.models.dao.credentials import Credentials
import psycopg2
import os

current_dir = os.path.dirname(__file__)


class DataAccessObject:

    def connect_to_db(self):
        creds = self.__get_db_credentials(Directories().go_up_dir(2, current_dir) + "/files/credentials.txt")
        try:
            db = self.__connect_to_db(creds)
            return db
        except psycopg2.Error as e:
            print("""
                    There has been an error connecting to the database, please make sure the connection credentials
                    are saved in a folder within the root directory named 'files' and the document is named 
                    'credentials.txt'. Error: 
                  """, e)

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





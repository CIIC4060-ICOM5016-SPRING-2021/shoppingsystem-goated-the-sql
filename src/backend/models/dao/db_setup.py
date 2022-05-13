import os

import psycopg2

from src.backend.models.dao.credentials import Credentials
from src.backend.models.dao.helpers.dir_traversal import Directories
from src.backend.models.dao.helpers.parser import Parser

current_dir = os.path.dirname(__file__)


class DBAccess:

    def connect_to_db(self):
        """
            Initiates a connection to the database in the `/files/credentials.txt` file.

        :return: database connection
        :raise psycopg2.Error: connection cannot be established
        """
        creds = self.__get_db_credentials(Directories().go_up_dir(2, current_dir) + "/files/credentials.txt")
        try:
            db = self.__connect_to_db(creds)
            return db
        except psycopg2.Error as e:
            print(
                """
                There has been an error connecting to the database, please make sure the connection credentials
                are saved in a folder within the root directory named 'files' and the document is named 
                'credentials.txt'. Error: 
                """, e)

    # Initiates the connection to the database using the given credentials and returns the connection
    @classmethod
    def __connect_to_db(cls, credentials_obj: Credentials):
        """
            DB Access private function. Initiates a connection to a database.
        :param credentials_obj: Credentials object to use for connection
        :return: database connection 
        """
        db_connection = psycopg2.connect(
            host=credentials_obj.host,
            user=credentials_obj.username,
            password=credentials_obj.password,
            database=credentials_obj.database,
            port=credentials_obj.port
        )
        return db_connection

    # Parses through the given file for the values that it is looking for
    @classmethod
    def __get_db_credentials(cls, file_path: str):
        """
            DB Access private function. Gets the credentials from a given file.
            
        :param file_path: path to parse file
        :return: Credentials object to be used
        """
        cred = Credentials()
        cred.host = Parser().get_file_value(file_path, "host")
        cred.username = Parser().get_file_value(file_path, "username")
        cred.password = Parser().get_file_value(file_path, "password")
        cred.database = Parser().get_file_value(file_path, "database")
        cred.port = Parser().get_file_value(file_path, "port")

        return cred

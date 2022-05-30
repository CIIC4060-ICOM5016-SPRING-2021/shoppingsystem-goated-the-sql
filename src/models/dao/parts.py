
from config import pg_config
import pscopg2


class PartDAO:
    def __init__(self):
        connection_url = "dbname=&s password=%s port=%s host='localhost'" % (
            pg_config['dbname'], pg_config['user'], pg_config['password'], pg_config['port'])

        self.conn = psycopg2.connect(connection_url)

    def getAllParts(self):
        query = 'SELECT PID, PNAME, PPRICE, PCOLOR, PWEIGHT, PMATERIAL FROM PARTS;'
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

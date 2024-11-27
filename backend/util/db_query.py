from typing import List, Dict, Optional
import mysql.connector
from util.db_con import DBConnection

class DBQuery:
    def __init__(self, connection):
        """
        Initializes with a database connection instance.
        """
        self.connection = connection
        self._ensure_connection()

    def _ensure_connection(self):
        if not self.connection.is_connected():
            print("Reconnecting to the database...")
            self.connection.connect()
            if self.connection:
                print("Success")
        if not self.connection.is_connected():
            raise ConnectionError("Failed to reconnect to the database.")

    def execute_query(self, query: str) -> List[Dict]:
        self._ensure_connection()
        cursor = self.connection.connection.cursor(dictionary=True)
        try:
            cursor.execute(query)
            results = cursor.fetchall()
            return results
        except mysql.connector.Error as e:
            print(f"Error executing query: {e}")
            return []
        finally:
            cursor.close()

    def close_connection(self):
        self.connection.close()

import mysql.connector
from typing import List, Dict, Optional

class DBConnection:
    def __init__(self, host: str, user: str, password: str, database: str):
        self.db_config = {
            'host': host,
            'user': user,
            'password': password,
            'database': database
        }
        self.connection = None

    def connect(self):
        try:
            self.connection = mysql.connector.connect(**self.db_config)
            return self.connection
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            return None

    def is_connected(self) -> bool:
        return bool(self.connection and self.connection.is_connected())

    def close(self):
        if self.is_connected():
            self.connection.close()

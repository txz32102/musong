import mysql.connector
from mysql.connector import errorcode
from datetime import datetime
import random

# Database connection configuration
db_config = {
    'host': 'rm-uf6ck3u12o3frjt10jo.mysql.rds.aliyuncs.com',
    'user': 'tester1',
    'password': 'txzchk691X'
}

# Database and table names
DB_NAME = 'Record'
TABLE_NAME = 'history'

# SQL statements to create database and table with utf8mb4 character set and collation
CREATE_DATABASE_QUERY = f"CREATE DATABASE IF NOT EXISTS {DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"

CREATE_TABLE_QUERY = f"""
CREATE TABLE IF NOT EXISTS {DB_NAME}.{TABLE_NAME} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT(9) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    text TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    files LONGBLOB,
    file_name VARCHAR(255)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
"""

INSERT_DUMMY_DATA_QUERY = f"""
INSERT INTO {DB_NAME}.{TABLE_NAME} (uid, text, files, file_name)
VALUES (%s, %s, %s, %s)
"""

def create_database(cursor):
    try:
        cursor.execute(CREATE_DATABASE_QUERY)
        print(f"Database {DB_NAME} created or already exists.")
    except mysql.connector.Error as err:
        print(f"Failed to create database {DB_NAME}: {err}")
        exit(1)

def create_table(cursor):
    try:
        cursor.execute(CREATE_TABLE_QUERY)
        print(f"Table {TABLE_NAME} created or already exists in database {DB_NAME}.")
    except mysql.connector.Error as err:
        print(f"Failed to create table {TABLE_NAME}: {err}")
        exit(1)

def insert_dummy_data(cursor):
    # Generate a random 9-digit user UID
    dummy_uid = random.randint(100000000, 999999999)
    dummy_text = "This is a dummy text entry with emoji 😊"
    dummy_file_content = b'This is some dummy file content'  # Binary content for the file
    dummy_file_name = "dummy_file.txt"

    cursor.execute(INSERT_DUMMY_DATA_QUERY, (dummy_uid, dummy_text, dummy_file_content, dummy_file_name))
    print("Inserted dummy data into the table.")

def main():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        
        # Create database
        create_database(cursor)
        
        # Create table
        create_table(cursor)
        
        # Insert dummy data
        insert_dummy_data(cursor)
        
        connection.commit()
        
        cursor.close()
        connection.close()
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

if __name__ == "__main__":
    main()

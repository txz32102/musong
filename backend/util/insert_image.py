import mysql.connector
from mysql.connector import errorcode
import os

# Database connection configuration
db_config = {
    'host': 'rm-uf6ck3u12o3frjt10jo.mysql.rds.aliyuncs.com',
    'user': 'tester1',
    'password': 'txzchk691X',
    'database': 'Record'
}

# Path to the demo image
image_path = '/home/musong/workspace/musong/backend/uploads/images/QQ截图20240726151818.png'

# SQL statement to insert data into the history table
INSERT_IMAGE_QUERY = """
INSERT INTO history (uid, text, files, file_name)
VALUES (%s, %s, %s, %s)
"""

def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

def insert_image(cursor, uid, text, file_path):
    try:
        with open(file_path, 'rb') as file:
            file_content = file.read()
        file_name = os.path.basename(file_path)
        cursor.execute(INSERT_IMAGE_QUERY, (uid, text, file_content, file_name))
        print("Inserted image into the table.")
    except Exception as e:
        print(f"Failed to insert image: {e}")

def main():
    connection = get_db_connection()
    if connection is None:
        return

    cursor = connection.cursor()
    
    # Example user UID and text
    uid = 123456789  # Replace with a valid 9-digit user UID
    text = "This is a demo image entry"

    # Insert the image
    insert_image(cursor, uid, text, image_path)

    # Commit the transaction
    connection.commit()
    
    cursor.close()
    connection.close()

if __name__ == "__main__":
    main()

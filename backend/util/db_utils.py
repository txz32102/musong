import mysql.connector
from typing import List, Dict

def get_db_connection(host, user, password, database):
    db_config = {
        'host': host,
        'user': user,
        'password': password,
        'database': database
    }

    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

def fetch_queries(cursor) -> List[Dict]:
    cursor.execute("SELECT query_id, text, timestamp FROM user_query")
    return cursor.fetchall()

def fetch_media(cursor, query_id: int, media_type: str) -> List[str]:
    table_name = f"query_{media_type}"
    column_name = f"{media_type}_url"
    cursor.execute(f"SELECT {column_name} FROM {table_name} WHERE query_id = %s", (query_id,))
    return [row[column_name] for row in cursor.fetchall()]

def fetch_history() -> List[Dict]:
    connection = get_db_connection()
    if connection is None:
        return {"error": "Failed to connect to the database"}

    cursor = connection.cursor(dictionary=True)
    queries = fetch_queries(cursor)

    history = []
    for query in queries:
        query_id = query['query_id']
        text = query['text']
        timestamp = query['timestamp']

        images = fetch_media(cursor, query_id, 'images')
        files = fetch_media(cursor, query_id, 'files')
        audio = fetch_media(cursor, query_id, 'audio')

        history.append({
            "text": text,
            "images": images,
            "files": files,
            "audio": audio,
            "timestamp": str(timestamp)
        })

    cursor.close()
    connection.close()
    return history

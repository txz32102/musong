import mysql.connector
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# Initialize FastAPI application
app = FastAPI()



# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection configuration
db_config = {
    'host': 'rm-uf6ck3u12o3frjt10jo.mysql.rds.aliyuncs.com',
    'user': 'tester1',
    'password': 'txzchk691X',
    'database': 'user_history'  # Replace with your actual database name
}

# Function to connect to MySQL
def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

# Pydantic models for response structure
class MediaItem(BaseModel):
    text: str
    images: Optional[List[str]]
    files: Optional[List[str]]
    audio: Optional[List[str]]


@app.get("/history", response_model=List[MediaItem])
async def get_history():
    i = 0
    connection = get_db_connection()
    if connection is None:
        return {"error": "Failed to connect to the database"}

    cursor = connection.cursor(dictionary=True)

    # Fetch all queries with their timestamp
    cursor.execute("SELECT query_id, text, timestamp FROM user_query")  # Include timestamp in the SELECT query
    queries = cursor.fetchall()

    # Prepare list to store all history items
    history = []

    # For each query, fetch associated images, files, audio, and timestamp
    for query in queries:
        query_id = query['query_id']
        text = query['text']
        timestamp = query['timestamp']  # Now this should work if timestamp is included in the SELECT query

        # Fetch associated images
        cursor.execute("SELECT image_url FROM query_images WHERE query_id = %s", (query_id,))
        images = [row['image_url'] for row in cursor.fetchall()]

        # Fetch associated files
        cursor.execute("SELECT file_url FROM query_files WHERE query_id = %s", (query_id,))
        files = [row['file_url'] for row in cursor.fetchall()]

        # Fetch associated audio
        cursor.execute("SELECT audio_url FROM query_audio WHERE query_id = %s", (query_id,))
        audio = [row['audio_url'] for row in cursor.fetchall()]

        # Append this query's data along with timestamp to the history list
        # Update this section in your FastAPI code
        history.append({
            "text": text,
            "images": images,
            "files": files,
            "audio": audio,
            "timestamp": str(timestamp)  # Convert to string if necessary
        })


    # Close database connection
    cursor.close()
    connection.close()
    print(history)
    i = i + 1
    print(i)
    return history

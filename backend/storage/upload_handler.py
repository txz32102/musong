from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import mysql.connector

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
    'database': 'Record'
}

# SQL query to insert uploaded file data, including the timestamp from the frontend
INSERT_FILE_QUERY = """
INSERT INTO history (uid, text, files, file_name, timestamp)
VALUES (%s, %s, %s, %s, %s)
"""

def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as err:
        print(f"Database connection error: {err}")
        return None

@app.post("/upload/")
async def upload_file(
    file: UploadFile = File(...), 
    uid: int = Form(...), 
    text: Optional[str] = Form(None),
    timestamp: str = Form(...)  # Expect timestamp as a string from frontend
):
    file_content = await file.read()
    file_name = file.filename


    print(file_name)
    # Validate timestamp format
    try:
        # Check if the timestamp is in a valid format, you can adjust this regex if needed
        from datetime import datetime
        datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid timestamp format. Expected 'YYYY-MM-DD HH:MM:SS'")

    # Connect to the database
    connection = get_db_connection()
    if connection is None:
        raise HTTPException(status_code=500, detail="Failed to connect to the database")

    cursor = connection.cursor()

    try:
        # Insert the file content, metadata, and timestamp into the database
        cursor.execute(INSERT_FILE_QUERY, (uid, text, file_content, file_name, timestamp))
        connection.commit()
    except mysql.connector.Error as err:
        print(f"Failed to insert file data: {err}")
        raise HTTPException(status_code=500, detail="Failed to store file data in the database")
    finally:
        cursor.close()
        connection.close()

    return {"message": f"File '{file_name}' uploaded and stored successfully with timestamp '{timestamp}'"}

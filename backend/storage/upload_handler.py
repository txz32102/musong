from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from typing import Optional
from util.db_utils import get_db_connection  # Import the utility function
import mysql.connector  # Import mysql.connector for database operations

router = APIRouter()

# SQL query to insert uploaded file data, including the timestamp from the frontend
INSERT_FILE_QUERY = """
INSERT INTO history (uid, text, files, file_name, timestamp)
VALUES (%s, %s, %s, %s, %s)
"""

@router.post("/upload/")
async def upload_file(
    uid: int = Form(...), 
    text: Optional[str] = Form(None),
    timestamp: str = Form(...),  # Expect timestamp as a string from frontend
    file: Optional[UploadFile] = File(None)  # Make file optional
):
    # Initialize file_content and file_name to None if no file is provided
    file_content = None
    file_name = None

    if file:
        # Read the file content if the file is provided
        file_content = await file.read()
        file_name = file.filename

    # Validate timestamp format
    try:
        from datetime import datetime
        datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid timestamp format. Expected 'YYYY-MM-DD HH:MM:SS'")

    # Connect to the database
    connection = get_db_connection(
        host='rm-uf6ck3u12o3frjt10jo.mysql.rds.aliyuncs.com',
        user='tester1',
        password='txzchk691X',
        database='record'
    )

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

    return {"message": f"Data uploaded and stored successfully with timestamp '{timestamp}'"}

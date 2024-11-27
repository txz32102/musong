# services/history_service.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import mysql.connector
from util.db_con import DBConnection
from util.db_query import DBQuery
import io
from fastapi.responses import FileResponse
from fastapi.responses import StreamingResponse


# Pydantic model for representing the 'history' table
class HistoryRecord(BaseModel):
    id: int
    uid: int
    timestamp: datetime
    text: Optional[str] = None
    file_name: Optional[str] = None

# Pydantic model for serving multiple records
class HistoryListResponse(BaseModel):
    records: list[HistoryRecord]

# Create a router for serving history data
router = APIRouter()

# Fetch history records by user ID
def get_history_records_by_user(uid: int):
    try:
        connection = DBConnection(
            host="rm-uf6ck3u12o3frjt10jo.mysql.rds.aliyuncs.com",
            user="tester1",
            password="txzchk691X",
            database="record"
        )

        connection.connect()
        db_query = DBQuery(connection)
        query = f"SELECT id, uid, timestamp, text, file_name FROM history WHERE uid = {uid}"
        db_query.execute_query(query)
        records = cursor.fetchall()
        return records
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()


# Endpoint to get all history records
@router.get("/history", response_model=HistoryListResponse)
async def get_all_history():
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT id, uid, timestamp, text, file_name FROM history")
        records = cursor.fetchall()
        return {"records": [HistoryRecord(**record) for record in records]}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()


# Endpoint to get history records for a specific user
@router.get("/history/user/{uid}", response_model=HistoryListResponse)
async def get_history_by_user(uid: int):
    records = get_history_records_by_user(uid)
    return {"records": [HistoryRecord(**record) for record in records]}

@router.get("/history/user/{uid}/{record_id}/file")
async def get_file_by_user(uid: int, record_id: int):
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT files, file_name FROM history WHERE id = %s AND uid = %s", (record_id, uid))
        record = cursor.fetchone()  # Fetch the record
        if record and record["files"]:
            file_name = record["file_name"] or "default_filename"  # Fallback to a default name if None
            # Create a BytesIO object to simulate a file-like object
            file_content = io.BytesIO(record["files"])
            # Return the file as a StreamingResponse, with the correct file name in the header

            print(file_name)
            return StreamingResponse(file_content, media_type="application/octet-stream", headers={
                "Content-Disposition": f"attachment; filename={file_name}"
            })
        raise HTTPException(status_code=404, detail="File not found")
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()
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
        records = db_query.execute_query(query)
        return {"records": records}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")


# Endpoint to get all history records
@router.get("/history", response_model=HistoryListResponse)
async def get_all_history():
    try:
        connection = DBConnection(
            host="rm-uf6ck3u12o3frjt10jo.mysql.rds.aliyuncs.com",
            user="tester1",
            password="txzchk691X",
            database="record"
        )

        connection.connect()
        db_query = DBQuery(connection)
        query = "SELECT id, uid, timestamp, text, file_name FROM history"
        records = db_query.execute_query(query)
        return {"records": records}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")


# Endpoint to get history records for a specific user
@router.get("/history/user/{uid}", response_model=HistoryListResponse)
async def get_history_by_user(uid: int):
    records = get_history_records_by_user(uid)
    return {"records": [HistoryRecord(**record) for record in records]}
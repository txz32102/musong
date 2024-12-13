from fastapi import HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import mysql.connector
from util.db_con import DBConnection
from util.db_query import DBQuery

class HistoryRecord(BaseModel):
    id: int
    uid: int
    timestamp: datetime
    text: Optional[str] = None
    file_name: Optional[str] = None

# Pydantic model for serving multiple records
class HistoryListResponse(BaseModel):
    records: list[HistoryRecord]

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
        query = f"SELECT id, uid, timestamp, text, file_path FROM history WHERE uid = {uid}"
        records = db_query.execute_query(query)
        return {"records": records}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
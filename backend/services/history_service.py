from fastapi import APIRouter, HTTPException
import mysql.connector
from util.db_con import DBConnection
from util.db_query import DBQuery
from util.models.history import *
import json


router = APIRouter()

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
        query = "SELECT id, uid, timestamp, text, file_path FROM history WHERE is_deleted = 0"
        records = db_query.execute_query(query)
        return {"records": records}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")


@router.get("/history/user/{uid}", response_model=HistoryListResponse)
async def get_history_by_user(uid: int):
    records = get_history_records_by_user(uid)
    try:
        return {"records": [HistoryRecord(**record) for record in records["records"]]}
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid record format")
    except TypeError as e:
        raise HTTPException(status_code=400, detail=f"Error processing record: {str(e)}")
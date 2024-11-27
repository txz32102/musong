import mysql.connector
from typing import List, Dict, Optional
import sys
sys.path.append("/root/home/musong/backend/util")
from db_con import DBConnection
from db_query import DBQuery

conn = DBConnection(
    host="rm-uf6ck3u12o3frjt10jo.mysql.rds.aliyuncs.com",
    user="tester1",
    password="txzchk691X",
    database="record"
)

conn.connect()

db_query = DBQuery(conn)

query = "SELECT uid FROM history;"

res = db_query.execute_query(query=query)

# print(res)
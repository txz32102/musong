import mysql.connector
from typing import List, Dict, Optional
import sys
sys.path.append("/root/home/musong/backend/util")
from db_con import DBConnection

conn = DBConnection(
    host="rm-uf6ck3u12o3frjt10jo.mysql.rds.aliyuncs.com",
    user="tester1",
    password="txzchk691X",
    database="record"
)


print(conn.is_connected())
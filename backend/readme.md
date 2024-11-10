# storage

this test is ok

```bash
curl -X POST "http://localhost:8000/upload/" \
    -F "uid=123456789" \
    -F "text=Sample text" \
    -F "file=@/home/musong/workspace/musong/frontend/public/favicon.ico" \
    -F "timestamp=2024-11-10 15:30:00"


curl -X POST "http://localhost:8000/upload/" \
    -F "uid=123456789" \
    -F "text=Sample text" \
    -F "timestamp=2024-11-10 15:30:00"


curl -OJ http://localhost:8000/history/user/123456789/5/file

```


# query from db

```bash
mysql -h rm-uf6ck3u12o3frjt10jo.mysql.rds.aliyuncs.com -P 3306 -u tester1 -p
```

```sql
USE record
SELECT id, uid, timestamp, text, file_name FROM history;
```

# run the backend 

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

# sql table

```bash
mysql> describe history;
+-----------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field     | Type         | Null | Key | Default           | Extra                                         |
+-----------+--------------+------+-----+-------------------+-----------------------------------------------+
| id        | int          | NO   | PRI | NULL              | auto_increment                                |
| uid       | int          | NO   |     | NULL              |                                               |
| timestamp | timestamp    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| text      | text         | YES  |     | NULL              |                                               |
| files     | longblob     | YES  |     | NULL              |                                               |
| file_name | varchar(255) | YES  |     | NULL              |                                               |
+-----------+--------------+------+-----+-------------------+-----------------------------------------------+
6 rows in set (0.10 sec)
```

import bcrypt
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Form
from util.login import *
from util.db_query import *
from util.db_con import *


## connect to my db
connection = DBConnection(
    host="rm-uf6ck3u12o3frjt10jo.mysql.rds.aliyuncs.com",
    user="tester1",
    password="txzchk691X",
    database="record"
)

connection.connect()
db_query = DBQuery(connection)
query = f"SELECT id, uid, timestamp, text, file_path FROM history WHERE uid = {100000000}"
records = db_query.get_user_by_username("musong")

print(records)

print(1)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# In-memory user data (for demonstration purposes)
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "password": b'$2b$12$iJqWPVmySY..biNp7ZIAo.YGXKv16lFaiUJe4XFvCi4/tZHMg2qjW',  # Hashed password as bytes
    }
}

# User model
class User(BaseModel):
    username: str

class UserInDB(User):
    password: bytes  # Make sure the password is handled as bytes

# Create a router instance
router = APIRouter()

# Function to hash the password
def hash_password(password: str) -> bytes:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

# Function to verify password
def verify_password(plain_password: str, hashed_password: bytes) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)

# Function to get user from DB
def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)
    return None

# Token endpoint that now accepts form data
@router.post("/token")
@router.get("/token")
async def login_for_access_token(
    username: str = Form(...),
    password: str = Form(...),
):
    db_query = DBQuery(connection)
    query = f"SELECT id, uid, timestamp, text, file_path FROM history WHERE uid = {100000000}"
    records = db_query.get_user_by_username(username)
    user = get_user(fake_users_db, username)
    print(f"records is {records}")
    print({"access_token": username, "token_type": "bearer"})
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"access_token": username, "token_type": "bearer"}

@router.get("/users/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    user = get_user(fake_users_db, token)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
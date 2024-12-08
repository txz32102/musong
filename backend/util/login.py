# backend/util/login.py

import bcrypt
import jwt
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, Form
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import Optional
from secrets import token_urlsafe
from util.db_con import *


class User(BaseModel):
    username: str

class UserInDB(User):
    password: bytes  # Make sure the password is handled as bytes

# Login utility class
class LoginUtils:
    def __init__(self, db, secret_key: str, algorithm: str = "HS256", access_token_expire_minutes: int = 60):
        self.db = db
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.access_token_expire_minutes = access_token_expire_minutes

    def hash_password(self, password: str) -> bytes:
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def verify_password(self, plain_password: str, hashed_password: bytes) -> bool:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)

    def get_user(self, username: str):
        # Assuming you have a function to get user data from the database
        user_data = self.db.get_user_by_username(username)
        if user_data:
            return UserInDB(**user_data)
        return None

    def generate_token(self, username: str) -> str:
        to_encode = {"sub": username, "exp": datetime.utcnow() + timedelta(minutes=self.access_token_expire_minutes)}
        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
    
    def generate_refresh_token(self, username: str) -> str:
        to_encode = {"sub": username, "exp": datetime.utcnow() + timedelta(days=30)}  # Refresh token lasts 30 days
        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
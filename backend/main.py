# /home/musong/workspace/musong/backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from storage.upload_handler import router as upload_router  # Import the upload router
from services.history_service import router as history_router  # Import the history service router

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the upload router
app.include_router(upload_router)

# Include the history service router
app.include_router(history_router)

# Other routes and logic can be added here

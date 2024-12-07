from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from storage.upload_handler import router as upload_router  # Import the upload router
from services.history_service import router as history_router  # Import the history service router
from services.auth import router as auth_router  # Import the history service router

app = FastAPI()

# CORS configuration to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include the upload router
app.include_router(upload_router)

# Include the history service router
app.include_router(history_router)

# Other routes and logic can be added here
app.include_router(auth_router)
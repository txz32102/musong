from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to the appropriate domain for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_data(
    text: str = Form(...),
    audio: UploadFile = File(None),
    image: UploadFile = File(None)
):
    # Save the audio file if provided
    if audio:
        audio_file_path = f"uploads/audio/{audio.filename}"
        with open(audio_file_path, "wb") as audio_file:
            audio_file.write(await audio.read())

    # Save the image file if provided
    if image:
        image_file_path = f"uploads/images/{image.filename}"
        with open(image_file_path, "wb") as img_file:
            img_file.write(await image.read())

    # Prepare the response
    response = {
        "text": text,
        "audio": audio.filename if audio else None,
        "image": image.filename if image else None
    }

    return JSONResponse(content=response)

# Create directories for uploads if they don't exist
os.makedirs("uploads/audio", exist_ok=True)
os.makedirs("uploads/images", exist_ok=True)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

from fastapi import FastAPI, UploadFile, Response, HTTPException, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from io import BytesIO
from rembg import remove

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/background_remover")
async def upload_image(file: UploadFile = File(...)):

    # 1. Vérifier le format
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(
            status_code=400,
            detail="Format d'image non autorisé"
        )

    # 2. Lire les bytes de l'image
    image = await file.read()

    # 3. Vérifier que l'image est valide
    try:
        with Image.open(BytesIO(image)) as img:
            img.verify()

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Image invalide"
        )

    # 4. Supprimer l'arrière-plan
    result = remove(image)

    # 5. Retourner l'image sans arrière-plan
    return Response(
        content=result,
        media_type="image/png"
    )
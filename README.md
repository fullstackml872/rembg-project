# Rembg Project

Application web pour retirer le fond d'une image, basée sur [RemBG](https://github.com/danielgatis/rembg) (U²-Net).

- `rembg_project/` : API FastAPI qui reçoit une image et renvoie un PNG sans fond.
- `frontend/` : interface React (Vite + Tailwind) pour importer l'image, voir le résultat et le télécharger.
- `test_rembg.py` : script de test local de RemBG sur les images du dossier `images/`.

## Lancer le projet

### 1. API (FastAPI)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd rembg_project
uvicorn main:app --reload --port 8000
```

L'API est disponible sur `http://localhost:8000` (documentation sur `/docs`).

Route : `POST /background_remover` avec un champ `file` (JPG ou PNG), renvoie l'image en PNG.

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

L'interface est disponible sur `http://localhost:5173`.

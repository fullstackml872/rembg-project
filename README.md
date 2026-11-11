# Rembg Project

Application web pour retirer le fond d'une image, basée sur [RemBG](https://github.com/danielgatis/rembg) (U²-Net).

- `rembg_project/` : API FastAPI qui reçoit une image et renvoie un PNG sans fond.
- `backend/` : API Express (comptes utilisateurs, JWT en cookie HttpOnly, MongoDB). Elle protège la route de détourage et la transmet à FastAPI.
- `frontend/` : interface React (Vite + Tailwind) : inscription, connexion, import de l'image, résultat et téléchargement.
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

### 2. Backend (Express)

Prérequis : MongoDB qui tourne en local (`brew services start mongodb-community`).

```bash
cd backend
npm install
cp .env.example .env   # puis mets une vraie valeur dans JWT_SECRET
npm run dev
```

L'API est disponible sur `http://localhost:3000`.

| Route | Rôle |
| --- | --- |
| `POST /api/auth/register` | Créer un compte (email + mot de passe ≥ 8 caractères) |
| `POST /api/auth/login` | Se connecter, pose le cookie `token` |
| `POST /api/auth/logout` | Se déconnecter |
| `GET /api/auth/me` | Utilisateur connecté |
| `POST /api/remove-background` | Retirer le fond (connexion requise) |

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

L'interface est disponible sur `http://localhost:5173`. En dev, Vite redirige `/api` vers Express (voir `vite.config.js`).

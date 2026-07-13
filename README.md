# OptiCrop — Smart Agricultural Production Optimization Engine

> **Grow the right crop, for the right soil.**

OptiCrop is a data-driven web application that helps farmers, researchers, and agricultural planners choose the best crop for a given field. By analyzing seven key soil and climate signals — Nitrogen (N), Phosphorous (P), Potassium (K), temperature, humidity, soil pH, and rainfall — the engine recommends the most suitable crop from a curated set of 22 crop profiles.

---

## Quick Links

| Resource | Link |
|----------|------|
| Live Demo | [Watch the demo video](https://drive.google.com/file/d/1GDqOmLJyprlwuDXt4hJgbBESOSfjg9ji/view?usp=drive_link) |
| Source Code | [github.com/Tupakulacharan12/agri-smart-logic](https://github.com/Tupakulacharan12/agri-smart-logic) |

---

## Features

- **Professional Landing Page** — Clean, responsive hero section with project mission and key stats.
- **Crop Recommendation Engine** — Enter soil/climate readings and get an AI-powered crop prediction with a confidence score.
- **Suitability Analysis** — Select any crop and compare your field conditions against its ideal profile, factor by factor.
- **Insights Dashboard** — Visualize prediction history with pie charts, NPK averages, rainfall trends, and a recent predictions table.
- **Input Validation** — Range checks and meaningful error messages for every form field.
- **Responsive Design** — Works smoothly on desktop, tablet, and mobile.
- **Attractive Animations** — Subtle hover effects, transitions, and gradient styling for a polished feel.
- **Prediction History** — Stores recent predictions locally so users can track decisions over time.

---

## Technology Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI primitives + custom shadcn-style components
- **Charts:** Recharts
- **Forms & Validation:** React Hook Form + Zod
- **Icons:** Lucide React
- **Package Manager:** Bun

---

## Project Structure

```text
.
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Core logic (crop data, prediction engine, history)
│   ├── routes/             # TanStack file-based routes
│   ├── styles.css          # Tailwind theme and design tokens
│   └── ...
├── package.json
├── vite.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed (or use npm/yarn with equivalent commands)
- Node.js 18+ recommended

### Installation

```bash
# Clone the repository
git clone https://github.com/Tupakulacharan12/agri-smart-logic.git
cd agri-smart-logic

# Install dependencies
bun install
```

### Development

```bash
# Start the local dev server
bun run dev
```

The app will be available at `http://localhost:8080` by default.

### Build for Production

```bash
# Create an optimized production build
bun run build

# Preview the production build locally
bun run preview
```

---

## How It Works

1. **Enter field data** on the `/recommend` page — N, P, K, temperature, humidity, pH, and rainfall.
2. **Predict Crop** runs a nearest-centroid classifier that compares your inputs against 22 crop profiles derived from the classic Crop Recommendation dataset.
3. **View the result** — top recommended crop, confidence score, agronomic notes, and runner-up matches.
4. **Analyze suitability** on the `/suitability` page for any specific crop.
5. **Track history** on the `/dashboard` page with charts and a prediction log.

---

## Team

| Name | Role |
|------|------|
| Charan Tupakula | Team Lead |
| Dronavalli Bhargavi | Member |
| Tutaram Pavan Vilesh | Member |
| Nuthakki Ritheesh Babu | Member |
| Saran Banisetti | Member |

---

## Deploying the Flask API on Render

The recommendation engine can also be served as a Python **Flask** API backed by a trained scikit-learn model (`model.pkl`). Follow these steps to deploy it as a free Web Service on [Render](https://render.com).

### 1. Project Layout

Make sure your backend folder looks like this:

```text
backend/
├── app.py                # Flask app (routes: /, /predict)
├── model.pkl             # Trained crop recommendation model
├── requirements.txt      # Python dependencies
├── Procfile              # Tells Render how to start the app
└── runtime.txt           # (optional) Python version, e.g. python-3.11.9
```

### 2. `requirements.txt`

```text
flask==3.0.3
flask-cors==4.0.1
gunicorn==22.0.0
numpy==1.26.4
scikit-learn==1.4.2
joblib==1.4.2
python-dotenv==1.0.1
```

### 3. `Procfile`

```text
web: gunicorn app:app --workers 2 --timeout 120 --bind 0.0.0.0:$PORT
```

`$PORT` is injected by Render — **do not hardcode a port**.

### 4. Loading the Model in `app.py`

Load the model **once at startup** (not per request) so predictions stay fast:

```python
import os
import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=os.environ.get("ALLOWED_ORIGIN", "*"))

MODEL_PATH = os.environ.get("MODEL_PATH", "model.pkl")
model = joblib.load(MODEL_PATH)

@app.route("/")
def health():
    return {"status": "ok", "service": "opticrop-api"}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    features = np.array([[
        data["N"], data["P"], data["K"],
        data["temperature"], data["humidity"],
        data["ph"], data["rainfall"],
    ]])
    prediction = model.predict(features)[0]
    proba = float(np.max(model.predict_proba(features))) if hasattr(model, "predict_proba") else None
    return jsonify({"crop": str(prediction), "confidence": proba})
```

### 5. Push to GitHub

```bash
git add .
git commit -m "Add Flask API for crop recommendation"
git push origin main
```

### 6. Create the Render Web Service

1. Sign in at [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repo (`agri-smart-logic`).
4. Fill in the settings:

| Setting | Value |
|---------|-------|
| Name | `opticrop-api` |
| Region | Closest to your users |
| Branch | `main` |
| Root Directory | `backend` |
| Runtime | `Python 3` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `gunicorn app:app --workers 2 --timeout 120 --bind 0.0.0.0:$PORT` |
| Instance Type | `Free` |

5. Click **Create Web Service**. The first build takes 2–4 minutes.

### 7. Environment Variables

In the Render dashboard, open your service → **Environment** → **Add Environment Variable**:

| Key | Example Value | Purpose |
|-----|---------------|---------|
| `PYTHON_VERSION` | `3.11.9` | Pin Python runtime |
| `MODEL_PATH` | `model.pkl` | Path to the pickled model |
| `ALLOWED_ORIGIN` | `https://your-frontend.lovable.app` | CORS whitelist for the OptiCrop UI |
| `FLASK_ENV` | `production` | Disable debug mode |
| `SECRET_KEY` | *(generate a strong random string)* | Flask session/signing key |

Click **Save Changes** — Render will automatically redeploy.

### 8. Serving the Trained Model

Two options for shipping `model.pkl`:

- **Commit it to the repo** (simplest, if the file is < 100 MB). Add it alongside `app.py`.
- **Download at startup** from cloud storage (S3, Google Drive, Hugging Face). Recommended when the model is large or updated often:

  ```python
  import urllib.request, os
  if not os.path.exists(MODEL_PATH):
      urllib.request.urlretrieve(os.environ["MODEL_URL"], MODEL_PATH)
  model = joblib.load(MODEL_PATH)
  ```

  Then add `MODEL_URL` as an environment variable in Render.

### 9. Test the Live API

Once the deploy is green, Render gives you a URL like `https://opticrop-api.onrender.com`.

```bash
curl -X POST https://opticrop-api.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{"N":90,"P":42,"K":43,"temperature":20.8,"humidity":82,"ph":6.5,"rainfall":202.9}'
```

Expected response:

```json
{ "crop": "rice", "confidence": 0.97 }
```

### 10. Connect the Frontend

In the OptiCrop web app, point the recommendation call to your Render URL. For example, add to a `.env` file:

```text
VITE_API_URL=https://opticrop-api.onrender.com
```

And call `${import.meta.env.VITE_API_URL}/predict` from the client.

### Troubleshooting

- **App sleeps after 15 min (Free tier):** first request after idle takes ~30s. Upgrade to a paid instance or ping `/` with a cron job to keep it warm.
- **`ModuleNotFoundError`:** make sure the package is listed in `requirements.txt`.
- **`sklearn` version mismatch when loading `model.pkl`:** pin the same scikit-learn version you used to train the model.
- **CORS errors in the browser:** set `ALLOWED_ORIGIN` to your frontend's exact URL (no trailing slash).

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

*Built with care for farmers, researchers, and sustainable agriculture.*

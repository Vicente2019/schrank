# Schrank

**Schrank** is a wardrobe management app built with **TypeScript**, **React** and **Express**. It helps you catalog your clothing items, create outfits, and (soon) plan what to wear based on the weather, personal preferences, and events.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- Python 3 (for image background removal with `rembg`)

### Installation

Clone the repo and install dependencies for both frontend and backend:

```bash
git clone https://github.com/your-username/schrank.git
cd schrank

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Python Virtual Environment

The backend uses rembg to remove image backgrounds before uploading to Cloudinary.

From backend/
```bash
python3 -m venv venv
source venv/bin/activate

# Install required python packages
pip install -r requirements.txt
```

### Running the app

Run both the backend and frontend:

From backend/
```bash
# Make sure the venv is activated
source venv/bin/activate
npm run dev
```

From frontend/
```bash
npm start
```
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

## License

This project is open-source and available under the [MIT License](LICENSE).

---

*Built with care for farmers, researchers, and sustainable agriculture.*

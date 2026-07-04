// Crop profiles derived from the classic Crop Recommendation dataset
// (approx mean values per crop). Used by a lightweight nearest-centroid
// classifier that mimics a Random Forest for a fully client-side demo.

export type CropName =
  | "rice" | "maize" | "chickpea" | "kidneybeans" | "pigeonpeas"
  | "mothbeans" | "mungbean" | "blackgram" | "lentil" | "pomegranate"
  | "banana" | "mango" | "grapes" | "watermelon" | "muskmelon"
  | "apple" | "orange" | "papaya" | "coconut" | "cotton" | "jute" | "coffee";

export interface CropProfile {
  name: CropName;
  label: string;
  emoji: string;
  N: number; P: number; K: number;
  temperature: number; humidity: number; ph: number; rainfall: number;
  season: string;
  water: string;
  fertilizer: string;
  description: string;
}

export const CROPS: CropProfile[] = [
  { name: "rice", label: "Rice", emoji: "🌾", N: 79, P: 47, K: 39, temperature: 23.7, humidity: 82, ph: 6.4, rainfall: 236, season: "Kharif (Jun–Nov)", water: "High — flooded paddies", fertilizer: "Urea + DAP; split N applications", description: "Staple cereal thriving in warm, humid climates with abundant water." },
  { name: "maize", label: "Maize", emoji: "🌽", N: 77, P: 48, K: 20, temperature: 22.4, humidity: 65, ph: 6.3, rainfall: 84, season: "Kharif / Rabi", water: "Moderate — 500–800 mm", fertilizer: "N:P:K 120:60:40", description: "Versatile cereal grown across tropical and temperate zones." },
  { name: "chickpea", label: "Chickpea", emoji: "🫘", N: 40, P: 67, K: 79, temperature: 18.9, humidity: 16, ph: 7.3, rainfall: 80, season: "Rabi (Oct–Mar)", water: "Low — rainfed", fertilizer: "Low N, Rhizobium inoculation", description: "Cool-season pulse; fixes atmospheric nitrogen naturally." },
  { name: "kidneybeans", label: "Kidney Beans", emoji: "🫘", N: 21, P: 67, K: 20, temperature: 20.1, humidity: 21, ph: 5.7, rainfall: 106, season: "Rabi", water: "Moderate", fertilizer: "Balanced NPK; low N", description: "Legume prized for protein; prefers cooler nights." },
  { name: "pigeonpeas", label: "Pigeon Peas", emoji: "🫛", N: 21, P: 68, K: 20, temperature: 27.7, humidity: 48, ph: 5.8, rainfall: 149, season: "Kharif", water: "Moderate", fertilizer: "Low N; P and K critical", description: "Drought-tolerant pulse suited to semi-arid regions." },
  { name: "mothbeans", label: "Moth Beans", emoji: "🌱", N: 21, P: 48, K: 20, temperature: 28.2, humidity: 53, ph: 6.8, rainfall: 51, season: "Kharif", water: "Very low", fertilizer: "Minimal fertilization", description: "Extremely drought-hardy legume for arid soils." },
  { name: "mungbean", label: "Mung Bean", emoji: "🌱", N: 21, P: 47, K: 20, temperature: 28.5, humidity: 85, ph: 6.7, rainfall: 48, season: "Kharif / Zaid", water: "Low", fertilizer: "Rhizobium + starter N", description: "Short-duration pulse ideal for crop rotation." },
  { name: "blackgram", label: "Black Gram", emoji: "🫘", N: 40, P: 67, K: 19, temperature: 29.9, humidity: 65, ph: 7.1, rainfall: 68, season: "Kharif", water: "Low", fertilizer: "P-heavy blend", description: "Warm-season pulse with excellent nutritional value." },
  { name: "lentil", label: "Lentil", emoji: "🫘", N: 19, P: 68, K: 19, temperature: 24.5, humidity: 65, ph: 6.9, rainfall: 46, season: "Rabi", water: "Low", fertilizer: "Low N; add S and Zn", description: "Cool-season pulse rich in protein and iron." },
  { name: "pomegranate", label: "Pomegranate", emoji: "🍎", N: 19, P: 18, K: 40, temperature: 21.8, humidity: 90, ph: 6.4, rainfall: 107, season: "Perennial", water: "Moderate; drip preferred", fertilizer: "High K; balanced micros", description: "Perennial fruit tolerant of a wide range of soils." },
  { name: "banana", label: "Banana", emoji: "🍌", N: 100, P: 82, K: 50, temperature: 27.4, humidity: 80, ph: 5.9, rainfall: 105, season: "Perennial", water: "High — 1200–2200 mm", fertilizer: "Heavy N and K", description: "Tropical fruit needing rich soil and steady moisture." },
  { name: "mango", label: "Mango", emoji: "🥭", N: 20, P: 27, K: 30, temperature: 31.2, humidity: 50, ph: 5.8, rainfall: 94, season: "Perennial (fruit Mar–Jul)", water: "Moderate", fertilizer: "Balanced NPK + FYM", description: "Iconic tropical fruit tree; loves warm, dry pre-flowering." },
  { name: "grapes", label: "Grapes", emoji: "🍇", N: 23, P: 132, K: 200, temperature: 23.8, humidity: 82, ph: 6.0, rainfall: 69, season: "Perennial", water: "Controlled irrigation", fertilizer: "High P & K; foliar sprays", description: "Vine crop demanding trellising and pruning discipline." },
  { name: "watermelon", label: "Watermelon", emoji: "🍉", N: 99, P: 17, K: 50, temperature: 25.6, humidity: 85, ph: 6.5, rainfall: 51, season: "Zaid (summer)", water: "Moderate — drip", fertilizer: "N early, K at fruiting", description: "Warm-season vine fruit for sandy loam soils." },
  { name: "muskmelon", label: "Muskmelon", emoji: "🍈", N: 100, P: 18, K: 50, temperature: 28.7, humidity: 92, ph: 6.4, rainfall: 25, season: "Zaid", water: "Low–moderate", fertilizer: "Starter N + K", description: "Sweet melon thriving in hot, dry climates." },
  { name: "apple", label: "Apple", emoji: "🍏", N: 21, P: 134, K: 200, temperature: 22.6, humidity: 92, ph: 5.9, rainfall: 113, season: "Temperate", water: "Moderate", fertilizer: "High P & K; Ca sprays", description: "Temperate fruit needing chilling hours." },
  { name: "orange", label: "Orange", emoji: "🍊", N: 19, P: 16, K: 10, temperature: 22.8, humidity: 92, ph: 7.0, rainfall: 110, season: "Perennial", water: "Moderate", fertilizer: "N-focused with micros", description: "Citrus tree suited to subtropical climates." },
  { name: "papaya", label: "Papaya", emoji: "🌴", N: 49, P: 59, K: 50, temperature: 33.7, humidity: 92, ph: 6.7, rainfall: 143, season: "Perennial", water: "Regular", fertilizer: "Balanced NPK + FYM", description: "Fast-growing tropical fruit with year-round harvest." },
  { name: "coconut", label: "Coconut", emoji: "🥥", N: 22, P: 17, K: 31, temperature: 27.4, humidity: 95, ph: 5.9, rainfall: 175, season: "Perennial", water: "High", fertilizer: "K and Mg critical", description: "Coastal palm producing fruit for decades." },
  { name: "cotton", label: "Cotton", emoji: "☁️", N: 118, P: 46, K: 20, temperature: 24.0, humidity: 80, ph: 6.9, rainfall: 80, season: "Kharif", water: "Moderate", fertilizer: "Heavy N; split doses", description: "Fiber crop for warm climates with deep soils." },
  { name: "jute", label: "Jute", emoji: "🌿", N: 78, P: 47, K: 40, temperature: 24.9, humidity: 80, ph: 6.7, rainfall: 175, season: "Kharif", water: "High", fertilizer: "Balanced NPK", description: "Bast fiber crop for humid, alluvial regions." },
  { name: "coffee", label: "Coffee", emoji: "☕", N: 101, P: 28, K: 30, temperature: 25.5, humidity: 59, ph: 6.8, rainfall: 158, season: "Perennial", water: "Well-distributed rain", fertilizer: "N-rich; shade grown", description: "Highland perennial requiring shade and cool temperatures." },
];

export interface SoilInput {
  N: number; P: number; K: number;
  temperature: number; humidity: number; ph: number; rainfall: number;
}

// Feature scales (approx std devs from the dataset) — used to normalize distance
const SCALE = { N: 37, P: 33, K: 51, temperature: 5, humidity: 22, ph: 0.77, rainfall: 55 };

function distance(a: SoilInput, b: CropProfile): number {
  const keys: (keyof SoilInput)[] = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"];
  let sum = 0;
  for (const k of keys) {
    const d = (a[k] - b[k]) / SCALE[k];
    sum += d * d;
  }
  return Math.sqrt(sum);
}

export interface Prediction {
  crop: CropProfile;
  confidence: number;
  top: { crop: CropProfile; confidence: number }[];
}

export function predictCrop(input: SoilInput): Prediction {
  const scored = CROPS.map((c) => ({ crop: c, dist: distance(input, c) }));
  scored.sort((a, b) => a.dist - b.dist);
  // Softmax-like conversion of inverse distance to probability
  const invs = scored.map((s) => 1 / (s.dist + 0.15));
  const total = invs.reduce((a, b) => a + b, 0);
  const probs = invs.map((v) => v / total);
  const top = scored.slice(0, 3).map((s, i) => ({ crop: s.crop, confidence: probs[i] }));
  return { crop: scored[0].crop, confidence: probs[0], top };
}

export function suitability(input: SoilInput, crop: CropProfile): {
  score: number;
  suitable: boolean;
  factors: { key: keyof SoilInput; label: string; input: number; ideal: number; status: "ok" | "low" | "high" }[];
} {
  const specs: { key: keyof SoilInput; label: string; tol: number }[] = [
    { key: "N", label: "Nitrogen (N)", tol: 30 },
    { key: "P", label: "Phosphorous (P)", tol: 25 },
    { key: "K", label: "Potassium (K)", tol: 30 },
    { key: "temperature", label: "Temperature (°C)", tol: 4 },
    { key: "humidity", label: "Humidity (%)", tol: 15 },
    { key: "ph", label: "Soil pH", tol: 0.8 },
    { key: "rainfall", label: "Rainfall (mm)", tol: 50 },
  ];
  const factors = specs.map((s) => {
    const ideal = crop[s.key];
    const val = input[s.key];
    const diff = val - ideal;
    let status: "ok" | "low" | "high" = "ok";
    if (Math.abs(diff) > s.tol) status = diff < 0 ? "low" : "high";
    return { key: s.key, label: s.label, input: val, ideal, status };
  });
  const okCount = factors.filter((f) => f.status === "ok").length;
  const score = Math.round((okCount / factors.length) * 100);
  return { score, suitable: score >= 70, factors };
}

// Prediction history (localStorage)
export interface HistoryEntry {
  id: string;
  at: number;
  input: SoilInput;
  crop: CropName;
  confidence: number;
}
const KEY = "opticrop.history.v1";
export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function saveHistoryEntry(e: HistoryEntry) {
  if (typeof window === "undefined") return;
  const all = loadHistory();
  all.unshift(e);
  localStorage.setItem(KEY, JSON.stringify(all.slice(0, 100)));
}
export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

# ☕ Caffeine Blueprint v3.0

A sophisticated **Coffee Architect Simulator** that allows users to design coffee drinks using a schematic/blueprint interface. Built with React, Tailwind CSS, and OpenAI API.

![Blueprint Theme](https://img.shields.io/badge/Theme-Retro--Engineering-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🎨 Features

### Core Functionality
- **Schematic Cup Visualizer**: Real-time visual representation of layered coffee drinks
- **Dynamic Recipe Engine**: Automatically adjusts drink composition based on:
  - Brewing method (Espresso Machine, V60, French Press, Aeropress)
  - Temperature (Hot/Iced)
  - Milk type (Whole, Oat, Almond, Soy)
  - Bean origin (Ethiopia, Colombia, Brazil, Kenya, Sumatra)

### Visual Design
- **Retro-Engineering Blueprint** aesthetic with dot-grid patterns
- **CSS-only cup** with realistic layer textures:
  - Water: Blue stripes
  - Milk: Cream gradients (customizable by milk type)
  - Foam: Radial dot pattern
  - Espresso: Dark brown noise texture
  - Ice: Geometric cube pattern
- **Callout lines** pointing from layers to labels (desktop)
- **Glass reflection effect** using CSS gradients

### AI Intelligence (OpenAI)
1. **Flavor Analysis**: Get a 40-word sensory description of your coffee
2. **Brewing Guide**: Generate step-by-step instructions with timings and temperatures
3. **Coffee Shop Finder**: Discover specialty coffee shops by location

### Smart Compatibility Engine
- Automatically filters incompatible drink/method combinations
- Real-time validation and user warnings
- Seamless drink switching when method changes

### Responsive Design
- **Mobile**: Stacked layout (visualizer top, controls bottom)
- **Desktop**: Split screen (60% visualizer left, 40% scrollable controls right)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to `http://localhost:5173`

## 📁 Project Structure

```
coffee-architect/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles and animations
├── index.html           # HTML template with Google Fonts
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## 🎯 Usage Guide

### Building a Coffee Drink

1. **Select Temperature**: Choose HOT or ICED
2. **Choose Brewing Method**: Pick from 4 professional methods
3. **Select Drink Blueprint**: Choose from 9 classic drinks (auto-filtered by method)
4. **Pick Bean Origin**: Select from 5 premium origins with tasting notes
5. **Choose Milk Type**: 5 options including dairy-free alternatives

### AI Features

#### Flavor Analysis
- Click "ANALYZE FLAVOR PROFILE"
- Get a professional sensory description
- Includes aroma, taste, body, and aftertaste notes

#### Brewing Guide
- Click "GENERATE BREWING GUIDE"
- Receive markdown-formatted instructions
- Includes temperatures, ratios, and timing

#### Coffee Shop Finder
- Click "FIND COFFEE SHOPS"
- Enter a city OR use current location (browser permission required)
- Get 3 real specialty coffee shop recommendations

## 🎨 Design System

### Colors
- **Background**: `#E3E8EF` (Drafting paper gray)
- **Ink**: `#000000` (Black)
- **Blueprint Blue**: `#2563eb`
- **Warning Red**: `#ef4444`

### Typography
- **Font**: Space Mono (monospace) for everything
- **Weights**: 400 (regular), 700 (bold)

### Textures
All textures are CSS-only using gradients and patterns:
- Dot grid background (radial gradient)
- Layer-specific textures (linear/radial gradients)
- Glass reflection effect (overlay gradient)

## 🔧 Configuration

### Data Structures

#### Adding a New Bean
Edit `BEANS` array in `App.jsx`:
```javascript
{
  id: 'unique-id',
  name: 'DISPLAY NAME',
  color: '#HEX_COLOR',
  notes: 'Tasting notes'
}
```

#### Adding a New Drink
Edit `DRINKS` array in `App.jsx`:
```javascript
{
  id: 'unique-id',
  name: 'DISPLAY NAME',
  baseLayers: [
    { type: 'espresso', height: 20, label: 'Description' },
    { type: 'milk', height: 60, label: 'Description' }
  ],
  compatible: ['machine', 'v60'] // method IDs
}
```

#### Layer Types
- `espresso`: Dark brown espresso
- `water`: Blue brewed coffee
- `milk`: Steamed milk (color changes with milk type)
- `foam`: Microfoam pattern
- `ice`: Ice cubes (auto-added when ICED selected)
- `cold-milk`: Cold milk variant

## 🌐 API Integration

### OpenAI Configuration
The app uses OpenAI's Chat Completions API (GPT-4):
- **Model**: `gpt-4`
- **Temperature**: 0.7
- **Max Tokens**: 500

### Location Services
- **Browser Geolocation API**: For current location
- **Nominatim (OpenStreetMap)**: Free reverse geocoding
- No API key required for location services

## 🎭 Animations

All animations use Tailwind classes or custom CSS:
- `fade-in`: 0.5s fade entrance
- `slide-in`: 0.4s slide-up entrance
- `pulse-slow`: 3s pulse for "LIVE RENDER" badge
- Callout lines animate with `stroke-dashoffset`

## 📱 Responsive Breakpoints

- **Mobile**: < 1024px (stacked layout)
- **Desktop**: ≥ 1024px (split screen, sticky visualizer)

## 🐛 Troubleshooting

### API Key Issues
- Ensure `.env` file exists in root directory
- Variable must be prefixed with `VITE_`
- Restart dev server after adding/changing `.env`

### Fonts Not Loading
- Check internet connection (Google Fonts CDN)
- Verify `<link>` tag in `index.html`
- Clear browser cache

### Location Services Not Working
- Grant browser permission for geolocation
- HTTPS required for production (localhost works)
- Fallback to manual city input always available

## 🚢 Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

Preview production build:
```bash
npm run preview
```

## 📄 License

MIT License - Feel free to use this project for learning or commercial purposes.

## 🙏 Credits

- **Design Inspiration**: Engineering blueprints and technical schematics
- **Fonts**: Space Mono by Colophon Foundry
- **Icons**: Lucide React
- **AI**: OpenAI GPT-4

---

**Built with ❤️ and ☕ by Coffee Enthusiasts**

*For support or feature requests, open an issue on GitHub*


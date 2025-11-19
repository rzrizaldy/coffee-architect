# ✨ Features Documentation - Caffeine Blueprint v3.0

## 🎨 Visual Design System

### Blueprint Aesthetic
The entire application follows a "Retro-Engineering Blueprint" theme:

- **Background**: Drafting paper gray (#E3E8EF)
- **Dot Grid Pattern**: CSS radial gradient on the visualizer
- **Monospace Font**: Space Mono throughout the entire app
- **Technical Labels**: Engineering-style callout lines on desktop
- **Badge System**: "LIVE RENDER" animated badge in header

### The Schematic Cup

The centerpiece of the application is a CSS-only glass cup that displays your coffee drink composition:

#### Cup Features
- **Isometric-style appearance** using clip-path
- **Glass reflection effect** with overlay gradient
- **Border**: 3px solid black for technical drawing aesthetic
- **Responsive sizing**: Adapts between mobile and desktop

#### Layer Textures
Each ingredient has a unique CSS texture:

1. **Espresso** (`layer-espresso`)
   - Dark brown (#3e2723) with noise pattern
   - Radial gradients simulating coffee crema

2. **Water** (`layer-water`)
   - Blue striped pattern
   - Animated gradient for visual interest

3. **Milk** (`layer-milk`)
   - Cream gradient (color changes by milk type)
   - Smooth transition between layers

4. **Foam** (`layer-foam`)
   - Radial dot pattern
   - White with cream undertones

5. **Ice** (`layer-ice`)
   - Geometric cube pattern
   - Light blue with transparent sections

6. **Cold Milk** (`layer-cold-milk`)
   - Lighter gradient than steamed milk
   - Auto-applied when ICED is selected

#### Callout Lines (Desktop Only)
- SVG-based lines pointing from layers to labels
- Animated stroke-dasharray for "drawing" effect
- Alternating left/right positioning
- Dashed line style (5,5 pattern)

## ☕ Coffee Configuration

### 1. Temperature Selection
**Toggle between HOT and ICED**

When ICED is selected:
- Milk layers become "Cold Milk"
- Ice layer is added to the top
- Espresso remains espresso (cold brew not implemented yet)
- Labels update to reflect temperature

Visual indicators:
- 🔥 HOT: Red button with Flame icon
- ❄️ ICED: Blue button with Droplets icon

### 2. Brewing Methods (4 Options)

#### Espresso Machine
- **Type**: `espresso`
- **Compatible Drinks**: Espresso-based (Espresso, Doppio, Latte, Cappuccino, Flat White, Macchiato, Americano)
- **Icon**: Coffee machine

#### Hario V60
- **Type**: `manual`
- **Compatible Drinks**: Filter Coffee, Café au Lait
- **Icon**: Droplets
- **Style**: Pour-over method

#### French Press
- **Type**: `manual`
- **Compatible Drinks**: Filter Coffee, Café au Lait
- **Icon**: Coffee
- **Style**: Immersion brewing

#### Aeropress
- **Type**: `manual`
- **Compatible Drinks**: Filter Coffee, Café au Lait
- **Icon**: Coffee
- **Style**: Pressure brewing

### 3. Drink Blueprints (9 Classic Drinks)

#### Espresso-Based (Machine Only)

**Espresso**
- Single shot (30ml)
- Pure and intense

**Doppio**
- Double shot (60ml)
- More volume, same intensity

**Caffè Latte**
- 15ml Espresso + 60ml Steamed Milk + 10ml Microfoam
- Smooth and milky

**Cappuccino**
- 20ml Espresso + 40ml Steamed Milk + 25ml Foam
- Traditional Italian ratio (1:2:2)

**Flat White**
- 20ml Ristretto + 60ml Microfoam + 5ml Thin Layer
- Velvety texture, strong coffee flavor

**Macchiato**
- 40ml Espresso + 20ml Foam Mark
- "Marked" espresso

**Americano**
- 20ml Espresso + 60ml Hot Water
- Espresso diluted with water

#### Manual Brewing Methods

**Filter Coffee**
- 80ml Brewed Coffee
- Clean, nuanced flavors

**Café au Lait**
- 40ml Brewed Coffee + 40ml Steamed Milk
- French breakfast classic

### 4. Bean Origins (5 Premium Origins)

Each bean has unique characteristics:

**Ethiopian Yirgacheffe** 🇪🇹
- Color: #D2691E (Sienna)
- Notes: Jasmine, Lemon, Tea
- Profile: Bright, floral, tea-like

**Colombian Supremo** 🇨🇴
- Color: #8B4513 (Saddle Brown)
- Notes: Caramel, Walnut, Cherry
- Profile: Balanced, sweet, nutty

**Brazilian Santos** 🇧🇷
- Color: #A0522D (Sienna)
- Notes: Chocolate, Nuts, Low Acidity
- Profile: Smooth, chocolatey, low acid

**Kenyan AA** 🇰🇪
- Color: #654321 (Dark Brown)
- Notes: Blackcurrant, Citrus, Wine
- Profile: Bold, fruity, wine-like

**Sumatran Mandheling** 🇮🇩
- Color: #3E2723 (Very Dark Brown)
- Notes: Earthy, Herbal, Full Body
- Profile: Heavy body, low acidity, earthy

### 5. Milk Types (5 Options)

**Whole Milk** 🥛
- Color: #fef3c7 (Cream)
- Traditional, rich, creamy

**Oat Milk** 🌾
- Color: #f5e6d3 (Light Tan)
- Creamy, slightly sweet, eco-friendly

**Almond Milk** 🥜
- Color: #faf8f3 (Very Light Cream)
- Light, nutty, low calorie

**Soy Milk** 🌱
- Color: #f8f4e6 (Pale Yellow)
- Protein-rich, classic dairy alternative

**No Milk** 🚫
- Transparent
- For black coffee lovers

## 🤖 AI Intelligence Features

### Powered by OpenAI GPT-4

All AI features use the OpenAI Chat Completions API with:
- **Model**: GPT-4
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 500 (concise responses)

### 1. Analyze Flavor Profile

**What it does:**
- Sends your current configuration (Bean + Method + Drink + Milk + Temperature) to OpenAI
- Returns a 40-word sensory description
- Focuses on aroma, taste, body, and aftertaste

**System Prompt:**
> "You are a professional coffee taster. Provide vivid, sensory descriptions of coffee drinks focusing on aroma, taste, body, and aftertaste. Be poetic but precise."

**Example Output:**
> "Bright Ethiopian Yirgacheffe shines through velvety oat milk. Jasmine aromatics dance with lemon zest. Medium body with tea-like clarity. The finish is clean, floral, lingering with gentle citrus notes. Perfectly balanced."

### 2. Generate Brewing Guide

**What it does:**
- Creates a step-by-step brewing guide for your exact configuration
- Includes temperatures, ratios, and timing
- Returns markdown-formatted instructions

**System Prompt:**
> "You are a professional barista and coffee educator. Provide clear, detailed brewing instructions with specific measurements and techniques."

**Example Output:**
```markdown
# Caffè Latte - Ethiopian Yirgacheffe

## Equipment
- Espresso machine
- Milk pitcher
- Thermometer

## Steps
1. Grind 18g of Ethiopian Yirgacheffe beans (fine espresso grind)
2. Preheat portafilter and cup
3. Tamp evenly at 30lbs pressure
4. Extract 30ml shot in 25-30 seconds at 93°C
5. Steam 180ml whole milk to 65°C with microfoam
6. Pour milk into espresso in circular motion
7. Create latte art if desired

## Result
A smooth, floral latte with jasmine notes and citrus brightness.
```

### 3. Find Coffee Shops

**What it does:**
- Finds 3 real, highly-rated specialty coffee shops
- Supports custom location input OR browser geolocation
- Returns shop names, descriptions, and specialties

**Location Methods:**

#### Option A: Manual Input
- User types city name (e.g., "San Francisco", "Tokyo", "London")

#### Option B: Browser Geolocation
- Uses browser's Geolocation API
- Requires user permission
- Reverse geocodes coordinates to city name using Nominatim (OpenStreetMap)
- Free, no API key required

**System Prompt:**
> "You are a coffee shop expert with knowledge of specialty coffee scenes worldwide. Provide real, existing coffee shops with accurate information."

**Example Output:**
> 1. **Blue Bottle Coffee** - Pioneer of the third wave coffee movement, known for meticulous pour-overs and single-origin espresso. Famous for their seasonal blends.
> 
> 2. **Sightglass Coffee** - Industrial-chic roastery and café specializing in light roasts. Known for their Owl's Howl espresso blend and expert baristas.
> 
> 3. **Ritual Coffee Roasters** - Mission District favorite with award-winning espresso. Renowned for direct trade relationships and exceptional Guatemalan beans.

## 🎯 Compatibility Engine

### How It Works

The app includes intelligent drink/method validation:

1. **Method Selection**: When you choose a brewing method, incompatible drinks are:
   - Visually disabled (grayed out)
   - Marked with reduced opacity
   - Not clickable

2. **Auto-Switching**: If you're viewing an espresso drink and switch to V60:
   - The app automatically selects a compatible drink (Filter Coffee)
   - No error states or broken UI
   - Smooth transition with animations

3. **Visual Feedback**:
   - Compatible drinks: White/Gray backgrounds, clickable
   - Current selection: Black background, white text
   - Incompatible drinks: Light gray, cursor-not-allowed

### Compatibility Matrix

| Drink | Machine | V60 | French Press | Aeropress |
|-------|---------|-----|--------------|-----------|
| Espresso | ✅ | ❌ | ❌ | ❌ |
| Doppio | ✅ | ❌ | ❌ | ❌ |
| Latte | ✅ | ❌ | ❌ | ❌ |
| Cappuccino | ✅ | ❌ | ❌ | ❌ |
| Flat White | ✅ | ❌ | ❌ | ❌ |
| Macchiato | ✅ | ❌ | ❌ | ❌ |
| Americano | ✅ | ❌ | ❌ | ❌ |
| Filter Coffee | ❌ | ✅ | ✅ | ✅ |
| Café au Lait | ❌ | ✅ | ✅ | ✅ |

## 📱 Responsive Design

### Mobile Layout (< 1024px)

**Structure:**
- Stacked vertical layout
- Visualizer on top (full width)
- Control panel below (scrollable)
- Layer list view (replaces callout lines)

**Optimizations:**
- Larger touch targets (min 44x44px)
- Simplified grid patterns
- Collapsed technical specs

### Desktop Layout (≥ 1024px)

**Structure:**
- Split screen: 60% left (visualizer), 40% right (controls)
- Sticky visualizer (stays visible while scrolling controls)
- SVG callout lines with animations
- Expanded technical details

**Enhancements:**
- Hover effects on buttons
- Smooth transitions
- More whitespace

## 🎭 Animations & Transitions

All animations enhance UX without being distracting:

### CSS Animations (Tailwind)

**fade-in** (0.5s ease-in)
- Used for: Initial page load, modal appearances
- Effect: Opacity 0 → 1

**slide-in** (0.4s ease-out)
- Used for: Modal entrances
- Effect: TranslateY(-10px) + Opacity 0 → Normal

**pulse-slow** (3s infinite)
- Used for: "LIVE RENDER" badge
- Effect: Subtle scale + opacity pulse

### Custom Animations

**Callout Lines**
- Uses SVG stroke-dasharray
- Animates from dashoffset 100 → 0
- Creates "drawing" effect

**Layer Transitions**
- All layers have `transition-all duration-500`
- Smooth height changes when switching drinks
- Color transitions when changing milk type

## 🔧 Technical Specs Display

Each schematic cup shows:

### Total Volume
- Sum of all layer heights
- Displayed in ml
- Updates in real-time

### Layer Count
- Number of distinct layers
- Changes with drink type
- Includes ice layer when iced

## 💾 Data Structure

All data is stored in JavaScript objects for easy modification:

### Example: DRINKS Array
```javascript
{
  id: 'latte',                    // Unique identifier
  name: 'CAFFÈ LATTE',            // Display name
  baseLayers: [                   // Layer composition
    { type: 'espresso', height: 15, label: 'Espresso' },
    { type: 'milk', height: 60, label: 'Steamed Milk' },
    { type: 'foam', height: 10, label: 'Microfoam' }
  ],
  compatible: ['machine']         // Compatible methods
}
```

## 🎨 Customization Guide

### Adding a New Drink

1. Add to `DRINKS` array in `App.jsx`
2. Define `baseLayers` with types, heights, and labels
3. Specify `compatible` methods
4. Layer types must match CSS classes

### Adding a New Brewing Method

1. Add to `METHODS` array
2. Import icon from `lucide-react`
3. Update compatibility in existing drinks

### Changing Colors/Textures

Edit `src/index.css`:
- Layer textures: `.layer-*` classes
- Background: `.dot-grid` class
- Reflections: `.glass-reflection::before`

### Modifying AI Prompts

In `App.jsx`, find the three AI functions:
- `analyzeFlavor()`: Line ~170
- `generateGuide()`: Line ~185
- `findCoffeeShops()`: Line ~200

Edit the `prompt` and `systemPrompt` variables.

---

**This application showcases the power of combining thoughtful UX design with modern web technologies and AI capabilities!**


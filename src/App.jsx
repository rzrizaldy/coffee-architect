import { useState, useEffect, useRef } from 'react'
import { 
  Coffee, Droplets, Flame, Map, Sparkles, FileText, 
  MapPin, Thermometer, Zap, Activity, Anchor, Wind,
  ChevronRight, Terminal, X, Search
} from 'lucide-react'

// ==================== DATA STRUCTURES ====================

const BEANS = [
  { id: 'ethiopia', name: 'ETHIOPIAN YIRGACHEFFE', color: '#D2691E', notes: 'Jasmine, Lemon, Tea' },
  { id: 'colombia', name: 'COLOMBIAN SUPREMO', color: '#8B4513', notes: 'Caramel, Walnut, Cherry' },
  { id: 'brazil', name: 'BRAZILIAN SANTOS', color: '#A0522D', notes: 'Chocolate, Nuts, Low Acidity' },
  { id: 'kenya', name: 'KENYAN AA', color: '#654321', notes: 'Blackcurrant, Citrus, Wine' },
  { id: 'sumatra', name: 'SUMATRAN MANDHELING', color: '#3E2723', notes: 'Earthy, Herbal, Full Body' },
]

const METHODS = [
  { id: 'machine', name: 'ESPRESSO MACHINE', type: 'espresso', icon: Zap },
  { id: 'v60', name: 'HARIO V60', type: 'manual', icon: Droplets },
  { id: 'french', name: 'FRENCH PRESS', type: 'manual', icon: Anchor },
  { id: 'aeropress', name: 'AEROPRESS', type: 'manual', icon: Wind },
]

const MILK_TYPES = [
  { id: 'whole', name: 'WHOLE MILK', color: '#fef3c7' },
  { id: 'oat', name: 'OAT MILK', color: '#f5e6d3' },
  { id: 'almond', name: 'ALMOND MILK', color: '#faf8f3' },
  { id: 'soy', name: 'SOY MILK', color: '#f8f4e6' },
  { id: 'none', name: 'NO MILK', color: 'transparent' },
]

const DRINKS = [
  {
    id: 'espresso',
    name: 'ESPRESSO',
    baseLayers: [{ type: 'espresso', height: 30, label: 'Single Shot' }],
    compatible: ['machine']
  },
  {
    id: 'doppio',
    name: 'DOPPIO',
    baseLayers: [{ type: 'espresso', height: 60, label: 'Double Shot' }],
    compatible: ['machine']
  },
  {
    id: 'latte',
    name: 'CAFFÈ LATTE',
    baseLayers: [
      { type: 'espresso', height: 15, label: 'Espresso' },
      { type: 'milk', height: 60, label: 'Steamed Milk' },
      { type: 'foam', height: 10, label: 'Microfoam' }
    ],
    compatible: ['machine']
  },
  {
    id: 'cappuccino',
    name: 'CAPPUCCINO',
    baseLayers: [
      { type: 'espresso', height: 20, label: 'Espresso' },
      { type: 'milk', height: 40, label: 'Steamed Milk' },
      { type: 'foam', height: 25, label: 'Foam' }
    ],
    compatible: ['machine']
  },
  {
    id: 'flatwhite',
    name: 'FLAT WHITE',
    baseLayers: [
      { type: 'espresso', height: 20, label: 'Ristretto' },
      { type: 'milk', height: 60, label: 'Microfoam' },
      { type: 'foam', height: 5, label: 'Thin Layer' }
    ],
    compatible: ['machine']
  },
  {
    id: 'macchiato',
    name: 'MACCHIATO',
    baseLayers: [
      { type: 'espresso', height: 40, label: 'Espresso' },
      { type: 'foam', height: 20, label: 'Foam Mark' }
    ],
    compatible: ['machine']
  },
  {
    id: 'americano',
    name: 'AMERICANO',
    baseLayers: [
      { type: 'espresso', height: 20, label: 'Espresso' },
      { type: 'water', height: 60, label: 'Hot Water' }
    ],
    compatible: ['machine']
  },
  {
    id: 'filter',
    name: 'FILTER COFFEE',
    baseLayers: [{ type: 'filter', height: 80, label: 'Brewed Coffee' }],
    compatible: ['v60', 'french', 'aeropress']
  },
  {
    id: 'aulait',
    name: 'CAFÉ AU LAIT',
    baseLayers: [
      { type: 'filter', height: 40, label: 'Brewed Coffee' },
      { type: 'milk', height: 40, label: 'Steamed Milk' }
    ],
    compatible: ['v60', 'french', 'aeropress']
  },
]

// ==================== COMPONENTS ====================

const Button = ({ children, onClick, active, disabled, className = '', icon: Icon }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      relative px-4 py-3 border-2 border-black font-bold text-sm transition-all duration-100
      flex items-center justify-center gap-2
      ${disabled 
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60' 
        : active
          ? 'bg-black text-white hard-shadow-sm translate-x-[1px] translate-y-[1px]'
          : 'bg-white text-black hard-shadow hover:hard-shadow-hover active:hard-shadow-active'
      }
      ${className}
    `}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </button>
)

const Card = ({ children, title, className = '' }) => (
  <div className={`bg-white border-2 border-black hard-shadow p-4 ${className}`}>
    {title && (
      <div className="border-b-2 border-black pb-2 mb-4 flex items-center justify-between">
        <h3 className="font-bold text-sm tracking-wider flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          {title}
        </h3>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <div className="w-2 h-2 bg-green-500 rounded-full" />
        </div>
      </div>
    )}
    {children}
  </div>
)

const Modal = ({ children, onClose, title }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
    <div className="bg-white border-4 border-black hard-shadow w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
      <div className="bg-black text-white p-4 flex items-center justify-between sticky top-0 z-10">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Activity className="w-5 h-5" />
          {title}
        </h2>
        <button onClick={onClose} className="hover:text-red-500 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
)

const MarkdownRenderer = ({ content }) => {
  const lines = content.split('\n')
  return (
    <div className="space-y-4 font-mono text-sm">
      {lines.map((line, i) => {
        if (line.startsWith('###')) return <h3 key={i} className="text-lg font-bold border-b-2 border-black pb-1 mt-4">{line.replace('###', '')}</h3>
        if (line.startsWith('##')) return <h2 key={i} className="text-xl font-bold bg-black text-white p-2 mt-6">{line.replace('##', '')}</h2>
        if (line.startsWith('#')) return <h1 key={i} className="text-2xl font-bold underline decoration-4 decoration-yellow-400 mb-6">{line.replace('#', '')}</h1>
        const parts = line.split(/(\*\*.*?\*\*)/g)
        return (
          <p key={i} className="leading-relaxed">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <span key={j} className="bg-yellow-100 px-1 font-bold border border-yellow-300">{part.slice(2, -2)}</span>
              }
              return part
            })}
          </p>
        )
      })}
    </div>
  )
}

// ==================== MAIN APP ====================

function App() {
  const [selectedMethod, setSelectedMethod] = useState('machine')
  const [selectedBean, setSelectedBean] = useState('ethiopia')
  const [selectedMilk, setSelectedMilk] = useState('whole')
  const [selectedDrink, setSelectedDrink] = useState('latte')
  const [isIced, setIsIced] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [locationInput, setLocationInput] = useState('')
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)

  const currentDrink = DRINKS.find(d => d.id === selectedDrink)
  const currentBean = BEANS.find(b => b.id === selectedBean)
  const currentMilk = MILK_TYPES.find(m => m.id === selectedMilk)
  const currentMethod = METHODS.find(m => m.id === selectedMethod)

  // Check if drink has milk
  const hasMilk = currentDrink?.baseLayers.some(l => ['milk', 'foam'].includes(l.type))

  useEffect(() => {
    if (currentDrink && !currentDrink.compatible.includes(selectedMethod)) {
      const compatibleDrink = DRINKS.find(d => d.compatible.includes(selectedMethod))
      if (compatibleDrink) setSelectedDrink(compatibleDrink.id)
    }
  }, [selectedMethod, selectedDrink, currentDrink])

  const generateLayers = () => {
    if (!currentDrink) return []
    let layers = [...currentDrink.baseLayers]
    if (isIced) {
      layers = layers.map(layer => {
        if (layer.type === 'milk') return { ...layer, type: 'milk', label: 'Cold Milk' }
        if (layer.type === 'foam') return { ...layer, type: 'foam', label: 'Cold Foam' }
        if (layer.type === 'water') return { ...layer, label: 'Cold Water' }
        return layer
      })
      layers.push({ type: 'ice', height: 20, label: 'Ice Cubes' })
    }
    return layers
  }

  const callOpenAI = async (prompt, systemPrompt) => {
    try {
      // Call Netlify serverless function (API key is hidden on server)
      const response = await fetch('/.netlify/functions/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemPrompt })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        return `Error: ${data.error || 'Failed to contact AI service'}`
      }
      
      return data.choices[0].message.content
    } catch (error) {
      return `Error: ${error.message}`
    }
  }

  const simulateLoading = async (callback) => {
    setAiLoading(true)
    const texts = ["ESTABLISHING UPLINK...", "CALCULATING VISCOSITY...", "ANALYZING AROMATICS...", "RENDERING OUTPUT..."]
    for (const text of texts) {
      setLoadingText(text)
      await new Promise(r => setTimeout(r, 800))
    }
    await callback()
    setAiLoading(false)
  }

  const handleAnalyzeFlavor = () => {
    setShowAIModal(true)
    simulateLoading(async () => {
      const prompt = `Describe the sensory experience of a ${isIced ? 'Iced' : 'Hot'} ${currentDrink.name} made with ${currentBean.name} beans and ${currentMilk.name}. 40 words max.`
      const response = await callOpenAI(prompt, "You are a technical coffee architect. Use precise, sensory language.")
      setAiResponse(response)
    })
  }

  const handleGenerateGuide = () => {
    setShowAIModal(true)
    simulateLoading(async () => {
      const prompt = `Create a brewing guide for ${currentDrink.name} (${currentMethod.name}). Include Dose, Ratio, Temp, and Time.`
      const response = await callOpenAI(prompt, "You are a coffee engineer. Output in Markdown. Use bold for key metrics.")
      setAiResponse(response)
    })
  }

  const handleFindShops = () => {
    setShowLocationModal(true)
  }

  const executeShopSearch = () => {
    simulateLoading(async () => {
      let loc = locationInput
      if (useCurrentLocation) loc = "Current Location"
      const prompt = `List 3 real specialty coffee shops in ${loc}. Format as markdown list.`
      const response = await callOpenAI(prompt, "You are a coffee scout. Only recommend highly rated specialty shops.")
      setAiResponse(response)
    })
  }

  const layers = generateLayers()
  
  // Calculate total volume for scaling
  const totalVolume = layers.reduce((sum, l) => sum + l.height, 0)
  
  // Scaling Logic:
  // We want the drink to look "full" regardless of volume, but still show relative differences.
  // Let's say a "full" cup is ~300ml visually.
  // We'll scale the layers so the total height fills about 70-80% of the container for a standard drink.
  // But we also want to respect small drinks like Espresso.
  
  // Base scale factor: 340px (container height) / 250ml (reference full cup)
  const scaleFactor = 340 / 200 
  
  // For very small drinks (espresso), we might want them to look a bit bigger than reality so they aren't tiny slivers
  // but still smaller than a latte.

  return (
    <div className="min-h-screen flex flex-col lg:flex-row drafting-grid text-black overflow-hidden">
      
      {/* LEFT PANEL: SIMULATOR STAGE */}
      <div className="lg:w-[60%] w-full lg:h-screen relative flex flex-col border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white/50 backdrop-blur-sm">
        
        {/* Header Badge */}
        <div className="absolute top-6 left-6 z-10">
          <div className="bg-black text-white px-4 py-2 font-bold text-xl hard-shadow border-2 border-white flex items-center gap-3">
            <Coffee className="w-6 h-6" />
            COFFEE ARCHITECT
          </div>
        </div>

        {/* The Visualizer */}
        <div className="flex-1 flex items-center justify-center min-h-[500px] relative p-8">
          
          {/* Cup Container */}
          <div className="relative w-[280px] h-[400px] flex flex-col items-center justify-end">
            
            {/* The Rim */}
            <div className="w-[300px] h-[12px] bg-white border-4 border-black rounded-full z-20 mb-[-6px]" />

            {/* The Glass Vessel */}
            <div className="relative w-[280px] h-[340px] border-x-4 border-b-4 border-black rounded-b-[40px] bg-white/30 backdrop-blur-md overflow-hidden z-10 shadow-xl">
              
              {/* Liquid Stack */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col-reverse w-full h-full justify-end">
                <div className="flex flex-col-reverse w-full h-full justify-start">
                  {layers.map((layer, i) => {
                    // Proportional Scaling
                    // If total volume is small (< 100ml), scale up more aggressively
                    // If total volume is large (> 200ml), scale normally
                    let visualHeight = layer.height * scaleFactor
                    
                    // Cap the total visual height to not overflow the cup (max 340px)
                    // We distribute the available space (340px) based on layer ratios if it exceeds
                    const totalVisualHeight = totalVolume * scaleFactor
                    if (totalVisualHeight > 340) {
                      visualHeight = (layer.height / totalVolume) * 340
                    }

                    return (
                      <div
                        key={`${layer.type}-${i}`}
                        className={`w-full layer-transition texture-${layer.type} border-t-2 border-black/10`}
                        style={{ height: `${visualHeight}px` }}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Glass Reflections */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 w-2 h-[80%] bg-white/40 rounded-full blur-[1px]" />
            </div>

            {/* Callout Lines (Desktop) */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              {layers.map((layer, i, arr) => {
                // Calculate position from bottom based on the SAME scaling logic
                let visualHeight = layer.height * scaleFactor
                const totalVisualHeight = totalVolume * scaleFactor
                if (totalVisualHeight > 340) {
                  visualHeight = (layer.height / totalVolume) * 340
                }

                const heightSoFar = arr.slice(0, i).reduce((sum, l) => {
                   let h = l.height * scaleFactor
                   if (totalVisualHeight > 340) h = (l.height / totalVolume) * 340
                   return sum + h
                }, 0)
                
                const centerOfLayer = heightSoFar + (visualHeight / 2)
                
                const isRight = i % 2 === 0
                
                return (
                  <div 
                    key={i}
                    className="absolute w-full flex items-center"
                    style={{ bottom: `${centerOfLayer}px` }}
                  >
                    {/* Line */}
                    <div 
                      className={`h-[2px] bg-black absolute ${isRight ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'}`}
                      style={{ width: '80px' }}
                    />
                    
                    {/* Label Box */}
                    <div 
                      className={`
                        absolute bg-white border-2 border-black px-4 py-2 hard-shadow-sm flex flex-col
                        ${isRight ? 'right-[-240px]' : 'left-[-240px]'}
                      `}
                      style={{ width: '150px' }}
                    >
                      <span className="text-[10px] font-bold text-gray-500 tracking-wider">LAYER {arr.length - i}</span>
                      <span className="text-sm font-bold">{layer.label.toUpperCase()}</span>
                      <span className="text-[10px] font-mono mt-1 border-t border-gray-200 pt-1">
                        VOL: {layer.height}ml
                      </span>
                    </div>
                    
                    {/* Connector Dot */}
                    <div 
                      className={`absolute w-3 h-3 bg-black rounded-full border-2 border-white ${isRight ? 'right-0' : 'left-0'}`}
                    />
                  </div>
                )
              })}
            </div>

          </div>
        </div>

        {/* Technical Footer */}
        <div className="p-4 border-t-4 border-black bg-white flex justify-between text-xs font-bold">
          <div>COORD: {selectedMethod.toUpperCase()} / {selectedDrink.toUpperCase()}</div>
          <div>TEMP: {isIced ? '2°C' : '93°C'}</div>
        </div>
      </div>

      {/* RIGHT PANEL: CONTROL PANEL */}
      <div className="lg:w-[40%] w-full h-full lg:h-screen overflow-y-auto bg-[#E3E8EF] p-6 space-y-8">
        
        {/* 1. Technique Selector */}
        <Card title="01_BREWING_METHOD">
          <div className="grid grid-cols-2 gap-3">
            {METHODS.map(method => (
              <Button
                key={method.id}
                active={selectedMethod === method.id}
                onClick={() => setSelectedMethod(method.id)}
                icon={method.icon}
              >
                {method.name}
              </Button>
            ))}
          </div>
        </Card>

        {/* 2. Temperature Selector (Separated) */}
        <Card title="02_TEMPERATURE">
          <div className="flex gap-3">
            <Button 
              className="flex-1" 
              active={!isIced} 
              onClick={() => setIsIced(false)}
              icon={Flame}
            >
              HOT
            </Button>
            <Button 
              className="flex-1" 
              active={isIced} 
              onClick={() => setIsIced(true)}
              icon={Droplets}
            >
              ICED
            </Button>
          </div>
        </Card>

        {/* 3. Blueprint Selector */}
        <Card title="03_DRINK_BLUEPRINT">
          <div className="grid grid-cols-2 gap-3">
            {DRINKS.map(drink => {
              const isCompatible = drink.compatible.includes(selectedMethod)
              const isSelected = selectedDrink === drink.id
              return (
                <button
                  key={drink.id}
                  disabled={!isCompatible}
                  onClick={() => setSelectedDrink(drink.id)}
                  className={`
                    relative p-3 border-2 border-black text-left transition-all
                    ${!isCompatible 
                      ? 'opacity-40 bg-gray-200 cursor-not-allowed' 
                      : isSelected 
                        ? 'bg-black text-white hard-shadow-sm' // Explicit selected state
                        : 'bg-white text-black hover:bg-gray-50' // Explicit unselected state
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-xs">{drink.id.toUpperCase()}</span>
                    {isSelected && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  <div className="text-sm font-bold">{drink.name}</div>
                </button>
              )
            })}
          </div>
        </Card>

        {/* 4. Configuration */}
        <Card title="04_CONFIGURATION">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold mb-2 block">BEAN ORIGIN</label>
              <div className="grid grid-cols-1 gap-2">
                {BEANS.map(bean => (
                  <button
                    key={bean.id}
                    onClick={() => setSelectedBean(bean.id)}
                    className={`
                      flex items-center gap-3 p-2 border-2 border-black transition-all
                      ${selectedBean === bean.id ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}
                    `}
                  >
                    <div className="w-4 h-4 border border-white/50" style={{ backgroundColor: bean.color }} />
                    <div className="text-left">
                      <div className="text-xs font-bold">{bean.name}</div>
                      <div className="text-[10px] opacity-70">{bean.notes}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold block">MILK TYPE</label>
                {!hasMilk && (
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    NOT APPLICABLE FOR {currentDrink?.name}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {MILK_TYPES.map(milk => (
                  <button
                    key={milk.id}
                    onClick={() => hasMilk && setSelectedMilk(milk.id)}
                    disabled={!hasMilk}
                    className={`
                      px-3 py-1 border-2 border-black text-xs font-bold transition-all
                      ${!hasMilk 
                        ? 'opacity-20 bg-gray-100 cursor-not-allowed border-gray-300 text-gray-400' 
                        : selectedMilk === milk.id 
                          ? 'bg-black text-white' 
                          : 'bg-white hover:bg-gray-50'
                      }
                    `}
                  >
                    {milk.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* 5. AI Intelligence */}
        <Card title="05_AI_UPLINK">
          <div className="space-y-3">
            <Button onClick={handleAnalyzeFlavor} className="w-full" icon={Sparkles}>
              ANALYZE FLAVOR PROFILE
            </Button>
            <Button onClick={handleGenerateGuide} className="w-full" icon={FileText}>
              GENERATE BREW GUIDE
            </Button>
            <Button onClick={handleFindShops} className="w-full" icon={MapPin}>
              LOCATE SUPPLY DROPS
            </Button>
          </div>
        </Card>

        <div className="text-center text-[10px] opacity-50 font-bold">
          SYSTEM STATUS: ONLINE // V3.0.1
        </div>
      </div>

      {/* MODALS */}
      {showAIModal && (
        <Modal title="AI_ANALYSIS_TERMINAL" onClose={() => setShowAIModal(false)}>
          {aiLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
              <div className="font-bold animate-pulse">{loadingText}</div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <MarkdownRenderer content={aiResponse || "NO DATA RECEIVED."} />
            </div>
          )}
        </Modal>
      )}

      {showLocationModal && (
        <Modal title="GEOLOCATION_SCANNER" onClose={() => setShowLocationModal(false)}>
          {aiLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
              <div className="font-bold animate-pulse">{loadingText}</div>
            </div>
          ) : aiResponse ? (
            <div className="prose prose-sm max-w-none">
              <MarkdownRenderer content={aiResponse} />
              <Button onClick={() => setAiResponse('')} className="mt-6 w-full">NEW SEARCH</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">TARGET SECTOR (CITY):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="ENTER COORDINATES..."
                    className="flex-1 p-3 border-2 border-black font-mono focus:outline-none focus:bg-yellow-50"
                    disabled={useCurrentLocation}
                  />
                  <Button onClick={executeShopSearch} disabled={!useCurrentLocation && !locationInput} icon={Search}>
                    SCAN
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border-2 border-black bg-gray-50">
                <input
                  type="checkbox"
                  id="useLocation"
                  checked={useCurrentLocation}
                  onChange={(e) => setUseCurrentLocation(e.target.checked)}
                  className="w-5 h-5 border-2 border-black rounded-none accent-black"
                />
                <label htmlFor="useLocation" className="text-sm font-bold cursor-pointer">
                  USE CURRENT GPS COORDINATES
                </label>
              </div>
            </div>
          )}
        </Modal>
      )}

    </div>
  )
}

export default App

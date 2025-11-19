# ⚡ Quick Start - Coffee Architect

## 🚀 Get Running in 3 Steps

### Step 1: Fix npm permissions (if needed)
```bash
sudo chown -R $(id -u):$(id -g) "$HOME/.npm"
```

### Step 2: Install & Configure
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your OpenAI API key:
# VITE_OPENAI_API_KEY=sk-your-key-here
```

### Step 3: Run
```bash
npm run dev
```

Open: **http://localhost:5173**

---

## 📝 What You Get

✅ **Beautiful Blueprint UI** - Retro engineering aesthetic  
✅ **Interactive Coffee Designer** - Build drinks visually  
✅ **9 Classic Drinks** - From espresso to filter coffee  
✅ **4 Brewing Methods** - Machine, V60, French Press, Aeropress  
✅ **5 Bean Origins** - Ethiopian, Colombian, Brazilian, Kenyan, Sumatran  
✅ **5 Milk Types** - Including dairy-free options  
✅ **Hot/Iced Toggle** - Dynamic recipe adjustment  
✅ **AI Features** - Flavor analysis, brewing guides, shop finder  
✅ **Fully Responsive** - Mobile and desktop optimized  

---

## 🔑 OpenAI API Key (Required for AI Features)

1. **Get Key**: https://platform.openai.com/api-keys
2. **Add to** `.env`: `VITE_OPENAI_API_KEY=sk-...`
3. **Restart** dev server

💡 **Tip**: App works without API key, AI features will just show error messages.

---

## 📚 Full Documentation

- **README.md** - Complete feature overview
- **SETUP.md** - Detailed setup & troubleshooting
- **FEATURES.md** - In-depth feature documentation

---

## 🎯 First Things to Try

1. ☕ Select "Espresso Machine" → "Caffè Latte"
2. 🌡️ Toggle "ICED" and watch the recipe change
3. 🌱 Switch milk to "OAT MILK" and see color update
4. 🇪🇹 Choose "Ethiopian Yirgacheffe" beans
5. 🤖 Click "ANALYZE FLAVOR PROFILE" (needs API key)

---

**Built with React + Vite + Tailwind CSS + OpenAI**


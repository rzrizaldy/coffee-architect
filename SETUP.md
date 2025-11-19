# 🔧 Setup Guide for Coffee Architect

## Quick Start (If npm works normally)

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## 🐛 Troubleshooting npm Cache Issue

If you see an error like:
```
npm error code EACCES
npm error Your cache folder contains root-owned files
```

**Fix it by running:**
```bash
sudo chown -R $(id -u):$(id -g) "$HOME/.npm"
```

Or the specific command from the error message:
```bash
sudo chown -R 501:20 "/Users/rzrizaldy/.npm"
```

Then try again:
```bash
npm install
```

## 📝 Step-by-Step Setup

### 1. Fix npm permissions (if needed)
```bash
sudo chown -R $(id -u):$(id -g) "$HOME/.npm"
```

### 2. Install dependencies
```bash
npm install
```

This will install:
- ✅ React 18.3.1
- ✅ React DOM 18.3.1
- ✅ Lucide React 0.462.0
- ✅ Vite 6.0.1
- ✅ Tailwind CSS 3.4.15
- ✅ PostCSS & Autoprefixer

### 3. Create your .env file
```bash
cp .env.example .env
```

### 4. Add your OpenAI API key
Edit `.env` and replace the placeholder:
```
VITE_OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

**Get your key from:** https://platform.openai.com/api-keys

### 5. Start the development server
```bash
npm run dev
```

### 6. Open in browser
Visit: http://localhost:5173

## 🎉 You're Ready!

The app should now be running with:
- ✨ Beautiful blueprint-themed UI
- ☕ Interactive coffee visualizer
- 🤖 AI-powered features (once API key is added)
- 📱 Fully responsive design

## 🔑 Getting an OpenAI API Key

1. Go to https://platform.openai.com/signup
2. Sign up or log in
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (you won't see it again!)
6. Paste it in your `.env` file

**Note:** OpenAI API usage is paid, but they offer free credits for new users.

## 🧪 Testing Without API Key

The app will still work without an API key! The AI features will show an error message, but you can:
- ✅ Design coffee drinks
- ✅ See the visual cup with layers
- ✅ Switch between methods and drinks
- ✅ Toggle hot/iced
- ✅ Change beans and milk types

AI features will just display: "Error: OpenAI API key not found..."

## 📦 Alternative: Using yarn or pnpm

If you prefer yarn or pnpm:

```bash
# Using yarn
yarn install
yarn dev

# Using pnpm
pnpm install
pnpm dev
```

## 🚨 Common Issues

### Port 5173 already in use
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9

# Or specify a different port
npm run dev -- --port 3000
```

### Tailwind styles not loading
1. Make sure `postcss.config.js` exists
2. Check `tailwind.config.js` is properly configured
3. Restart the dev server

### Fonts not showing
- Check internet connection (Google Fonts CDN)
- Clear browser cache
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

## 💡 Development Tips

### Hot Module Replacement
Vite provides instant HMR - your changes will appear immediately without full page reload!

### Browser DevTools
Open React DevTools for better debugging:
- Chrome: https://chrome.google.com/webstore (search "React Developer Tools")
- Firefox: Built-in

### Editing the Code
The main file to edit is `src/App.jsx`. Changes will hot-reload automatically!

## 🏗️ Building for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

Deploy the `dist/` folder to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

---

**Need Help?** Check the main README.md for full documentation!


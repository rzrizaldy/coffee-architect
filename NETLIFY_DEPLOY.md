# 🚀 Netlify Deployment Guide - SECURE API KEY SETUP

## ✅ Your API Key is 100% Hidden

This project uses **Netlify Serverless Functions** to keep your OpenAI API key completely hidden from the browser. It's never exposed to users!

---

## 📦 Step-by-Step Deployment

### Step 1: Build Locally (Optional - Test First)

```bash
cd /Users/rzrizaldy/CodeFolder/coffee_architect
npm install
npm run build
```

### Step 2: Deploy to Netlify

#### Option A: Netlify CLI (Fastest)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Deploy to production
netlify deploy --prod
```

#### Option B: GitHub Integration (Easiest)

1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select repository: `rzrizaldy/coffee-architect`
5. Build settings (auto-detected):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
6. Click **"Deploy site"**

---

## 🔐 Step 3: Add Your OpenAI API Key (CRITICAL!)

### Via Netlify Dashboard:

1. Go to your site dashboard: https://app.netlify.com/sites/[your-site-name]/configuration/env
2. Click **"Environment variables"** in the left sidebar
3. Click **"Add a variable"** → **"Add a single variable"**
4. Enter:
   - **Key**: `OPENAI_API_KEY` ⚠️ (NO `VITE_` prefix - this is server-side only!)
   - **Value**: `sk-proj-your-actual-openai-key-here`
   - **Scopes**: Select all (Builds, Functions, Post processing)
5. Click **"Create variable"**

### Via Netlify CLI:

```bash
netlify env:set OPENAI_API_KEY "sk-proj-your-actual-key-here"
```

---

## 🔄 Step 4: Redeploy (Important!)

After adding the environment variable, you must redeploy:

### Via Dashboard:
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**

### Via CLI:
```bash
netlify deploy --prod
```

---

## ✅ Step 5: Test Your Deployment

1. Open your live site: `https://your-site-name.netlify.app`
2. Design a coffee drink (should work immediately ✅)
3. Click **"ANALYZE FLAVOR PROFILE"** (tests AI integration 🤖)
4. Click **"GENERATE BREW GUIDE"** (tests AI integration 📖)
5. Click **"LOCATE SUPPLY DROPS"** (tests AI integration 🗺️)

### Expected Results:
- ✅ If AI features work → API key is properly configured!
- ❌ If you see "OpenAI API key not configured" → Check Step 3 and redeploy

---

## 🔒 Security Benefits

### ✅ What's Protected:
- Your OpenAI API key is **NEVER** sent to the browser
- It's stored only in Netlify's secure environment
- All AI requests go through your serverless function
- Users can't steal your key from browser console

### ⚠️ Old Method (Exposed):
```javascript
// DON'T DO THIS - Key visible in browser!
const apiKey = import.meta.env.VITE_OPENAI_API_KEY
fetch('https://api.openai.com/...', {
  headers: { 'Authorization': `Bearer ${apiKey}` } // ❌ EXPOSED!
})
```

### ✅ New Method (Hidden):
```javascript
// DO THIS - Key stays on server!
fetch('/.netlify/functions/openai', { // ✅ SECURE!
  body: JSON.stringify({ prompt, systemPrompt })
})
```

---

## 📊 Monitoring & Limits

### Check OpenAI Usage:
https://platform.openai.com/usage

### Set Usage Limits (Highly Recommended):
1. Go to https://platform.openai.com/account/limits
2. Set **monthly budget limit** (e.g., $10)
3. Enable **email alerts**

### Netlify Function Limits (Free Tier):
- **125,000 function invocations/month**
- **100 hours runtime/month**

Your coffee app will use ~1-3 seconds per AI request, so you're covered! 🎉

---

## 🐛 Troubleshooting

### Error: "OpenAI API key not configured on server"
**Solution**: 
1. Check variable name is exactly `OPENAI_API_KEY` (no typos!)
2. Redeploy after adding the variable
3. Clear browser cache

### Error: "Function not found"
**Solution**:
1. Check `netlify.toml` exists in root directory
2. Verify `functions = "netlify/functions"` is set
3. Redeploy

### Error: "401 Unauthorized"
**Solution**:
1. Your API key is invalid or expired
2. Get a new key: https://platform.openai.com/api-keys
3. Update in Netlify dashboard

### AI features timeout
**Solution**:
1. GPT-4 can be slow (30-60 seconds)
2. Consider using `gpt-3.5-turbo` for faster responses
3. Edit `netlify/functions/openai.js`, change `model: 'gpt-4'` to `model: 'gpt-3.5-turbo'`

---

## 🎯 Quick Commands Reference

```bash
# Deploy to production
netlify deploy --prod

# Check deployment status
netlify status

# View environment variables
netlify env:list

# View function logs (debug issues)
netlify functions:log openai

# Open site in browser
netlify open:site

# Open admin dashboard
netlify open:admin
```

---

## 🌐 Custom Domain (Optional)

### Add Your Domain:
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `coffee.yourdomain.com`)
4. Follow DNS setup instructions

---

## 💰 Cost Estimate

### Netlify Hosting: **FREE** ✅
- Free tier includes everything you need
- 100GB bandwidth/month
- Unlimited sites

### OpenAI API Costs:
- **GPT-4**: ~$0.01-0.02 per coffee description
- **GPT-3.5-Turbo**: ~$0.001 per description (20x cheaper!)
- Set a $5-10 monthly limit for safety

**Total**: Essentially free for personal projects! 🎉

---

## 🚀 You're Live!

Your Coffee Architect is now deployed at:
**`https://[your-site-name].netlify.app`**

Share it with the world! ☕✨

---

## 📞 Need Help?

- **Netlify Docs**: https://docs.netlify.com/functions/overview/
- **OpenAI Docs**: https://platform.openai.com/docs/
- **GitHub Issues**: https://github.com/rzrizaldy/coffee-architect/issues

---

## 🔐 Security Checklist

Before sharing your site, verify:
- ✅ API key is set as `OPENAI_API_KEY` (not `VITE_OPENAI_API_KEY`)
- ✅ Variable is set in Netlify dashboard (not in code)
- ✅ `.env` is in `.gitignore` (already done ✅)
- ✅ You've redeployed after adding the variable
- ✅ OpenAI usage limits are set
- ✅ AI features work on live site

**All secure? Share away!** 🎉


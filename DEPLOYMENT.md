# 🚀 Deployment Guide - Coffee Architect

## 🔐 Security Notice

**NEVER** commit your OpenAI API key to GitHub. It's already protected in `.gitignore`.

---

## Option 1: Vercel (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
cd /Users/rzrizaldy/CodeFolder/coffee_architect
vercel
```

### Step 3: Add Environment Variable
1. Go to https://vercel.com/dashboard
2. Select `coffee-architect` project
3. Go to **Settings** → **Environment Variables**
4. Add variable:
   - **Name**: `VITE_OPENAI_API_KEY`
   - **Value**: `sk-proj-your-actual-key-here`
   - **Environments**: Select all (Production, Preview, Development)
5. Click **Save**

### Step 4: Redeploy
```bash
vercel --prod
```

Your app will be live at: `https://coffee-architect.vercel.app`

---

## Option 2: Netlify

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Build
```bash
npm run build
```

### Step 3: Deploy
```bash
netlify login
netlify init
netlify deploy --prod
```

### Step 4: Add Environment Variable
1. Go to https://app.netlify.com/
2. Select your site
3. Go to **Site configuration** → **Environment variables**
4. Click **Add a variable**
   - **Key**: `VITE_OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
5. Click **Create variable**

### Step 5: Rebuild
Either:
- Push a new commit to GitHub (if connected)
- Or manually trigger deploy: `netlify deploy --prod`

---

## Option 3: Backend Proxy (Most Secure)

For production apps, it's better to **hide your API key** by using a backend proxy.

### Why?
- Frontend environment variables are visible in browser console
- Anyone can extract and use your API key
- This leads to unexpected costs

### Solution: Create a Backend API Route

We'll create a Vercel serverless function to proxy OpenAI requests.

### Step 1: Create API Route
Create `/api/openai.js`:

```javascript
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, systemPrompt } = req.body

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // No VITE_ prefix
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    })

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
```

### Step 2: Update Frontend Code
In `src/App.jsx`, change the `callOpenAI` function:

```javascript
const callOpenAI = async (prompt, systemPrompt) => {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, systemPrompt })
    })
    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    return `Error: ${error.message}`
  }
}
```

### Step 3: Set Environment Variable in Vercel
- Variable name: `OPENAI_API_KEY` (no `VITE_` prefix)
- Value: Your API key

### Step 4: Deploy
```bash
vercel --prod
```

Now your API key is **completely hidden** from the frontend! 🔒

---

## Quick Commands Reference

### Vercel
```bash
# First deployment
vercel

# Production deployment
vercel --prod

# Check deployment status
vercel ls
```

### Netlify
```bash
# First deployment
netlify init
netlify deploy

# Production deployment
netlify deploy --prod

# Check status
netlify status
```

---

## 💰 Cost Considerations

### OpenAI API Costs
- GPT-4: ~$0.03 per 1K tokens (input) + ~$0.06 per 1K tokens (output)
- A typical coffee description (40 words) ≈ $0.01-0.02
- Set usage limits in OpenAI dashboard: https://platform.openai.com/account/limits

### Hosting Costs
- **Vercel Free Tier**: 100GB bandwidth, unlimited sites
- **Netlify Free Tier**: 100GB bandwidth, 300 build minutes/month

Both are FREE for most personal projects! 🎉

---

## 🧪 Testing Deployment

After deployment, test these features:
1. ☕ Design a coffee drink (should work immediately)
2. 🤖 Click "ANALYZE FLAVOR PROFILE" (needs API key)
3. 📖 Click "GENERATE BREW GUIDE" (needs API key)
4. 🗺️ Click "LOCATE SUPPLY DROPS" (needs API key)

If AI features show "Error: OpenAI API key not found", you need to:
1. Add the environment variable
2. Redeploy the site

---

## 🔧 Troubleshooting

### "API key not found" error
- ✅ Check environment variable name is exactly `VITE_OPENAI_API_KEY`
- ✅ Redeploy after adding the variable
- ✅ Clear browser cache

### "401 Unauthorized" error
- ❌ Your API key is invalid or expired
- Get a new key: https://platform.openai.com/api-keys

### Build fails
- Check `npm run build` works locally first
- Look at deployment logs for specific errors

---

## 📊 Monitoring

### OpenAI Usage
Monitor your API usage: https://platform.openai.com/usage

### Deployment Analytics
- **Vercel**: https://vercel.com/dashboard/analytics
- **Netlify**: https://app.netlify.com/sites/your-site/analytics

---

## 🎉 Next Steps

1. Deploy to Vercel/Netlify
2. Add your OpenAI API key as environment variable
3. Test all features
4. Share your live URL!

**Example URLs:**
- Vercel: `https://coffee-architect.vercel.app`
- Netlify: `https://coffee-architect.netlify.app`
- Custom domain: `https://coffee.yourdomain.com`

---

**Need help?** Open an issue on GitHub: https://github.com/rzrizaldy/coffee-architect/issues


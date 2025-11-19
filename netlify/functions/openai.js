// Netlify Serverless Function - OpenAI API Proxy
// This keeps your API key completely hidden from the frontend

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { prompt, systemPrompt } = JSON.parse(event.body)

    // Get API key from environment (server-side only, never exposed to browser)
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'OpenAI API key not configured on server. Please add OPENAI_API_KEY to Netlify environment variables.' 
        })
      }
    }

    // Call OpenAI API from server-side
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    const data = await response.json()

    // Handle OpenAI API errors
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: data.error?.message || 'OpenAI API error' 
        })
      }
    }

    // Return successful response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Adjust in production to your domain
      },
      body: JSON.stringify(data)
    }
  } catch (error) {
    console.error('OpenAI proxy error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: `Server error: ${error.message}` 
      })
    }
  }
}


import { NextRequest, NextResponse } from 'next/server';
// Define the expected response structure
interface Background {
  background: string[];
  objection: string;
}
interface GenerationResult {
  objections: Background[];
}

// Disable Next.js caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const { scenario } = await request.json();
    
    if (!scenario) {
      return NextResponse.json(
        { error: 'Scenario is required' },
        { status: 400 }
      );
    }
    
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }
    
    const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-3-opus:beta';
    
    const prompt = `Generate 5 objections (mix of obvious to surprising) for this sales training scenario (each max 25 words). Then write one hidden issue (max 40 words) for each objection that only the customer would know that the sales person has to reveal through objection handling. The hidden issue has to be a reason connected to its original objection, should be not something that blocks the sales but can be handled, and maybe adds an interesting twist. All are framed as I-statements.
Return the response as a JSON object with the following structure:
{
  "objections": [
    {
      "objection": "String describing the objection",
      "background": [
        "One private reason the customer has for this objection"
      ]
    },
    {
      "objection": "String describing another objection",
      "background": [
        "One private reason the customer has for this objection"
      ]
    }
    // and so on for all 5 objections
  ]
}
Scenario context:
${scenario}`;
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
        'X-Title': 'Breakout Room Background Generator',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.9,
        max_tokens: 1500
      }),
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate content' },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    // Parse the content from the response
    let result: GenerationResult;
    
    try {
      // For some models, the content might be a string that needs parsing
      if (typeof data.choices[0].message.content === 'string') {
        result = JSON.parse(data.choices[0].message.content);
      } else {
        // For models that return structured data directly
        result = data.choices[0].message.content;
      }
      
      // Validate the structure
      if (!result.objections || !Array.isArray(result.objections) || result.objections.length === 0) {
        throw new Error('Invalid response structure');
      }
      
      // Randomly select one objection from the generated set
      const randomIndex = Math.floor(Math.random() * result.objections.length);
      const selectedObjection = result.objections[randomIndex];
      
      // Return only the selected objection
      return NextResponse.json({ objections: [selectedObjection] }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store'
        }
      });
    } catch (error) {
      console.error('Error parsing response:', error);
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > RATE_LIMIT_WINDOW) {
    userData.count = 1;
    userData.lastReset = now;
    rateLimitMap.set(ip, userData);
    return false;
  }

  userData.count++;
  rateLimitMap.set(ip, userData);
  return userData.count > MAX_REQUESTS;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';

    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again in a minute.' }), { 
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { messages } = await req.json();
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GOOGLE_AI_API_KEY is not configured.' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Read context.md for the system prompt
    const contextPath = path.join(process.cwd(), 'context.md');
    const context = fs.readFileSync(contextPath, 'utf8');

    const systemPrompt = `You are Kenneth P. Osorio, a professional Software Engineer, DevOps, and Cloud specialist. 
Your goal is to answer inquiries about yourself using the provided context. 
Always speak in the first person (e.g., "I am...", "I have...", "My projects include..."). 
Be concise, professional, and friendly. 
If the information is not in the context, politely state that you don't have that specific detail at hand and suggest contacting you directly.

Context:
${context}`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash', // Currently the fastest stable version
      systemInstruction: systemPrompt 
    });


    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessageStream(lastMessage);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          controller.enqueue(encoder.encode(chunkText));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

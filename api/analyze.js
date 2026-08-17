import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

/* global process */
import { GoogleGenAI, Type } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body || {};

  if (!text || text.trim().length === 0) {
    return res.status(400).json({ error: 'Feedback text is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error('❌ Missing GEMINI_API_KEY!');
    return res.status(500).json({ error: 'GEMINI_API_KEY is not defined in environment.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Use gemini-1.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Analyze the following customer feedback text/reviews and extract structured insights:

"${text}"`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: {
              type: Type.OBJECT,
              properties: {
                positive: { type: Type.NUMBER, description: 'Percentage of positive sentiment (0-100)' },
                neutral: { type: Type.NUMBER, description: 'Percentage of neutral sentiment (0-100)' },
                negative: { type: Type.NUMBER, description: 'Percentage of negative sentiment (0-100)' },
              },
              required: ['positive', 'neutral', 'negative'],
            },
            summary: { type: Type.STRING, description: 'Brief 1-2 sentence executive summary of overall feedback.' },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING, description: 'Must be "bug", "feature", or "praise"' },
                  urgency: { type: Type.STRING, description: 'Must be "high", "medium", or "low"' },
                  title: { type: Type.STRING, description: 'Short concise title' },
                  description: { type: Type.STRING, description: 'Specific details extracted from feedback' },
                  source: { type: Type.STRING, description: 'Extracted source or tag e.g. Customer Review' },
                },
                required: ['id', 'type', 'urgency', 'title', 'description', 'source'],
              },
            },
            responseDraft: { type: Type.STRING, description: 'Empathetic professional customer support email template' },
          },
          required: ['sentiment', 'summary', 'items', 'responseDraft'],
        },
      },
    });

    let rawText = response.text ? response.text.trim() : '';
    if (rawText.startsWith('```json')) {
      rawText = rawText.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (rawText.startsWith('```')) {
      rawText = rawText.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const parsedData = JSON.parse(rawText);
    return res.status(200).json(parsedData);

  } catch (err) {
    console.error('❌ Serverless Error:', err);
    return res.status(500).json({ error: err.message || 'Failed to process feedback.' });
  }
}
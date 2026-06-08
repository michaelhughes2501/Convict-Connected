import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Only initialize Google AI plugin when API key is present
// App boots fine without it; AI features will be unavailable
const plugins = process.env.GOOGLE_GENAI_API_KEY ? [googleAI()] : [];

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-2.5-flash',
});

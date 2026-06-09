import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/google-genai';

// Only initialize Google AI plugin when API key is present
const plugins = process.env.GOOGLE_GENAI_API_KEY ? [googleAI()] : [];

export const ai = genkit({
  plugins,
  // Setting the default model to 1.5 Flash (stable and fast)
  model: gemini15Flash, 
});

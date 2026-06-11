import { z } from 'zod';
import { ai } from '@/ai/genkit';

/**
 * Commissary Search Flow
 * 
 * This flow assists Residents in navigating community resources using
 * a natural language interface. Consistent with repository guidelines,
 * it uses dignified and supportive language.
 */
export const commissarySearch = ai.defineFlow(
  {
    name: 'commissarySearch',
    inputSchema: z.object({
      query: z.string().describe('Resident inquiry for resources (e.g., "I need a place to stay")'),
    }),
    outputSchema: z.object({
      guidance: z.string().describe('Empowering response from the assistant'),
      results: z.array(
        z.object({
          name: z.string(),
          category: z.enum(['Housing', 'Employment', 'Legal', 'Health', 'Education', 'Other']),
          description: z.string(),
        })
      ),
    }),
  },
  async (input) => {
    const response = await ai.generate({
      prompt: `
        You are a community navigator for 'Convict Connected'. 
        A Resident is searching the 'Commissary' (our resource hub) for help with: "${input.query}".
        
        1. Provide a warm, dignified, and empowering message of support.
        2. Identify 3 categories of help or specific types of organizations they should look for.
        
        Tone check: 
        - Use "Resident" instead of "inmate".
        - Maintain a community-oriented and positive framing.
      `,
      output: {
        schema: z.object({
          guidance: z.string(),
          results: z.array(z.object({ name: z.string(), category: z.string(), description: z.string() })),
        }),
      },
    });

    return response.output()!;
  }
);
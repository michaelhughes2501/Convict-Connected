'use server';

/**
 * @fileOverview Provides educational sentencing estimates based on crime descriptions.
 *
 * - calculateSentence - A function that estimates a prison sentence range.
 * - SentenceCalculatorInput - The input type for the calculateSentence function.
 * - SentenceCalculatorOutput - The return type for the calculateSentence function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SentenceCalculatorInputSchema = z.object({
  crimeDescription: z.string().describe('A description of the crime committed.'),
  jurisdiction: z.string().optional().describe('The state or federal jurisdiction.'),
  circumstances: z.string().optional().describe('Any mitigating or aggravating circumstances.'),
});
export type SentenceCalculatorInput = z.infer<typeof SentenceCalculatorInputSchema>;

const SentenceCalculatorOutputSchema = z.object({
  estimatedSentenceRange: z.string().describe('The estimated range of the prison sentence (e.g., 5-10 years).'),
  likelyParoleEligibility: z.string().describe('An estimate of when parole might be granted.'),
  commonFactors: z.array(z.string()).describe('Factors that typically influence this sentence.'),
  legalContext: z.string().describe('A brief explanation of the legal logic or guidelines applied.'),
  disclaimer: z.string().describe('A mandatory legal disclaimer stating this is not legal advice.'),
});
export type SentenceCalculatorOutput = z.infer<typeof SentenceCalculatorOutputSchema>;

export async function calculateSentence(input: SentenceCalculatorInput): Promise<SentenceCalculatorOutput> {
  return sentenceCalculatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sentenceCalculatorPrompt',
  input: {schema: SentenceCalculatorInputSchema},
  output: {schema: SentenceCalculatorOutputSchema},
  prompt: `You are an AI legal researcher assistant for ConvictConnect, a support community.
  Your goal is to provide an educational estimate of a potential prison sentence based on common legal patterns and sentencing guidelines.

  User Input:
  Crime Description: {{{crimeDescription}}}
  Jurisdiction: {{{jurisdiction}}}
  Circumstances: {{{circumstances}}}

  Provide a structured response. Be realistic but educational.
  ALWAYS include a strong disclaimer that this is NOT legal advice and should not be used in court or for legal decisions.
  `,
});

const sentenceCalculatorFlow = ai.defineFlow(
  {
    name: 'sentenceCalculatorFlow',
    inputSchema: SentenceCalculatorInputSchema,
    outputSchema: SentenceCalculatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

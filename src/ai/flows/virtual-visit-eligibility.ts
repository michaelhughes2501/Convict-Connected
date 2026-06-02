'use server';
/**
 * @fileOverview Determines if two users are eligible for a virtual visit based on their communication history and profile data.
 *
 * - assessVisitEligibility - A function that assesses virtual visit eligibility.
 * - VirtualVisitEligibilityInput - The input type for the assessVisitEligibility function.
 * - VirtualVisitEligibilityOutput - The return type for the assessVisitEligibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VirtualVisitEligibilityInputSchema = z.object({
  userProfile: z.string().describe('The profile data of the user requesting the visit.'),
  matchProfile: z.string().describe('The profile data of the potential match.'),
  communicationHistory: z
    .string()
    .describe('A summary of the communication history between the two users.'),
});
export type VirtualVisitEligibilityInput = z.infer<typeof VirtualVisitEligibilityInputSchema>;

const VirtualVisitEligibilityOutputSchema = z.object({
  isEligible: z.boolean().describe('Whether the two users are eligible for a virtual visit.'),
  reason: z
    .string()
    .describe('The reason for the eligibility determination, providing context.'),
});
export type VirtualVisitEligibilityOutput = z.infer<typeof VirtualVisitEligibilityOutputSchema>;

export async function assessVisitEligibility(
  input: VirtualVisitEligibilityInput
): Promise<VirtualVisitEligibilityOutput> {
  return assessVisitEligibilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'virtualVisitEligibilityPrompt',
  input: {schema: VirtualVisitEligibilityInputSchema},
  output: {schema: VirtualVisitEligibilityOutputSchema},
  prompt: `You are an AI assistant that determines if two users of a dating app for felons are ready for a virtual visit.

  Consider the following information when making your determination:

  User Profile: {{{userProfile}}}
  Match Profile: {{{matchProfile}}}
  Communication History: {{{communicationHistory}}}

  Determine if the users are eligible for a virtual visit based on the provided information. Focus on safety and trust. Return the reason for your decision.
  Set the isEligible field to true if they are eligible, and false if they are not.
  `,
});

const assessVisitEligibilityFlow = ai.defineFlow(
  {
    name: 'assessVisitEligibilityFlow',
    inputSchema: VirtualVisitEligibilityInputSchema,
    outputSchema: VirtualVisitEligibilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

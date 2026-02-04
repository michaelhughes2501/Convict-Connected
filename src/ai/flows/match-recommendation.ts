'use server';

/**
 * @fileOverview Provides match recommendations based on user profile and preferences.
 *
 * - getMatchRecommendations - A function that takes a user profile and preferences and returns a list of potential matches.
 * - MatchRecommendationInput - The input type for the getMatchRecommendations function.
 * - MatchRecommendationOutput - The return type for the getMatchRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchRecommendationInputSchema = z.object({
  userProfile: z.object({
    background: z.string().describe('Details of the user profile.'),
    interests: z.string().describe('User interests.'),
    preferences: z.string().describe('User preferences for a match.'),
  }).describe('The user profile and preferences.'),
  otherUserProfiles: z.array(
    z.object({
        background: z.string().describe('Details of the other user profile.'),
        interests: z.string().describe('Other User interests.'),
    }).describe('The other user profiles to compare against'),
  ).describe('List of other user profiles in the app')
});
export type MatchRecommendationInput = z.infer<typeof MatchRecommendationInputSchema>;

const MatchRecommendationOutputSchema = z.array(
z.object({
    userId: z.string().describe('The user id of the recommended match'),
    matchScore: z.number().describe('A score indicating how good of a match the user is, higher is better.'),
    reason: z.string().describe('The reason why this user is a good match.'),
  }).describe('A potential match recommendation')
).describe('A list of match recommendations, sorted by match score in descending order.');
export type MatchRecommendationOutput = z.infer<typeof MatchRecommendationOutputSchema>;

export async function getMatchRecommendations(input: MatchRecommendationInput): Promise<MatchRecommendationOutput> {
  return matchRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchRecommendationPrompt',
  input: {schema: MatchRecommendationInputSchema},
  output: {schema: MatchRecommendationOutputSchema},
  prompt: `You are a dating app matchmaker specializing in connecting individuals.

Given a user profile and a list of other user profiles, determine the best matches for the user.

User Profile: {{{userProfile}}}
Other User Profiles: {{{otherUserProfiles}}}

Provide a list of match recommendations, sorted by match score in descending order.
Include a brief reason for each recommendation.
`,
});

const matchRecommendationFlow = ai.defineFlow(
  {
    name: 'matchRecommendationFlow',
    inputSchema: MatchRecommendationInputSchema,
    outputSchema: MatchRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

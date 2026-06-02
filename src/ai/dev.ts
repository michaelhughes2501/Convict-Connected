import { config } from 'dotenv';
config();

import '@/ai/flows/match-recommendation.ts';
import '@/ai/flows/virtual-visit-eligibility.ts';
import '@/ai/flows/sentence-calculator.ts';

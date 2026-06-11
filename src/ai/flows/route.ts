import { NextResponse } from 'next/server';
import { commissarySearch } from '@/ai/flows/commissary-search';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ message: 'Query is required' }, { status: 400 });
    }

    // Call the Genkit 1.0 flow directly
    const results = await commissarySearch({ query });

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('AI Flow Error:', error);
    return NextResponse.json({ message: 'Failed to process search' }, { status: 500 });
  }
}
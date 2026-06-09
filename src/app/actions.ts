'use server'

import { commissarySearch } from '@/ai/flows/commissary-search'

export async function searchResourcesAction(query: string) {
  if (!query || query.trim().length === 0) {
    return null
  }
  
  return await commissarySearch({ query })
}
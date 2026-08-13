'use server'

import { recommendAC } from '@/lib/recommendations/ac'

export async function getACRecommendation(
  roomArea: number
) {
  if (!Number.isFinite(roomArea) || roomArea <= 0) {
    return {
      success: false,
      message: 'Luas ruangan tidak valid.',
      data: [],
    }
  }

  try {
    const products = await recommendAC(roomArea)

    return {
      success: true,
      message: '',
      data: products,
    }
  } catch (error) {
    console.error('Recommendation error:', error)

    return {
      success: false,
      message: 'Gagal mendapatkan rekomendasi.',
      data: [],
    }
  }
}
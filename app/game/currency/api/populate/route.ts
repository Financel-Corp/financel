/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { importCurrencyDataChunk } from './importCurrencyDataChunk'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const offset = 0
  const limit = 10000

  try {
    const result = await importCurrencyDataChunk(offset, limit)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error during currency import:', error)
    return NextResponse.json(
      {
        message: 'Error during currency import',
        error: (error as Error).message,
      },
      { status: 500 }
    )
  }
}

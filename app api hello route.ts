import { NextResponse } from 'next/server'

export async function GET() {
  const data = {
    message: 'Hello from the ISALS Portfolio Tracker API!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  }
  return NextResponse.json(data)
}


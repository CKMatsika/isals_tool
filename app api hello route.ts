import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const authToken = cookieStore.get('auth_token')

  if (!authToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = {
    message: 'Hello from the ISALS Portfolio Tracker API!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  }
  
  return NextResponse.json(data)
}


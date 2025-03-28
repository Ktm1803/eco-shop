import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, stack, url, userAgent } = await request.json()

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Client error:", { message, stack, url, userAgent })
    }

    // In a real application, you would log this to a service like Sentry, LogRocket, etc.
    // Example: await logToErrorService({ message, stack, url, userAgent });

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error logging client error:", error)
    return NextResponse.json({ error: "Failed to log error" }, { status: 500 })
  }
}


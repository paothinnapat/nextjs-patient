import { NextResponse } from "next/server"

// Store connected clients
const clients = new Set<ReadableStreamDefaultController>()

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      clients.add(controller)

      // Remove client when connection closes
      return () => clients.delete(controller)
    },
  })

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}

export async function POST(request: Request) {
  const data = await request.json()

  // Broadcast to all connected clients
  clients.forEach((client) => {
    client.enqueue(`data: ${JSON.stringify(data)}\n\n`)
  })

  return NextResponse.json({ success: true })
}


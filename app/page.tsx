import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Real-time Patient Form System</h1>
      <div className="flex space-x-4">
        <Link href="/patient-form" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Patient Form
        </Link>
        <Link href="/staff-view" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Staff View
        </Link>
      </div>
    </main>
  )
}


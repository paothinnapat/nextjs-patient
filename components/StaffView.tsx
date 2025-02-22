"use client"
import { useState, useEffect } from "react"

type StaffViewProps = {
  initialPatientData?: any
}

export default function StaffView({ initialPatientData = {} }: StaffViewProps) {
  const [patientData, setPatientData] = useState(initialPatientData)
  const [status, setStatus] = useState("disconnected")

  useEffect(() => {
    const eventSource = new EventSource("/api/updates")

    eventSource.onopen = () => {
      setStatus("connected")
    }

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setPatientData(data)
    }

    eventSource.onerror = () => {
      setStatus("error")
      eventSource.close()
    }

    return () => {
      eventSource.close()
      setStatus("disconnected")
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Patient Information</h2>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              status === "connected" ? "bg-green-500" : status === "error" ? "bg-red-500" : "bg-gray-500"
            }`}
          />
          <span className="text-sm text-muted-foreground">
            {status === "connected" ? "Live" : status === "error" ? "Connection Error" : "Disconnected"}
          </span>
        </div>
      </div>

      {Object.keys(patientData).length === 0 ? (
        <p className="text-muted-foreground">No patient data available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(patientData).map(([key, value]) => (
            <div key={key} className="border p-2 rounded">
              <span className="font-semibold">{key}: </span>
              <span>{value as string}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
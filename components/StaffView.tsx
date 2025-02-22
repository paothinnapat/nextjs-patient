"use client"

import { useState, useEffect } from "react"
import io from "socket.io-client"

let socket: any

type StaffViewProps = {
  initialPatientData?: any
}

export default function StaffView({ initialPatientData = {} }: StaffViewProps) {
  const [patientData, setPatientData] = useState(initialPatientData)

  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = async () => {
    await fetch("/api/socket")
    socket = io()

    socket.on("connect", () => {
      console.log("connected")
    })

    socket.on("form-updated", (data: any) => {
      setPatientData(data)
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Patient Information</h2>
      {Object.keys(patientData).length === 0 ? (
        <p>No patient data available.</p>
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


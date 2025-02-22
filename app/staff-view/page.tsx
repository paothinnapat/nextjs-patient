"use client"
import { useState, useEffect } from "react"
import StaffView from "@/components/StaffView"

export default function StaffViewPage() {
  const [patientData, setPatientData] = useState({})

  useEffect(() => {
    // Here we'll implement WebSocket to receive data from the server
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Staff View</h1>
      <StaffView patientData={patientData} />
    </div>
  )
}


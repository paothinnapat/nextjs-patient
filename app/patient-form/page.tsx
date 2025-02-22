"use client"
import { useState } from "react"
import PatientForm from "@/components/PatientForm"

export default function PatientFormPage() {
  const [formData, setFormData] = useState({})

  const handleFormChange = (newData: any) => {
    setFormData(newData)
    // Here we'll implement WebSocket to send data to the server
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Information Form</h1>
      <PatientForm onChange={handleFormChange} />
    </div>
  )
}


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import io from "socket.io-client"

let socket: any

type PatientFormProps = {
  onChange: (data: any) => void
}

export default function PatientForm({ onChange }: PatientFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    preferredLanguage: "",
    nationality: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    religion: "",
  })

  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = async () => {
    await fetch("/api/socket")
    socket = io()

    socket.on("connect", () => {
      console.log("connected")
    })
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newData = { ...formData, [name]: value }
    setFormData(newData)
    onChange(newData)

    // Send update to SSE endpoint
    await fetch("/api/updates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
  }

  const handleSelectChange = async (name: string, value: string) => {
    const newData = { ...formData, [name]: value }
    setFormData(newData)
    onChange(newData)

    // Send update to SSE endpoint
    await fetch("/api/updates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
  }

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="middleName">Middle Name (optional)</Label>
          <Input id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select onValueChange={(value) => handleSelectChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="preferredLanguage">Preferred Language</Label>
          <Input
            id="preferredLanguage"
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="emergencyContactName">Emergency Contact Name (optional)</Label>
          <Input
            id="emergencyContactName"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="emergencyContactRelationship">Emergency Contact Relationship (optional)</Label>
          <Input
            id="emergencyContactRelationship"
            name="emergencyContactRelationship"
            value={formData.emergencyContactRelationship}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="religion">Religion (optional)</Label>
          <Input id="religion" name="religion" value={formData.religion} onChange={handleChange} />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
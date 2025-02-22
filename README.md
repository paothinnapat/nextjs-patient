# Real-time Patient Form System

This project is a real-time patient input form and staff view system built with Next.js, TailwindCSS, and WebSockets.

## Features

- Patient Form: A responsive form for patients to enter their personal information
- Staff View: A real-time interface for staff to monitor patient information as it's being entered
- Real-time synchronization between Patient Form and Staff View

## Tech Stack

- Framework: Next.js
- Styling: TailwindCSS
- Real-Time Communication: Socket.io
- Hosting: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: ```npm install```
3. Run the development server: ```npm run dev```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Project Structure

- \`/app\`: Contains the main pages of the application
- \`/components\`: Reusable React components
- \`/pages/api\`: API routes, including WebSocket setup

## Deployment

This project is deployed on Vercel. You can view the live application at (https://v0-real-time-patient-form.vercel.app/).

## Future Improvements

- Implement form validation
- Add more detailed styling for better responsiveness
- Implement error handling and loading states
- Add indicators for patient activity (submitted, actively filling, inactive)

## Current Issues

- If input form doesn't reflect on real-time in staff view page, please try run this project on your local


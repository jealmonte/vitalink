import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const formData = await request.json()

  try {
    // Process the form data
    console.log("Form data:", formData)
    // Add your form processing logic here

    return NextResponse.json({ message: "Form submitted successfully" })
  } catch (error) {
    console.error("Error processing form:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


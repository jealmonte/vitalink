import { NextResponse } from "next/server"

const OPENFDA_API_URL = "https://api.fda.gov/drug/label.json"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!process.env.OPENFDA_API_KEY) {
    return NextResponse.json({ error: "OpenFDA API key is not configured" }, { status: 500 })
  }

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `${OPENFDA_API_URL}?api_key=${process.env.OPENFDA_API_KEY}&search=brand_name:${encodeURIComponent(query)}+OR+generic_name:${encodeURIComponent(query)}&limit=10`,
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("OpenFDA API Error:", errorData)
      if (response.status === 429) {
        return NextResponse.json({ error: "API rate limit exceeded. Please try again later." }, { status: 429 })
      }
      throw new Error("Failed to fetch drug information")
    }

    const data = await response.json()

    // Transform openFDA response to a more usable format
    const results = data.results.map((result: any) => ({
      id: result.id || result.set_id,
      name: result.openfda?.brand_name?.[0] || result.openfda?.generic_name?.[0] || "Unknown",
      generic_name: result.openfda?.generic_name?.[0] || "",
      dosage_forms: result.dosage_forms_and_strengths?.[0] || "",
      manufacturer: result.openfda?.manufacturer_name?.[0] || "",
      warnings: result.boxed_warning?.[0] || result.warnings?.[0] || "",
      indications_and_usage: result.indications_and_usage?.[0] || "",
    }))

    return NextResponse.json({ results })
  } catch (error) {
    console.error("OpenFDA API Error:", error)
    return NextResponse.json({ error: "Failed to fetch drug information" }, { status: 500 })
  }
}


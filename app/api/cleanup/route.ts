import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI();

// take scraped data, send to open ai to clean and create text, return in json (must be same json every time)

export async function POST(request: Request) {
  // TODO: tailor prompt to real estate and the specific data we see on adam's site
  try {
    const { data } = await request.json();
    const messages = [
      {
        role: "system" as const,
        content:
          "You are a data extraction assistant. Extract only the specific data requested by the user from web content and return it in valid JSON format. Be precise and focused on the requested data points. If no specific data is requested, extract key information like title, main topics, and key points in JSON format.",
      },
      {
        role: "user" as const,
        content: `Extract the data from the following webpage content in JSON format: 
          
          <WebpageContent>
              ${data}
          </WebpageContent>
          
          <ExtractionRequest>
              ${prompt}
          </ExtractionRequest>
          
          Provide the extracted data as a valid JSON object.>`,
      },
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages, //TODO: add prompt
    });

    return NextResponse.json({
      success: true,
      message: "Scraping process started",
    });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to start scraping" },
      { status: 500 }
    );
  }
}

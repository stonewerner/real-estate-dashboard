import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get the password from request body
    const { password } = await request.json();

    // Check if password exists and matches
    const isValid = password && password === process.env.SECRET_PASSWORD;

    return NextResponse.json({ success: isValid });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

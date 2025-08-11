import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(process.env.COURSES_REDIRECT_URL as string);
}

import { NextResponse } from "next/server";

import { getSellAppProducts } from "@/lib/sellapp";

export const revalidate = 60;

export async function GET() {
  try {
    const products = await getSellAppProducts();

    return NextResponse.json(
      { data: products },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("Unable to load Sell.app products.", error);

    return NextResponse.json(
      { error: "Unable to load products right now." },
      { status: 502 },
    );
  }
}

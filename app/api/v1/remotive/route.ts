import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const base = "https://jobicy.com/api/v2/remote-jobs";
  // const limit = "20";
  // const category = "python";
  // const search = "";
  // const url = new URL("https://remotive.com/api/remote-jobs");
  // url.searchParams.append("count", count);
  // url.searchParams.append("tag", tag);
  // console.log(url.href);
  // const response = await fetch(url.href);
  // console.log(await response.json());
  return NextResponse.json({ request: request });
}

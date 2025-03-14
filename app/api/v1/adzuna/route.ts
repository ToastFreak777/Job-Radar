import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // console.log(request.body);
  // console.log(request.params);
  // console.log(request.)
  return NextResponse.json({ request: request });
}

// export async function GET(request: Request) {
// console.log(request);
// const base = "https://api.adzuna.com/v1/api/";
// const country = "us";
// const page = 1;
// const query = `jobs/${country}/search/${page}?app_id=${API_ID}&app_key=${API_KEY}`;
// const url = new URL(query, base);
// const response = await fetch(url.href);

// console.log(await response.json());
// return { message: "sucesss" };
// }

import { loadAdzunaJobs } from "@/utils/helpers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = Object.fromEntries(searchParams);
  const data = await loadAdzunaJobs(query);
  return Response.json(data);
}

export default async function GET() {
  const base = "https://jobicy.com/api/v2/remote-jobs";
  const limit = "20";
  const category = "python";
  const search = "";
  const url = new URL("https://remotive.com/api/remote-jobs");
  // url.searchParams.append("count", count);
  // url.searchParams.append("tag", tag);
  console.log(url.href);
  // const response = await fetch(url.href);
  // console.log(await response.json());
  return "huuuh";
}

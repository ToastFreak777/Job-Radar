type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

interface FetchAPIOptions {
  method: "GET";
  next?: NextFetchRequestConfig;
}

type Options = Record<string, never> | FetchAPIOptions;

export async function fetchAPI(url: string, options: Options) {
  // console.log(url, options);

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("FetchAPI: Unable to fetch");
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

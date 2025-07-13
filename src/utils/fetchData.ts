export const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      const data = await res.json();
      console.error("Error fetching data:", data.message, "error:", data.error);
      return null;
    }
    const json = await res.json();
    return json?.data ?? null;
  }
  catch {
    console.error("Error fetching data:", url);
    return null;
  }
}
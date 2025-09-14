export const fetchData = async (url: string) => {
  if (!url) {
    console.error("No URL provided for fetchData");
    return null;
  }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const data = await res.json();
      console.log("Error fetching data fetchData.ts", data);
      return null;
    }
    const json = await res.json();
    return json?.data ?? null;
  }
  catch (error){
    console.error("Error fetching data:", error);
    return null;
  }
}
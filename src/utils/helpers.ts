export async function validatePhoneNumber(number: string) {
  try {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/validatephone?number=%2B${encodeURIComponent(number)}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": import.meta.env.VITE_API_KEY, // store your key in .env
        },
      },
    );
    const data = res.json();
    if (!data) throw new Error("No data received");
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

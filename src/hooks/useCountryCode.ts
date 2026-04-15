import { urlPrefix } from "../utils/constants";

export async function getCountryCodes() {
  try {
    const res = await fetch(urlPrefix);
    const data = await res.json();
    if (!data) throw new Error("No data received");
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

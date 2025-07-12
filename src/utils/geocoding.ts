// utils/geocoding.ts
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    // Construct address from available components
    const address = [
      data.address.road,
      data.address.neighbourhood,
      data.address.suburb,
      data.address.city,
      data.address.state,
      data.address.country,
    ]
      .filter(Boolean)
      .join(", ");

    return address || "Address not found";
  } catch (error) {
    console.error("Geocoding error:", error);
    return "Could not retrieve address";
  }
}

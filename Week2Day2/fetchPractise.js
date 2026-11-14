async function getCity(cityName) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;

  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
   
    const data = await response.json();

     if(!data.results || data.results.length === 0) {
      throw new Error("No City found");
    }
    console.log(data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

getCity("xyzabc123");
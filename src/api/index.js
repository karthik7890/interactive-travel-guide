import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Key": "5d3ea5ffb9msh287d3cb7f1c5100p1164eejsn1fa248280df7",
          // "X-RapidAPI-Key" : "d2c020ed78msh07cd0c21620634dp13c884jsndafde4d84581",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    
    // console.log( {data} );
    return data;
  } catch (error) {
    console.log(error);
  }
};

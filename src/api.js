import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    units: "metric",
    lang: "kr",
    appid: "c067a0b827128dd6d7b6aa37cb858095",
  },
});

export const getWeather = ({ queryKey }) => {
  const [weather, lat, lon] = queryKey;
  console.log(queryKey);
  return instance
    .get(`weather?lat=${lat}&lon=${lon}`)
    .then((response) => response.data);
};

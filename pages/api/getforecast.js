import axios from "axios"
import {google} from "googleapis"

export default async function getforecast(req,res){

    const customSearch = google.customsearch("v1");

    const {city} = req.body
    const foundImages = [];
    const foundImagesAlt = [
        'https://newevolutiondesigns.com/images/freebies/city-wallpaper-38.jpg',
        'https://cdn.abcotvs.com/dip/images/10566171_050121-wabc-empire-state-building-img.jpg?w=1600',
        'https://cdn.wallpapersafari.com/61/17/5FZhY1.jpg'
    ];

    const apiURL = "http://api.weatherapi.com/v1/";
    const apiPublicKey = "1751e40135324671ae701417220601";
    const daysForecast = 3;
    const forecastURL =
        apiURL +
        "forecast.json?key=" +
        apiPublicKey +
        "&q=" +
        city +
        "&days=" +
        daysForecast +
        "&aqi=no&alerts=no";

    if (city.length <= 0 || city == undefined) {
        res.send({
            message: 'Please, write a city'
        });
    } else {
        try {

            //get weather information
            const responseWeather = await axios.get(forecastURL);

            //get a picture from the city - country
            const cityApi = responseWeather.data.location.name;
            const region = responseWeather.data.location.region;
            const country = responseWeather.data.location.country;

            try {
                const responseImage = await customSearch.cse.list({
                    auth: process.env.AUTH,
                    cx: process.env.CX,
                    q: `photos of ${region} - ${country}`,
                    searchType: "image",
                    num: 3,
                    imgSize: "xlarge",
                });

                console.log(responseImage.data.items)
                responseImage.data.items.map((imagen)=>{
                    foundImages.push(imagen.link)
                })

                console.log(responseWeather)

                res.send({
                    message: 'Request was successful',
                    city: responseWeather.data.location.name,
                    region:responseWeather.data.location.region,
                    country: responseWeather.data.location.country,
                    weatherInfo: responseWeather.data.forecast.forecastday,
                    imgUrl: foundImages
                });
                
            } catch (error) {
                res.send({
                    message: 'Request was successful but GoogleSearch failed',
                    city: responseWeather.data.location.name,
                    region:responseWeather.data.location.region,
                    country: responseWeather.data.location.country,
                    weatherInfo: responseWeather.data.forecast.forecastday,
                    imgUrl: foundImagesAlt
                });

                console.log(error, "Error - Google Images API");
            }
        } catch (err) {
            res.send({
                message: 'Request failed',
                weatherInfo: null,
                imgUrl: null
            });
            console.log(err, "Error - Weather API");
        }
    }
}
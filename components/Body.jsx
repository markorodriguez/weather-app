import React, { useState } from 'react'

import Navbar from './Navbar'
import Card from './Card'
import Input from './Input'
import { toast } from 'react-toastify'

export default function Body() {

    const [isFetched, setIsFetched] = useState(false)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    const arrayColors = [' rgba(247,56,89, 0.75), rgba(247,56,89, 0.9)', ' rgba(99, 102, 241,0.75), rgba(168, 85, 247,0.9) ', 'rgba(6, 182, 212,0.75), rgba(59, 130, 246, 0.9) ']


    const getForecast = async (value) => {
        setLoading(true)
        try {
            const res = await fetch('/api/getforecast', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    city: value.toLowerCase()
                })
            })
            const dataWeather = await res.json()


            if (dataWeather.weatherInfo == null) {
                toast.error('Oops! We couldnt find a city with that name ')
            }

            setData(dataWeather)
            setIsFetched(true)
            setTimeout(()=>{
                setLoading(false)
            }, 1500)

        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <div className='min-h-screen w-full bg-night '>
            <Navbar />
            <main className='container h-full mx-auto py-12'>
                <Input onSubmit={getForecast} />

                {isFetched && data.weatherInfo !== null ? <>

                    {loading ? <div className='w-full py-20 my-20 flex items-center justify-center'>
                        <span className="loader"></span> 

                    </div>: <>

                        <Card city={data.city} date={data.weatherInfo[0].date} condition={data.weatherInfo[0].day.condition.text.toUpperCase()} windspeed={data.weatherInfo[0].day.maxwind_kph} temp={data.weatherInfo[0].day.avgtemp_c} conditionIcon={data.weatherInfo[0].day.condition.icon} color={arrayColors[0]} imgBackground={data.imgUrl[0]} region={data.region} country={data.country} />

                        <div className='flex flex-col justify-around md:flex-row'>

                            {data.weatherInfo.slice(1, data.weatherInfo.length).map((el, index) => {
                                return <Card key={index} city={''} date={el.date} condition={el.day.condition.text.toUpperCase()} windspeed={el.day.maxwind_kph} temp={el.day.avgtemp_c} conditionIcon={el.day.condition.icon} color={arrayColors[index + 1]} imgBackground={data.imgUrl[index + 1]} />
                            })}

                        </div>

                    </>}

                </> : null}
            </main>
        </div>
    )
}

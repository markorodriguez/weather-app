/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function Card({city, date, condition, windspeed, temp, conditionIcon, color, imgBackground, region, country}) {
  return (
    <div  className="text-white mx-auto border-night border-2 shadow-lg w-80 my-12 rounded-lg overflow-hidden cursor-pointer">
    <div className="card px-4 py-6" style={{backgroundImage: `linear-gradient(to right, ${color}) , url('${imgBackground}')`}}  >
      <h2 className="text-xl">{city} <span className='text-sm'>{region}</span> </h2>
      
      <p className='text-sm text-gray-200'>{country}</p>
      <p className="text-sm my-2 underline underline-offset-4 decoration-4">{date}</p>
      <div className="flex justify-between">
        <div>
          <p className="text-sm my-4 font-semibold uppercase">{condition}</p>
          <div className="flex items-center">
            <img className="h-4 mr-4" src="http://cdn.onlinewebfonts.com/svg/img_315328.png" alt="wind_speed" />
            <strong className="mr-2 text-md">{windspeed}</strong><span className='text-xs'>Km/H</span>
          </div>
          <p className="mt-6 text-3xl tracking-wider">{temp} °C </p>
         
        </div>
        <div>
          <img src={conditionIcon} alt="" />
        </div>
      </div>
    </div>
  </div>
  )
}

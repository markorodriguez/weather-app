import React, { useState } from 'react'

export default function Input({onSubmit}) {
    const [city, setCity] = useState('')

    return (
    <div className="text-center container mx-auto">
    <form onSubmit={(e)=>{
        e.preventDefault()
        onSubmit(city)
    }}>
        <input value={city} onChange={(e)=>setCity(e.target.value)}  className="bg-transparent text-center peer font-semibold w-56 py-2 mx-auto border-b-2 outline-none text-light focus:border-myred" placeholder="Type your city..." type="text" name="city-input" id="city-input" required />
        <button className="py-2 border-b-2 peer-focus:border-myred rounded-t-lg rounded-r-lg overflow-hidden bg-myred font-semibold text-light px-6 hover:text-myred hover:bg-light transition-all">🔎</button>
    </form>
</div>
    
  )
}

import axios from "axios"
import { z } from "zod"
import { SearchType } from "../types/types"
import { useMemo, useState } from "react"

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})
export type Weather = z.infer<typeof Weather>

export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {
        const appID = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)
        setNotFound(false)
        try{
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appID}`
            const {data} = await axios(geoUrl)
            // Check if the city exists
            if(!data[0]){
                console.log("No weather found for that city")
                setNotFound(true)
                return
            }
            const lat = data[0].lat
            const lon = data[0].lon
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`
            const {data: weatherResult} = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResult)
            if(result.success){
                setWeather(result.data)
            }
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        fetchWeather,
        hasWeatherData,
        notFound,
        weather,
        loading
    }
}

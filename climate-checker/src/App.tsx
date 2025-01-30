import styles from "./App.module.css"
import Alert from "./components/Alert/Alert"
import Form from "./components/Form/Form"
import Spinner from "./components/spinner/Spinner"
import WeatherDetail from "./components/WeatherDetail/WeatherDetail"
import useWeather from "./hooks/useWeather"

function App() {

  const {weather, loading, notFound, hasWeatherData, fetchWeather} = useWeather()
  
  return (
    <>
      <h1 className={styles.title}>Climate Checker</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather}/>
        {loading && <Spinner/>}
        {hasWeatherData && <WeatherDetail weather={weather}/>}
        {notFound && <Alert>City not found</Alert>}
        
      </div>
    </>
  )
}

export default App

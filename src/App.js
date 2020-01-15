import React from 'react'
import Title from './components/Title'
import Form from './components/Form'
import Weather from './components/Weather'

const API_KEY = '4a632c25c67565ddc365c8d585f5c524'

class App extends React.Component {
    state = {
        temperature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        error: undefined
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        if (city && country) {
            console.log(data);
            this.setState({
                temperature: data.main.temp,
                humidity: data.main.humidity,
                city: data.name,
                country: data.sys.country,
                description: data.weather[0].description,
                error: ''
            })
        } else {
            this.setState({
                temperature: undefined,
                humidity: undefined,
                city: undefined,
                country: undefined,
                description: undefined,
                error: 'Please enter city and country name'
            })
        }
    }
    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                    <Title />
                                </div>
                                <div className="col-xs-6 form-container">
                                    <Form recieveWeather={this.getWeather} />
                                    <Weather
                                        temperature={this.state.temperature}
                                        city={this.state.city}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
                                        error={this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}



export default App
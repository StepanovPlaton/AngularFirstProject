import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { WeatherComponent, OpenWeatherMapResponce } from "./weather.component";


describe('WeatherTesting', () => {
    let Weather: WeatherComponent;

    let TestWeather: OpenWeatherMapResponce = {
        name: "Test",
        weather: [{
          main: "weather",
          description: "test weather",
          icon: "00t"
        }],
        main: {
          temp: 0,
          temp_c: 0,
          feels_like: 0,
          feels_like_c: 0,
          units: "C",
          pressure: 760,
          humidity: 50,
        },
        wind: { speed: 0 }
    }

    beforeEach(() => {
        Weather = new WeatherComponent(new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() })));
        Weather.Weather = TestWeather;
    });

    it('Test change temperature units', () => {
        Weather.TemperatureTypeSwitch();
        expect(Weather.Weather.main.units).toBe("F");
        expect(Weather.Weather.main.temp).toBe(32);
        expect(Weather.Weather.main.feels_like).toBe(32);

        Weather.TemperatureTypeSwitch();
        expect(Weather.Weather.main.units).toBe("K");
        expect(Weather.Weather.main.temp).toBe(273);
        expect(Weather.Weather.main.feels_like).toBe(273);
    });

});
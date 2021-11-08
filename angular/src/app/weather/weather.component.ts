import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

export interface OpenWeatherMapResponce {
  name: string
  weather: [{
    main: string
    description: string
    icon: string
  }]
  main: {
    temp: number
    temp_c:number
    feels_like: number 
    feels_like_c:number
    units: string
    pressure: number
    humidity: number
  }
  wind: { speed: number }
  clouds?: { all: number }
  rain?: { "1h": number }
  snow?: { "1h": number }
}

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {
  private httpClient: HttpClient;

  public Weather: OpenWeatherMapResponce;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async ngOnInit() { 
    this.Weather = await this.UpdateWeather();
    setInterval(async() => this.Weather = await this.UpdateWeather(), 5*60*1000); 
  }

  async UpdateWeather(): Promise<OpenWeatherMapResponce> {
    let NewWeather = await this.httpClient.get<OpenWeatherMapResponce>
              ('/data/2.5/weather?id=499099&units=metric&lang=ru&appid=622d660aa703d819aa1d7e1a5a3d38c8').toPromise();
    NewWeather.main.units = "C";
    NewWeather.main.temp_c = NewWeather.main.temp;
    NewWeather.main.feels_like_c = NewWeather.main.temp;
    NewWeather.main.temp = Math.round(NewWeather.main.temp);
    NewWeather.main.feels_like = Math.round(NewWeather.main.feels_like);
    return NewWeather;
  }

  TemperatureTypeSwitch() {
    switch(this.Weather.main.units) { 
      case "C": { 
        this.Weather.main.units = "F";
        this.Weather.main.temp = Math.round(this.Weather.main.temp*9/5) + 32;
        this.Weather.main.feels_like = Math.round(this.Weather.main.feels_like*9/5) + 32;
        break; 
      } 
      case "F": { 
        this.Weather.main.units = "K";
        this.Weather.main.temp = Math.round((this.Weather.main.temp-32)*5/9 + 273.15);
        this.Weather.main.feels_like = Math.round((this.Weather.main.feels_like-32)*5/9 + 273.15);
        break; 
      } 
      case "K": { 
        this.Weather.main.units = "C";
        this.Weather.main.temp = Math.round(this.Weather.main.temp - 273.15);
        this.Weather.main.feels_like = Math.round(this.Weather.main.feels_like - 273.15);
        break; 
      }
   } 
  }
}

import axios from "axios";
import fs from 'fs';

import { CityWeather, IWeather, Weather } from "../interfaces/interfaces";

class Search {
  private history: string[] = [];
  private dbPath: string = './db/database.json';

  constructor() {

    this.readDB();

  }

  get historyCapitalizer() {
    return this.history.map(place => {

      let words = place.split(' ');
      words = words.map(word => word[0].toUpperCase() + word.substring(1));

      return words.join(' ');
    })
  }

  get paramsMapBox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
    }
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric'
    }
  }

  async cities(place: string) {

    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox
      })

      const { data } = await instance.get<Weather>('')

      return data.features.map(place => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));

    } catch (error) {
      return [];

    }
  }

  async weatherByCiy(lat: number, lon: number): Promise<IWeather | undefined> {

    try {

      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon }
      });

      const { data } = await instance.get<CityWeather>('')

      return {
        description: data.weather[0].description,
        min: data.main.temp_min,
        max: data.main.temp_max,
        temp: data.main.temp
      }

    } catch (error) {

      console.log(error);
    }
  }

  addHistory(place: string) {

    if (this.history.includes(place.toLocaleLowerCase())) return;

    this.history = this.history.splice(0, 5);

    this.history.unshift(place.toLocaleLowerCase());

    // Save on db
    this.saveDB()

  }

  saveDB() {

    const payload = {
      history: this.history
    }

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {

    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });

    const { history } = JSON.parse(info)

    this.history = history;

    // return data;

  }
}

export default Search
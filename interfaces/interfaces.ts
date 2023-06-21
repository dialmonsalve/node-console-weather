export interface Place {

  id: string,
  name: string,
  lng: number,
  lat: number

}
export interface IWeather {
  description: string,
  min: number,
  max: number,
  temp: number
}



//! Interface five cities https://api.mapbox.com/geocoding/v5/mapbox.places/
export interface Weather {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text_es: string;
  language_es: Language;
  place_name_es: string;
  text: string;
  language: Language;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
}

export interface Context {
  id: string;
  wikidata: string;
  mapbox_id: string;
  text_es: string;
  language_es: Language;
  text: string;
  language: Language;
  short_code?: ShortCode;
}

export enum Language {
  Es = "es",
}

export enum ShortCode {
  Us = "us",
  UsFL = "US-FL",
  UsOh = "US-OH",
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  wikidata: string;
  mapbox_id: string;
}




//! Interface city https://api.openweathermap.org/data/2.5/weather

export interface CityWeather {
  coord:      Coord;
  weather:    Weather[];
  base:       string;
  main:       Main;
  visibility: number;
  wind:       Wind;
  clouds:     Clouds;
  dt:         number;
  sys:        Sys;
  timezone:   number;
  id:         number;
  name:       string;
  cod:        number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp:       number;
  feels_like: number;
  temp_min:   number;
  temp_max:   number;
  pressure:   number;
  humidity:   number;
  sea_level:  number;
  grnd_level: number;
}

export interface Sys {
  type:    number;
  id:      number;
  country: string;
  sunrise: number;
  sunset:  number;
}

export interface Weather {
  id:          number;
  main:        string;
  description: string;
  icon:        string;
}

export interface Wind {
  speed: number;
  deg:   number;
  gust:  number;
}
import colors from "colors";
import 'dotenv/config'

import Search from "./models/searches.js";
import { inquirerMenu, pausa, readInput, listCities } from "./helpers/inquirer.js"
import { IWeather, Place } from "./interfaces/interfaces.js";

const { green, yellow, cyan, rainbow } = colors

const main = async () => {

  let opt;
  const searches = new Search();

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case 1:
        const search = await readInput('City: ');

        // Search cities
        const places = await searches.cities(search);

        // Search city
        const id = await listCities(places)
        if (id === '0') continue;

        const placeSelected = places.find(place => place.id === id)
        const { name, lat, lng } = placeSelected as Place

        //Save on db
        searches.addHistory(name)

        // Weather
        const weather = await searches.weatherByCiy(lat, lng);
        const { description, max, min, temp } = weather as IWeather

        // Show information
        console.clear();
        console.log(rainbow('\nCity info:\n'));
        console.log('\tCity:', cyan(name));
        console.log('\tLat:', cyan(lat.toString()));
        console.log('\tLng:', cyan(lng.toString()));
        console.log('\tTemp:', yellow(temp.toString()));
        console.log('\tMin temp:', yellow(min.toString()));
        console.log('\tMax temp:', yellow(max.toString()));
        console.log('\tWhat about the weather?:', yellow(description));
        break;

      case 2:
        searches.historyCapitalizer.forEach((place, i) => {
          const idx = `${i + 1}`.green;
          console.log(`${idx} ${place}`);          
        })
        break
    }

    if (opt !== 0) await pausa()

  } while (opt !== 0);
}

main();
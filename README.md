# WEATHER APP CONSOLE

## This project is a weather finder made in typescript and node.js. This is a console app, It also saves a history of last six searches

### Api Endpoints

- https://api.mapbox.com/geocoding/v5/mapbox.places/
- https://api.openweathermap.org/data/2.5/weather


*Note:* To use this app, you must have an account in [https://www.mapbox.com/](https://www.mapbox.com/) and in [https://openweathermap.org/](https://openweathermap.org/)

1. When you have an account in MapBox and openweathermap, rename the file "_.env.example_" to "_.env_" and configure the environment variables

2. To install this project:

```shell
  npm install
```

3. If you don't have install typescript globally, you may install locally:

  ```shell
    npm i typescript
  ```

4. Create a script in the package json:

```json
  "scripts": {
    "tsc": "tsc",
    "start": "node dist/index.js"
  },
```

5. Transpile typescript to javascript:

```shell
  npm run tsc
```

6. Init app:

```shell
  npm start
```

# Weather App Checkpoint

## Overview

This is a simple weather app built with HTML, CSS, and JavaScript. It uses `fetch()` to request current weather data from OpenWeather and displays the result in the browser.

## Files

- `index.html` - page structure and weather result elements
- `styles.css` - page styling and responsive layout
- `script.js` - city search, API request, success handling, error handling, and DOM updates

## API

The app uses the OpenWeather Current Weather API:

```text
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API key}&units=metric
```

The current API key is stored in `script.js`.


## What The App Displays

- Location and country
- Temperature
- Weather description
- Weather condition
- Feels-like temperature
- Humidity
- Wind speed
- Cloud cover
- Pressure
- Visibility

## Testing

Try searching for valid city names such as:

- Nairobi
- London
- Paris

Try an invalid city name to confirm the app shows an error response.

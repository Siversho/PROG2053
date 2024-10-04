
// Script2 begins...

document.addEventListener('DOMContentLoaded', () => {       // to load the page without the need of a button
    const steder = [                                                    // Array to store my places
        {name: "Madrid, Spain", latitude: 40.4165, longitude: -3.7026},
        {name: "Steinkjer, Norway", latitude: 64.0149, longitude: 11.4954},
        {name: "Skedsmokorset, Norway", latitude: 60.0046, longitude: 11.0328},
        {name: "Oregon, United States of America", latitude: 42.0147, longitude: -89.3323},
        {name: "Cape Town, South Africa", latitude: -33.9258, longitude: 18.4232}
    ];

    const mainContainer = document.getElementById('main-container');        // selecting where our data will be put

    async function fetchWeather(sted) {     // async functions allow for asynchrounos coding & pausing of the code
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${sted.latitude}&longitude=${sted.longitude}&current_weather=true`;
        // the api request page

        try {   // here i pause the excecution of the code to wait to see if it all comes through
            const response = await fetch(url);
            const data = await response.json();
            return data.current_weather;
        } catch (error) {       // and an error message if it doesnt.
            console.error('Error fetching weather data:', error);
            return null;
        }
    }

    async function displayWeather() {       // our actual function that will iterate over the places & display them
        for (const sted of steder) {
            const weatherData = await fetchWeather(sted);

            if (weatherData) {
                // Im trying to check if it already exists
                let article = document.getElementById(`weather-${sted.name.replace(/\s+/g, '-')}`);
                
                if (!article) {
                    // and creating a new one if it doesn't
                    article = document.createElement("article");
                    article.id = `weather-${sted.name.replace(/\s+/g, '-')}`;
                    const title = document.createElement("h2");
                    title.textContent = sted.name;
                    article.appendChild(title);
                    mainContainer.appendChild(article);
                }

                // i then update the content of the article. had to do it this way to prevent it from creating
                // new blocks
                article.innerHTML = `
                    <h2>${sted.name}</h2>
                    <p>Temperature: ${weatherData.temperature}°C</p>
                    <p>Wind Speed: ${weatherData.windspeed} km/h</p>
                    <p>Weather Code: ${weatherData.weathercode}</p>
                `;
            }
        }
    }

    // we call our function to display our first weather
    displayWeather();

    // and then an interval for updates, set to 10 seconds now, for testing purposes
    setInterval(displayWeather(), 10000);
});

// all code within here
window.addEventListener('load', function() {

    // function to add new tasks to to-do task array
    let to_do_form = document.querySelector('.search-bar');
    let results_location = document.querySelector('.location')
    let results_weather_img = document.querySelector('.weather-img');
    let results_temp = document.querySelector('.temp');
    let results_humidity = document.querySelector('.humidity');
    let results_visibility = document.querySelector('.visibility');
    let results_desc = document.querySelector('.desc');
    
    to_do_form.addEventListener('submit', function(e) {
        e.preventDefault();
        let user_input = document.querySelector('#input-bar-box').value
        if(user_input.length === 0) {
            alert('No input provided. Please search for a location.');
        }
        else {
            console.log(`user search: ${user_input}`)
            weather_search.fetch_weather(user_input)
        }
    });

    let weather_search = {
        api_key: "",
        fetch_weather: function(city) {
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + this.api_key)
            .then((response) => response.json())
            .then((data) => this.display_results(data))
        },
        display_results: function(data) {
            console.log(data)
            let data_status = data.cod;

            if(data_status !== 200) {
                results_location.innerHTML = 'Please enter a valid location.';
                results_location.style.display = 'inline';
                results_weather_img.style.display = 'none';
                results_desc.style.display = 'none';
                results_temp.style.display = 'none';
                results_humidity.style.display = 'none';
                results_visibility.style.display = 'none';
            }
            else {
                let data_location = data.name;
                let {icon} = data.weather[0];
                let {description} = data.weather[0];
                let {main} = data.weather[0];
                description = description.charAt(0).toUpperCase() + description.slice(1); // capitalise first letter, of first word only
                let data_temp = Math.round(data.main.temp - 273.15); // convert Kelvin to Celcius, and round decimals
                let data_humidity = data.main.humidity;
                let data_visibility = data.visibility.toLocaleString(); // add commas to numbers, where appropriate

                results_location.innerHTML = `Weather in ${data_location}`;
                results_location.style.display = 'block';

                results_weather_img.src = `http://openweathermap.org/img/w/${icon}.png`
                results_weather_img.style.display = 'block'

                results_desc.innerHTML = `Description: ${description}`
                results_desc.style.display = 'block';

                results_temp.innerHTML = `Temperature: ${data_temp}°C`;
                results_temp.style.display = 'block';

                results_humidity.innerHTML = `Humidity: ${data_humidity}%`;
                results_humidity.style.display = 'block';

                results_visibility.innerHTML = `Visibility: ${data_visibility} meters`;
                results_visibility.style.display = 'block';

                // change background image based on description
                this.set_background(main);
            }
        },
        set_background: function(description) {
            // weather description types: https://openweathermap.org/weather-conditions
            weather_type_atmosphere_dark = ['Mist', 'Smoke', 'Haze', 'Fog', 'Squalls', 'Tornado'];
            weather_type_atmosphere_light = ['Sand', 'Dust', 'Volcanic ash'];

            if(description === 'Thunderstorm') {
                // https://unsplash.com/photos/6svIKY_ML9g
                document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
            }
            else if (description === 'Drizzle') {
                // https://unsplash.com/photos/0guU7Aoo200
                document.body.style.backgroundImage = "url('images/drizzle.jpg')";
            }
            else if (description === 'Rain') {
                // https://unsplash.com/photos/pv2ZlDfstXc
                document.body.style.backgroundImage = "url('images/rain.jpg')";
            }
            else if (description === 'Snow') {
                // https://unsplash.com/photos/IWenq-4JHqo
                document.body.style.backgroundImage = "url('images/snow.jpg')";
            }
            else if (weather_type_atmosphere_dark.includes(description)) {
                // https://unsplash.com/photos/7CME6Wlgrdk
                document.body.style.backgroundImage = "url('images/fog.jpg')";
            }
            else if (weather_type_atmosphere_light.includes(description)) {
                // https://unsplash.com/photos/OrYNjdDp8Ms
                document.body.style.backgroundImage = "url('images/sand.jpg')";
            }
            else if (description === 'Clear') {
                // https://unsplash.com/photos/IUAyoABilaA
                document.body.style.backgroundImage = "url('images/clear_sky.jpg')";
            }
            else if (description === 'Clouds') {
                // https://unsplash.com/photos/V4qjYCac7y8
                document.body.style.backgroundImage = "url('images/cloudy.jpg')";
            }
            else {
                // https://unsplash.com/photos/Nm6ojlDO-5c
                document.body.style.backgroundImage = "url('images/neutral.jpg')";
            }
        }
    };
});
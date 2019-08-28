const weatherApp = (() => {
    // DOM Cache
    const cityH2 = document.querySelector(".card-city");
    const locationInput = document.querySelector(".user-location");
    const currentTempSpan = document.querySelector(".degree-number");
    const currentSummaryH3 = document.querySelector(".card-weather-description");
    const submitBtn = document.querySelector(".user-submit-btn");
    const iconImg = document.querySelector(".icon");

    function updatePageTemp(apiData) {
        const currentTemp = apiData.main.temp;
        currentTempSpan.textContent = currentTemp;
    }

    function updatePageIcon(apiData) {
        const currentIconId = apiData.weather[0].icon;
        const currentIconUrl = `http://openweathermap.org/img/wn/${currentIconId}@2x.png`;
        iconImg.src = currentIconUrl;
    }

    function updatePageSummary(apiData) {
        const currentWeatherDescription = apiData.weather[0].main;
        currentSummaryH3.textContent = currentWeatherDescription;
    }

    function displayCity(apiData) {
        const currentCity = apiData.name;
        cityH2.textContent = currentCity;
    }

    function displayError(caughtError) {
        console.error(caughtError);
        // Show the error to the user
        cityH2.textContent = "Sorry, but something went wrong with your request.  Please check the spelling of your city, and try again."
    }

    function updatePageData(apiData) {
        displayCity(apiData);
        updatePageTemp(apiData);
        updatePageSummary(apiData);
        updatePageIcon(apiData);

        locationInput.value = null;
    }

    function getWeather(event) {
        event.preventDefault();
        const userLocationVal = locationInput.value;
        const apiKey = "68228946d33e0e7c19a5bed0750de4fc";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userLocationVal}&units=imperial&APPID=${apiKey}`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => updatePageData(data))
            .catch(err => displayError(err));
    }

    submitBtn.addEventListener("click", getWeather);
    
})();
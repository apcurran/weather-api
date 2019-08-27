const weatherApp = (() => {
    // DOM Cache
    const locationInput = document.querySelector(".location");
    const currentTempH3 = document.querySelector(".current-temp");
    const submitBtn = document.querySelector(".submit-btn");
    const iconImg = document.querySelector(".icon");

    function updatePageTemp(apiData) {
        const currentTemp = apiData.main.temp;
        currentTempH3.textContent = currentTemp;
    }

    function updatePageIcon(apiData) {
        const currentIconId = apiData.weather[0].icon;
        const currentIconUrl = `http://openweathermap.org/img/wn/${currentIconId}@2x.png`;
        iconImg.src = currentIconUrl;
    }

    function displayError(caughtError) {
        console.error(caughtError);

        // Show the error to the user

    }

    function updatePageData(apiData) {
        console.log(apiData);
        updatePageTemp(apiData);
        updatePageIcon(apiData);
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
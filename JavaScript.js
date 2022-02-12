
start();

async function start() {
    let forecast = await getWeatherData();

    let response = await fetch('screenings.json');
    let screenings = await response.json();

    // Find the DOM elements we need.
    let screeningList = document.querySelector('#screening-list');
    let ticketList = document.querySelector('#ticket-list');
    let screeningTemplate = document.querySelector('#screening-template');
    screeningTemplate.remove();
    let ticketTemplate = document.querySelector('#ticket-template');
    ticketTemplate.remove();

    for (let screening of screenings) {
        showScreening(screening);
    }

    function showScreening(screening) {
        let screeningLi = screeningTemplate.content.firstElementChild.cloneNode(true);
        screeningLi.querySelector('.movie-title').textContent = screening.title;
        screeningLi.querySelector('.movie-image').src = screening.image;
        screeningLi.querySelector('.screening-time').textContent = formatTime(screening.time);

        // Get the weather forecast in the "hourly" array based on the number of (integer) hours until the screening.
        let hoursUntilScreening = Math.round(screening.time - new Date().getHours());
        let weatherDescription = forecast.hourly[hoursUntilScreening].weather[0].main;
        screeningLi.querySelector('.weather-forecast').textContent = weatherDescription;

        screeningList.append(screeningLi);

        screeningLi.querySelector('.buy-ticket-button').onclick = () => {
            showTicket(screening);
        };
    }

    function showTicket(screening) {
        let ticketLi = ticketTemplate.content.firstElementChild.cloneNode(true);
        ticketLi.querySelector('.movie-title').textContent = screening.title;
        ticketLi.querySelector('.movie-image').src = screening.image;
        ticketLi.querySelector('.screening-time').textContent = formatTime(screening.time);
        ticketList.append(ticketLi);

        ticketLi.querySelector('.remove-ticket-button').onclick = () => {
            ticketLi.remove();
        };
    }
}

async function getPixabayData() {
    const openWeatherApiKey = '25667613-c4eb752a402c99aa3f1f4a7f5';
    let params = new URLSearchParams({
    });
    let response = await fetch('https://pixabay.com/api/?' + params.toString());
    let pixabay = await response.json();
    return pixabay;
}

function formatTime(time) {
    let hours = Math.floor(time);
    let hourString = hours.toString().padStart(2, '0');

    let minuteRatio = time - hours;
    let minutes = Math.round(60 * minuteRatio);
    let minuteString = minutes.toString().padStart(2, '0');

    return hourString + ':' + minuteString;
}






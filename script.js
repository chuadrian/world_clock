const cities = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Moscow', timezone: 'Europe/Moscow' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Berlin', timezone: 'Europe/Berlin' },
    { name: 'Beijing', timezone: 'Asia/Shanghai' },
    { name: 'Mumbai', timezone: 'Asia/Kolkata' },
    { name: 'São Paulo', timezone: 'America/Sao_Paulo' },
    { name: 'Cairo', timezone: 'Africa/Cairo' },
    { name: 'Bangkok', timezone: 'Asia/Bangkok' },
    { name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires' },
    { name: 'Cape Town', timezone: 'Africa/Johannesburg' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
    { name: 'Seoul', timezone: 'Asia/Seoul' },
    { name: 'Mexico City', timezone: 'America/Mexico_City' },
    { name: 'Jakarta', timezone: 'Asia/Jakarta' },
    { name: 'Lagos', timezone: 'Africa/Lagos' },
    { name: 'Toronto', timezone: 'America/Toronto' },
    { name: 'Istanbul', timezone: 'Europe/Istanbul' },
    { name: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur' },
    { name: 'Riyadh', timezone: 'Asia/Riyadh' },
    { name: 'Lima', timezone: 'America/Lima' },
    { name: 'Karachi', timezone: 'Asia/Karachi' },
    { name: 'Tehran', timezone: 'Asia/Tehran' },
    { name: 'Baghdad', timezone: 'Asia/Baghdad' },
    { name: 'Athens', timezone: 'Europe/Athens' },
    { name: 'Rome', timezone: 'Europe/Rome' },
    { name: 'Vienna', timezone: 'Europe/Vienna' },
    { name: 'Stockholm', timezone: 'Europe/Stockholm' },
    { name: 'Warsaw', timezone: 'Europe/Warsaw' },
    { name: 'Zurich', timezone: 'Europe/Zurich' },
    { name: 'Barcelona', timezone: 'Europe/Madrid' },
    { name: 'Helsinki', timezone: 'Europe/Helsinki' },
    { name: 'Copenhagen', timezone: 'Europe/Copenhagen' }
];

let currentCityIndex = 0;

function updateClock() {
    const city = cities[currentCityIndex];
    fetch(`world_clock.php?timezone=${city.timezone}`)
        .then(response => response.json())
        .then(data => {
            let { hours, minutes, seconds } = data;
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // Adjust hour '0' to '12'

            // Calculate degrees for hour and minute hands
            const secondsDegrees = ((seconds / 60) * 360) + 90;
            const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
            const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

            const clockContainer = document.querySelector('.clock-container');
            clockContainer.querySelector('.second-hand').style.transform = `rotate(${secondsDegrees}deg)`;
            clockContainer.querySelector('.minute-hand').style.transform = `rotate(${minutesDegrees}deg)`;
            clockContainer.querySelector('.hour-hand').style.transform = `rotate(${hoursDegrees}deg)`;
            clockContainer.querySelector('.city-name').textContent = city.name;

            // Update digital clock
            const formattedHours = hours < 10 ? '0' + hours : hours;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            clockContainer.querySelector('.digital-time').textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;

            // Slide in the new clock
            clockContainer.style.left = '50%';
        });
}

function nextCity() {
    const previousCityIndex = currentCityIndex;
    currentCityIndex = (currentCityIndex + 1) % cities.length;

    const previousClock = document.querySelector('.clock-container');
    previousClock.style.left = '-100%'; // Move the previous clock out

    // Create a new clock container for the next city
    const newClock = previousClock.cloneNode(true);
    newClock.style.left = '100%'; // Prepare the new clock off-screen
    document.querySelector('.clocks-container').appendChild(newClock);

    // Update the new clock with the correct city time
    updateClock();

    // Animate the new clock in
    setTimeout(() => {
        newClock.style.left = '50%'; // Animate the new clock to the center
    }, 10); // Slight delay to ensure the new clock starts from the correct position

    // Remove the previous clock after the transition
    setTimeout(() => {
        if (previousClock) {
            previousClock.remove();
        }
    }, 1000); // Wait for the animation to complete
}

// Initial clock setup
updateClock();
setInterval(nextCity, 10000); // Change city every 10 seconds

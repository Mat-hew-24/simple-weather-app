document.getElementById("location").addEventListener("change",async () => {
    const location=document.getElementById("location").value;

    const weatherdata = await getWeatherdata(location);

    display(weatherdata);
});

const getWeatherdata = async (location) => {
    if (!location){
        return {};
    }

    const apikey="hahahaveryfunny";
    const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`);
    const json= await response.json();
    return json;
}

function getBackcolor(temp){
    if (temp<0){
        return 'lightblue';
    }else if(temp<10){
        return 'lightgreen';
    }else if (temp<20){
        return 'lightyellow';
    }else if (temp<30){
        return 'lightsalmon';
    }else{
        return 'lightcoral';
    }
}

const display = (data) => {
    const weatherdataelement = document.getElementById("weather-data");

    if (Object.keys(data).length===0){
        weatherdataelement.innerHTML="Please enter a location to see the weather.";
    }else{
        const background=getBackcolor(Math.floor(data.main.temp-273.15));
        weatherdataelement.style.backgroundColor=background;

        weatherdataelement.innerHTML=`
            <h3>${data.name}</h3>
            <p>Temperature: ${Math.floor(data.main.temp-273.15)}C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }
}

window.onload = async () =>{
    const wdata= await getWeatherdata();
    display(wdata);
}
const result = document.querySelector(".result");
const form = document.querySelector("form")
const city = document.getElementById("city");
const country = document.getElementById("country");

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(city.value === '' || country.value === ''){
        showError("Ambele casute sunt obligatorii");
        return;
    }

    // else{
    //     console.log(city.value);
    //     console.log(country.value);
    // }

    callApi(city.value, country.value);
    
})

function showError(message){
    console.log(message);
    const alert = document.createElement('p');
    alert.innerHTML= message;
    alert.classList.add('alert-message');

    form.appendChild(alert)

    setTimeout(()=>{
        alert.remove()
    }, 3000);
}

function callApi(city, country){
    const apiId = '28f5946df0681e3df4f2aaad1763423c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
    //https://api.openweathermap.org/data/2.5/weather?q=Madrid,Spania&appid=28f5946df0681e3df4f2aaad1763423c

    fetch(url)
        .then(data => {
            return data.json()
        })

        .then(dataJSON => {
            if(dataJSON.cod === '404'){
                showError("Ai introdus un oras gresit")
            }

            else{
                clearHTML();
                showWeather(dataJSON);
            }

            console.log(dataJSON);
        })

        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){

    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const degrees = kelvinToCentigrades(temp);
    const min = kelvinToCentigrades(temp_min);
    const max = kelvinToCentigrades(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
            <h5>The weather in ${name}</h5>
            <img src="http://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">

            <h2>${degrees} * C</h2>
            <p>Max: ${max} *C</p>
            <p>Min: ${min} *C</p>
            </div>
    `;

    result.appendChild(content);

    console.log(name);
    console.log(temp);
    console.log(temp_min);
    console.log(temp_max);
    console.log(arr.icon);
}

function kelvinToCentigrades(temp){
    return parseInt(temp - 273.15)
}

function clearHTML(){
    result.innerHTML = "";
}
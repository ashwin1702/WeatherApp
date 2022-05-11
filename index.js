let tem = document.querySelector('.temperature-degree');
let loc = document.querySelector('.location-detail');
let decp = document.querySelector('.decp');
let style = document.querySelector('.style');
let nav1 = document.querySelector('.nav1');
let nav2 = document.querySelector('.nav2');
let nav3 = document.querySelector('.nav3');
let Humidity = document.querySelector('.card-info-humidity');
let Pressure = document.querySelector('.card-info-pressure');
let Wind = document.querySelector('.card-info-wind');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
let placeholder = document.querySelector('#input-search');
let ISO2 = document.querySelector('.vertical-info');
let card = document.querySelector('.float-right');

let card1 = document.querySelector('.card1');
let card2 = document.querySelector('.card2');
let card3 = document.querySelector('.card3');
let mainTag = document.querySelector('main');
let fixed = document.querySelector('.fixed');
let icons = document.querySelector('.icon');
let bg = mainTag.classList.value;
let logo = document.querySelector('.logo');
let tempUnit = document.querySelector('.temp-unit');
let speedUnit = document.querySelector('.speed-unit');

let let1 = document.querySelector('.let1');
let let2 = document.querySelector('.let2');
let let3 = document.querySelector('.let3');
let let4 = document.querySelector('.let4');
let let5 = document.querySelector('.let5');
let let6 = document.querySelector('.let6');
let let7 = document.querySelector('.let7');






window.setInterval('refresh()', 500);
function refresh() {

    if (window.innerWidth >= 768) {
        fixed.classList.add(bg);
        mainTag.classList.remove(bg);

    }
    else {
        fixed.classList.remove(bg);

        mainTag.classList.add(bg);

    }

}

// function titleCase(str) {
//     var splitStr = str.toLowerCase().split(' ');
//     for (var i = 0; i < splitStr.length; i++) {

//         splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
//     }

//     return splitStr.join(' '); 
//  }

searchButton.addEventListener('click', (e) => {

    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';


});

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=71ad38d5fba76f33bb105bd782dee29e`,
            { mode: 'cors' });

        const weatherData = await response.json();
        console.log(weatherData);
        const { name } = weatherData;
        const { speed } = weatherData.wind;
        const { feels_like, pressure, humidity } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        const { country } = weatherData.sys;
        const { dt } = weatherData;
        const { sunrise, sunset } = weatherData.sys;


        // const eles =document.createElement('sup');
        // eles.textContent = 'o';
        // tem.nextElementSibling.textContent = 'C';
        // tem.nextElementSibling.prepend(eles);
        // tem.textContent = Math.round(feels_like - 273);
        loc.textContent = name;
        decp.textContent = main;
        Humidity.textContent = humidity;
        Pressure.textContent = pressure;
        Wind.textContent = speed.toFixed(2);



        //iSO2 to country name api.


        try {
            const response = await fetch(`https://api.worldbank.org/v2/country/${country}?format=json`,
                { mode: 'cors' });

            const WeatherData = await response.json();

            const { name } = WeatherData[1][0];
            ISO2.textContent = name.toUpperCase();

        }

        catch (error) {
            console.log('CITY NOT FOUND');
        }

        console.log(id);




        if (main == 'Clear') {

            logo.firstElementChild.setAttribute('src', 'images/clear.png');

        }
        else if (main == 'Rain') {
            logo.firstElementChild.setAttribute('src', 'images/water.png');

        }
        else if (main == 'Snow') {
            logo.firstElementChild.setAttribute('src', 'images/snow.png');

        }
        else {

            logo.firstElementChild.setAttribute('src', 'images/main.png');
        }






        // temp unit



        function cTof(feels_like) {
            tem.textContent = Math.round((feels_like - 273) * (9 / 5) + 32);
            const ele = document.createElement('sup');
            ele.textContent = 'o';
            tem.nextElementSibling.textContent = 'F';
            tem.nextElementSibling.prepend(ele);

        }

        if (tempUnit.firstElementChild.nextElementSibling.className == 'listActive') {
            cTof(feels_like);
        }
        else if (tempUnit.firstElementChild.nextElementSibling.nextElementSibling.className == 'listActive') {
            tem.textContent = Math.round(feels_like);
            const ele = document.createElement('sup');
            ele.textContent = '';
            tem.nextElementSibling.textContent = 'K';
            tem.nextElementSibling.prepend(ele);
        }
        else {
            const eles = document.createElement('sup');
            eles.textContent = 'o';
            tem.nextElementSibling.textContent = 'C';
            tem.nextElementSibling.prepend(eles);
            tem.textContent = Math.round(feels_like - 273);
        }


        tempUnit.firstElementChild.nextElementSibling.addEventListener('click', () => {
            cTof(feels_like);
        });

        tempUnit.firstElementChild.addEventListener('click', () => {
            tem.textContent = Math.round(feels_like - 273);
            const ele = document.createElement('sup');
            ele.textContent = 'o';
            tem.nextElementSibling.textContent = 'C';
            tem.nextElementSibling.prepend(ele);

        });
        tempUnit.firstElementChild.nextElementSibling.nextElementSibling.addEventListener('click', () => {
            tem.textContent = Math.round(feels_like);
            const ele = document.createElement('sup');
            ele.textContent = '';
            tem.nextElementSibling.textContent = 'K';
            tem.nextElementSibling.prepend(ele);

        });





        // speed unit change

        function kmToMs(speed) {
            Wind.textContent = (speed * (5 / 18)).toFixed(2);
            const elem = document.createElement('span');
            elem.textContent = 'm/sec';
            Wind.nextElementSibling.nextElementSibling.textContent = '';
            Wind.nextElementSibling.nextElementSibling.append(elem);
        }


        if (speedUnit.firstElementChild.nextElementSibling.className == 'listActive') {
            kmToMs(speed);
        }
        else if (speedUnit.firstElementChild.nextElementSibling.nextElementSibling.className == 'listActive') {
            Wind.textContent = ((speed) / 1.852).toFixed(2);
            const elem = document.createElement('span');
            elem.textContent = ' Knots';
            Wind.nextElementSibling.nextElementSibling.textContent = '';
            Wind.nextElementSibling.nextElementSibling.append(elem);
        }
        else {
            Wind.textContent = speed.toFixed(2);
            const elem = document.createElement('span');
            elem.textContent = ' Km/hr';
            Wind.nextElementSibling.nextElementSibling.textContent = '';
            Wind.nextElementSibling.nextElementSibling.append(elem);
        }



        speedUnit.firstElementChild.nextElementSibling.addEventListener('click', () => {
            kmToMs(speed);
        });

        speedUnit.firstElementChild.addEventListener('click', () => {
            Wind.textContent = speed.toFixed(2);
            const elem = document.createElement('span');
            elem.textContent = ' Km/hr';
            Wind.nextElementSibling.nextElementSibling.textContent = '';
            Wind.nextElementSibling.nextElementSibling.append(elem);

        });
        speedUnit.firstElementChild.nextElementSibling.nextElementSibling.addEventListener('click', () => {
            Wind.textContent = ((speed) / 1.852).toFixed(2);
            const elem = document.createElement('span');
            elem.textContent = ' Knots';
            Wind.nextElementSibling.nextElementSibling.textContent = '';
            Wind.nextElementSibling.nextElementSibling.append(elem);

        });



        //font color




        if (main == 'Snow' || main == 'Rain') {
            document.documentElement.style.setProperty('--font-color', '#ffffff');
            searchButton.firstElementChild.setAttribute('src', 'images/search-w.png');
            card1.firstElementChild.setAttribute('src', 'images/humidity.png');
        }
        else {
            document.documentElement.style.setProperty('--font-color', '#000000');
            searchButton.firstElementChild.setAttribute('src', 'images/search-b.png');
            card1.firstElementChild.setAttribute('src', 'images/humidity-b.png');

        }











        switch (main) {

            case 'Thunderstorm':

                mainTag.classList.add('background-thunder');
                mainTag.classList.remove('background');
                mainTag.classList.remove('background-winter');
                mainTag.classList.remove('background-clouds');
                mainTag.classList.remove('background-summer');
                mainTag.classList.remove('background-night');
                fixed.className = 'fixed';
                bg = 'background-thunder';
                refresh();
                break;
            case 'Rain':

                mainTag.classList.add('background');
                mainTag.classList.remove('background-summer');
                mainTag.classList.remove('background-winter');
                mainTag.classList.remove('background-clouds');
                mainTag.classList.remove('background-thunder');
                mainTag.classList.remove('background-night');
                fixed.className = 'fixed';

                bg = 'background';
                refresh();
                break;
            case 'Clear':


                if (dt <= sunset && dt >= sunrise) {
                    mainTag.classList.add('background-summer');

                }
                else {
                    mainTag.classList.add('background-night');
                }
                mainTag.classList.remove('background');
                mainTag.classList.remove('background-winter');
                mainTag.classList.remove('background-clouds');
                mainTag.classList.remove('background-thunder');
                fixed.className = 'fixed';


                if (dt <= sunset && dt >= sunrise) {
                    bg = 'background-summer';

                }
                else {
                    bg = 'background-night';
                }
                refresh();
                break;
            case 'Snow':
                mainTag.classList.add('background-winter');
                mainTag.classList.remove('background');
                mainTag.classList.remove('background-summer');
                mainTag.classList.remove('background-clouds');
                mainTag.classList.remove('background-thunder');
                mainTag.classList.remove('background-night');
                fixed.className = 'fixed';

                bg = 'background-winter';
                refresh();
                break;

            default:
                mainTag.classList.add('background-clouds');
                mainTag.classList.remove('background');
                mainTag.classList.remove('background-winter');
                mainTag.classList.remove('background-summer');
                mainTag.classList.remove('background-thunder');
                mainTag.classList.remove('background-night');
                fixed.className = 'fixed';
                bg = 'background-clouds';
                refresh();
        }




        if (id >= 200 && id < 233) {

            if (main == 'Snow' || main == 'Rain') {
                icons.firstElementChild.setAttribute('src', 'images/icon-strom-w.png')

            }
            else {
                icons.firstElementChild.setAttribute('src', 'images/icon-strom-b.png')

            }

        }
        else if (id >= 300 && id < 322) {

            if (main == 'Snow' || main == 'Rain') {
                icons.firstElementChild.setAttribute('src', 'images/icon-haze-w.png')

            }
            else {
                icons.firstElementChild.setAttribute('src', 'images/icon-haze-b.png')

            }
        }
        else if (id >= 500 && id < 532) {

            if (id == 511) {

                if (main == 'Snow' || main == 'Rain') {
                    icons.firstElementChild.setAttribute('src', 'images/icon-snow-rain-w.png')

                }
                else {
                    icons.firstElementChild.setAttribute('src', 'images/icon-snow-rain-b.png')

                }

            }
            else if (id > 501 && id < 505) {

                if (main == 'Snow' || main == 'Rain') {
                    icons.firstElementChild.setAttribute('src', 'images/icon-heavyRain-w.png')

                }
                else {
                    icons.firstElementChild.setAttribute('src', 'images/icon-heavyRain-b.png')

                }


            }
            else {

                if (main == 'Snow' || main == 'Rain') {
                    icons.firstElementChild.setAttribute('src', 'images/icon-light-rain-w.png')

                }
                else {
                    icons.firstElementChild.setAttribute('src', 'images/icon-light-rain-b.png')

                }
            }
        }
        else if (id >= 600 && id < 623) {
            if (id > 610 && id < 614) {


                if (main == 'Snow' || main == 'Rain') {
                    icons.firstElementChild.setAttribute('src', 'images/icon-hail-w.png')

                }
                else {
                    icons.firstElementChild.setAttribute('src', 'images/icon-hail-b.png')

                }

            }
            else if (id > 614 && id < 621) {

                if (main == 'Snow' || main == 'Rain') {
                    icons.firstElementChild.setAttribute('src', 'images/icon-snow-rain-w.png')

                }
                else {
                    icons.firstElementChild.setAttribute('src', 'images/icon-snow-rain-b.png')

                }

            }
            else {

                if (main == 'Snow' || main == 'Rain') {
                    icons.firstElementChild.setAttribute('src', 'images/icon-snow-w.png')

                }
                else {
                    icons.firstElementChild.setAttribute('src', 'images/icon-snow-b.png')

                }
            }
        }
        else if (id >= 701 && id < 782) {



            if (main == 'Snow' || main == 'Rain') {
                icons.firstElementChild.setAttribute('src', 'images/icon-wind-w.png')

            }
            else {
                icons.firstElementChild.setAttribute('src', 'images/icon-wind-b.png')

            }

        }

        else if (id == 800) {

            if (dt >= sunrise && dt <= sunset) {

                if (main == 'Snow' || main == 'Rain') {
                    icons.firstElementChild.setAttribute('src', 'images/icon-day-w.png')

                }
                else {
                    icons.firstElementChild.setAttribute('src', 'images/icon-day-b.png')

                }
            }
            else {
                if (main == 'Snow' || main == 'Rain') {
                    icons.firstElementChild.setAttribute('src', 'images/icon-night-w.png')

                }
                else {
                    icons.firstElementChild.setAttribute('src', 'images/icon-night-b.png')

                }
            }

        }

        else {

            if (main == 'Snow' || main == 'Rain') {
                icons.firstElementChild.setAttribute('src', 'images/icon-clear-w.png')

            }
            else {
                icons.firstElementChild.setAttribute('src', 'images/icon-clear-b.png')

            }


        }

    }

    catch (error) {
        alert('CITY NOT FOUND');
    }
};












window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {

            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            // const api = (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=71ad38d5fba76f33bb105bd782dee29e`, {mode:'cors'});

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=71ad38d5fba76f33bb105bd782dee29e`, { mode: 'cors' }).then(response => {
                return response.json();
            })


                .then(data => {

                    const { feels_like, pressure, humidity } = data.main;
                    const { speed } = data.wind;
                    const { name } = data;
                    const { id, main } = data.weather[0];

                    const { country } = data.sys;
                    // tem.textContent = Math.round(feels_like - 273);
                    loc.textContent = name;
                    decp.textContent = main;
                    Humidity.textContent = humidity;
                    Pressure.textContent = pressure;
                    Wind.textContent = speed.toFixed(2);

                    console.log($('.card-info-wind').innerWidth());
                    if ($('.card-info-wind').innerWidth() < 74) {
                        Wind.nextElementSibling.setAttribute('class', 'Card-Border-x');
                    }
                    else {
                        Wind.nextElementSibling.setAttribute('class', 'card-border-x');
                    }


                    //ISO2 code to country name api.

                    // const Api = `https://api.worldbank.org/v2/country/${country}?format=json`;

                    fetch(`https://api.worldbank.org/v2/country/${country}?format=json`, { mode: 'cors' }).then(response => {
                        return response.json();
                    })
                        .then(data => {
                            const { name } = data[1][0];
                            ISO2.textContent = name.toUpperCase();
                        });


                    console.log(id);

                    // temperature unit change



                    function cTof(feels_like) {
                        tem.textContent = Math.round((feels_like - 273) * (9 / 5) + 32);
                        const ele = document.createElement('sup');
                        ele.textContent = 'o';
                        tem.nextElementSibling.textContent = 'F';
                        tem.nextElementSibling.prepend(ele);

                    }


                    if (tempUnit.firstElementChild.nextElementSibling.className == 'listActive') {
                        cTof(feels_like);
                    }
                    else if (tempUnit.firstElementChild.nextElementSibling.nextElementSibling.className == 'listActive') {
                        tem.textContent = Math.round(feels_like);
                        const ele = document.createElement('sup');
                        ele.textContent = '';
                        tem.nextElementSibling.textContent = 'K';
                        tem.nextElementSibling.prepend(ele);
                    }
                    else {
                        const eles = document.createElement('sup');
                        eles.textContent = 'o';
                        tem.nextElementSibling.textContent = 'C';
                        tem.nextElementSibling.prepend(eles);
                        tem.textContent = Math.round(feels_like - 273);
                    }



                    tempUnit.firstElementChild.nextElementSibling.addEventListener('click', () => {
                        cTof(feels_like);
                    });

                    tempUnit.firstElementChild.addEventListener('click', () => {
                        tem.textContent = Math.round(feels_like - 273);
                        const ele = document.createElement('sup');
                        ele.textContent = 'o';
                        tem.nextElementSibling.textContent = 'C';
                        tem.nextElementSibling.prepend(ele);

                    });
                    tempUnit.firstElementChild.nextElementSibling.nextElementSibling.addEventListener('click', () => {
                        tem.textContent = Math.round(feels_like);
                        const ele = document.createElement('sup');
                        ele.textContent = '';
                        tem.nextElementSibling.textContent = 'K';
                        tem.nextElementSibling.prepend(ele);

                    });




                    // speed unit change

                    function kmToMs(speed) {
                        Wind.textContent = (speed * (5 / 18)).toFixed(2);
                        const elem = document.createElement('span');
                        elem.textContent = 'm/sec';
                        Wind.nextElementSibling.nextElementSibling.textContent = '';
                        Wind.nextElementSibling.nextElementSibling.append(elem);
                    }


                    if (speedUnit.firstElementChild.nextElementSibling.className == 'listActive') {
                        kmToMs(speed);
                    }
                    else if (speedUnit.firstElementChild.nextElementSibling.nextElementSibling.className == 'listActive') {
                        Wind.textContent = ((speed) / 1.852).toFixed(2);
                        const elem = document.createElement('span');
                        elem.textContent = '  Knots';
                        Wind.nextElementSibling.nextElementSibling.textContent = '';
                        Wind.nextElementSibling.nextElementSibling.append(elem);
                    }
                    else {
                        Wind.textContent = speed.toFixed(2);
                        const elem = document.createElement('span');
                        elem.textContent = ' Km/hr';
                        Wind.nextElementSibling.nextElementSibling.textContent = '';
                        Wind.nextElementSibling.nextElementSibling.append(elem);
                    }



                    speedUnit.firstElementChild.nextElementSibling.addEventListener('click', () => {
                        kmToMs(speed);
                    });

                    speedUnit.firstElementChild.addEventListener('click', () => {
                        Wind.textContent = speed.toFixed(2);
                        const elem = document.createElement('span');
                        elem.textContent = ' Km/hr';
                        Wind.nextElementSibling.nextElementSibling.textContent = '';
                        Wind.nextElementSibling.nextElementSibling.append(elem);

                    });
                    speedUnit.firstElementChild.nextElementSibling.nextElementSibling.addEventListener('click', () => {
                        Wind.textContent = ((speed) / 1.852).toFixed(2);
                        const elem = document.createElement('span');
                        elem.textContent = '  Knots';
                        Wind.nextElementSibling.nextElementSibling.textContent = '';
                        Wind.nextElementSibling.nextElementSibling.append(elem);

                    });








                    //	Thunderstorm Rain Snow Clear Clouds


                    if (main == 'Clear') {

                        logo.firstElementChild.setAttribute('src', 'images/clear.png');


                    }
                    else if (main == 'Rain') {
                        logo.firstElementChild.setAttribute('src', 'images/water.png');

                    }
                    else if (main == 'Snow') {
                        logo.firstElementChild.setAttribute('src', 'images/snow.png');

                    }
                    else {

                        logo.firstElementChild.setAttribute('src', 'images/main.png');
                    }




                    //font color




                    if (main == 'Snow' || main == 'Rain') {
                        document.documentElement.style.setProperty('--font-color', '#ffffff');
                        searchButton.firstElementChild.setAttribute('src', 'images/search-w.png');
                        card1.firstElementChild.setAttribute('src', 'images/humidity.png');
                    }
                    else {
                        document.documentElement.style.setProperty('--font-color', '#000000');
                        searchButton.firstElementChild.setAttribute('src', 'images/search-b.png');
                        card1.firstElementChild.setAttribute('src', 'images/humidity-b.png');

                    }








                    switch (main) {

                        case 'Thunderstorm':

                            mainTag.classList.add('background-thunder');
                            mainTag.classList.remove('background');
                            mainTag.classList.remove('background-winter');
                            mainTag.classList.remove('background-clouds');
                            mainTag.classList.remove('background-summer');
                            mainTag.classList.remove('background-night');
                            fixed.className = 'fixed';
                            bg = 'background-thunder';
                            refresh();
                            break;
                        case 'Rain':

                            mainTag.classList.add('background');
                            mainTag.classList.remove('background-summer');
                            mainTag.classList.remove('background-winter');
                            mainTag.classList.remove('background-clouds');
                            mainTag.classList.remove('background-thunder');
                            mainTag.classList.remove('background-night');
                            fixed.className = 'fixed';

                            bg = 'background';
                            refresh();
                            break;
                        case 'Clear':


                            if (dt <= sunset && dt >= sunrise) {
                                mainTag.classList.add('background-summer');

                            }
                            else {
                                mainTag.classList.add('background-night');
                            }
                            mainTag.classList.remove('background');
                            mainTag.classList.remove('background-winter');
                            mainTag.classList.remove('background-clouds');
                            mainTag.classList.remove('background-thunder');
                            fixed.className = 'fixed';


                            if (dt <= sunset && dt >= sunrise) {
                                bg = 'background-summer';

                            }
                            else {
                                bg = 'background-night';
                            }
                            refresh();
                            break;
                        case 'Snow':
                            mainTag.classList.add('background-winter');
                            mainTag.classList.remove('background');
                            mainTag.classList.remove('background-summer');
                            mainTag.classList.remove('background-clouds');
                            mainTag.classList.remove('background-thunder');
                            mainTag.classList.remove('background-night');
                            fixed.className = 'fixed';

                            bg = 'background-winter';
                            refresh();
                            break;

                        default:
                            mainTag.classList.add('background-clouds');
                            mainTag.classList.remove('background');
                            mainTag.classList.remove('background-winter');
                            mainTag.classList.remove('background-summer');
                            mainTag.classList.remove('background-thunder');
                            mainTag.classList.remove('background-night');
                            fixed.className = 'fixed';
                            bg = 'background-clouds';
                            refresh();
                    }













                    const { dt } = data;
                    const { sunrise, sunset } = data.sys;




                    if (id >= 200 && id < 233) {

                        if (main == 'Snow' || main == 'Rain') {
                            icons.firstElementChild.setAttribute('src', 'images/icon-strom-w.png')

                        }
                        else {
                            icons.firstElementChild.setAttribute('src', 'images/icon-strom-b.png')

                        }

                    }
                    else if (id >= 300 && id < 322) {

                        if (main == 'Snow' || main == 'Rain') {
                            icons.firstElementChild.setAttribute('src', 'images/icon-haze-w.png')

                        }
                        else {
                            icons.firstElementChild.setAttribute('src', 'images/icon-haze-b.png')

                        }
                    }
                    else if (id >= 500 && id < 532) {

                        if (id == 511) {

                            if (main == 'Snow' || main == 'Rain') {
                                icons.firstElementChild.setAttribute('src', 'images/icon-snow-rain-w.png')

                            }
                            else {
                                icons.firstElementChild.setAttribute('src', 'images/icon-snow-rain-b.png')

                            }

                        }
                        else if (id > 501 && id < 505) {

                            if (main == 'Snow' || main == 'Rain') {
                                icons.firstElementChild.setAttribute('src', 'images/icon-heavyRain-w.png')

                            }
                            else {
                                icons.firstElementChild.setAttribute('src', 'images/icon-heavyRain-b.png')

                            }


                        }
                        else {

                            if (main == 'Snow' || main == 'Rain') {
                                icons.firstElementChild.setAttribute('src', 'images/icon-light-rain-w.png')

                            }
                            else {
                                icons.firstElementChild.setAttribute('src', 'images/icon-light-rain-b.png')

                            }
                        }
                    }
                    else if (id >= 600 && id < 623) {
                        if (id > 610 && id < 614) {


                            if (main == 'Snow' || main == 'Rain') {
                                icons.firstElementChild.setAttribute('src', 'images/icon-hail-w.png')

                            }
                            else {
                                icons.firstElementChild.setAttribute('src', 'images/icon-hail-b.png')

                            }

                        }
                        else if (id > 614 && id < 621) {

                            if (main == 'Snow' || main == 'Rain') {
                                icons.firstElementChild.setAttribute('src', 'images/icon-snow-rain-w.png')

                            }
                            else {
                                icons.firstElementChild.setAttribute('src', 'images/icon-snow-rain-b.png')

                            }

                        }
                        else {

                            if (main == 'Snow' || main == 'Rain') {
                                icons.firstElementChild.setAttribute('src', 'images/icon-snow-w.png')

                            }
                            else {
                                icons.firstElementChild.setAttribute('src', 'images/icon-snow-b.png')

                            }
                        }
                    }
                    else if (id >= 701 && id < 782) {



                        if (main == 'Snow' || main == 'Rain') {
                            icons.firstElementChild.setAttribute('src', 'images/icon-wind-w.png')

                        }
                        else {
                            icons.firstElementChild.setAttribute('src', 'images/icon-wind-b.png')

                        }

                    }
                    else if (id == 800) {

                        if (dt >= sunrise && dt <= sunset) {

                            if (main == 'Snow' || main == 'Rain') {
                                icons.firstElementChild.setAttribute('src', 'images/icon-day-w.png')

                            }
                            else {
                                icons.firstElementChild.setAttribute('src', 'images/icon-day-b.png')

                            }
                        }
                        else {
                            if (main == 'Snow' || main == 'Rain') {
                                icons.firstElementChild.setAttribute('src', 'images/icon-night-w.png')


                            }
                            else {
                                icons.firstElementChild.setAttribute('src', 'images/icon-night-b.png')

                            }
                        }

                    }

                    else {

                        if (main == 'Snow' || main == 'Rain') {
                            icons.firstElementChild.setAttribute('src', 'images/icon-clear-w.png')

                        }
                        else {
                            icons.firstElementChild.setAttribute('src', 'images/icon-clear-b.png')

                        }


                    }

                });

        })
    }
});


$(document).ready(function () {
    $(".style").click(function () {
        $(this).toggleClass("active");
        $('.side-nav').toggleClass("side-nav-view");
        $('.nav-2').toggleClass("active");
    });
});



const x = 500;

window.addEventListener("scroll", function () {

    const scrolled = scrollY;

    if (scrolled >= 90) {
        card1.classList.add('fade');
        card1.classList.remove('fade-toggle');
    }
    else {
        card1.classList.add('fade-toggle');
        card1.classList.remove('fade');
    }
    if (scrolled >= 300) {
        card2.classList.add('fade');
        card2.classList.remove('fade-toggle');
    }
    else {
        card2.classList.add('fade-toggle');
        card2.classList.remove('fade');
    }


});


tempUnit.firstElementChild.addEventListener('click', () => {
    if (tempUnit.firstElementChild.className == '') {
        tempUnit.firstElementChild.classList.add('listActive');
        tempUnit.firstElementChild.nextElementSibling.classList.remove('listActive');
        tempUnit.firstElementChild.nextElementSibling.nextElementSibling.classList.remove('listActive');

    }
});
tempUnit.firstElementChild.nextElementSibling.addEventListener('click', () => {
    if (tempUnit.firstElementChild.nextElementSibling.className == '') {
        tempUnit.firstElementChild.nextElementSibling.classList.add('listActive');
        tempUnit.firstElementChild.classList.remove('listActive');
        tempUnit.firstElementChild.nextElementSibling.nextElementSibling.classList.remove('listActive');

    }
});
tempUnit.firstElementChild.nextElementSibling.nextElementSibling.addEventListener('click', () => {
    if (tempUnit.firstElementChild.nextElementSibling.nextElementSibling.className == '') {


        tempUnit.firstElementChild.nextElementSibling.nextElementSibling.classList.add('listActive');
        tempUnit.firstElementChild.classList.remove('listActive');
        tempUnit.firstElementChild.nextElementSibling.classList.remove('listActive');
    }
});

// speed

speedUnit.firstElementChild.addEventListener('click', () => {
    if (speedUnit.firstElementChild.className == '') {
        speedUnit.firstElementChild.classList.add('listActive');
        speedUnit.firstElementChild.nextElementSibling.classList.remove('listActive');
        speedUnit.firstElementChild.nextElementSibling.nextElementSibling.classList.remove('listActive');

    }
});
speedUnit.firstElementChild.nextElementSibling.addEventListener('click', () => {
    if (speedUnit.firstElementChild.nextElementSibling.className == '') {
        speedUnit.firstElementChild.nextElementSibling.classList.add('listActive');
        speedUnit.firstElementChild.classList.remove('listActive');
        speedUnit.firstElementChild.nextElementSibling.nextElementSibling.classList.remove('listActive');

    }
});
speedUnit.firstElementChild.nextElementSibling.nextElementSibling.addEventListener('click', () => {
    if (speedUnit.firstElementChild.nextElementSibling.nextElementSibling.className == '') {


        speedUnit.firstElementChild.nextElementSibling.nextElementSibling.classList.add('listActive');
        speedUnit.firstElementChild.classList.remove('listActive');
        speedUnit.firstElementChild.nextElementSibling.classList.remove('listActive');
    }
});


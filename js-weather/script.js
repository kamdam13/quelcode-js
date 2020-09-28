'use strict';

const selectElement = document.getElementById('select-cityname');
const url = 'https://api.openweathermap.org/data/2.5/weather';
let params = { appid: '4b5774e9f3d2a07b84f0f2f88e486224', q: 'London', units: 'metric', lang: 'ja' };

function parseResponse(data) {
  let res = {};
  const datetime = new Date(data.dt * 1000);
  const month = datetime.getMonth() + 1;
  const date = datetime.getDate();
  const hour = datetime.getHours();
  const min = String(datetime.getMinutes()).padStart(2, '0');
  res['date'] = `${month}月${date}日 ${hour}時${min}分`;
  const weather = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;
  res['icon'] = `<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weather}">`;
  res['now_temperature'] = Math.round(data.main.temp);
  res['max_temperature'] = Math.round(data.main.temp_max);
  res['min_temperature'] = Math.round(data.main.temp_min);
  res['humidity'] = data.main.humidity;

  return res;
}

async function apiRequest(url, params) {
  url = new URL(url);
  params = new URLSearchParams(params);
  url.search = params;
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      let res = parseResponse(data);
      for (const key in res) {
        document.getElementById(`${key}`).innerHTML = res[key];
      }
    });
}

window.onload = apiRequest(url, params);
selectElement.addEventListener('change', () => {
  const cityname = selectElement.value;
  params['q'] = cityname;
  apiRequest(url, params);
});

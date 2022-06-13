import { apiKey, lat, lon, units} from "./config.js";

var apiLink = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + apiKey;
console.log(apiLink);

var weatherEl = document.getElementById("temp");

// grabs json data from url, thanks https://stackoverflow.com/a/35970894
var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

// gets city name from weather api
getJSON(apiLink,
  function (err, data) {
    if (err !== null) {
      weatherEl.innerText = "UNAVAILABLE";
    } else {
      var city = data.name;
	  var temp = data.main.temp;
	  weatherEl.innerHTML = temp + "° in " + city + "<span class='blinking'>_</span>";

	  if (temp < 50) {
		weatherEl.style.color = "var(--nord8)";
	  }
	  else if (temp < 70) {
		weatherEl.style.color = "var(--nord7)";
	  }
	  else if (temp < 80) {
		weatherEl.style.color = "var(--nord6)";
	  }
	  else if (temp < 90) {
		weatherEl.style.color = "var(--nord5)";
	  }


	}
  }
);

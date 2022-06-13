import { weather, apiKey, lat, lon, units } from "./config.js";

var weatherEl = document.getElementById("temp");

if (weather) {
  var apiLink =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=" +
    units +
    "&appid=" +
    apiKey;

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
  getJSON(apiLink, function (err, data) {
    if (err !== null) {
      weatherEl.innerText = "";
    } else {
      var city = data.name;
      var temp = data.main.temp;
      weatherEl.innerHTML =
        temp + "° in " + city + "<span class='blinking'>_</span>";

      if (temp < 50) {
        weatherEl.style.color = "var(--nord8)";
      } else if (temp < 70) {
        weatherEl.style.color = "var(--nord7)";
      } else if (temp < 80) {
        weatherEl.style.color = "var(--nord6)";
      } else if (temp < 90) {
        weatherEl.style.color = "var(--nord5)";
      }
    }
  });
} else {
  weatherEl.style.display = "none";
}

// hides all elements
document.querySelectorAll("*").forEach(el => el.style.opacity = 0);

// anime.js animation function
function playAnimation() {
  var tl = anime.timeline({
    easing: "easeInOutExpo",
    duration: 2000,
  });

  tl.add({
    targets: "#img",
    opacity: [0, 1],
    translateY: [100, 0],
  })
    .add(
      {
        targets: "#img",
        width: ["100%", "60%"],
      },
      "-=1200"
    )
    .add(
      {
        targets: "main *",
        opacity: [0, 1],
        translateY: [10, 0],
        delay: anime.stagger(15),
      },
      "-=1800"
    );
}

window.onload = function() {
  document.querySelectorAll("*").forEach(el => el.style.opacity = 1);
  playAnimation();
}
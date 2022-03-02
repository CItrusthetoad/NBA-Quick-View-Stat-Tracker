// If you are reading this, then you are cool. Unless you are from GitHub. In that case, you are a nerd.

let examplePlayers = ["LeBron James", "Giannis Antetokounmpo", "Ja Morant", "Russell Westbrook", "Nikola Jokic", "Udonis Haslem", "James Harden", "Dejounte Murray"];
let i = Math.floor(Math.random() * examplePlayers.length);

document.getElementById("playerName").placeholder = "Example: " + examplePlayers[i];

// This function is necessary in order to prevent an error. An error would occur if an API request was sent with no value.
function checkInput() {
    let inputBox = document.getElementById("playerName");

    if (inputBox.value == "") {
        fetchResults(examplePlayers[i]);
    } else {
        fetchResults(inputBox.value);
    }
}


function fetchResults(keyword) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
    let data = JSON.parse(this.responseText);
        document.cookie = data.data[0].id;

        document.getElementById("name").innerHTML = data.data[0].first_name + " " + data.data[0].last_name + " - " + data.data[0].team.full_name;

        showPlayerResults();
    }
    });

    xhr.open("GET", "https://www.balldontlie.io/api/v1/players?search=" + keyword);

    xhr.send();
}

function showPlayerResults() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        let results = JSON.parse(this.responseText);

        document.getElementById("pts").innerHTML = "PPG: " + results.data[0].pts;
        document.getElementById("reb").innerHTML = "RPG: " + results.data[0].reb;
        document.getElementById("ast").innerHTML = "APG: " + results.data[0].ast;

        document.getElementById("playerStats").style.display = "initial";
       
    }
    });

    xhr.open("GET", "https://www.balldontlie.io/api/v1/season_averages?player_ids%5B%5D=" + document.cookie);

    xhr.send();
}
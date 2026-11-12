
const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");


const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

// hahmon tiedot tulevat tänne. Taulukon indekseissä on seuraavat tiedot: 0 = name, 1 = race, 2 = class
const characterData = []

const nameInput = document.querySelector("#nameInput");
const nameButton = document.querySelector("#nameButton");
nameButton.addEventListener("click", function() {
    const name = nameInput.value;
    characterData[0] = name;

    if (name === "") {
        alert("Please enter a name for your character.");
        return;
    }
    else {
    nameInput.disabled = true;
    nameButton.disabled = true;
    }
});

// hahmon rodun valinta osio. Hakee tiedot dnd5eapi.co sivustolta ja lisää ne select elementtiin.
const RaceButton = document.querySelector("#RaceButton");
const RaceSelect = document.querySelector("#RaceSelect");

RaceButton.addEventListener("click", function() {
    RaceSelect.hidden = false;
    fetch("https://www.dnd5eapi.co/api/2024/species")
    .then(res => {
        return res.json();
    })
    .then(data => {
        data.results.forEach(race => {
            const speciesName = `<option>${race.name}</option>`;
            document.querySelector("#outputApi").insertAdjacentHTML("beforeend", speciesName);
        });
    })
    RaceButton.disabled = true; 
});

// confirm nappi rodulle. Tämä lisää rodun characterData taulukkoon ja estää valinnan muuttamisen
const selectRace = document.querySelector("#selectRace");
selectRace.addEventListener("click", function() {
    const outputApi = document.querySelector("#outputApi");
    const selectedRace = outputApi.value;
    characterData[1] = selectedRace;
    selectRace.disabled = true;
    outputApi.disabled = true;
});

// overview osio johon tulee hahmon tiedot characterData taulukosta
const overviewButton = document.querySelector("#overviewButton");
const overviewOutput = document.querySelector("#overviewOutput");

// overview painike, joka tarkistaa onko characterData taulukossa kaikki tiedot ja jos on, se näyttää ne overviewOutput elementissä.
overviewButton.addEventListener("click", function() {
    if (characterData[0] === undefined || characterData[1] === undefined || characterData[2] === undefined) {
        alert("Please make sure to select a name, race, and class for your character before viewing the overview.");
        return;
    }
    overviewOutput.textContent = `${characterData[0]}, go forth brave ${characterData[1]}, for thy are a ${characterData[2]}!`;
});

// hahmon luokan valinta osio.
const ClassButton = document.querySelector("#selectClass");
const ClassSelect = document.querySelector("#ClassSelect");
const classGrid = document.querySelector("#classGrid");

// painike, joka näyttää luokkavalinnan.
ClassButton.addEventListener("click", function() {
    ClassSelect.hidden = false;
    classGrid.hidden = false;
});

// hahmon luokan valinta osio, jossa on 12 eri luokkaa. Kun käyttäjä valitsee luokan, se lisätään characterData taulukkoon ja estetään muiden luokkien valinta.
const classOptions = document.querySelectorAll(".classOption");
classOptions.forEach(option => {
    option.addEventListener("click", function() {
        const selectedClass = option.textContent;
        characterData[2] = selectedClass;
        classOptions.forEach(opt => opt.disabled = true);
        overviewButton.hidden = false;
    });
});




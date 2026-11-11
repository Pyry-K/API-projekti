const myButton = document.querySelector("#myButton");
const output = document.querySelector("#output");

myButton.addEventListener("click", function() {
    if (output.textContent === "Olen nappi") {
        output.textContent = " ";
    }
    else {
        output.textContent = "Olen nappi";
    }
});

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");


const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

const myButton2 = document.querySelector("#myButton2");
const outputApi = document.querySelector("#outputApi");
myButton2.addEventListener("click", function() {
    fetch("https://www.dnd5eapi.co/api/2024/classes", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            //console.log(result);
            outputApi.textContent = "Data acquired:\n" + result;
        })
        .catch((error) => console.log("error", error));
});


const dataText = fetch("https://www.dnd5eapi.co/api/2024/classes", requestOptions)
    .then((response) => response.json());
const myButton3 = document.querySelector("#myButton3");
const outputJson = document.querySelector("#outputApiJson");

myButton3.addEventListener("click", function() {
    if (secretText.textContent === "Classes in 2024 5th edition D&D are:") {
        secretText.textContent = " ";
    }
    else {
        secretText.textContent = "Classes in 2024 5th edition D&D are:";
    }
    dataText.then((APIoutput) => {
        const output = document.getElementById("outputApiJson");

        output.textContent = "";

        //console.log(APIoutput);

        APIoutput.results.forEach(result => {
            output.textContent += result.name + "," + "\n";
        });
    });
});


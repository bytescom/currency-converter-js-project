const BASE_URL = "https://v6.exchangerate-api.com/v6/dc1ca565ba47615401278f04/pair";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (eve) => {
        updateFlag(eve.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amt input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    let URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data["conversion_rate"];
    console.log(rate);

    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    // msg.innerText = `${fromCurr.value} = ${toCurr.value}`;
};


const updateFlag = (element) => {
    let currCode = element.value;
    let countryFlag = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryFlag}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
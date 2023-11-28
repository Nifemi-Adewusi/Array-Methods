"use strict";
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.querySelector("#richest");
const calculateWealth = document.getElementById("calculate-wealth");
const showEntireWealth = document.querySelector("u");

let data = [];
function addData(obj) {
  data.push(obj);
  // console.log(obj);
}

function formatMoney(money) {
  const usersLocale = new Intl.NumberFormat(navigator.language).format(money);
  return usersLocale;
}

//
function doubleMoney() {
  const money = data.map(function (person) {
    return {
      name: person.name,
      money: person.money * 2,
    };
  });
  data = money;
  updateDOM();
}

function showOnlyMillionaires() {
  const millionaires = data.filter(function (person) {
    return person.money >= 1000000;
  });
  data = millionaires;
  updateDOM();
}

function sortWealth() {
  const wealth = data.sort((a, b) => b.money - a.money);
  data = wealth;
  updateDOM();
}

function calculateAllWealth() {
  const existingWealthElement = document.getElementById("total-wealth");
  // Guard against having multiple wealthElement been displayed if one is already been displayed already
  if (existingWealthElement) {
    return;
  }
  const allWealth = data.reduce(function (accumulator, currentIndex) {
    return accumulator + currentIndex.money;
  }, 0);
  if (allWealth > 0) {
    const wealthElement = document.createElement("div");
    wealthElement.id = "total-wealth";
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>$${formatMoney(
      allWealth
    )}</strong>`;
    main.appendChild(wealthElement);
  }
}

function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  providedData.forEach(function (person) {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${
      `$` + formatMoney(person.money)
    }`;
    main.appendChild(element);
    // console.log(providedData);
    // console.log(data);
  });
}
async function getRandomUser() {
  try {
    const res = await fetch("https://randomuser.me/api");
    const response = await res.json();
    const [userData] = response.results;
    const newUser = {
      name: `${userData.name.first} ${userData.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };
    addData(newUser);
    updateDOM();
    // console.log(data);
  } catch (err) {
    alert(new Error("Please Connect To The Internet"));
  }
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
doubleMoneyBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showOnlyMillionaires);
sortBtn.addEventListener("click", sortWealth);
calculateWealth.addEventListener("click", calculateAllWealth);

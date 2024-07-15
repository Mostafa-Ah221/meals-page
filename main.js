const open = document.querySelector("#open");
const close = document.querySelector("#close");
const sideNavMenu = document.querySelector(".side-nav-menu");
const search = document.querySelector(".search");
const data = document.querySelector(".data");
const searchContainer = document.querySelector("#searchContainer");
const rowData = document.querySelector("#rowData");
const categoriy = document.querySelector("#categoriy");
const area = document.querySelector("#area");
const ingredient = document.querySelector("#ingredient");
const contact = document.querySelector("#contact");
const searchBN = document.querySelectorAll(".searchBN");
const searchByNameInput = document.querySelector("#searchByNameInput");
const searchByFirstLetterInput = document.querySelector("#searchByFirstLetterInput");
const loading=document.querySelector(".inner-loading-screen");
//==============================================(toggel open And close Icons)==============//
function toggleMenu() {
    sideNavMenu.classList.toggle("open");
    if (sideNavMenu.classList.contains("open")) {
        open.classList.add("d-none");
        close.classList.remove("d-none");
    } else {
        open.classList.remove("d-none");
        close.classList.add("d-none");
    }
}

open.addEventListener("click", toggleMenu);
close.addEventListener("click", toggleMenu);

//=================================================(Start clicked links in side bar)===============
search.addEventListener("click", () => {
    searchContainer.classList.add("d-block");
    searchContainer.classList.remove("d-none");
        sideNavMenu.classList.toggle("open");
        close.classList.add("d-none");
         open.classList.remove("d-none");
          data.style.display = "none";
          
    clearInputs();
});

categoriy.addEventListener("click", async () => {
    await ApiCategories();
    sideNavMenu.classList.toggle("open");
    close.classList.add("d-none");
         open.classList.remove("d-none");
    hideSearchSection();
    data.style.display = "block";
});

area.addEventListener("click", async () => {
    await ApiArea();
    sideNavMenu.classList.toggle("open");
    close.classList.add("d-none");
         open.classList.remove("d-none");
    hideSearchSection();
    data.style.display = "block";
});

ingredient.addEventListener("click", async () => {
    await ApiIngredient();
    sideNavMenu.classList.toggle("open");
    close.classList.add("d-none");
         open.classList.remove("d-none");
    hideSearchSection();
    data.style.display = "block";
});

contact.addEventListener("click", () => {
    displayContact();
    sideNavMenu.classList.toggle("open");
    close.classList.add("d-none");
         open.classList.remove("d-none");
         data.style.display = "block";
         hideSearchSection();
});
//=================================================(End clicked links in side bar)===============

// ==================================Event listeners for search input fields (name And letter)========
searchBN.forEach(function (ele) {
    ele.addEventListener("keyup", function () {
        data.style.display = "block";
        var inpVal = this.value;
        if (ele.id === 'searchByNameInput') {
            searchByName(inpVal);
        } else if (ele.id === 'searchByFirstLetterInput') {
            searchByFirstLetter(inpVal);
        }
    });
});

// ========================================Function to hide search section when user click on other links=======
function hideSearchSection() {
    searchContainer.classList.add("d-none");
}

// Function to clear search inputs
function clearInputs() {
    searchByNameInput.value = "";
    searchByFirstLetterInput.value = "";
}

// Function to fetch data from the API
async function fetchApi() {
    loading.style.display = "block";
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    displayData(data.meals);
    loading.style.display = "none";
}

// =========================Functions to fetch data by categories, area, and ingredient
async function ApiCategories() {
     rowData.innerHTML = "";
     loading.style.display = "block";
    // searchContainer.innerHTML = "";
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    displayCategories(data.categories);
    loading.style.display = "none";
}
// ==========================================function link Area==============
async function ApiArea() {
    rowData.innerHTML = "";
    loading.style.display = "block";
    //  searchContainer.innerHTML = "";
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();
    displayArea(data.meals);
    loading.style.display = "none";
}

async function ApiIngredient() {
     rowData.innerHTML = "";
     loading.style.display = "block";
    // searchContainer.innerHTML = "";
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    displayIngredient(data.meals);
    loading.style.display = "none";
}

// ===============================Functions to search by name and first letter================
async function searchByName(name) {
    loading.style.display = "block";
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    displayData(data.meals);
    loading.style.display = "none";
}

async function searchByFirstLetter(letter) {
    loading.style.display = "block";
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();
    displayData(data.meals);
    loading.style.display = "none";
}

//=========================================Function to display meal details====================
async function displayMealDetails(mealID) {
    rowData.innerHTML = "";
    loading.style.display = "block";
    // searchContainer.innerHTML = "";
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        const data = await response.json();
            showMealDetails(data.meals[0]);
       loading.style.display = "none";
}

//===================================== Function to display ingredients====================
async function getingredients(ingredients) {
    loading.style.display = "block";
    rowData.innerHTML = "";
    // searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    let data = await response.json();
// console.log(data);
    displayDetalsIngredient(data.meals);
    loading.style.display = "none";
}

//========================================== Function to display area details===============
async function getArea(area) {
    rowData.innerHTML = "";
    loading.style.display = "block";
    // searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let data = await response.json();
// console.log(data);
    displayDetalsArea(data.meals);
    loading.style.display = "none";
}
    async function getCategoryMeals(category) {
        loading.style.display = "block";
    rowData.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();

    displayData(response.meals);
    loading.style.display = "none";
}

//  ==============================================Function to display meal details==========

function showMealDetails(meal) {
    console.log(meal);
    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim() !== '') {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags ? meal.strTags.split(",") : [];
    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].trim() !== '') {
            tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
        }
    }

    let box = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`;

    rowData.innerHTML = box;
}

// =======================================Function to display data in the UI (defoult data )=============
function displayData(data) {
    rowData.innerHTML = "";
    data.forEach(elem => {
        rowData.innerHTML += `
            <div class="col-md-3">
                <div onclick="displayMealDetails('${elem.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${elem.strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${elem.strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    });
}



    //=============================== Update category display function==============
    function displayCategories(dataCate) {
    
        dataCate.forEach(elem => {
            rowData.innerHTML += `
                <div class="col-md-3">
                    <div onclick="getCategoryMeals('${elem.strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${elem.strCategoryThumb}" alt="" srcset="">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${elem.strCategory}</h3>
                            
                        </div>
                    </div>
                </div>
            `;
        });
    }


// ===================================Function to display area details =================
function displayArea(dataArea) {
        rowData.innerHTML = "";
        dataArea.forEach(elem => {
            rowData.innerHTML += `
                <div class="col-md-3">
                    <div onclick="getArea('${elem.strArea}')" class="rounded-2 text-center area cursor-pointer">
                        <i class="fs-1 bi bi-house-door-fill home"></i>
                        <h3>${elem.strArea}</h3>
                    </div>
                </div>
            `;
        });
    }

// ===============================Function to display ingredients =================
   function displayIngredient(dataingred) {
        rowData.innerHTML = "";
        dataingred.forEach(elem => {
            const description = elem.strDescription ? elem.strDescription.split(" ").slice(0, 20).join(" ") : "No description available";
            rowData.innerHTML += `
                <div class="col-md-3">
                    <div onclick="getingredients('${elem.strIngredient}')"
                         class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${elem.strIngredient}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            `;
        });
    }
// =====================================Function to display ingredient details in the UI
function displayDetalsIngredient(dataingred) {
    rowData.innerHTML = "";
    dataingred.forEach(elem => {
        if (elem.idMeal) {
            rowData.innerHTML += `
                <div class="col-md-3">
                    <div onclick="displayMealDetails('${elem.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${elem.strMealThumb}" alt="" srcset="">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${elem.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `;
        }
    });
}

// ===============================Function to display area details=======================
function displayDetalsArea(area) {
    rowData.innerHTML = "";
    area.forEach(elem => {
        if (elem.idMeal) {
            rowData.innerHTML += `
                <div class="col-md-3">
                    <div onclick="displayMealDetails('${elem.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${elem.strMealThumb}" alt="" srcset="">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${elem.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    fetchApi();
    
});

//====================================== function to dispaly contact =============================
function displayContact() {
    rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger m-0 w-100 d-none">Name Is Not Available</div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" type="email" class="form-control" placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger m-0 w-100 d-none">Name Is Not Available *example@yyy.zzz</div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" type="text" class="form-control" placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger m-0 w-100 p-1 d-none">Enter valid Phone Number</div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" type="number" class="form-control" placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100  m-0 d-none">Enter valid age</div>
                </div>
                <div class="col-md-6">
                    <input id="passwordInput" type="password" class="form-control" placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 m-0 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
                </div>
                <div class="col-md-6">
                    <input id="repasswordInput" type="password" class="form-control" placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100  m-0 d-none">Enter valid repassword</div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div>`;

    let submitBtn = document.getElementById("submitBtn");

    let nameInput = document.getElementById("nameInput");
    let emailInput = document.getElementById("emailInput");
    let phoneInput = document.getElementById("phoneInput");
    let ageInput = document.getElementById("ageInput");
    let passwordInput = document.getElementById("passwordInput");
    let repasswordInput = document.getElementById("repasswordInput");

    nameInput.addEventListener("keyup", inputsValidation);
    emailInput.addEventListener("keyup", inputsValidation);
    phoneInput.addEventListener("keyup", inputsValidation);
    ageInput.addEventListener("keyup", inputsValidation);
    passwordInput.addEventListener("keyup", inputsValidation);
    repasswordInput.addEventListener("keyup", inputsValidation);

    nameInput.addEventListener("focus", () => { nameInputTouched = true; });
    emailInput.addEventListener("focus", () => { emailInputTouched = true; });
    phoneInput.addEventListener("focus", () => { phoneInputTouched = true; });
    ageInput.addEventListener("focus", () => { ageInputTouched = true; });
    passwordInput.addEventListener("focus", () => { passwordInputTouched = true; });
    repasswordInput.addEventListener("focus", () => { repasswordInputTouched = true; });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block");
        }
    }
    if (emailInputTouched) {
        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");
        }
    }
    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
        }
    }
    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block");
        }
    }
    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
        }
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

function nameValidation() {
    return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value);
}

function phoneValidation() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value);
}

function ageValidation() {
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value);
}

function passwordValidation() {
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value);
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value === document.getElementById("passwordInput").value;
}

// / <reference path="../typings/globals/jquery/index.d.ts" />

let searchByName = document.getElementById('searchByName');
let searchByFirstCar = document.getElementById('searchByFirstChar');

let x = $('nav').outerWidth();
$('#openNav').click(() => {
    if ($('.nav').css('left') == `${-x}px`) {
        $('.nav').animate({ left: '0' }, 500)
        $('#openNav i').addClass(`fa-times`)
        $('nav ul li').eq(0).animate({ opacity: '1', paddingTop: '0px' }, 1000)
        $('nav ul li').eq(1).animate({ opacity: '1', paddingTop: '0px' }, 1000)
        $('nav ul li').eq(2).animate({ opacity: '1', paddingTop: '0px' }, 1000)
        $('nav ul li').eq(3).animate({ opacity: '1', paddingTop: '0px' }, 1000)
        $('nav ul li').eq(4).animate({ opacity: '1', paddingTop: '0px' }, 1000)
    }
    else {
        $('.nav').animate({ left: `${-x}px` })
        $('#openNav i').removeClass(`fa-times`)
        $('nav ul li').eq(0).animate({ opacity: '0', paddingTop: '700px' }, 700)
        $('nav ul li').eq(1).animate({ opacity: '0', paddingTop: '700px' }, 700)
        $('nav ul li').eq(2).animate({ opacity: '0', paddingTop: '700px' }, 700)
        $('nav ul li').eq(3).animate({ opacity: '0', paddingTop: '700px' }, 700)
        $('nav ul li').eq(4).animate({ opacity: '0', paddingTop: '700px' }, 700)
    }
})

let final2;
async function getMeals() {
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let finalResult = await apiResponse.json()
    final2 = finalResult.meals;
    displayMeal()
}
getMeals()



function displayMeal() {
    let box = ``;
    for (let i = 0; i < final2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMeal('${final2[i].idMeal}')" class="item shadow rounded position-relative">
            <img src=${final2[i].strMealThumb} class="w-100 " alt="">
            <div class="layer">
                <h2 class="ps-2">${final2[i].strMeal}</h2>
            </div>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}


async function getMeal(id) {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let Result = await xml.json();
    console.log(Result);
    displayMealDetails(Result.meals[0])
}
function displayMealDetails(s) {

    let x = '';
    for (let i = 0; i <= 20; i++) {
        if (s[`strIngredient${i}`]) {
            x += `<li class="my-3 mx-1 p-1 component rounded">${s[`strMeasure${i}`]} ${s[`strIngredient${i}`]}</li>`
        }
    }
    let tags = s.strTags;
    if (tags != null) {
        tags = s.strTags.split(',');
        var y = '';
        for (let i = 0; i < tags.length; i++) {
            y += `<li class="tags-style my-3 mx-1 p-1 rounded">${tags[i]}</li>`

        }
    }


    let box = `
    <div class="col-md-4 text-center pt-3">
                    <img src="${s.strMealThumb}" class="w-100" alt="">
                    <h1 class="text-white">${s.strMeal}</h1>
                </div>
                <div class="col-md-8 text-white">
                    <h2>Instructions</h2>
                    <p>${s.strInstructions}</p>
                        <p><b class="fw-bolder">Area :</b> ${s.strArea}</p>
                        <p><b class="fw-bolder">Category  :</b> ${s.strCategory}</p>
                        <h3>Recipes :</h3>
                        <ul class="d-flex flex-wrap list-unstyled" id="components">
                        
                        </ul>
                        <h3>Tags :</h3>
                        <ul class="d-flex list-unstyled" id="tags"></ul>
                        <a href="${s.strSource}" class="btn btn-outline-success text-white" target="_blank">Source</a>
                        <a href="${s.strYoutube}" class="btn btn-outline-danger text-white" target="_blank">Youtub</a>

                </div>
    `;
    $('#rowData').html(box)
    $('#components').html(x)
    $('#tags').html(y)
}




$(document).ready(() => {
    $('.loading').fadeOut(1000, () => {
        $('.loading').remove()
    })
    $('body').css('overflow', 'auto')
})
let result2;
async function getMealByName(name) {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let result = await xml.json();
    result2 = result.meals
    console.log(result2);
    displayMealByName()
}
searchByName.addEventListener('keyup', () => {
    console.log(searchByName.value);
    getMealByName(searchByName.value);
})

function displayMealByName() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMeal('${result2[i].idMeal}')" class="item shadow rounded position-relative">
            <img src=${result2[i].strMealThumb} class="w-100 " alt="">
            <div class="layer">
                <h2 class="ps-2">${result2[i].strMeal}</h2>
            </div>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}

async function getMealByFirstName(char) {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`)
    let result = await xml.json();
    result2 = result.meals
    console.log(result2);
    displayMealByFirstName()
}
searchByFirstCar.addEventListener('keyup', () => {

    if (searchByFirstCar.value.length > 1) {
        searchByFirstCar.value.slice(0, 1);
    }
    console.log(searchByFirstCar.value.slice(0, 1));
    $("#searchByFirstChar").val(searchByFirstCar.value.slice(0, 1))

    getMealByFirstName(searchByFirstCar.value);
})
$('#search').click(() => {
    $('#search-container').addClass('d-block')
    $('#openNav i').removeClass('fa-times')
    $('#rowData').html(` `);
    $('.contact').removeClass('d-block')
    $('.nav').animate({ left: `${-x}px` }, 500)

})
function displayMealByFirstName() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMeal('${result2[i].idMeal}')" class="item shadow rounded position-relative">
            <img src=${result2[i].strMealThumb} class="w-100 " alt="">
            <div class="layer">
                <h2 class="ps-2">${result2[i].strMeal}</h2>
            </div>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}

$('#categories').click(() => {
    $('#search-container').removeClass('d-block')
    $('#openNav i').removeClass('fa-times')
    $('#rowData').html(` `);
    $('.nav').animate({ left: `${-x}px` }, 500)
    $('.contact').removeClass('d-block')
    getMealByCategory()
})


async function getMealByCategory() {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let result = await xml.json();
    result2 = result.categories
    console.log(result2);
    displayMealByCategory()
}
function displayMealByCategory() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 text-center ">
        <div onclick="getMealByFilterCategory('${result2[i].strCategory}')" class="item shadow rounded position-relative">
            <img src=${result2[i].strCategoryThumb} class="w-100 " alt="">
            <div class="layer ">
                <h2 class="p-2">${result2[i].strCategory}</h2>
                <p>${result2[i].strCategoryDescription.split(' ').slice(0, 12).join(' ')}</p>
            </div>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}

async function getMealByFilterCategory(cat) {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    let result = await xml.json();
    result2 = result.meals
    console.log(result2);
    displayMealByFilterCategory()
}

function displayMealByFilterCategory() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMeal('${result2[i].idMeal}')" class="item shadow rounded position-relative">
            <img src=${result2[i].strMealThumb} class="w-100 " alt="">
            <div class="layer">
                <h2 class="ps-2">${result2[i].strMeal}</h2>
            </div>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}

$('#area').click(() => {
    $('#rowData').html(` `);
    $('.nav').animate({ left: `${-x}px` }, 500)
    $('#openNav i').removeClass('fa-times')
    $('#search-container').removeClass('d-block')
    $('.contact').removeClass('d-block')
    getArea()
})

async function getArea() {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let result = await xml.json();
    result2 = result.meals
    console.log(result2);
    displayArea()
}
function displayArea() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 text-white text-center ">
        <div onclick="getFilterArea('${result2[i].strArea}')" class="item shadow rounded position-relative">
        <i class="fa-solid fa-city fa-3x text-danger"></i>
                <h2 class="p-2 fw-light">${result2[i].strArea}</h2>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}
async function getFilterArea(list) {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${list}`)
    let result = await xml.json();
    result2 = result.meals
    console.log(result2);
    displayFilterArea()
}
function displayFilterArea() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMeal('${result2[i].idMeal}')" class="item shadow rounded position-relative">
            <img src=${result2[i].strMealThumb} class="w-100 " alt="">
            <div class="layer">
                <h2 class="ps-2">${result2[i].strMeal}</h2>
            </div>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}



$('#ingredients').click(() => {
    $('#rowData').html(` `);
    $('.nav').animate({ left: `${-x}px` }, 500)
    $('#openNav i').removeClass('fa-times')
    $('#search-container').removeClass('d-block')
    $('.contact').removeClass('d-block')
    getIngredients()
})

async function getIngredients() {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let result = await xml.json();
    result2 = result.meals
    displayIngredients()
}
function displayIngredients() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        if (result2[i].strDescription == null) {
            break
        } else {


            box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getFilterIngredients('${result2[i].strIngredient}')" class="text-center item item-area shadow rounded">
            <i id="ingredientsIcon" class="fa-solid fa-bowl-food fa-3x text-success""></i>
            <h3 class="text-white fw-light">${result2[i].strIngredient}</h3>
            <p class="text-white fw-light">${result2[i].strDescription.split(" ").splice(0, 15).join(" ")}</p>
        </div>
        </div>`
        }
        $('#rowData').html(box);
    }
}

async function getFilterIngredients(ingred) {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`)
    let result = await xml.json();
    result2 = result.meals
    console.log(result2);
    displayFilterIngredients()
}
function displayFilterIngredients() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMeal('${result2[i].idMeal}')" class="item shadow rounded position-relative">
            <img src=${result2[i].strMealThumb} class="w-100 " alt="">
            <div class="layer">
                <h2 class="ps-2">${result2[i].strMeal}</h2>
            </div>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}




$('#contact').click(() => {
    $('#rowData').html(` `);
    $('.nav').animate({ left: `${-x}px` }, 500)
    $('#openNav i').removeClass('fa-times')
    $('#search-container').removeClass('d-block')
    $('.contact').addClass('d-block')
})




let userName = document.getElementById('name'),
    userEmail = document.getElementById('email'),
    userPhone = document.getElementById('phone'),
    userAge = document.getElementById('age'),
    userPass = document.getElementById('userPassword'),
    rePass = document.getElementById('userRePassword'),
    btn = document.getElementById('btn');
let userPassword = document.getElementById('userPassword')
let userRePassword = document.getElementById('userRePassword')
function validation() {
    if (userNameValidation()) {
        $('#name').addClass('is-valid')
        $('#name').removeClass('is-invalid')
        $('.alertName').removeClass('d-block')
    } else if (userNameValidation() == false) {
        $('#name').addClass('is-invalid')
        $('#name').removeClass('is-valid')
        $('.alertName').addClass('d-block')
    }
    if (userEmailValidation()) {
        $('#email').addClass('is-valid')
        $('#email').removeClass('is-invalid')
        $('.alertEmail').removeClass('d-block')
    } else if (userEmailValidation() == false) {
        $('#email').addClass('is-invalid')
        $('#email').removeClass('is-valid')
        $('.alertEmail').addClass('d-block')
    }
    if (userPhoneValidation()) {
        $('#phone').addClass('is-valid')
        $('#phone').removeClass('is-invalid')
        $('.alertPhone').removeClass('d-block')
    } else if (userPhoneValidation() == false) {
        $('#phone').addClass('is-invalid')
        $('#phone').removeClass('is-valid')
        $('.alertPhone').addClass('d-block')
    }
    if (userAgeValidation()) {
        $('#age').addClass('is-valid')
        $('#age').removeClass('is-invalid')
        $('.alertAge').removeClass('d-block')
    } else if (userAgeValidation() == false) {
        $('#age').addClass('is-invalid')
        $('#age').removeClass('is-valid')
        $('.alertAge').addClass('d-block')
    }
    if (userPasswordValidation()) {
        $('#userPassword').addClass('is-valid')
        $('#userPassword').removeClass('is-invalid')
        $('.alertPassword').removeClass('d-block')
    }
    else if (!userPasswordValidation()) {
        $('#userPassword').addClass('is-invalid')
        $('#userPassword').removeClass('is-valid')
        $('.alertPassword').addClass('d-block')
    }
    if (userRePasswordValidation()) {
        $('#userRePassword').addClass('is-valid')
        $('#userRePassword').removeClass('is-invalid')
        $('.alertRePassword').removeClass('d-block')
    } else if (userRePasswordValidation() == false) {
        $('#userRePassword').addClass('is-invalid')
        $('#userRePassword').removeClass('is-valid')
        $('.alertRePassword').addClass('d-block')
    }
if (userNameValidation()&&userEmailValidation()&&userPhoneValidation()&&userAgeValidation()&&userPasswordValidation()&&userRePasswordValidation()) {
        $('#btn').removeAttr('disabled')
    } else {
        btn.setAttribute('disabled','true')
    }
}
userName.addEventListener('keyup', validation)
function userNameValidation() {
    return /^[a-z]{1,}$/ig.test($('#name').val())
}
userEmail.addEventListener('keyup', validation)
function userEmailValidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#email').val())
}

userPhone.addEventListener('keyup', validation)
function userPhoneValidation() {
    return /^(002)?(01)[0125]{1}[0-9]{8}$/.test($('#phone').val())
}

userAge.addEventListener('keyup', validation)
function userAgeValidation() {
    return /(^[1-9]{1}[0-9]{1}|100)$/.test($('#age').val())
}
userPass.addEventListener('keyup', validation)
function userPasswordValidation() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($('#userPassword').val())
}
userRePassword.addEventListener('keyup', () => {
    validation()

})
function userRePasswordValidation() {
    return userPassword.value == userRePassword.value
}

import { displayMealDetails } from "./details.js";

export function searchInputs() {
  let inputs = `<div class="d-flex my-5 container">
      <input type="text" class="form-control w-50 mx-3 bg-transparent text-white searchByName"
          placeholder="Search by Name">
      <input type="text" class="form-control w-50 mx-3 bg-transparent text-white searchByFirstLetter"
          maxlength="1" placeholder="Search by First Letter">
  </div>`;
  $(".searchInputs").html(inputs);
  $(".searchInputs").css("display", "block");
  $(".results").css("display", "none");

  $(".searchByName").on("keyup", function (e) {
    if (this.value.length >= 1) {
      searchByName(this.value);
      $(".results").css("display", "block");
    }
  });
  $(".searchByFirstLetter").on("keyup", function (e) {
    if (this.value.length >= 1) {
      searchByFirstLetter(this.value);
      $(".results").css("display", "block");
    }
  });
}

async function getFoodDataByFirstLetter(foodLetter) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${foodLetter}`;
  const res = await fetch(URL);
  if (res.status == 200 && res.ok) {
    const data = await res.json();
    return data;
  }
}

async function getFoodData(foodName) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
  const res = await fetch(URL);
  if (res.status == 200 && res.ok) {
    const data = await res.json();
    return data;
  }
}

export function display(data) {
  let cartona = "";
  $.each(data, function (indexInArray, valueOfElement) {
    cartona += `<div class="col-lg-3 col-md-4 col-sm-6">
      <div class="mealImage position-relative overflow-hidden my-3" id="${valueOfElement.idMeal}">
          <img src="${valueOfElement.strMealThumb}" alt="meal image" class="w-100 rounded-2">
          <div class="mealOverlay position-absolute bg-white bg-opacity-75 rounded-2 d-flex align-content-center flex-wrap p-3" id="${valueOfElement.idMeal}"><h3 class="text-black">${valueOfElement.strMeal}</h3></div>
      </div>
  </div>`;
  });
  $(".content .food .row").html(cartona);
  getDetails();
}

export function searchByName(foodName) {
  getFoodData(foodName).then((data) => {
    if (data.meals != null) {
      $(".innerLoadingScreen").fadeIn(100);
      display(data.meals.slice(0, 20));
      $(".innerLoadingScreen").fadeOut(200);
    } else {
      display([]);
    }
  });
}

export function searchByFirstLetter(firstLetter) {
  if (firstLetter.length == 0) {
    searchByName("");
  } else {
    getFoodDataByFirstLetter(firstLetter).then((data) => {
      if (data) {
        $(".innerLoadingScreen").fadeIn(100);
        display(data.meals.slice(0, 20));
        $(".innerLoadingScreen").fadeOut(200);
      }
    });
  }
  getDetails();
}

export let mealsPrev = "";
function getDetails() {
  $.each($(".content .food .mealImage"), function () {
    $(this).click(() => {
      // console.log($(".food").html());
      mealsPrev = $(".food").html();
      $(".foodDetails").removeClass("d-none");
      $(".food").addClass("d-none");
      $(".searchInputs").css("display", "none");
      displayMealDetails(this.id);
    });
  });
}

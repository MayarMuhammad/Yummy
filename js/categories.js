import { display } from "./search.js";

async function getCategories() {
  const URL = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  const res = await fetch(URL);
  if (res.status == 200 && res.ok) {
    const data = await res.json();
    return data;
  }
}

async function getCategory(category) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const res = await fetch(URL);
  if (res.status == 200 && res.ok) {
    const data = await res.json();
    return data;
  }
}

export function getCategoriesData() {
  $(".innerLoadingScreen").fadeIn(300);
  getCategories().then((data) => {
    // console.log(data);
    let cartona = "";
    $.each(data.categories, function (indexInArray, valueOfElement) {
      cartona += `<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div class="mealImage position-relative overflow-hidden my-4" id="${
        valueOfElement.strCategory
      }">
          <img src="${
            valueOfElement.strCategoryThumb
          }" alt="meal image" class="w-100 rounded-2">
          <div class="mealOverlay position-absolute bg-white bg-opacity-75 rounded-2 d-flex align-content-center flex-wrap text-black text-center p-2">
              <h3 class="w-100">${valueOfElement.strCategory}</h3>
              <p>${valueOfElement.strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
          </div>
      </div>
  </div>`;
    });
    $(".content .food .row").html(cartona);
    displayCategory();
    $(".innerLoadingScreen").fadeOut(300);
  });
}

function getCategoryData(category) {
  $(".innerLoadingScreen").fadeIn(300);
  getCategory(category).then((data) => {
    display(data.meals.slice(0, 20));
    $(".innerLoadingScreen").fadeOut(300);
  });
}

function displayCategory() {
  $.each($(".content .food .mealImage"), function () {
    $(this).click(() => {
      getCategoryData(this.id);
    });
  });
}

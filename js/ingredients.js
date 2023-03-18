import { display } from "./search.js";

async function getIngredients() {
  const URL = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
  const res = await fetch(URL);
  if (res.status == 200 && res.ok) {
    const data = await res.json();
    return data;
  }
}

async function getIngredient(ingredient) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const res = await fetch(URL);
  if (res.status == 200 && res.ok) {
    const data = await res.json();
    return data;
  }
}

export function getIngredientsData() {
  $(".innerLoadingScreen").fadeIn(100);
  getIngredients().then((data) => {
    // console.log(data);
    let cartona = "";
    let ingredients = [];
    for (let i = 0; i < data.meals.length; i++) {
      if (data.meals[i].strDescription) {
        ingredients.push(data.meals[i]);
      }
    }
    $.each(ingredients.slice(0, 20), function (indexInArray, valueOfElement) {
      cartona += `<div class="col-lg-3 col-md-4 col-sm-6">
        <div class="areaDisplay text-center my-2" id="${
          valueOfElement.strIngredient
        }">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <div class="p-2">
                <h3 class="w-100">${valueOfElement.strIngredient}</h3>
                <p>${valueOfElement.strDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
            </div>
        </div>
    </div>`;
    });
    $(".content .food .row").html(cartona);
    displayIngredient();
    $(".innerLoadingScreen").fadeOut(200);
  });
}

function getIngredientData(area) {
  $(".innerLoadingScreen").fadeIn(100);
  getIngredient(area).then((data) => {
    display(data.meals.slice(0, 20));
    $(".innerLoadingScreen").fadeOut(200);
  });
}

function displayIngredient() {
  $.each($(".areaDisplay"), function () {
    $(this).click(() => {
      getIngredientData(this.id);
    });
  });
}

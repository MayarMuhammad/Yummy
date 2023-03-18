import { searchPrev } from "./app.js";
import { searchInputs } from "./search.js";

async function getMealDetails(mealID) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  const res = await fetch(URL);
  if (res.status == 200 && res.ok) {
    const data = await res.json();
    return data;
  }
}

export function displayMealDetails(mealID) {
  $(".innerLoadingScreen").fadeIn(300);
  getMealDetails(mealID).then((data) => {
    let meal = data.meals[0];
    let ingredients = "";
    for (let i = 0; i < 20; i++) {
      if (meal[`strIngredient${i + 1}`]) {
        ingredients += `<li class="alert alert-info m-2 p-2">${
          meal[`strMeasure${i + 1}`] + " " + meal[`strIngredient${i + 1}`]
        }</li>`;
      }
    }
    let tags = "";
    if (meal.strTags) {
      let strTags = meal.strTags.split(",");
      //   console.log(strTags);
      for (let i = 0; i < strTags.length; i++) {
        // console.log(strTags[i]);
        tags += `<li class="alert alert-danger m-2 p-2">${strTags[i]}</li>`;
      }
    }

    let mealDetails = `<div class="col-lg-4"><div><img src="${meal.strMealThumb}" alt="meal image" class="w-100 rounded-2"><label class="mb-2">${meal.strMeal}</label></div></div>
        <div class="text text-white col-lg-8">
            <label class="mb-2">Instructions</label>
            <p class="mb-3">${meal.strInstructions}</p>
            <p class="mb-3"><label>Area:</label><span class=" ms-2 px-2 py-1">${meal.strArea}</span></p>
            <p class="mb-3"><label>Category:</label><span class=" ms-2 px-2 py-1">${meal.strCategory}</span></p>
            <label class="d-block mb-2">Recipes:</label>
            <ul class="list-unstyled d-flex flex-wrap">${ingredients}</ul>
            <label class="d-block mb-3">Tags:</label>
            <ul class="list-unstyled d-flex flex-wrap">${tags}</ul>
            <a type="button" class="btn btn-success text-white me-2" target="_blank" href="${meal.strSource}">Source</a>
            <a type="button" class="btn btn-danger text-white" target="_blank" href="${meal.strYoutube}">Youtube</a>
        </div>`;
    $(".foodDetails .details .row").html(mealDetails);
    $(".innerLoadingScreen").fadeOut(300);
    closeBtn();
  });
}

function closeBtn() {
  $(".btn-close")
    .unbind()
    .click(function (e) {
      if (searchPrev) {
        $(".innerLoadingScreen").fadeIn(300);
        searchInputs();
        $(".food").show(300);
        $(".foodDetails").hide(300);
        $(".innerLoadingScreen").fadeOut(300);
      } else {
        $(".innerLoadingScreen").fadeIn(300);
        $(".food").show(300);
        $(".foodDetails").hide(300);
        $(".innerLoadingScreen").fadeOut(300);
      }
    });
}

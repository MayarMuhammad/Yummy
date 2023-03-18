import { display } from "./search.js";

async function getAreas() {
  const URL = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
  const res = await fetch(URL);
  if (res.status == 200 && res.ok) {
    const data = await res.json();
    return data;
  }
}

async function getArea(area) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const res = await fetch(URL);
  if (res.status == 200 && res.ok) {
    const data = await res.json();
    return data;
  }
}

export function getAreasData() {
  $(".innerLoadingScreen").fadeIn(300);
  getAreas().then((data) => {
    // console.log(data);
    let cartona = "";
    $.each(data.meals, function (indexInArray, valueOfElement) {
      cartona += `<div class="col-lg-3 col-md-4 col-sm-6">
      <div class="areaDisplay text-center my-2" id="${valueOfElement.strArea}">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <div class="p-2">
              <h3 class="w-100">${valueOfElement.strArea}</h3>
          </div>
      </div>
  </div>`;
    });
    $(".content .food .row").html(cartona);
    displayArea();
    $(".innerLoadingScreen").fadeOut(300);
  });
}

function getAreaData(area) {
  $(".innerLoadingScreen").fadeIn(300);
  getArea(area).then((data) => {
    display(data.meals.slice(0,20));
    $(".innerLoadingScreen").fadeOut(300);
  });
}

function displayArea() {
  $.each($(".areaDisplay"), function () {
    $(this).click(() => {
      getAreaData(this.id);
    });
  });
}

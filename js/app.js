import { searchByFirstLetter, searchByName, searchInputs } from "./search.js";
import { getCategoriesData } from "./categories.js";
import { getAreasData } from "./area.js";
import { getIngredientsData } from "./ingredients.js";
import { showContacts } from "./contact.js";

export let searchPrev = false;

$(document).ready(function () {
  searchByName("");
  $(".loadingScreen").fadeOut(1000, function () {
    $("body").css("overflow", "visible");

    $(".openClose").click(function (e) {
      openCloseNav();
    });

    function openCloseNav() {
      $(".openClose").find("img").toggle();
      $(".navBarContent").animate({
        width: "toggle",
      });
      if (Math.round($(".navBarContent").width()) == "255") {
        $.each($(".tabs ul li"), function () {
          $(this).animate({
            top: 200,
          });
        });
        $(".navBarShow").animate({
          marginLeft: "0px",
        });
      } else {
        $.each($(".tabs ul li"), function (indexInArray, valueOfElement) {
          $(this).animate(
            {
              top: 0,
            },
            (indexInArray + 5) * 100
          );
        });
        $(".navBarShow").animate({
          marginLeft: "255px",
        });
      }
    }

    $.each($(".tabs ul li a"), function () {
      $(this).on("click", function () {
        openCloseNav();
        $(".food").removeClass("d-none");
        $(".foodDetails").addClass("d-none");
        if ($(this).not("#Search")) {
          $(".searchInputs").css("display", "none");
          $(".results").css("display", "block");
        }
        if (this.id == "Search") {
          searchInputs();
          searchPrev = true;
          // console.log(searchPrev);
        } else if (this.id == "Categories") {
          getCategoriesData();
          searchPrev = false;
        } else if (this.id == "Area") {
          getAreasData();
          searchPrev = false;
        } else if (this.id == "Ingredients") {
          getIngredientsData();
          searchPrev = false;
        } else if (this.id == "Contact") {
          showContacts();
          searchPrev = false;
        } else {
          searchByName("");
          searchPrev = false;
        }
      });
    });
  });
});

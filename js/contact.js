export function showContacts() {
  let contacts = ` <div class="checkForm">
  <div class="vh-100 d-flex justify-content-center align-content-center flex-wrap">
      <div class="row">
          <div class="col-md-6">
              <div class="input m-2"><input type="text" class="form-control" id="name"
                      placeholder="Enter Your Name">
                  <label for="name" class="w-100 text-center alert alert-danger nameAlert mt-2 p-2">Name must be 2
                      characters and more!
                      <ul class="list-unstyled m-0">
                          <li>Special Characters or Numbers are not allowed!</li>
                      </ul>
                  </label>
              </div>
          </div>
          <div class="col-md-6">
              <div class="input m-2"><input type="email" class="form-control" id="email"
                      placeholder="Enter your Email">
                  <label for="email" class="emailAlert w-100 text-center alert alert-danger mt-2 p-2">Enter a
                      valid
                      Email
                      <ul class="list-unstyled m-0">
                          <li>example@example.domain</li>
                      </ul>
                  </label>
              </div>
          </div>
          <div class="col-md-6">
              <div class="input m-2"><input type="" class="form-control mobile" placeholder="Enter your Phone"
                      id="mobile">
                  <label for="mobile" class="mobileAlert w-100 text-center alert alert-danger mt-2 p-2">Enter
                      Valid Phone Number</label>
              </div>
          </div>
          <div class="col-md-6">
              <div class="input m-2"><input type="number" class="form-control" id="age"
                      placeholder="Enter your Age">
                  <label for="age" class="ageAlert w-100 text-center alert alert-danger mt-2 p-2">Enter age from 1
                      to
                      200</label>
              </div>
          </div>
          <div class="col-md-6">
              <div class="input-group m-2">
                  <input type="password" class="form-control" placeholder="Enter your Password" id="password">
                  <span class="input-group-text justify-content-center p-2 me-3" id="addon-wrapping"><i
                          class="fa-solid fa-eye-slash showHidePassword"></i></span>
              </div>
              <label for="password" class="passwordAlert alert alert-danger mt-2 p-2 mx-2">
                  <h6>Password must contain the following:</h6>
                  <ul class="list-unstyled">
                      <li id="letter" class="invalid">At least <b>one lowercase</b> letter</li>
                      <li id="capital" class="invalid">At least <b>one capital (uppercase)</b> letter</li>
                      <li id="number" class="invalid">At least <b>one number</b></li>
                      <li id="length" class="invalid">At least <b>8 characters</b></li>
                      <li id="specialCharacters" class="invalid">At least <b>one special character</b></li>
                  </ul>
              </label>
          </div>
          <div class="col-md-6">
              <div class="input-group m-2">
                  <input type="password" class="form-control" placeholder="Re-Enter your Password"
                      id="confirmPassword">
                  <span class="input-group-text justify-content-center p-2 me-3" id="addon-wrapping"><i
                          class="fa-solid fa-eye-slash showPassword"></i></span>
              </div>
              <label for="confirmPassword"
                  class="confirmPasswordAlert text-center alert alert-danger mt-2 p-2 mx-2">Password doesn't
                  match</label>
          </div>
          <div class="col-12 text-center">
              <button type="button" class="btn btn-outline-danger m-2 submitBtn" disabled>Submit</button>
          </div>
      </div>
  </div>
</div>`;

  $(".content .food .row").html(contacts);
  validations();
}
function validations() {
  let name = false;
  let email = false;
  let phone = false;
  let age = false;
  let password = false;
  let confirmPassword = false;

  $("#name").keyup(function (e) {
    name = nameValidation();
    // console.log(name);
  });
  $("#email").keyup(function (e) {
    email = emailValidation();
    // console.log(email);
  });
  $("#mobile").keyup(function (e) {
    phone = phoneValidation();
    // console.log(phone);
  });
  $("#age").keyup(function (e) {
    age = ageValidation();
    // console.log(age);
  });
  $("#password").keyup(function (e) {
    password = passwordValidation();
    // console.log(password);
  });
  $("#confirmPassword").keyup(function (e) {
    confirmPassword = checkPasswordMatch();
    // console.log(confirmPassword);
  });

  $(".checkForm").keyup(function () {
    // console.log(name, email, phone, age, password, confirmPassword);
    if (name && email && phone && age && password && confirmPassword) {
      // console.log("valid");
      $(".submitBtn").prop("disabled", false);
      $(".submitBtn").removeClass("btn-outline-danger");
      $(".submitBtn").addClass("btn-danger");
    } else {
      // console.log("notvalid");
      $(".submitBtn").prop("disabled", true);
    }
  });
  showHide();
}

function showHide() {
  $(".showHidePassword").click(function () {
    if ($("input#password").attr("type") === "password") {
      $("input#password").attr("type", "text");
      $(".showHidePassword").removeClass("fa-eye-slash");
      $(".showHidePassword").addClass("fa-eye");
    } else {
      $("input#password").attr("type", "password");
      $(".showHidePassword").removeClass("fa-eye");
      $(".showHidePassword").addClass("fa-eye-slash");
    }
  });

  $(".showPassword").click(function () {
    if ($("input#confirmPassword").attr("type") === "password") {
      $("input#confirmPassword").attr("type", "text");
      $(".showPassword").removeClass("fa-eye-slash");
      $(".showPassword").addClass("fa-eye");
    } else {
      $("input#confirmPassword").attr("type", "password");
      $(".showPassword").removeClass("fa-eye");
      $(".showPassword").addClass("fa-eye-slash");
    }
  });
}

function nameValidation() {
  let valid = false;
  let nameRegex = /^[a-zA-Z ]{2,}$/i;
  if (nameRegex.test($("#name").val())) {
    $(".nameAlert").css("display", "none");
    valid = true;
  } else {
    $(".nameAlert").css("display", "block");
  }
  return valid;
}

function emailValidation() {
  let valid = false;
  var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
  if (emailRegex.test($("#email").val())) {
    $(".emailAlert").css("display", "none");
    valid = true;
  } else {
    $(".emailAlert").css("display", "block");
  }
  return valid;
}

function phoneValidation() {
  let valid = false;
  var mobileRegex = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/gi;
  if (mobileRegex.test($("#mobile").val())) {
    $(".mobileAlert").css("display", "none");
    valid = true;
  } else {
    $(".mobileAlert").css("display", "block");
  }
  return valid;
}

function ageValidation() {
  let valid = false;
  var ageRegex = /^(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|200)$/gi;
  if (ageRegex.test($("#age").val())) {
    $(".ageAlert").css("display", "none");
    valid = true;
  } else {
    $(".ageAlert").css("display", "block");
  }
  return valid;
}

function passwordValidation() {
  let valid = false;
  var count = 0;
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if ($("#password").val().match(lowerCaseLetters)) {
    $("#letter").removeClass("invalid");
    $("#letter").addClass("valid");
    count++;
  } else {
    $("#letter").removeClass("valid");
    $("#letter").addClass("invalid");
  }
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if ($("#password").val().match(upperCaseLetters)) {
    $("#capital").removeClass("invalid");
    $("#capital").addClass("valid");
    count++;
  } else {
    $("#capital").removeClass("valid");
    $("#capital").addClass("invalid");
  }
  // Validate numbers
  var numbers = /[0-9]/g;
  if ($("#password").val().match(numbers)) {
    $("#number").removeClass("invalid");
    $("#number").addClass("valid");
    count++;
  } else {
    $("#number").removeClass("valid");
    $("#number").addClass("invalid");
  }

  // Validate special Characters
  var specialChar = /[#?!@$%^&*-]/g;
  if ($("#password").val().match(specialChar)) {
    $("#specialCharacters").removeClass("invalid");
    $("#specialCharacters").addClass("valid");
    count++;
  } else {
    $("#specialCharacters").removeClass("valid");
    $("#specialCharacters").addClass("invalid");
  }

  // Validate length
  if ($("#password").val().length >= 8) {
    $("#length").removeClass("invalid");
    $("#length").addClass("valid");
    count++;
  } else {
    $("#length").removeClass("valid");
    $("#length").addClass("invalid");
  }
  if (count == 5) {
    $(".passwordAlert").css("display", "none");
  }
  var passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (passwordRegex.test($("#password").val())) {
    $(".passwordAlert").css("display", "none");
    valid = true;
  } else {
    $(".passwordAlert").css("display", "block");
  }
  return valid;
}

function checkPasswordMatch() {
  let valid = false;
  let password = $("input#password").val();
  let confirmPassword = $("input#confirmPassword").val();
  if (password != confirmPassword) {
    $(".confirmPasswordAlert").css("display", "block");
  } else {
    $(".confirmPasswordAlert").css("display", "none");
    valid = true;
  }
  return valid;
}

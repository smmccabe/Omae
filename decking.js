function complexFormActivate() {
  var form = complexforms[$(this).parent().attr("id")];

  //if the complex form has already been activated, then do this stuff
  if ($(this).hasClass("active")) {
    //remove the active class, and change the + to a -
    deactivate($(this));
    //the form is turned off
    form["formact"] = false;
    //return complex form points to buy more forms
    forms++;
  } else { //If the form isn't on, then its off, so do this stuff
    //do you have complex form points to buy more forms?
    if (forms > 0) {
      //Then add the active class and replace the - with a +
      activate($(this));
      //turn off complex form
      form["formact"] = true;
      //reduce form points
      forms--;
    }
  }
  displayUpdater();

//@TODO - rename parameter
  function activate(x) { //this will highlight and add a + to show that the thing is active
    x.addClass("active").empty().append("<strong>+</strong>");
  }

//@TODO - rename parameter
  function deactivate(x) { //this will turn off the highlight and change the + to a - to show its inactive
    x.removeClass("active").empty().append("<strong>-</strong>");
  }
}
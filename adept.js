function addPowerPoint() {
  var power = adeptPowers[$(this).attr("id")]; //this is just short hand to say adeptPowers["power name"]

  if ($(this).hasClass("active")) {
    deactivate($(this));
    power["active"] = false;

    //@TODO - I still need to figure out how to reduce the skill mod when we turn off the skill
    for (var skill in power["skillmod"]) {
      resetMod(power["skillmod"][skill], power["level"]);
    }

    for (var key in power["attmod"]) { //this rests the augmented attribute...for the most part.
      switch (power["attmod"][key]) {
        case "body":
          attributes.augment.bod -= power["level"];
          break;
        case "reaction":
          attributes.augment.rea -= power["level"];
          break;
        case "agility":
          attributes.augment.agi -= power["level"];
          break;
        case "strength":
          attributes.augment.str -= power["level"];
          break;
      }
    }

    if ($(this).attr("id") == "improvedreflexes") { //god damn improvedreflexes has to be a special snowflake and follow different rules
      power["cost"] = 1.5;
      attributes.initiative.physicalDice = 1;
      switch (power["level"]) {
        case 1:
          powerPoints += 1.5;
          attributes.augment.rea -= 1;
          break;
        case 2:
          powerPoints += 2.5;
          attributes.augment.rea -= 2;
          break;
        case 3:
          powerPoints += 3.5;
          attributes.augment.rea -= 3;
          break;
      }
    } else if (power["level"] != "n/a") { //this is for every power that is not improve reflexes
      powerPoints += power["cost"] * power["level"]; //basically, it recovers the amount of power points that was spend on the power of turned off
    } else {
      powerPoints += power["cost"];
    }

    if (power["level"] != "n/a") { //if the power level is NOT n/a then do this stuff here
      power["level"] = 0;
      $(".incAtt" + "." + $(this).attr("id")).addClass("deact");
      $(".decAtt" + "." + $(this).attr("id")).addClass("deact");
    }
    minusLimitMod(power["limitmod"]); //for the 3 powers that increase limits, this will reduce the limits they effect
  } else {
    if (powerPoints - power["cost"] >= 0) {
      activate($(this));
      power["active"] = true;

      if (power["level"] != "n/a") { //if the power is turned on, then add a level and remove the decative class on the + and - buttons
        power["level"]++;
        $(".incAtt" + "." + $(this).attr("id")).removeClass("deact");
        $(".decAtt" + "." + $(this).attr("id")).removeClass("deact");
        for (var skill in power["skillmod"]) {
          addMod(power["skillmod"][skill], power["level"]);
        }
        addAttributeMod(power["attmod"]);

        if ($(this).attr("id") == "improvedreflexes") {
          attributes.augment.rea++;
          attributes.initiative.physicalDice++;
        }
      }

      addLimitMod(power["limitmod"]);
      powerPoints -= power["cost"];
    }
  }

  displayUpdater();
}

function adeptPowerChange() {
  var power = $(this).val();
  var qifoci = $(this).parents("tr").attr("class");

  if (adeptPowers[power]["level"] == "n/a") {
    $("." + qifoci + " .ratingUp," + "." + qifoci + " .ratingDown").addClass("deact");
  } else {
    $("." + qifoci + " .ratingUp," + "." + qifoci + " .ratingDown").removeClass("deact");
  }

  electronics.qifocus.magicType = power;
  electronics.qifocus.rating = adeptPowers[power]["cost"] * 4; //sets the rating of the focus to 4x the cost of the power points
  electronics.qifocus.avail = electronics.qifocus.rating * 3; //sets avail to 3x the focus rating
  electronics.qifocus.cost = electronics.qifocus.rating * 3000; //set cost to 3000x the rating
  $("." + qifoci + " .commrating").empty().append(electronics.qifocus.rating);
  $("." + qifoci + " .avail").empty().append(electronics.qifocus.avail + " " + electronics.qifocus.restrict);
  $("." + qifoci + " .price").empty().append(electronics.qifocus.cost + "&yen;");
}
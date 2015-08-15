var phyAttMax = false;
var menAttMax = false;

function selectPriority() {
  var classPrior; //this is the class of what was clicked
  var priorityL; //Priority Level, holds which priority goes into which level

  highlightSelected($(this));

  switch (true) {
    case $(this).hasClass('a'):
      classPrior = "a";
      break;
    case $(this).hasClass('b'):
      classPrior = "b";
      break;
    case $(this).hasClass('c'):
      classPrior = "c";
      break;
    case $(this).hasClass('d'):
      classPrior = "d";
      break;
    case $(this).hasClass('e'):
      classPrior = "e";
      break;
  }

  var className = $(this).attr("class");
  switch (className) {
    case 'metatype ' + classPrior + ' selected':
      priorityL = "metatype";
      break;
    case 'attribute ' + classPrior + ' selected':
      priorityL = "attribute";
      break;
    case 'magres ' + classPrior + ' selected':
      priorityL = "magres";
      break;
    case 'skills ' + classPrior + ' selected':
      priorityL = "skills";
      break;
    case 'resource ' + classPrior + ' selected':
      priorityL = "resource";
      break;
    case 'prilevel ' + classPrior + ' selected':
      priorityL = "prilevel";
      break;
    default:
      priorityL = "prilevel";
      break;
  }

  switch (true) {
    case $(this).hasClass('a'):
      priorityA = priorityL;
      break;
    case $(this).hasClass('b'):
      priorityB = priorityL;
      break;
    case $(this).hasClass('c'):
      priorityC = priorityL;
      break;
    case $(this).hasClass('d'):
      priorityD = priorityL;
      break;
    case $(this).hasClass('e'):
      priorityE = priorityL;
      break;
  }

  deactivate(priorityL, $(this));

  switch (priorityA) {
    case "metatype":
      activateMT(".human");
      activateMT(".elf");
      activateMT(".dwarf");
      activateMT(".ork");
      activateMT(".troll");
      break;
    case "attribute":
      attribute = 24;
      pointUpdater(".pnt", attribute);
      break;
    case "magres":
      activateMT(".mage");
      activateMT(".techno");
      activateMT(".mystic");
      deactivateMT(".adept");
      deactivateMT(".aspect");
      break;
    case "skills":
      skillgroups = 10;
      skills = 46;
      break;
    case "resource":
      nuyen = 450000;
      break;
  }

  switch (priorityB) {
    case "metatype":
      activateMT(".human");
      activateMT(".elf");
      activateMT(".dwarf");
      activateMT(".ork");
      activateMT(".troll");
      break;
    case "attribute":
      attribute = 20;
      pointUpdater(".pnt", attribute);
      break;
    case "magres":
      activateMT(".mage");
      activateMT(".techno");
      activateMT(".mystic");
      activateMT(".adept");
      activateMT(".aspect");
      break;
    case "skills":
      skillgroups = 5;
      skills = 36;
      break;
    case "resource":
      nuyen = 275000;
      break;
  }

  switch (priorityC) {
    case "metatype":
      activateMT(".human");
      activateMT(".elf");
      activateMT(".dwarf");
      activateMT(".ork");
      deactivateMT(".troll");
      break;
    case "attribute":
      attribute = 16;
      pointUpdater(".pnt", attribute);
      break;
    case "magres":
      activateMT(".mage");
      activateMT(".techno");
      activateMT(".mystic");
      activateMT(".adept");
      activateMT(".aspect");
      break;
    case "skills":
      skillgroups = 2;
      skills = 28;
      break;
    case "resource":
      nuyen = 140000;
      break;
  }

  switch (priorityD) {
    case "metatype":
      activateMT(".human");
      activateMT(".elf");
      deactivateMT(".dwarf");
      deactivateMT(".ork");
      deactivateMT(".troll");
      break;
    case "attribute":
      attribute = 14;
      pointUpdater(".pnt", attribute);
      break;
    case "magres":
      deactivateMT(".mage");
      deactivateMT(".techno");
      deactivateMT(".mystic");
      activateMT(".adept");
      activateMT(".aspect");
      break;
    case "skills":
      skillgroups = 0;
      skills = 22;
      break;
    case "resource":
      nuyen = 50000;
      break;
  }

  switch (priorityE) {
    case "metatype":
      activateMT(".human");
      deactivateMT(".elf");
      deactivateMT(".dwarf");
      deactivateMT(".ork");
      deactivateMT(".troll");
      break;
    case "attribute":
      attribute = 12;
      pointUpdater(".pnt", attribute);
      break;
    case "magres":
      deactivateMT(".mage");
      deactivateMT(".techno");
      deactivateMT(".mystic");
      deactivateMT(".adept");
      deactivateMT(".aspect");
      break;
    case "skills":
      skillgroups = 0;
      skills = 18;
      break;
    case "resource":
      nuyen = 6000;
      break;
  }

  displayUpdater();
}

//@TODO - rename parameters
function activateMT(x) {
  $(x).removeClass("deact");
}

//@TODO - rename parameters
function deactivateMT(x) {
  $(x).addClass("deact");
}

function deactivate(newClass, oldClass) {
  $("." + newClass).addClass("deact");
  oldClass.removeClass("deact");
}

//@TODO - rename parameter
//function for highlighting what has been selected
function highlightSelected(x) {
  x.siblings().removeClass("selected");
  x.addClass('selected');
}

function selectMetatype() {
  if (!$(this).hasClass('deact')) {
    highlightSelected($(this));

    if ($(this).hasClass('human')) { //this stuff sets the metatype attributes and stuff
      resetAttributes();
      metatype = "human";
      attributes.current.edg = 2;
      attributes.maximum.edgmax = 7;
      attributes.minimum.edgmin = 2;
      displayUpdater();
      $("#racial").empty().append($("<p>None<br>Boring</p>"));
      switch ("metatype") {
        case priorityA:
          specAttribute = 9;
          break;
        case priorityB:
          specAttribute = 7;
          break;
        case priorityC:
          specAttribute = 5;
          break;
        case priorityD:
          specAttribute = 3;
          break;
        case priorityE:
          specAttribute = 1;
          break;
      }
    }

    if ($(this).hasClass('elf')) {
      resetAttributes();
      metatype = "elf";
      attributes.current.agi = 2;
      attributes.current.cha = 3;
      attributes.maximum.agimax = 7;
      attributes.minimum.agimin = 2;
      attributes.maximum.chamax = 8;
      attributes.minimum.chamin = 3;
      displayUpdater();
      $("#racial").empty().append($("<p>Low-Light Vision</p>"));
      switch ("metatype") {
        case priorityA:
          specAttribute = 8;
          break;
        case priorityB:
          specAttribute = 6;
          break;
        case priorityC:
          specAttribute = 3;
          break;
        case priorityD:
          specAttribute = 0;
          break;
      }
    }

    if ($(this).hasClass('dwarf')) {
      resetAttributes();
      metatype = "dwarf";
      attributes.current.bod = 3;
      attributes.current.str = 3;
      attributes.current.wil = 2;
      attributes.maximum.bodmax = 8;
      attributes.maximum.reamax = 5;
      attributes.maximum.strmax = 8;
      attributes.maximum.wilmax = 7;
      attributes.minimum.bodmin = 3;
      attributes.minimum.strmin = 3;
      attributes.minimum.wilmin = 2;
      displayUpdater();
      $("#racial").empty().append($("<p>Thermographic Vision<br>+2 Pathogen/Toxic Resist<br>20% Lifestyle increase</p>"));
      switch ("metatype") {
        case priorityA:
          specAttribute = 7;
          break;
        case priorityB:
          specAttribute = 4;
          break;
        case priorityC:
          specAttribute = 1;
          break;
      }
    }

    if ($(this).hasClass('ork')) {
      resetAttributes();
      metatype = "ork";
      attributes.current.bod = 4;
      attributes.current.str = 3;
      attributes.maximum.bodmax = 9;
      attributes.maximum.strmax = 8;
      attributes.maximum.logmax = 5;
      attributes.maximum.chamax = 5;
      attributes.minimum.bodmin = 4;
      attributes.minimum.strmin = 3;
      displayUpdater();
      $("#racial").empty().append($("<p>Low-Light Vision</p>"));
      switch ("metatype") {
        case priorityA:
          specAttribute = 7;
          break;
        case priorityB:
          specAttribute = 4;
          break;
        case priorityC:
          specAttribute = 0;
          break;
      }
    }

    if ($(this).hasClass('troll')) {
      resetAttributes();
      metatype = "troll";
      attributes.current.bod = 5;
      attributes.current.str = 5;
      attributes.maximum.bodmax = 10;
      attributes.maximum.strmax = 10;
      attributes.maximum.agimax = 5;
      attributes.maximum.logmax = 5;
      attributes.maximum.intmax = 5;
      attributes.maximum.chamax = 4;
      attributes.minimum.bodmin = 5;
      attributes.minimum.strmin = 5;
      reachmod = 1;

      displayUpdater();
      $("#racial").empty().append($("<p>Thermographic Vision<br>+1 Reach<br>+1 Dermal Armor<br>100% Lifestyle increase</p>"));

      switch ("metatype") {
        case priorityA:
          specAttribute = 5;
          break;
        case priorityB:
          specAttribute = 0;
          break;
      }
    }

    displayUpdater();
  }
}

function resetAttributes() {
  attributes.current.bod = 1;
  attributes.current.agi = 1;
  attributes.current.rea = 1;
  attributes.current.str = 1;
  attributes.current.wil = 1;
  attributes.current.log = 1;
  attributes.current.int = 1;
  attributes.current.cha = 1;
  attributes.current.edg = 1;
  attributes.minimum.bodmin = 1;
  attributes.minimum.agimin = 1;
  attributes.minimum.reamin = 1;
  attributes.minimum.strmin = 1;
  attributes.minimum.wilmin = 1;
  attributes.minimum.logmin = 1;
  attributes.minimum.intmin = 1;
  attributes.minimum.chamin = 1;
  attributes.minimum.edgmin = 1;
  attributes.maximum.bodmax = 6;
  attributes.maximum.agimax = 6;
  attributes.maximum.reamax = 6;
  attributes.maximum.strmax = 6;
  attributes.maximum.wilmax = 6;
  attributes.maximum.logmax = 6;
  attributes.maximum.intmax = 6;
  attributes.maximum.chamax = 6;
  attributes.maximum.edgmax = 6;
  reachmod = 0;
}

function nuyenUpdater() {
  $("#nuyen").empty().append($("<strong>" + nuyen + "&#65509</strong>"));
}

function essUpdater() {
  $("#essencepnt").empty().append($("<strong>" + Math.round(ess * 1000) / 1000 + "</strong>"));
}

function magUpdater() {
  $(".mag .stats").empty().append($("<span>" + Math.floor(attributes.current.mag) + "/" + Math.floor(attributes.maximum.magmax) + "</span>"));
}

function resUpdater() {
  $(".res .stats").empty().append($("<span>" + Math.floor(attributes.current.res) + "/" + Math.floor(attributes.maximum.resmax) + "</span>"));
}

function displayUpdater() {
  renderAttributeStat(attributes.augment.bod, "bod", attributes.current.bod, attributes.maximum.bodmax);
  renderAttributeStat(attributes.augment.agi, "agi", attributes.current.agi, attributes.maximum.agimax);
  renderAttributeStat(attributes.augment.rea, "rea", attributes.current.rea, attributes.maximum.reamax);
  renderAttributeStat(attributes.augment.str, "str", attributes.current.str, attributes.maximum.strmax);
  renderAttributeStat(attributes.augment.wil, "wil", attributes.current.wil, attributes.maximum.wilmax);
  renderAttributeStat(attributes.augment.log, "log", attributes.current.log, attributes.maximum.logmax);
  renderAttributeStat(attributes.augment.int, "int", attributes.current.int, attributes.maximum.intmax);
  renderAttributeStat(attributes.augment.cha, "cha", attributes.current.cha, attributes.maximum.chamax);

  renderSpecStat("edg", attributes.current.edg, attributes.maximum.edgmax);

  magUpdater();
  resUpdater();

  pointUpdater(".pnt", attribute);
  pointUpdater(".spePnt", specAttribute);

  attributes.limits.phyLimit = renderLimit(attributes.limitMod.phyLimitMod, "phyLimit", attributes.current.str + attributes.augment.str, attributes.current.bod + attributes.augment.bod, attributes.current.rea + attributes.augment.rea);
  attributes.limits.socLimit = renderLimit(attributes.limitMod.socLimitMod, "socLimit", attributes.current.cha, attributes.current.wil, ess);
  attributes.limits.menLimit = renderLimit(attributes.limitMod.menLimitMod, "menLimit", attributes.current.log, attributes.current.int, attributes.current.wil);
  attributes.initiative.physical = initiativeRender(attributes.current.rea, "meatini", attributes.initiative.physicalDice, attributes.augment.rea);
  attributes.initiative.astral = initiativeRender(attributes.current.int, "magicini", attributes.initiative.astralDice, attributes.augment.int);
  attributes.initiative.matrix = initiativeRender(dataP, "coldmatini", attributes.initiative.matrixColdDice, 0);
  attributes.initiative.matrix = initiativeRender(dataP, "hotmatini", attributes.initiative.matrixHotDice, 0);

  renderSkills();

  $("#skillpnt").empty().append($("<strong>" + skills + "/" + skillgroups + "</strong>"));

  pointUpdater("#knowpnt", knowledgepoints);
  pointUpdater("#powerpnt", powerPoints);
  pointUpdater("#spellpnt", spells);
  pointUpdater("#formpnt", forms);
  pointUpdater("#karmapnt", karma);

  essUpdater();
  nuyenUpdater();
}

//@TODO - rename parameters
function calculateSkillPool(w, x, y, z) {
  var sum;

  if (w == true && x == 0) {
    sum = y + z + x - 1;
  } else if (w == false && x == 0) {
    sum = "n/a";
  } else {
    sum = y + z + x;
  }

  return sum;
}

//@TODO - rename parameters
function pointUpdater(x, y) {
  $(x).empty().append($("<strong>" + y + "</strong>"));
}

//@TODO - rename parameters
function renderAttributeStat(w, x, y, z) { //this shows the current level of an attribute and the attribute max
  var augment = y + w;
  $("." + x + " .stats").empty().append($("<span>" + y + "/" + z + "(" + augment + ")" + "</span>"));
}

//@TODO - rename parameters
function renderSpecStat(x, y, z) { //this is for special stats like edge, attributes.current.mag, and attributes.current.res
  $("." + x + " .stats").empty().append($("<span>" + y + "/" + z + "</span>"));
}

//@TODO - rename parameters
function initiativeRender(x, y, z, w) {
  if (magres == "technomancer") {
    dataP = attributes.current.log;
  }

  var ini = attributes.current.int + attributes.augment.int + x + w;
  $("." + y).empty().append($("<strong>" + ini + "+" + z + "D6</strong>"));

  return ini;
}

function renderLimit(v, w, x, y, z) { //function for showing and calculating limits
  var limit = (x * 2 + y + z) / 3;
  limit = Math.ceil(limit);
  $("." + w).empty().append($("<strong>" + limit + "(" + (limit + v) + ")" + "</strong>"));
  return limit;
}

function changeAttribute() {
  var className = $(this).attr("class");

  switch (className) {
    case 'incAtt Bod':
      attributes.current.bod = increasePhy(attributes.current.bod, attributes.maximum.bodmax);
      break;
    case 'incAtt Agi':
      attributes.current.agi = increasePhy(attributes.current.agi, attributes.maximum.agimax);
      break;
    case 'incAtt Rea':
      attributes.current.rea = increasePhy(attributes.current.rea, attributes.maximum.reamax);
      break;
    case 'incAtt Str':
      attributes.current.str = increasePhy(attributes.current.str, attributes.maximum.strmax);
      break;
    case 'incAtt Wil':
      attributes.current.wil = increaseMen(attributes.current.wil, attributes.maximum.wilmax);
      break;
    case 'incAtt Log':
      attributes.current.log = increaseMen(attributes.current.log, attributes.maximum.logmax);
      setKnowledgePoints();
      break;
    case 'incAtt Int':
      attributes.current.int = increaseMen(attributes.current.int, attributes.maximum.intmax);
      setKnowledgePoints();
      break;
    case 'incAtt Cha':
      attributes.current.cha = increaseMen(attributes.current.cha, attributes.maximum.chamax);
      break;
    case 'decAtt Bod':
      attributes.current.bod = decreasePhy(attributes.current.bod, attributes.minimum.bodmin, attributes.maximum.bodmax);
      break;
    case 'decAtt Agi':
      attributes.current.agi = decreasePhy(attributes.current.agi, attributes.minimum.agimin, attributes.maximum.agimax);
      break;
    case 'decAtt Rea':
      attributes.current.rea = decreasePhy(attributes.current.rea, attributes.minimum.reamin, attributes.maximum.reamax);
      break;
    case 'decAtt Str':
      attributes.current.str = decreasePhy(attributes.current.str, attributes.minimum.strmin, attributes.maximum.strmax);
      break;
    case 'decAtt Wil':
      attributes.current.wil = decreaseMen(attributes.current.wil, attributes.minimum.wilmin, attributes.maximum.wilmax);
      break;
    case 'decAtt Log':
      attributes.current.log = decreaseMen(attributes.current.log, attributes.minimum.logmin, attributes.maximum.logmax);
      setKnowledgePoints();
      break;
    case 'decAtt Int':
      attributes.current.int = decreaseMen(attributes.current.int, attributes.minimum.intmin, attributes.maximum.intmax);
      setKnowledgePoints();
      break;
    case 'decAtt Cha':
      attributes.current.cha = decreaseMen(attributes.current.cha, attributes.minimum.chamin, attributes.maximum.chamax);
      break;
    case 'incAtt Edg':
      attributes.current.edg = increaseSpecial(attributes.current.edg, attributes.maximum.edgmax);
      break;
    case "incAtt Mag":
      if (magres == "adept" && attributes.current.mag < attributes.maximum.magmax) {
        powerPoints++;
      }
      attributes.current.mag = increaseSpecial(attributes.current.mag, attributes.maximum.magmax);
      fociMaxRating = attributes.current.mag * 2;
      break;
    case "incAtt Res":
      attributes.current.res = increaseSpecial(attributes.current.res, attributes.maximum.resmax);
      break;
    case "decAtt Edg":
      attributes.current.edg = decreaseSpecial(attributes.current.edg, attributes.minimum.edgmin);
      break;
    case "decAtt Mag":
      if (magres == "adept" && attributes.current.mag > attributes.minimum.magmin) {
        powerPoints--;
      }
      attributes.current.mag = decreaseSpecial(attributes.current.mag, attributes.minimum.magmin);
      fociMaxRating = attributes.current.mag * 2;
      break;
    case "decAtt Res":
      attributes.current.res = decreaseSpecial(attributes.current.res, attributes.minimum.resmin);
      break;
    case "incAtt bow weaprating":
      //this increase the bows rating. A strange place to put this...but whatever.
      if (weapons.bow.rating < 10) {
        weapons.bow.rating++;
        bowUpdater();
      }
      break;
    case "decAtt bow weaprating":
      //this increase the bows rating. A strange place to put this...but whatever.
      if (weapons.bow.rating > 0) {
        weapons.bow.rating--;
        bowUpdater();
      }
      break;
  }

  function bowUpdater() {
    weapons.bow.damage = weapons.bow.rating + 2;
    weapons.bow.ap = Math.ceil(weapons.bow.rating / 4) * -1;
    weapons.bow.avail = weapons.bow.rating;
    weapons.bow.cost = weapons.bow.rating * 100;
  }

  if ($(this).closest("skilltitle")) { //if the incAtt or decAtt is in the div skilltitle, then its a skill, so update the active skills
    activeSkills = skillUpdater(activeSkills, skills);
  }
  if ($(this).closest("knowledgeskills")) { //this updates the knowledge skills
    knowledgeSkills = skillUpdater(knowledgeSkills, knowledgepoints);
  }

  function setKnowledgePoints() {
    knowledgepoints = (attributes.current.int + attributes.current.log) * 2;
  }

  //@TODO - skillupdater is very poorly written, refactor later!
  function skillUpdater(x, y) { //this function gets called by both the active and knowledge skills
    for (var skill in x) { //this will increase the skills
      if (y > 0) { //if you're out of skill points, don't add skills.
        if (x[skill]["rating"] < x[skill]["max"]) { //skill ratings can't be over the max skill
          if (className == "incAtt " + skill) { //if increase attrabute (now poorly named) is not with a skill, then do nothing
            if (x == activeSkills) {
              skills--;
            } else if (x == knowledgeSkills) { //if this is a knowledge skill decrease the knowledge skill points
              knowledgepoints--;
            }
            x[skill]["rating"]++;
          }
        }
      }
      if (x[skill]["rating"] > 0 && className == "decAtt " + skill) { //if skill rating is over 0 and decrease Attribute is with the skill then do this stuff
        if (x == activeSkills) {
          skills++;
        } else if (x == knowledgeSkills) {
          knowledgepoints++;
        }
        x[skill]["rating"]--;
      } else if ((x[skill]["rating"] === 0) && (x == knowledgeSkills)) { // Removes knowledge skill if at zero and reduced again.
        if (className == "decAtt " + skill) {
          $('.' + skill).remove(); // Technically removes table row. Does not delete array entry to avoid index problems.
        }
      }
    }
    return x;
  }
  for (var skill in groupSkills) { //this will increase the skill groups
    if (skillgroups > 0 && groupSkills[skill]["rating"] < skillgroupmax && className == "incAtt " + skill) {
      groupSkills[skill]["rating"]++;
      for (var key in groupSkills[skill]["skillsingroup"]) {
        var x = groupSkills[skill]["skillsingroup"][key];
        activeSkills[x]["rating"] = groupSkills[skill]["rating"];
        $(".incAtt." + x).addClass("deact");
        $(".decAtt." + x).addClass("deact");
      }
      skillgroups--;
    } else if (groupSkills[skill]["rating"] > 0 && className == "decAtt " + skill) {
      groupSkills[skill]["rating"]--;
      skillgroups++;
      for (var key2 in groupSkills[skill]["skillsingroup"]) {
        var x2 = groupSkills[skill]["skillsingroup"][key2];
        activeSkills[x2]["rating"] = groupSkills[skill]["rating"];
        if (groupSkills[skill]["rating"] === 0) {
          $(".incAtt." + x2).removeClass("deact");
          $(".decAtt." + x2).removeClass("deact");
        }
      }
    }
  }

  for (var prop in adeptPowers) {
    var power = adeptPowers[prop];
    if (prop == "improvedreflexes" && power["level"] > 0) { //this will reduce the cost of improved reflexes if it is activated
      power["cost"] = 1;
      if (power["level"] >= 1 && power["level"] < 3 && powerPoints - power["cost"] >= 0) {
        if (className == "incAtt " + prop) {
          power["level"]++;
          powerPoints = powerPoints - power["cost"];
          attributes.initiative.physicalDice++;
          attributes.augment.rea++;
        }
      }
      if (power["level"] > 1) {
        if (className == "decAtt " + prop) {
          power["level"]--;
          powerPoints = powerPoints + power["cost"];
          attributes.initiative.physicalDice--;
          attributes.augment.rea--;
        }
      }
    } else if (prop == "improvedphysicalattributebody" || prop == "improvedphysicalattributeagility" || prop == "improvedphysicalattributereaction" || prop == "improvedphysicalattributestrength") {
      if (powerPoints - power["cost"] >= 0 && power["level"] < 4 && className == "incAtt " + prop) {
        power["level"]++;
        powerPoints = powerPoints - power["cost"];

        addAttMod(power["attmod"]);
      }
      if (power["level"] > 1 && className == "decAtt " + prop) {
        power["level"]--;
        powerPoints = powerPoints + power["cost"];

        for (var key in power["attmod"]) {
          switch (power["attmod"][key]) {
            case "body":
              attributes.augment.bod = minusAugmentAtt(attributes.augment.bod);
              break;
            case "reaction":
              attributes.augment.rea = minusAugmentAtt(attributes.augment.rea);
              break;
            case "agility":
              attributes.augment.agi = minusAugmentAtt(attributes.augment.agi);
              break;
            case "strength":
              attributes.augment.str = minusAugmentAtt(attributes.augment.str);
              break;
          }
        }
      }
    } else {
      if (powerPoints - power.cost >= 0 && power.level < attributes.current.mag && className == "incAtt " + prop) {
        power.level++;
        powerPoints = powerPoints - power.cost;

        for (var skill in power.skillmod) {
          addMod(power.skillmod[skill], power.level); //updates mods that power effect
        }

      }
      if (power.level > 1 && className == "decAtt " + prop) {
        power.level--;
        powerPoints = powerPoints + power.cost;
        for (var skill in power.skillmod) {
          minusMod(power.skillmod[skill], power.level);
        }
      }
    }
  }

  for (var item in inventory) { //this will be used to increase and decrease the weapon foci rating and license rating, and now clips too
    var itemhold = inventory[item]
    if ($(this).parents("#" + item).attr("id") == item) {
      if ($(this).attr("class") == item + " incAtt weaponfoci" && fociRating < fociMaxRating && focinumber < attributes.current.mag && itemhold["weaponfoci"] < 3 && nuyen - 7000 > 0 && karma - 3 > 0) {
        if (itemhold["weaponfoci"] == 0) {
          focinumber++;
        }

        itemhold["weaponfoci"]++;
        inventoryStatUpdater(item, ".focirating.weaponfoci", itemhold["weaponfoci"]);
        fociRating++;
        nuyen -= 7000;
        inventory[item]["cost"] += 7000;
        karma -= 3;
      } else if ($(this).attr("class") == item + " decAtt weaponfoci" && itemhold["weaponfoci"] > 0) {
        itemhold["weaponfoci"]--;
        if (itemhold["weaponfoci"] == 0) {
          focinumber--;
        }
        inventoryStatUpdater(item, ".focirating.weaponfoci", itemhold["weaponfoci"]);
        fociRating--;
        nuyen += 7000;
        itemhold["cost"] -= 7000;
        karma += 3;
      }
      if ($(this).attr("class") == item + " incAtt license" && itemhold["license"] < 4 && nuyen - 200 > 0) {
        itemhold["license"]++;
        inventoryStatUpdater(item, ".licenserating.license", itemhold["license"]);
        nuyen -= 200;
        itemhold["cost"] += 200;
      } else if ($(this).attr("class") == item + " decAtt license" && itemhold["license"] > 0) {
        itemhold["license"]--;
        inventoryStatUpdater(item, ".licenserating.license", itemhold["license"]);
        nuyen += 200;
        itemhold["cost"] -= 200;
      }

      if (itemhold["rating"] > 0) { //if rating 0 its a crossbow.
        var arrowPrice = itemhold["rating"] * 2;
        var injectPrice = itemhold["rating"] * 20;
      } else {
        var arrowPrice = 5;
        var injectPrice = 50;
      }

      if (itemhold.name == "shuriken") {
        var arrowPrice = 25;
      }

      if ($(this).attr("class") == item + " incAtt arrow" && nuyen - arrowPrice > 0) {
        itemhold["arrow"]++;
        inventoryStatUpdater(item, ".arrowNum.arrow", itemhold["arrow"]);
        nuyen -= arrowPrice;
        itemhold["cost"] += arrowPrice;
      } else if ($(this).attr("class") == item + " decAtt arrow" && itemhold["arrow"] > 0) {
        itemhold["arrow"]--;
        inventoryStatUpdater(item, ".arrowNum.arrow", itemhold["arrow"]);
        nuyen += arrowPrice;
        itemhold["cost"] -= arrowPrice;
      }

      if ($(this).attr("class") == item + " incAtt injarrow" && nuyen - injectPrice > 0) {
        itemhold["inject"]++;
        inventoryStatUpdater(item, ".arrowNum.injarrow", itemhold["inject"]);
        nuyen -= injectPrice;
        itemhold["cost"] += injectPrice;
      } else if ($(this).attr("class") == item + " decAtt injarrow" && itemhold["inject"] > 0) {
        itemhold["inject"]--;
        inventoryStatUpdater(item, ".arrowNum.injarrow", itemhold["inject"]);
        nuyen += injectPrice;
        itemhold["cost"] -= injectPrice;
      }


      if (itemhold.clip == "Clip") {
        var clipPrice = 5;
      } else {
        var clipPrice = 25;
      }

      if ($(this).attr("class") == item + " incAtt extraclips" && nuyen - clipPrice > 0) {
        itemhold["extraclips"]++;
        inventoryStatUpdater(item, ".numofclips.extraclips", itemhold["extraclips"]);
        nuyen -= clipPrice;
        itemhold["cost"] += clipPrice;
      } else if ($(this).attr("class") == item + " decAtt extraclips" && itemhold["extraclips"] > 0) {
        itemhold["extraclips"]--;
        inventoryStatUpdater(item, ".numofclips.extraclips", itemhold["extraclips"]);
        nuyen += clipPrice;
        itemhold["cost"] -= clipPrice;
      }

    }
  }

  //@TODO - rename parameters
  function inventoryStatUpdater(item, className, stat) { //x=the name of the item, y=the classes to target the table to update the stat. z=the stat to show
    $("#" + item + " " + className).empty().append(stat);
  }

  //@TODO - rename parameters
  function increasePhy(x, y) { //this shit increases an attribute while decreasing the points you can spend
    if (phyAttMax == true) {
      y--;
    }
    if (attribute > 0 && x < y) {
      x++;
      attribute--;
      if (x == y) {
        phyAttMax = true;
      }
    }
    return x;
  }

  //@TODO - rename parameters
  function increaseMen(x, y) { //this shit increases an attribute while decreasing the points you can spend
    if (menAttMax == true) {
      y--;
    }
    if (attribute > 0 && x < y) {
      x++;
      attribute--;
      if (x == y) {
        menAttMax = true;
      }
    }
    return x;
  }

  //@TODO - rename parameters
  function decreasePhy(x, y, z) { //this shit decreases and attribute while increasing the points you can spend
    if (x == z) {
      phyAttMax = false;
    }

    if (x > y) {
      x--;
      attribute++;
    }

    return x;
  }

  //@TODO - rename parameters
  function decreaseMen(x, y, z) { //this shit decreases and attribute while increasing the points you can spend
    if (x == z) {
      menAttMax = false;
    }

    if (x > y) {
      x--;
      attribute++;
    }

    return x;
  }

  function increaseSpecial(x, y) {
    if (specAttribute > 0) {
      if (x < y) {
        x++;
        specAttribute--;
      }
    }

    return x;
  }

  function decreaseSpecial(x, y) {
    if (x > y) {
      x--;
      specAttribute++;
    }

    return x;
  }

  displayUpdater();
}

//@TODO - rename parameter
function addAugmentAtt(x) {
  if (x < 4) {
    x++;
  }
  return x;
}

//@TODO - rename parameter
function minusAugmentAtt(x) {
  if (x > 0) {
    x--;
  }
  return x;
}

function selectMagRes() {
  if ($(this).hasClass('deact') || $(this).hasClass('selected')) {
    return;
  } else {
    highlightSelected($(this));

    if ($(this).hasClass('mage')) {
      magres = "mage";
      awaken("Mag", "Res");
      mageMysticSetting();
    }
    if ($(this).hasClass('mystic')) {
      magres = "mystic";
      awaken("Mag", "Res");
      mageMysticSetting();
    }
    if ($(this).hasClass('techno')) {
      magres = "technomancer";
      awaken("Res", "Mag");
      switch ("magres") {
        case priorityA:
          attributes.current.mag = 0;
          powerPoints = 0;
          attributes.current.res = 6;
          attributes.minimum.resmin = 6;
          skills += 10;
          forms = 5;
          spells = 0;
          break;
        case priorityB:
          attributes.current.mag = 0;
          powerPoints = 0;
          attributes.current.res = 4;
          attributes.minimum.resmin = 4;
          skills += 8;
          forms = 2;
          spells = 0;
          break;
        case priorityC:
          attributes.current.mag = 0;
          powerPoints = 0;
          attributes.current.res = 3;
          attributes.minimum.resmin = 3;
          forms = 1;
          spells = 0;
          break;
      }
    }
    if ($(this).hasClass('adept')) {
      magres = "adept";
      awaken("Mag", "Res");
      switch ("magres") {
        case priorityB:
          attributes.current.mag = 6;
          powerPoints = 6.0;
          attributes.minimum.magmin = 6;
          attributes.current.res = 0;
          skills += 4;
          spells = 0;
          forms = 0;
          break;
        case priorityC:
          attributes.current.mag = 4;
          powerPoints = 4.0;
          attributes.minimum.magmin = 4;
          attributes.current.res = 0;
          skills += 2;
          spells = 0;
          forms = 0;
          break;
        case priorityD:
          attributes.current.mag = 2;
          powerPoints = 2.0;
          attributes.minimum.magmin = 2;
          attributes.current.res = 0;
          spells = 0;
          forms = 0;
          break;
      }
    }
    if ($(this).hasClass('aspect')) {
      magres = "aspect";
      awaken("Mag", "Res");
      switch ("magres") {
        case priorityB:
          attributes.current.mag = 5;
          powerPoints = 0;
          attributes.minimum.magmin = 5;
          attributes.current.res = 0;
          skillgroups += 4;
          spells = 0;
          forms = 0;
          break;
        case priorityC:
          attributes.current.mag = 3;
          powerPoints = 0;
          attributes.minimum.magmin = 3;
          attributes.current.res = 0;
          skillgroups += 2;
          spells = 0;
          forms = 0;
          break;
        case priorityD:
          attributes.current.mag = 2;
          powerPoints = 0;
          attributes.minimum.magmin = 2;
          attributes.current.res = 0;
          spells = 0;
          forms = 0;
          break;
      }
    }

    fociMaxRating = attributes.current.mag * 2;

  }
  displayUpdater();
}

function mageMysticSetting() { //since mystics and mages have the same stuff, they get a function
  switch ("magres") {
    case priorityA:
      attributes.current.mag = 6;
      powerPoints = 0;
      attributes.minimum.magmin = 6;
      attributes.current.res = 0;
      skills += 10;
      spells = 10;
      forms = 0;
      break;
    case priorityB:
      attributes.current.mag = 4;
      powerPoints = 0;
      attributes.minimum.magmin = 4;
      attributes.current.res = 0;
      skills += 8;
      spells = 7;
      forms = 0;
      break;
    case priorityC:
      attributes.current.mag = 3;
      powerPoints = 0;
      attributes.minimum.magmin = 3;
      attributes.current.res = 0;
      spells = 5;
      forms = 0;
      break;
  }
}

function awaken(x, y) { //this is suppose to unhide attributes.current.mag or resonance and then hide the other stat
  $("." + x).removeClass("hide");
  $("." + y).addClass("hide");
}

//@TODO - rename
function setupSkills() { //Well, this is used for more then just skills now. It should only run once at start up
                         //@TODO - remove all this "theLabeler" stuff
  theLabeler("#adeptlabel", "#powerlist");
  theLabeler(".label.combat", ".spells.combat");
  theLabeler(".label.detection", ".spells.detection");
  theLabeler(".label.health", ".spells.health");
  theLabeler(".label.illusion", ".spells.illusion");
  theLabeler(".label.manipulation", ".spells.manipulation");
  theLabeler(".label.complexforms", ".complexforms.library");
  theLabeler(".label.bow", ".projectiles.bow");
  theLabeler(".label.crossbow", ".projectiles.crossbow");
  theLabeler(".label.throwingweapon", ".projectiles.throwingweapons");
  theLabeler(".label.firearm", ".firearms");

  function theLabeler(x, y) {
    $(x).appendTo(y);
  }

  for (var x in weapons) { //adds exotic melee weapons to the skill list
    if (weapons[x]["category"] == "exoticmeleeweapon") {
      makeExoticSkill("agi", weapons[x], "Exotic Melee (", "agility");
    } else if (weapons[x]["category"] == "exoticrangedweapon") {
      makeExoticSkill("agi", weapons[x], "Exotic Range (", "agility");
    }
  }

  function makeExoticSkill(attributeVariable, weapon, skillType, attribute) {
    activeSkills[weapon.skill] = {
      name: skillType + weapon.skillName + ")",
      catalog: attribute,
      stat: attributeVariable,
      rating: 0,
      mod: 0,
      max: 6,
      defaultable: false
    };
  }

  setupActiveKnowledgeSkills(activeSkills);
  setupActiveKnowledgeSkills(knowledgeSkills);

  function setupActiveKnowledgeSkills(skillList) {
    for (var skill in skillList) {
      skillList[skill].id = skill;
      addSkillLine(skillList[skill]);
    }
  }

  //@TODO - move this logic outside of these function declarations
  for (var skill in groupSkills) { //this for loop sets up the skill groups
    $("#skillgrouplist").find("tbody").append($("<tr class='" + skill + "'><td class='incAtt " + skill + "'>+</td><td class='" + skill + " rating'>" + groupSkills[skill]["rating"] + "</td><td class='decAtt " + skill + "'>-</td><td class='skillgroupname'>" + groupSkills[skill]["name"] + "</td><td class='skillsin " + [skill] + "'></td></tr>"));
    for (var key in groupSkills[skill]["skillsingroup"]) {
      $(".skillsin." + skill).append(activeSkills[groupSkills[skill]["skillsingroup"][key]]["name"] + ", ");

    }
  }

  for (var power in adeptPowers) { //this for loop sets up the adept powers
    $("#powerlist").append($("<tr class='" + [power] + "'><td id='" + [power] + "'class='add " + [power] + " button'><strong>-</strong></td><td class='incAtt " + [power] + " deact'>+</td><td class='level " + [power] + "'>" + adeptPowers[power]["level"] + "</td><td class='decAtt " + [power] + " deact'>-</td><td class='name " + [power] + "'>" + adeptPowers[power]["name"] + "</td><td class='cost " + [power] + "'>" + adeptPowers[power]["cost"] + "</td><td class='activation " + [power] + "'>" + adeptPowers[power]["activation"] + "</td><td class='drain " + [power] + "'>n/a</td></tr>"));

    if (adeptPowers[power]["drain"] == true) {
      $(".drain." + [power]).empty().append($(adeptPowers[power]["level"]));
    }
  }

  for (var spell in spellforms) { //this sets up the spells
    var spellhold = spellforms[spell];
    if (spellforms[spell]["category"] == "combat") {
      $(".spells.combat").append($("<tr id='" + spell + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='direct " + spell + "'></td><td class='element " + spell + "'>" + spellhold["element"] + "</td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldam " + spell + "'>" + spellhold["damage"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>"));
      if (spellhold["direct"] == true) {
        $("<span>Direct</span>").appendTo($(".direct." + spell));
      } else {
        $("<span>Indirect</span>").appendTo($(".direct." + spell));
      }
    }

    if (spellforms[spell]["category"] == "detection") {
      $(".spells.detection").append($("<tr id='" + spell + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='illact " + spell + "'>" + spellhold["active"] + "</td><td class='direction " + spell + "'>" + spellhold["direction"] + "</td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>"));
    }

    if (spellforms[spell]["category"] == "health") {
      $(".spells.health").append($("<tr id='" + spell + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='heaEss " + spell + "'></td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>"));
      if (spellhold["essence"] == true) {
        $(".heaEss." + spell).append($("<span>Essence</span>"));
      } else {
        $(".heaEss." + spell).append($("<span>n/a</span>"));
      }
    }

    if (spellforms[spell]["category"] == "illusion") {
      $(".spells.illusion").append($("<tr id='" + spell + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='realistic " + spell + "'></td><td class='sense " + spell + "'>" + spellhold["sense"] + "</td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>"));
      if (spellhold["realistic"] == true) {
        $(".realistic." + spell).append($("<span>Realistic</span>"))
      } else {
        $(".realistic." + spell).append($("<span>Obvious</span>"))
      }
    }

    if (spellforms[spell]["category"] == "manipulation") {
      $(".spells.manipulation").append($("<tr id='" + spell + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='effect " + spell + "'>" + spellhold["effect"] + "</td><td class='damage " + spell + "'>" + spellhold["damage"] + "</td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>"));
    }
  }

  spellinput(" ", "detectlifeform", "Life Form");
  spellinput(" Extended", "detectlifeformextended", "Life Form");
  spellinput(" ", "detectobject", "Object");

  //@TODO - organize functions and logic
  spellAttributeSelect("decreaseattribute", "Decrease ");
  spellAttributeSelect("increaseattribute", "Increase ");

  for (var form in complexforms) {
    var formhold = complexforms[form];
    $(".complexforms.library").append($("<tr id='" + form + "'class='form'><td class='formact " + form + " button'><strong>-</strong></td><td class='formname " + form + "'>" + formhold["name"] + "</td><td class='formtarget " + form + "'>" + formhold["target"] + "</td><td class='formdur " + form + "'>" + formhold["duration"] + "</td><td class='fading " + form + "'>" + formhold["fading"] + "</td></tr>"));
  }

}

function setupAugmentations() {
  for (var aug in augmentations) { //render augmentations
    switch (aug) {
      case "obvious":
        for (var limb in augmentations[aug]) {
          $("#cyberlimbs").append("<tr class=" + limb + "><td class='buyAug button'><strong>+</strong></td><td class='limb'>" + augmentations[aug][limb]["name"] + "</td><td class='type'>Obvious</td><td class='grade'>Standard</td><td class='location'>Left</td><td class='strUp button'>+</td><td class='str'>3</td><td class='strDown button'>-</td><td class='agiUp button'>+</td><td class='agi'>3</td><td class='agiDown button'>-</td><td class='cap'>" + augmentations[aug][limb]["capmax"] + "</td><td class='avail'>" + augmentations[aug][limb]["avail"] + "</td><td class='ess'>" + augmentations[aug][limb]["essence"] + "</td><td class='price'>" + augmentations[aug][limb]["cost"] + "&yen;</td></tr>");
          switch (augmentations[aug][limb]["slot"]) {
            case "chest":
              $("." + limb + " .location").empty().append("Chest");
              break;
            case "head":
              $("." + limb + " .location").empty().append("Head");
              break;
            case "arm":
            case "leg":
              $("." + limb + " .location").empty().append("<select><option value='left'>Left</option><option value='right'>Right</option></select> " + augmentations[aug][limb]["slot"]);
              break;

          }
        }
        break;
    }
  }

  $("#cyberlimbs .type").empty().append("<select><option value='obvious'>Obvious</option><option value='synthetic'>Synthetic</option></select>");
  $("#cyberlimbs .grade").empty().append("<select><option value='used'>Used</option><option value='standard' selected>Standard</option><option value='alpha'>Alpha</option><option value='beta'>Beta</option><option value='delta'>Delta</option></select>");
}

function addSkillLine(skill) {
  skillsum = calculateSkillPool(skill["defaultable"], skill["rating"], skill["mod"], attributes.current[skill["stat"]]);

  var skillLine = "<tr class='skills " + skill.id + "'>";
  skillLine += "<td class='incAtt " + skill.id + "'>+</td>";
  skillLine += "<td class='rating'>" + skill["rating"] + "</td>";
  skillLine += "<td class='decAtt " + skill.id + "'>-</td>";
  skillLine += "<td class='skillName'>" + skill["name"] + "</td>";
  skillLine += "<td class='stat'>" + attributes.current[skill["stat"]] + "</td>";
  skillLine += "<td class='mod'>" + skill["mod"] + "</td>"
  skillLine += "<td class='skillsum'>" + skillsum + "</td><tr>";

  $("." + skill["catalog"]).after(skillLine);
}

//@TODO - rename function
function renderSkills() { //this has become for rendering/updating anything that can be accessed with a for loop; it seems.
  for (var prop in activeSkills) {
    attributeUpdater("stat", prop, activeSkills);
    statUpdater("rating", prop, activeSkills);
    statUpdater("mod", prop, activeSkills);
    activeSkills[prop]["skillsum"] = calculateSkillPool(activeSkills[prop]["defaultable"], activeSkills[prop]["rating"], activeSkills[prop]["mod"], attributes.current[activeSkills[prop]["stat"]] + attributes.augment[activeSkills[prop]["stat"]]);
    dicePoolUpdater(activeSkills[prop]["skillsum"], [prop]);
  }

  for (var prop in knowledgeSkills) {
    switch (knowledgeSkills[prop]["catalog"]) {
      case "academic":
      case "professional":
        knowledgeSkills[prop]["stat"] = "log";
        break;
      case "interests":
      case "street":
      case "language":
        knowledgeSkills[prop]["stat"] = "int";
        break;
    }

    attributeUpdater("stat", [prop], knowledgeSkills);
    statUpdater("rating", [prop], knowledgeSkills);
    statUpdater("mod", [prop], knowledgeSkills);
    skillsum = calculateSkillPool(knowledgeSkills[prop]["defaultable"], knowledgeSkills[prop]["rating"], knowledgeSkills[prop]["mod"], attributes.current[knowledgeSkills[prop]["stat"]] + attributes.augment[knowledgeSkills[prop]["stat"]]);
    dicePoolUpdater(skillsum, [prop]);
  }

  for (var prop in adeptPowers) { //rendering and updating adept powers!
    statUpdater("level", prop, adeptPowers);
    if (adeptPowers[prop]["drain"] == true) {
      $("." + prop + " .drain").empty().append("<span>" + adeptPowers[prop]["level"] + "</span>");
    }
  }

  //@TODO - rename parameters
  function attributeUpdater(x, y, z) {
    $("." + y + " ." + x).empty().append(attributes.current[z[y][x]] + attributes.augment[z[y][x]]);
  }

  //@TODO - rename parameters
  function statUpdater(x, y, z) {
    $("." + y + " ." + x).empty().append("<span>" + z[y][x] + "</span>");
  }

  //@TODO - rename parameters
  function dicePoolUpdater(x, y) {
    $("." + y + " .skillsum").empty().append("<span>" + x + "</span>");
  }

  for (var skill in groupSkills) {
    $("." + skill + " .rating").empty().append("<span>" + groupSkills[skill]["rating"] + "</span>");
  }

  for (var item in weapons) {
    if (weapons[item]["stat"] > 0) {
      weapons[item]["stat"] = attributes.current.str + attributes.augment.str;
    }

    if (weapons[item]["skill"] == "unarmedcombat" || weapons[item]["skill"] == "throwingweapons") {
      weapons[item]["accuracy"] = attributes.limits.phyLimit + attributes.limitMod.phyLimitMod;
    }

    augmentedStat("accmod", "accuracy", [item], weapons)
    $(".reach." + item).empty().append("<span>" + weapons[item]["reach"] + "(" + (weapons[item]["reach"] + reachmod) + ")" + "</span>");
    $(".weaprating." + item + ".weapratingnum").empty().append(weapons[item]["rating"]);
    $(".ap." + item).empty().append(weapons[item]["ap"]);
    $(".avail." + item).empty().append(weapons[item]["avail"] + " " + weapons[item]["restrict"]);
    $(".cost." + item).empty().append("<span>" + weapons[item]["cost"] + "&#65509</span>");
    augmentedDamage("damtype", "element", "stat", "damage", [item], weapons); //render weapon damage this also changes the ap for weapons with altammo
  }

  for (var itemNum in inventory) { //this is suppose to update the nuyen price of the time

    //@TODO - redo this weird empty if statement
    if (typeof inventory[itemNum]["skill"] === 'undefined') {

    } else if (inventory[itemNum]["weaponfoci"] > 0 && activeSkills[inventory[itemNum]["skill"]]["skillsum"] != "n/a") { //this if statements sets the dice pool for the item
      var dp = activeSkills[inventory[itemNum]["skill"]]["skillsum"] + inventory[itemNum]["weaponfoci"];
    } else if (inventory[itemNum]["rating"] > attributes.current.str) { //this is for bows
      var dp = activeSkills[inventory[itemNum]["skill"]]["skillsum"] - ((inventory[itemNum]["rating"] - attributes.current.str) * 3);
    } else { //this is for everything else
      var dp = activeSkills[inventory[itemNum]["skill"]]["skillsum"];
    }
    $("#" + itemNum + " .weaponDP").empty().append("<span>" + (dp) + "</span>"); //this renders the dice pool
    $("#" + itemNum + " .custWeapPrice").empty().append("<span>" + inventory[itemNum]["cost"] + "&#65509</span>"); //this renders the cost
    $("#" + itemNum + " .acc").empty().append(inventory[itemNum]["accuracy"] + "(" + (inventory[itemNum]["accuracy"] + inventory[itemNum]["accmod"]) + ")"); //this renders accuracy of a gun
    $("#" + itemNum + " .rc").empty().append(inventory[itemNum]["rc"] + Math.ceil((attributes.current.str / 3) + 1) + "(" + (inventory[itemNum]["rc"] + inventory[itemNum]["rcmod"] + Math.ceil((attributes.current.str / 3) + 1)) + ")"); //this renders the recoil comp
    $("#" + itemNum + " .avail").empty().append(inventory[itemNum]["avail"] + " " + inventory[itemNum]["restrict"]); //this renders the avail of a gun
  }

  function augmentedStat(statModifier, classKey, item, object) {
    $("." + item + "." + classKey).empty().append("<span>" + object[item][classKey] + "(" + (object[item][classKey] + object[item][statModifier]) + ")" + "</span>");
  }

  function augmentedDamage(damageType, element, stat, damage, item, weapon) { //u=damtype, v=element, w=stat, x=damage, y=[item], z=weapon
    //@TODO - investigate how/if this works, it seems like it is checking if something DOESN'T exist, not if it does
    switch ('undefined') { //I'm so happy this works! Its a switch statement that looks to see if something exists
      case typeof weapon[item]["altammo"]:
        damnDamage(damageType, element, stat, damage, item, weapon);
        break;
      case typeof weapon[item]["altammo"][stat]:
        damnDamage(damageType, element, stat, damage, item, weapon);
        break;
      case typeof weapon[item]["altammo"][element]:
        $("." + item + "." + damage).empty().append("<span>" + (weapon[item][damage] + weapon[item][stat]) + "(" + (weapon[item][damage] + weapon[item][stat] + weapon[item]["dvmod"]) + ")" + weapon[item][damageType] + " " + weapon[item][element] + "/ " + (weapon[item]["altammo"][damage] + weapon[item][stat]) + "(" + (weapon[item]["altammo"][damage] + weapon[item][stat] + weapon[item]["dvmod"]) + ")" + weapon[item][damageType] + "</span>");
        $(".ap." + item).append("/" + weapons[item]["altammo"]["ap"]);
        break;
      default:
        $("." + item + "." + damage).empty().append("<span>" + (weapon[item][damage] + weapon[item][stat]) + "(" + (weapon[item][damage] + weapon[item][stat] + weapon[item]["dvmod"]) + ")" + weapon[item][damageType] + " " + weapon[item][element] + "/ " + (weapon[item]["altammo"][damage] + weapon[item][stat]) + "(" + (weapon[item]["altammo"][damage] + weapon[item][stat] + weapon[item]["dvmod"]) + ")" + weapon[item][damageType] + " " + weapon[item]["altammo"][element] + "</span>");
        $(".ap." + item).append("/" + weapons[item]["altammo"]["ap"]);
        break;
    }
  }

  //@TODO - check if this can be combined with some of the code above into 1 function
  function damnDamage(damageType, element, stat, damage, item, weapon) { //as if this shit wasn't stupidly complex enough.
    $("." + item + "." + damage).empty().append("<span>" + (weapon[item][damage] + weapon[item][stat]) + "(" + (weapon[item][damage] + weapon[item][stat] + weapon[item]["dvmod"]) + ")" + weapon[item][damageType] + " " + weapon[item][element] + "</span>");
  }
}

function knowledgeTypeSelect() {
  highlightSelected($(this));
  knowledgeType = $(this).attr("id");
}

function addKnowing() {
  skill = {
    name: $(".knowledgeName").val(),
    catalog: knowledgeType,
    stat: attributes.current.int,
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false,
    id: $(".knowledgeName").val().toLowerCase().replace(' ', '')
  };

  knowledgeSkills.push(skill);

  addSkillLine(skill);
}

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
        addAttMod(power["attmod"]);

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

//@TODO - rename parameter
function addLimitMod(x) {
  for (var key in x) {
    switch (x[key]) {
      case "physical":
        attributes.limitMod.phyLimitMod++;
        break;
      case "mental":
        attributes.limitMod.menLimitMod++;
        break;
      case "social":
        attributes.limitMod.socLimitMod++;
        break;

    }
  }
}

//@TODO - rename parameter
function minusLimitMod(x) {
  for (var key in x) {
    switch (x[key]) {
      case "physical":
        attributes.limitMod.phyLimitMod--;
        break;
      case "mental":
        attributes.limitMod.menLimitMod--;
        break;
      case "social":
        attributes.limitMod.socLimitMod--;
        break;

    }
  }
}

//@TODO - rename parameter
function addAttMod(x) {
  for (var key in x) {
    switch (x[key]) {
      case "body":
        attributes.augment.bod = addAugmentAtt(attributes.augment.bod);
        break;
      case "reaction":
        attributes.augment.rea = addAugmentAtt(attributes.augment.rea);
        break;
      case "agility":
        attributes.augment.agi = addAugmentAtt(attributes.augment.agi);
        break;
      case "strength":
        attributes.augment.str = addAugmentAtt(attributes.augment.str);
        break;
    }
  }
}

function addMod(skill, powerLelve) {
  if (powerLevel <= attributes.current.mag) {
    activeSkills[skill]["mod"]++;
  }
}

//@TODO rename parameters
function minusMod(x, y) {
  if (y >= 0) {
    activeSkills[x]["mod"]--;
  }
}

//@TODO rename parameters
function resetMod(x, y) {
  activeSkills[x]["mod"] -= y;
}

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

function costUpdater(x) {
  $("." + x + " .armorcost").empty().append(inventory[x]["cost"] + "&yen;");
}

function sellsign(x) {
  x.empty().append("<em>-</em>");
}

function buysign(x) {
  x.empty().append("<strong>+</strong>");
}

function addingMagMod() {
  var mod = $(this).parent().attr("class");
  var magic = $(this).parent().parent().parent().attr("class");

  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    inventory[magic]["avail"] -= inventory[magic]["maglockMods"][mod]["avail"];
    inventory[magic]["cost"] -= inventory[magic]["maglockMods"][mod]["cost"];
    nuyen += inventory[magic]["maglockMods"][mod]["cost"];
    delete inventory[magic]["maglockMods"][mod];
  } else {
    if (inventory[magic]["avail"] + maglockMod[mod]["avail"] > maxAvail) {
      return;
    }

    $(this).addClass("active");
    inventory[magic]["maglockMods"][mod] = {};

    for (var key in maglockMod[mod]) {
      inventory[magic]["maglockMods"][mod][key] = maglockMod[mod][key];
    }

    inventory[magic]["avail"] += maglockMod[mod]["avail"];
    inventory[magic]["cost"] += maglockMod[mod]["cost"];
    nuyen -= maglockMod[mod]["cost"];
  }

  $("." + magic + " .avail").empty().append(inventory[magic]["avail"]);
  $("." + magic + " .devicecost").empty().append(inventory[magic]["cost"] + "&yen;");

  nuyenUpdater();
}

//This function is for giving devices access to its mods
function enhancements(enhancements, deviceCapacity, deviceName, normalDevice) { //w==enchancements, x=device capacity, y=device name + inventory number, z=the normal device

  inventory[deviceName]["mods"] = [];
  var defaultMods = electronics[z]["mods"];
  if (typeof defaultMods !== "undefined") {
    inventory[deviceName]["mods"] = defaultMods.slice(0);
  }

  var preinstalled = inventory[deviceName]["mods"].length;

  for (var mod in inventory[deviceName]["mods"]) {
    $("." + deviceName + " .moody").append("<div class='modslot " + i + "'>" + inventory[deviceName]["mods"][mod] + "</div>");
  }

  for (var i = 0 + preinstalled; i < x + preinstalled; i++) {
    $("." + deviceName + " .moody").append("<div class='modslot " + i + "'>" + "<select class='" + inventory[deviceName]["type"] + "'></select>" + "</div>");
    inventory[deviceName]["mods"][i] = "";
  }

  for (var mod in enhancements) {
    $("." + deviceName + " .moody .modslot select").append("<option value='" + mod + "'>" + enhancements[mod]["name"] + "</option>");
    var modcap = enhancements[mod]["cap"];
    if (modcap > 1) {
      for (var i = modcap; i > 1; i--) {
        $("." + deviceName + " .moody .modslot." + (inventory[deviceName]["mods"].length - i + 1) + " option[value='" + mod + "']").prop("disabled", "disabled");
      }
    }
  }
}

//@TODO - Rename function
function microsoftStore() { //this sells the device
  var devicename = $(this).parent().attr("class");
  $("." + devicename).remove();
  nuyen += inventory[devicename]["cost"];
  if (typeof inventory[devicename]["karmaCost"] !== "undefined") {
    focinumber--;
    fociRating -= inventory[devicename]["rating"];
    karma += inventory[devicename]["rating"] * inventory[devicename]["karmaCost"];
    pointUpdater("#karmapnt", karma);
  }
  delete inventory[devicename];
  nuyenUpdater();
}

function buyProgram() {
  var device = $(this).parent().parent().parent().attr("class");
  var program = $(this).parent().attr("class");

  if (typeof programs[program] !== "undefined") {
    cost = programCost(program);
  }

  if ($(this).hasClass("agentup")) {
    if (typeof inventory[device]["programlist"]["agent"] === "undefined" && nuyen - 1000 > 0) {
      inventory[device]["programlist"]["agent"] = 1;
      nuyen -= 1000;
      inventory[device]["cost"] += 1000;
    } else if (inventory[device]["programlist"]["agent"] < 4) {
      if (inventory[device]["programlist"]["agent"] < 3 && nuyen - 1000 > 0) {
        nuyen -= 1000;
        inventory[device]["cost"] += 1000;
      } else if (inventory[device]["programlist"]["agent"] == 3 && nuyen - 5000 > 0) {
        nuyen -= 5000;
        inventory[device]["cost"] += 5000;
      } else if (inventory[device]["programlist"]["agent"] >= 4 && nuyen - 2000 > 0) {
        nuyen -= 2000;
        inventory[device]["cost"] += 2000;
      } else {
        inventory[device]["programlist"]["agent"] = 0;
      }
      inventory[device]["programlist"]["agent"]++;
      agentUpdate(device);
    }
    $("." + device + " .agentrating").empty().append(inventory[device]["programlist"]["agent"])
  } else if ($(this).hasClass("agentdown")) {
    if (inventory[device]["programlist"]["agent"] > 0) {
      inventory[device]["programlist"]["agent"]--;
      if (inventory[device]["programlist"]["agent"] < 3) {
        nuyen += 1000;
        inventory[device]["cost"] -= 1000;
      } else if (inventory[device]["programlist"]["agent"] == 3) {
        nuyen += 5000;
        inventory[device]["cost"] -= 5000;
      } else if (inventory[device]["programlist"]["agent"] > 3) {
        nuyen += 2000;
        inventory[device]["cost"] -= 2000;
      }
    }
    agentUpdate(device);
  } else if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    delete inventory[device]["programlist"][program];
    nuyen += cost;
    inventory[device]["cost"] -= cost;
  } else if (nuyen - cost > 0) {
    $(this).addClass("active");
    inventory[device]["programlist"][program] = programs[program];
    nuyen -= cost;
    inventory[device]["cost"] += cost;
  }
  $("." + device + " .devicecost").empty().append(inventory[device]["cost"] + "&yen;");
  nuyenUpdater();

  //@TODO - rename parameter
  function programCost(x) {
    cost = 0;
    if (programs[x]["category"] == "common") {
      cost = 80;
    } else {
      cost = 250;
    }
    return cost;
  }

  //@TODO - rename parameter
  function agentUpdate(x) {
    $("." + x + " .agentrating").empty().append(inventory[x]["programlist"]["agent"])
  }
}

//@TODO - camelCase function
function buylinkmod() {
  var device = $(this).parent().parent().attr("class");
  if ($(this).hasClass("simmod")) {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      inventory[device]["programlist"]["simmod"] = false;
      nuyen += 100;
      inventory[device]["cost"] -= 100;
      if (inventory[device]["programlist"]["hotsim"] == true) {
        $("." + device + " .hotsim").removeClass("active");
        inventory[device]["programlist"]["hotsim"] = false;
        nuyen += 250;
        inventory[device]["cost"] -= 250;
      }
    } else {
      $(this).addClass("active");
      inventory[device]["programlist"]["simmod"] = true;
      nuyen -= 100;
      inventory[device]["cost"] += 100;
    }
  } else if ($(this).hasClass("hotsim")) {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      inventory[device]["programlist"]["hotsim"] = false;
      nuyen += 250;
      inventory[device]["cost"] -= 250;
    } else {
      $(this).addClass("active");
      inventory[device]["programlist"]["hotsim"] = true;
      nuyen -= 250;
      inventory[device]["cost"] += 250;
      if (inventory[device]["programlist"]["simmod"] == false || typeof inventory[device]["programlist"]["simmod"] === "undefined") {
        $("." + device + " .simmod").addClass("active");
        inventory[device]["programlist"]["simmod"] = true;
        nuyen -= 100;
        inventory[device]["cost"] += 100;
      }
    }
  }
  $("." + device + " .devicecost").empty().append(inventory[device]["cost"] + "&yen;");
  nuyenUpdater();
}

function commRating() {
  if ($(this).hasClass("deact")) {
    return;
  }

  var device = $(this).parent().attr("class");

  //@TODO - figure out and rename ed
  if (typeof electronics[device] !== "undefined") {
    var ed = electronics[device]; //ed=electronic device
  } else if (typeof maglockMod !== "undefined") {
    var ed = maglockMod[device];
  }

  if (typeof ed.ratingmax === "undefined") { //if ratingmax isn't defined, then the max is 6, else its the ratingmax
    var ratingmax = 6;
  } else {
    var ratingmax = ed.ratingmax;
  }

  if ($(this).hasClass("ratingUp") && ed["avail"] < maxAvail && ed["rating"] < ratingmax) { //if this is the rating up button, up the rating of the device
    ed["rating"]++;
    ed["avail"] += ed["availx"];
    ed.cost += ed.costx;
  } else if ($(this).hasClass("ratingDown") && ed["rating"] > 1) { //else if this is the rating down device, lower the rating
    ed["rating"]--;
    ed["avail"] -= ed["availx"];
    ed.cost -= ed.costx;
  }
  $("." + device + " .commrating").empty().append(ed["rating"]);
  $("." + device + " .avail").empty().append(ed["avail"] + " " + ed["restrict"]);
  $("." + device + " .price").empty().append(ed["cost"] + "&yen;");
}

function modChange() {
  var device = $(this).parents("tr").attr("class");
  var slotNum = Number($(this).parent().attr('class').split(' ')[1]);
  var mod = $(this).val();
  var oldMod = inventory[device]["mods"][slotNum];
  console.log(oldMod);

  if (oldMod === "") {
    oldMod = "empty";
  }

  switch ($(this).attr("class")) {
    case "audio":
      var enhanceMods = audioenhancements;
      break;
    case "optics":
      var enhanceMods = visionenhancements;
      break;
  }

  if (nuyen - enhanceMods[mod]["cost"] + enhanceMods[oldMod]["cost"] < 0 || inventory[device]["avail"] + enhanceMods[mod]["avail"] - enhanceMods[oldMod]["avail"] > maxAvail) { //if the mod costs too much or changes the avail too high then change to empty and return
    $(this).val(oldMod);
    return;
  }

  if (oldMod != "") {
    nuyen += enhanceMods[oldMod]["cost"];
    inventory[device]["avail"] -= enhanceMods[oldMod]["avail"];
    inventory[device]["cost"] -= enhanceMods[oldMod]["cost"];
    multipleCapacity(oldMod, false);
  }
  multipleCapacity(mod, 'disabled');

  inventory[device]["avail"] += enhanceMods[mod]["avail"];
  inventory[device]["cost"] += enhanceMods[mod]["cost"];
  nuyen -= enhanceMods[mod]["cost"];
  inventory[device]["mods"][slotNum] = mod;

  //updates the avail and cost
  $("." + device + " .deviceavail").empty().append(inventory[device]["avail"] + inventory[device]["restrict"]);
  $("." + device + " .devicecost").empty().append(inventory[device]["cost"] + "&yen;");

  nuyenUpdater();

  //@TODO - move function
  function multipleCapacity(mod, disable) {
    var cap = enhanceMods[mod]["cap"];
    if (cap > 1) {
      for (var i = 1; i < cap; i++) {
        var nextslot = ("." + device + " .modslot." + (slotNum + i) + " select");
        if ($(nextslot).val() != "empty") {
          console.log(enhanceMods[$(nextslot).val()]["cost"]);
          nuyen += enhanceMods[$(nextslot).val()]["cost"];
          inventory[device]["cost"] -= enhanceMods[$(nextslot).val()]["cost"];
          inventory[device]["mods"][slotNum + i] = "empty";
          $(nextslot).val("empty");
        }

        $(nextslot).prop('disabled', disable);
      }
    }
  }
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

function typeOfLimb() {
  var limb = $(this).parents("tr").attr("class");
  var limbType = $("." + limb + " .type select").val();
  var selectLimb = $(this).val();
  switch (selectLimb) {
    case "used":
    case "standard":
    case "alpha":
    case "beta":
    case "delta":
      augmentations[limbType][limb]["cost"] /= augmentations["grade"][augmentations[limbType][limb]["grade"]]["cost"];
      augmentations[limbType][limb]["cost"] *= augmentations["grade"][selectLimb]["cost"];
      augmentations[limbType][limb]["essence"] /= augmentations["grade"][augmentations[limbType][limb]["grade"]]["ess"];
      augmentations[limbType][limb]["essence"] *= augmentations["grade"][selectLimb]["ess"];
      augmentations[limbType][limb]["avail"] -= augmentations["grade"][augmentations[limbType][limb]["grade"]]["avail"];
      augmentations[limbType][limb]["avail"] += augmentations["grade"][selectLimb]["avail"];
      augmentations[limbType][limb]["grade"] = selectLimb;
    case "obvious":
    case "synthetic":
      $("." + limb + " .limb").empty().append(augmentations[limbType][limb]["name"]);
      $("." + limb + " .grade select").val(augmentations[limbType][limb]["grade"]);
      $("." + limb + " .str").empty().append(augmentations[limbType][limb]["str"]);
      $("." + limb + " .agi").empty().append(augmentations[limbType][limb]["agi"]);
      $("." + limb + " .cap").empty().append(augmentations[limbType][limb]["capmax"]);
      $("." + limb + " .avail").empty().append(augmentations[limbType][limb]["avail"]);
      $("." + limb + " .ess").empty().append(Math.round(augmentations[limbType][limb]["essence"] * 1000) / 1000);
      $("." + limb + " .price").empty().append(augmentations[limbType][limb]["cost"] + "&yen;");
      break;
  }
}

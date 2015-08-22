function setupSpells() {
  for (var spell in spellforms) {
    var spellhold = spellforms[spell];
    if (spellforms[spell]["category"] == "combat") {
      $(".spells.combat").after($("<tr id='" + spell + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='direct " + spell + "'></td><td class='element " + spell + "'>" + spellhold["element"] + "</td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldam " + spell + "'>" + spellhold["damage"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>"));
      if (spellhold["direct"] == true) {
        $("<span>Direct</span>").appendTo($(".direct." + spell));
      } else {
        $("<span>Indirect</span>").appendTo($(".direct." + spell));
      }
    }

    if (spellforms[spell]["category"] == "detection") {
      $(".spells.detection").after($("<tr id='" + spell + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='illact " + spell + "'>" + spellhold["active"] + "</td><td class='direction " + spell + "'>" + spellhold["direction"] + "</td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>"));
    }

    if (spellforms[spell]["category"] == "health") {
      $(".spells.health").after($("<tr id='" + spell + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='heaEss " + spell + "'></td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>"));
      if (spellhold["essence"] == true) {
        $(".heaEss." + spell).append($("<span>Essence</span>"));
      } else {
        $(".heaEss." + spell).append($("<span>n/a</span>"));
      }
    }

    if (spellforms[spell]["category"] == "illusion") {
      $(".spells.illusion").after($("<tr id='" + spell + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='realistic " + spell + "'></td><td class='sense " + spell + "'>" + spellhold["sense"] + "</td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>"));
      if (spellhold["realistic"] == true) {
        $(".realistic." + spell).append($("<span>Realistic</span>"))
      } else {
        $(".realistic." + spell).append($("<span>Obvious</span>"))
      }
    }

    if (spellforms[spell]["category"] == "manipulation") {
      $(".spells.manipulation").after($("<tr id='" + spell + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='effect " + spell + "'>" + spellhold["effect"] + "</td><td class='damage " + spell + "'>" + spellhold["damage"] + "</td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>"));
    }
  }

  spellinput(" ", "detectlifeform", "Life Form");
  spellinput(" Extended", "detectlifeformextended", "Life Form");
  spellinput(" ", "detectobject", "Object");

  //@TODO - organize functions and logic
  spellAttributeSelect("decreaseattribute", "Decrease ");
  spellAttributeSelect("increaseattribute", "Increase ");
}

function spellinput(x, y, z) { //so people can input their own detection spells
  $(".spellname." + y).empty().append($("<span>Detect " + "<input type='text' class='" + y + "' placeholder='" + z + "'>" + x + "</span>"));
}

function spellAttributeSelect(className, text) { //so people can select which attribute is used for the increase/decrease spells
  $(".spellname." + className).empty().append($("<span>" + text + "<select class=" + className + "><option value=''>[Attribute]</option><option value='Body'>Body</option><option value='Agility'>Agility</option><option value='Reaction'>Reaction</option><option value='Strength'>Strength</option><option value='Will'>Will</option><option value='Logic'>Logic</option><option value='Intuition'>Intuition</option><option value='Charisma'>Charisma</option></select>" + "</span>"))
}

function spellActivate() { //this is used to turn of add spells and alchemical preparations
  var spell = spellforms[$(this).parent().attr("id")];

  switch (spell["name"]) {
    case "Detect [Life Form]":
      customDetectSpell($("input.detectlifeform").val(), " ", "detectlifeform");
      break;
    case "Detect [Life Form], Extended":
      customDetectSpell($("input.detectlifeformextended").val(), "extended", "detectlifeformextended");
      break;
    case "Detect [Object]":
      customDetectSpell($("input.detectobject").val(), " ", "detectobject");
      break;
    case "Decrease [Attribute]":
      customAttributeSpell($("select.decreaseattribute").val(), "decreaseattribute", "Decrease ");
      break;
    case "Increase [Attribute]":
      customAttributeSpell($("select.increaseattribute").val(), "increaseattribute", "Increase ");
      break;
    default:
      //if the spell isn't one of those three, then do this
      if ($(this).hasClass("active")) { //if the spell has already been activated, then do this
        deactivate($(this)); //remove the active class, and change the + to a -
        if ($(this).hasClass("spellact")) { //is this a spell? then turn it off
          spell["spell"] = false;
        } else { //Well, if its not a spell, then its a preporation, and then turn that off
          spell["preporation"] = false;
        }
        spells++; //return spell points to buy more spells
      } else { //If the spell isn't on, then its off, so do this stuff
        if (spells > 0) { //do you have spell points to buy more spells?
          activate($(this)); //Then add the active class and replace the - with a +
          if ($(this).hasClass("spellact")) { //was it the spell you clicked? then turn it on
            spell["spell"] = true;
          } else { //if its not a spell, then its a preporation
            spell["preporation"] = true;
          }
          spells--;
        }
      }
      break;
  }
  displayUpdater(); //update the renderer, which will update the spell points to the new total

  //@TODO - move outside of parent function
  //@TODO - rename parameters
  function customDetectSpell(x, y, z) {
    if (x == "" || typeof spellforms["detect" + x + y] != 'undefined') {
      return;
    }

    //sets all the values for the new spellform object
    spellforms["detect" + x + y] = {
      name: "Detect " + x + " " + y,
      category: "detection",
      spell: false,
      preparation: false,
      active: "active",
      direction: spellforms[z]["direction"],
      type: spellforms[z]["type"],
      range: "T",
      duration: "Sustain",
      drain: spellforms[z]["drain"]
    };

    spellhold = spellforms["detect" + x + y]; //short hand, because typing all that junk was annoying
    var spell = "detect" + x + y;
    $("#" + z).after($("<tr id='" + spell + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='illact " + spell + "'>" + spellhold["active"] + "</td><td class='direction " + spell + "'>" + spellhold["direction"] + "</td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>")); //Add the spell to the list on the DOM after where it was entered
  }

  //@TODO - move outside of parent function
  //@TODO - rename parameters
  function customAttributeSpell(x, y, z) {
    if (x == "" || typeof spellforms[z + x] != 'undefined') {
      return;
    }

    //sets all the values for the new spellform object
    spellforms[z + x] = {
      name: z + " " + x,
      category: "health",
      spell: false,
      preparation: false,
      essence: "Essence",
      type: spellforms[y]["type"],
      range: "T",
      duration: "Sustain",
      drain: spellforms[y]["drain"]
    };

    spellhold = spellforms[z + x]; //short hand, because typing all that junk was annoying
    var spell = y;

    //Add the spell to the list on the DOM after where it was entered
    $("#" + y).after($("<tr id='" + z + x + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='heaEss " + spell + "'>" + spellhold["essence"] + "</td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>"));
  }
}

function spellChange() {
  electronics[$(this).parents("tr").attr("class")]["magicType"] = $(this).val();
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
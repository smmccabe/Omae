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
    }; //sets all the values for the new spellform object
    spellhold = spellforms["detect" + x + y] //short hand, because typing all that junk was annoying
    var spell = "detect" + x + y;
    $("#" + z).after($("<tr id='" + spell + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='illact " + spell + "'>" + spellhold["active"] + "</td><td class='direction " + spell + "'>" + spellhold["direction"] + "</td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>")); //Add the spell to the list on the DOM after where it was entered
  }

  //@TODO - move outside of parent function
  //@TODO - rename parameters
  function customAttributeSpell(x, y, z) {
    if (x == "" || typeof spellforms[z + x] != 'undefined') {
      return;
    }

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
    }; //sets all the values for the new spellform object
    spellhold = spellforms[z + x] //short hand, because typing all that junk was annoying
    var spell = y;
    $("#" + y).after($("<tr id='" + z + x + "' class='" + spellhold["category"] + "'><td class='spellact " + spell + " button'><strong>-</strong></td><td class='prepact " + spell + " button'><strong>-</strong></td><td class='spellname " + spell + "'>" + spellhold["name"] + "</td><td class='heaEss " + spell + "'>" + spellhold["essence"] + "</td><td class='spelltype " + spell + "'>" + spellhold["type"] + "</td><td class='spellrange " + spell + "'>" + spellhold["range"] + "</td><td class='spelldur " + spell + "'>" + spellhold["duration"] + "</td><td class='drain " + spell + "'>" + spellhold["drain"].toString() + "</td></tr>")); //Add the spell to the list on the DOM after where it was entered

  }
}

function spellChange() {
  electronics[$(this).parents("tr").attr("class")]["magicType"] = $(this).val();
}
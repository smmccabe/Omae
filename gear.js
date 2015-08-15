function setupGear() {
  $(".melee.label").appendTo($(".meleeweapon")); //this labels the melee weapons, but I have a function that does this, so i'm stupid for not using that function

  //this pulls the weapons stats from the weapons object to populate the page
  for (var item in weapons) {
    var itemhold = weapons[item];

    switch (itemhold.category) {
      case "blades":
      case "clubs":
      case "unarmedcombat":
      case "exoticmeleeweapon":
        //this one populates the melee weapons
        $(".meleeweapon." + itemhold.category).after("<tr id='" + item + "'><td class='weapact " + item + " button'><strong>+</strong></td><td class='weapname " + item + "'>" + itemhold["name"] + "</td><td class='accuracy " + item + "'>" + itemhold["accuracy"] + "(" + (itemhold["accuracy"] + itemhold["accmod"]) + ")" + "</td><td class='reach " + item + "'>" + itemhold["reach"] + "(" + (itemhold["reach"] + reachmod) + ")" + "</td><td class='damage " + item + "'>" + (itemhold["stat"] + itemhold["damage"]) + "(" + (itemhold["stat"] + itemhold["damage"] + itemhold["dvmod"]) + ")" + itemhold["damtype"] + " " + itemhold["element"] + "</td><td class='ap " + item + "'>" + itemhold["ap"] + "</td><td class='avail " + item + "'>" + itemhold["avail"] + " " + itemhold["restrict"] + "</td><td class='cost " + item + "'>" + itemhold["cost"] + "&#65509" + "</td><td>" + itemhold.ref.book + " p" + itemhold.ref.page + "</td></tr>")
        break;
      case "bow":
      case "crossbow":
      case "throwingweapons":
        //this one populates the projectiles
        $(".projectiles." + itemhold.category).after("<tr id='" + item + "'><td class='weapact " + item + " button'><strong>+</strong></td><td class='incAtt " + item + " weaprating'>+</td><td class='weaprating " + item + " weapratingnum'>" + itemhold["rating"] + "</td><td class='decAtt " + item + " weaprating'>-</td><td class='weap accuracy " + item + "'>" + itemhold["arruracy"] + "</td><td class='weap damage " + item + "'>" + itemhold["damage"] + "</td><td class='weap ap " + item + "'>" + itemhold["ap"] + "</td><td class='weap avail " + item + "'>" + itemhold["avail"] + "</td><td class='weap cost " + item + "'>" + itemhold["cost"] + "</td><td>" + itemhold.ref.book + " p" + itemhold.ref.page + "</td></tr>");
        break;
      default:
        //firearms
        $(".firearms." + itemhold.category).after("<tr id='" + item + "'><td class='weapact " + item + " button'><strong>+</strong></td><td class='weapname " + item + "'>" + itemhold["name"] + "</td><td class='accuracy " + item + "'>" + itemhold["accuracy"] + "(" + (itemhold["accuracy"] + itemhold["accmod"]) + ")" + "</td><td class='damage " + item + "'>" + itemhold["damage"] + "(" + (itemhold["damage"] + itemhold["dvmod"]) + ")" + itemhold["damtype"] + " " + itemhold["element"] + "</td><td class='ap " + item + "'>" + itemhold["ap"] + "</td><td class='modes " + item + "'></td><td class='RC " + item + "'>" + itemhold["rc"] + "</td><td class='ammo " + item + " clip'>" + itemhold["ammo"] + " " + itemhold["clip"] + "</td><td class='avail " + item + "'>" + itemhold["avail"] + " " + itemhold["restrict"] + "</td><td class='cost " + item + "'>" + itemhold["cost"] + "&#65509" + "</td></tr>");
        break;
    }

    var modeCount = 0;
    for (var firemode in itemhold.mode) {
      var modeContainer = $(".modes." + item);

      if (modeCount > 0) {
        modeContainer.append(", ");
      }

      modeContainer.append(itemhold.mode[firemode]);

      modeCount++;
    }

    for (var diffAmmo in itemhold["altammo"]) {
      switch (diffAmmo) {
        case "ammo":
          $("." + diffAmmo + "." + item).after("/" + itemhold["altammo"][diffAmmo]);
          break;
        case "clip":
          $("." + diffAmmo + "." + item).after(" " + itemhold["altammo"][diffAmmo]);
          break;
      }
    }
    if (itemhold["avail"] > maxAvail) {
      $(".weapact." + item).addClass("deact").empty().append("<span>-</span>");
    }
  }
  $(".projectiles.crossbow,#shuriken").find(".weaprating").remove(); //this removes the rating information for the crossbows, because crossbows don't have ratings
}

function setupAmmo() {
  //adding ammo details below
  $(".ammo.label").appendTo(".ammunition");

  for (var ammo in ammunition) {
    var ammotype = ammunition[ammo];

    switch (ammotype["class"]) {
      case "taserammo":
      case "specialammo":
      case "cannonammo":
        abnormalAmmo(ammotype, ammo);
        break;
      case "grenades":
        explosivesAmmo("grenadeammo", ammotype);
        break;
      case "rockets":
        explosivesAmmo("rocketammo", ammotype);
        break;
      case "none":
        $(".standard.ammunition").after("<tr class='" + ammo + "'><td class='buyammo button'><strong>+</strong></td><td class='amountofammo'>0</td><td class='sellammo button'><em>-</em></td><td class='ammoname'>" + ammotype["name"] + "</td><td class='dammod'>" + ammotype["dammod"] + " " + ammotype["typemod"] + " " + ammotype["elemod"] + "</td><td class='apmod'>" + ammotype["apmod"] + "</td><td class='avail'>" + ammotype["avail"] + " " + ammotype["restrict"] + "</td><td class='cost'>" + ammotype["cost"] + "&#65509</td><td class='blast'></td></tr>");
        break;
    }

    if (ammotype["avail"] > maxAvail) {
      $("." + ammo + " .button").addClass("deact");
    }
  }

  function explosivesAmmo(catalog, type) {
    $("." + catalog).after("<tr class='ammo'><td class='buygrenades button'><strong>+</strong></td><td class='amountofammo'>0</td><td class='sellgrenades button'><em>-</em></td><td class='grenadesname'>" + type["name"] + "</td><td class='grenadesdammod'>" + type["dammod"] + " " + type["typemod"] + " " + type["elemod"] + "</td><td class='apmod'>" + type["apmod"] + "</td><td class='avail'>" + type["avail"] + " " + type["restrict"] + "</td><td class='cost'>" + type["cost"] + "&#65509</td><td class='blast'>" + type["blast"] + "</td></tr>");
  }

  function abnormalAmmo(x, y) {
    $("." + x["class"]).after("<tr class='ammo'><td class='buyammo button'><strong>+</strong></td><td class='amountofammo'>0</td><td class='sellammo button'><em>-</em></td><td class='ammoname'>" + x["name"] + "</td><td class='dammod'>" + x["dammod"] + x["typemod"] + " " + x["elemod"] + "</td><td class='apmod'>" + x["apmod"] + "</td><td class='avail'>" + x["avail"] + " " + x["restrict"] + "</td><td class='cost'>" + x["cost"] + "&#65509</td><td class='blast'></td></tr>");
  }

  $(".gas .grenadesname").empty().append("<select class='toxicgas'></select>");

  for (var dose in toxin) {
    if (toxin[dose]["avail"] <= maxAvail) {
      $(".toxicgas").append("<option value='" + dose + "'>" + toxin[dose]["name"] + "</option>")
    }
  }

  $(".holdoutammo .tracer, .lightammo .tracer, .heavyammo .tracer, .sniperammo .tracer, .shotgunammo .tracer").remove();

  for (var bomb in explosives) {
    $("." + bomb + ".explosives").after("<tr class='" + bomb + "'><td class='buybomb button'><strong>+</strong></td><td class='bombup button'>+</td><td class='explosiverating'>" + explosives[bomb]["rating"] + "</td><td class='bombdown button'>-</td><td>" + explosives[bomb]["avail"] + " " + explosives[bomb]["restrict"] + "</td><td class='bombbond'>" + explosives[bomb]["cost"] + "&#65509;</td></tr>");
  }
  $(".detonator").after("<tr><td class='buyDet button'>+</td><td class='caps'>0</td><td class='sellDet button'>-</td><td>" + detonator.avail + " " + detonator.restrict + "</td><td>" + detonator.cost + "&#65509;</td></tr>");

  $(".commercial .bombup,.commercial .bombdown, .plastic .buybomb").addClass("deact");
  $(".plastic .buybomb").empty().append("-");
}

function setupElectronics() {
  for (var devicename in electronics) { //this populates the electronic devices
    var device = electronics[devicename];
    switch (device.type) {
      case "commlink":
        $("#links").after("<tr class='" + devicename + "'><td class='buydevice button'><strong>+</strong></td><td>" + device["model"] + "</td><td>" + device["device"] + "</td><td>" + device["avail"] + "</td><td>" + device["cost"] + "&yen;</td></tr>");
        break;
      case "deck":
        $("#decks").after("<tr class='" + devicename + "'><td class='buydevice button'><strong>+</strong></td><td>" + device["model"] + "</td><td>" + device["device"] + "</td><td>" + device["array"] + "</td><td>" + device["programs"] + "</td><td>" + device["avail"] + " " + device["restrict"] + "</td><td>" + device["cost"] + "&yen;</td></tr>");
        break;
      case "rcc":
        $("#consoles").after("<tr class='" + devicename + "'><td class='buydevice button'><strong>+</strong></td><td>" + device["model"] + "</td><td>" + device["device"] + "</td><td>" + device["dataprocess"] + "</td><td>" + device["firewall"] + "</td><td>" + device["avail"] + " " + device["restrict"] + "</td><td>" + device["cost"] + "&yen;</td></tr>");
        break;
      case "accessory":
        $("#eccessories").append("<tr class='" + devicename + "'><td class='buydevice button'><strong>+</strong></td><td>" + device["name"] + "</td><td>" + device["device"] + "</td><td>" + device["avail"] + "</td><td>" + device["cost"] + "&yen;</td></tr>");
        break;
      case "rfid":
        $('#rfid').append("<tr class='" + devicename + "'><td class='buyUp button'><strong>+</strong></td><td class='numrfid'>0</td><td class='sellDown button'><em>-</em></td><td>" + device["name"] + "</td><td>" + device["device"] + "</td><td>" + device["avail"] + " " + device.restrict + "</td><td>" + device["cost"] + "&yen;</td></tr>");
        break;
      case "credsticks":
        $('#credsticks').append("<tr class='" + devicename + "'><td class='buydevice button'><strong>+</strong></td><td>" + device["name"] + "</td><td>" + device["maxvalue"] + "</td><td>" + device["avail"] + " " + device.restrict + "</td><td>" + device["cost"] + "&yen;</td></tr>");
        break;
      case "identification":
        $('#identification').append("<tr class='" + devicename + "'><td class='buydevice button'><strong>+</strong></td><td class='ratingUp button'>+</td><td class='commrating'>1</td><td class='ratingDown button'>-</td><td>" + device["name"] + " <input type='text' class='fakename' placeholder='For?'>" + "</td><td class='avail'>" + device["avail"] + " " + device.restrict + "</td><td class='price'>" + device["cost"] + "&yen;</td></tr>");
        break;
      case "tools":
        $('#tools').append("<tr class='" + devicename + "'><td class='buydevice button'><strong>+</strong></td><td>" + "<input type='text' class='toolname' placeholder='Skill name'> " + device["name"] + "</td><td>" + device["avail"] + " " + device.restrict + "</td><td>" + device["cost"] + "&yen;</td></tr>");
        break;
      case "restraints":
        $('#restraints').append("<tr class='" + devicename + "'><td class='buyUp button'><strong>+</strong></td><td class='numrfid'>0<td class='sellDown'><em>-</em></td></td><td>" + device["name"] + "</td><td>" + device.armor + "</td><td>" + device.structure + "</td><td>" + device["avail"] + " " + device.restrict + "</td><td>" + device["cost"] + "&yen;</td></tr>");
        break;
      case "chemicals":
        $('#chemicals').append("<tr class='" + devicename + "'><td class='buydevice button'><strong>+</strong></td><td>" + device["name"] + "</td><td>" + device["avail"] + " " + device.restrict + "</td><td>" + device["cost"] + "&yen;</td></tr>");
        break;
      case "grapplegungear":
        $('#grapplegungear').append("<tr class='" + devicename + "'><td class='buydevice button'><strong>+</strong></td><td>" + device["name"] + "</td><td>" + device["avail"] + " " + device.restrict + "</td><td>" + device["cost"] + "&yen;</td></tr>");
        break;
      case "grapplerope":
      case "docwagon":
      case "reagents":
        bulkBuyGear(device, devicename);
        break;
      case "communications":
      case "optics":
      case "audio":
      case "securitydevice":
      case "bnegear":
      case "survivalgear":
      case "biotech":
      case "slappatches":
      case "enchantingfoci":
      case "metamagicfoci":
      case "powerfoci":
      case "magicallodgematerials":
        ratingGear(device, devicename);
        break;
      case "qifoci":
        ratingGear(device, devicename);
        $("#" + device.type + " ." + devicename + " .name").after("<td class='adeptPowers'><select></select></td>");
        for (var power in adeptPowers) {
          $("#" + device.type + " ." + devicename + " .adeptPowers select").append("<option value='" + power + "'>" + adeptPowers[power]["name"] + "</option>");
        }
        ;
        break;
      case "spellfoci":
        ratingGear(device, devicename);
        $("#" + device.type + " ." + devicename + " .name").after("<td class='magicType'><select></select></td>");
        if (devicename != "ritualspellcastingfocus") {
          for (var spellCat in spellType) {
            $("#" + device.type + " ." + devicename + " .magicType select").append("<option value='" + spellType[spellCat] + "'>" + spellType[spellCat] + "</option>");
          }
          ;
        } else {
          for (var spellCat in ritualKeywords) {
            $("#" + device.type + " ." + devicename + " .magicType select").append("<option value='" + ritualKeywords[spellCat] + "'>" + ritualKeywords[spellCat] + "</option>");
          }
          ;
        }

        break;
      case "spiritfoci":
        ratingGear(device, devicename);
        $("#" + device.type + " ." + devicename + " .name").after("<td class='magicType'><select></select></td>");
        for (var spirit in spiritType) {
          $("#" + device.type + " ." + devicename + " .magicType select").append("<option value='" + spiritType[spirit] + "'>" + spiritType[spirit] + "</option>");
        }
        ;
        break;
    }

    if (device["avail"] > maxAvail) {
      $("." + devicename + " .buydevice").addClass("deact").empty().append("-");
    }
    if (typeof device.rating === "undefined") {
      $("." + devicename + " .commrating").empty().append("n/a");
    }
    if (typeof device.availx === "undefined") {
      $("." + devicename + " .ratingUp,." + devicename + " .ratingDown").addClass("deact");
    }
  }
}

function setupArmor() {
  for (var type in armor) {
    $("#clotharmor #bodyarmor tbody").append("<tr class='" + type + "'><td class='buyarmor button'><strong>+</strong></td><td>" + armor[type]["name"] + "</td><td>" + armor[type]["armor"] + "</td><td>" + armor[type]["avail"] + " " + armor[type]["restrict"] + "</td><td>" + armor[type]["cost"] + "&#65509;</td></tr>");
    if (armor[type]["avail"] > maxAvail) {
      $("." + type + " .buyarmor").addClass("deact").empty().append("-");
    }
  }
}

function ratingGear(device, deviceName) {
  $('#' + device.type).append("<tr class='" + deviceName + "'><td class='buydevice button'><strong>+</strong></td><td class='ratingUp button'>+</td><td class='commrating'>" + device.rating + "</td><td class='ratingDown button'>-</td><td class='name'>" + device.name + "</td><td class='avail'>" + device.avail + " " + device.restrict + "</td><td class='price'>" + device.cost + "&yen;</td></tr>");
}

function bulkBuyGear(device, deviceName) { //x=device, y=devicename
  $('#' + device.type).append("<tr class='" + deviceName + "'><td class='buyUp button'><strong>+</strong></td><td class='numrfid'>0</td><td class='sellDown button'><em>-</em></td><td>" + device.name + "</td><td>" + device.avail + " " + device.restrict + "</td><td>" + device.cost + "&yen;</td></tr>");
}

function buyWeapon() {
  if ($(this).hasClass("deact")) {
    return;
  }

  var itemhold = weapons[$(this).parent().attr("id")];
  var item = $(this).parent().attr("id");
  var itemNum = item + invNum;
  var gotMoney = nuyen - itemhold["cost"] > 0;
  inventory[itemNum] = {}; //this creates a blank object for the weapon's stats to be added too

  for (var key in itemhold) {
    if (key == "mods") { //when we get to the key called mods in the weapon, do this
      inventory[itemNum][key] = {}; //make a blank key for the mod
      for (var subkey in itemhold[key]) { //this creates a section for the mods for each instance of a gun, so gun instances don't end up sharing all the same mods
        inventory[itemNum][key][subkey] = itemhold[key][subkey];
      }
    } else {
      inventory[itemNum][key] = itemhold[key];
    }
  }

  inventory[itemNum]["active"] = true;

  if ($(this).closest(".meleeweapon").hasClass("meleeweapon") && gotMoney) {
    $("#" + item).after("<tr id='" + itemNum + "'><td class='sell button'><em>-</em></td><td>" + itemhold["name"] + "</td><td class='inventory " + item + itemNum + "' colspan=5></td><td class='custWeapPrice'>" + itemhold["cost"] + "&#65509</td></tr>");
    if (attributes.current.mag > 0) {
      inventory[itemNum]["weaponfoci"] = 0;
      $("<td class='label'>Weapon Focus</td><td class='" + itemNum + " incAtt weaponfoci'>+</td><td class='focirating weaponfoci'>0</td><td class='" + itemNum + " decAtt weaponfoci'>-</td>").appendTo($(".inventory." + item + itemNum));
    }

    buyingItem(itemhold);
  }

  if ($(this).hasClass("bow") && gotMoney) { //buying bows
    addingArrows(7, "#bow", item, itemNum, "Arrows");
    buyingItem(itemhold);
  }

  if ($(this).closest(".crossbow").hasClass("crossbow") && gotMoney) { //buying crossbows
    addingArrows(4, "#" + item, item, itemNum, "Bolts");
    buyingItem(itemhold);
  }

  if ($(this).hasClass("shuriken") && gotMoney) { //buying throwing weapons
    inventory[itemNum]["arrow"] = 1;
    $("#shuriken").after("<tr id='" + itemNum + "'><td class='sell button'><em>-</em></td><td class='inventory " + item + itemNum + "' colspan=4></td><td class='custWeapPrice'></td></tr>");
    $(".inventory." + item + itemNum).append("<td class='label'>Shuriken/Throwing Knives</td><td class='" + itemNum + " incAtt arrow'>+</td><td class='arrowNum arrow'>1</td><td class='" + itemNum + " decAtt arrow'>-</td>");
    buyingItem(itemhold);
  }

  licenseDP(itemNum, item, itemhold, ""); //adds license and dice pool

  if ($(this).closest(".firearms").hasClass("firearms") && gotMoney) { //this adds firearms
    $("#" + item).after("<tr id='" + itemNum + "' class='invName'><td class='sell button'><em>-</em></td><td class='inventory " + item + itemNum + "' colspan=8></td><td class='custWeapPrice'></td></tr>");
    buyingItem(itemhold); //this takes money out of the nuyen, so buys the item

    $(".inventory." + item + itemNum).append("<tr class='mounts'></tr>"); //this adds the area for the gun mounts
    var acctarget = ".inventory." + item + itemNum + " .mounts";
    $(acctarget).append("<tr><td class='label'>Top</td><td class='label'>Barrel</td><td class='label'>Under</td></tr>");
    $(acctarget).append("<tr><td class='topmount " + itemNum + "'>n/a</td><td class='barrelmount " + itemNum + "'>n/a</td><td class='underbarrel " + itemNum + "'>n/a</td></tr>");

    topMount(item, itemNum);
    barrelMount(item, itemNum);
    bottomMount(item, itemNum);
    holsterAddOn(itemhold, itemNum, item);

    $(".inventory." + item + itemNum).append("<tr class='accessories'></tr>"); //this is where nonmount accessories go

    acctarget = ".inventory." + item + itemNum + " .accessories"; //makes targetting accessories eaiser
    $(acctarget).append("<tr class='nonmounts " + itemNum + "'></tr>"); //puting a row in a row breaks the normal table

    var nonmount = ".nonmounts." + itemNum;
    if (itemhold.avail + 2 <= maxAvail || itemhold.mods.internalsmart == "Smartgun") { //adding a internal smartgun increaes avail, this doesn't go over 12
      $(nonmount).append("<td class='label'>Internal Smartgun</td><td class='smartgun " + itemNum + " button'>+</td>");
    }

    if (itemhold.mods.internalsmart == "Smartgun") { //if the gun already has an internal smartgun system, this prevents people from adding another one
      $(".smartgun." + itemNum).addClass("deact active").empty().append("-");
    }

    var skillcheck = itemhold.skill;
    if (itemhold.category == "assaultrifles" || skillcheck == "longarms" || skillcheck == "heavyweapons") { //add shockpad to some guns
      $(nonmount).append("<td class='label'>Shock Pad</td><td class='shockpad " + itemNum + " button'>+</td>");
    }

    if (itemhold.damtype == "Grenade" || itemhold.damtype == "Missile") { //adds airburst link to explosive weapons
      $(nonmount).append("<td class='label'>Airburst Link</td><td class='airburstlink " + itemNum + " button'>+</td>");
    }

    if (itemhold.mods.integral != "n/a") { //adds accessories that are already built in to the smartgun
      $(nonmount).append("<td class='label'>Integral</td><td class='integral " + itemNum + " active' colspan=2>" + itemhold["mods"]["integral"] + "</td>")
    }

    $(nonmount).after("<table><tr class='options'></tr></table>"); //adds a new table so that the clip and fake licenses don't get all stretched out
    if (itemhold.clip == "Clip") { //adds spare clips
      addClips(itemNum, item, "Clips");
    } else if (itemhold.clip == "Detachable Cylinder" || itemhold.clip == "Cylinder") { //add speed loader for revolvers
      addClips(itemNum, item, "Speed Loader");
    }

    licenseDP(itemNum, item, itemhold, " .options"); //add license and dicepool

    $(".inventory." + item + itemNum + " .options .labelDP").before("<td class='label'>Acc</td><td class='acc " + itemNum + "'>" + itemhold.accuracy + "(" + (itemhold.accuracy + itemhold.accmod) + ")" + "</td><td class='label'>RC</td><td class='rc " + itemNum + "'>" + itemhold.rc + Math.ceil((attributes.current.str / 3) + 1) + "(" + (itemhold.rc + itemhold.rcmod + Math.ceil((attributes.current.str / 3) + 1)) + ")" + "</td>");
    $(".inventory." + item + itemNum + " .options").append("<td class='label'>Avail</td><td class='avail " + itemNum + "'>" + itemhold.avail + " " + itemhold.restrict + "</td>");
  }

  invNum++;
  displayUpdater();
}

//@TODO - rename parameters
function addClips(x, y, z) {
  inventory[itemNum]["extraclips"] = 0;
  $("<td class='label'>" + z + "</td><td class='" + x + " incAtt extraclips'>+</td><td class='numofclips extraclips'>0</td><td class='" + x + " decAtt extraclips'>-</td>").appendTo($(".inventory." + y + x + " .options"));
}

function holsterAddOn(itemHold, itemNum, item) { //x=itemhold, y=itemNum,z=item
  var check = itemHold["category"];
  if (check == "lightpistols" || check == "tasers" || check == "holdouts") { //checks to see if small arms to use arm sldder
    makeHolster(itemNum, item);
    $(".holster." + itemNum).append("<td class='concealableholster " + itemNum + " button'>Concealable Holster</td><td class='hiddenarmslide " + itemNum + " button'>Hidden Arm Slide</td><td class='quickdrawholster " + itemNum + " button'>Quick-draw Holster</td>");
  };
  if (check == "heavypistols" || check == "machinepistols") { //checks to see if larger small arms that can use holsters that are not arm slider
    makeHolster(itemNum, item);
    $(".holster." + itemNum).append("<td class='concealableholster " + itemNum + " button'>Concealable Holster</td><td class='quickdrawholster " + itemNum + " button'>Quick-draw Holster</td>");
  }
}

//@TODO - rename parameters
function makeHolster(y, z) { //adds the stuff to make the holsters
  $(".inventory." + z + y).append("<tr class='holsters " + y + "'></tr>");
  $(".holsters." + y).append("<tr class='holster " + y + "'><td class='label'>Holster</td></tr>");
}

//@TODO - rename parameters
function licenseDP(x, y, z, l) {
  if (z["restrict"] == "Restricted") { //if restricted add the ability to buy a fake license
    inventory[x]["license"] = 0;
    $("<td class='label'>Fake License</td><td class='" + x + " incAtt license'>+</td><td class='licenserating license'>0</td><td class='" + x + " decAtt license'>-</td>").appendTo($(".inventory." + y + x + l));
  }
  $("<td class='labelDP label'>DP</td><td class='weaponDP'>" + (activeSkills[inventory[x]["skill"]]["rating"] + activeSkills[inventory[x]["skill"]]["stat"] + activeSkills[inventory[x]["skill"]]["mod"]) + "</td>").appendTo($(".inventory." + y + x + l));

}

//@TODO - rename parameters
function topMount(x, y) {
  if (weapons[x]["mods"]["top"] == "empty") {
    $(".topmount." + y).empty().append("<select><option value='empty'>Empty</option><option value='Laser Sight'>Laser Sight</option><option value='Imaging Scope'>Imaging Scope</option><option value='Periscope'>Periscope</option><option value='Smartgun'>Smartgun</option></select>");
  }
}

//@TODO - rename parameters
function barrelMount(x, y) {
  if (weapons[x]["mods"]["barrel"] == "empty") {
    $(".barrelmount." + y).empty().append("<select><option value='empty'>Empty</option><option value='Gas Vent 1'>Gas Vent System 1</option><option value='Gas Vent 2'>Gas Vent System 2</option><option value='Gas Vent 3'>Gas Vent System 3</option><option value='Silencer'>Silencer</option></select>");
  }
}

//@TODO - rename parameters
function bottomMount(x, y) {
  if (weapons[x]["mods"]["under"] == "empty") {
    $(".underbarrel." + y).empty().append("<select><option value='empty'>Empty</option><option value='Laser Sight'>Laser Sight</option><option value='Bipod'>Bipod</option><option value='Smart Firing Platform'>Smart Firing Platform</option><option value='Smartgun'>Smartgun</option><option value='Tripod'>Tripod</option></select>");
    if (weapons[x]["skill"] == "heavyweapons" || weapons[x]["category"] == "assaultrifles") {
      $(".underbarrel." + y + " select").append("<option value='Gyro Mount'>Gyro Mount</option>");
    }
  }
}

function addingArrows(columns, target, weapon, weaponNumber, projectile) {
  inventory[weaponNumber]["arrow"] = 0;
  inventory[weaponNumber]["inject"] = 0;
  $(target).after("<tr id='" + weaponNumber + "'><td class='sell button'><em>-</em></td><td class='inventory " + weapon + weaponNumber + "' colspan=" + columns + "></td><td class='custWeapPrice'></td></tr>");
  $(".inventory." + weapon + weaponNumber).append("<td class='label'>" + projectile + "</td><td class='" + weaponNumber + " incAtt arrow'>+</td><td class='arrowNum arrow'>0</td><td class='" + weaponNumber + " decAtt arrow'>-</td><td class='label'>Injection " + z + "</td><td class='" + weaponNumber + " incAtt injarrow'>+</td><td class='arrowNum injarrow'>0</td><td class='" + weaponNumber + " decAtt injarrow'>-</td>");
}

function buyingItem(itemhold) {
  nuyen -= itemhold["cost"];
}

function sellWeapon() {
  var item = $(this).parent().attr("id")
  nuyen += inventory[item]["cost"];
  inventory[item]["active"] = false;
  fociRating -= inventory[item]["weaponfoci"];

  if (inventory[item]["weaponfoci"] > 0) {
    karma += inventory[item]["weaponfoci"] * 3;
    focinumber--;
    fociRating -= inventory[item]["weaponfoci"];
    pointUpdater("#karmapnt", karma);
  }

  $(this).parent().remove();
  delete inventory[item];
  nuyenUpdater();
}

function settingWeapon() { //this will change the weapon mounts and the nuyen
  var item = $(this).closest(".invName").attr("id");
  var itemmod = inventory[item]["mods"]
  var itemhold = inventory[item];

  itemmod.top = mountCheck($(".topmount." + item + " select").val(), itemmod.top, itemmod.under);
  itemmod.barrel = mountCheck($(".barrelmount." + item + " select").val(), itemmod.barrel);
  itemmod.under = mountCheck($(".underbarrel." + item + " select").val(), itemmod.under, itemmod.top);

  //@TODO - rename parameters
  //@TODO - move outside of parent function
  function mountCheck(x, y, z) {
    if (x != y) { //reset stats below
      price = gunModPricing(y); //the price of the old mod
      nuyen += price; //returns money of the old mod
      inventory[item]["cost"] -= price; //takes out of the price of the old mod
      itemhold["rc"] -= addingRecoil(y); //takes away the recoil of the old mod
      itemhold["rcmod"] -= moddingRecoil(y); //takes away the recoil mod of the old mod
      itemhold["accmod"] -= addingAccuracy(y, z);

      //set new stats below
      price = gunModPricing(x); //sets the new price
      nuyen -= price; //reduces the nuyen by the price of the new mod
      inventory[item]["cost"] += price; //adds the price of the new mod to the gun's price
      itemhold["rc"] += addingRecoil(x); //sets the new recoil
      itemhold["rcmod"] += moddingRecoil(x); //sets the new recoil mod
      itemhold["accmod"] += addingAccuracy(x, z);
    }

    return x;
  }

  displayUpdater();
}

//@TODO - rename parameters
function addingAccuracy(x, z) {
  if (x == "Smartgun" || z == "Smartgun" || itemmod["internalsmart"] == "Smartgun") { //this figures out of accuracy bonus
    y = 2;
  } else if (x == "Laser Sight" || z == "Laser Sight" || itemmod["integral"].indexOf("Laser Sight") !== -1) {
    y = 1;
  } else {
    y = 0;
  };
  return y;
}

//@TODO - rename parameters
function moddingRecoil(x) {
  if (x == "Tripod" || x == "Gyro Mount") {
    y = 6;
  } else if (x == "Bipod") {
    y = 2;
  } else {
    y = 0;
  }
  return y;
}

//@TODO - rename parameters
function addingRecoil(x) {
  if (x == "Gas Vent 3" || itemmod["integral"].indexOf("Gas Vent 3") !== -1) { //gas vents apparently determine the natural recoil
    y = 3;
  } else if (x == "Gas Vent 2" || itemmod["integral"].indexOf("Gas Vent 2") !== -1) {
    y = 2;
  } else if (x == "Gas Vent 1" || itemmod["integral"].indexOf("Gas Vent 1") !== -1) {
    y = 1;
  } else {
    y = 0;
  }

  return y;
}

function gunModPricing(mod) { //this is the price of all the mods
  var price;

  switch (mod) {
    default: price = 0;
      break;
    case "Laser Sight":
      price = 125;
      break;
    case "Imaging Scope":
      price = 300;
      break;
    case "Periscope":
      price = 70;
      break;
    case "Smartgun":
      price = 200;
      break;
    case "Gas Vent 1":
      price = 200;
      break;
    case "Gas Vent 2":
      price = 400;
      break;
    case "Gas Vent 3":
      price = 600;
      break;
    case "Silencer":
      price = 500;
      break;
    case "Bipod":
      price = 200;
      break;
    case "Gyro Mount":
      price = 1400;
      break;
    case "Smart Firing Platform":
      price = 2500;
      break;
    case "Tripod":
      price = 500;
      break;
  }

  return price;
}

function smartlink() {
  if ($(this).hasClass("deact")) {
    return;
  }

  var item = $(this).closest(".invName").attr("id");
  var itemmod = inventory[item]["mods"];
  var itemhold = inventory[item];

  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    itemmod["internalsmart"] = "empty";

    if (itemmod.top == "Smartgun" || itemmod.under == "Smartgun") { //this figures out of accuracy bonus
      itemhold["accmod"] -= 0;
    } else if (itemmod.top == "Laser Sight" || itemmod.under == "Laser Sight" || itemmod["integral"].indexOf("Laser Sight") !== -1) {
      itemhold["accmod"] -= 1;
    } else {
      itemhold["accmod"] -= 2;
    }

    for (var key in weapons) {
      if (weapons[key]["name"] == itemhold["name"]) {
        nuyen += weapons[key]["cost"];
        itemhold["cost"] -= weapons[key]["cost"];
        itemhold["avail"] -= 2;

        if (weapons[key]["restrict"] == " ") {
          itemhold["restrict"] = " ";
        }
      }
    }

  } else {
    $(this).addClass("active");
    itemmod["internalsmart"] = "Smartgun";

    if (itemmod.top == "Smartgun" || itemmod.under == "Smartgun") { //this figures out of accuracy bonus
      itemhold["accmod"] += 0;
    } else if (itemmod.top == "Laser Sight" || itemmod.under == "Laser Sight" || itemmod["integral"].indexOf("Laser Sight") !== -1) {
      itemhold["accmod"] += 1;
    } else {
      itemhold["accmod"] += 2;
    }

    for (var key in weapons) {
      if (weapons[key]["name"] == itemhold["name"]) {
        nuyen -= weapons[key]["cost"];
        itemhold["cost"] += weapons[key]["cost"];
        itemhold["avail"] += 2;
        if (itemhold["restrict"] == " ") {
          itemhold["restrict"] = "Restricted";
        }
      }
    }
  }
  displayUpdater();
}

function shockPadding() {
  if ($(this).hasClass("deact")) {
    return;
  }

  var item = $(this).closest(".invName").attr("id");
  var itemmod = inventory[item]["mods"];
  var itemhold = inventory[item];

  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    itemmod["shockpad"] = "empty";
    itemhold["rc"]--;
    nuyen += 50;
    itemhold["cost"] -= 50;
  } else {
    $(this).addClass("active");
    itemmod["shockpad"] = "Shock Pad";
    itemhold["rc"]++;
    nuyen -= 50;
    itemhold["cost"] += 50;
  }
  displayUpdater();
}

//@TODO - rename function
function airBurstLink() {
  if ($(this).hasClass("deact")) {
    return;
  }

  var item = $(this).closest(".invName").attr("id");
  var itemmod = inventory[item]["mods"];
  var itemhold = inventory[item];

  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    itemmod["airburstlink"] = false;
    nuyen += 600;
    itemhold["cost"] -= 600;
  } else {
    $(this).addClass("active");
    itemmod["airburstlink"] = true;
    nuyen -= 600;
    itemhold["cost"] += 600;
  }
  displayUpdater();
}

function holsters() { //this creates and manages the background stuff for the holsters of a gun
  var item = $(this).closest(".invName").attr("id");
  var itemmod = inventory[item]["mods"];
  var itemhold = inventory[item];

  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    if ($(this).hasClass("concealableholster")) {
      itemmod["concealableholster"] = false;
      nuyen += 150;
      itemhold["cost"] -= 150;
    } else if ($(this).hasClass("hiddenarmslide")) {
      itemmod["hiddenarmslide"] = false;
      nuyen += 350;
      itemhold["cost"] -= 350;
    } else if ($(this).hasClass("quickdrawholster")) {
      itemmod["quickdrawholster"] = false;
      nuyen += 175;
      itemhold["cost"] -= 175;
    }
  } else {
    $(this).addClass("active");
    if ($(this).hasClass("concealableholster")) {
      itemmod["concealableholster"] = true;
      nuyen -= 150;
      itemhold["cost"] += 150;
    } else if ($(this).hasClass("hiddenarmslide")) {
      itemmod["hiddenarmslide"] = true;
      nuyen -= 350;
      itemhold["cost"] += 350;
    } else if ($(this).hasClass("quickdrawholster")) {
      itemmod["quickdrawholster"] = true;
      nuyen -= 175;
      itemhold["cost"] += 175;
    }
  }
  displayUpdater();
}

function buyingAmmo() {
  var ammo = $(this).parent().attr("class");
  var gunclass = $(this).closest(".ammunition").attr("id");
  if ($(this).parent().hasClass("gas")) {
    gasname = $("select.toxicgas").val();
    gas = toxin[gasname];
    if (typeof ammunition[gasname] === 'undefined') {
      ammunition[gasname] = {
        name: gas["name"],
        ammo: 0,
        class: "grenades",
        dammod: gas["power"],
        typemod: gas["effect"],
        elemod: "",
        apmod: 0,
        blast: "10m Radius",
        avail: gas["avail"] + 2,
        restrict: gas["restrict"],
        cost: gas["cost"] + 40
      }

      z = ammunition[gasname]
      $(".gas").after("<tr class='" + gasname + "'><td class='buygrenades button'>+</td><td class='amountofammo'>0</td><td class='sellgrenades button'>-</td><td class='grenadesname'>" + z["name"] + "</td><td class='grenadesdammod'>" + z["dammod"] + " " + z["typemod"] + " " + z["elemod"] + "</td><td class='apmod'>" + z["apmod"] + "</td><td class='blast'>" + z["blast"] + "</td><td class='avail'>" + z["avail"] + " " + z["restrict"] + "</td><td class='cost'>" + z["cost"] + "&#65509</td></tr>");
    }
    return;
  }
  if (typeof inventory[gunclass + ammo] === 'undefined') {
    inventory[gunclass + ammo] = {};

    for (var key in ammunition[ammo]) {
      inventory[gunclass + ammo][key] = ammunition[ammo][key];
    }
  }

  var invammo = inventory[gunclass + ammo];
  inventory[gunclass + ammo]["class"] = gunclass;

  if (nuyen - inventory[gunclass + ammo]["cost"] > 0 && $(this).hasClass("buyammo")) {
    addAmmo($(this), gunclass + ammo, 10, invammo);
  } else if (inventory[gunclass + ammo]["ammo"] > 0 && $(this).hasClass("sellammo")) {
    subAmmo($(this), gunclass + ammo, 10, invammo);
  } else if (nuyen - inventory[gunclass + ammo]["cost"] > 0 && $(this).hasClass("buygrenades")) {
    addAmmo($(this), gunclass + ammo, 1, invammo);
  } else if (inventory[gunclass + ammo]["ammo"] > 0 && $(this).hasClass("sellgrenades")) {
    subAmmo($(this), gunclass + ammo, 1, invammo);
  }

  nuyenUpdater();
}

//@TODO - rename parameters
function addAmmo(w, x, y) { //w=this, x=name of ammo in inventory, y=amount of ammo bought at a time
  inventory[x]["ammo"] += y;
  nuyen -= inventory[x]["cost"];
  $(w.next(".amountofammo")).empty().append(inventory[x]["ammo"]);
}

//@TODO - rename parameters
function subAmmo(w, x, y) { //w=this, x=name of ammo in inventory, y=amount of ammo bought at a time
  inventory[x]["ammo"] -= y;
  nuyen += inventory[x]["cost"];
  $(w.prev(".amountofammo")).empty().append(inventory[x]["ammo"]);
}

function toxicgas() {
  gasGrenade($(this).val());
}

//@TODO - rename parameter
function gasGrenade(x) {
  $(".gas .grenadesdammod").empty().append(toxin[x]["power"] + " " + toxin[x]["effect"]);
  $(".gas .avail").empty().append((toxin[x]["avail"] + 2) + " " + toxin[x]["restrict"]);
  $(".gas .cost").empty().append((toxin[x]["cost"] + 40) + "&#65509;");
}

//@TODO - rename function
function kaboom() {
  if ($(this).hasClass("deact")) {
    return;
  }

  var bomb = $(this).parent().attr("class");
  if ($(this).hasClass("bombup") && explosives[bomb]["rating"] < 25) {
    explosives[bomb]["rating"]++;
    bombupdate(bomb);
  } else if ($(this).hasClass("bombdown") && explosives[bomb]["rating"] > 6) {
    explosives[bomb]["rating"]--;
    bombupdate(bomb);
  }

  //@TODO - move function outside of function
  //@TODO - rename parameter
  function bombupdate(x) {
    $("." + x + " .explosiverating").empty().append(explosives[x]["rating"]);
    explosives[x]["cost"] = explosives[x]["rating"] * 100;
    $("." + x + " .bombbond").empty().append(explosives[x]["cost"] + "&#65509;");
  }
}

//@TODO - rename function
function bombsaway() {
  var bomb = $(this).parent().attr("class");
  if ($(this).hasClass("buybomb") && nuyen - explosives[bomb]["cost"] > 0) {
    inventory[bomb + invNum] = {};
    bombname = bomb + invNum;
    for (var key in explosives[bomb]) {
      inventory[bombname][key] = explosives[bomb][key];
    }

    inventory[bombname]["kg"] = 1;
    $("." + bomb + ".explosives").append("<tr class='" + bombname + "'><td class='sellbomb button'><em>-<em></td><td class='inventory' colspan=4></td><td class='bombprice'>" + inventory[bombname]["cost"] + "&#65509;</td></tr>");
    $("." + bombname + " .inventory").append("<td class='label'>Rating</td><td>" + inventory[bombname]["rating"] + "</td><td class='label'>Kilograms</td><td class='kgup button'>+</td><td class='kg'>" + inventory[bombname]["kg"] + "</td><td class='kgdown button'>-</td>");

    invNum++;
    nuyen -= inventory[bombname]["cost"];
  } else if ($(this).hasClass("sellbomb")) {
    $("." + bomb).remove();
    nuyen += inventory[bomb]["cost"];
    delete inventory[bomb];
  }

  nuyenUpdater();
}

//@TODO - rename function
function fatboy() {
  var bomb = $(this).parent().parent().attr("class");
  if ($(this).hasClass("kgup") && nuyen - inventory[bomb]["rating"] * 100 >= 0) {
    inventory[bomb]["kg"]++;
    bombupdate(bomb);
    if (inventory[bomb]["name"] == "Commercial") {
      nuyen -= 100;
    } else {
      nuyen -= inventory[bomb]["rating"] * 100;
    }
  } else if ($(this).hasClass("kgdown") && inventory[bomb]["kg"] > 0) {
    inventory[bomb]["kg"]--;
    bombupdate(bomb);
    if (inventory[bomb]["name"] == "Commercial") {
      nuyen += 100
    } else {
      nuyen += inventory[bomb]["rating"] * 100;
    }
  }
  nuyenUpdater();

  //@TODO - move outside of function
  //@TODO - rename parameter
  function bombupdate(x) {
    $("." + x + " .kg").empty().append(inventory[x]["kg"]);
    if (inventory[x]["name"] == "Commercial") {
      inventory[x]["cost"] = inventory[x]["kg"] * 100;
    } else {
      inventory[x]["cost"] = inventory[x]["kg"] * (inventory[x]["rating"] * 100);
    }
    $("." + x + " .bombprice").empty().append(inventory[x]["cost"] + "&#65509;");
  }
}

function buyDetonator() {
  if (typeof inventory["detonator"] === 'undefined') {
    inventory["detonator"] = {};
    for (var key in detonator) {
      inventory["detonator"][key] = detonator[key];
    }
  }

  if ($(this).hasClass("buyDet") && nuyen - inventory["detonator"]["cost"] > 0) {
    inventory["detonator"]["amount"]++;
    nuyen -= inventory["detonator"]["cost"];
  } else if ($(this).hasClass("sellDet") && inventory["detonator"]["amount"] > 0) {
    inventory["detonator"]["amount"]--;
    nuyen += inventory["detonator"]["cost"];
  }

  $(".caps").empty().append(inventory["detonator"]["amount"]);
  nuyenUpdater();
}

//@TODO - rename function
function sponge() {
  var armtype = $(this).parent().attr("class");
  if (nuyen - armor[armtype]["cost"] < 0 || $(this).hasClass("deact")) {
    return;
  }

  inventory[armtype + invNum] = {};
  for (var key in armor[armtype]) {
    inventory[armtype + invNum][key] = armor[armtype][key];
  }

  $("." + armtype).after("<tr class='" + armtype + invNum + "'><td class='sellarmor button'><em>-</em></td><td class='armormods' colspan=3></td><td class='armorcost'>" + inventory[armtype + invNum]["cost"] + "&#65509;</td></tr>");
  inventory[armtype + invNum]["mods"] = {}; //create emtpy mods section for intentory armor
  for (var mods in armormods) { //this will add the mods
    inventory[armtype + invNum]["mods"][mods] = {}; //this will add the name of the mods
    for (var modstats in armormods[mods]) {
      inventory[armtype + invNum]["mods"][mods][modstats] = armormods[mods][modstats]; //this adds all the stats for each mod
    }
    if (typeof armormods[mods]["rating"] !== "undefined") { //this is for mods that don't have ratings
      $("." + armtype + invNum + " .armormods").append("<tr class='" + mods + "'><td class='label'>" + inventory[armtype + invNum]["mods"][mods]["name"] + "</td><td class='armmodup button'>+</td><td class='armmodrating'>0</td><td class='armmoddown button'>-</td><td class='label'>Capacity</td><td class='armorcap'>" + inventory[armtype + invNum]["mods"][mods]["capacity"] + "</td></tr>");
    } else if (typeof armor[armtype]["helm"] === "undefined" && mods == "chemicalseal") { //this checks to see if the armor has a helm
      //do nothing
    } else { //this adds all other mods
      modnorating(armtype + invNum, mods)
    }
  }
  if (inventory[armtype + invNum]["helm"] == false) { //if the armor supports a helm, add it to the mods
    $("." + armtype + invNum + " .armormods").append("<tr class='helm'><td class='label'>Helmet</td><td class='buyhelmmod button' colspan=3><strong>+</strong></td></tr>");
  }
  nuyen -= armor[armtype]["cost"];
  invNum++;
  nuyenUpdater();

  //@TODO - move function
  //@TODO - rename parameters
  function modnorating(x, y) {
    $("." + x + " .armormods").append("<tr class='" + y + "'><td class='label'>" + inventory[armtype + invNum]["mods"][y]["name"] + "</td><td class='buyarmmod button' colspan=3><strong>+</strong></td><td class='label'>Capacity</td><td>" + inventory[armtype + invNum]["mods"][y]["capacity"] + "</td></tr>");
  }
}

function clearArmor() {
  var armtype = $(this).parent().attr("class");
  nuyen += inventory[armtype]["cost"];
  $("." + armtype).remove();
  delete inventory[armtype];
  nuyenUpdater();
}

function armorModding() {
  mod = $(this).parent().attr("class");
  item = $(this).parent().parent().parent().attr("class");
  invmod = inventory[item]["mods"][mod];
  var legit = nuyen - invmod["cost"] > 0;
  if ($(this).hasClass("armmodup") && invmod["rating"] < 6 && inventory[item]["capacity"] < inventory[item]["armor"] && legit) {
    invmod["rating"]++;
    inventory[item]["capacity"]++;
    nuyen -= invmod["cost"];
    inventory[item]["cost"] += invmod["cost"];
    modUpdater(item, mod, invmod);
  } else if ($(this).hasClass("armmoddown") && invmod["rating"] > 0) {
    invmod["rating"]--;
    inventory[item]["capacity"]--;
    nuyen += invmod["cost"];
    inventory[item]["cost"] -= invmod["cost"];
    modUpdater(item, mod, invmod);
  } else if ($(this).hasClass("buyarmmod") && invmod["active"] == false && invmod["capacity"] + inventory[item]["capacity"] <= inventory[item]["armor"] && legit) {
    inventory[item]["capacity"] += invmod["capacity"];
    nuyen -= invmod["cost"];
    inventory[item]["cost"] += invmod["cost"];
    invmod["active"] = true;
    sellsign($(this));
    costUpdater(item);
    if (mod == "chemicalseal" && inventory[item]["helm"] == false) {
      turnonhelm(item, $("." + item + " .buyhelmmod"));
    }
  } else if ($(this).hasClass("buyarmmod") && invmod["active"] == true) {
    inventory[item]["capacity"] -= invmod["capacity"];
    nuyen += invmod["cost"];
    inventory[item]["cost"] -= invmod["cost"];
    invmod["active"] = false;
    buysign($(this));
    costUpdater(item);
  }
  nuyenUpdater();

  function modUpdater(x, y, z) {
    $("." + x + " ." + y + " .armmodrating, ." + x + " ." + y + " .armorcap").empty().append(z["rating"]);
    costUpdater(x);
  }
}


function helmup() {
  item = $(this).parent().parent().parent().attr("class");
  if (inventory[item]["helm"] == false && nuyen - inventory[item]["helmmod"]["cost"] > 0) {
    turnonhelm(item, $(this));
  } else {
    buysign($(this));
    inventory[item]["helm"] = false;
    nuyen += inventory[item]["helmmod"]["cost"];
    inventory[item]["cost"] -= inventory[item]["helmmod"]["cost"];
    costUpdater(item);
    if (inventory[item]["mods"]["chemicalseal"]["active"] == true) {
      invmod = inventory[item]["mods"]["chemicalseal"];
      inventory[item]["capacity"] -= invmod["capacity"];
      nuyen += invmod["cost"];
      inventory[item]["cost"] -= invmod["cost"];
      invmod["active"] = false;
      buysign($("." + item + " .chemicalseal .buyarmmod"));
      costUpdater(item);
    }
  }
  nuyenUpdater();
}

function turnonhelm(item, x) {
  sellsign(x);
  inventory[item]["helm"] = true;
  nuyen -= inventory[item]["helmmod"]["cost"];
  inventory[item]["cost"] += inventory[item]["helmmod"]["cost"];
  costUpdater(item);
}

function fashioncost() { //this is to help calculate how much clothes cost
  cost = $(this).val();
  if (cost == "" || cost < 1) { //if clothes value is less then 1, then its cost = 20
    clothingcost = 20;
  } else { //else the cost is whatever the input says
    clothingcost = cost;
  }

  fashionprice(); //this calculates and renders the cost with the mods that you can add to cloths
}

function fashionprice() {
  $("#clothing .armor").empty().append(clothingarmor);
  $("#clothing .avail").empty().append(clothingavail);
  $("#clothing .cost").empty().append((parseInt(clothingcost) + electrochromiccost + feedbackcost + synthleathercost) + "&yen;");
}

//@TODO - camelCase function
function fashionbutton() { //this will change the value and avail of cloths based off of what buttons are pressed.
  switch ($(this).attr("class")) {
    case "electrochromic button":
      electrochromiccost = 500;
      fashionactivate($(this), 2);
      break;
    case "electrochromic button active":
      electrochromiccost = 0;
      fashionDeactivate($(this), 2);
      break;
    case "feedback button":
      feedbackcost = 500;
      fashionactivate($(this), 8);
      break;
    case "feedback button active":
      feedbackcost = 0;
      fashionDeactivate($(this), 8);
      break;
    case "leather button":
      synthleathercost = 200;
      fashionactivate($(this), 0);
      clothingarmor = 4;
      break;
    case "leather button active":
      synthleathercost = 0;
      fashionDeactivate($(this), 0);
      clothingarmor = 0;
      break;
    case "buycloths button":
      if (nuyen - (parseInt(clothingcost) + electrochromiccost + feedbackcost + synthleathercost) < 0) {
        return;
      }

      inventory["clothing" + invNum] = {
        electrochromic: false,
        feedback: false,
        leather: false,
        armor: clothingarmor,
        avail: clothingavail,
        cost: parseInt(clothingcost) + electrochromiccost + feedbackcost + synthleathercost
      }
      $("#clothing").after("<tr class='clothing" + invNum + "'><td class='sellarmor button'><em>-</em></td><td>" + clothingcost + "&yen;</td><td class='electrochromic'>Electrochromic</td><td class='feedback'>Feedback</td><td class='leather'>Synthleather</td><td>" + clothingarmor + "</td><td>" + clothingavail + "</td><td>" + inventory["clothing" + invNum]["cost"] + "&yen;</td></tr>");

      if (synthleathercost == 200) {
        inventory["clothing" + invNum]["leather"] = true;
        clothingmodactive(invNum + " .leather");
      }

      if (feedbackcost == 500) {
        inventory["clothing" + invNum]["feedback"] = true;
        clothingmodactive(invNum + " .feedback");
      }

      if (electrochromiccost == 500) {
        inventory["clothing" + invNum]["electrochromic"] = true;
        clothingmodactive(invNum + " .electrochromic");
      }

      nuyen -= inventory["clothing" + invNum]["cost"]
      invNum++;
      nuyenUpdater();
      break;
  }
  fashionprice();

  //@TODO - move function
  //@TODO - rename parameters
  function clothingmodactive(x) {
    $(".clothing" + x).addClass("active");
  }

  //@TODO - move function
  //@TODO - rename parameters
  function fashionactivate(x, y) {
    x.addClass("active");
    clothingavail += y;
  }

  //@TODO - move function
  //@TODO - rename parameters
  function fashionDeactivate(x, y) {
    x.removeClass("active");
    clothingavail -= y;
  }
}

function buyinbulk() { //used to buy rfid tags, or possible other items that can be bought like rfid tags
  var rfid = $(this).parent().attr("class");
  if (typeof inventory[rfid] === "undefined") {
    inventory[rfid] = electronics[rfid];
    inventory[rfid]["tagNo"] = 0;
  }

  if ($(this).hasClass("buyUp") && nuyen - inventory[rfid]["cost"] > 0) {
    inventory[rfid]["tagNo"] += inventory[rfid]["peritem"];
    nuyen -= inventory[rfid]["cost"];
  } else if ($(this).hasClass("sellDown") && inventory[rfid]["tagNo"] > 0) {
    inventory[rfid]["tagNo"] -= inventory[rfid]["peritem"];
    nuyen += inventory[rfid]["cost"];
  }

  tenUp(rfid);
  nuyenUpdater();

  //@TODO - move function
  //@TODO - rename parameters
  function tenUp(x) {
    $("." + x + " .numrfid").empty().append(inventory[x]["tagNo"]);
  }
}

function appleStore() { //this function handles buying electronic devices, and now it seems to also be used to buy everything...
  var devicename = $(this).parent().attr("class");

  if ($(this).hasClass("deact") || nuyen - electronics[devicename]["cost"] < 0) {
    return;
  }

  toInventory(devicename);
  switch (electronics[devicename]["type"]) {
    case "commlink":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='linkmods' colspan=3></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      $("." + devicename + invNum + " .linkmods").append("<td class='label'>Sim Mod</td><td class='simmod button'>+</td><td class='label'>Hot Sim</td><td class='hotsim button'>+</td>");
      break;
    case "deck":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='programs' colspan=5></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      var localmod = $("." + devicename + invNum + " .programs");
      localmod.append("<tr class='agent'><td class='label'>Agent</td><td class='agentup button'>+</td><td class='agentrating'>0</td><td class='agentdown button'>-</td></tr>");
      for (var program in programs) {
        localmod.append("<tr class='" + program + "'><td class='label'>" + programs[program].name + "</td><td class='buyprogram button' colspan=3><strong>+</strong></td></tr>");
      }
      break;
    case "rcc":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='programs' colspan=5></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      var localmod = $("." + devicename + invNum + " .programs");
      for (var program in programs) {
        if (programs[program]["rcc"] == true) {
          localmod.append("<tr class='" + program + "'><td class='label'>" + programs[program].name + "</td><td class='buyprogram button' colspan=3><strong>+</strong></td></tr>");
        }
      }
      break;
    case "accessory":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moddy' colspan=3></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      break;
    case "communication":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='devicerating' colspan=3>n/a</td><td colspan=2></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      if (typeof inventory[devicename + invNum]["rating"] !== "undefined") {
        $("." + devicename + invNum + " .devicerating").empty().append(inventory[devicename + invNum]["rating"]);
      }
      break;
    case "credsticks":
      $("#credsticks " + "." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=3></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      break;
    case "identification":
      inventory[devicename + invNum]["id"] = $("." + devicename + " .fakename").val();
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=3>" + inventory[devicename + invNum]["rating"] + "</td><td>" + inventory[devicename + invNum]["id"] + "</td><td>" + inventory[devicename + invNum]["avail"] + " " + inventory[devicename + invNum]["restrict"] + "</td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      break;
    case "tools":
      inventory[devicename + invNum]["skill"] = $("." + devicename + " .toolname").val();
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=2>" + inventory[devicename + invNum]["skill"] + " " + inventory[devicename + invNum]["name"] + "</td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      break;
    case "optics":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=4></td><td class='deviceavail'>" + inventory[devicename + invNum]["avail"] + "</td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      enhancements(visionenhancements, inventory[devicename + invNum]["rating"], devicename + invNum, devicename);
      break;
    case "audio":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=4></td><td class='deviceavail'>" + inventory[devicename + invNum]["avail"] + "</td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      enhancements(audioenhancements, inventory[devicename + invNum]["rating"], devicename + invNum, devicename);
      break;
    case "securitydevice":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='devicerating' colspan=3>" + inventory[devicename + invNum]["name"] + " " + inventory[devicename + invNum]["rating"] + "</td><td class='mods'></td><td class='avail'>" + inventory[devicename + invNum]["avail"] + "</td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      if (devicename == "maglock") {
        for (var mod in maglockMod) {
          $("." + devicename + invNum + " .mods").append("<tr class='" + mod + "'><td class='addmod button'><strong>+</strong></td><td class='ratingUp button'>+</td><td class='commrating'>" + maglockMod[mod]["rating"] + "</td><td class='ratingDown button'>-</td><td>" + maglockMod[mod]["name"] + "</td></tr>");
          if (typeof maglockMod[mod]["rating"] == "undefined") {
            $("." + devicename + invNum + " ." + mod + " .ratingUp, ." + devicename + invNum + " ." + mod + " .ratingDown").addClass("deact");
            $("." + devicename + invNum + " ." + mod + " .commrating").empty().append("n/a");
          }
        }
      }
      break;
    case "bnegear":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='devicerating' colspan=3>" + inventory[devicename + invNum]["name"] + " " + inventory[devicename + invNum]["rating"] + "</td><td class='mods'></td><td class='avail'>" + inventory[devicename + invNum]["avail"] + "</td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      break;
    case "chemicals":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      break;
    case "survivalgear":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      break;
    case "grapplegungear":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=4></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      break;
    case "biotech":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      break;
    case "docwagon":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      break;
    case "slappatches":
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
      break;
    case "enchantingfoci":
    case "metamagicfoci":
    case "powerfoci":
    case "qifoci":
    case "spellfoci":
    case "spiritfoci":
      if (fociRating + inventory[devicename + invNum]["rating"] > fociMaxRating || focinumber + 1 > attributes.current.mag || karma - (inventory[devicename + invNum]["rating"] * inventory[devicename + invNum]["karmaCost"]) <= 0) {
        alert("You're at the max foci rating you can bond");
        return;
      }

      magicalGoods(devicename, devicename + invNum, inventory[devicename + invNum]);
      focinumber++;
      fociRating += inventory[devicename + invNum]["rating"];
      karma -= inventory[devicename + invNum]["rating"] * inventory[devicename + invNum]["karmaCost"];
      pointUpdater("#karmapnt", karma);
      break;
    default:
      $("." + devicename).after("<tr class='" + devicename + invNum + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=5></td><td class='devicecost'>" + inventory[devicename + invNum]["cost"] + "&yen;</td></tr>");
  }
  nuyen -= inventory[devicename + invNum]["cost"];
  invNum++;
  nuyenUpdater();

  //@TODO - rename parameter
  function toInventory(x) { //this adds the device in to the inventory
    inventory[x + invNum] = {};
    for (var deviceAtt in electronics[x]) {
      inventory[x + invNum][deviceAtt] = electronics[x][deviceAtt];
    }

    var y = electronics[x]["type"]
    if (y == "deck" || y == "rcc" || y == "commlink") {
      inventory[x + invNum]["programlist"] = {};

    }
  }

  function magicalGoods(deviceName, deviceInventoryName, deviceInventory) {
    if (typeof deviceInventory.magicType === "undefined") {
      $("." + deviceName).after("<tr class='" + deviceInventoryName + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=3>" + deviceInventory.rating + "</td><td>" + deviceInventory.name + "</td><td>" + deviceInventory.avail + " " + deviceInventory.restrict + "</td><td class='devicecost'>" + deviceInventory.cost + "&yen;</td></tr>");
    } else if (deviceName == "qifocus") {
      $("." + deviceName).after("<tr class='" + deviceInventoryName + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=3>" + deviceInventory.rating + "</td><td>" + deviceInventory.name + "</td><td>" + adeptPowers[deviceInventory.magicType]["name"] + "</td><td>" + deviceInventory.avail + " " + deviceInventory.restrict + "</td><td class='devicecost'>" + deviceInventory.cost + "&yen;</td></tr>");
    } else {
      $("." + deviceName).after("<tr class='" + deviceInventoryName + "'><td class='selldevice button'><em>-</em></td><td class='moody' colspan=3>" + deviceInventory.rating + "</td><td>" + deviceInventory.name + "</td><td>" + deviceInventory.magicType + "</td><td>" + deviceInventory.avail + " " + deviceInventory.restrict + "</td><td class='devicecost'>" + deviceInventory.cost + "&yen;</td></tr>");
    }
  }
}

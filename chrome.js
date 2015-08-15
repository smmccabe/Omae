function customLimb() {
  var limb = $(this).parents("tr").attr("class");
  var limbType = $("." + limb + " .type select").val();
  var limbGrade = $("." + limb + " .grade select").val();

  switch ($(this).attr("class")) {
    case "strUp button":
      if (augmentations[limbType][limb]["str"] >= attributes.maximum.strmax) {
        return;
      }
      augmentations[limbType][limb]["str"]++;
      augmentations[limbType][limb]["avail"]++;
      augmentations[limbType][limb]["cost"] += (5000 * augmentations.grade[limbGrade]["cost"]);
      customlimbUpdater();
      break;
    case "strDown button":
      if (augmentations[limbType][limb]["str"] <= 3) {
        return;
      }
      augmentations[limbType][limb]["str"]--;
      augmentations[limbType][limb]["avail"]--;
      augmentations[limbType][limb]["cost"] -= (5000 * augmentations.grade[limbGrade]["cost"]);
      customlimbUpdater();
      break;
    case "agiUp button":
      if (augmentations[limbType][limb]["agi"] >= attributes.maximum.agimax) {
        return;
      }
      augmentations[limbType][limb]["agi"]++;
      augmentations[limbType][limb]["avail"]++;
      augmentations[limbType][limb]["cost"] += (5000 * augmentations.grade[limbGrade]["cost"]);
      customlimbUpdater();
      break;
    case "agiDown button":
      if (augmentations[limbType][limb]["agi"] <= 3) {
        return;
      }
      augmentations[limbType][limb]["agi"]--;
      augmentations[limbType][limb]["avail"]--;
      augmentations[limbType][limb]["cost"] -= (5000 * augmentations.grade[limbGrade]["cost"]);
      customlimbUpdater();
      break;
    case "buyAug button":
      if (augmentations[limbType][limb]["slot"] == "arm" || augmentations[limbType][limb]["slot"] == "leg") {
        var side = $("." + limb + " .location select").val();
      } else {
        var side = "";
      }

      if ($.isEmptyObject(characteraugmentation.limbs[side + augmentations[limbType][limb]["slot"]])) {
        var limbloc = side + augmentations[limbType][limb]["slot"];
        var cyber = characteraugmentation.limbs[limbloc] = $.extend({}, augmentations[limbType][limb]);
        $("." + limb).after("<tr class='" + limbloc + "'><td class='sellAug button'><em>-</em></td><td>" + side + " " + limbType + " " + augmentations[limbType][limb]["slot"] + "</td><td class='cybermods' colspan=12><table class='mods'><tbody></tbody></table></td><td class='price'>" + cyber.cost + "&yen;</td></tr>");

        for (var mod in augmentations.mods) {
          for (var x in augmentations.mods[mod]["allow"]) {
            if (augmentations.mods[mod]["allow"][x] == augmentations[limbType][limb]["slot"]) {
              var targetMod = augmentations.mods[mod];
              if (typeof targetMod.rating !== "undefined") {
                $("." + limbloc + " .cybermods table.mods tbody").append("<tr class='" + mod + "'><td>" + targetMod.name + "</td><td class='modUp button'><strong>+</strong></td><td class='modRating'>0</td><td class='modDown button'><strong>-</strong></td><td class='label'>Cap</td><td class='cap'>[" + targetMod.capacity + "]</td><td class='label'>Avail</td><td class='avail'>" + targetMod.avail + targetMod.restrict + "</td><td class='label'>Price</td><td class='price'>" + targetMod.cost * augmentations.grade[cyber.grade]["cost"] + "&yen;</td></tr>");
              } else {
                $("." + limbloc + " .cybermods table.mods tbody").append("<tr class='" + mod + "'><td>" + targetMod.name + "</td><td class='buyMod button' colspan=3><strong>-</strong></td><td class='label'>Cap</td><td class='cap'>[" + targetMod.capacity + "]</td><td class='label'>Avail</td><td class='avail'>" + targetMod.avail + targetMod.restrict + "</td><td class='label'>Price</td><td class='price'>" + targetMod.cost * augmentations.grade[cyber.grade]["cost"] + "&yen;</td></tr>");
              }
            }
          }
        }

        $("." + limbloc + " .cybermods").append("<table class='weapons'><tbody><tr class='label'><td>CyberWeapon</td><td>Buy</td><td>Ext. Clip</td><td>Laser Sight</td><td>Silencer</td><td>Cap</td><td>Acc</td><td>Dam</td><td>Fire Mod</td><td>RC</td><td>Ammo</td><td>Avail</td><td>Cost</td></tr></tbody></table>");

        for (var weapon in augmentations.weapons) {
          var weap = augmentations.weapons[weapon];
          $("." + limbloc + " .cybermods table.weapons tbody").append("<tr class='" + weapon + "'><td>" + weap.name + "</td><td class='buyMod button'><strong>+</strong></td><td class='clip button'>+</td><td class='laser button'>+</td><td class='silencer button'>+</td><td class='capacity'>[" + weap.capacity + "]</td><td class='accuracy'>" + weap.stats.accuracy + "(" + (weap.stats.accuracy + weap.stats.accmod) + ")" + "</td><td class='damage'>" + weap.stats.damage + weap.stats.damtype + "</td><td class='mode'></td><td class='rc'>" + weap.stats.rc + "</td><td class='ammo'></td><td class='avail'>" + weap.avail + weap.restrict + "</td><td class='cost'>" + weap.cost + "&yen;</td></tr>");
          for (fire in weap.stats.mode) {
            $("." + limbloc + " .cybermods .weapons ." + weapon + " .mode").append(weap.stats.mode[fire] + ", ");
          }
          for (type in weap.stats.ammo) {
            $("." + limbloc + " .cybermods .weapons ." + weapon + " .ammo").append(weap.stats.ammo[type] + "(" + weap.stats.clip[type] + ")");
          }
        }

        $("." + limbloc + " .cybermods").append("<table class='cyberstats'><tbody><tr class='label'><td>Capacity</td><td>Str</td><td>Agi</td><td>Armor</td><td>RC</td><td>Avail</td><td>Ess</td></tr><tr class='stats'><td class='cap'>" + cyber.cap + "/" + cyber.capmax + "</td><td class='str'>(" + (cyber.str + cyber.augstr) + ")</td><td class='agi'>(" + (cyber.agi + cyber.augagi) + ")</td><td class='armor'>" + cyber.armor + "</td><td class='rc'>" + (cyber.rc + (Math.ceil(cyber.str / 3)) + 1) + "</td><td>" + cyber.avail + "</td><td>" + cyber.essence + "</td></tr></tbody></table>")

        cyber["mods"] = {};

        ess -= cyber.essence;
        attributes.current.mag -= cyber.essence;
        attributes.maximum.magmax -= cyber.essence;
        attributes.current.res -= cyber.essence;
        attributes.maximum.resmax -= cyber.essence;
        nuyen -= cyber.cost;
        displayUpdater();

      } else {
        alert("You already have a wiz new " + side + " " + augmentations[limbType][limb]["slot"]);
      }

      break;
    case "buyMod button":
      var mod = limb;
      limb = $(this).parents("tr").parents("tr").attr("class");
      var typeOfMod = $(this).parents("table").attr("class");

      activate($(this));

      var charlimb = characteraugmentation.limbs[limb];
      var modslot = charlimb["mods"];
      modslot[mod] = $().extend({}, augmentations[typeOfMod][mod]); //this copies the limb into its location

      //this stuff changes all the stats to the new bought stuff
      charlimb.cap += modslot[mod]["capacity"];
      nuyen -= augmentations[typeOfMod][mod]["cost"] * augmentations.grade[charlimb.grade]["cost"];
      charlimb.cost += augmentations[typeOfMod][mod]["cost"] * augmentations.grade[charlimb.grade]["cost"];

      cyberlimbUpdater();
      break;
    case "buyMod button active":
      var mod = limb;
      limb = $(this).parents("tr").parents("tr").attr("class");
      var charlimb = characteraugmentation.limbs[limb];
      var typeOfMod = $(this).parents("table").attr("class");
      deactivate($(this));

      charlimb.cap -= charlimb.mods[mod]["capacity"];
      nuyen += augmentations[typeOfMod][mod]["cost"] * augmentations.grade[charlimb.grade]["cost"];
      charlimb.cost -= augmentations[typeOfMod][mod]["cost"] * augmentations.grade[charlimb.grade]["cost"];

      cyberlimbUpdater();
      delete characteraugmentation.limbs[limb]["mods"][mod];
      break;
    case "modUp button":
      var mod = limb;
      limb = $(this).parents("tr").parents("tr").attr("class");
      var charlimb = characteraugmentation.limbs[limb];

      if (typeof charlimb.mods[mod] === "undefined") {
        charlimb.mods[mod] = $().extend({}, augmentations.mods[mod]);
      }
      if (charlimb.mods[mod]["rating"] >= charlimb.mods[mod]["ratingmax"]) {
        return;
      }

      charlimb.mods[mod]["rating"]++;
      charlimb.mods[mod]["capacity"]++;
      var costUp = charlimb.mods[mod]["costx"] * augmentations.grade[charlimb.grade]["cost"];
      charlimb.mods[mod]["cost"] += costUp;
      charlimb.mods[mod]["avail"] += charlimb.mods[mod]["availx"];
      charlimb[charlimb.mods[mod]["stat"]]++;
      charlimb.cost += costUp;
      nuyen -= costUp;

      //might need to come back and change this if there are mods that capacity increase in higher increments
      charlimb.cap++;

      cyberEnhanceUpdater();
      cyberlimbUpdater();

      break;
    case "modDown button":
      var mod = limb;
      limb = $(this).parents("tr").parents("tr").attr("class");
      var charlimb = characteraugmentation.limbs[limb];
      if (charlimb.mods[mod]["rating"] > 0) {
        charlimb.mods[mod]["rating"]--;
        charlimb.mods[mod]["capacity"]--;
        var costDown = charlimb.mods[mod]["costx"] * augmentations.grade[charlimb.grade]["cost"]
        charlimb.mods[mod]["cost"] -= costDown;
        charlimb.mods[mod]["avail"] -= charlimb.mods[mod]["availx"];
        charlimb[charlimb.mods[mod]["stat"]]--;
        charlimb.cost -= costDown;
        nuyen += costDown;
        charlimb.cap--;

        cyberEnhanceUpdater();
        cyberlimbUpdater();
      }
      break;
    case "sellAug button":
      var cyber = characteraugmentation.limbs[limb];
      ess += cyber.essence;
      attributes.current.mag += cyber.essence;
      attributes.maximum.magmax += cyber.essence;
      attributes.current.res += cyber.essence;
      attributes.maximum.resmax += cyber.essence;
      nuyen += cyber.cost;

      characteraugmentation.limbs[limb] = {};
      $(this).parent().remove();
      displayUpdater();
      break;
  }

  function cyberEnhanceUpdater() {
    $("." + limb + " ." + mod + " .price").empty().append(charlimb.mods[mod]["cost"] + "&yen;");
    $("." + limb + " ." + mod + " .avail").empty().append(charlimb.mods[mod]["avail"]);
    $("." + limb + " ." + mod + " .cap").empty().append("[" + charlimb.mods[mod]["capacity"] + "]");
    $("." + limb + " ." + mod + " .modRating").empty().append(charlimb.mods[mod]["rating"]);
    $("." + limb + " .cyberstats ." + charlimb.mods[mod]["stat"]).empty().append("(" + charlimb[charlimb.mods[mod]["stat"]] + ")");
  }

  function cyberlimbUpdater() {
    $("." + limb + " .cyberstats .cap").empty().append(characteraugmentation.limbs[limb]["cap"] + "/" + characteraugmentation.limbs[limb]["capmax"]);
    $("." + limb + ">.price").empty().append(charlimb.cost + "&yen;")
    nuyenUpdater();
  }

  function customlimbUpdater() {
    $("." + limb + " .str").empty().append(augmentations[limbType][limb]["str"]);
    $("." + limb + " .agi").empty().append(augmentations[limbType][limb]["agi"]);
    $("." + limb + " .avail").empty().append(augmentations[limbType][limb]["avail"]);
    $("." + limb + " .price").empty().append(augmentations[limbType][limb]["cost"] + "&yen;");
  }
}
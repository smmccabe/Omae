inventory = {};

var invNum = 1; //inventory number for naming two items of the same kind

var clothingcost = 20; //this is the cost of clothing
var electrochromiccost = 0; //this is the cost of clothing with electro chromatic
var feedbackcost = 0; //this is the cost of clothing with feedback
var synthleathercost = 0; //this is the cost of leather clothing

var clothingavail = 0; //the avail of the clothing
var clothingarmor = 0; //the armor value of the clothing, only effected by leather

$(function() {
  setupSkills();
  setupGear();
  setupAugmentations();
  setupAmmo();
  setupElectronics();
  setupArmor();
  setupVehicles();
  setupComplexForms();

  //runs the attribute display function on start up
  displayUpdater();

  $(".a, .b, .c, .d, .e").click(selectPriority);

//this part will call the metatype select function when a metatype button is clicked
  $(".human, .elf, .dwarf, .ork, .troll").click(selectMetatype);

  $("#container").on("click", ".incAtt, .decAtt", changeAttribute);

  $(".mage, .techno, .mystic, .adept, .aspect").click(selectMagRes);

  $(".knowButton").click(knowledgeTypeSelect);

  $("#addSkill").click(addKnowing);

  $(".add").click(addPowerPoint);

//@TODO - this probably should be more specific and not on EVERY click
  $().click(spellActivate);

  $("#spelllist").on("click", ".spellact, .prepact", spellActivate);

  $(".formact").click(complexFormActivate);

  $(".weapact").click(buyWeapon);

  $("#gearResource").on("click", ".sell", sellWeapon);

  $("#firearms").on("change", "select", settingWeapon);
  $("#firearms").on("click", ".smartgun.button", smartlink);
  $("#firearms").on("click", ".shockpad.button", shockPadding);
  $("#firearms").on("click", ".airburstlink.button", airBurstLink);
  $("#firearms").on("click", ".concealableholster.button, .hiddenarmslide.button, .quickdrawholster.button", holsters);

  $("#ammunition").on("click", ".buyammo,.sellammo,.buygrenades,.sellgrenades", buyingAmmo);

//explosive ammo after this
  $("#grenadeammo .blastafter, #rocketammo .blastafter").after("<td>Blast</td>");
  $(".grenadesname").on("change", "select.toxicgas", toxicgas);

  gasGrenade("teargas"); //sets grenade at start
  $(".gas .sellgrenades").addClass("deact");

  $("#explosive").on("click", ".bombup, .bombdown", kaboom); //increases an explosive's rating
  $("#explosive").on("click", ".buybomb,.sellbomb", bombsaway); //buy and sell explosives
  $("#explosive").on("click", ".kgup, .kgdown", fatboy);
  $("#explosive").on("click", ".buyDet, .sellDet", buyDetonator);

  $("#clotharmor").on("click", ".buyarmor", sponge);
  $("#clotharmor").on("click", ".sellarmor", clearArmor);
  $("#clotharmor").on("click", ".armmodup, .armmoddown, .buyarmmod", armorModding);
  $("#clotharmor").on("click", ".buyhelmmod", helmup);

  $("#clothing").on("change", "input", fashioncost);
  $("#clothing").on("click", ".button", fashionbutton);

  $("#gearResource").on("click", ".buyUp, .sellDown", buyinbulk);
  $("#gearResource").on("click", ".buydevice", appleStore);
  $("#gearResource").on("click", ".selldevice", sellDevice);
  $("#gearResource").on("click", ".ratingUp, .ratingDown", commRating);

  $("#securitydevice").on('click', ".addmod", addingMagMod);

  $("#devices").on("click", ".programs .button", buyProgram); //this is for buying cyber programs for decks and RCCs
  $("#devices").on("click", ".linkmods .button", buylinkmod); //commlink mods

  $("#e-accessories").on("change", ".modslot select", modChange);

  $("#magicequipment").on("change", ".magicType select", spellChange);

  $("#qifoci").on("change", ".adeptPowers select", adeptPowerChange);

  $("#cyberlimbs").on("change", "select", typeOfLimb);
  //this allows for a limb to have custom str or agi. It also allows people to buy limbs, since that's also a button
  $("#cyberlimbs").on("click", ".button", customLimb);
});

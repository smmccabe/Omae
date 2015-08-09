var priorityA,
  priorityB,
  priorityC,
  priorityD,
  priorityE;

var metatype,
  attribute = 0,
  specAttribute = 0,
  magres, //what kind of emergence or awakening a character is
  skills = 0, //skill points
  knowledgepoints = 0, //knowledge skill points
  skillgroups = 0, //skill group points
  skillgroupmax = 6, //this is the max rating for a skill group
  spells = 0, //number of spells one can learn
  powerPoints = 0.0, //adept power points
  forms = 0, //number of complex forms
  nuyen = 0, //money
  ess = 6.0,
  reachmod = 0, //reachmod for trolls
  karma = 25;

var attributes = {
    current: {
      bod: 1,
      agi: 1,
      rea: 1,
      str: 1,
      wil: 1,
      log: 1,
      int: 1,
      cha: 1,
      edg: 1,
      mag: 0,
      res: 0
    },
    minimum: {
      bodmin: 1,
      agimin: 1,
      reamin: 1,
      strmin: 1,
      wilmin: 1,
      logmin: 1,
      intmin: 1,
      chamin: 1,
      edgmin: 1,
      magmin: 0,
      resmin: 0
    },
    maximum: {
      bodmax: 6,
      agimax: 6,
      reamax: 6,
      strmax: 6,
      wilmax: 6,
      logmax: 6,
      intmax: 6,
      chamax: 6,
      edgmax: 6,
      magmax: 6,
      resmax: 6
    },
    augment: {
      bod: 0,
      agi: 0,
      rea: 0,
      str: 0,
      wil: 0,
      log: 0,
      int: 0,
      cha: 0,
      edg: 0,
      mag: 0,
      res: 0
    },
    limits: {
      phyLimit: 0,
      socLimit: 0,
      menLimit: 0
    },
    limitMod: {
      phyLimitMod: 0,
      socLimitMod: 0,
      menLimitMod: 0
    },
    initiative: {
      physical: 2,
      physicalDice: 1,
      astral: 2,
      astralDice: 2,
      matrix: 1,
      matrixColdDice: 3,
      matrixHotDice: 4
    }
  },

  dataP = 0, //data processing, for TM's

  knowledgeType, //This holds which knowledge type is selected when submitting a new knowledge skill

  focinumber = 0, //number of foci that are bonded
  fociRating = 0, //the total rating of the foci
  fociMaxRating = attributes.current.mag * 2, //max rating or total foci

  maxAvail = 12; //the max availability at chargen

//@TODO - move to separate json file
activeSkills = { //the list of all the skills in the entire game forever. Catalysis needs to never release any more skills ever after this
  archery: {
    name: "Archery",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  automatics: {
    name: "Automatics",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  blades: {
    name: "Blades",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  clubs: {
    name: "Clubs",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  exoticrangedweapon: {
    name: "Exotic Ranged Weapon",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  heavyweapons: {
    name: "Heavy Weapons",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  longarms: {
    name: "Long Arms",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  pistols: {
    name: "Pistols",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  throwingweapons: {
    name: "Throwing Weapons",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  unarmedcombat: {
    name: "Unarmed Combat",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  gunnery: {
    name: "Gunnery",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  gymnastics: {
    name: "Gymnastics",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  escapeartist: {
    name: "Escape Artist",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  exoticmeleeweapon: {
    name: "Exotic Melee Weapon",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  locksmith: {
    name: "Locksmith",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  palming: {
    name: "Palming",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  sneaking: {
    name: "Sneaking",
    catalog: "agility",
    stat: "agi",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  diving: {
    name: "Diving",
    catalog: "body",
    stat: "bod",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  freefall: {
    name: "Free-Fall",
    catalog: "body",
    stat: "bod",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  pilotaerospace: {
    name: "Pilot Aerospace",
    catalog: "reaction",
    stat: "rea",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  pilotaircraft: {
    name: "Pilot Aircraft",
    catalog: "reaction",
    stat: "rea",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  pilotwalker: {
    name: "Pilot Walker",
    catalog: "reaction",
    stat: "rea",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  pilotexoticvehicle: {
    name: "Pilot Exotic Vehicle",
    catalog: "reaction",
    stat: "rea",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  pilotgroundcraft: {
    name: "Pilot Ground Craft",
    catalog: "reaction",
    stat: "rea",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  pilotwatercraft: {
    name: "Pilot Water Craft",
    catalog: "reaction",
    stat: "rea",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  running: {
    name: "Running",
    catalog: "strength",
    stat: "str",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  swimming: {
    name: "Swimming",
    catalog: "strength",
    stat: "str",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  con: {
    name: "Con",
    catalog: "charisma",
    stat: "cha",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  etiquette: {
    name: "Etiquette",
    catalog: "charisma",
    stat: "cha",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  instruction: {
    name: "Instruction",
    catalog: "charisma",
    stat: "cha",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  intimidation: {
    name: "Intimidation",
    catalog: "charisma",
    stat: "cha",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  leadership: {
    name: "Leadership",
    catalog: "charisma",
    stat: "cha",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  negotiation: {
    name: "Negotiation",
    catalog: "charisma",
    stat: "cha",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  performance: {
    name: "Performance",
    catalog: "charisma",
    stat: "cha",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  impersonation: {
    name: "Impersonation",
    catalog: "charisma",
    stat: "cha",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  animalhandling: {
    name: "Animal Handling",
    catalog: "charisma",
    stat: "cha",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  artisan: {
    name: "Artisan",
    catalog: "intuition",
    stat: "int",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  assensing: {
    name: "Assensing",
    catalog: "intuition",
    stat: "int",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  disguise: {
    name: "Disguise",
    catalog: "intuition",
    stat: "int",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  navigation: {
    name: "Navigation",
    catalog: "intuition",
    stat: "int",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  perception: {
    name: "Perception",
    catalog: "intuition",
    stat: "int",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  tracking: {
    name: "Tracking",
    catalog: "intuition",
    stat: "int",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  aeronauticsmechanics: {
    name: "Aeronautics Mechanics",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  arcane: {
    name: "Arcane",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  armorer: {
    name: "Armorer",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  automotivemechanic: {
    name: "Automotive Mechanic",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  biotechnology: {
    name: "Biotechnology",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  chemistry: {
    name: "Chemistry",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  computer: {
    name: "Computer",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  cybertechnology: {
    name: "Cybertechnology",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  cybercombat: {
    name: "Cybercombat",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  demolitions: {
    name: "Demolitions",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  electronicwarfare: {
    name: "Electronic Warfare",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  firstaid: {
    name: "First Aid",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  industrialmechanics: {
    name: "Industrial Mechanics",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  hacking: {
    name: "Hacking",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  hardware: {
    name: "Hardware",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  medicine: {
    name: "Medicine",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  nauticalmechanics: {
    name: "Nautical Mechanics",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  software: {
    name: "Software",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  forgery: {
    name: "Forgery",
    catalog: "logic",
    stat: "log",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  astralcombat: {
    name: "Astral Combat",
    catalog: "will",
    stat: "wil",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  survival: {
    name: "Survival",
    catalog: "will",
    stat: "wil",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  alchemy: {
    name: "Alchemy",
    catalog: "magic",
    stat: "mag",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: true
  },
  artificing: {
    name: "Artificing",
    catalog: "magic",
    stat: "mag",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  banishing: {
    name: "Banishing",
    catalog: "magic",
    stat: "mag",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  binding: {
    name: "Binding",
    catalog: "magic",
    stat: "mag",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  counterspelling: {
    name: "Counterspelling",
    catalog: "magic",
    stat: "mag",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  ritualspellcasting: {
    name: "Ritual Spellcasting",
    catalog: "magic",
    stat: "mag",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  spellcasting: {
    name: "Spellcasting",
    catalog: "magic",
    stat: "mag",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  summoning: {
    name: "Summoning",
    catalog: "magic",
    stat: "mag",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  disenchanting: {
    name: "Disenchanting",
    catalog: "magic",
    stat: "mag",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  compiling: {
    name: "Compiling",
    catalog: "resonance",
    stat: "res",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  decompiling: {
    name: "Decompiling",
    catalog: "resonance",
    stat: "res",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  },
  registering: {
    name: "Registering",
    catalog: "resonance",
    stat: "res",
    rating: 0,
    mod: 0,
    max: 6,
    defaultable: false
  }
};

var groupSkills = {
  acting: {
    name: "Acting",
    rating: 0,
    skillsingroup: {
      1: "con",
      2: "impersonation",
      3: "performance"
    }
  },
  athletics: {
    name: "Athletics",
    rating: 0,
    skillsingroup: {
      1: "gymnastics",
      2: "running",
      3: "swimming"
    }
  },
  biotech: {
    name: "Biotech",
    rating: 0,
    skillsingroup: {
      1: "cybertechnology",
      2: "firstaid",
      3: "medicine",
      4: "biotechnology"
    }
  },
  closecombat: {
    name: "Close Combat",
    rating: 0,
    skillsingroup: {
      1: "blades",
      2: "clubs",
      3: "unarmedcombat"
    }
  },
  conjuring: {
    name: "Conjuring",
    rating: 0,
    skillsingroup: {
      1: "banishing",
      2: "binding",
      3: "summoning"
    },
    catalog: "magic"
  },
  cracking: {
    name: "Cracking",
    rating: 0,
    skillsingroup: {
      1: "cybercombat",
      2: "electronicwarfare",
      3: "hacking"
    }
  },
  electronics: {
    name: "Electronics",
    rating: 0,
    skillsingroup: {
      1: "computer",
      2: "hardware",
      3: "software"
    }
  },
  enchanting: {
    name: "Enchanting",
    rating: 0,
    skillsingroup: {
      1: "alchemy",
      2: "artificing",
      3: "disenchanting"
    },
    catalog: "magic"
  },
  firearms: {
    name: "Firearms",
    rating: 0,
    skillsingroup: {
      1: "automatics",
      2: "longarms",
      3: "pistols"
    }
  },
  influence: {
    name: "Influence",
    rating: 0,
    skillsingroup: {
      1: "etiquette",
      2: "leadership",
      3: "negotiation"
    }
  },
  engineering: {
    name: "Engineering",
    rating: 0,
    skillsingroup: {
      1: "aeronauticsmechanics",
      2: "automotivemechanic",
      3: "industrialmechanics",
      4: "nauticalmechanics"
    }
  },
  outdoors: {
    name: "Outdoors",
    rating: 0,
    skillsingroup: {
      1: "navigation",
      2: "survival",
      3: "tracking"
    }
  },
  sorcery: {
    name: "Sorcery",
    rating: 0,
    skillsingroup: {
      1: "counterspelling",
      2: "ritualspellcasting",
      3: "spellcasting"
    }
  },
  stealth: {
    name: "Stealth",
    rating: 0,
    skillsingroup: {
      1: "disguise",
      2: "palming",
      3: "sneaking"
    }
  },
  tasking: {
    name: "Tasking",
    rating: 0,
    skillsingroup: {
      1: "compiling",
      2: "decompiling",
      3: "registering"
    }
  }
};

var knowledgeSkills = [];

var p = "Physical"; //type of spell
var m = "Mana"; //type of spell

var adeptPowers = {
  adrenalineboost: {
    name: "Adrenaline Boost",
    active: false,
    level: 0,
    cost: 0.25,
    activation: "free",
    drain: true
  },
  astralperception: {
    name: "Astral Perception",
    active: false,
    level: "n/a",
    cost: 1,
    activation: "simple",
    drain: false
  },
  attributeboostagility: {
    name: "Attribute Boost (Agility)",
    active: false,
    level: 0,
    cost: 0.25,
    activation: "simple",
    drain: true
  },
  attributeboostbody: {
    name: "Attribute Boost (Body)",
    active: false,
    level: 0,
    cost: 0.25,
    activation: "simple",
    drain: true
  },
  attributeboostreaction: {
    name: "Attribute Boost (Reaction)",
    active: false,
    level: 0,
    cost: 0.25,
    activation: "simple",
    drain: true
  },
  attributebooststrength: {
    name: "Attribute Boost (Strength)",
    active: false,
    level: 0,
    cost: 0.25,
    activation: "simple",
    drain: true
  },
  combatsense: {
    name: "Combat Sense",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false
  },
  criticalstrikeunarmed: {
    name: "Critical Strike (Unarmed)",
    active: false,
    level: "n/a",
    cost: 0.5,
    activation: "n/a",
    drain: false
  },
  criticalstrikeclubs: {
    name: "Critical Strike (Clubs)",
    active: false,
    level: "n/a",
    cost: 0.5,
    activation: "n/a",
    drain: false
  },
  criticalstrikeblades: {
    name: "Critical Strike (Blades)",
    active: false,
    level: "n/a",
    cost: 0.5,
    activation: "n/a",
    drain: false
  },
  criticalstrikeastralcombat: {
    name: "Critical Strike (Astral Combat)",
    active: false,
    level: "n/a",
    cost: 0.5,
    activation: "n/a",
    drain: false
  },
  criticalstrikeexoticweapon: {
    name: "Critical Strike (Exotic Weapon)",
    active: false,
    level: "n/a",
    cost: 0.5,
    activation: "n/a",
    drain: false
  },
  dangersense: {
    name: "Danger Sense",
    active: false,
    level: 0,
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  enhancedperception: {
    name: "Enhanced Perception",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "perception",
      2: "assensing"
    }
  },
  enhancedaccuracyarchery: {
    name: "Enhanced Accuracy (Archery)",
    active: false,
    level: "n/a",
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  enhancedaccuracyautomatics: {
    name: "Enhanced Accuracy (Automatics)",
    active: false,
    level: "n/a",
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  enhancedaccuracyblades: {
    name: "Enhanced Accuracy (Blades)",
    active: false,
    level: "n/a",
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  enhancedaccuracyclubs: {
    name: "Enhanced Accuracy (Clubs)",
    active: false,
    level: "n/a",
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  enhancedaccuracyexoticmelee: {
    name: "Enhanced Accuracy (Exotic Melee)",
    active: false,
    level: "n/a",
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  enhancedaccuracyexoticranged: {
    name: "Enhanced Accuracy (Exotic Ranged)",
    active: false,
    level: "n/a",
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  enhancedaccuracygunnery: {
    name: "Enhanced Accuracy (Gunnery)",
    active: false,
    level: "n/a",
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  enhancedaccuracyheavyweapons: {
    name: "Enhanced Accuracy (Heavy Weapons)",
    active: false,
    level: "n/a",
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  enhancedaccuracylongarms: {
    name: "Enhanced Accuracy (Longarms)",
    active: false,
    level: "n/a",
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  enhancedaccuracypistols: {
    name: "Enhanced Accuracy (Pistols)",
    active: false,
    level: "n/a",
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  enhancedaccuracythrowingweapons: {
    name: "Enhanced Accuracy (Throwing Weapons)",
    active: false,
    level: "n/a",
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  improvedabilityarchery: {
    name: "Improved Ability (Archery)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "archery"
    }
  },
  improvedabilityautomatics: {
    name: "Improved Ability (Automatics)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "automatics"
    }
  },
  improvedabilityblades: {
    name: "Improved Ability (Blades)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "blades"
    }
  },
  improvedabilityclubs: {
    name: "Improved Ability (Clubs)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "clubs"
    }
  },
  improvedabilityexoticrangedweapon: {
    name: "Improved Ability (Exotic Ranged Weapon)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "exoticrangedweapon"
    }
  },
  improvedabilityexoticmeleeweapon: {
    name: "Improved Ability (Exotic Melee Weapon)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "exoticmeleeweapon"
    }
  },
  improvedabilityheavyweapons: {
    name: "Improved Ability (Heavy Weapons)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "heavyweapons"
    }
  },
  improvedabilitylongarms: {
    name: "Improved Ability (Longarms)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "longarms"
    }
  },
  improvedabilitypistols: {
    name: "Improved Ability (Pistols)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "pistols"
    }
  },
  improvedabilitythrowingweapons: {
    name: "Improved Ability (Throwing Weapons)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "throwingweapons"
    }
  },
  improvedabilityunarmedcombat: {
    name: "Improved Ability (Unarmed Combat)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "unarmedcombat"
    }
  },
  improvedabilitydisguise: {
    name: "Improved Ability (Disguise)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "disguise"
    }
  },
  improvedabilitydiving: {
    name: "Improved Ability (Diving)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "diving"
    }
  },
  improvedabilityescapeartist: {
    name: "Improved Ability (Escape Artist)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "escapeartist"
    }
  },
  improvedabilityfreefall: {
    name: "Improved Ability (Free Fall)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "freefall"
    }
  },
  improvedabilitygymnastics: {
    name: "Improved Ability (Gymnastics)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "gymnastics"
    }
  },
  improvedabilitypalming: {
    name: "Improved Ability (Palming)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "palming"
    }
  },
  improvedabilityperception: {
    name: "Improved Ability (Perception)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "perception"
    }
  },
  improvedabilityrunning: {
    name: "Improved Ability (Running)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "running"
    }
  },
  improvedabilitysneaking: {
    name: "Improved Ability (Sneaking)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "sneaking"
    }
  },
  improvedabilitysurvival: {
    name: "Improved Ability (Survival)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "survival"
    }
  },
  improvedabilityswimming: {
    name: "Improved Ability (Swimming)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "swimming"
    }
  },
  improvedabilitytracking: {
    name: "Improved Ability (Tracking)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "tracking"
    }
  },
  improvedabilitycon: {
    name: "Improved Ability (Con)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "con"
    }
  },
  improvedabilityetiquette: {
    name: "Improved Ability (Etiquette)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "etiquette"
    }
  },
  improvedabilityimpersonation: {
    name: "Improved Ability (Impersonation)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "impersonation"
    }
  },
  improvedabilityinstruction: {
    name: "Improved Ability (Instruction)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "instruction"
    }
  },
  improvedabilityintimidation: {
    name: "Improved Ability (Intimidation)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "intimidation"
    }
  },
  improvedabilityleadership: {
    name: "Improved Ability (Leadership)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "leadership"
    }
  },
  improvedabilitynegotiation: {
    name: "Improved Ability (Negotiation)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "negotiation"
    }
  },
  improvedabilityperformance: {
    name: "Improved Ability (Performance)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "performance"
    }
  },
  improvedabilityaeronauticsmechanic: {
    name: "Improved Ability (Aeronautics Mechanic)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "aeronauticsmechanic"
    }
  },
  improvedabilityanimalhandling: {
    name: "Improved Ability (Animal Handling)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "animalhandling"
    }
  },
  improvedabilityarmorer: {
    name: "Improved Ability (Armorer)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "armorer"
    }
  },
  improvedabilityartisan: {
    name: "Improved Ability (Artisan)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "artisan"
    }
  },
  improvedabilityautomotivemechanic: {
    name: "Improved Ability (Automotive Mechanic)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "automotivemechanic"
    }
  },
  improvedabilitybiotechnology: {
    name: "Improved Ability (Biotechnology)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "biotechnology"
    }
  },
  improvedabilitychemistry: {
    name: "Improved Ability (Chemistry)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "chemistry"
    }
  },
  improvedabilitycomputer: {
    name: "Improved Ability (Computer)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "computer"
    }
  },
  improvedabilitycybercombat: {
    name: "Improved Ability (Cybercombat)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "cybercombat"
    }
  },
  improvedabilitycybertechnology: {
    name: "Improved Ability (Cybertechnology)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "cybertechnology"
    }
  },
  improvedabilitydemolitions: {
    name: "Improved Ability (Demolitions)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "demolitions"
    }
  },
  improvedabilityelectronicwarfare: {
    name: "Improved Ability (Electronic Warfare)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "electronicwarfare"
    }
  },
  improvedabilityfirstaid: {
    name: "Improved Ability (First Aid)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "firstaid"
    }
  },
  improvedabilityforgery: {
    name: "Improved Ability (Forgery)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "forgery"
    }
  },
  improvedabilityhacking: {
    name: "Improved Ability (Hacking)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "hacking"
    }
  },
  improvedabilityhardware: {
    name: "Improved Ability (Hardware)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "hardware"
    }
  },
  improvedabilityindustrialmechanic: {
    name: "Improved Ability (Industrial Mechanic)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "industrialmechanic"
    }
  },
  improvedabilitylocksmith: {
    name: "Improved Ability (Locksmith)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "locksmith"
    }
  },
  improvedabilitymedicine: {
    name: "Improved Ability (Medicine)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "medicine"
    }
  },
  improvedabilitynauticalmechanic: {
    name: "Improved Ability (Nautical Mechanic)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "nauticalmechanic"
    }
  },
  improvedabilitynavigation: {
    name: "Improved Ability (Navigation)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "navigation"
    }
  },
  improvedabilitysoftware: {
    name: "Improved Ability (Software)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "software"
    }
  },
  improvedabilitygunnery: {
    name: "Improved Ability (Gunnery)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "gunnery"
    }
  },
  improvedabilitypilotaerospace: {
    name: "Improved Ability (Pilot Aerospace)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "pilotaerospace"
    }
  },
  improvedabilitypilotaircraft: {
    name: "Improved Ability (Pilot Aircraft)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "pilotaircraft"
    }
  },
  improvedabilitypilotwalker: {
    name: "Improved Ability (Pilot Walker)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "pilotwalker"
    }
  },
  improvedabilitypilotexotic: {
    name: "Improved Ability (Pilot Exotic)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "pilotexotic"
    }
  },
  improvedabilitypilotgroundcraft: {
    name: "Improved Ability (Pilot Ground Craft)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "pilotgroundcraft"
    }
  },
  improvedabilitypilotwatercraft: {
    name: "Improved Ability (Pilot Watercraft)",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false,
    skillmod: {
      1: "pilotwatercraft"
    }
  },
  improvedphysicalattributebody: {
    name: "Improved Physical Attribute (Body)",
    active: false,
    level: 0,
    cost: 1,
    activation: "n/a",
    drain: false,
    attmod: {
      1: "body"
    }
  },
  improvedphysicalattributeagility: {
    name: "Improved Physical Attribute (Agility)",
    active: false,
    level: 0,
    cost: 1,
    activation: "n/a",
    drain: false,
    attmod: {
      1: "agility"
    }
  },
  improvedphysicalattributereaction: {
    name: "Improved Physical Attribute (Reaction)",
    active: false,
    level: 0,
    cost: 1,
    activation: "n/a",
    drain: false,
    attmod: {
      1: "reaction"
    }
  },
  improvedphysicalattributestrength: {
    name: "Improved Physical Attribute (Strength)",
    active: false,
    level: 0,
    cost: 1,
    activation: "n/a",
    drain: false,
    attmod: {
      1: "strength"
    }
  },
  improvedpotentialphysical: {
    name: "Improved Potential (Physical)",
    active: false,
    level: "n/a",
    cost: 0.5,
    activation: "n/a",
    drain: false,
    limitmod: {
      1: "physical"
    }
  },
  improvedpotentialmental: {
    name: "Improved Potential (Mental)",
    active: false,
    level: "n/a",
    cost: 0.5,
    activation: "n/a",
    drain: false,
    limitmod: {
      1: "mental"
    }
  },
  improvedpotentialsocial: {
    name: "Improved Potential (Social)",
    active: false,
    level: "n/a",
    cost: 0.5,
    activation: "n/a",
    drain: false,
    limitmod: {
      1: "social"
    }
  },
  improvedreflexes: {
    name: "Improved Reflexes",
    active: false,
    level: 0,
    cost: 1.5,
    activation: "n/a",
    drain: false
  },
  improvedsense: {
    name: "Improved Sense",
    active: false,
    level: 0,
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  killinghands: {
    name: "Killing Hands",
    active: true,
    level: 0,
    cost: 0.5,
    activation: "free",
    drain: false
  },
  kinesics: {
    name: "Kinesics",
    active: false,
    level: 0,
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  lightbody: {
    name: "Light Body",
    active: false,
    level: 0,
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  missileparry: {
    name: "Missile Parry",
    active: true,
    level: 0,
    cost: 0.25,
    activation: "interrupt",
    drain: false
  },
  mysticarmor: {
    name: "Mystic Armor",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false
  },
  naturalimmunity: {
    name: "Natural Immunity",
    active: false,
    level: 0,
    cost: 0.25,
    activation: "n/a",
    drain: false
  },
  painresistance: {
    name: "Pain Resistance",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false
  },
  rapidhealing: {
    name: "Rapid Healing",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false
  },
  spellresistance: {
    name: "Spell Resistance",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false
  },
  tracelesswalk: {
    name: "Traceless Walk",
    active: false,
    level: 0,
    cost: 1,
    activation: "n/a",
    drain: false
  },
  voicecontrol: {
    name: "Voice Control",
    active: false,
    level: 0,
    cost: 0.5,
    activation: "n/a",
    drain: false
  },
  wallrunning: {
    name: "Wall Running",
    active: true,
    level: 0,
    cost: 0.5,
    activation: "simple",
    drain: false
  }
};

var spellforms = { //list of all the spells
  //combat spells
  acidstream: {
    name: "Acid Stream",
    category: "combat",
    spell: false,
    preparation: false,
    direct: false,
    element: "Acid",
    type: "Physical",
    range: "LOS",
    damage: "Physical",
    duration: "Instant",
    drain: "F-3"
  },
  toxicwave: {
    name: "Toxic Wave",
    category: "combat",
    spell: false,
    preparation: false,
    direct: false,
    element: "Acid",
    type: p,
    range: "LOS(A)",
    damage: "Physical",
    duration: "Instant",
    drain: "F-1"
  },
  punch: {
    name: "Punch",
    category: "combat",
    spell: false,
    preparation: false,
    direct: false,
    element: "None",
    type: p,
    range: "T",
    damage: "Stun",
    duration: "Instant",
    drain: "F-6"
  },
  clout: {
    name: "Clout",
    category: "combat",
    spell: false,
    preparation: false,
    direct: false,
    element: "None",
    type: p,
    range: "LOS",
    damage: "Stun",
    duration: "Instant",
    drain: "F-3"
  },
  blast: {
    name: "Blast",
    category: "combat",
    spell: false,
    preparation: false,
    direct: false,
    element: "None",
    type: p,
    range: "LOS(A)",
    damage: "Stun",
    duration: "Instant",
    drain: "F"
  },
  deathtouch: {
    name: "Death Touch",
    category: "combat",
    spell: false,
    preparation: false,
    direct: true,
    element: "None",
    type: m,
    range: "T",
    damage: "Physical",
    duration: "Instant",
    drain: "F-6"
  },
  manabolt: {
    name: "Manabolt",
    category: "combat",
    spell: false,
    preparation: false,
    direct: true,
    element: "None",
    type: m,
    range: "LOS",
    damage: "Physical",
    duration: "Instant",
    drain: "F-3"
  },
  manaball: {
    name: "Manaball",
    category: "combat",
    spell: false,
    preparation: false,
    direct: true,
    element: "None",
    type: m,
    range: "LOS(A)",
    damage: "Physical",
    duration: "Instant",
    drain: "F"
  },
  flamethrower: {
    name: "Flamethrower",
    category: "combat",
    spell: false,
    preparation: false,
    direct: false,
    element: "Fire",
    type: p,
    range: "LOS",
    damage: "Physical",
    duration: "Instant",
    drain: "F-3"
  },
  fireball: {
    name: "Fireball",
    category: "combat",
    spell: false,
    preparation: false,
    direct: false,
    element: "Fire",
    type: p,
    range: "LOS(A)",
    damage: "Physical",
    duration: "Instant",
    drain: "F-1"
  },
  lightningbolt: {
    name: "Lightning Bolt",
    category: "combat",
    spell: false,
    preparation: false,
    direct: false,
    element: "Electricity",
    type: p,
    range: "LOS",
    damage: "Physical",
    duration: "Instant",
    drain: "F-3"
  },
  balllightning: {
    name: "Ball Lightning",
    category: "combat",
    spell: false,
    preparation: false,
    direct: false,
    element: "Electricity",
    type: p,
    range: "LOS(A)",
    damage: "Physical",
    duration: "Instant",
    drain: "F-1"
  },
  shatter: {
    name: "Shatter",
    category: "combat",
    spell: false,
    preparation: false,
    direct: true,
    element: "None",
    type: p,
    range: "T",
    damage: "Physical",
    duration: "Instant",
    drain: "F-6"
  },
  powerbolt: {
    name: "Powerbolt",
    category: "combat",
    spell: false,
    preparation: false,
    direct: true,
    element: "None",
    type: p,
    range: "LOS",
    damage: "Physical",
    duration: "Instant",
    drain: "F-3"
  },
  powerball: {
    name: "Powerball",
    category: "combat",
    spell: false,
    preparation: false,
    direct: true,
    element: "None",
    type: p,
    range: "LOS(A)",
    damage: "Physical",
    duration: "Instant",
    drain: "F"
  },
  knockout: {
    name: "Knockout",
    category: "combat",
    spell: false,
    preparation: false,
    direct: true,
    element: "None",
    type: m,
    range: "T",
    damage: "Stun",
    duration: "Instant",
    drain: "F-6"
  },
  stunbolt: {
    name: "Stunbolt",
    category: "combat",
    spell: false,
    preparation: false,
    direct: true,
    element: "None",
    type: m,
    range: "LOS",
    damage: "Stun",
    duration: "Instant",
    drain: "F-3"
  },
  stunball: {
    name: "Stunball",
    category: "combat",
    spell: false,
    preparation: false,
    direct: true,
    element: "None",
    type: m,
    range: "LOS(A)",
    damage: "Stun",
    duration: "Instant",
    drain: "F"
  },
  //detection spells
  analyzedevice: {
    name: "Analyze Device",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Directional",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-3"
  },
  analyzemagic: {
    name: "Analyze Magic",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Directional",
    type: p,
    range: "T",
    duration: "Sustain",
    drain: "F-3"
  },
  analyzetruth: {
    name: "Analyze Truth",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Directional",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-2"
  },
  clairaudience: {
    name: "Clairaudience",
    category: "detection",
    spell: false,
    preparation: false,
    active: "passive",
    direction: "Directional",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-3"
  },
  clairvoyance: {
    name: "Clairvoyance",
    category: "detection",
    spell: false,
    preparation: false,
    active: "passive",
    direction: "Directional",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-3"
  },
  combatsense: {
    name: "Combat Sense",
    category: "detection",
    spell: false,
    preparation: false,
    active: "passive",
    direction: "Psychic",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F"
  },
  detectenemies: {
    name: "Detect Enemies",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Area",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-2"
  },
  detectenemiesextended: {
    name: "Detect Enemies, Extended",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Extended Area",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F"
  },
  detectindividual: {
    name: "Detect Individual",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Area",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-3"
  },
  detectlife: {
    name: "Detect Life",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Area",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-3"
  },
  detectlifeextended: {
    name: "Detect Life, Extended",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Extended Area",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-1"
  },
  detectlifeform: {
    name: "Detect [Life Form]",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Area",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-2"
  },
  detectlifeformextended: {
    name: "Detect [Life Form], Extended",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Extended Area",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F"
  },
  detectmagic: {
    name: "Detect Magic",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Area",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-2"
  },
  detectmagicextended: {
    name: "Detect Magic, Extended",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Extended Area",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F"
  },
  detectobject: {
    name: "Detect [Object]",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Area",
    type: p,
    range: "T",
    duration: "Sustain",
    drain: "F-2"
  },
  mindlink: {
    name: "Mindlink",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Psychic",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-1"
  },
  mindprobe: {
    name: "Mind Probe",
    category: "detection",
    spell: false,
    preparation: false,
    active: "active",
    direction: "Directional",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F"
  },
  //Health Spell
  antidote: {
    name: "Antidote",
    category: "health",
    spell: false,
    preparation: false,
    essence: false,
    type: m,
    range: "T",
    duration: "Permanent",
    drain: "F-3"
  },
  curedisease: {
    name: "Cure Disease",
    category: "health",
    spell: false,
    preparation: false,
    essence: true,
    type: m,
    range: "T",
    duration: "Permanent",
    drain: "F-4"
  },
  decreaseattribute: {
    name: "Decrease [Attribute]",
    category: "health",
    spell: false,
    preparation: false,
    essence: true,
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-2"
  },
  detox: {
    name: "Detox",
    category: "health",
    spell: false,
    preparation: false,
    essence: false,
    type: m,
    range: "T",
    duration: "Permanent",
    drain: "F-6"
  },
  heal: {
    name: "Heal",
    category: "health",
    spell: false,
    preparation: false,
    essence: true,
    type: m,
    range: "T",
    duration: "Permanent",
    drain: "F-4"
  },
  increaseattribute: {
    name: "Increase [Attribute]",
    category: "health",
    spell: false,
    preparation: false,
    essence: true,
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-3"
  },
  increasereflexes: {
    name: "Increase Reflexes",
    category: "health",
    spell: false,
    preparation: false,
    essence: true,
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F"
  },
  oxygenate: {
    name: "Oxygenate",
    category: "health",
    spell: false,
    preparation: false,
    essence: false,
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-5"
  },
  prophylaxis: {
    name: "Prophylaxis",
    category: "health",
    spell: false,
    preparation: false,
    essence: false,
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-4"
  },
  resistpain: {
    name: "Resist Pain",
    category: "health",
    spell: false,
    preparation: false,
    essence: false,
    type: m,
    range: "T",
    duration: "Permanent",
    drain: "F-4"
  },
  stabilize: {
    name: "Stabilize",
    category: "health",
    spell: false,
    preparation: false,
    essence: false,
    type: m,
    range: "T",
    duration: "Permanent",
    drain: "F-4"
  },
  //illusion spells
  agony: {
    name: "Agony",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Single-Sense",
    type: m,
    range: "LOS",
    duration: "Sustain",
    drain: "F-4"
  },
  massagony: {
    name: "Mass Agony",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Single-Sense",
    type: m,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-2"
  },
  bugs: {
    name: "Bugs",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Multi-Sense",
    type: m,
    range: "LOS",
    duration: "Sustain",
    drain: "F-3"
  },
  swarm: {
    name: "Swarm",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Multi-Sense",
    type: m,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-1"
  },
  confusion: {
    name: "Confusion",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Multi-Sense",
    type: m,
    range: "LOS",
    duration: "Sustain",
    drain: "F-3"
  },
  massconfusion: {
    name: "Mass Confusion",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Multi-Sense",
    type: m,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-1"
  },
  chaos: {
    name: "Chaos",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Multi-Sense",
    type: p,
    range: "LOS",
    duration: "Sustain",
    drain: "F-2"
  },
  chaoticworld: {
    name: "Chaotic World",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Multi-Sense",
    type: p,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F"
  },
  entertainment: {
    name: "Entertainment",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: false,
    sense: "Multi-Sense",
    type: m,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-3"
  },
  tridentertainment: {
    name: "Trid Entertainment",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: false,
    sense: "Multi-Sense",
    type: p,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-2"
  },
  invisibility: {
    name: "Invisibility",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Single-Sense",
    type: m,
    range: "LOS",
    duration: "Sustain",
    drain: "F-2"
  },
  improvedinvisibility: {
    name: "Improved Invisibility",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Single-Sense",
    type: p,
    range: "LOS",
    duration: "Sustain",
    drain: "F-1"
  },
  mask: {
    name: "Mask",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Multi-Sense",
    type: m,
    range: "T",
    duration: "Sustain",
    drain: "F-2"
  },
  physicalmask: {
    name: "Physical Mask",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Multi-Sense",
    type: p,
    range: "T",
    duration: "Sustain",
    drain: "F-1"
  },
  phantasm: {
    name: "Phantasm",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Multi-Sense",
    type: m,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-1"
  },
  tridphantasm: {
    name: "Trid Phantasm",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Multi-Sense",
    type: p,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F"
  },
  hush: {
    name: "Hush",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Single-Sense",
    type: m,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-2"
  },
  silence: {
    name: "Silence",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Single-Sense",
    type: p,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-1"
  },
  stealth: {
    name: "Stealth",
    category: "illusion",
    spell: false,
    preparation: false,
    realistic: true,
    sense: "Single-Sense",
    type: p,
    range: "LOS",
    duration: "Sustain",
    drain: "F-2"
  },
  //manipulation spells
  animate: {
    name: "Animate",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "physical",
    damage: false,
    type: p,
    range: "LOS",
    duration: "Sustain",
    drain: "F-1"
  },
  massanimate: {
    name: "Mass Animate",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "physical",
    damage: false,
    type: p,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F+1"
  },
  armor: {
    name: "Armor",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "physical",
    damage: false,
    type: p,
    range: "LOS",
    duration: "Sustain",
    drain: "F-2"
  },
  controlactions: {
    name: "Control Actions",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "mental",
    damage: false,
    type: m,
    range: "LOS",
    duration: "Sustain",
    drain: "F-1"
  },
  mobcontrol: {
    name: "Mob Control",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "mental",
    damage: false,
    type: m,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F+1"
  },
  controlthoughts: {
    name: "Control Thoughts",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "mental",
    damage: false,
    type: m,
    range: "LOS",
    duration: "Sustain",
    drain: "F-1"
  },
  mobmind: {
    name: "Mob Mind",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "mental",
    damage: false,
    type: m,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F+1"
  },
  fling: {
    name: "Fling",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "physical",
    damage: true,
    type: p,
    range: "LOS",
    duration: "Instant",
    drain: "F-2"
  },
  icesheet: {
    name: "Ice Sheet",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "environmental",
    damage: false,
    type: p,
    range: "LOS(A)",
    duration: "Instant",
    drain: "F"
  },
  ignite: {
    name: "Ignite",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "physical",
    damage: false,
    type: p,
    range: "LOS",
    duration: "Permanent",
    drain: "F-1"
  },
  influence: {
    name: "Influence",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "mental",
    damage: false,
    type: m,
    range: "LOS",
    duration: "Permanent",
    drain: "F-1"
  },
  levitate: {
    name: "Levitate",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "physical",
    damage: false,
    type: p,
    range: "LOS",
    duration: "Sustain",
    drain: "F-2"
  },
  light: {
    name: "Light",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "environmental",
    damage: false,
    type: p,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-4"
  },
  magicfingers: {
    name: "Magic Fingers",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "physical",
    damage: false,
    type: p,
    range: "LOS",
    duration: "Sustain",
    drain: "F-2"
  },
  manabarrier: {
    name: "Mana Barrier",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "environmental",
    damage: false,
    type: m,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-2"
  },
  physicalbarrier: {
    name: "Physical Barrier",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "environmental",
    damage: false,
    type: p,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-1"
  },
  poltergeist: {
    name: "Poltergeist",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "environmental",
    damage: false,
    type: p,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-2"
  },
  shadow: {
    name: "Shadow",
    category: "manipulation",
    spell: false,
    preparation: false,
    effect: "environmental",
    damage: false,
    type: p,
    range: "LOS(A)",
    duration: "Sustain",
    drain: "F-3"
  }
};

var complexforms = {
  cleaner: {
    name: "Cleaner",
    formact: false,
    target: "Persona",
    duration: "Permanent",
    fading: "L + 1"
  },
  diffusionattack: {
    name: "Diffusion [Attack]",
    formact: false,
    target: "Device",
    duration: "Sustained",
    fading: "L + 1"
  },
  diffusionsleaze: {
    name: "Diffusion [Sleaze]",
    formact: false,
    target: "Device",
    duration: "Sustained",
    fading: "L + 1"
  },
  diffusiondataprocessing: {
    name: "Diffusion [Data Processing]",
    formact: false,
    target: "Device",
    duration: "Sustained",
    fading: "L + 1"
  },
  diffusionfirewall: {
    name: "Diffusion [Firewall]",
    formact: false,
    target: "Device",
    duration: "Sustained",
    fading: "L + 1"
  },
  editor: {
    name: "Editor",
    formact: false,
    target: "File",
    duration: "Permanent",
    fading: "L + 2"
  },
  infusionattack: {
    name: "Infusion [Attack]",
    formact: false,
    target: "Device",
    duration: "Sustained",
    fading: "L + 1"
  },
  infusionsleaze: {
    name: "Infusion [Sleaze]",
    formact: false,
    target: "Device",
    duration: "Sustained",
    fading: "L + 1"
  },
  infusiondataprocessing: {
    name: "Infusion [Data Processing]",
    formact: false,
    target: "Device",
    duration: "Sustained",
    fading: "L + 1"
  },
  infusionfirewall: {
    name: "Infusion [Firewall]",
    formact: false,
    target: "Device",
    duration: "Sustained",
    fading: "L + 1"
  },
  staticveil: {
    name: "Static Veil",
    formact: false,
    target: "Persona",
    duration: "Sustained",
    fading: "L - 1"
  },
  pulsestorm: {
    name: "Pulse Storm",
    formact: false,
    target: "Persona",
    duration: "Immediate",
    fading: "L + 0"
  },
  puppeteer: {
    name: "Puppeteer",
    formact: false,
    target: "Device",
    duration: "Immediate",
    fading: "L + 4"
  },
  resonancechannel: {
    name: "Resonance Channel",
    formact: false,
    target: "Device",
    duration: "Sustained",
    fading: "L - 1"
  },
  resonancespike: {
    name: "Resonance Spike",
    formact: false,
    target: "Device",
    duration: "Immediate",
    fading: "L + 0"
  },
  resonanceveil: {
    name: "Resonance Veil",
    formact: false,
    target: "Device",
    duration: "Sustained",
    fading: "L - 1"
  },
  staticbomb: {
    name: "Static Bomb",
    formact: false,
    target: "Self",
    duration: "Immediate",
    fading: "L + 2"
  },
  stiches: {
    name: "Stiches",
    formact: false,
    target: "Sprite",
    duration: "Permanent",
    fading: "L - 2"
  },
  transcendentgrid: {
    name: "Transcendent Grid",
    formact: false,
    target: "Self",
    duration: "Immediate",
    fading: "L - 3"
  },
  tattletale: {
    name: "Tattletale",
    formact: false,
    target: "Persona",
    duration: "Permanent",
    fading: "L - 2"
  }
};

var weapons = {
  //blades
  combataxe: {
    name: "Combat axe",
    active: false,
    category: "blades",
    skill: "blades",
    accuracy: 4,
    accmod: 0,
    reach: 2,
    damage: 5,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -4,
    avail: 12,
    restrict: "Restricted",
    cost: 4000,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  combatknife: {
    name: "Combat knife",
    active: false,
    category: "blades",
    skill: "blades",
    accuracy: 6,
    accmod: 0,
    reach: 0,
    damage: 2,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -3,
    avail: 4,
    restrict: " ",
    cost: 300,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  forearmsnapblades: {
    name: "Forearm snap-blades",
    active: false,
    category: "blades",
    skill: "blades",
    accuracy: 4,
    accmod: 0,
    reach: 0,
    damage: 2,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -2,
    avail: 7,
    restrict: "Restricted",
    cost: 200,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  katana: {
    name: "Katana",
    active: false,
    category: "blades",
    skill: "blades",
    accuracy: 7,
    accmod: 0,
    reach: 1,
    damage: 3,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -3,
    avail: 9,
    restrict: "Restricted",
    cost: 1000,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  knife: {
    name: "Knife",
    active: false,
    category: "blades",
    skill: "blades",
    accuracy: 5,
    accmod: 0,
    reach: 0,
    damage: 1,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -1,
    avail: 0,
    restrict: " ",
    cost: 10,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  polearm: {
    name: "Pole arm",
    active: false,
    category: "blades",
    skill: "blades",
    accuracy: 5,
    accmod: 0,
    reach: 3,
    damage: 3,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -2,
    avail: 6,
    restrict: "Restricted",
    cost: 1000,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  survivalknife: {
    name: "Survival knife",
    active: false,
    category: "blades",
    skill: "blades",
    accuracy: 5,
    accmod: 0,
    reach: 0,
    damage: 2,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -1,
    avail: 0,
    restrict: " ",
    cost: 100,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  sword: {
    name: "Sword",
    active: false,
    category: "blades",
    skill: "blades",
    accuracy: 6,
    accmod: 0,
    reach: 1,
    damage: 3,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -2,
    avail: 5,
    restrict: "Restricted",
    cost: 500,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  //clubs
  club: {
    name: "Club",
    active: false,
    category: "clubs",
    skill: "clubs",
    accuracy: 4,
    accmod: 0,
    reach: 1,
    damage: 3,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: 0,
    avail: 0,
    restrict: " ",
    cost: 30,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  extendablebaton: {
    name: "Extendable Baton",
    active: false,
    category: "clubs",
    skill: "clubs",
    accuracy: 5,
    accmod: 0,
    reach: 1,
    damage: 2,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: 0,
    avail: 4,
    restrict: " ",
    cost: 100,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  sap: {
    name: "Sap",
    active: false,
    category: "clubs",
    skill: "clubs",
    accuracy: 5,
    accmod: 0,
    reach: 0,
    damage: 2,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: 0,
    avail: 2,
    restrict: " ",
    cost: 30,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  staff: {
    name: "Staff",
    active: false,
    category: "clubs",
    skill: "clubs",
    accuracy: 6,
    accmod: 0,
    reach: 2,
    damage: 3,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: 0,
    avail: 3,
    restrict: " ",
    cost: 100,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  stunbaton: {
    name: "Stun Baton",
    active: false,
    category: "clubs",
    skill: "clubs",
    accuracy: 4,
    accmod: 0,
    reach: 1,
    damage: 9,
    stat: 0,
    dvmod: 0,
    damtype: "Stun",
    element: "Electricity",
    ap: -5,
    avail: 6,
    restrict: "Restricted",
    cost: 750,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  telescopingstaff: {
    name: "Telescoping Staff",
    active: false,
    category: "clubs",
    skill: "clubs",
    accuracy: 4,
    accmod: 0,
    reach: 2,
    damage: 2,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: 0,
    avail: 4,
    restrict: " ",
    cost: 350,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  //unarmed
  knucks: {
    name: "Knucks",
    active: false,
    category: "unarmedcombat",
    skill: "unarmedcombat",
    accuracy: attributes.limits.phyLimit,
    accmod: 0,
    reach: 0,
    damage: 1,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: 0,
    avail: 2,
    restrict: "Restricted",
    cost: 100,
    ref: {
      book: "SR5",
      page: "422,423"
    }
  },
  shockgloves: {
    name: "Shock Gloves",
    active: false,
    category: "unarmedcombat",
    skill: "unarmedcombat",
    accuracy: attributes.limits.phyLimit,
    accmod: 0,
    reach: 0,
    damage: 8,
    stat: 0,
    dvmod: 0,
    damtype: "Stun",
    element: "Electricity",
    ap: -5,
    avail: 6,
    restrict: "Restricted",
    cost: 550,
    ref: {
      book: "SR5",
      page: "423"
    }
  },
  //exotic melee weapon
  monofilamentwhip: {
    name: "Monofilament Whip",
    active: false,
    category: "exoticmeleeweapon",
    skill: "monofilamentwhip",
    skillName: "Monofilament Whip",
    accuracy: 5,
    accmod: 2,
    reach: 2,
    damage: 12,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -8,
    avail: 12,
    restrict: "Forbidden",
    cost: 10000,
    ref: {
      book: "SR5",
      page: "423"
    }
  },
  monofilamentchainsaw: {
    name: "Monofilament Chainsaw",
    active: false,
    category: "exoticmeleeweapon",
    skill: "chainsaw",
    skillName: "Chainsaw",
    accuracy: 3,
    accmod: 0,
    reach: 1,
    damage: 8,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -6,
    avail: 8,
    restrict: "",
    cost: 500,
    ref: {
      book: "SR5",
      page: "448"
    }
  },
  //bow
  bow: {
    name: "Bow",
    active: false,
    rating: 1,
    category: "bow",
    skill: "archery",
    accuracy: 6,
    accmod: 0,
    damage: attributes.current.str + 2,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -1,
    avail: 1,
    restrict: " ",
    cost: 100,
    ref: {
      book: "SR5",
      page: "423,424"
    }
  },
  //crossbow
  lightcrossbow: {
    name: "Light",
    active: false,
    category: "crossbow",
    skill: "archery",
    accuracy: 7,
    accmod: 0,
    damage: 5,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -1,
    avail: 2,
    restrict: " ",
    cost: 300,
    ref: {
      book: "SR5",
      page: "424"
    }
  },
  mediumcrossbow: {
    name: "Medium",
    active: false,
    category: "crossbow",
    skill: "archery",
    accuracy: 6,
    accmod: 0,
    damage: 7,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -2,
    avail: 4,
    restrict: "Restricted",
    cost: 500,
    ref: {
      book: "SR5",
      page: "424"
    }
  },
  heavycrossbow: {
    name: "Heavy",
    active: false,
    category: "crossbow",
    skill: "archery",
    accuracy: 5,
    accmod: 0,
    damage: 10,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -3,
    avail: 8,
    restrict: "Restricted",
    cost: 1000,
    ref: {
      book: "SR5",
      page: "424"
    }
  },
  //throwing weapons
  shuriken: {
    name: "shuriken",
    active: false,
    category: "throwingweapons",
    skill: "throwingweapons",
    rating: 0,
    accuracy: attributes.limits.phyLimit,
    accmod: 0,
    damage: 1,
    stat: attributes.current.str,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    ap: -1,
    avail: 4,
    restrict: "Restricted",
    cost: 25,
    ref: {
      book: "SR5",
      page: "424"
    }
  },

  //firearms
  //tasers
  defianceexshocker: {
    name: "Defiance EX Shocker",
    active: false,
    category: "tasers",
    skill: "pistols",
    accuracy: 4,
    accmod: 0,
    damage: 9,
    stat: 0,
    dvmod: 0,
    damtype: "Stun",
    element: "Electricity",
    mode: {
      SS: "Single Shot"
    },
    rc: 0,
    rcmod: 0,
    ammo: 4,
    clip: "Internal Mag",
    ap: -5,
    avail: 0,
    restrict: " ",
    cost: 250,
    mods: {
      top: "empty",
      barrel: "n/a",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  yamahapulsar: {
    name: "Yamaha Pulsar",
    active: false,
    category: "tasers",
    skill: "pistols",
    accuracy: 5,
    accmod: 0,
    damage: 7,
    stat: 0,
    dvmod: 0,
    damtype: "Stun",
    element: "Electricity",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 4,
    clip: "Internal Mag",
    ap: -5,
    avail: 0,
    restrict: " ",
    cost: 180,
    mods: {
      top: "empty",
      barrel: "n/a",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },

  //holdouts
  fichettitigganineedler: {
    name: "Fichetti Tiggani Needler",
    active: false,
    category: "holdouts",
    skill: "pistols",
    accuracy: 5,
    accmod: 0,
    damage: 8,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: "Flechette",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 4,
    clip: "Clip",
    ap: 5,
    avail: 5,
    restrict: "Restricted",
    cost: 1000,
    mods: {
      top: "n/a",
      barrel: "n/a",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  streetlinespecial: {
    name: "Streetline Special",
    active: false,
    category: "holdouts",
    skill: "pistols",
    accuracy: 4,
    accmod: 0,
    damage: 6,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 6,
    clip: "Clip",
    ap: 0,
    avail: 4,
    restrict: "Restricted",
    cost: 120,
    mods: {
      top: "n/a",
      barrel: "n/a",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  waltherpalmpistol: {
    name: "Walther Palm Pistol",
    active: false,
    category: "holdouts",
    skill: "pistols",
    accuracy: 4,
    accmod: 0,
    damage: 7,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire"
    },
    rc: 0,
    rcmod: 0,
    ammo: 2,
    clip: "Break Action",
    ap: 0,
    avail: 4,
    restrict: "Restricted",
    cost: 180,
    mods: {
      top: "n/a",
      barrel: "n/a",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },

  //lightpistols
  areslightfire75: {
    name: "Ares Light Fire 75",
    active: false,
    category: "lightpistols",
    skill: "pistols",
    accuracy: 6,
    accmod: 2,
    damage: 6,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 16,
    clip: "Clip",
    ap: 0,
    avail: 6,
    restrict: "Forbidden",
    cost: 1250,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "Smartgun",
      integral: "Silencer"
    }
  },
  areslightfire70: {
    name: "Ares Light Fire 70",
    active: false,
    category: "lightpistols",
    skill: "pistols",
    accuracy: 7,
    accmod: 0,
    damage: 6,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 16,
    clip: "Clip",
    ap: 0,
    avail: 3,
    restrict: "Restricted",
    cost: 200,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  beretta201t: {
    name: "Beretta 201T",
    active: false,
    category: "lightpistols",
    skill: "pistols",
    accuracy: 6,
    accmod: 0,
    damage: 6,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire"
    },
    rc: 0,
    rcmod: 1,
    ammo: 21,
    clip: "Clip",
    ap: 0,
    avail: 7,
    restrict: "Restricted",
    cost: 210,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  coltamerical36: {
    name: "Colt America L36",
    active: false,
    category: "lightpistols",
    skill: "pistols",
    accuracy: 7,
    accmod: 0,
    damage: 7,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 11,
    clip: "Clip",
    ap: 0,
    avail: 4,
    restrict: "Restricted",
    cost: 320,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  fichettisecurity600: {
    name: "Fichetti Security 600",
    active: false,
    category: "lightpistols",
    skill: "pistols",
    accuracy: 6,
    accmod: 1,
    damage: 7,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 1,
    ammo: 30,
    clip: "Clip",
    ap: 0,
    avail: 6,
    restrict: "Restricted",
    cost: 350,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "Laser Sight"
    }
  },
  taurusomni6: {
    name: "Taurus Omni-6",
    active: false,
    category: "lightpistols",
    skill: "pistols",
    accuracy: 5,
    accmod: 1,
    damage: 6,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 6,
    altammo: {
      damage: 7,
      mode: {
        SS: "Single Shot"
      },
      ap: -1
    },
    clip: "Detachable Cylinder",
    ap: 0,
    avail: 3,
    restrict: "Restricted",
    cost: 300,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "Laser Sight"
    }
  },

  //heavypistols
  arespredatorv: {
    name: "Ares Predator V",
    active: false,
    category: "heavypistols",
    skill: "pistols",
    accuracy: 5,
    accmod: 2,
    damage: 8,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 15,
    clip: "Clip",
    ap: -1,
    avail: 5,
    restrict: "Restricted",
    cost: 725,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "Smartgun",
      integral: "n/a"
    }
  },
  aresviperslivergun: {
    name: "Ares Viper Slivergun",
    active: false,
    category: "heavypistols",
    skill: "pistols",
    accuracy: 4,
    accmod: 0,
    damage: 9,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: "Flechette",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire"
    },
    rc: 0,
    rcmod: 0,
    ammo: 15,
    clip: "Clip",
    ap: +4,
    avail: 8,
    restrict: "Forbidden",
    cost: 380,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "Silencer"
    }
  },
  browningultrapower: {
    name: "Browning Ultra-Power",
    active: false,
    category: "heavypistols",
    skill: "pistols",
    accuracy: 5,
    accmod: 1,
    damage: 8,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 10,
    clip: "Clip",
    ap: -1,
    avail: 4,
    restrict: "Restricted",
    cost: 640,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "Laser Sight"
    }
  },
  coltgovernment2066: {
    name: "Colt Government 2066",
    active: false,
    category: "heavypistols",
    skill: "pistols",
    accuracy: 6,
    accmod: 0,
    damage: 7,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 14,
    clip: "Clip",
    ap: -1,
    avail: 7,
    restrict: "Restricted",
    cost: 425,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  remingtonroomsweeper: {
    name: "Remington Roomsweeper",
    active: false,
    category: "heavypistols",
    skill: "pistols",
    accuracy: 4,
    accmod: 0,
    damage: 7,
    stat: 0,
    dvmod: 2,
    damtype: "Physical",
    element: "",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 8,
    altammo: {
      damage: 9,
      element: "Flechette",
      ap: 4
    },
    clip: "Internal Mag",
    ap: -1,
    avail: 6,
    restrict: "Restricted",
    cost: 250,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  rugersuperwarhawk: {
    name: "Ruger Super Warhawk",
    active: false,
    category: "heavypistols",
    skill: "pistols",
    accuracy: 5,
    accmod: 0,
    damage: 9,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SS: "Single Shot"
    },
    rc: 0,
    rcmod: 0,
    ammo: 6,
    clip: "Cylinder",
    ap: -2,
    avail: 4,
    restrict: "Restricted",
    cost: 400,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },

  //machinepistols
  arescrusaderii: {
    name: "Ares Crusader II",
    active: false,
    category: "machinepistols",
    skill: "automatics",
    accuracy: 5,
    accmod: 2,
    damage: 7,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire"
    },
    rc: 2,
    rcmod: 0,
    ammo: 40,
    clip: "Clip",
    ap: 0,
    avail: 9,
    restrict: "Restricted",
    cost: 830,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "Smartgun",
      integral: "Gas Vent 2"
    }
  },
  ceskablackscorpion: {
    name: "Ceska Black Scorpion",
    active: false,
    category: "machinepistols",
    skill: "automatics",
    accuracy: 5,
    accmod: 0,
    damage: 6,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire"
    },
    rc: 0,
    rcmod: 1,
    ammo: 35,
    clip: "Clip",
    ap: 0,
    avail: 6,
    restrict: "Restricted",
    cost: 270,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  steyrmp: {
    name: "Steyr MP",
    active: false,
    category: "machinepistols",
    skill: "automatics",
    accuracy: 4,
    accmod: 1,
    damage: 7,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire",
      FA: "Full Auto"
    },
    rc: 0,
    rcmod: 0,
    ammo: 30,
    clip: "Clip",
    ap: 0,
    avail: 8,
    restrict: "Restricted",
    cost: 350,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "Laser Sight"
    }
  },

  //submachineguns
  coltcobratz120: {
    name: "Colt Cobra TZ-120",
    active: false,
    category: "submachineguns",
    skill: "automatics",
    accuracy: 4,
    accmod: 1,
    damage: 7,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire",
      FA: "Full Auto"
    },
    rc: 2,
    rcmod: 1,
    ammo: 32,
    clip: "Clip",
    ap: 0,
    avail: 5,
    restrict: "Restricted",
    cost: 660,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "Laser Sight, Gas Vent 2"
    }
  },
  fnp93praetor: {
    name: "FN P93 Praetor",
    active: false,
    category: "submachineguns",
    skill: "automatics",
    accuracy: 6,
    accmod: 0,
    damage: 8,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire",
      FA: "Full Auto"
    },
    rc: 1,
    rcmod: 1,
    ammo: 50,
    clip: "Clip",
    ap: 0,
    avail: 11,
    restrict: "Forbidden",
    cost: 900,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "Flash Light,"
    }
  },
  hk227: {
    name: "HK-227",
    active: false,
    category: "submachineguns",
    skill: "automatics",
    accuracy: 5,
    accmod: 2,
    damage: 7,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire",
      FA: "Full Auto"
    },
    rc: 0,
    rcmod: 1,
    ammo: 28,
    clip: "Clip",
    ap: 0,
    avail: 8,
    restrict: "Restricted",
    cost: 730,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "Smartgun",
      integral: "Silencer"
    }
  },
  ingramsmartgunx: {
    name: "Ingram Smartgun-X",
    active: false,
    category: "submachineguns",
    skill: "automatics",
    accuracy: 4,
    accmod: 2,
    damage: 8,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      BF: "Burst Fire",
      FA: "Full Auto"
    },
    rc: 2,
    rcmod: 0,
    ammo: 32,
    clip: "Clip",
    ap: 0,
    avail: 6,
    restrict: "Restricted",
    cost: 800,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "Smartgun",
      integral: "Gas Vent 2, Silencer"
    }
  },
  sckmodel100: {
    name: "SCK Model 100",
    active: false,
    category: "submachineguns",
    skill: "automatics",
    accuracy: 5,
    accmod: 2,
    damage: 8,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire"
    },
    rc: 0,
    rcmod: 1,
    ammo: 30,
    clip: "Clip",
    ap: 0,
    avail: 6,
    restrict: "Restricted",
    cost: 875,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "Smartgun",
      integral: "n/a"
    }
  },
  uziiv: {
    name: "Uzi Iv",
    active: false,
    category: "submachineguns",
    skill: "automatics",
    accuracy: 4,
    accmod: 1,
    damage: 7,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      BF: "Burst Fire"
    },
    rc: 0,
    rcmod: 1,
    ammo: 24,
    clip: "Clip",
    ap: 0,
    avail: 4,
    restrict: "Restricted",
    cost: 450,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "Laser Sight"
    }
  },

  //assaultrifles
  ak97: {
    name: "AK-97",
    active: false,
    category: "assaultrifles",
    skill: "automatics",
    accuracy: 5,
    accmod: 0,
    damage: 10,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire",
      FA: "Full Auto"
    },
    rc: 0,
    rcmod: 0,
    ammo: 38,
    clip: "Clip",
    ap: -2,
    avail: 4,
    restrict: "Restricted",
    cost: 950,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  aresalpha: {
    name: "Ares Alpha",
    active: false,
    category: "assaultrifles",
    skill: "automatics",
    accuracy: 5,
    accmod: 2,
    damage: 11,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire",
      FA: "Full Auto"
    },
    rc: 2,
    rcmod: 0,
    ammo: 42,
    clip: "Clip",
    ap: -2,
    avail: 11,
    restrict: "Forbidden",
    cost: 2650,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "Smartgun",
      integral: "Grenade Launcher"
    }
  },
  coltm23: {
    name: "Colt M23",
    active: false,
    category: "assaultrifles",
    skill: "automatics",
    accuracy: 4,
    accmod: 0,
    damage: 9,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire",
      FA: "Full Auto"
    },
    rc: 0,
    rcmod: 0,
    ammo: 40,
    clip: "Clip",
    ap: -2,
    avail: 4,
    restrict: "Restricted",
    cost: 550,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  fnhar: {
    name: "FN HAR",
    active: false,
    category: "assaultrifles",
    skill: "automatics",
    accuracy: 5,
    accmod: 1,
    damage: 10,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire",
      FA: "Full Auto"
    },
    rc: 2,
    rcmod: 0,
    ammo: 35,
    clip: "Clip",
    ap: -2,
    avail: 8,
    restrict: "Restricted",
    cost: 1500,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "Laser Sight, Gas Vent 2"
    }
  },
  yamaharaiden: {
    name: "Yamaha Raiden",
    active: false,
    category: "assaultrifles",
    skill: "automatics",
    accuracy: 6,
    accmod: 2,
    damage: 11,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      BF: "Burst Fire",
      FA: "Full Auto"
    },
    rc: 1,
    rcmod: 0,
    ammo: 60,
    clip: "Clip",
    ap: -2,
    avail: 14,
    restrict: "Forbidden",
    cost: 2600,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "Smartgun",
      integral: "Silencer"
    }
  },

  //sniperrifles
  aresdesertstrike: {
    name: "Ares Desert Strike",
    active: false,
    category: "sniperrifles",
    skill: "longarms",
    accuracy: 7,
    accmod: 0,
    damage: 13,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 1,
    ammo: 14,
    clip: "Clip",
    ap: -4,
    avail: 10,
    restrict: "Forbidden",
    cost: 17500,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "Imaging Scope"
    }
  },
  cavalierarmscrockettebr: {
    name: "Cavalier Arms Crockett EBR",
    active: false,
    category: "sniperrifles",
    skill: "longarms",
    accuracy: 6,
    accmod: 0,
    damage: 12,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire"
    },
    rc: 0,
    rcmod: 1,
    ammo: 20,
    clip: "Clip",
    ap: -3,
    avail: 12,
    restrict: "Forbidden",
    cost: 10300,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "Imaging Scope"
    }
  },
  rangerarmssm5: {
    name: "Ranger Arms SM-5",
    active: false,
    category: "sniperrifles",
    skill: "longarms",
    accuracy: 8,
    accmod: 0,
    damage: 14,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 1,
    ammo: 15,
    clip: "Clip",
    ap: -5,
    avail: 16,
    restrict: "Forbidden",
    cost: 28000,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "Imaging Scope, Silencer"
    }
  },
  remington950: {
    name: "Remington 950",
    active: false,
    category: "sniperrifles",
    skill: "longarms",
    accuracy: 7,
    accmod: 0,
    damage: 12,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SS: "Single Shot"
    },
    rc: 0,
    rcmod: 0,
    ammo: 5,
    clip: "Internal Mag",
    ap: -4,
    avail: 4,
    restrict: "Restricted",
    cost: 2100,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  ruger100: {
    name: "Ruger 100",
    active: false,
    category: "sniperrifles",
    skill: "longarms",
    accuracy: 6,
    accmod: 0,
    damage: 11,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 1,
    ammo: 8,
    clip: "Internal Mag",
    ap: -3,
    avail: 4,
    restrict: "Restricted",
    cost: 1300,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "Imaging Scope"
    }
  },

  //shotguns
  defiancet250: {
    name: "Defiance T-250",
    active: false,
    category: "shotguns",
    skill: "longarms",
    accuracy: 4,
    accmod: 0,
    damage: 10,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SS: "Single Shot",
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 5,
    clip: "Internal Mag",
    ap: -1,
    avail: 4,
    restrict: "Restricted",
    cost: 450,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  enfieldas7: {
    name: "Enfield AS-7",
    active: false,
    category: "shotguns",
    skill: "longarms",
    accuracy: 4,
    accmod: 1,
    damage: 13,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic",
      BF: "Burst Fire"
    },
    rc: 0,
    rcmod: 0,
    ammo: 10,
    altammo: {
      ammo: 24,
      clip: "Drum"
    },
    clip: "Clip",
    ap: -1,
    avail: 12,
    restrict: "Forbidden",
    cost: 1100,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "Laser Sight"
    }
  },
  pjssmodel55: {
    name: "PJSS Model 55",
    active: false,
    category: "shotguns",
    skill: "longarms",
    accuracy: 6,
    accmod: 0,
    damage: 11,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 1,
    ammo: 2,
    clip: "Break Action",
    ap: -1,
    avail: 9,
    restrict: "Restricted",
    cost: 1000,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "n/a"
    }
  },

  //exoticrangedweapon
  aressiiisupersquirt: {
    name: "Ares S-III Super Squirt",
    active: false,
    category: "exoticrangedweapon",
    skill: "supersquirt",
    skillName: "Super Squirt",
    accuracy: 3,
    accmod: 0,
    damage: 0,
    stat: 0,
    dvmod: 0,
    damtype: "Chemical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 20,
    clip: "Clip",
    ap: 0,
    avail: 7,
    restrict: "Restricted",
    cost: 950,
    mods: {
      top: "empty",
      barrel: "n/a",
      under: "empty",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  fichettipaininducer: {
    name: "Fichetti Pain Inducer",
    active: false,
    category: "exoticrangedweapon",
    skill: "paininducer",
    skillName: "Pain Inducer",
    accuracy: 3,
    accmod: 0,
    damage: 0,
    stat: 0,
    dvmod: 0,
    damtype: "Special",
    element: " ",
    mode: {
      SS: "Single Shot"
    },
    rc: 0,
    rcmod: 0,
    ammo: 10,
    clip: "Special",
    ap: 0,
    avail: 11,
    restrict: "Restricted",
    cost: 5000,
    mods: {
      top: "empty",
      barrel: "n/a",
      under: "empty",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  parashielddartpistol: {
    name: "Parashield Dart Pistol",
    active: false,
    category: "exoticrangedweapon",
    skill: "dartpistol",
    skillName: "Dart Pistol",
    accuracy: 5,
    accmod: 0,
    damage: 0,
    stat: 0,
    dvmod: 0,
    damtype: "Chemical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 5,
    clip: "Clip",
    ap: 0,
    avail: 4,
    restrict: "Restricted",
    cost: 600,
    mods: {
      top: "empty",
      barrel: "n/a",
      under: "n/a",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  parashielddartrifle: {
    name: "Parashield Dart Rifle",
    active: false,
    category: "exoticrangedweapon",
    skill: "dartrifle",
    skillName: "Dart Rifle",
    accuracy: 6,
    accmod: 0,
    damage: 0,
    stat: 0,
    dvmod: 0,
    damtype: "Chemical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 6,
    clip: "Internal Mag",
    ap: 0,
    avail: 6,
    restrict: "Restricted",
    cost: 1200,
    mods: {
      top: "empty",
      barrel: "n/a",
      under: "empty",
      internalsmart: "empty",
      integral: "Imaging Scope"
    }
  },
  grapplegun: {
    name: "Grapple Gun",
    active: false,
    category: "exoticrangedweapon",
    skill: "grapplegun",
    skillName: "Grapple Gun",
    accuracy: 3,
    accmod: 0,
    damage: 7,
    stat: 0,
    dvmod: 0,
    damtype: "Stun",
    element: "",
    mode: {
      SS: "Single Shot"
    },
    rc: 0,
    rcmod: 0,
    ammo: 1,
    clip: "Muzzle-Loader",
    ap: -2,
    avail: 8,
    restrict: "Restricted",
    cost: 500,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "empty"
    }
  },
  microflarelauncher: {
    name: "Micro Flare Launcher",
    active: false,
    category: "exoticrangedweapon",
    skill: "microflarelauncher",
    skillName: "Micro Flare Launcher",
    accuracy: 3,
    accmod: 0,
    damage: 5,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: "Fire",
    mode: {
      SS: "Single Shot"
    },
    rc: 0,
    rcmod: 0,
    ammo: 1,
    clip: "Muzzle-Loader",
    ap: -5,
    avail: 0,
    restrict: "",
    cost: 175,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "empty"
    }
  },

  //machineguns
  ingramvaliant: {
    name: "Ingram Valiant",
    active: false,
    category: "machineguns",
    skill: "heavyweapons",
    accuracy: 5,
    accmod: 1,
    damage: 9,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      BF: "Burst Fire",
      FA: "Full Auto"
    },
    rc: 2,
    rcmod: 1,
    ammo: 50,
    altammo: {
      ammo: 100,
      clip: "Belt"
    },
    clip: "Clip",
    ap: -2,
    avail: 12,
    restrict: "Forbidden",
    cost: 5800,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "Laser Sight, Gas Vent 2"
    }
  },
  stoneraresm202: {
    name: "Stoner-Ares M202",
    active: false,
    category: "machineguns",
    skill: "heavyweapons",
    accuracy: 5,
    accmod: 0,
    damage: 10,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      FA: "Full Auto"
    },
    rc: 0,
    rcmod: 0,
    ammo: 50,
    altammo: {
      ammo: 100,
      clip: "Belt"
    },
    clip: "Clip",
    ap: -3,
    avail: 12,
    restrict: "Forbidden",
    cost: 7000,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  rpkhmg: {
    name: "RPK HMG",
    active: false,
    category: "machineguns",
    skill: "heavyweapons",
    accuracy: 5,
    accmod: 0,
    damage: 12,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      FA: "Full Auto"
    },
    rc: 0,
    rcmod: 6,
    ammo: 50,
    altammo: {
      ammo: 100,
      clip: "Belt"
    },
    clip: "Clip",
    ap: -4,
    avail: 16,
    restrict: "Forbidden",
    cost: 16300,
    mods: {
      top: "empty",
      barrel: "empty",
      under: "empty",
      internalsmart: "empty",
      integral: "Tripod"
    }
  },

  //cannonslaunchers
  aresantioch2: {
    name: "Ares Antioch-2",
    active: false,
    category: "cannonslaunchers",
    skill: "heavyweapons",
    accuracy: 4,
    accmod: 2,
    damage: 0,
    stat: 0,
    dvmod: 0,
    damtype: "Grenade",
    element: " ",
    mode: {
      SS: "Single Shot"
    },
    rc: 0,
    rcmod: 0,
    ammo: 8,
    clip: "Internal Mag",
    ap: 0,
    avail: 8,
    restrict: "Forbidden",
    cost: 3200,
    mods: {
      top: "empty",
      barrel: "n/a",
      under: "empty",
      internalsmart: "Smartgun",
      integral: "n/a"
    }
  },
  armtechmgl12: {
    name: "ArmTech MGL-12",
    active: false,
    category: "cannonslaunchers",
    skill: "heavyweapons",
    accuracy: 4,
    accmod: 0,
    damage: 0,
    stat: 0,
    dvmod: 0,
    damtype: "Grenade",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 0,
    ammo: 12,
    clip: "Clip",
    ap: 0,
    avail: 10,
    restrict: "Forbidden",
    cost: 5000,
    mods: {
      top: "empty",
      barrel: "n/a",
      under: "empty",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  aztechnologystriker: {
    name: "Aztechnology Striker",
    active: false,
    category: "cannonslaunchers",
    skill: "heavyweapons",
    accuracy: 5,
    accmod: 0,
    damage: 0,
    stat: 0,
    dvmod: 0,
    damtype: "Missile",
    element: " ",
    mode: {
      SS: "Single Shot"
    },
    rc: 0,
    rcmod: 0,
    ammo: 1,
    clip: "Muzzle Loader",
    ap: 0,
    avail: 10,
    restrict: "Forbidden",
    cost: 1200,
    mods: {
      top: "empty",
      barrel: "n/a",
      under: "empty",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  krimecannon: {
    name: "Krime Cannon",
    active: false,
    category: "cannonslaunchers",
    skill: "heavyweapons",
    accuracy: 4,
    accmod: 0,
    damage: 16,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SA: "Semi-Automatic"
    },
    rc: 0,
    rcmod: 1,
    ammo: 6,
    clip: "Internal Mag",
    ap: -6,
    avail: 20,
    restrict: "Forbidden",
    cost: 21000,
    mods: {
      top: "empty",
      barrel: "n/a",
      under: "empty",
      internalsmart: "empty",
      integral: "n/a"
    }
  },
  onotariinterceptor: {
    name: "Onotari Interceptor",
    active: false,
    category: "cannonslaunchers",
    skill: "heavyweapons",
    accuracy: 4,
    accmod: 2,
    damage: 0,
    stat: 0,
    dvmod: 0,
    damtype: "Missile",
    element: " ",
    mode: {
      SS: "Single Shot"
    },
    rc: 0,
    rcmod: 0,
    ammo: 2,
    clip: "Muzzle Loader",
    ap: 0,
    avail: 18,
    restrict: "Forbidden",
    cost: 14000,
    mods: {
      top: "empty",
      barrel: "n/a",
      under: "empty",
      internalsmart: "Smartgun",
      integral: "n/a"
    }
  },
  pantherxxl: {
    name: "Panther XXL",
    active: false,
    category: "cannonslaunchers",
    skill: "heavyweapons",
    accuracy: 5,
    accmod: 2,
    damage: 17,
    stat: 0,
    dvmod: 0,
    damtype: "Physical",
    element: " ",
    mode: {
      SS: "Single Shot"
    },
    rc: 0,
    rcmod: 0,
    ammo: 15,
    clip: "Clip",
    ap: -6,
    avail: 20,
    restrict: "Forbidden",
    cost: 43000,
    mods: {
      top: "empty",
      barrel: "n/a",
      under: "empty",
      internalsmart: "Smartgun",
      integral: "n/a"
    }
  }
};

var weaponmods = {
  airburstlink: {
    name: "Airburst Link",
    weaptype: ["grenadelauncher", "rocketlauncher"]
  }
};

var ammunition = {
  //taser
  taserdart: {
    name: "Taser Dart",
    ammo: 0,
    class: "taserammo",
    dammod: 0,
    typemod: "",
    elemod: "",
    apmod: 0,
    avail: 3,
    restrict: "",
    cost: 50
  },
  //assult cannon ammo
  assaultcannon: {
    name: "Assault Cannon Rounds",
    ammo: 0,
    class: "cannonammo",
    dammod: 0,
    typemod: "",
    elemod: "",
    apmod: 0,
    avail: 12,
    restrict: "Forbidden",
    cost: 400
  },
  //dart guns
  dmsogel: {
    name: "DMSO Gel Rounds",
    ammo: 0,
    class: "specialammo",
    dammod: 0,
    typemod: "",
    elemod: "",
    apmod: 1,
    avail: 2,
    restrict: "Restricted",
    cost: 25
  },
  injectiondarts: {
    name: "Injection Darts",
    ammo: 0,
    class: "specialammo",
    dammod: 0,
    typemod: "",
    elemod: "",
    apmod: 0,
    avail: 4,
    restrict: "Restricted",
    cost: 75
  },
  //normal gun ammo
  apds: {
    name: "APDS",
    ammo: 0,
    class: "none",
    dammod: 0,
    typemod: "",
    elemod: "",
    apmod: -4,
    avail: 12,
    restrict: "Forbidden",
    cost: 120
  },
  explosive: {
    name: "Explosive Rounds",
    ammo: 0,
    class: "none",
    dammod: 1,
    typemod: "",
    elemod: "",
    apmod: -1,
    avail: 9,
    restrict: "Forbidden",
    cost: 80
  },
  flechette: {
    name: "Flechette Rounds",
    ammo: 0,
    class: "none",
    dammod: 2,
    typemod: "",
    elemod: "",
    apmod: 5,
    avail: 6,
    restrict: "Restricted",
    cost: 65
  },
  gel: {
    name: "Gel Rounds",
    ammo: 0,
    class: "none",
    dammod: 0,
    typemod: "Stun",
    elemod: "",
    apmod: 1,
    avail: 2,
    restrict: "Restricted",
    cost: 25
  },
  hollow: {
    name: "Hollow Point Rounds",
    ammo: 0,
    class: "none",
    dammod: 1,
    typemod: "",
    elemod: "",
    apmod: 2,
    avail: 4,
    restrict: "Forbidden",
    cost: 70
  },
  regular: {
    name: "Regular Ammo",
    ammo: 0,
    class: "none",
    dammod: 0,
    typemod: "",
    elemod: "",
    apmod: 0,
    avail: 2,
    restrict: "Restricted",
    cost: 20
  },
  sticknshock: {
    name: "Stick-n-Shock",
    ammo: 0,
    class: "none",
    dammod: -2,
    typemod: "Stun",
    elemod: "Electric",
    apmod: -5,
    avail: 6,
    restrict: "Restricted",
    cost: 80
  },
  tracer: {
    name: "Tracer Rounds",
    ammo: 0,
    class: "none",
    dammod: 0,
    typemod: "",
    elemod: "",
    apmod: 0,
    avail: 6,
    restrict: "Restricted",
    cost: 60
  },
  //grenades
  flashbang: {
    name: "Flash-bang",
    ammo: 0,
    class: "grenades",
    dammod: 10,
    typemod: "Stun",
    elemod: "",
    apmod: -4,
    blast: "10m Radius",
    avail: 6,
    restrict: "Restricted",
    cost: 100
  },
  flashpak: {
    name: "Flash-pak",
    ammo: 0,
    class: "grenades",
    dammod: 0,
    typemod: "",
    elemod: "",
    apmod: 0,
    blast: "Special",
    avail: 4,
    restrict: "",
    cost: 125
  },
  frag: {
    name: "Fragmentation",
    ammo: 0,
    class: "grenades",
    dammod: 18,
    typemod: "Physical",
    elemod: "Flechette",
    apmod: 5,
    blast: "-1/m",
    avail: 11,
    restrict: "Forbidden",
    cost: 100
  },
  hiex: {
    name: "High-explosive",
    ammo: 0,
    class: "grenades",
    dammod: 16,
    typemod: "Physical",
    elemod: "",
    apmod: -2,
    blast: "-2/m",
    avail: 11,
    restrict: "Forbidden",
    cost: 100
  },
  gas: {
    name: "Gas",
    ammo: 0,
    class: "grenades",
    dammod: "chem",
    typemod: "",
    elemod: "",
    apmod: 0,
    blast: "10m Radius",
    avail: 2,
    restrict: "",
    cost: 40
  },
  Smoke: {
    name: "Smoke",
    ammo: 0,
    class: "grenades",
    dammod: 0,
    typemod: "",
    elemod: "",
    apmod: 0,
    blast: "10m Radius",
    avail: 4,
    restrict: "Restricted",
    cost: 40
  },
  thermalsmoke: {
    name: "Thermal Smoke",
    ammo: 0,
    class: "grenades",
    dammod: 0,
    typemod: "",
    elemod: "",
    apmod: 0,
    blast: "10m Radius",
    avail: 6,
    restrict: "Restricted",
    cost: 60
  },
  //rocket
  antivehicle: {
    name: "Anti-vehicle",
    ammo: 0,
    class: "rockets",
    dammod: 24,
    typemod: "Physical",
    elemod: "",
    apmod: "-4/-10",
    blast: "-4/m",
    avail: 18,
    restrict: "Forbidden",
    cost: 2800
  },
  fragrocket: {
    name: "Fragmentation",
    ammo: 0,
    class: "rockets",
    dammod: 24,
    typemod: "Physical",
    elemod: "Flechette",
    apmod: 5,
    blast: "-1/m",
    avail: 12,
    restrict: "Forbidden",
    cost: 2000
  },
  hiexrocket: {
    name: "High-explosive",
    ammo: 0,
    class: "rockets",
    dammod: 21,
    typemod: "Physical",
    elemod: "",
    apmod: -2,
    blast: "-2/m",
    avail: 18,
    restrict: "Forbidden",
    cost: 2100
  }

};

var explosives = {
  commercial: {
    name: "Commercial",
    kg: 0,
    rating: 5,
    avail: 8,
    restrict: "Restricted",
    cost: 100
  },
  foam: {
    name: "Foam",
    kg: 0,
    rating: 6,
    avail: 12,
    restrict: "Forbidden",
    cost: 600
  },
  plastic: {
    name: "Plastic",
    kg: 0,
    rating: 6,
    avail: 16,
    restrict: "Forbidden",
    cost: 600
  }
};

var detonator = {
  name: "Detonator Cap",
  ammount: 0,
  avail: 8,
  restrict: "Restricted",
  cost: 75
};

var toxin = {
  teargas: {
    name: "CS/Tear Gas",
    dose: 0,
    vector: "Contact, Inhalation",
    speed: "1 Combat Turn",
    penetration: 0,
    power: 8,
    effect: "Disorientation, Nausea, Stun Damage",
    avail: 4,
    restrict: "Restricted",
    cost: 20
  },
  nausea: {
    name: "Nausea Gas",
    dose: 0,
    vector: "Inhalation",
    speed: "3 Combat Turn",
    penetration: 0,
    power: 9,
    effect: "Disorientation, Nausea",
    avail: 6,
    restrict: "Restricted",
    cost: 25
  },
  neurostunviii: {
    name: "Neuro-Stun VIII",
    dose: 0,
    vector: "Contact, Inhalation",
    speed: "1 Combat Turn",
    penetration: 0,
    power: 12,
    effect: "Disorientation, Stun Damage",
    avail: 12,
    restrict: "Restricted",
    cost: 60
  },
  pepperpunch: {
    name: "Pepper Punch",
    dose: 0,
    vector: "Contact, Inhalation",
    speed: "1 Combat Turn",
    penetration: 0,
    power: 11,
    effect: "Nausea, Stun Damage",
    avail: 0,
    restrict: "",
    cost: 5
  }
};

var armor = {
  actioneerbusinessclothes: {
    name: "Actioneer Business Clothes",
    armor: 8,
    capacity: 0,
    avail: 8,
    restrict: "",
    cost: 1500
  },
  armorclothing: {
    name: "Armor Clothing",
    armor: 6,
    capacity: 0,
    avail: 2,
    restrict: "",
    cost: 450
  },
  armorjacket: {
    name: "Armor Jacket",
    armor: 12,
    capacity: 0,
    avail: 2,
    restrict: "",
    cost: 1000
  },
  armorvest: {
    name: "Armor Vest",
    armor: 9,
    capacity: 0,
    avail: 4,
    restrict: "",
    cost: 500
  },
  chameleonsuit: {
    name: "Chameleon Suit",
    armor: 9,
    capacity: 0,
    avail: 10,
    restrict: "Restricted",
    helm: true,
    cost: 1700
  },
  fullbodyarmor: {
    name: "Full body armor",
    armor: 15,
    capacity: 0,
    avail: 14,
    restrict: "Restricted",
    helm: false,
    helmmod: {
      armor: 3,
      cost: 500
    },
    cost: 2000
  },
  linedcoat: {
    name: "Lined coat",
    armor: 9,
    capacity: 0,
    avail: 4,
    restrict: "",
    cost: 900
  },
  urbanexplorerjumpsuit: {
    name: "Urban Explorer Jumpsuit",
    armor: 9,
    capacity: 0,
    avail: 8,
    restrict: "",
    helm: false,
    helmmod: {
      armor: 2,
      cost: 100
    },
    cost: 650
  }
};

var armormods = {
  chemicalprotection: {
    name: "Chemical Protection",
    rating: 0,
    capacity: 0,
    avail: 6,
    restrict: "",
    cost: 250
  },
  chemicalseal: {
    name: "Chemical Seal",
    active: false,
    capacity: 6,
    avail: 12,
    restrict: "Restricted",
    cost: 3000
  },
  fireresistance: {
    name: "Fire Resistance",
    rating: 0,
    capacity: 0,
    avail: 6,
    restrict: "",
    cost: 250
  },
  insulation: {
    name: "Insulation",
    rating: 0,
    capacity: 0,
    avail: 6,
    restrict: "",
    cost: 250
  },
  nonconductivity: {
    name: "Nonconductivity",
    rating: 0,
    capacity: 0,
    avail: 6,
    restrict: "",
    cost: 250
  },
  shockfrills: {
    name: "Shock Frills",
    active: false,
    capacity: 2,
    avail: 6,
    restrict: "Restricted",
    cost: 250
  },
  thermaldamping: {
    name: "Thermal Damping",
    rating: 0,
    capacity: 0,
    avail: 10,
    restrict: "Restricted",
    cost: 500
  }
};

var electronics = { //This has more then just electronics in it now
  //commlinks
  metalink: {
    model: "Meta Link",
    type: "commlink",
    device: 1,
    avail: 2,
    cost: 100
  },
  sonyemperor: {
    model: "Sony Emperor",
    type: "commlink",
    device: 2,
    avail: 4,
    cost: 700
  },
  renrakusensei: {
    model: "Renraku Sensei",
    type: "commlink",
    device: 3,
    avail: 6,
    cost: 1000
  },
  erikaelite: {
    model: "Erika Elite",
    type: "commlink",
    device: 4,
    avail: 8,
    cost: 2500
  },
  hermesikon: {
    model: "Hermes Ikon",
    type: "commlink",
    device: 5,
    avail: 10,
    cost: 3000
  },
  transysavalon: {
    model: "Transys Avalon",
    type: "commlink",
    device: 6,
    avail: 12,
    cost: 5000
  },
  fairlightcaliban: {
    model: "Fairlight Caliban",
    type: "commlink",
    device: 7,
    avail: 14,
    cost: 8000
  },
  //decks
  erikamcd1: {
    model: "Erika MCD-1",
    type: "deck",
    device: 1,
    array: [4, 3, 2, 1],
    programs: 1,
    avail: 3,
    restrict: "Restricted",
    cost: 49500
  },
  Microdecksummit: {
    model: "Microdeck Summit",
    type: "deck",
    device: 1,
    array: [4, 3, 3, 1],
    programs: 1,
    avail: 3,
    restrict: "Restricted",
    cost: 58000
  },
  Microtronicaazteca200: {
    model: "Microtronica Azteca 200",
    type: "deck",
    device: 2,
    array: [5, 4, 3, 2],
    programs: 2,
    avail: 6,
    restrict: "Restricted",
    cost: 110250
  },
  Hermeschariot: {
    model: "Hermes Chariot",
    type: "deck",
    device: 2,
    array: [5, 4, 4, 2],
    programs: 2,
    avail: 6,
    restrict: "Restricted",
    cost: 123000
  },
  Novtechnavigator: {
    model: "Novtech Navigator",
    type: "deck",
    device: 3,
    array: [6, 5, 4, 3],
    programs: 3,
    avail: 6,
    restrict: "Restricted",
    cost: 205750
  },
  Renrakutsurugi: {
    model: "Renraku Tsurugi",
    type: "deck",
    device: 3,
    array: [6, 5, 5, 3],
    programs: 3,
    avail: 9,
    restrict: "Restricted",
    cost: 214125
  },
  Sonyciy720: {
    model: "Sony CIY-720",
    type: "deck",
    device: 4,
    array: [7, 6, 5, 4],
    programs: 4,
    avail: 12,
    restrict: "Restricted",
    cost: 345000
  },
  Shiawase: {
    model: "Shiawase Cyber-5",
    type: "deck",
    device: 5,
    array: [8, 7, 6, 5],
    programs: 5,
    avail: 15,
    restrict: "Restricted",
    cost: 549375
  },
  Fairlightexcalibur: {
    model: "Fairlight Excalibur",
    type: "deck",
    device: 6,
    array: [9, 8, 7, 6],
    programs: 6,
    avail: 18,
    restrict: "Restricted",
    cost: 823250
  },
  //RCC
  scratchbuiltjunk: {
    model: "Scratch-Built Junk",
    type: "rcc",
    device: 1,
    dataprocess: 3,
    firewall: 2,
    avail: 2,
    restrict: "Restricted",
    cost: 1400
  },
  Radioshackremotecontroller: {
    model: "Radio Shack Remote Controller",
    type: "rcc",
    device: 2,
    dataprocess: 3,
    firewall: 3,
    avail: 6,
    restrict: "Restricted",
    cost: 8000
  },
  Essymotorsdronemaster: {
    model: "Essy Motors DroneMaster",
    type: "rcc",
    device: 3,
    dataprocess: 4,
    firewall: 4,
    avail: 6,
    restrict: "Restricted",
    cost: 16000
  },
  Compuforcetaskmaster: {
    model: "CompuForce TaskMaster",
    type: "rcc",
    device: 4,
    mods: {},
    dataprocess: 5,
    firewall: 4,
    avail: 8,
    restrict: "Restricted",
    cost: 32000
  },
  Maerskspider: {
    model: "Maersk Spider",
    type: "rcc",
    device: 4,
    dataprocess: 4,
    firewall: 5,
    avail: 8,
    restrict: "Restricted",
    cost: 34000
  },
  Maserindustrialelectronics: {
    model: "Maser Industrial Electronics",
    type: "rcc",
    device: 5,
    dataprocess: 3,
    firewall: 4,
    avail: 8,
    restrict: "Restricted",
    cost: 64000
  },
  Vulcanliegelord: {
    model: "Vulcan Liegelord",
    type: "rcc",
    device: 5,
    dataprocess: 5,
    firewall: 6,
    avail: 10,
    restrict: "Restricted",
    cost: 66000
  },
  Proteusposeidon: {
    model: "Proteus Poseidon",
    type: "rcc",
    device: 5,
    dataprocess: 5,
    firewall: 6,
    avail: 12,
    restrict: "Restricted",
    cost: 68000
  },
  Lonestarremotecommander: {
    model: "Lone Star Remote Commander",
    type: "rcc",
    device: 6,
    dataprocess: 6,
    firewall: 5,
    avail: 14,
    restrict: "Restricted",
    cost: 75000
  },
  Mctdroneweb: {
    model: "MCT Drone Web",
    type: "rcc",
    device: 6,
    dataprocess: 7,
    firewall: 6,
    avail: 16,
    restrict: "Restricted",
    cost: 95000
  },
  Trioxubermensch: {
    model: "Triox UberMensch",
    type: "rcc",
    device: 6,
    dataprocess: 8,
    firewall: 7,
    avail: 18,
    restrict: "Restricted",
    cost: 140000
  },

  //accessories
  argloves: {
    name: "AR Gloves",
    type: "accessory",
    device: 3,
    avail: 0,
    cost: 150
  },
  biometricreader: {
    name: "Biometric reader",
    type: "accessory",
    device: 3,
    avail: 4,
    cost: 200
  },
  electronicpaper: {
    name: "Electronic paper",
    type: "accessory",
    device: 1,
    avail: 0,
    cost: 5
  },
  printer: {
    name: "Printer",
    type: "accessory",
    device: 3,
    avail: 0,
    cost: 25
  },
  satellitelink: {
    name: "Satellite link",
    type: "accessory",
    device: 4,
    avail: 6,
    cost: 500
  },
  simrig: {
    name: "Simrig",
    type: "accessory",
    device: 3,
    avail: 12,
    cost: 1000
  },
  subvocalmic: {
    name: "Subvocal mic",
    type: "accessory",
    device: 3,
    avail: 4,
    cost: 50
  },
  tridprojector: {
    name: "Trid Projector",
    type: "accessory",
    device: 3,
    avail: 0,
    cost: 200
  },
  trodes: {
    name: "Trodes",
    type: "accessory",
    device: 3,
    avail: 0,
    cost: 70
  },

  //RFID
  standardtag: {
    name: "Standard Tag",
    type: "rfid",
    device: 1,
    avail: 0,
    restrict: "",
    peritem: 10,
    cost: 1
  },
  datachip: {
    name: "Datachip",
    type: "rfid",
    device: 1,
    avail: 0,
    restrict: "",
    peritem: 10,
    cost: 5
  },
  securitytags: {
    name: "Security Tags",
    type: "rfid",
    device: 3,
    avail: 0,
    restrict: "",
    peritem: 10,
    cost: 5
  },
  sensortags: {
    name: "Sensor Tags",
    type: "rfid",
    device: 2,
    avail: 5,
    restrict: "",
    peritem: 10,
    cost: 40
  },
  stealthtags: {
    name: "Stealth Tags",
    type: "rfid",
    device: 3,
    avail: 7,
    restrict: "Restricted",
    peritem: 10,
    cost: 10
  },

  //communications
  bugscanner: {
    name: "Bug Scanner",
    type: "communications",
    rating: 1,
    ratingmax: 6,
    availx: 1,
    avail: 1,
    restrict: "Restricted",
    costx: 100,
    cost: 100
  }, //availx and costx are the multiplier for rating
  datatap: {
    name: "Data Tap",
    type: "communications",
    rating: "n/a",
    avail: 6,
    restrict: "Restricted",
    cost: 300
  },
  headjammer: {
    name: "Headjammer",
    type: "communications",
    rating: 1,
    ratingmax: 6,
    availx: 1,
    avail: 1,
    restrict: "Restricted",
    costx: 150,
    cost: 150
  },
  jammerarea: {
    name: "Jammer, area",
    type: "communications",
    rating: 1,
    ratingmax: 6,
    availx: 3,
    avail: 3,
    restrict: "Forbidden",
    costx: 200,
    cost: 200
  },
  jammerdirectional: {
    name: "Jammer, directional",
    type: "communications",
    rating: 1,
    ratingmax: 6,
    availx: 2,
    avail: 2,
    restrict: "Forbidden",
    costx: 200,
    cost: 200
  },
  microtransciever: {
    name: "Micro-transciever",
    type: "communications",
    rating: "n/a",
    avail: 2,
    restrict: "",
    costx: 100,
    cost: 100
  },
  tageraser: {
    name: "Tag eraser",
    type: "communications",
    rating: "n/a",
    avail: 6,
    restrict: "Restricted",
    cost: 450
  },
  whitenoisegenerator: {
    name: "White noise generator",
    type: "communications",
    rating: 1,
    ratingmax: 6,
    availx: 1,
    avail: 1,
    restrict: "",
    costx: 50,
    cost: 50
  },

  //credsticks
  standard: {
    name: "Standard",
    type: "credsticks",
    maxvalue: "5,000",
    avail: 0,
    restrict: "",
    cost: 5
  },
  silvercredstick: {
    name: "Silver",
    type: "credsticks",
    maxvalue: "20,000",
    avail: 0,
    restrict: "",
    cost: 20
  },
  goldcredstick: {
    name: "Gold",
    type: "credsticks",
    maxvalue: "100,000",
    avail: 5,
    restrict: "",
    cost: 100
  },
  platinumcredstick: {
    name: "Platinum",
    type: "credsticks",
    maxvalue: "500,000",
    avail: 10,
    restrict: "",
    cost: 500
  },
  ebonycredstick: {
    name: "Ebony",
    type: "credsticks",
    maxvalue: "1,000,000",
    avail: 20,
    restrict: "",
    cost: 1000
  },

  //licenses and SINS
  fakesin: {
    name: "Fake SIN",
    id: "",
    type: "identification",
    rating: 1,
    avail: 3,
    availx: 3,
    restrict: "Forbidden",
    costx: 2500,
    cost: 2500
  },
  fakelicense: {
    name: "Fake License",
    id: "",
    type: "identification",
    rating: 1,
    avail: 3,
    availx: 3,
    restrict: "Forbidden",
    costx: 200,
    cost: 200
  },

  //Tools
  toolkit: {
    name: "Kit",
    type: "tools",
    skill: "",
    avail: 0,
    restrict: "",
    cost: 500
  },
  toolshop: {
    name: "Shop",
    type: "tools",
    skill: "",
    avail: 8,
    restrict: "",
    cost: 5000
  },
  toolfacility: {
    name: "Facility",
    type: "tools",
    skill: "",
    avail: 12,
    restrict: "",
    cost: 50000
  },

  //optical & imaging devices
  binoculars: {
    name: "Binoculars",
    type: "optics",
    rating: 1,
    ratingmax: 3,
    mods: ["Vision Magnification"],
    avail: 0,
    availx: 0,
    restrict: "",
    costx: 50,
    cost: 50
  },
  binocularsoptical: {
    name: "Binoculars Opitcal",
    type: "optics",
    rating: "n/a",
    ratingmax: 0,
    mods: ["Vision Magnification"],
    avail: 0,
    restrict: "",
    cost: 50
  },
  camera: {
    name: "Camera",
    type: "optics",
    rating: 1,
    ratingmax: 6,
    mods: ["Audio and Video Recording"],
    avail: 0,
    availx: 0,
    restrict: "",
    costx: 100,
    cost: 100
  },
  microcamera: {
    name: "Micro-Camera",
    type: "optics",
    rating: 1,
    ratingmax: 1,
    mods: ["Audio and Video Recording"],
    avail: 0,
    restrict: "",
    cost: 100
  },
  contacts: {
    name: "Contacts",
    type: "optics",
    rating: 1,
    ratingmax: 3,
    avail: 6,
    availx: 0,
    restrict: "",
    costx: 200,
    cost: 200
  },
  glasses: {
    name: "Glasses",
    type: "optics",
    rating: 1,
    ratingmax: 4,
    avail: 0,
    availx: 0,
    restrict: "",
    costx: 100,
    cost: 100
  },
  goggles: {
    name: "Goggles",
    type: "optics",
    rating: 1,
    ratingmax: 6,
    avail: 0,
    availx: 0,
    restrict: "",
    costx: 50,
    cost: 50
  },
  monocle: {
    name: "Monocle",
    type: "optics",
    rating: 1,
    ratingmax: 4,
    avail: 0,
    availx: 0,
    restrict: "",
    costx: 120,
    cost: 120
  },
  endoscope: {
    name: "Endoscope",
    type: "optics",
    rating: "n/a",
    ratingmax: 0,
    avail: 8,
    restrict: "",
    cost: 250
  },
  periscope: {
    name: "Periscope",
    type: "optics",
    rating: "n/a",
    ratingmax: 0,
    avail: 3,
    restrict: "",
    cost: 50
  },
  magesightgoggles: {
    name: "Mage Sight Goggles",
    type: "optics",
    rating: "n/a",
    ratingmax: 0,
    avail: 3,
    restrict: "",
    cost: 50
  },

  //Audio Devices
  directionalmic: {
    name: "Directional Mic",
    type: "audio",
    rating: 1,
    ratingmax: 6,
    avail: 4,
    availx: 0,
    restrict: "",
    costx: 50,
    cost: 50
  },
  earbuds: {
    name: "Ear Buds",
    type: "audio",
    rating: 1,
    ratingmax: 3,
    avail: 0,
    availx: 0,
    restrict: "",
    costx: 50,
    cost: 50
  },
  headphones: {
    name: "Headphones",
    type: "audio",
    rating: 1,
    ratingmax: 6,
    avail: 0,
    availx: 0,
    restrict: "",
    costx: 50,
    cost: 50
  },
  lasermicrophone: {
    name: "Laser Microphone",
    type: "audio",
    rating: 1,
    ratingmax: 6,
    avail: 6,
    availx: 0,
    restrict: "Restricted",
    costx: 100,
    cost: 100
  },
  omnidirectionalmicrophone: {
    name: "Omni-Directional Microphone",
    type: "audio",
    rating: 1,
    ratingmax: 6,
    avail: 0,
    availx: 0,
    restrict: "",
    costx: 50,
    cost: 50
  },

  //Security devices
  keycombinationlock: {
    name: "Key/combination lock",
    type: "securitydevice",
    rating: 1,
    ratingmax: 6,
    avail: 1,
    availx: 1,
    restrict: "",
    costx: 10,
    cost: 10
  },
  maglock: {
    name: "Maglock",
    type: "securitydevice",
    rating: 1,
    ratingmax: 6,
    maglockMods: {},
    avail: 1,
    availx: 1,
    restrict: "",
    costx: 100,
    cost: 100
  },


  //restraints
  metalrestraint: {
    name: "Metal",
    type: "restraints",
    armor: 16,
    structure: 2,
    avail: 0,
    restrict: "",
    peritem: 1,
    cost: 20
  },
  plasteelrestraint: {
    name: "Plasteel",
    type: "restraints",
    armor: 20,
    structure: 2,
    avail: 6,
    restrict: "Restricted",
    peritem: 1,
    cost: 50
  },
  plasticrestraint: {
    name: "Plastic (per 10)",
    type: "restraints",
    armor: 6,
    structure: 1,
    avail: 0,
    restrict: "",
    peritem: 10,
    cost: 5
  },
  containmentmanacles: {
    name: "Containment manacles",
    type: "restraints",
    armor: 16,
    structure: 2,
    avail: 6,
    restrict: "Restricted",
    peritem: 1,
    cost: 250
  },

  //b&e gear
  autopicker: {
    name: "Autopicker",
    type: "bnegear",
    rating: 1,
    ratingmax: 6,
    avail: 8,
    availx: 0,
    restrict: "Restricted",
    costx: 500,
    cost: 500
  },
  cellularglovemolder: {
    name: "Cellular glove molder",
    type: "bnegear",
    rating: 1,
    ratingmax: 4,
    avail: 12,
    availx: 0,
    restrict: "Forbidden",
    costx: 500,
    cost: 500
  },
  chisel: {
    name: "Chisel",
    type: "bnegear",
    avail: 0,
    restrict: "",
    cost: 20
  },
  crowbar: {
    name: "Crowbar",
    type: "bnegear",
    avail: 0,
    restrict: "",
    cost: 20
  },
  keycardcopier: {
    name: "Keycard Copier",
    type: "bnegear",
    rating: 1,
    ratingmax: 6,
    avail: 8,
    availx: 0,
    restrict: "Forbidden",
    costx: 600,
    cost: 600
  },
  lockpickset: {
    name: "Lockpick set",
    type: "bnegear",
    avail: 4,
    restrict: "Restricted",
    cost: 250
  },
  maglockpasskey: {
    name: "Maglock passkey",
    type: "bnegear",
    rating: 1,
    ratingmax: 4,
    avail: 3,
    availx: 3,
    restrict: "Forbidden",
    costx: 2000,
    cost: 2000
  },
  miniwelder: {
    name: "Miniwelder",
    type: "bnegear",
    avail: 2,
    restrict: "",
    cost: 250
  },
  miniwelderfuel: {
    name: "Miniwelder fuel canister",
    type: "bnegear",
    avail: 2,
    restrict: "",
    cost: 80
  },
  monofilamentchainsaw: {
    name: "Monofilament chainsaw",
    type: "bnegear",
    avail: 8,
    restrict: "",
    cost: 500
  },
  sequencer: {
    name: "Sequencer",
    type: "bnegear",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Forbidden",
    costx: 250,
    cost: 250
  },

  //industrial chemicals
  gluesolvent: {
    name: "Glue Solvent",
    type: "chemicals",
    avail: 2,
    restrict: "",
    cost: 90
  },
  gluesprayer: {
    name: "Glue Sprayer",
    type: "chemicals",
    avail: 2,
    restrict: "",
    cost: 150
  },
  thermiteburningbar: {
    name: "Thermite burning bar",
    type: "chemicals",
    avail: 16,
    restrict: "Restricted",
    cost: 500
  },

  //survival gear
  chemsuit: {
    name: "Chemsuit",
    type: "survivalgear",
    rating: 1,
    ratingmax: 6,
    avail: 2,
    availx: 2,
    restrict: "",
    costx: 150,
    cost: 150
  },
  climbinggear: {
    name: "Climbing gear",
    type: "survivalgear",
    avail: 0,
    restrict: "",
    cost: 200
  },
  divinggear: {
    name: "Diving gear",
    type: "survivalgear",
    avail: 6,
    restrict: "",
    cost: 2000
  },
  flashlight: {
    name: "Flashlight",
    type: "survivalgear",
    avail: 0,
    restrict: "",
    cost: 25
  },
  gasmask: {
    name: "Gas mask",
    type: "survivalgear",
    avail: 0,
    restrict: "",
    cost: 200
  },
  geckotapegloves: {
    name: "Gecko tape gloves",
    type: "survivalgear",
    avail: 12,
    restrict: "",
    cost: 250
  },
  hazmatsuit: {
    name: "Hazmat suit",
    type: "survivalgear",
    avail: 8,
    restrict: "",
    cost: 3000
  },
  lightstick: {
    name: "Chemsuit",
    type: "survivalgear",
    avail: 0,
    restrict: "",
    cost: 25
  },
  magnesiumtorch: {
    name: "Magnesium torch",
    type: "survivalgear",
    avail: 0,
    restrict: "",
    cost: 5
  },
  microflarelauncher: {
    name: "Micro flare launcher",
    type: "survivalgear",
    avail: 0,
    restrict: "",
    cost: 175
  },
  microflares: {
    name: "Micro flares",
    type: "survivalgear",
    avail: 0,
    restrict: "",
    cost: 25
  },
  rappellinggloves: {
    name: "Rappelling gloves",
    type: "survivalgear",
    avail: 0,
    restrict: "",
    cost: 50
  },
  respirator: {
    name: "Respirator",
    type: "survivalgear",
    rating: 1,
    ratingmax: 6,
    avail: 0,
    availx: 0,
    restrict: "",
    costx: 50,
    cost: 50
  },
  survivalkit: {
    name: "Survival Kit",
    type: "survivalgear",
    avail: 4,
    restrict: "",
    cost: 200
  },

  //grapple gun gear
  grapplegun: {
    name: "Grapple gun",
    type: "grapplegungear",
    avail: 8,
    restrict: "Restricted",
    cost: 500
  },
  catalyststick: {
    name: "Catalyst stick",
    type: "grapplegungear",
    avail: 8,
    restrict: "Forbidden",
    cost: 120
  },

  //Grappling rope
  microwire: {
    name: "Microwire",
    type: "grapplerope",
    avail: 4,
    restrict: "",
    peritem: 100,
    cost: 50
  },
  myomericrope: {
    name: "Myomeric rope",
    type: "grapplerope",
    avail: 10,
    restrict: "",
    peritem: 10,
    cost: 200
  },
  standardrope: {
    name: "Standard rope",
    type: "grapplerope",
    avail: 0,
    restrict: "",
    peritem: 100,
    cost: 50
  },
  stealthrope: {
    name: "Stealth rope",
    type: "grapplerope",
    avail: 8,
    restrict: "Forbidden",
    peritem: 100,
    cost: 85
  },

  //biotech
  biomonitor: {
    name: "Biomonitor",
    type: "biotech",
    avail: 3,
    restrict: "",
    cost: 300
  },
  disposablesyringe: {
    name: "Disposable syringe",
    type: "biotech",
    avail: 3,
    restrict: "",
    cost: 10
  },
  medkit: {
    name: "Medkit",
    type: "biotech",
    rating: 1,
    ratingmax: 6,
    avail: 1,
    availx: 1,
    restrict: "",
    costx: 250,
    cost: 250
  },
  medkitsupplies: {
    name: "Medkit supplies",
    type: "biotech",
    avail: 0,
    restrict: "",
    cost: 100
  },

  //docwagon contract
  basiccontract: {
    name: "Basic",
    type: "docwagon",
    avail: 0,
    restrict: "",
    peritem: 1,
    cost: 5000
  },
  goldontract: {
    name: "Gold",
    type: "docwagon",
    avail: 0,
    restrict: "",
    peritem: 1,
    cost: 25000
  },
  platinumontract: {
    name: "Platinum",
    type: "docwagon",
    avail: 0,
    restrict: "",
    peritem: 1,
    cost: 50000
  },
  superplatinumontract: {
    name: "Super-platinum",
    type: "docwagon",
    avail: 0,
    restrict: "",
    peritem: 1,
    cost: 100000
  },

  //slap patches
  antidotepatch: {
    name: "Antidote patch",
    type: "slappatches",
    rating: 1,
    ratingmax: 6,
    avail: 1,
    availx: 1,
    restrict: "",
    costx: 50,
    cost: 50
  },
  chempatch: {
    name: "Chem patch",
    type: "slappatches",
    avail: 6,
    restrict: "",
    cost: 200
  },
  stimpatch: {
    name: "Stim patch",
    type: "slappatches",
    rating: 1,
    ratingmax: 6,
    avail: 2,
    availx: 2,
    restrict: "",
    costx: 25,
    cost: 25
  },
  tranqpatch: {
    name: "Tranq patch",
    type: "slappatches",
    rating: 1,
    ratingmax: 10,
    avail: 2,
    availx: 2,
    restrict: "",
    costx: 20,
    cost: 20
  },
  traumapatch: {
    name: "Trauma patch",
    type: "slappatches",
    avail: 6,
    restrict: "",
    cost: 500
  },

  //magical items
  //enchanting foci
  alchemicalfocus: {
    name: "Alechemical Focus",
    type: "enchantingfoci",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 5000,
    cost: 5000,
    karmaCost: 3
  },
  disenchantingfocus: {
    name: "Disenchanting Focus",
    type: "enchantingfoci",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 5000,
    cost: 5000,
    karmaCost: 3
  },
  //metamagic foci
  centeringfocus: {
    name: "Centering Focus",
    type: "metamagicfoci",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 9000,
    cost: 9000,
    karmaCost: 3
  },
  flexiblesignaturefocus: {
    name: "Flexible Signature Focus",
    type: "metamagicfoci",
    rating: 1,
    ratingmax: 6,
    restrict: "Restricted",
    avail: 3,
    availx: 3,
    costx: 9000,
    cost: 9000,
    karmaCost: 3
  },
  maskingfocus: {
    name: "Masking Focus",
    type: "metamagicfoci",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 9000,
    cost: 9000,
    karmaCost: 3
  },
  spellshapingfocus: {
    name: "Spell Shaping Focus",
    type: "metamagicfoci",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 9000,
    cost: 9000,
    karmaCost: 3
  },
  //power foci
  powerfocifocus: {
    name: "Power Focus",
    type: "powerfoci",
    rating: 1,
    ratingmax: 6,
    avail: 4,
    availx: 4,
    restrict: "Restricted",
    costx: 18000,
    cost: 18000,
    karmaCost: 6
  },
  //qi foci
  qifocus: {
    name: "Qi Focus",
    type: "qifoci",
    magicType: "adrenalineboost",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 3000,
    cost: 3000,
    karmaCost: 2
  },
  //spell foci
  counterspellingfocus: {
    name: "Counterspelling Focus",
    type: "spellfoci",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 4000,
    cost: 4000,
    magicType: "Combat",
    karmaCost: 2
  },
  ritualspellcastingfocus: {
    name: "Ritual Spellcasting Focus",
    type: "spellfoci",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 4000,
    cost: 4000,
    magicType: "Anchored",
    karmaCost: 2
  },
  spellcastingfocus: {
    name: "Spellcasting Focus",
    type: "spellfoci",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 4000,
    cost: 4000,
    magicType: "Combat",
    karmaCost: 2
  },
  sustainingfocus: {
    name: "Sustaining Focus",
    type: "spellfoci",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 4000,
    cost: 4000,
    magicType: "Combat",
    karmaCost: 2
  },
  //spirit foci
  summoningfocus: {
    name: "Summoning Focus",
    type: "spiritfoci",
    magicType: "Air",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 4000,
    cost: 4000,
    karmaCost: 2
  },
  banishingfocus: {
    name: "Banishing Focus",
    type: "spiritfoci",
    magicType: "Air",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 4000,
    cost: 4000,
    karmaCost: 2
  },
  bindingfocus: {
    name: "Binding Focus",
    type: "spiritfoci",
    magicType: "Air",
    rating: 1,
    ratingmax: 6,
    avail: 3,
    availx: 3,
    restrict: "Restricted",
    costx: 4000,
    cost: 4000,
    karmaCost: 2
  },
  //Magical Supplies
  magicallodgematerials: {
    name: "Magical Lodge Materials",
    type: "magicallodgematerials",
    rating: 1,
    ratingmax: 12,
    avail: 2,
    availx: 2,
    restrict: "",
    cost: 500,
    costx: 500
  },
  reagents: {
    name: "Reagents",
    type: "reagents",
    avail: 0,
    restrict: "",
    peritem: 1,
    cost: 20
  }

};

var spellType = [
  "Combat",
  "Detection",
  "Health",
  "Illusion",
  "Manipulation"];

var spiritType = [
  "Air",
  "Beasts",
  "Blood",
  "Guardian",
  "Guidance",
  "Earth",
  "Fire",
  "Insect-Caretaker",
  "Insect-Nymph",
  "Insect-Scout",
  "Insect-Soldier",
  "Insect-Worker",
  "Man",
  "Plant",
  "Shadow",
  "Shedim",
  "Task",
  "Water"];

var ritualKeywords = [
  "Anchored",
  "Adept",
  "Blood",
  "Contractual",
  "Mana",
  "Material Link",
  "Minion",
  "Organic Link",
  "Spell",
  "Spotter"];

var software = {
  datasoft: {},
  mapsoft: {},
  shopsoft: {},
  tutorsoft: {}
};

var maglockMod = {
  keypad: {
    name: "Keypad",
    avail: 0,
    restrict: "",
    cost: 50
  },
  cardreader: {
    name: "Card reader",
    avail: 0,
    restrict: "",
    cost: 50
  },
  antitampercircuits: {
    name: "Anti-tamper circuits",
    rating: 1,
    ratingmax: 4,
    avail: 1,
    availx: 1,
    restrict: "",
    costx: 250,
    cost: 250
  },
  biometricreader: {
    name: "Biometric Reader",
    avail: 4,
    restrict: "",
    cost: 200
  }
};

var programs = {
  //common
  browser: {
    name: "Browser",
    active: false,
    category: "common",
    rcc: true,
    test: "Matrix Search"
  },
  configurator: {
    name: "Configurator",
    active: false,
    catergoy: "common",
    rcc: false
  },
  edit: {
    name: "Edit",
    active: false,
    category: "common",
    rcc: false,
    test: "Edit",
    mod: 2
  },
  encryption: {
    name: "Encryption",
    active: false,
    category: "common",
    rcc: false,
    firewall: 1
  },
  signalscrub: {
    name: "Signal Scrub",
    active: false,
    category: "common",
    rcc: true,
    noisereduction: 2
  },
  toolbox: {
    name: "Toolbox",
    active: false,
    category: "common",
    rcc: true,
    dataprocessing: 1
  },
  virtualmachine: {
    name: "Virtual Machine",
    active: false,
    category: "common",
    rcc: true,
    programs: 2,
    damagetaken: 1
  },
  //hacking
  armor: {
    name: "Armor",
    active: false,
    category: "hacking",
    rcc: true,
    test: "Resist Matrix Damage",
    mod: 2
  },
  babymonitor: {
    name: "Baby Monitor",
    active: false,
    category: "hacking",
    rcc: false
  },
  biofeedback: {
    name: "Biofeedback",
    active: false,
    category: "hacking",
    rcc: false
  },
  biofeedbackfilter: {
    name: "Biofeedback Filter",
    active: false,
    category: "hacking",
    rcc: true,
    test: "Resist Biofeedback Damage",
    mod: 2
  },
  blackout: {
    name: "Blackout",
    active: false,
    category: "hacking",
    rcc: false
  },
  decryption: {
    name: "Decryption",
    active: false,
    category: "hacking",
    rcc: false,
    attack: 1
  },
  defuse: {
    name: "Defuse",
    active: false,
    category: "hacking",
    rcc: false,
    test: "Resist Data Bomb Damage",
    mod: 4
  },
  demolition: {
    name: "Demolition",
    active: false,
    category: "hacking",
    rcc: false,
    databombrating: 1
  },
  exploit: {
    name: "Exploit",
    active: false,
    category: "hacking",
    rcc: false,
    test: "Hack On The Fly",
    mod: 2
  },
  fork: {
    name: "Fork",
    active: false,
    category: "hacking",
    rcc: false
  },
  guard: {
    name: "Guard",
    active: false,
    category: "hacking",
    rcc: true
  },
  hammer: {
    name: "Hammer",
    active: false,
    category: "hacking",
    rcc: false,
    matrixdamage: 2
  },
  lockdown: {
    name: "Lockdown",
    active: false,
    category: "hacking",
    rcc: false
  },
  mugger: {
    name: "Mugger",
    active: false,
    category: "hacking",
    rcc: false
  },
  shell: {
    name: "Shell",
    active: false,
    category: "hacking",
    rcc: true,
    test: "Resist Matrix Damage, Resist Biofeedback Damage",
    mod: 1
  },
  sneak: {
    name: "Sneak",
    active: false,
    category: "hacking",
    rcc: true,
    test: "Defend Trace User",
    mod: 2
  },
  stealth: {
    name: "Stealth",
    active: false,
    category: "hacking",
    rcc: false,
    sleaze: 1
  },
  track: {
    name: "Track",
    active: false,
    category: "hacking",
    rcc: false,
    test: "Trace User",
    mod: 2
  },
  wrapper: {
    name: "Wrapper",
    active: false,
    category: "hacking",
    rcc: true
  }
};

var visionenhancements = {
  empty: {
    name: "Empty",
    avail: 0,
    cost: 0
  },
  lowlightvision: {
    name: "Low-light vision",
    cap: 1,
    avail: 4,
    restricted: "",
    cost: 500
  },
  flarecompensation: {
    name: "Flare Compensation",
    cap: 1,
    avail: 1,
    restricted: "",
    cost: 250
  },
  imagelink: {
    name: "Image Link",
    cap: 1,
    avail: 0,
    restricted: "",
    cost: 25
  },
  smartlink: {
    name: "Smartlink",
    cap: 1,
    avail: 4,
    restricted: "Restricted",
    cost: 2000
  },
  thermographicvision: {
    name: "Thermographic Vision",
    cap: 1,
    avail: 6,
    restricted: "",
    cost: 500
  },
  visionenhancement1: {
    name: "Vision Enhancement 1",
    rating: 1,
    cap: 1,
    avail: 2,
    restricted: "",
    cost: 500
  },
  visionenhancement2: {
    name: "Vision Enhancement 2",
    rating: 2,
    cap: 2,
    avail: 4,
    restricted: "",
    cost: 1000
  },
  visionenhancement3: {
    name: "Vision Enhancement 3",
    rating: 3,
    cap: 3,
    avail: 6,
    restricted: "",
    cost: 1500
  },
  visionmagnification: {
    name: "Vision Magnification",
    cap: 1,
    avail: 2,
    restricted: "",
    cost: 250
  }
};

var audioenhancements = {
  empty: {
    name: "Empty",
    avail: 0,
    cost: 0
  },
  audioenhancement1: {
    name: "Audio Enhancement 1",
    rating: 1,
    cap: 1,
    avail: 2,
    restricted: "",
    cost: 500
  },
  audioenhancement2: {
    name: "Audio Enhancement 2",
    rating: 2,
    cap: 2,
    avail: 4,
    restricted: "",
    cost: 1000
  },
  audioenhancement3: {
    name: "Audio Enhancement 3",
    rating: 3,
    cap: 3,
    avail: 6,
    restricted: "",
    cost: 1500
  },
  selectsoundfilter1: {
    name: "Select Sound Filter 1",
    rating: 1,
    cap: 1,
    avail: 3,
    restricted: "",
    cost: 250
  },
  selectsoundfilter2: {
    name: "Select Sound Filter 2",
    rating: 2,
    cap: 2,
    avail: 6,
    restricted: "",
    cost: 500
  },
  selectsoundfilter3: {
    name: "Select Sound Filter 3",
    rating: 3,
    cap: 3,
    avail: 9,
    restricted: "",
    cost: 750
  },
  spatialrecognizer: {
    name: "Spatial Recognizer",
    rating: 1,
    cap: 2,
    avail: 4,
    restricted: "",
    cost: 1000
  }
};

characteraugmentation = {
  limbs: {
    head: {},
    chest: {},
    leftarm: {},
    leftleg: {},
    rightarm: {},
    rightleg: {}
  }
};

var augmentations = {
  grade: {
    used: {
      cost: 0.75,
      ess: 1.25,
      avail: -4
    },
    standard: {
      cost: 1,
      ess: 1,
      avail: 0
    },
    alpha: {
      cost: 1.2,
      ess: 0.8,
      avail: 2
    },
    beta: {
      cost: 1.5,
      ess: 0.7,
      avail: 4
    },
    delta: {
      cost: 2.5,
      ess: 0.5,
      avail: 8
    }
  },
  obvious: {
    fullarm: {
      name: "Obvious Full Arm",
      grade: "standard",
      slot: "arm",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 1,
      cap: 0,
      capmax: 15,
      avail: 4,
      cost: 15000
    },
    fullleg: {
      name: "Obvious Full Leg",
      grade: "standard",
      slot: "leg",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 1,
      cap: 0,
      capmax: 20,
      avail: 4,
      cost: 15000
    },
    hand: {
      name: "Obvious Hand",
      grade: "standard",
      slot: "arm",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 0.25,
      cap: 0,
      capmax: 4,
      avail: 2,
      cost: 5000
    },
    foot: {
      name: "Obvious Foot",
      grade: "standard",
      slot: "leg",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 0.25,
      cap: 0,
      capmax: 4,
      avail: 2,
      cost: 5000
    },
    lowerarm: {
      name: "Obvious Lower Arm",
      grade: "standard",
      slot: "arm",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 0.45,
      cap: 0,
      capmax: 10,
      avail: 4,
      cost: 10000
    },
    lowerleg: {
      name: "Obvious Lower Leg",
      grade: "standard",
      slot: "leg",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 0.45,
      cap: 0,
      capmax: 12,
      avail: 4,
      cost: 10000
    },
    torso: {
      name: "Obvious Torso",
      grade: "standard",
      slot: "chest",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 1.5,
      cap: 0,
      capmax: 10,
      avail: 12,
      cost: 20000
    },
    skull: {
      name: "Obvious Skull",
      grade: "standard",
      slot: "head",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 0.75,
      cap: 0,
      capmax: 4,
      avail: 16,
      cost: 10000
    }
  },
  synthetic: {
    fullarm: {
      name: "Synthetic Full Arm",
      grade: "standard",
      slot: "arm",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 1,
      cap: 0,
      capmax: 8,
      avail: 4,
      cost: 20000
    },
    fullleg: {
      name: "Synthetic Full Leg",
      grade: "standard",
      slot: "leg",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 1,
      cap: 0,
      capmax: 10,
      avail: 4,
      cost: 20000
    },
    hand: {
      name: "Synthetic Hand",
      grade: "standard",
      slot: "arm",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 0.25,
      cap: 0,
      capmax: 2,
      avail: 2,
      cost: 6000
    },
    foot: {
      name: "Synthetic Lower Arm",
      grade: "standard",
      slot: "arm",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 0.45,
      cap: 0,
      capmax: 5,
      avail: 4,
      cost: 12000
    },
    lowerleg: {
      name: "Synthetic Lower Leg",
      grade: "standard",
      slot: "leg",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 0.45,
      cap: 0,
      capmax: 6,
      avail: 4,
      cost: 12000
    },
    torso: {
      name: "Synthetic Torso",
      grade: "standard",
      slot: "chest",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 1.5,
      cap: 0,
      capmax: 5,
      avail: 12,
      cost: 25000
    },
    skull: {
      name: "Synthetic Skull",
      grade: "standard",
      slot: "head",
      str: 3,
      augstr: 0,
      agi: 3,
      augagi: 0,
      armor: 0,
      rc: 0,
      essence: 0.75,
      cap: 0,
      capmax: 2,
      avail: 16,
      cost: 15000
    }
  },
  mods: {
    //limb enhancement
    enhancementagility: {
      name: "Enhancement Agility",
      type: "limb enhancement",
      stat: "agi",
      allow: ["arm", "leg", "chest", "head"],
      rating: 0,
      ratingmax: 3,
      capacity: 0,
      avail: 0,
      availx: 3,
      restrict: "R",
      cost: 0,
      costx: 6500,
      ref: {
        book: "SR5",
        page: "456,457"
      }
    },
    enhancementarmor: {
      name: "Enhancement Armor",
      type: "limb enhancement",
      stat: "armor",
      allow: ["arm", "leg", "chest", "head"],
      rating: 0,
      ratingmax: 3,
      capacity: 0,
      avail: 0,
      availx: 5,
      restrict: "",
      cost: 0,
      costx: 3000,
      ref: {
        book: "SR5",
        page: "456,457"
      }
    },
    enhancementstrength: {
      name: "Enhancement Strength",
      type: "limb enhancement",
      stat: "str",
      allow: ["arm", "leg", "chest", "head"],
      rating: 0,
      ratingmax: 3,
      capacity: 0,
      avail: 0,
      availx: 3,
      restrict: "R",
      cost: 0,
      costx: 6500,
      ref: {
        book: "SR5",
        page: "456,457"
      }
    },

    //limb accessories
    cyberarmgyromount: {
      name: "Cyberarm Gyromount",
      type: "accessory",
      stat: "rc",
      allow: ["arm"],
      rc: 3,
      capacity: 8,
      avail: 12,
      restrict: "F",
      cost: 6000,
      ref: {
        book: "SR5",
        page: "456,457"
      }
    },
    cyberarmslide: {
      name: "Cyberarm Slide",
      type: "accessory",
      allow: ["arm"],
      capacity: 3,
      avail: 12,
      restrict: "R",
      cost: 3000,
      ref: {
        book: "SR5",
        page: "456,457"
      }
    },
    cyberholster: {
      name: "Cyber Holster",
      type: "accessory",
      allow: ["arm", "leg", "chest", "head"],
      capacity: 5,
      avail: 8,
      restrict: "R",
      cost: 2000,
      ref: {
        book: "SR5",
        page: "457"
      }
    },
    hydraulicjacks: {
      name: "Hydraulic Jacks",
      type: "accessory",
      allow: ["leg"],
      rating: 0,
      ratingmax: 6,
      capacity: 0,
      avail: 9,
      availx: 0,
      restrict: "",
      cost: 0,
      costx: 8000,
      ref: {
        book: "SR5",
        page: "456,457"
      }
    },
    largesmugglingcompartment: {
      name: "Large Smuggling Compartment",
      type: "accessory",
      allow: ["arm", "leg", "chest", "head"],
      capacity: 5,
      avail: 6,
      restrict: "",
      cost: 8000,
      ref: {
        book: "SR5",
        page: "457"
      }
    }

  },
  weapons: {
    holdoutpistol: {
      name: "Hold-Out Pistol",
      type: "cybergun",
      clip: false,
      laser: false,
      silencer: false,
      capacity: 2,
      avail: 8,
      restrict: "R",
      cost: 2000,
      ref: {
        book: "SR5",
        page: "458"
      },
      stats: {
        skill: "pistols",
        accuracy: 4,
        accmod: 2,
        damage: 6,
        stat: 0,
        dvmod: 0,
        damtype: "P",
        element: "",
        mode: {
          SA: "SA"
        },
        rc: 0,
        rcmod: 0,
        ammo: {
          mag: 2,
          clip: 6
        },
        clip: {
          mag: "m",
          clip: "c"
        },
        ap: 0
      }
    }
  }
};
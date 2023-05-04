const mongoose = require("mongoose");
const { Item } = require("../models/item");
const { User } = require("../models/user");

/** @type {import("express").RequestHandler} */
exports.initDatabase = async (_req, res, _next) => {
  const db = mongoose.connection.db;
  await db
    .collections()
    .then((collections) => Promise.all(collections.map((c) => c.drop())));
  await Promise.all(USERS.map((u) => User.create(u)));
  await Promise.all(ITEMS.map((i) => Item.create(i)));
  res.json(
    `Database initialized with ${USERS.length} users and ${ITEMS.length} items.`
  );
};

const USERS = [
  { username: "utilizador1", password: "Password1" },
  { username: "utilizador2", password: "Password2" },
  { username: "utilizador3", password: "Password3" },
];

const ITEMS = [
  {
    title: "Path of Exile",
    description:
      "You are an Exile, struggling to survive on the dark continent of Wraeclast, as you fight to earn power that will allow you to exact your revenge against those who wronged you. Created by hardcore gamers, Path of Exile is an online Action RPG set in a dark fantasy world.",
    type: "game",
    price: 0,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/238960/header.jpg?t=1680737814",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256939794/movie480_vp9.webm?t=1680737807",
    stars: 4,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/238960/ss_113e35bb756cd089a8834cb78f6d063d725a2f1a.600x338.jpg?t=1680737814",
    ],
    language: [
      "English",
      "Portuguese - Brazil",
      "Russian",
      "Thai",
      "French",
      "German",
      "Spanish - Spain",
      "Japanese",
    ],
    reviews: [],
  },
  {
    title: "Vampire Survivors",
    description:
      "Mow down thousands of night creatures and survive until dawn! Vampire Survivors is a gothic horror casual game with rogue-lite elements, where your choices can allow you to quickly snowball against the hundreds of monsters that get thrown at you. ",
    type: "game",
    price: 4.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/1794680/header.jpg?t=1681394120",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256911886/movie480_vp9.webm?t=1666779005",
    stars: 5,
    language: [
      "English",
      "Portuguese - Brazil",
      "Italian",
      "Russian",
      "Polish",
      "Korean",
      "Turkish",
      "French",
      "German",
      "Spanish - Spain",
      "Japanese",
      "Simplified Chinese",
    ],
    reviews: [],
  },
  {
    title: "Cyberpunk 2077",
    description:
      "Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification.",
    type: "game",
    price: 29.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?t=1680026109",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256812920/movie480_vp9.webm?t=1611326875",
    stars: 3,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_9284d1c5b248726760233a933dbb83757d7d5d95.1920x1080.jpg?t=1680026109",
      "https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_429db1d013a0366417d650d84f1eff02d1a18c2d.1920x1080.jpg?t=1680026109",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Arabic",
      "Czech",
      "Hungarian",
      "Japanese",
      "Korean",
      "Polish",
      "Portuguese - Brazil",
      "Russian",
      "Simplified Chinese",
      "Spanish - Latin America",
      "Thai",
      "Traditional Chinese",
      "Turkish",
    ],
    reviews: [],
  },
  {
    title: "Counter-Strike: Global Offensive",
    description:
      "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
    type: "game",
    price: 0,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg?t=1668125812",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/81958/movie480.webm?t=1554409259",
    stars: 4,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/730/ss_34090867f1a02b6c17652ba9043e3f622ed985a9.600x338.jpg?t=1668125812",
      "https://cdn.akamai.steamstatic.com/steam/apps/730/ss_d196d945c6170e9cadaf67a6dea675bd5fa7a046.600x338.jpg?t=1668125812",
    ],
    language: [
      "English",
      "Czech",
      "Danish",
      "Dutch",
      "Finnish",
      "French",
      "German",
      "Hungarian",
      "Italian",
      "Japanese",
      "Korean",
      "Norwegian",
      "Polish",
      "Portuguese - Portugal",
      "Portuguese - Brazil",
      "Romanian",
      "Russian",
      "Simplified Chinese",
      "Spanish - Spain",
      "Swedish",
      "Thai",
      "Traditional Chinese",
      "Turkish",
      "Bulgarian",
      "Ukrainian",
      "Greek",
      "Spanish - Latin America",
      "Vietnamese",
    ],
    reviews: [],
  },
  {
    title: "Hades",
    description:
      "Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.",
    type: "game",
    price: 24.5,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg?t=1680293801",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256801252/movie480_vp9.webm?t=1600353465",
    stars: 5,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_34e6660705cfe47d2b2f95189c37f7cb77f75ca6.1920x1080.jpg?t=1680293801",
      "https://cdn.akamai.steamstatic.com/steam/apps/1145360/ss_2a9e3f9ad4d29d900b890d56361be5b1634225a0.1920x1080.jpg?t=1680293801",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Korean",
      "Portuguese - Brazil",
      "Russian",
      "Simplified Chinese",
      "Polish",
      "Japanese",
    ],
    reviews: [],
  },
  {
    title: "Deep Rock Galactic",
    description:
      "Deep Rock Galactic is a 1-4 player co-op FPS featuring badass space Dwarves, 100% destructible environments, procedurally-generated caves, and endless hordes of alien monsters.",
    type: "game",
    price: 29.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/548430/header.jpg?t=1681822890",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256914352/movie480_vp9.webm?t=1667477058",
    stars: 5,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/548430/ss_841a0b91ec00596fed5e44c5e269d203b5101b93.600x338.jpg?t=1681822890",
      "https://cdn.akamai.steamstatic.com/steam/apps/548430/ss_a7db62883008aa5cd239efcab1cb717e6f7f8642.600x338.jpg?t=1681822890",
    ],
    language: [
      "English",
      "German",
      "Spanish - Spain",
      "Polish",
      "Portuguese - Brazil",
      "Russian",
      "Simplified Chinese",
      "Traditional Chinese",
      "Ukrainian",
      "Italian",
      "Japanese",
      "Korean",
      "Turkish",
      "Spanish - Latin America",
    ],
    reviews: [],
  },
  {
    title: "Deep Rock Galactic - Supporter Upgrade",
    description:
      "So you like Deep Rock Galactic, but it’s just not enough? You want more? Well, then the Supporter Upgrade is for you! Help fuel further development of the game, while getting your grubby mining-gloves on this tasty bag of exclusive treats",
    type: "dlc",
    price: 14.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/801860/header.jpg?t=1665771437",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256785249/movie480_vp9.webm?t=1589372651",
    stars: 5,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/801860/ss_8df5afcfe41a6bb3adcc9904e103ccd332c2144c.1920x1080.jpg?t=1665771437",
      "https://cdn.akamai.steamstatic.com/steam/apps/801860/ss_f0e1914a3c9ec95fd64230bf080c663c759cb251.600x338.jpg?t=1665771437",
    ],
    language: ["English"],
    reviews: [],
  },
  {
    title: "Red Dead Redemption 2",
    description:
      "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age. Also includes access to the shared living world of Red Dead Online. ",
    type: "game",
    price: 59.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg?t=1671485009",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256768371/movie480.webm?t=1574881352",
    stars: 4,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_bac60bacbf5da8945103648c08d27d5e202444ca.600x338.jpg?t=1671485009",
      "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_668dafe477743f8b50b818d5bbfcec669e9ba93e.600x338.jpg?t=1671485009",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Japanese",
      "Korean",
      "Polish",
      "Portuguese - Portugal",
      "Russian",
      "Simplified Chinese",
      "Spanish - Latin America",
      "Traditional Chinese",
    ],
    reviews: [],
  },
  {
    title: "Dying Light 2 Stay Human",
    description:
      "The virus won and civilization has fallen back to the Dark Ages. The City, one of the last human settlements, is on the brink of collapse. Use your agility and combat skills to survive, and reshape the world. Your choices matter.",
    type: "game",
    price: 59.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/534380/header_alt_assets_16.jpg?t=1682077721",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256921118/movie480_vp9.webm?t=1681381793",
    stars: 3,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/534380/ss_6f01caca9af07032a22f16712f180c7e7ab0a1a3.600x338.jpg?t=1682077721",
      "https://cdn.akamai.steamstatic.com/steam/apps/534380/ss_55c2e557b3d5715665435dcd748044539d867c0b.600x338.jpg?t=1682077721",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Korean",
      "Polish",
      "Portuguese - Brazil",
      "Russian",
      "Spanish - Latin America",
      "Arabic",
      "Czech",
      "Japanese",
      "Portuguese - Portugal",
      "Simplified Chinese",
      "Traditional Chinese",
      "Turkish",
    ],
    reviews: [],
  },
  {
    title: "Dying Light 2 Stay Human - Rais Bundle",
    description:
      "It is time to live by your own rules and become the most feared man in The City. Satisfy your hunger for power and wealth as Rais, a powerful warlord who strikes fear in the hearts of all survivors. Don the Rais’ Outfit, take pleasure in slicing your enemies (both human and Infected) with the Wolfclaw machete, and use the Rais Paraglider skin to reside high above anyone else as only the true ruler should.",
    type: "dlc",
    price: 2.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/2269810/header.jpg?t=1678195066",
    stars: 3,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/2269810/ss_733cd5ea89a2b7aa3af4dcb0637cf10ee60f4fc1.600x338.jpg?t=1678195066",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Korean",
      "Polish",
      "Portuguese - Brazil",
      "Russian",
      "Spanish - Latin America",
      "Arabic",
      "Czech",
      "Japanese",
      "Portuguese - Portugal",
      "Simplified Chinese",
      "Traditional Chinese",
      "Turkish",
    ],
    reviews: [],
  },
  {
    title: "Call of Duty: Modern Warfare II",
    description:
      "Call of Duty®: Modern Warfare® II drops players into an unprecedented global conflict that features the return of the iconic Operators of Task Force 141.",
    type: "game",
    price: 69.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/1938090/header_alt_assets_3.jpg?t=1681315823",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256909731/movie480_vp9.webm?t=1665181812",
    stars: 2,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/1938090/ss_da11f26c8fec6def6e235786e11b868eb8b115ef.600x338.jpg?t=1681315823",
      "https://cdn.akamai.steamstatic.com/steam/apps/1938090/ss_669067a108c25b5a1f62d25f9fbca1739ecca1b7.600x338.jpg?t=1681315823",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Korean",
      "Polish",
      "Russian",
      "Traditional Chinese",
      "Japanese",
      "Spanish - Latin America",
      "Arabic",
      "Simplified Chinese",
      "Portuguese - Brazil",
    ],
    reviews: [],
  },
  {
    title: "Call of Duty: Modern Warfare II - BlackCell (Season 03)",
    description:
      "Offering includes: Battle Pass for Season 03, 20 Battle Token Tier Skips\nExclusive BlackCell Sector on the Battle Map: 1100 Call of Duty® Points, BlackCell Operator, Pro-Tuned Weapon Blueprint, Vehicle Skin, Finishing Move",
    type: "subscription",
    price: 29.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/2228970/header_alt_assets_0.jpg?t=1681398517",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256940473/movie480_vp9.webm?t=1681315271",
    stars: 2,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/2228970/ss_aa07b778e02e09317d6f516cc74dd6fa46d6504a.600x338.jpg?t=1681398517",
      "https://cdn.akamai.steamstatic.com/steam/apps/2228970/extras/BlackCell_Infography.png?t=1681398517",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Korean",
      "Polish",
      "Russian",
      "Traditional Chinese",
      "Japanese",
      "Spanish - Latin America",
      "Arabic",
      "Simplified Chinese",
      "Portuguese - Brazil",
    ],
    reviews: [],
  },
  {
    title: "ELDEN RING",
    description:
      "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. ",
    type: "game",
    price: 59.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg?t=1674441703",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256845668/movie480_vp9.webm?t=1646817775",
    stars: 4,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_ae44317e3bd07b7690b4d62cc5d0d1df30367a91.600x338.jpg?t=1674441703",
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_e80a907c2c43337e53316c71555c3c3035a1343e.600x338.jpg?t=1674441703",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Japanese",
      "Korean",
      "Polish",
      "Portuguese - Brazil",
      "Russian",
      "Simplified Chinese",
      "Spanish - Latin America",
      "Thai",
      "Traditional Chinese",
    ],
    reviews: [],
  },
  {
    title: "DARK SOULS III",
    description:
      "Dark Souls continues to push the boundaries with the latest, ambitious chapter in the critically-acclaimed and genre-defining series. Prepare yourself and Embrace The Darkness!",
    type: "game",
    price: 59.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/374320/header.jpg?t=1671097812",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256663133/movie480.webm?t=1511366748",
    stars: 4,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/374320/ss_da36c88ae35d4f20c9d221a79592b31c080521d2.600x338.jpg?t=1671097812",
      "https://cdn.akamai.steamstatic.com/steam/apps/374320/ss_1318a04ef11d87f38aebe6d47a96124f8f888ca8.600x338.jpg?t=1671097812",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Polish",
      "Russian",
      "Portuguese - Brazil",
      "Simplified Chinese",
      "Traditional Chinese",
      "Japanese",
      "Korean",
    ],
    reviews: [],
  },
  {
    title: "DARK SOULS III - Season Pass",
    description:
      'Winner of gamescom award 2015 "Best RPG" and over 35 E3 2015 Awards and Nominations, DARK SOULS™ III leads you once again into a challenging world of ruin and despair. Expand your DARK SOULS™ III experience with the Season Pass and gain access to 2 epic DLC packs at a discounted price. Challenge yourself with new maps, bosses, enemies and additional weapon and armor sets. Prepare yourself once more and embrace the darkness.',
    type: "subscription",
    price: 24.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/442010/header.jpg?t=1580309272",
    stars: 4,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/442010/ss_61524dee9ebf72d462638f21adbbbea4c93d791d.600x338.jpg?t=1580309272",
      "https://cdn.akamai.steamstatic.com/steam/apps/442010/ss_12c4d9a3c04d6d340ffea9335441eb2ad84e0028.600x338.jpg?t=1580309272",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Polish",
      "Russian",
      "Portuguese - Brazil",
      "Simplified Chinese",
      "Traditional Chinese",
      "Japanese",
      "Korean",
    ],
    reviews: [],
  },
  {
    title: "DARK SOULS III - Ashes of Ariandel",
    description:
      "You, are the unkindled. As part of the Dark Souls™ III Season Pass, expand your Dark Souls™ III experience with the Ashes of Ariandel™ DLC pack. Journey to the snowy world of Ariandel and encounter new areas, bosses, enemies, weapons, armor set, magic spells and more. Will you accept the challenge and embrace the darkness once more?",
    type: "dlc",
    price: 14.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/506970/header.jpg?t=1580310767",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256668655/movie480.webm?t=1472048995",
    stars: 2,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/506970/ss_4340cced464fe43b00f1738e6b01d0fb547e53c8.600x338.jpg?t=1580310767",
      "https://cdn.akamai.steamstatic.com/steam/apps/506970/ss_fa60aa5cfa766f3f39d8e348d2afa708b19bdf42.600x338.jpg?t=1580310767",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Polish",
      "Russian",
      "Portuguese - Brazil",
      "Simplified Chinese",
      "Traditional Chinese",
      "Japanese",
      "Korean",
    ],
    reviews: [],
  },
  {
    title: "DARK SOULS III - The Ringed City",
    description:
      "Fear not, the dark, ashen one. The Ringed City is the final DLC pack for Dark Souls III – an award-winning, genre-defining Golden Joystick Awards 2016 Game of the year RPG. Journey to the world’s end to search for the Ringed City and encounter new lands, new bosses, new enemies with new armor, magic and items. Experience the epic final chapter of a dark world that could only be created by the mind of Hidetaka Miyazaki. A New World. One Last Journey.",
    type: "dlc",
    price: 14.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/506971/header.jpg?t=1580310936",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256678378/movie480.webm?t=1485213428",
    stars: 4,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/506971/ss_e10b7ca36403966c6eee3edd0676c5152ae192ef.600x338.jpg?t=1580310936",
      "https://cdn.akamai.steamstatic.com/steam/apps/506971/ss_67b526da6ae969453a477d94e9167cc270222aa0.600x338.jpg?t=1580310936",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Polish",
      "Russian",
      "Portuguese - Brazil",
      "Simplified Chinese",
      "Traditional Chinese",
      "Japanese",
      "Korean",
    ],
    reviews: [],
  },
  {
    title: "Stardew Valley",
    description:
      "You have inherited your grandfathers old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?",
    type: "game",
    price: 13.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg?t=1666917466",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256660296/movie480.webm?t=1454099186",
    stars: 5,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/413150/ss_b887651a93b0525739049eb4194f633de2df75be.600x338.jpg?t=1666917466",
      "https://cdn.akamai.steamstatic.com/steam/apps/413150/ss_64d942a86eb527ac817f30cc04406796860a6fc1.600x338.jpg?t=1666917466",
    ],
    language: [
      "English",
      "German",
      "Spanish - Spain",
      "Japanese",
      "Portuguese - Brazil",
      "Russian",
      "Simplified Chinese",
      "French",
      "Italian",
      "Hungarian",
      "Korean",
      "Turkish",
    ],
    reviews: [],
  },
  {
    title: "Raft",
    description:
      "aft throws you and your friends into an epic oceanic adventure! Alone or together, players battle to survive a perilous voyage across a vast sea! Gather debris, scavenge reefs and build your own floating home, but be wary of the man-eating sharks!",
    type: "game",
    price: 19.99,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/648800/header.jpg?t=1655744208",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256892239/movie480_vp9.webm?t=1655744106",
    stars: 4,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_7f3903e7a34e8992e12449f168744315a4e2cd49.600x338.jpg?t=1655744208",
      "https://cdn.akamai.steamstatic.com/steam/apps/648800/ss_02579aefd100d68c82bd06d2de05bfb915214266.600x338.jpg?t=1655744208",
    ],
    language: [
      "English",
      "French",
      "Italian",
      "German",
      "Spanish - Spain",
      "Japanese",
      "Korean",
      "Polish",
      "Portuguese - Brazil",
      "Russian",
      "Simplified Chinese",
      "Swedish",
    ],
    reviews: [],
  },
  {
    title: "Rain World",
    description:
      " You are a nomadic slugcat, both predator and prey in a broken ecosystem. Grab your spear and brave the industrial wastes, hunting enough food to survive, but be wary— other, bigger creatures have the same plan... and slugcats look delicious.",
    type: "game",
    price: 24.5,
    cover:
      "https://cdn.akamai.steamstatic.com/steam/apps/312520/header.jpg?t=1674137018",
    video:
      "https://cdn.akamai.steamstatic.com/steam/apps/256680866/movie480.webm?t=1488988824",
    stars: 4,
    reel: [
      "https://cdn.akamai.steamstatic.com/steam/apps/312520/ss_d551eee41e60ba8f5f2005b3de41c5f2c27cb444.600x338.jpg?t=1674137018",
      "https://cdn.akamai.steamstatic.com/steam/apps/312520/ss_519831951a674f56ca80fd7e14884a7291d71e50.600x338.jpg?t=1674137018",
    ],
    language: [
      "English",
      "Italian",
      "Spanish - Spain",
      "Portuguese - Brazil",
      "French",
      "German",
      "Japanese",
      "Korean",
      "Russian",
      "Simplified Chinese",
    ],
    reviews: [],
  },
];

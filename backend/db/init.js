var express = require("express");
var router = express.Router();

const { User } = require("../db/models/user");
const USERS = require("../db/init/mock-users").USERS;

const { Item } = require("../db/models/item");
const ITEMS = require("../db/init/storeItems").ITEMS;

/*inicializar os os valores na bd
neste caso so apaga o conteudo da tabela user e insere alguns utilizadores para teste*/

router.get("/", async function (req, res, next) {
  try {
    var count = await User.find().count();
    if (count > 0) {
      await User.deleteMany();
    }

    USERS.forEach(async (elem) => {
      const newUser = new User(elem);
      await newUser.save();
    });

    count = await Item.find().count();

    if (count > 0) {
      await Item.deleteMany();
    }

    ITEMS.forEach(async (elem) => {
      const newItem = new Item(elem);
      await newItem.save();
    });

    return res.status(200).json({ message: "Values initialized" });
  } catch (error) {
    return res.status(304).json({ message: "Error initializing values" });
  }
});

module.exports = router;

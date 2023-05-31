const Io = require("../utils/Io");
const Kitob = require("../models/Kitob");
const Turi = require("../models/turi");

const Kitoblar = new Io ("./database/kitoblar.json");
const Turlari = new Io ("./database/turlari.json");

const getKitob = async (req, res) => {
    const kitoblar = await Kitoblar.read();
    console.log(kitoblar);
    res.send(kitoblar);
};

const getTuri = async (req, res) => {
    const turlari = await Turlari.read();
    console.log(turlari);
    res.send(turlari);
};


const postKitob = async (req, res) => {
    const {image} = req.files;
    const {name, category, year, about, author} = req.body;

    const kitoblar = await Kitoblar.read();

    const id = (kitoblar[kitoblar.length - 1]?.id || 0) + 1;
    const muqova = `${Date.now()}.${image.mimetype.split("/")[1]}`;
    image.mv(process.cwd() + `/uploads/${Date.now()}.${image.mimetype.split("/")[1]}`);

    const newKitob = new Kitob(id, name, category, year, about, author, muqova);

    const data = kitoblar.length ? [...kitoblar, newKitob] : [newKitob];

    Kitoblar.write(data);

    res.status(201).json({message: "Success"});
};

const postTuri = async (req, res) => {
    const {name} = req.body;
    console.log(name);
    const turlari = await Turlari.read();

    const id = (turlari[turlari.length - 1]?.id || 0) + 1;

    const newTur = new Turi (id, name);

    const data = turlari.length ? [...turlari, newTur] : [newTur];

    Turlari.write(data);

    res.status(201).json({message: "Success"});
};

const putKitob = async (req, res) => {
    const {id, name, category, year, about, author} = req.body;
    const kitoblar = await Kitoblar.read();
    const putkitob = kitoblar[id - 1];

    name ? (putkitob.name = name) : putkitob.name;
    category ? (putkitob.category = category) : putkitob.category;
    year ? (putkitob.year = year) : putkitob.year;
    about ? (putkitob.about = about) : putkitob.about;
    author ? (putkitob.author = author) : putkitob.author;

    Kitoblar.write(kitoblar);

    res.status(200).json({message: "Success"});
};

const putTuri = async (req, res) => {
    const {id, name} = req.body;
    const turlari = await Turlari.read();
    const putturi = turlari[id - 1];

    name ? (putturi.name = name) : putturi.name;

    Turlari.write(turlari);

    res.status(200).json({message: "Success"});
};

const deleteKitob = async (req, res) => {
    const {id} = req.body;
    const kitoblar = await Kitoblar.read();

    kitoblar.splice(id - 1, 1);

    Kitoblar.write(kitoblar);

    res.status(200).json({message: "Delete by id"});
}

module.exports = {
    getKitob,
    getTuri,
    postKitob,
    postTuri,
    putKitob,
    putTuri,
    deleteKitob,
};
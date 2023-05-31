class Kitob {
    constructor(id, name, category, year, about, author, muqova) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.year = year;
        this.about = about;
        this.author = author;
        this.muqova = muqova;
        this.status = "process";
        this.createdAt = new Date();
    };
};

module.exports = Kitob;
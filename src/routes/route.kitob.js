const {Router} = require("express");
const {getKitob, getTuri, postKitob, postTuri, putKitob, putTuri, deleteKitob} = require("../controlle/controlle.kitoblar");

const routes = Router();

routes.get("/kitob", getKitob);
routes.get("/turi", getTuri);
routes.post("/kitob", postKitob);
routes.post("/turi", postTuri);
routes.put("/kitob", putKitob);
routes.put("/turi", putTuri);
routes.delete("/kitob", deleteKitob);

module.exports = routes;
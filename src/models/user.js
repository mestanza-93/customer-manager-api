const mongodb = require('mongodb');
const constants = require('../../constants');

console.log(constants);

/* GETTERS */

/**
 * 
 * @param {*} request 
 * @param {*} response JSON data of all users
 */
exports.getAllUsers = (request, response) => {
  mongodb.MongoClient.connect(constants.MONGODB, function (err, client) {
    const db = client.db(constants.DATABASE_NAME);

    users = db.collection("user").find().toArray();
    response.send(JSON.stringify(users));

    db.close();
  });
};




/* INSERTS */

/**
 * 
 * @param {*} request JSON data
 * @param {*} response 
 */
exports.createUserTest = (request, response) => {
  mongodb.MongoClient.connect(constants.MONGODB, function (err, client) {
    const db = client.db(constants.DATABASE_NAME);

    let newData = {
      name: "Antonio",
      lastname: "Garcia Castro",
      address: "Dirección 21312453125",
      town: "Alhaurín de la Torre",
      province: "Málaga",
      country: "España",
      postalcode: "29130",
      dni: "123456789-X",
      phone: "123456789",
      email: "antonio@gmail.com",
    };

    db.collection("user").insert(newData);
    db.close();
  });
};

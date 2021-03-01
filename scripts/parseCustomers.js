const fs = require('fs');
const helper = require('./helpers/parseHelper');

const file = "scripts/database/customer.db";
const jsonFile = "scripts/json_files/customers.json";

const fields = {
    _id: '_id',
    name: 'name', 
    lastname: 'lastname', 
    phone: 'phone', 
    phone2: 'phone2', 
    dni: 'dni',
    postalcode: 'postalcode',
    address: 'address',
    town: 'town',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
};

var arrayCustomers = [];


fs.readFile(file, 'utf8', (err, jsonString) => {
    if (err) {
        console.log('File read failed: ', err);
    }

    jsonString = jsonString.replace(/}}/gi, '}}#')
    var customers = jsonString.split('#');

    customers.forEach(customer => {

        if (customer) {

            for (var field in fields) {
                customer = customer.replace(field, fields[field]);
            };

            customer = JSON.parse(customer);

            customer.created_at = helper.formatDate(customer.created_at.$$date);
            customer.updated_at = helper.formatDate(customer.updated_at.$$date);

            arrayCustomers.push(customer);
        }
    });

    json = JSON.stringify(arrayCustomers);

    fs.writeFile(jsonFile, json, 'utf8', (err) => {
        if (err) {
            console.log('File write failed: ', err);
        } else {
            console.log('File write OK');
        }
    });


});


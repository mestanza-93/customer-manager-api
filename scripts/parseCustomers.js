const fs = require('fs');
const { exit } = require('process');

const file = "scripts/database/customer.db";

fs.readFile(file, 'utf8', (err, jsonString) => {
    if (err) {
        console.log('File read failed: ', err);
    }

    var data = jsonString;

    data = data.replace(/}}/gi, '}}#')
    var customers = data.split('#');

    customers.forEach(customer => {
        console.log(JSON.parse(customer));
    });
});


const fs = require('fs');
const helper = require('./helpers/parseHelper');

const file = "scripts/database/work.db";
const jsonFile = "scripts/json_files/works.json";

const fields = {
    _id: '_id',
    work: 'name',
    id_customer: 'customer_id',
    date: 'date',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
};


fs.readFile(file, 'utf8', (err, jsonString) => {
    if (err) {
        console.log('File read failed: ', err);
    }

    var data = {
        works: []
    };

    jsonString = jsonString.replace(/}}/gi, '}}#')
    var works = jsonString.split('#');

    works.forEach(work => {

        if (work) {

            for (var field in fields) {
                work = work.replace(field, fields[field]);
            };

            work = JSON.parse(work);

            work.date = helper.formatDate(work.timestamp);
            work.created_at = helper.formatDate(work.created_at.$$date);
            work.updated_at = helper.formatDate(work.updated_at.$$date);

            delete work.timestamp;

            data.works.push(work);
        }
    });

    json = JSON.stringify(data);

    fs.writeFile(jsonFile, json, 'utf8', (err) => {
        if (err) {
            console.log('File write failed: ', err);
        }
    });
});


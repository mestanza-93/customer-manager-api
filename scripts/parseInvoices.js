const fs = require('fs');
const helper = require('./helpers/parseHelper');

const file = "scripts/database/invoice.db";
const jsonFile = "scripts/json_files/invoices.json";
const productFile = "scripts/json_files/products.json";

const fields = {
    _id: '_id',
    id_invoice: 'invoice_id',
    id_work: 'work_id',
    iva: 'iva',
    date: 'date',
    payment: 'payment',
    comment: 'comment',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
};

const fieldsProduct = {
    concept: "concept",
    base: "base",
    units: "units",
    official: "official",
    relation_id: "relation_id"
};


fs.readFile(file, 'utf8', (err, jsonString) => {
    if (err) {
        console.log('File read failed: ', err);
    }

    var data = {
        invoices: []
    };

    var dataProduct = {
        products: []
    };

    jsonString = jsonString.replace(/}}/gi, '}}#')
    var invoices = jsonString.split('#');

    invoices.forEach(invoice => {

        if (invoice) {

            for (var field in fields) {
                invoice = invoice.replace(field, fields[field]);
            };
            
            invoice = JSON.parse(invoice);

            invoice.date = helper.formatDate(invoice.timestamp);

            invoice.created_at = helper.formatDate(invoice.created_at.$$date);
            invoice.updated_at = helper.formatDate(invoice.updated_at.$$date);

            delete invoice['concept'];
            delete invoice['base'];
            delete invoice['units'];

            data.invoices.push(invoice);
        }
    });

    json = JSON.stringify(data);

    fs.writeFile(jsonFile, json, 'utf8', (err) => {
        if (err) {
            console.log('File write failed: ', err);
        }
    });


});


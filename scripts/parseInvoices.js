const fs = require('fs');
const { exit } = require('process');
const helper = require('./helpers/parseHelper');

const file = "scripts/database/invoice.db";
const jsonFile = "scripts/json_files/invoices.json";

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

const fieldsConcept = {
    concept: "concept",
    base: "base",
    units: "units",
    official: "official"
};

var invoicesArray = [];


fs.readFile(file, 'utf8', (err, jsonString) => {
    if (err) {
        console.log('File read failed: ', err);
    }

    jsonString = jsonString.replace(/}}/gi, '}}#')
    var invoices = jsonString.split('#');

    invoices.forEach(invoice => {

        if (invoice) {

            for (var field in fields) {
                invoice = invoice.replace(field, fields[field]);
            };
            
            invoice = JSON.parse(invoice);

            var year = helper.getYear(invoice.timestamp);

            invoice.date = helper.formatDate(invoice.timestamp);
            invoice.year = year;
            invoice.created_at = helper.formatDate(invoice.created_at.$$date);
            invoice.updated_at = helper.formatDate(invoice.updated_at.$$date);
            invoice.invoice_id = parseInt(invoice.invoice_id);

            var concept = {};

            for (var field in fieldsConcept) {
                concept[fieldsConcept[field]] = invoice[field] ?? null;
            }

            concept['official'] = true;

            if (!invoicesArray[year+invoice.invoice_id]) {
                delete invoice['timestamp'];
                delete invoice['concept'];
                delete invoice['base'];
                delete invoice['units'];

                invoice.concepts = [];
                invoicesArray[year+invoice.invoice_id] = invoice;
            }

            invoicesArray[year+invoice.invoice_id].concepts.push(concept);
        }
    });

    invoicesArray = helper.cleanArray(invoicesArray);
    json = JSON.stringify(invoicesArray);

    fs.writeFile(jsonFile, json, 'utf8', (err) => {
        if (err) {
            console.log('File write failed: ', err);
        } else {
            console.log('File write OK');
        }
    });

});


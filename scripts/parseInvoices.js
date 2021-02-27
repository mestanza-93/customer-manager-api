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

var data = {
    invoices: []
};
var dataProduct = {
    products: []
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

            var insertInvoice = false;

            for (var field in fields) {
                invoice = invoice.replace(field, fields[field]);
            };
            
            invoice = JSON.parse(invoice);

            var year = helper.getYear(invoice.timestamp);

            if (!invoicesArray[year+invoice.invoice_id]) {
                invoicesArray[year+invoice.invoice_id] = invoice._id;
                insertInvoice = true;
            }

            invoice.date = helper.formatDate(invoice.timestamp);

            invoice.created_at = helper.formatDate(invoice.created_at.$$date);
            invoice.updated_at = helper.formatDate(invoice.updated_at.$$date);

            var product = {};
            for (var field in fieldsProduct) {
                product[fieldsProduct[field]] = invoice[field] ?? null;
            }

            product['relation_id'] = invoicesArray[year+invoice.invoice_id];
            product['official'] = true;

            if (insertInvoice) {
                
                delete invoice['timestamp'];
                delete invoice['concept'];
                delete invoice['base'];
                delete invoice['units'];

                data.invoices.push(invoice);
   
            }

            dataProduct.products.push(product);
        }
    });

    json = JSON.stringify(data);
    jsonProducts = JSON.stringify(dataProduct);

    fs.writeFile(jsonFile, json, 'utf8', (err) => {
        if (err) {
            console.log('File write failed: ', err);
        }
    });
    
    fs.writeFile(productFile, jsonProducts, 'utf8', (err) => {
        if (err) {
            console.log('File write failed: ', err);
        }
    });


});


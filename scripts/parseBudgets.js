const fs = require('fs');
const helper = require('./helpers/parseHelper');

const file = "scripts/database/budget.db";
const jsonFile = "scripts/json_files/budgets.json";

const fields = {
    _id: '_id',
    id_budget: 'budget_id',
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

var budgetsArray = [];


fs.readFile(file, 'utf8', (err, jsonString) => {
    if (err) {
        console.log('File read failed: ', err);
    }

    jsonString = jsonString.replace(/}}/gi, '}}#')
    var budgets = jsonString.split('#');

    budgets.forEach(budget => {

        if (budget) {

            for (var field in fields) {
                budget = budget.replace(field, fields[field]);
            };
            
            budget = JSON.parse(budget);

            var year = helper.getYear(budget.timestamp);

            budget.date = helper.formatDate(budget.timestamp);
            budget.year = year;
            budget.created_at = helper.formatDate(budget.created_at.$$date);
            budget.updated_at = helper.formatDate(budget.updated_at.$$date);

            var concept = {};

            for (var field in fieldsConcept) {
                concept[fieldsConcept[field]] = budget[field] ?? null;
            }

            concept['official'] = true;

            if (!budgetsArray[year+budget.budget_id]) {
                delete budget['timestamp'];
                delete budget['concept'];
                delete budget['base'];
                delete budget['units'];

                budget.concepts = [];
                budgetsArray[year+budget.budget_id] = budget;
            }

            budgetsArray[year+budget.budget_id].concepts.push(concept);
        }
    });

    budgetsArray = helper.cleanArray(budgetsArray);
    json = JSON.stringify(budgetsArray);

    fs.writeFile(jsonFile, json, 'utf8', (err) => {
        if (err) {
            console.log('File write failed: ', err);
        } else {
            console.log('File write OK');
        }
    });

});


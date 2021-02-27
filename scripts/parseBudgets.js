const fs = require('fs');
const helper = require('./helpers/parseHelper');

const file = "scripts/database/budget.db";
const jsonFile = "scripts/json_files/budgets.json";
const conceptFile = "scripts/json_files/budget_concepts.json";

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
    official: "official",
    relation_id: "relation_id"
};

var data = {
    budgets: []
};
var dataConcept = {
    concepts: []
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

            var insertBudget = false;

            for (var field in fields) {
                budget = budget.replace(field, fields[field]);
            };
            
            budget = JSON.parse(budget);

            var year = helper.getYear(budget.timestamp);

            if (!budgetsArray[year+budget.budget_id]) {
                budgetsArray[year+budget.budget_id] = budget._id;
                insertBudget = true;
            }

            budget.date = helper.formatDate(budget.timestamp);

            budget.created_at = helper.formatDate(budget.created_at.$$date);
            budget.updated_at = helper.formatDate(budget.updated_at.$$date);

            var concept = {};
            for (var field in fieldsConcept) {
                concept[fieldsConcept[field]] = budget[field] ?? null;
            }

            concept['relation_id'] = budgetsArray[year+budget.budget_id];
            concept['official'] = false;

            if (insertBudget) {
                
                delete budget['timestamp'];
                delete budget['concept'];
                delete budget['base'];
                delete budget['units'];

                data.budgets.push(budget);
   
            }

            dataConcept.concepts.push(concept);
        }
    });

    json = JSON.stringify(data);
    jsonConcepts = JSON.stringify(dataConcept);

    fs.writeFile(jsonFile, json, 'utf8', (err) => {
        if (err) {
            console.log('File write failed: ', err);
        }
    });
    
    fs.writeFile(conceptFile, jsonConcepts, 'utf8', (err) => {
        if (err) {
            console.log('File write failed: ', err);
        }
    });


});


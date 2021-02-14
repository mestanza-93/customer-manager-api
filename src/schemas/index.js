const { SchemaComposer } = require('graphql-compose');

const schemaComposer = new SchemaComposer();

const { BudgetQuery, BudgetMutation } = require ('./Budget');
const { CustomerQuery, CustomerMutation } = require ('./Customer');
const { InvoiceQuery, InvoiceMutation } = require ('./Invoice');
const { ProductQuery, ProductMutation } = require ('./Product');
const { UserQuery, UserMutation } = require ('./User');
const { WorkQuery, WorkMutation } = require ('./Work');

schemaComposer.Query.addFields({
    ...BudgetQuery,
    ...CustomerQuery,
    ...InvoiceQuery,
    ...ProductQuery,
    ...UserQuery,
    ...WorkQuery,
});

schemaComposer.Mutation.addFields({
    ...BudgetMutation,
    ...CustomerMutation,
    ...InvoiceMutation,
    ...ProductMutation,
    ...UserMutation,
    ...WorkMutation,
});

module.exports = schemaComposer.buildSchema();
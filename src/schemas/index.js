const { SchemaComposer } = require('graphql-compose');

const schemaComposer = new SchemaComposer();

const { BudgetQuery, BudgetMutation } = require ('./Budget');
const { CustomerQuery, CustomerMutation } = require ('./Customer');
const { InvoiceQuery, InvoiceMutation } = require ('./Invoice');
const { ProformInvoiceQuery, ProformInvoiceMutation } = require ('./ProformInvoice');
const { ConceptQuery, ConceptMutation } = require ('./Concept');
const { UserQuery, UserMutation } = require ('./User');
const { WorkQuery, WorkMutation } = require ('./Work');

schemaComposer.Query.addFields({
    ...BudgetQuery,
    ...CustomerQuery,
    ...InvoiceQuery,
    ...ProformInvoiceQuery,
    ...ConceptQuery,
    ...UserQuery,
    ...WorkQuery,
});

schemaComposer.Mutation.addFields({
    ...BudgetMutation,
    ...CustomerMutation,
    ...InvoiceMutation,
    ...ProformInvoiceMutation,
    ...ConceptMutation,
    ...UserMutation,
    ...WorkMutation,
});

module.exports = schemaComposer.buildSchema();
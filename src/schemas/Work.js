const constants = require("../../constants");
const path = require("path");
const { WorkTC, WorkSchema } = require(path.join(
  constants.MODELS_PATH,
  "Work"
));


WorkTC.addResolver({
  name: "create",
  kind: "mutation",
  type: WorkTC.getResolver("createOne").getType(),
  args: WorkTC.getResolver("createOne").getArgs(),
  resolve: async ({ source, args, context, info }) => {
    const Work = await WorkSchema.create(args.record);

    return {
      record: Work,
      recordId: WorkTC.getRecordIdFn()(Work),
    };
  },
});

const WorkQuery = {
  WorkById: WorkTC.getResolver("findById"),
  WorkByIds: WorkTC.getResolver("findByIds"),
  WorkOne: WorkTC.getResolver("findOne"),
  WorkMany: WorkTC.getResolver("findMany"),
  WorkCount: WorkTC.getResolver("count"),
  WorkConnection: WorkTC.getResolver("connection"),
  WorkPagination: WorkTC.getResolver("pagination"),
};

const WorkMutation = {
  WorkWithFile: WorkTC.getResolver("create"),
  WorkCreateOne: WorkTC.getResolver("createOne"),
  WorkCreateMany: WorkTC.getResolver("createMany"),
  WorkUpdateById: WorkTC.getResolver("updateById"),
  WorkUpdateOne: WorkTC.getResolver("updateOne"),
  WorkUpdateMany: WorkTC.getResolver("updateMany"),
  WorkRemoveById: WorkTC.getResolver("removeById"),
  WorkRemoveOne: WorkTC.getResolver("removeOne"),
  WorkRemoveMany: WorkTC.getResolver("removeMany"),
};

module.exports = { WorkQuery: WorkQuery, WorkMutation: WorkMutation };

const { CustomerQuery } = require(path.join(
  constants.SCHEMAS_PATH,
  "Customer"
));

WorkTC.addRelation('customer', {
  resolver: () => CustomerQuery.CustomerById,
  prepareArgs: {
    _id: (source) => source.customer_id,
  },
  projection: { customer_id: true },
});

const { InvoiceQuery } = require(path.join(
  constants.SCHEMAS_PATH,
  "Invoice"
));

WorkTC.addRelation('invoices', {
  resolver: () => InvoiceQuery.InvoiceMany,
  prepareArgs: {
    filter: (source) => ({
      _operators : { 
        work_id : { in: source._id },
      }
    }),
  },
  projection: { _id: true },
});


const { BudgetQuery } = require(path.join(
  constants.SCHEMAS_PATH,
  "Budget"
));

WorkTC.addRelation('budgets', {
  resolver: () => BudgetQuery.BudgetMany,
  prepareArgs: {
    filter: (source) => ({
      _operators : { 
        work_id : { in: source._id },
      }
    }),
  },
  projection: { _id: true },
});
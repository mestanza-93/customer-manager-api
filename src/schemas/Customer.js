const constants = require("../../constants");
const path = require("path");
const { CustomerTC, CustomerSchema } = require(path.join(
  constants.MODELS_PATH,
  "Customer"
));

CustomerTC.addResolver({
  name: "create",
  kind: "mutation",
  type: CustomerTC.getResolver("createOne").getType(),
  args: CustomerTC.getResolver("createOne").getArgs(),
  resolve: async ({ source, args, context, info }) => {
    const Customer = await CustomerSchema.create(args.record);

    return {
      record: Customer,
      recordId: CustomerTC.getRecordIdFn()(Customer),
    };
  },
});

const CustomerQuery = {
  CustomerById: CustomerTC.getResolver("findById"),
  CustomerByIds: CustomerTC.getResolver("findByIds"),
  CustomerOne: CustomerTC.getResolver("findOne"),
  CustomerMany: CustomerTC.getResolver("findMany"),
  CustomerCount: CustomerTC.getResolver("count"),
  CustomerConnection: CustomerTC.getResolver("connection"),
  CustomerPagination: CustomerTC.getResolver("pagination"),
};

const CustomerMutation = {
  CustomerWithFile: CustomerTC.getResolver("create"),
  CustomerCreateOne: CustomerTC.getResolver("createOne"),
  CustomerCreateMany: CustomerTC.getResolver("createMany"),
  CustomerUpdateById: CustomerTC.getResolver("updateById"),
  CustomerUpdateOne: CustomerTC.getResolver("updateOne"),
  CustomerUpdateMany: CustomerTC.getResolver("updateMany"),
  CustomerRemoveById: CustomerTC.getResolver("removeById"),
  CustomerRemoveOne: CustomerTC.getResolver("removeOne"),
  CustomerRemoveMany: CustomerTC.getResolver("removeMany"),
};

module.exports = { CustomerQuery: CustomerQuery, CustomerMutation: CustomerMutation };

const { WorkQuery } = require(path.join(
  constants.SCHEMAS_PATH,
  "Work"
));

CustomerTC.addRelation('works', {
  resolver: () => WorkQuery.WorkMany,
  prepareArgs: {
    filter: (source) => ({
      _operators : { 
        customer_id : { in: source._id },
      }
    }),
    sort: 'DATE_DESC'
  },
  projection: { _id: true },
});
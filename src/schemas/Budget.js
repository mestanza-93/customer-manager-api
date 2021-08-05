const constants = require("../../constants");
const path = require("path");
const { BudgetTC, BudgetSchema } = require(path.join(
  constants.MODELS_PATH,
  "Budget"
));

BudgetTC.addResolver({
  name: "create",
  kind: "mutation",
  type: BudgetTC.getResolver("createOne").getType(),
  args: BudgetTC.getResolver("createOne").getArgs(),
  resolve: async ({ source, args, context, info }) => {
    const Budget = await BudgetSchema.create(args.record);

    return {
      record: Budget,
      recordId: BudgetTC.getRecordIdFn()(Budget),
    };
  },
});

const BudgetQuery = {
  BudgetById: BudgetTC.getResolver("findById"),
  BudgetByIds: BudgetTC.getResolver("findByIds"),
  BudgetOne: BudgetTC.getResolver("findOne"),
  BudgetMany: BudgetTC.getResolver("findMany"),
  BudgetCount: BudgetTC.getResolver("count"),
  BudgetConnection: BudgetTC.getResolver("connection"),
  BudgetPagination: BudgetTC.getResolver("pagination"),
};

const BudgetMutation = {
  BudgetWithFile: BudgetTC.getResolver("create"),
  BudgetCreateOne: BudgetTC.getResolver("createOne"),
  BudgetCreateMany: BudgetTC.getResolver("createMany"),
  BudgetUpdateById: BudgetTC.getResolver("updateById"),
  BudgetUpdateOne: BudgetTC.getResolver("updateOne"),
  BudgetUpdateMany: BudgetTC.getResolver("updateMany"),
  BudgetRemoveById: BudgetTC.getResolver("removeById"),
  BudgetRemoveOne: BudgetTC.getResolver("removeOne"),
  BudgetRemoveMany: BudgetTC.getResolver("removeMany"),
};

module.exports = { BudgetQuery: BudgetQuery, BudgetMutation: BudgetMutation };

const { WorkQuery } = require(path.join(
  constants.SCHEMAS_PATH,
  "Work"
));

BudgetTC.addRelation('work', {
  resolver: () => WorkQuery.WorkById,
  prepareArgs: {
    _id: (source) => source.work_id,
  },
  projection: { work_id: true },
});

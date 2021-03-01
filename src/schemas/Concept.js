const constants = require("../../constants");
const path = require("path");
const { ConceptTC, ConceptSchema } = require(path.join(
  constants.MODELS_PATH,
  "Concept"
));

ConceptTC.addResolver({
  name: "create",
  kind: "mutation",
  type: ConceptTC.getResolver("createOne").getType(),
  args: ConceptTC.getResolver("createOne").getArgs(),
  resolve: async ({ source, args, context, info }) => {
    const Concept = await ConceptSchema.create(args.record);

    return {
      record: Concept,
      recordId: ConceptTC.getRecordIdFn()(Concept),
    };
  },
});

const ConceptQuery = {
  ConceptById: ConceptTC.getResolver("findById"),
  ConceptByIds: ConceptTC.getResolver("findByIds"),
  ConceptOne: ConceptTC.getResolver("findOne"),
  ConceptMany: ConceptTC.getResolver("findMany"),
  ConceptCount: ConceptTC.getResolver("count"),
  ConceptConnection: ConceptTC.getResolver("connection"),
  ConceptPagination: ConceptTC.getResolver("pagination"),
};

const ConceptMutation = {
  ConceptWithFile: ConceptTC.getResolver("create"),
  ConceptCreateOne: ConceptTC.getResolver("createOne"),
  ConceptCreateMany: ConceptTC.getResolver("createMany"),
  ConceptUpdateById: ConceptTC.getResolver("updateById"),
  ConceptUpdateOne: ConceptTC.getResolver("updateOne"),
  ConceptUpdateMany: ConceptTC.getResolver("updateMany"),
  ConceptRemoveById: ConceptTC.getResolver("removeById"),
  ConceptRemoveOne: ConceptTC.getResolver("removeOne"),
  ConceptRemoveMany: ConceptTC.getResolver("removeMany"),
};

module.exports = { ConceptQuery: ConceptQuery, ConceptMutation: ConceptMutation };

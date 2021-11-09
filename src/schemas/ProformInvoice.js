const constants = require("../../constants");
const path = require("path");
const { ProformInvoiceTC, ProformInvoiceSchema } = require(path.join(
  constants.MODELS_PATH,
  "ProformInvoice"
));

ProformInvoiceTC.addResolver({
  name: "create",
  kind: "mutation",
  type: ProformInvoiceTC.getResolver("createOne").getType(),
  args: ProformInvoiceTC.getResolver("createOne").getArgs(),
  resolve: async ({ source, args, context, info }) => {
    const ProformInvoice = await ProformInvoiceSchema.create(args.record);

    return {
      record: ProformInvoice,
      recordId: ProformInvoiceTC.getRecordIdFn()(ProformInvoice),
    };
  },
});

const ProformInvoiceQuery = {
  ProformInvoiceById: ProformInvoiceTC.getResolver("findById"),
  ProformInvoiceByIds: ProformInvoiceTC.getResolver("findByIds"),
  ProformInvoiceOne: ProformInvoiceTC.getResolver("findOne"),
  ProformInvoiceMany: ProformInvoiceTC.getResolver("findMany"),
  ProformInvoiceCount: ProformInvoiceTC.getResolver("count"),
  ProformInvoiceConnection: ProformInvoiceTC.getResolver("connection"),
  ProformInvoicePagination: ProformInvoiceTC.getResolver("pagination"),
};

const ProformInvoiceMutation = {
  ProformInvoiceWithFile: ProformInvoiceTC.getResolver("create"),
  ProformInvoiceCreateOne: ProformInvoiceTC.getResolver("createOne"),
  ProformInvoiceCreateMany: ProformInvoiceTC.getResolver("createMany"),
  ProformInvoiceUpdateById: ProformInvoiceTC.getResolver("updateById"),
  ProformInvoiceUpdateOne: ProformInvoiceTC.getResolver("updateOne"),
  ProformInvoiceUpdateMany: ProformInvoiceTC.getResolver("updateMany"),
  ProformInvoiceRemoveById: ProformInvoiceTC.getResolver("removeById"),
  ProformInvoiceRemoveOne: ProformInvoiceTC.getResolver("removeOne"),
  ProformInvoiceRemoveMany: ProformInvoiceTC.getResolver("removeMany"),
};

module.exports = { ProformInvoiceQuery: ProformInvoiceQuery, ProformInvoiceMutation: ProformInvoiceMutation };

const { WorkQuery } = require(path.join(
  constants.SCHEMAS_PATH,
  "Work"
));

ProformInvoiceTC.addRelation('work', {
  resolver: () => WorkQuery.WorkById,
  prepareArgs: {
    _id: (source) => source.work_id,
  },
  projection: { work_id: true },
});
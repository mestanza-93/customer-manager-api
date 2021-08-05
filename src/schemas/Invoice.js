const constants = require("../../constants");
const path = require("path");
const { InvoiceTC, InvoiceSchema } = require(path.join(
  constants.MODELS_PATH,
  "Invoice"
));

InvoiceTC.addResolver({
  name: "create",
  kind: "mutation",
  type: InvoiceTC.getResolver("createOne").getType(),
  args: InvoiceTC.getResolver("createOne").getArgs(),
  resolve: async ({ source, args, context, info }) => {
    const Invoice = await InvoiceSchema.create(args.record);

    return {
      record: Invoice,
      recordId: InvoiceTC.getRecordIdFn()(Invoice),
    };
  },
});

const InvoiceQuery = {
  InvoiceById: InvoiceTC.getResolver("findById"),
  InvoiceByIds: InvoiceTC.getResolver("findByIds"),
  InvoiceOne: InvoiceTC.getResolver("findOne"),
  InvoiceMany: InvoiceTC.getResolver("findMany"),
  InvoiceCount: InvoiceTC.getResolver("count"),
  InvoiceConnection: InvoiceTC.getResolver("connection"),
  InvoicePagination: InvoiceTC.getResolver("pagination"),
};

const InvoiceMutation = {
  InvoiceWithFile: InvoiceTC.getResolver("create"),
  InvoiceCreateOne: InvoiceTC.getResolver("createOne"),
  InvoiceCreateMany: InvoiceTC.getResolver("createMany"),
  InvoiceUpdateById: InvoiceTC.getResolver("updateById"),
  InvoiceUpdateOne: InvoiceTC.getResolver("updateOne"),
  InvoiceUpdateMany: InvoiceTC.getResolver("updateMany"),
  InvoiceRemoveById: InvoiceTC.getResolver("removeById"),
  InvoiceRemoveOne: InvoiceTC.getResolver("removeOne"),
  InvoiceRemoveMany: InvoiceTC.getResolver("removeMany"),
};

module.exports = { InvoiceQuery: InvoiceQuery, InvoiceMutation: InvoiceMutation };

const { WorkQuery } = require(path.join(
  constants.SCHEMAS_PATH,
  "Work"
));

InvoiceTC.addRelation('work', {
  resolver: () => WorkQuery.WorkById,
  prepareArgs: {
    _id: (source) => source.work_id,
  },
  projection: { work_id: true },
});
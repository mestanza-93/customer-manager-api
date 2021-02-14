const constants = require("../../constants");
const path = require("path");
const { ProductTC, ProductSchema } = require(path.join(
  constants.MODELS_PATH,
  "Product"
));

ProductTC.addResolver({
  name: "create",
  kind: "mutation",
  type: ProductTC.getResolver("createOne").getType(),
  args: ProductTC.getResolver("createOne").getArgs(),
  resolve: async ({ source, args, context, info }) => {
    const Product = await ProductSchema.create(args.record);

    return {
      record: Product,
      recordId: ProductTC.getRecordIdFn()(Product),
    };
  },
});

const ProductQuery = {
  ProductById: ProductTC.getResolver("findById"),
  ProductByIds: ProductTC.getResolver("findByIds"),
  ProductOne: ProductTC.getResolver("findOne"),
  ProductMany: ProductTC.getResolver("findMany"),
  ProductCount: ProductTC.getResolver("count"),
  ProductConnection: ProductTC.getResolver("connection"),
  ProductPagination: ProductTC.getResolver("pagination"),
};

const ProductMutation = {
  ProductWithFile: ProductTC.getResolver("create"),
  ProductCreateOne: ProductTC.getResolver("createOne"),
  ProductCreateMany: ProductTC.getResolver("createMany"),
  ProductUpdateById: ProductTC.getResolver("updateById"),
  ProductUpdateOne: ProductTC.getResolver("updateOne"),
  ProductUpdateMany: ProductTC.getResolver("updateMany"),
  ProductRemoveById: ProductTC.getResolver("removeById"),
  ProductRemoveOne: ProductTC.getResolver("removeOne"),
  ProductRemoveMany: ProductTC.getResolver("removeMany"),
};

module.exports = { ProductQuery: ProductQuery, ProductMutation: ProductMutation };

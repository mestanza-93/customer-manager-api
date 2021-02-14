const constants = require("../../constants");
const path = require("path");
const { UserTC, UserSchema } = require(path.join(
  constants.MODELS_PATH,
  "User"
));

UserTC.addResolver({
  name: "create",
  kind: "mutation",
  type: UserTC.getResolver("createOne").getType(),
  args: UserTC.getResolver("createOne").getArgs(),
  resolve: async ({ source, args, context, info }) => {
    const User = await UserSchema.create(args.record);

    return {
      record: User,
      recordId: UserTC.getRecordIdFn()(User),
    };
  },
});

const UserQuery = {
  UserById: UserTC.getResolver("findById"),
  UserByIds: UserTC.getResolver("findByIds"),
  UserOne: UserTC.getResolver("findOne"),
  UserMany: UserTC.getResolver("findMany"),
  UserCount: UserTC.getResolver("count"),
  UserConnection: UserTC.getResolver("connection"),
  UserPagination: UserTC.getResolver("pagination"),
};

const UserMutation = {
  UserWithFile: UserTC.getResolver("create"),
  UserCreateOne: UserTC.getResolver("createOne"),
  UserCreateMany: UserTC.getResolver("createMany"),
  UserUpdateById: UserTC.getResolver("updateById"),
  UserUpdateOne: UserTC.getResolver("updateOne"),
  UserUpdateMany: UserTC.getResolver("updateMany"),
  UserRemoveById: UserTC.getResolver("removeById"),
  UserRemoveOne: UserTC.getResolver("removeOne"),
  UserRemoveMany: UserTC.getResolver("removeMany"),
};

module.exports = { UserQuery: UserQuery, UserMutation: UserMutation };

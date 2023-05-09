const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const OwnedItemSchema = new mongoose.Schema(
  {
    item: { type: ObjectId, ref: "Item", required: true },
    purchaseDate: { type: Date, required: true },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    match: /^[A-Za-z0-9]+$/,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return (
          v.length >= 8 && /[A-Z]/.test(v) && /[a-z]/.test(v) && /[0-9]/.test(v)
        );
      },
      message: (props) =>
        `Password ${
          props.value.length < 8
            ? "is too short."
            : "must contain at least one uppercase letter, one lowercase letter, and one digit."
        }`,
    },
  },
  image: {
    type: String,
    required: true,
    default: "https://fc55955.blob.core.windows.net/psi013/default.webp",
  },
  following: { type: [ObjectId], ref: "User", default: [] },
  followers: { type: [ObjectId], ref: "User", default: [] },
  library: { type: [OwnedItemSchema], default: [] },
  wishlist: { type: [ObjectId], ref: "Item", default: [] },
});

UserSchema.set("toJSON", {
  transform: function (_doc, ret, _options) {
    delete ret._id;
    delete ret.__v;
  },
});

const OwnedItem = mongoose.model("OwnedItem", OwnedItemSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { User, OwnedItem };

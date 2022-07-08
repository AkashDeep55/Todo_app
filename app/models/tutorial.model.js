const { isValidObjectId } = require("mongoose");
const { stringify } = require("uuid");

const mongoose = require("./user.model")

module.exports = mongoose => {
  const tutorialSchema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
      isComplete: Boolean,
      assignedTo: { type: String, unique: false },

      priority: { type: Number, min: 1, max: 4 },

    },
    { timestamps: true }
  );

  tutorialSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })


  const Tutorial = mongoose.model("Tutorial", tutorialSchema);
  return Tutorial;
};

const { stringify } = require("uuid");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
      isComplete: Boolean,
      assignedTo:{ firstName:String,
      lastName: String,
      Gender: String,
      Age: {type: Number,min:15,max:25}
      },
      priority: {type : Number, min:1, max:4} 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};

const { Schema } = require("mongoose");

module.exports = mongoose => {
    const userSchema = mongoose.Schema(

        {
            name: {
                firstName: String, lastName: String,

            },
            email: {
                type: String,
                required: true,
                unique: true
            },

            password: Number,
            gender: String,
            aadharNumber: { type: Number},
            nationality: String,
            state: String,
            district: String,
            zipCode: { type: Number, max: 6 },
            tutorials:[{type: mongoose.Schema.Types.ObjectId, ref:"Tutorial"}]
        

        },

        {
            timestamps: true,


        },



    );


    userSchema.method("tojson", function () {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object;
    })

    const User = mongoose.model("User", userSchema)

    return User;

}


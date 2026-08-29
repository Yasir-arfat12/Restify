const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    password:{
        type:String,
        required:true,
        minlength:6
    },

    role:{
        type:String,
        enum:["admin","owner","customer"],
        default:"customer"
    }

},
{
    timestamps:true
});

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.matchPassword = async function(password){

    return await bcrypt.compare(password,this.password);

};

module.exports = mongoose.model("User",userSchema);
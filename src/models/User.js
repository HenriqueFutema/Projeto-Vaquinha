const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    image: {
        type: [String],
        require: false
    },
    password: {
        type: String,
        require: true
    },
});

UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        console.log("asas");

        return next();
    }

    this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
    compareHash(password) {
        return bcrypt.compare(password, this.password);
    }
};

UserSchema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.ttl
        });
    }
};

module.exports = mongoose.model("User", UserSchema);
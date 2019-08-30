const User = require("../models/User");


module.exports = {
    async store(req, res) {
        const user = await User.create(req.body)

        return res.status(200).json(user);
    },

    async show(req, res) {
        const user = await User.findById(req.params.id).populate(["chat"]);

        return res.status(200).json(user);
    }
};
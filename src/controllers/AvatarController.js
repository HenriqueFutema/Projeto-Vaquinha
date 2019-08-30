const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const User = require('../models/User')

module.exports = {

    async store(req, res) {

        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" })
        }

        const { filename: image } = req.file


        const [name] = image.split('.')
        const fileName = `${name}.jpg`


        await sharp(req.file.path)
            .resize(300)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        fs.unlinkSync(req.file.path)

        user.image.push(fileName)

        return res.json(user)
    }

}
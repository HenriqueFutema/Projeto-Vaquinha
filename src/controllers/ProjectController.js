const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const Project = require("../models/Project");

module.exports = {
    async index(req, res) {
        const projects = await Project.paginate({}, {
            page: req.query.page || 1,
            limit: 20,
            populate: ["creator"],
            sort: "-createdAt"
        });

        return res.status(200).json(projects);
    },

    async show(req, res) {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ error: "Projeto não encontrado" });
        }

        return res.status(200).json(project);
    },

    async showByCreator(req, res) {
        const projects = await Project.find({ creator: req.params.id });

        if (!projects) {
            return res.json({ error: "Sem Projetos" });
        }

        return res.status(200).json(projects);
    },

    async store(req, res) {
        const { nameProject, description, hashtags } = req.body;

        if (req.file) {
            const { filename: image } = req.file;

            const [name] = image.split(".");
            const fileName = `${name}.jpg`;

            await sharp(req.file.path)
                .resize(300)
                .jpeg({ quality: 70 })
                .toFile(path.resolve(req.file.destination, "resized", fileName));

            fs.unlinkSync(req.file.path);
            const project = await Project.create({
                doadores,
                DiaInit,
                VAtual,
                VFinal,
                title,
                description,
                plans,
                tags,
                creator: req.userId,
                images: fileName
            });
            return res.status(201).json(project);
        } else {
            const project = await Project.create({
                nameProject,
                description,
                creator: req.userId,
                images: fileName,
                hashtags
            });
            return res.status(201).json(project);
        }
    },

    async destroy(req, res) {
        const project = await Project.findByIdAndDelete(req.params.id);

        return res.status(200).json({ response: "Projeto deletado" });
    },

    async update(req, res) {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body);

        return res.status(200).json(project);
    }
};
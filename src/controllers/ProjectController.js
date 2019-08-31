const Project = require('../models/Project')

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

        const project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({ erro: "Projeto não encontrado" })
        }

        return res.status(200).json(project)

    },

    async store(req, res) {

        const project = await Project.create(req.body)

        return res.status(201).json(project);

    },

    async destroy(req, res) {

        const project = await Project.findByIdAndDelete(req.params.id)

        return res.status(200).json({ response: "Projeto deletado" })

    },

    async update(req, res) {

        const project = await Project.findByIdAndUpdate(req.params.id, req.body)

        return res.status(200).json(project)

    }


}
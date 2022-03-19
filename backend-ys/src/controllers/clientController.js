const clientService = require('../services/clientService')

class clientController {
    static async getAll(req, res) {
        try {
            const response = await clientService.getAll()
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async get(req, res) {
        try {
            const response = await clientService.get(req.params.id)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async create(req, res) {
        try {
            const response = await clientService.create(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async update(req, res) {
        try {
            const response = await clientService.update(req.params.id, req.body)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async remove(req, res) {
        try {
            const response = await clientService.remove(req.params.id)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }
    static async removeItemTrolley(req, res) {
        try {
            const response = await clientService.removeItemTrolley(
                req.body.trolley,
                req.body.article
            )
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }
    static async updateTrolley(req, res) {
        try {
            const response = await clientService.updateTrolley(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }
    static async addToTrolley(req, res) {
        try {
            const response = await clientService.addToTrolley(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }
}

module.exports = clientController
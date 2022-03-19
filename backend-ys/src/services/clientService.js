const Client = require('../models/client/clientModel')
const { clientDto } = require('./../models/client/DTOs/clientDto')
const { clientInputDto } = require('./../models/client/DTOs/clientInputDto')
const ObjectId = require('mongoose').Types.ObjectId
const { validationResult } = require('express-validator')
const Trolley = require('../models/trolley/trolleyModel')
const Article = require('../models/article/articleModel')
const bcryptjs = require('bcryptjs')

class ClientService {
    static getAll = async () => {
        const clients = await Client.find({ available: 1 })
        const response = clients.map((brand) => clientDto(brand))
        return {
            status: 200,
            content: {
                ok: true,
                response,
                amount: response.length,
            },
        }
    }
    static get = async (id) => {
        if (!ObjectId.isValid(id)) {
            return {
                status: 400,
                content: {
                    ok: false,
                    err: {
                        message: 'ID incorrect',
                    },
                },
            }
        }
        const client = await Client.findById(id)

        if (!client) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Client not found',
                    },
                },
            }
        }
        const input = clientDto(client)
        return {
            status: 200,
            content: { client: input },
        }
    }
    static create = async (req) => {
        const errores = validationResult(req)
        if (!errores.isEmpty()) {
            return {
                status: 400,
                content: { errores: errores.array() },
            }
        }
        const input = clientInputDto(req.body)
        const client = await Client.findOne({ email: input.email })
        if (client) {
            return {
                status: 400,
                content: { msg: 'The client already exists' },
            }
        }
        const newClient = new Client(input)

        // crea el nuevo carrito
        // const clienteTrolley = new Trolley()
        // await clienteTrolley.save()

        // newClient.trolley = clienteTrolley._id
        // Hashear el password
        const salt = await bcryptjs.genSalt(10)
        newClient.password = await bcryptjs.hash(input.password, salt)
        await newClient.save()
        return {
            status: 201,
            content: {
                ok: true,
                article: newClient,
                message: 'Client created successfully',
            },
        }
    }
    static update = async (id, body) => {
        if (!ObjectId.isValid(id)) {
            return {
                status: 400,
                content: {
                    ok: false,
                    err: {
                        message: 'ID incorrect',
                    },
                },
            }
        }
        const client = await Client.findByIdAndUpdate(id, body, { new: true })
        if (!client) {
            return {
                status: 404,
                content: {
                    ok: false,
                    message: `Item not found`,
                },
            }
        }
        return {
            status: 200,
            content: {
                ok: true,
                article: client,
                message: `The client ${client.name} was updated`,
            },
        }
    }
    static remove = async (id) => {
        if (!ObjectId.isValid(id)) {
            return {
                status: 400,
                content: {
                    ok: false,
                    err: {
                        message: 'ID incorrect',
                    },
                },
            }
        }
        const clientToDelete = await Client.findById(id)
        if (!clientToDelete) {
            return {
                status: 404,
                content: {
                    ok: false,
                    err: {
                        message: 'Client not found',
                    },
                },
            }
        }
        const client = await Client.findByIdAndUpdate(
            id,
            {
                available: !clientToDelete.available,
            },
            { new: true }
        )

        return {
            status: 200,
            content: {
                ok: true,
                message: `The client ${client.name} was ${
                    client.available === 0 ? 'removed' : 'put'
                }`,
            },
        }
    }
    // static removeItemTrolley = async (trolleyId, itemId) => {
    //     if (!ObjectId.isValid(trolleyId) && !ObjectId.isValid(itemId)) {
    //         return {
    //             status: 400,
    //             content: {
    //                 ok: false,
    //                 err: {
    //                     message: 'ID incorrect',
    //                 },
    //             },
    //         }
    //     }
    //     const trolley = await Trolley.findOneAndUpdate(
    //         {
    //             _id: trolleyId,
    //         },
    //         { $pull: { articles: itemId } }
    //     )
    //     if (!trolley) {
    //         return {
    //             status: 404,
    //             content: {
    //                 ok: false,
    //                 err: {
    //                     message: 'Trolley not found',
    //                 },
    //             },
    //         }
    //     }

    //     return {
    //         status: 200,
    //         content: {
    //             ok: true,
    //             message: `The trolley was updated`,
    //         },
    //     }
    // }
    // static updateTrolley = async (req) => {
    //     let client = req.body.client
    //     await Trolley.findByIdAndUpdate(
    //         { _id: client.trolley._id },
    //         { articles: [] }
    //     )
    //     return {
    //         status: 200,
    //         content: {
    //             ok: true,
    //             message: `The trolley was updated`,
    //         },
    //     }
    // }
    // static addToTrolley = async (req) => {
    //     console.log(req.body)
    //     await Trolley.findOneAndUpdate(
    //         {
    //             _id: req.body.client.trolley._id,
    //         },
    //         { $push: { articles: req.body.article.id } }
    //     )
    //     return {
    //         status: 200,
    //         content: {
    //             ok: true,
    //             message: `The trolley was updated`,
    //         },
    //     }
    // }
}
module.exports = ClientService

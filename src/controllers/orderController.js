import { response } from "express";
import Order from "../models/Order";
import OrderProduct from "../models/OrderProduct"
import usersController from "./usersController"

const get = async (req, res) => {
    try {
        let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        let user = await usersController.getUserByToken(req.headers.authorizantion);

        if (!user) {
            return res.status(200).send({
                type: 'error',
                message: 'Ocorreu um erro ao recuperar os seus dados'
            });
        };

        if (!id) {
            let orders = await Order.findAll({ where: { idUser: user.id } });
            let response = [];
            for (let order of orders) {
                let orderProduct = await order.getItems();
                order.items = orderProduct;
                response.push(order);
            }
            return res.status(200).send({
                type: 'success', // success, error, warning, info
                message: 'Registros recuperados com sucesso', // mensagem para o front exibir
                data: response // json com informações de resposta
            });
        }

        let order = await Order.findOne({
            where: {
                id
            },
            include: ['user', 'payment', 'status']
        });

        if (!order) {
            return res.status(400).send({
                type: 'error',
                message: `Não foi encontrado categoria com o ID ${id}`,
            });
        }
        return res.status(200).send(order);
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error
        });
    }
}

const persist = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id) {
            return await create(req.body, res)
        }

        return await update(id, req.body, res)
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error
        });
    }
}

const create = async (req, res) => {
    try {
        let user = await usersController.getUserByToken(req.headers.authorization);

        if (!user) {
            return res.status(200).send({
                type: 'error',
                message: 'Ocorreu um erro ao recuperar os seus dados'
            })
        }

        let { idUser, idPayment, idStatus, products, total } = req.body;

        let response = await Order.create({
            idUser : user.id,
            idPayment,
            idStatus,
        });

        for (const product of products) {
            await OrderProduct.create({
                idOrder: response.id,
                idProduct: products.idProducts,
                price: products.price,

            })
        }

        return res.status(200).send({
            type: 'success',
            message: `Categoria cadastrada com sucesso`,
            data: order
        });
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu algum erro!',
            data: error.message
        })
    }
}

const destroy = async (req, res) => {
    try {
        let { id } = req.body;
        id = id ? id.toString().replace(/\D/g, '') : null;
        if (!id) {
            return res.status(400).send({
                type: 'error',
                message: 'Informe um ID válido para deletar a categoria'
            });


        }
        let order = await Order.findOne({
            where: {
                id
            }
        });

        if (!order) {
            return res.status(200).send({
                type: 'error',
                message: `Não foi encontrado uma categoria com o ID ${id}`
            })
        }

        await order.destroy();
        return res.status(200).send({
            type: 'success',
            message: 'Categoria deleteada com sucesso',
            data: order
        })
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: error
        });
    }
}

export default {
    get,
    destroy,
    persist
}
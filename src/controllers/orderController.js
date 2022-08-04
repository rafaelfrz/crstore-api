import { response } from "express";
import Order from "../models/Order";
import OrderProduct from "../models/OrderProduct"
import Product from "../models/Product";
import usersController from "./usersController"

const get = async (req, res) => {
    try {
        let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        let user = await usersController.getUserByToken(req.headers.authorization);

        console.log(user)

        if (!user) {
            return res.status(200).send({
                type: 'error',
                message: 'Ocorreu um erro ao recuperar os seus dados'
            });
        };

        if (!id) {
            let orders = await Order.findAll({
                where: {
                    idUser: user.id
                },
                include: ['user', 'payment', 'status', 'address']
            });
            let response = [];
            for (let order of orders) {
                let orderProducts = await order.get();
                order = order.toJSON();
                order.items = orderProducts;
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
            data: error.message
        });
    }
}

const persist = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id) {
            return await create(req, res)
        }

        return await update(id, req, res)
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
            });
        }

        let { idPayment, idStatus, idAdress, products } = req.body;

        let response = await Order.create({
            idUser: user.id,
            idPayment,
            idStatus,
            idAdress,
            total: 0.00,
        });

        let total = 0;

        for (const product of products) {

            let productExists = await Product.findOne({
                where: { id: product.id }
            });

            if (!productExists) {
                await response.destroy();
                return res.send({
                    type: 'error',
                    message: 'Esse produto não existe!'
                })
            }

            let orderProduct = await OrderProduct.create({
                idOrder: response.id,
                idProduct: product.id,
                amount: product.amount,
                price: Number(productExists.price),
                total: Number(product.amount * productExists.price).toFixed(2)
            });
        }

        let orderProducts = await response.getProducts();
        let order = response.toJSON();
        order.products = orderProducts;

        return res.status(200).send({
            type: 'success',
            message: `Pedido cadastrado com sucesso`,
            data: order
        });
    } catch (error) {
        console.log(error);
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu algum erro!',
            data: error.message
        });
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
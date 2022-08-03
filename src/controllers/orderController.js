import Order from "../models/Order";

const get = async (req, res) => {
    try {
        let id = req.params;

        id = id ? id.toString().replace(/\D/g, '') : null;
        if (!id) {
            const response = await Order.findAll({
                order: [['id', 'ASC']],
                include: ['user', 'payment', 'status']
            });
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

const create = async (dados, res) => {
    let { idUser, idPayment, idStatus } = dados;

    // let addressExists = await Order.findOne({
    //     where: {
    //         name
    //     }
    // });

    // if (addressExists) {
    //     return res.status(200).send({
    //         type: 'error',
    //         message: `Já existe um endereço com esse CEP, ID ${addressExists.id}`
    //     })
    // }

    let order = await Order.create({
        idUser,
        idPayment,
        idStatus
    });
    return res.status(200).send({
        type: 'success',
        message: `Categoria cadastrada com sucesso`,
        data: order
    });
}

const update = async (id, dados, res) => {
    let order = await Order.findOne({
        where: {
            id
        }
    });

    if (!order) {
        return res.status(200).send({
            type: 'error',
            message: `Não foi encontrada categoria com o ID ${id}`
        })
    }

    Object.keys(dados).forEach(field => order[field] = dados[field]);

    await order.save();
    return res.status(200).send({
        type: 'success',
        message: `Categoria ${id} foi atualizada com sucesso`,
        data: order
    });
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
        return res.status(200).send ({
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
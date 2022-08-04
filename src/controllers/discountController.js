import Discount from "../models/Discount";

const get = async (req, res) => {
    try {
        let { id } = req.params;

        id = id ? id.toString().replace(/\D/g, '') : null;
        if (!id) {
            const response = await Discount.findAll({
                order: [['id', 'ASC']]
            });
            return res.status(200).send({
                type: 'success', // success, error, warning, info
                message: 'Registros recuperados com sucesso', // mensagem para o front exibir
                data: response // json com informações de resposta
            });
        }

        let user = await Discount.findOne({
            where: {
                id
            },
        });

        if (!user) {
            return res.status(400).send({
                type: 'error',
                message: `Não foi encontrado cupom de desconto com o ID ${id}`,
            });
        }
        return res.status(200).send(user);
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
            return await create(req.body, res)
        }

        return await update(id, req.body, res)
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}

const create = async (dados, res) => {
    try {
        let { discountType, discount, period, uses } = dados;

        let response = await Discount.create({
            discountType,
            discount,
            period,
            uses
        });

        return res.status(200).send({
            type: 'success',
            message: `Categoria cadastrada com sucesso`,
            data: response
        });
    } catch (error) {
        return res.status(200).send({
            type: 'success',
            message: `Ops! Ocorreu um erro!`,
            data: error.message
        })
    }
}

const update = async (id, dados, res) => {
    let discount = await Discount.findOne({
        where: {
            id
        }
    });

    if (!discount) {
        return res.status(200).send({
            type: 'error',
            message: `Não foi encontrada categoria com o ID ${id}`
        })
    }

    Object.keys(dados).forEach(field => discount[field] = dados[field]);

    await discount.save();
    return res.status(200).send({
        type: 'success',
        message: `Categoria ${id} foi atualizada com sucesso`,
        data: discount
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
        let discount = await Discount.findOne({
            where: {
                id
            }
        });

        if (!discount) {
            return res.status(200).send({
                type: 'error',
                message: `Não foi encontrado uma categoria com o ID ${id}`
            })
        }

        await discount.destroy();
        return res.status(200).send({
            type: 'success',
            message: 'Categoria deleteada com sucesso',
            data: discount
        })
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: error.message
        });
    }
}

export default {
    get,
    destroy,
    persist
}
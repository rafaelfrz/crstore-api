import Payment from "../models/Payment";

const get = async (req, res) => {
    try {
        let { id } = req.params;

        id = id ? id.toString().replace(/\D/g, '') : null;
        if (!id) {
            const response = await Payment.findAll({
                order: [['id', 'ASC']]
            });
            return res.status(200).send({
                type: 'success', // success, error, warning, info
                message: 'Registros recuperados com sucesso', // mensagem para o front exibir
                data: response // json com informações de resposta
            });
        }

        let payment = await Payment.findOne({
            where: {
                id
            },
        });

        if (!payment) {
            return res.status(400).send({
                type: 'error',
                message: `Não foi encontrado pagamento com o ID ${id}`,
            });
        }
        return res.status(200).send(payment);
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
    let { name } = dados;

    let paymentExists = await Payment.findOne({
        where: {
            name
        }
    });

    if (paymentExists) {
        return res.status(200).send({
            type: 'error',
            message: `Esse tipo de pagamento já está cadastrado, ID ${paymentExists.id}`
        })
    }

    let payment = await Payment.create({
        name        
    });
    return res.status(200).send({
        type: 'success',
        message: `Tipo de pagamento cadastrado com sucesso`,
        data: payment
    });
}

const update = async (id, dados, res) => {
    let payment = await Payment.findOne({
        where: {
            id
        }
    });

    if (!payment) {
        return res.status(200).send({
            type: 'error',
            message: `Não foi encontrada categoria com o ID ${id}`
        })
    }

    Object.keys(dados).forEach(field => payment[field] = dados[field]);

    await payment.save();
    return res.status(200).send({
        type: 'success',
        message: `Categoria ${id} foi atualizada com sucesso`,
        data: payment
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
        let payment = await Payment.findOne({
            where: {
                id
            }
        });

        if (!payment) {
            return res.status(200).send({
                type: 'error',
                message: `Não foi encontrado uma categoria com o ID ${id}`
            })
        }

        await payment.destroy();
        return res.status(200).send ({
            type: 'success',
            message: 'Categoria deleteada com sucesso',
            data: payment
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
import Status from "../models/Status";

const get = async (req, res) => {
    try {
        let { id } = req.params;

        id = id ? id.toString().replace(/\D/g, '') : null;
        if (!id) {
            const response = await Status.findAll({
                order: [['id', 'ASC']]
            });
            return res.status(200).send({
                type: 'success', // success, error, warning, info
                message: 'Registros recuperados com sucesso', // mensagem para o front exibir
                data: response // json com informações de resposta
            });
        }

        let user = await Status.findOne({
            where: {
                id
            },
        });

        if (!user) {
            return res.status(400).send({
                type: 'error',
                message: `Não foi encontrado categoria com o ID ${id}`,
            });
        }
        return res.status(200).send(user);
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
        let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        let user = await usersController.getUserByToken(req.headers.authorization);

        if (!user) {
            return res.status(200).send ({
                type: 'error',
                mesage: 'Ops! ocorreu um erro',
                data: error.message
            })
        }

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
    let { status } = dados;

    // let addressExists = await Status.findOne({
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

    let statuss = await Status.create({
        status
    });
    return res.status(200).send({
        type: 'success',
        message: `Categoria cadastrada com sucesso`,
        data: statuss
    });
}

const update = async (id, dados, res) => { 
    let status = await Status.findOne({
        where: {
            id
        }
    });

    if (!status) {
        return res.status(200).send({
            type: 'error',
            message: `Não foi encontrada categoria com o ID ${id}`
        })
    }

    Object.keys(dados).forEach(field => status[field] = dados[field]);

    await status.save();
    return res.status(200).send({
        type: 'success',
        message: `Categoria ${id} foi atualizada com sucesso`,
        data: status
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
        let status = await Status.findOne({
            where: {
                id
            }
        });

        if (!status) {
            return res.status(200).send({
                type: 'error',
                message: `Não foi encontrado uma categoria com o ID ${id}`
            })
        }

        await status.destroy();
        return res.status(200).send ({
            type: 'success',
            message: 'Categoria deleteada com sucesso',
            data: status
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
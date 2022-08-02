import Category from "../models/Category";

const get = async (req, res) => {
    try {
        let { id } = req.params;

        id = id ? id.toString().replace(/\D/g, '') : null;
        if (!id) {
            const response = await Category.findAll({
                order: [['id', 'ASC']]
            });
            return res.status(200).send({
                type: 'success', // success, error, warning, info
                message: 'Registros recuperados com sucesso', // mensagem para o front exibir
                data: response // json com informações de resposta
            });
        }

        let user = await Category.findOne({
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
    let { name } = dados;

    let categoryExists = await Category.findOne({
        where: {
            name
        }
    });

    if (categoryExists) {
        return res.status(200).send({
            type: 'error',
            message: `Já existe uma categoria com esse nome, ID ${categoryExists.id}`
        })
    }

    let category = await Category.create({
        name,
    });
    return res.status(200).send({
        type: 'success',
        message: `Categoria cadastrada com sucesso`,
        data: category
    });
}

const update = async (id, dados, res) => {
    let { nome } = dados;
    let category = await Category.findOne({
        where: {
            id
        }
    });

    if (!category) {
        return res.status(200).send({
            type: 'error',
            message: `Não foi encontrada categoria com o ID ${id}`
        })
    }

    Object.keys(dados).forEach(field => category[field] = dados[field]);

    await category.save();
    return res.status(200).send({
        type: 'success',
        message: `Categoria ${id} foi atualizada com sucesso`,
        data: category
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
        let category = await Category.findOne({
            where: {
                id
            }
        });

        if (!category) {
            return res.status(200).send({
                type: 'error',
                message: `Não foi encontrado uma categoria com o ID ${id}`
            })
        }

        await category.destroy();
        return res.status(200).send ({
            type: 'success',
            message: 'Categoria deleteada com sucesso',
            data: category
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
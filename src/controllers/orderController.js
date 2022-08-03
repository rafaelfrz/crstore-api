import Address from "../models/Address";

const get = async (req, res) => {
    try {
        let { id } = req.params;

        id = id ? id.toString().replace(/\D/g, '') : null;
        if (!id) {
            const response = await Address.findAll({
                order: [['id', 'ASC']]
            });
            return res.status(200).send({
                type: 'success', // success, error, warning, info
                message: 'Registros recuperados com sucesso', // mensagem para o front exibir
                data: response // json com informações de resposta
            });
        }

        let user = await Address.findOne({
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
    let { city, abbreviation, zip_code, street, idUser } = dados;

    // let addressExists = await Address.findOne({
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

    let address = await Address.create({
        city,
        abbreviation,
        zip_code,
        street,
        idUser
    });
    return res.status(200).send({
        type: 'success',
        message: `Categoria cadastrada com sucesso`,
        data: address
    });
}

const update = async (id, dados, res) => {
    let address = await Address.findOne({
        where: {
            id
        }
    });

    if (!address) {
        return res.status(200).send({
            type: 'error',
            message: `Não foi encontrada categoria com o ID ${id}`
        })
    }

    Object.keys(dados).forEach(field => address[field] = dados[field]);

    await address.save();
    return res.status(200).send({
        type: 'success',
        message: `Categoria ${id} foi atualizada com sucesso`,
        data: address
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
        let address = await Address.findOne({
            where: {
                id
            }
        });

        if (!address) {
            return res.status(200).send({
                type: 'error',
                message: `Não foi encontrado uma categoria com o ID ${id}`
            })
        }

        await address.destroy();
        return res.status(200).send ({
            type: 'success',
            message: 'Categoria deleteada com sucesso',
            data: address
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
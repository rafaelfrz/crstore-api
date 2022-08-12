import Address from "../models/Address";
import usersController from "./usersController";

const get = async (req, res) => {
    try {
	let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

	let user = await usersController.getUserByToken(req.headers.authorization);
	
	if(!user) {
		return res.status(200).send({
			type: 'error',
			message: 'Ocorreu um erro ao recuperar seus dados'
		})
	}    

        let response = await Address.findOne({ where: { id, idUser: user.id } });

        if (!response) {
            return res.status(200).send({
                type: 'error',
                message: `Não foi encontrado endereço com o ID ${id}`,
		data: []
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
        let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        let user = await usersController.getUserByToken(req.headers.authorization);

        if (!user) {
            return res.status(200).send({
                type: 'error',
                mesage: 'Esse usuário não existe!',
            })
        }

        if (!id) {

            console.log(`chegou`);
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
    let { city, disctrict, abbreviation, zipCode, street, idUser } = dados;

    let address = await Address.create({
        idUser,
        disctrict,
        city,
        abbreviation,
        zipCode,
        street,
    });
    return res.status(200).send({
        type: 'success',
        message: `Endereço cadastrado com sucesso`,
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
            message: `Não foi encontrado endereço com o ID ${id}`
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
        return res.status(200).send({
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

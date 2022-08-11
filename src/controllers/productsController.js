import Product from "../models/Product";

const get = async (req, res) => {
  try {
    let { id } = req.params;

    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      const response = await Product.findAll({
        order: [['id', 'ASC']],
        include: ['category']
      });
      return res.status(200).send({
        type: 'success', // success, error, warning, info
        message: 'Registros recuperados com sucesso', // mensagem para o front exibir
        data: response // json com informações de resposta
      });
    }

    let product = await Product.findOne({
      where: {
        id
      },
      include: ['category']
    });

    if (!product) {
      return res.status(400).send({
        type: 'error',
        message: `Não foi encontrado categoria com o ID ${id}`,
      });
    }
    return res.status(200).send(product);
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
      data: error.message
    });
  }
}

const create = async (dados, res) => {
  let { name, price, idCategory, description, imageLink } = dados;

  let productExists = await Product.findOne({
    where: {
      name,
    }
  });

  console.log(productExists);

  if (productExists) {
    return res.status(200).send({
      type: 'error',
      message: `Já existe um produto com esse nome, ID ${productExists.id}`
    })
  }

  let product = await Product.create({
    name,
    price,
    idCategory,
    description,
    imageLink
  });

  return res.status(200).send({
    type: 'success',
    message: `Produto cadastrado com sucesso`,
    data: product
  });
}

const update = async (id, dados, res) => {
  let product = await Product.findOne({
    where: {
      id
    }
  });

  if (!product) {
    return res.status(200).send({
      type: 'error',
      message: `Não foi encontrado produto com o ID ${id}`
    })
  }

  Object.keys(dados).forEach(field => product[field] = dados[field]);

  await product.save();
  return res.status(200).send({
    type: 'success',
    message: `Produto ${id} foi atualizada com sucesso`,
    data: product
  });
}

const destroy = async (req, res) => {
  try {
      let { id } = req.body;
      id = id ? id.toString().replace(/\D/g, '') : null;
      if (!id) {
          return res.status(200).send({
              type: 'error',
              message: 'Informe um ID válido para deletar o produto'
          });
      }
      let product = await Product.findOne({
          where: {
              id
          }
      });

      if (!product) {
          return res.status(200).send({
              type: 'error',
              message: `Não foi encontrado um produto com o ID ${id}`
          })
      }

      await product.destroy();
      return res.status(200).send ({
          type: 'success',
          message: 'Produto deletado com sucesso',
          data: product
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
  persist,
  destroy
}

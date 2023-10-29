import { Router } from 'express'
import { getRepository } from 'typeorm'
import { Product } from '../entities/Product'

export const productsRouter = Router();

productsRouter.post('/products', async (req, res) => {
    try {
        const { description, price, quantity } = req.body;

        if (!description || !price || !quantity) {
            return res.status(400).json({ message: 'Invalid inputs' });
        }

        const product = new Product();
        product.description = description;
        product.price = price;
        product.quantity = quantity;

        const productRepository = getRepository(Product);
        await productRepository.save(product);

        return res.status(201).json({ message: 'Product registered' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

productsRouter.get('/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const productRepository = getRepository(Product);
        const product = await productRepository.findOne({ where: { id } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ product });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

productsRouter.get('/products/description/:description', async (req, res) => {
    try {
        const description = req.params.description;
        const productRepository = getRepository(Product);
        const products = await productRepository.find({ where: { description } });

        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

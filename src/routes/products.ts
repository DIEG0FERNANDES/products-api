import { Router } from 'express'
// import { getRepository } from 'typeorm'
import { ProductController } from '../controllers/ProductController';
import { Product } from '../entities/Product'

export const productsRouter = Router();
const productCtrl = new ProductController

productsRouter.post('/products', async (req, res) => {
    try {
        const { description, price, quantity } = req.body;

        const errorMessages: string[] = []

        if (!description || !price || !quantity) {
            return res.status(400).json({ message: 'Invalid inputs' });
        }

        if (errorMessages.length === 0) {
            const product = new Product();
            product.description = description;
            product.price = price;
            product.quantity = quantity;
            const savedProduct = await productCtrl.createProduct(product)
            return res.status(201).json({ task: savedProduct, message: 'Product registered' })
        }

        // const product = new Product();
        // product.description = description;
        // product.price = price;
        // product.quantity = quantity;

        // const productRepository = getRepository(Product);
        // await productRepository.save(product);

        // return res.status(201).json({message: 'Product registered' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

productsRouter.get('/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // const productRepository = getRepository(Product);
        // const product = await productRepository.findOne({ where: { id } });
        const product = await productCtrl.getProductById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

productsRouter.get('/products/description/:description', async (req, res) => {
    try {
        const description = req.params.description;
        // const productRepository = getRepository(Product);
        // const products = await productRepository.find({ where: { description } });
        const products = await productCtrl.getProductsByDescription(description);

        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

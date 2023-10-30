import { Router } from 'express'
import { ProductController } from '../controllers/ProductController';
import { Product } from '../entities/Product'

export const productsRouter = Router();
const productCtrl = new ProductController

const errorMessages: string[] = []
productsRouter.post('/products', async (req, res) => {
    try {
        const { description, price, quantity } = req.body;


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

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

productsRouter.get('/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await productCtrl.getProductById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (errorMessages.length === 0) {
            return res.status(200).json({ product });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

productsRouter.get('/products/description/:description', async (req, res) => {
    try {
        const description = req.params.description;
        const products = await productCtrl.getProductsByDescription(description);

        if (errorMessages.length === 0) {
            return res.status(200).json({ products });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

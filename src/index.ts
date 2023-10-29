import { AppDataSource } from './data-source';
import { Product } from './entities/Product'; // Importe a entidade Product

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new product into the database..."); // Atualize a mensagem
    const product = new Product(); // Atualize para a entidade Product
    product.description = "Sample Product"; // Atualize com os valores apropriados
    product.price = 10.99;
    product.quantity = 100;
    await AppDataSource.manager.save(product);
    console.log("Saved a new product with id: " + product.id); // Atualize a mensagem

    console.log("Loading products from the database..."); // Atualize a mensagem
    const products = await AppDataSource.manager.find(Product); // Atualize para a entidade Product
    console.log("Loaded products: ", products);

    console.log("Here you can setup and run express / fastify / any other framework.");

}).catch(error => console.log(error));

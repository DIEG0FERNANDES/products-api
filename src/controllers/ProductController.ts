import { Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { AppDataSource } from '../data-source';

export class ProductController {
  private _repo: Repository<Product>;

  constructor() {
    this._repo = AppDataSource.getRepository(Product);
  }

  async createProduct(product: Product): Promise<Product> {
    const savedProduct = await this._repo.save(product);
    return savedProduct;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const product = await this._repo.findOne(id);
    return product;
  }

  async getProductsByDescription(description: string): Promise<Product[]> {
    const products = await this._repo.find({ where: { description } });
    return products;
  }
}
export default `import ProductRepository from '../repository/productRepository.js';
import ProductService from '../service/productService.js';

export default class ProductFactory {
  static getInstance() {
    const repository = new ProductRepository();
    const service = new ProductService({ repository });

    return service;
  }
}`;

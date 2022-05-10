import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";

const listProductsService = async () => {
  const productRepository = AppDataSource.getRepository(Product);

  const producList = await productRepository.find();

  return producList;
};

export default listProductsService;

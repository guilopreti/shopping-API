import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product.entity";

const listProductsService = async (querys?: any) => {
  const productRepository = AppDataSource.getRepository(Product);

  let producList = await productRepository.find();

  if (querys) {
    Object.keys(querys).forEach((element) => {
      element === "name"
        ? (producList = producList.filter(({ name }) => name === querys.name))
        : false;
      element === "description"
        ? (producList = producList.filter(
            ({ description }) => description === querys.description
          ))
        : false;
      element === "price"
        ? (producList = producList.filter(
            ({ price }) => price === Number(querys.price)
          ))
        : false;
    });
  }

  return producList;
};

export default listProductsService;

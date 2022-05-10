import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import { Product } from "../../entities/product.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { fixedFloat } from "../../utils";

const cartAddProdService = async (product_id: string, userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    throw new AppError(400, "User not found");
  }

  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOne({
    where: {
      id: user?.cart.id,
    },
  });

  const productRepository = AppDataSource.getRepository(Product);
  const product = await productRepository.findOne({
    where: {
      id: product_id,
    },
  });

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  if (cart && product) {
    if (cart.products.some(({ name }) => name === product.name)) {
      throw new AppError(409, "Product is already in the cart");
    }

    cart.products = [...cart.products, product];
    cart.subtotal = fixedFloat(cart.subtotal + product.price);

    await cartRepository.save(cart);

    return cart;
  }
};

export default cartAddProdService;

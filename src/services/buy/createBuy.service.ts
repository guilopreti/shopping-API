import { AppDataSource } from "../../data-source";
import { Buy } from "../../entities/buy.entity";
import { Cart } from "../../entities/cart.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const createBuyService = async (userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);
  const buyRepository = AppDataSource.getRepository(Buy);

  const user = await userRepository.findOne({
    where: {
      email: userEmail,
    },
  });

  const cart = await cartRepository.findOne({
    where: {
      id: user?.cart.id,
    },
  });

  if (cart && user) {
    if (cart.products.length === 0) {
      throw new AppError(400, "Cart is empty");
    }

    const buy = new Buy();
    buy.user = user;
    buy.products = cart.products;
    buy.total = cart.subtotal;

    buyRepository.create(buy);
    await buyRepository.save(buy);

    cart.products = [];
    cart.subtotal = 0;
    await cartRepository.save(cart);

    const newBuy = await buyRepository.findOne({
      where: {
        id: buy.id,
      },
    });

    return newBuy;
  }
};

export default createBuyService;

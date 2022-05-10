import { IUserCreate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";
import { Cart } from "../../entities/cart.entity";

const createUserService = async ({ name, email, password }: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);

  const users = await userRepository.find();

  const existsEmail = users.find((user) => user.email === email);

  if (existsEmail) {
    throw new AppError(409, "Email already exists");
  }

  const cart = new Cart();
  cart.subtotal = 0;

  cartRepository.create(cart);
  await cartRepository.save(cart);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = await hash(password, 10);
  user.cart = cart;

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

export default createUserService;

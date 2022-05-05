import { IUserCreate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { hash } from "bcrypt";

const createUserService = async ({ name, email, password }: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const existsEmail = users.find((user) => user.email === email);

  if (existsEmail) {
    throw new Error("Email already exists");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = await hash(password, 10);

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

export default createUserService;

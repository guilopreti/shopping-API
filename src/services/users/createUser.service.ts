import { IUserCreate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";

const createUserService = async ({ name, email }: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const existsEmail = users.find((user) => user.email === email);

  if (existsEmail) {
    throw new Error("Email already exists");
  }

  const user = new User();
  user.name = name;
  user.email = email;

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

export default createUserService;

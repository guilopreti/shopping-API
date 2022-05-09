import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const showUserService = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const account = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (!account) {
    throw new AppError(409, "User not found");
  }

  return account;
};

export default showUserService;

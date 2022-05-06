import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const deleteUserService = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const account = await userRepository.findOne({
    where: {
      email,
    },
  });

  await userRepository.delete(account!.id);

  return true;
};

export default deleteUserService;

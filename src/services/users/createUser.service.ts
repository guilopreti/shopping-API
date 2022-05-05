import { users } from "../../database";
import { IUserCreate, IUser } from "../../interfaces/users";
import { v4 as uuidv4 } from "uuid";

const createUserService = ({ name, email }: IUserCreate) => {
  const existsEmail = users.find((user) => user.email === email);

  if (existsEmail) {
    throw new Error("Email already exists");
  }

  const newUser: IUser = {
    id: uuidv4(),
    name,
    email,
  };

  users.push(newUser);

  return newUser;
};

export default createUserService;

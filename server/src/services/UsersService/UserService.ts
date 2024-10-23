import { UsersRepository } from "../../repositories/UsersRepository";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
interface User {
  name: string;
  email: string;
  password: string;
}

interface userResult {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  jwtToken?: string;
}

interface result {
  result: string;
}

export class UsersService {
  private usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  getUser = async (userId: number): Promise<userResult | null> => {
    try {
      const data = await this.usersRepository.getUser(userId);
      const jwtToken:string=this.generateJwtToken(userId);
      return {...data,jwtToken:jwtToken};
    } catch (error) {
      throw error;
    }
  };

  createUser = async (user: User): Promise<userResult & result> => {
    try {
      let userResultByEmail = await this.usersRepository.getUserByEmail(
        user.email
      );
      if (userResultByEmail) {
        return { result: "Already Exists" };
      }
      const data = await this.usersRepository.createUser(user);
      const jwtToken:string=this.generateJwtToken(data.id);
      return { ...data, result: "user created" , jwtToken:jwtToken};
    } catch (error) {
      throw error;
    }
  };

  generateJwtToken = (userId: number): string => {
    const jwtSecret = process.env.JWT_SECRET;

    if (jwtSecret) {
      const signedData = jwt.sign(
        {
          data: userId,
        },
        jwtSecret,
        { expiresIn: "15d" }
      );
      return signedData;
    } else {
      throw "internal error";
    }
    // return "";
  };
}

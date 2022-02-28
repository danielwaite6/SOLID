import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserRequestDTO } from "./CreateUserDTO";

// CLASSE UNICAMENTE PARA TRATAR DE REGRA DE NEGOCIO.
export class CreateUserUseCase {

    constructor(
        private usersRepository: IUsersRepository,
    ) { }

    async execute(data: CreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
        if (userAlreadyExists) {
            throw new Error("User Already Exists.");
        }
        const user = new User(data);

        await this.usersRepository.save(user);
    }
}
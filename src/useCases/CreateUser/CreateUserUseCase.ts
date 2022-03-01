import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserRequestDTO } from "./CreateUserDTO";

// CLASSE UNICAMENTE PARA TRATAR DE REGRA DE NEGOCIO.
export class CreateUserUseCase {

    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider,
    ) { }

    async execute(data: CreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
        if (userAlreadyExists) {
            throw new Error("User Already Exists.");
        }
        const user = new User(data);

        await this.usersRepository.save(user);
        this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: "Equipe My App",
                email: "dan@hot.com",
            },
            subject: "Seja bem vindo",
            body: "<p>Que coisa Legal</p>"
        });
    }
}
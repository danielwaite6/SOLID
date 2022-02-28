import { uuid } from "uuidv4";

export class User {
    /**O operador (non-null assertion) em questão serve para você dizer ao compilador que você sabe que 
     * esta operação é segura e nunca será nula. Em alguns casos o compilador do TS poderia acha que 
     * poderia ser nulo e por causa disto não compilaria sem guardas no código (sem conseguiria se fosse 
     * fácil avaliar o fluxo do código e determinar facilmente se pode garantir a não nulidade). Essa é uma forma 
     * de você programador se responsabilizar e o compilador deixa passar, mesmo que ele tenha quase certeza que 
     * isto esteja errado. O seu uso só faz sentido em variáveis de tipos anuláveis (com anotação ? no final), o 
     * que não é seu caso, então parece que não faz nada, mas também não gera erro. */
    public readonly id!: string;

    public name!: string;
    public email!: string;
    public password!: string;

    // Omit<Type, Keys> - Constrói um tipo pegando todas as propriedades do tipo e então removendo Keys.
    constructor(props: Omit<User, 'id'>, id?: string) {
        Object.assign(this, props); // Estou passando todas as props para dentro do Object.assign atraves do
        // que é o objeto em si.

        if (!id) {
            this.id = uuid();
        }
    }
}
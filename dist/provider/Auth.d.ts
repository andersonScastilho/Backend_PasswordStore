import { User } from "../entities/User";
import { ShowUserPerUserIdRepository } from "repositories/user/show-user-userId-repository";
declare class Auth {
    private showUserPerUserIdRepository?;
    constructor(showUserPerUserIdRepository?: ShowUserPerUserIdRepository | undefined);
    validAuth(authorization: string): Promise<string>;
    authentication(user: User, password: string): Promise<string>;
    authenticationProvider(ueserId: string, email: string): Promise<string>;
}
export default Auth;

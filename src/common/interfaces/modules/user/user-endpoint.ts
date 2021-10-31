import { ResponseDTO } from '../../response/response.dto';
import { UserViewDTO } from './views/user-view.dto';


export interface IUserContoller {

    // GET - /user
    getAll(): Promise<ResponseDTO<UserViewDTO[]>>;

    // GET BY ID - /user/:id
    getById(id: string): Promise<ResponseDTO<UserViewDTO>>;

}
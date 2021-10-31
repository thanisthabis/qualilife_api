import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from '../../../dtos/user.dto';


export class UserViewDTO extends UserDTO {
    @ApiProperty()
    roles: string[]
}
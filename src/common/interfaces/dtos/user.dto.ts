import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;
}
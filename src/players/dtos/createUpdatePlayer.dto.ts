import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUpdatePlayerDto {
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly name: string;
}

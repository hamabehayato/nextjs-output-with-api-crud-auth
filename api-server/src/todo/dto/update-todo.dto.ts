import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  @MaxLength(255)
  title: string = '';

  @IsNotEmpty()
  content: string = '';
}

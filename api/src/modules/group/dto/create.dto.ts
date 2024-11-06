import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  member_ids: string[];
}

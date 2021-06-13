import { IsString } from 'class-validator';

export class Search {
  @IsString()
  public keyword: string;
}

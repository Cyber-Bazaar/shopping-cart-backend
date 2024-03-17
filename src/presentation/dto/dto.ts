import { IsArray, IsInt, ArrayMinSize, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ProductIds {
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Type(() => Number)
  productIds: number[];
}
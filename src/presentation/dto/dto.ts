import {IsString, IsInt, IsArray, ArrayMinSize, ValidateNested, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class ProductIds {
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Type(() => Number)
  productIds: number[];
}

export class OrderDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}

class OrderInfoDto {
  @IsInt()
  productId: number;

  @IsNumber()
  unitPrice: number;

  @IsInt()
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  address_line1: string;

  @IsOptional()
  @IsString()
  address_line2?: string;

  @IsInt()
  zip_code: number;

  @IsString()
  shipping_method: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderInfoDto)
  orderInfo: OrderInfoDto[];
}
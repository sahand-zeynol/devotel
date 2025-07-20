import { IsOptional, IsString, IsArray, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class FindJobsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  technologies?: string[];

  @IsOptional()
  @IsString()
  sourceName?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  salaryMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  salaryMax?: number;
}

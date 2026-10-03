import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateBlogDto {

    @IsString()
    @IsNotEmpty()
    title!: string

    @IsString()
    @IsNotEmpty()
    content!: string

    @IsString()
    @IsNotEmpty()
    category!: string

    @IsArray()
    @ArrayNotEmpty()
    @IsString({each: true})
    tags!: string[]

}

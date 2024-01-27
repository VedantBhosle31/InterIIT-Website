import { UserRole } from "@prisma/client";
import { IsEnum } from "class-validator";
export class CreateIITDto{
    name: string;
    password: string;
    iitNumber : number;
    @IsEnum(UserRole) role: UserRole;
}

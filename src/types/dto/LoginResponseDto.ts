import type {UserStatus} from "../UserType.ts";

export interface LoginResponseDto {
    accessToken: string,
    expiresIn: number,
    user: {
        id: string,
        email: string,
        firstName: string,
        lastName: string,
        emailVerified: boolean,
        role: string,
        status: UserStatus
    }
}
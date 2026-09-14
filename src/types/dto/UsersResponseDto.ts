import type {UserData} from "../UserData.ts";

export interface UserResponseDto {
    page: number
    pageSize: number
    totalCount: number
    items: UserData[]
}
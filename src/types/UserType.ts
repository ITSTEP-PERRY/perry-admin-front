
export type UserStatus = "Active" | "Inactive";

export type UserType = {
    id: string,
    email: string,
    emailVerified: boolean,
    firstName: string,
    lastName: string,
    role: string,
    status: UserStatus
}
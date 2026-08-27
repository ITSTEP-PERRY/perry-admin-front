
export const UserRole = {
    Admin: "Administrator",
    Customer: "Customer",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface UserData {
    userId: string;
    fullName: string;
    role: UserRole;
    status: boolean;
    registrationDate: Date;
    email: string;
    avatar: string;
}
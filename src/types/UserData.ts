
export const UserRole = {
    Admin: "Admin",
    Customer: "Customer",
} as const;

export const UserStatus = {
    Active: "Active",
    Deleted: "Deleted",
}

export type UserRole = typeof UserRole[keyof typeof UserRole];
export type UserStatus = typeof UserStatus[keyof typeof UserStatus];
export interface UserData {
    id: string;
    lastName: string;
    firstName: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
    email: string;
    avatar: string;
    emailVerified: boolean;
}

export interface UserFilterRequest {
    roles?: UserRole[];
    name?: string;
    email?: string;
    active?: boolean;
    searchTerm?: string;
}
export interface UserApiError {
    status: string,
    data: {
        code: string,
        message: string,
    }
}
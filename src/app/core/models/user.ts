export interface User {
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
    token?: string;
}
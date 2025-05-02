export interface User {

    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    blockedAt: Date | null;
    createdAt: Date;
}

export default User;
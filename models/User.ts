export interface User {

    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    blocked_at: Date | null;
    created_at: Date;
}

export default User;
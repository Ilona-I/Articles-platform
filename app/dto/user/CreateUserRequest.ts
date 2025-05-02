export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
}

export default CreateUserRequest;
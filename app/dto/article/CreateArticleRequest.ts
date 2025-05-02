export interface CreateArticleRequest {
    userId: number;
    title: string;
    content: string;
    createdAt: Date;
}

export default CreateArticleRequest;
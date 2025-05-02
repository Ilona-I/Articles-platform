export interface Article {
    id: number;
    userId: number;
    title: string;
    content: string;
    blockedAt: Date | null;
    createdAt: Date;
}
export default Article;
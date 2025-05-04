export interface Article {
    id: number;
    user_id: number;
    title: string;
    content: string;
    blocked_at: Date | null;
    created_at: Date;
}
export default Article;
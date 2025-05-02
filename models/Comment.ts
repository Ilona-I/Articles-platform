export interface Comment {
    id: number;
    user_id: number;
    article_id: number;
    content: string;
    blocked_at?: Date | null;
    reated_at: Date
}

export default Comment;
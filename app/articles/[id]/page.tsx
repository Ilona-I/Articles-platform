'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Article } from '@/models/Article';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const ArticlePage = () => {
    const [article, setArticle] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const router = useRouter();
    useEffect(() => {
        axios.get<Article[]>(`/api/article/${id}`)
            .then(response => {
                console.log("Articles fetched successfully:", response.data);
                setArticle(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching articles:", err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const userId = localStorage.getItem('userId');
            await axios.delete(`/api/article/${id}`, {
                headers: {
                    'X-User-ID': userId
                }
            });
            router.push('/articles');
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="article-container">
            {article.length === 0 ? (
                <p>No article found</p>
            ) : (
                <div className="article-details">
                    <h1>{article[0].title}</h1>
                    <p>{article[0].content}</p>
                    <p className='authorId'>Author ID: {article[0].user_id}</p>
                    {article[0].user_id === Number(localStorage.getItem('userId')) && (
                        <>
                            <button className='btn btn_blue'> <Link href={`/articles/${article[0].id}/update`} className='btn_link'>Update</Link></button>
                            <button className='btn btn_red' onClick={() => handleDelete(article[0].id.toString())}>Delete</button>
                        </>
                    )}

                </div>
            )}
        </div>
    );
};

export default ArticlePage;
'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Article } from '@/models/Article';

const ArticlesPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Fetching Articles...");
        axios.get<Article[]>('/api/article')
            .then(response => {
                console.log("Articles fetched successfully:", response.data);
                setArticles(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching articles:", err);
                setLoading(false);
            });
    }, []);
    
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/article/${id}`);
            setArticles(articles.filter(article => article.id !== Number(id)));
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }
    
    return (
        <div className="articles-container">
            <h1>Articles</h1>
            <Link href="/articles/create" className="add-article-button">Add article</Link>
            {articles.length === 0 ? (
                <p>No articles available</p>
            ) : (
                <div className="articles-list">
                    {articles.map(article => (
                        <div key={article.id} className="article-card">
                            <h2>{article.title}</h2>
                            <p>Title: {article.title}</p>

                            <button><Link href={`/articles/${article.id}/`} className="update-link">Read</Link></button>
                           
                            {article.user_id === Number(localStorage.getItem('userId')) && (
                                <>
                                
                                    <button><Link href={`/articles/${article.id}/update`} className="update-link">Update</Link></button>
                                    <button onClick={() => handleDelete(article.id.toString())}>Delete</button></>
                            )}
                        </div>
                    ))}
                </div>


            )}
        </div>
    );
};

export default ArticlesPage;
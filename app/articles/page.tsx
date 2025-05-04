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
                <div>
                    {articles.map(article => (
                        <div key={article.id} >
                            <p>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ </p>
                            <h2>{article.title}</h2>
                           <p> {article.content.length > 30 ? `${article.content.substring(0, 200)}...` : article.content}... <Link className='link' href={`/articles/${article.id}/`} >Read</Link></p>

                            {article.user_id === Number(localStorage.getItem('userId')) && (
                                <>

                                    <button className='btn btn_blue'><Link className='btn_link' href={`/articles/${article.id}/update`} >Update</Link></button>
                                    <button className='btn btn_red' onClick={() => handleDelete(article.id.toString())}>Delete</button></>
                            )}
                            
                        </div>
                    ))}
                </div>


            )}
        </div>
    );
};

export default ArticlesPage;
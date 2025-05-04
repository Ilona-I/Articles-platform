'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Article from '@/models/Article';

const UpdateArticlePage = () => {
    const router = useRouter();
    const { id } = useParams();

    const [article, setArticle] = useState<Article>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('ID:', id);
        if (id) {
            fetch(`/api/article/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setArticle(data[0]);
                    setLoading(false);
                })
                .catch((err) => {
                    setError('Failed to fetch article');
                    setLoading(false);
                });
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setArticle((prev) => prev ? { ...prev, [name]: value } : undefined);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("userId"); 
            const response = await fetch(`/api/article/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    ...(userId && { 'X-User-ID': userId })
                },
                body: JSON.stringify(article),
            });

            if (response.ok) {
                router.push(`/articles/${id}`);
            } else {
                setError('Failed to update article');
            }
        } catch {
            setError('Failed to update article');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Update Article</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className='inputFieldTitle'
                        value={article?.title ?? ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        className='inputFieldContent'
                        value={article?.content ?? ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button className='btn_submit_create_article' type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateArticlePage;
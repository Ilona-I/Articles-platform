'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const CreateArticlePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            setError('Title and content are required');
            return;
        }

        setError('');
        console.log('Submitting article:', { title: title, content: content });
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User is not logged in');
            }
            const response = await axios.post('/api/article/create', { title: title, content: content, authorId: userId });
            console.log('Article created successfully:', response.data);
            router.push('/articles');
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    return (
        <div className="create-article-container">
            <h1>Create Article</h1>
            <form onSubmit={handleSubmit} className="create-article-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Content</label>
                    <input
                        type="text"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">Create</button>
            </form>
        </div>
    );
};

export default CreateArticlePage;
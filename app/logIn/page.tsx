'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const LogInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        setError('');

        try {
            const response = await axios.post<{ id: string }>('/api/logIn', { username: username, password: password });
            console.log('You logged in successfully:', response.data);
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('username', username);
            router.push('/articles');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="center_container">
            <h1>Log in</h1>
            <form onSubmit={handleSubmit} className="create-article-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label><br />
                    <input
                        type="text"
                        id="username"
                        className='inputField'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label> <br />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        className='inputField'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}<br />
                <button type="submit" className='btn_submit'>Log in</button>
            </form>
        </div>
    );
};

export default LogInPage;
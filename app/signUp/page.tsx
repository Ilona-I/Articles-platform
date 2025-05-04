'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/signUp', { username, email, password });
            if (response.status === 201) {
                router.push('/articles');
            }
        } catch (err: any) {

            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Failed to sign up. Please try again.');
            }

        }
    };

    return (
        <div className="center_container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="username">Username:</label><br />
                    <input
                        type="text"
                        id="username"
                        value={username}
                        className='inputField'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    /><br />
                </div>
                <div>
                    <label htmlFor="email">Email:</label><br />
                    <input
                        type="email"
                        id="email"
                        value={email}
                        className='inputField'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /><br />
                </div>
                <div>
                    <label htmlFor="password">Password:</label><br />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        className='inputField'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br />
                </div>
                {error && <p className="error">{error}</p>}<br />
                <button className='btn btn_submit' type="submit">Sign Up</button>
            </form>
        </div>
    );
}
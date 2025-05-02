'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { User } from '@/models/User';




const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Fetching users...");
        axios.get<User[]>('/api/user')
            .then(response => {
                console.log("Users fetched successfully:", response.data);
                setUsers(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/user/${id}`);
            setUsers(users.filter(user => user.id !== Number(id)));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="users-container">
            <h1>Users</h1>
            <Link href="/users/create" className="add-user-button">Add user</Link>
            {users.length === 0 ? (
                <p>No users available</p>
            ) : (
                <div className="users-list">
                {users.map(user => (
                    <div key={user.id} className="user-card">
                        <h2>{user.username}</h2>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                       
                        <button><Link href={`/users/${user.id}/update`} className="update-link">Update</Link></button>
                        <button onClick={() => handleDelete(user.id.toString())}>Delete</button>
                    </div>
                ))}
            </div>
            
                
            )}
        </div>
    );
};

export default UsersPage;
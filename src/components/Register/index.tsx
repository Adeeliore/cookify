import React, { useState } from 'react';
import styles from './index.module.sass';
import Logo from '../Logo';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5005/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Registration successful');
                // Redirect or perform further actions
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.register_container}>
            <form className={styles.form_wrapper} onSubmit={handleSubmit}>
                <Logo />
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                />
                <div>
                    <button type="submit" className={styles.button}>sign up</button>
                    <button type="button" className={`${styles.button} ${styles['button-skip']}`} onClick={() => {/* Add navigation logic here */}}>back</button>
                </div>
            </form>
        </div>
    );
};

export default Register;

import React, {useState} from 'react';
import Logo from '../Logo';
import styles from '../Register/index.module.sass';
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../services/user-api.ts";


const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData.username, formData.password);
            if (response.ok) {
                const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
                const userData = {
                    username: formData.username,
                    expiration: expirationTime
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                navigate('/');
            } else {
                const errorText = await response.text();
                alert(`Error: ${errorText}`);
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
                <div>
                    <button type="submit" className={styles.button}>sign in</button>
                    <button type="button" className={`${styles.button} ${styles['button-skip']}`}>skip</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;



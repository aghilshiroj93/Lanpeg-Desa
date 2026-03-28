import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="login-page">
            <Head title="Login Admin" />
            
            <div className="login-card">
                <div className="login-header">
                    <div className="logo-box">L</div>
                    <h1>Lanpeg Desa</h1>
                    <p>Silakan masuk menggunakan akun administrator desa.</p>
                </div>

                <form onSubmit={submit} className="login-form">
                    <div className="input-group">
                        <label>Email Admin</label>
                        <div className={`input-box ${errors.email ? 'has-error' : ''}`}>
                            <Mail size={18} />
                            <input 
                                type="email" 
                                value={data.email} 
                                onChange={e => setData('email', e.target.value)} 
                                placeholder="nama@desa.id"
                                required 
                            />
                        </div>
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className={`input-box ${errors.password ? 'has-error' : ''}`}>
                            <Lock size={18} />
                            <input 
                                type="password" 
                                value={data.password} 
                                onChange={e => setData('password', e.target.value)} 
                                placeholder="••••••••"
                                required 
                            />
                        </div>
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <div className="form-options">
                        <label className="checkbox-container">
                            <input 
                                type="checkbox" 
                                checked={data.remember} 
                                onChange={e => setData('remember', e.target.checked)} 
                            />
                            <span className="checkmark"></span>
                            Ingat Sesi
                        </label>
                    </div>

                    <button type="submit" disabled={processing} className="btn-login">
                        {processing ? 'Memproses...' : (
                            <>
                                Masuk ke Dashboard <LogIn size={18} />
                            </>
                        )}
                    </button>
                    
                    {errors.message && (
                        <div className="auth-alert">
                            <AlertCircle size={16} /> {errors.message}
                        </div>
                    )}
                </form>

                <div className="login-footer">
                    <p>&copy; 2026 Portal Desa Digital - Powered by Lanpeg</p>
                </div>
            </div>

            <style>{`
                .login-page {
                    min-height: 100vh; display: flex; align-items: center; justify-content: center;
                    background: #f8fafc; background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
                    background-size: 20px 20px; font-family: 'Inter', sans-serif;
                }
                .login-card {
                    background: white; width: 100%; max-width: 420px; padding: 48px;
                    border-radius: 32px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
                    border: 1px solid #e2e8f0;
                }
                .login-header { text-align: center; margin-bottom: 40px; }
                .logo-box { width: 48px; height: 48px; background: #1e293b; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.5rem; margin: 0 auto 16px; }
                .login-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0 0 8px; }
                .login-header p { color: #64748b; font-size: 0.95rem; line-height: 1.5; }

                .input-group { margin-bottom: 24px; }
                .input-group label { display: block; font-size: 0.85rem; font-weight: 700; color: #475569; margin-bottom: 10px; }
                .input-box { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 0 16px; transition: 0.2s; color: #94a3b8; }
                .input-box:focus-within { border-color: #1e293b; background: white; color: #1e293b; box-shadow: 0 0 0 4px rgba(30, 41, 59, 0.05); }
                .input-box.has-error { border-color: #ef4444; color: #ef4444; }
                .input-box input { flex: 1; border: none; background: transparent; padding: 14px 0; outline: none; font-weight: 600; color: #1e293b; }
                
                .error-text { color: #ef4444; font-size: 0.8rem; margin-top: 6px; display: block; font-weight: 500; }
                
                .form-options { margin-bottom: 32px; display: flex; align-items: center; }
                .checkbox-container { display: flex; align-items: center; cursor: pointer; font-size: 0.85rem; font-weight: 600; color: #64748b; user-select: none; gap: 8px; }
                
                .btn-login { width: 100%; padding: 16px; background: #1e293b; color: white; border: none; border-radius: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.2s; margin-top: 10px; }
                .btn-login:hover { transform: translateY(-2px); background: #0f172a; box-shadow: 0 10px 15px -3px rgba(30, 41, 59, 0.2); }
                .btn-login:disabled { background: #94a3b8; cursor: not-allowed; transform: none; box-shadow: none; }

                .auth-alert { display: flex; align-items: center; gap: 8px; background: #fef2f2; border: 1px solid #fee2e2; color: #ef4444; padding: 12px; border-radius: 12px; margin-top: 24px; font-size: 0.85rem; font-weight: 600; }
                .login-footer { margin-top: 40px; text-align: center; font-size: 0.75rem; color: #94a3b8; }
            `}</style>
        </div>
    );
}

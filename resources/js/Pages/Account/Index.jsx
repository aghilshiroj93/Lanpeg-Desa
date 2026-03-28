import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    User, 
    Mail, 
    Lock, 
    X, 
    Save, 
    CheckCircle,
    AlertCircle,
    UserCircle,
    Shield
} from 'lucide-react';

const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <button onClick={onClose} className="btn-close"><X size={20} /></button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
            <style>{`
                .modal-overlay {
                    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.4); 
                    backdrop-filter: blur(4px); display: flex; align-items: center; 
                    justify-content: center; z-index: 1000; padding: 20px;
                }
                .modal-container {
                    background: white; border-radius: 20px; width: 100%; max-width: 500px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    animation: modalShift 0.3s ease-out;
                }
                @keyframes modalShift {
                    from { transform: translateY(10px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .modal-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
                .modal-title { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
                .btn-close { border: none; background: none; color: #94a3b8; cursor: pointer; }
                .modal-body { padding: 24px; }
            `}</style>
        </div>
    );
};

export default function AccountIndex({ users }) {
    const { auth } = usePage().props;
    const currentUserId = auth?.user?.id || 0;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const openCreateModal = () => {
        setEditMode(false);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (user) => {
        setEditMode(true);
        setSelectedId(user.id);
        setData({
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editMode ? `/akun/${selectedId}` : '/akun';
        post(url, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        if (id === currentUserId) {
            alert('Anda tidak bisa menghapus akun yang sedang digunakan!');
            return;
        }
        if (confirm('Yakin ingin menghapus akun admin ini?')) {
            router.delete(`/akun/${id}`);
        }
    };

    return (
        <DashboardLayout>
            <Head title="Manajemen Akun Admin" />

            <div className="content-header">
                <div className="header-info">
                    <h1>Sistem Manajemen Akun</h1>
                    <p>Kelola akses administrator untuk pengelolaan portal Desa Lanpeg.</p>
                </div>
                <button onClick={openCreateModal} className="btn-add">
                    <Plus size={20} /> Tambah Admin
                </button>
            </div>

            <div className="account-grid">
                {users.map((user) => (
                    <div key={user.id} className={`account-card ${currentUserId === user.id ? 'current-user' : ''}`}>
                        <div className="card-top">
                            <div className="user-avatar">
                                <UserCircle size={48} />
                                {currentUserId === user.id && <div className="online-badge">Anda</div>}
                            </div>
                            <div className="user-text">
                                <h3>{user.name}</h3>
                                <p><Mail size={14} /> {user.email}</p>
                            </div>
                            <div className="badge-role">
                                <Shield size={12} /> Administrator
                            </div>
                        </div>
                        <div className="card-footer">
                            <button onClick={() => openEditModal(user)} className="btn-edit-user">
                                <Edit2 size={14} /> Ganti Password
                            </button>
                            {currentUserId !== user.id && (
                                <button onClick={() => handleDelete(user.id)} className="btn-delete-user">
                                    <Trash2 size={14} /> Hapus
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={editMode ? 'Edit Akun Admin' : 'Tambah Admin Baru'}>
                <form onSubmit={handleSubmit} className="account-form">
                    <div className="input-group">
                        <label>Nama Lengkap</label>
                        <div className="input-box">
                            <User size={18} />
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Nama Admin" />
                        </div>
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="input-group">
                        <label>Alamat Email</label>
                        <div className="input-box">
                            <Mail size={18} />
                            <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder="email@desa.id" />
                        </div>
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="input-group">
                        <label>{editMode ? 'Password Baru (Kosongkan jika tidak diganti)' : 'Password'}</label>
                        <div className="input-box">
                            <Lock size={18} />
                            <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} placeholder="••••••••" />
                        </div>
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>

                    <div className="input-group">
                        <label>Konfirmasi Password</label>
                        <div className="input-box">
                            <Lock size={18} />
                            <input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} placeholder="••••••••" />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">Batal</button>
                        <button type="submit" disabled={processing} className="btn-save">
                            <Save size={18} /> {processing ? 'Menyimpan...' : 'Simpan Akun'}
                        </button>
                    </div>
                </form>
            </Modal>

            <style>{`
                .content-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; }
                .header-info h1 { font-size: 2.2rem; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
                .header-info p { color: #64748b; font-size: 1.1rem; }
                .btn-add { background: #3b82f6; color: white; padding: 12px 24px; border-radius: 12px; border: none; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2); }
                .btn-add:hover { transform: translateY(-2px); background: #2563eb; }

                .account-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
                .account-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; transition: 0.3s; position: relative; }
                .account-card:hover { border-color: #3b82f6; transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05); }
                .account-card.current-user { border-color: #3b82f6; background: #f0f9ff66; }
                
                .card-top { padding: 32px; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .user-avatar { width: 80px; height: 80px; background: #eff6ff; border-radius: 30px; display: flex; align-items: center; justify-content: center; color: #3b82f6; margin-bottom: 16px; position: relative; }
                .online-badge { position: absolute; bottom: -5px; background: #10b981; color: white; font-size: 0.65rem; font-weight: 800; padding: 2px 8px; border-radius: 10px; border: 3px solid white; text-transform: uppercase; }
                
                .user-text h3 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin: 0 0 4px; }
                .user-text p { font-size: 0.9rem; color: #64748b; font-weight: 600; display: flex; align-items: center; gap: 8px; justify-content: center; }
                .badge-role { margin-top: 16px; background: #1e293b; color: white; font-size: 0.7rem; font-weight: 700; padding: 4px 12px; border-radius: 20px; display: flex; align-items: center; gap: 6px; text-transform: uppercase; letter-spacing: 0.02em; }

                .card-footer { background: #f8fafc; padding: 16px 24px; display: flex; gap: 12px; border-top: 1px solid #f1f5f9; }
                .btn-edit-user { flex: 1; padding: 10px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; color: #475569; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.2s; }
                .btn-edit-user:hover { border-color: #3b82f6; color: #3b82f6; }
                .btn-delete-user { padding: 10px; width: 42px; border-radius: 10px; border: 1px solid #fecaca; background: white; color: #ef4444; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
                .btn-delete-user:hover { background: #fef2f2; border-color: #ef4444; }

                /* Form UI */
                .input-group { margin-bottom: 20px; }
                .input-group label { display: block; font-weight: 700; font-size: 0.85rem; color: #475569; margin-bottom: 8px; }
                .input-box { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0 16px; color: #94a3b8; }
                .input-box:focus-within { border-color: #3b82f6; background: white; color: #3b82f6; }
                .input-box input { flex: 1; border: none; background: transparent; padding: 12px 0; outline: none; font-weight: 600; color: #1e293b; }
                .error { color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block; }
                
                .modal-footer { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; padding-top: 24px; border-top: 1px solid #f1f5f9; }
                .btn-cancel { padding: 12px 24px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; color: #64748b; font-weight: 700; cursor: pointer; }
                .btn-save { padding: 12px 24px; background: #1e293b; color: white; border-radius: 12px; border: none; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
            `}</style>
        </DashboardLayout>
    );
}

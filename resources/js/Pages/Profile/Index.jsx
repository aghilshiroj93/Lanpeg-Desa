import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    Upload, 
    CheckCircle, 
    Save, 
    X,
    ImageIcon,
    MoreHorizontal,
    Search
} from 'lucide-react';

const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-container">
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
                    background: white; border-radius: 20px; width: 100%; max-width: 650px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    animation: modalIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    max-height: 90vh; display: flex; flex-direction: column;
                }
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .modal-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
                .modal-title { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
                .btn-close { border: none; background: none; color: #94a3b8; cursor: pointer; transition: 0.2s; }
                .btn-close:hover { color: #1e293b; }
                .modal-body { padding: 24px; overflow-y: auto; }
            `}</style>
        </div>
    );
};

export default function ProfileIndex({ profiles }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        content: '',
        image_file: null,
    });

    const openCreateModal = () => {
        setEditMode(false);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (profile) => {
        setEditMode(true);
        setSelectedId(profile.id);
        setData({
            title: profile.title,
            description: profile.description || '',
            content: profile.content || '',
            image_file: null,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            post(`/profil/${selectedId}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/profil', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus profil ini?')) {
            router.delete(`/profil/${id}`);
        }
    };

    return (
        <DashboardLayout>
            <Head title="Profil Desa" />

            <div className="content-header">
                <div className="header-info">
                    <h1>Profil Desa</h1>
                    <p>Kelola informasi umum, sejarah, visi, misi dan aspek branding desa lainnya.</p>
                </div>
                <button onClick={openCreateModal} className="btn-add">
                    <Plus size={20} />
                    Tambah Profil
                </button>
            </div>

            <div className="table-card">
                <div className="table-header">
                    <div className="search-box">
                        <Search size={18} />
                        <input type="text" placeholder="Cari profil..." />
                    </div>
                </div>
                <div className="table-container">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th width="80">Konten</th>
                                <th>Judul / Nama Fitur</th>
                                <th>Deskripsi Singkat</th>
                                <th>Status</th>
                                <th width="120">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.length > 0 ? (
                                profiles.map((p) => (
                                    <tr key={p.id}>
                                        <td>
                                            <div className="thumbnail">
                                                {p.image ? (
                                                    <img src={`/storage/${p.image}`} alt={p.title} />
                                                ) : (
                                                    <ImageIcon size={20} color="#cbd5e1" />
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="title-bold">{p.title}</span>
                                            <span className="slug-tag">{p.slug}</span>
                                        </td>
                                        <td><p className="description-truncate">{p.description || '-'}</p></td>
                                        <td>
                                            <span className="badge-active">Published</span>
                                        </td>
                                        <td>
                                            <div className="action-btns">
                                                <button onClick={() => openEditModal(p)} className="btn-icon edit"><Edit2 size={16} /></button>
                                                <button onClick={() => handleDelete(p.id)} className="btn-icon delete"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="empty-row">Belum ada data profil.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={editMode ? 'Edit Profil' : 'Tambah Profil Baru'}>
                <form onSubmit={handleSubmit} className="premium-form">
                    <div className="form-grid">
                        <div className="input-group full">
                            <label>Judul Profil</label>
                            <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Contoh: Sejarah Desa" />
                            {errors.title && <span className="error">{errors.title}</span>}
                        </div>
                        <div className="input-group full">
                            <label>Deskripsi Singkat</label>
                            <textarea rows="2" value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Tuliskan gambaran singkat..."></textarea>
                        </div>
                        <div className="input-group full">
                            <label>Konten Utama</label>
                            <textarea rows="6" value={data.content} onChange={e => setData('content', e.target.value)} placeholder="Tuliskan isi lengkap profil desa Anda..."></textarea>
                        </div>
                        <div className="input-group full">
                            <label>Gambar / Foto Unggulan</label>
                            <div className="custom-upload">
                                <input type="file" id="image_file" onChange={e => setData('image_file', e.target.files[0])} />
                                <label htmlFor="image_file">
                                    {data.image_file ? (
                                        <div className="selected-info">
                                            <CheckCircle size={24} color="#10b981" />
                                            <span>{data.image_file.name}</span>
                                        </div>
                                    ) : (
                                        <div className="upload-placeholder">
                                            <Upload size={24} />
                                            <span>Klik untuk memilih dari File Manager</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">Batal</button>
                        <button type="submit" disabled={processing} className="btn-submit">
                            {processing ? 'Menyimpan...' : (
                                <>
                                    <Save size={18} />
                                    {editMode ? 'Perbarui Profil' : 'Simpan Profil'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>

            <style>{`
                .content-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; gap: 20px; }
                .header-info h1 { font-size: 2rem; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
                .header-info p { color: #64748b; font-size: 1rem; }
                
                .btn-add {
                    background: #3b82f6; color: white; padding: 12px 20px; border-radius: 12px;
                    border: none; font-weight: 600; display: flex; align-items: center; gap: 8px;
                    cursor: pointer; transition: 0.2s; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
                }
                .btn-add:hover { background: #2563eb; transform: translateY(-2px); }

                .table-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .table-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: flex-end; }
                .search-box { position: relative; width: 300px; }
                .search-box svg { position: absolute; left: 12px; top: 12px; color: #94a3b8; }
                .search-box input { width: 100%; padding: 10px 12px 10px 40px; border: 1px solid #e2e8f0; border-radius: 10px; outline: none; }

                .table-container { overflow-x: auto; }
                .premium-table { width: 100%; border-collapse: collapse; }
                .premium-table th { background: #f8fafc; padding: 16px 24px; text-align: left; font-size: 0.85rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9; }
                .premium-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
                
                .thumbnail { width: 48px; height: 48px; border-radius: 10px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; overflow: hidden; }
                .thumbnail img { width: 100%; height: 100%; object-fit: cover; }
                
                .title-bold { display: block; font-weight: 700; color: #1e293b; font-size: 1rem; }
                .slug-tag { font-size: 0.75rem; color: #94a3b8; font-family: monospace; }
                
                .description-truncate { color: #64748b; font-size: 0.9rem; max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                
                .badge-active { background: #ecfdf5; color: #059669; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
                
                .action-btns { display: flex; gap: 8px; }
                .btn-icon { width: 36px; height: 36px; border-radius: 8px; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; background: white; }
                .btn-icon.edit:hover { color: #3b82f6; border-color: #3b82f6; background: #eff6ff; }
                .btn-icon.delete:hover { color: #ef4444; border-color: #ef4444; background: #fef2f2; }
                
                .empty-row { text-align: center; color: #94a3b8; padding: 40px !important; }

                /* Form Design */
                .premium-form { display: flex; flex-direction: column; gap: 24px; }
                .input-group label { display: block; font-weight: 600; font-size: 0.875rem; color: #475569; margin-bottom: 8px; }
                .input-group input, .input-group textarea { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; outline: none; transition: 0.2s; font-family: inherit; }
                .input-group input:focus, .input-group textarea:focus { border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
                
                .custom-upload input { display: none; }
                .custom-upload label { display: block; border: 2px dashed #e2e8f0; border-radius: 16px; padding: 32px; text-align: center; cursor: pointer; transition: 0.2s; }
                .custom-upload label:hover { border-color: #3b82f6; background: #f0f7ff; }
                .upload-placeholder, .selected-info { display: flex; flex-direction: column; align-items: center; gap: 10px; color: #64748b; }
                .selected-info span { font-weight: 600; color: #1e293b; }
                
                .form-actions { display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid #f1f5f9; padding-top: 24px; }
                .btn-cancel { padding: 12px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: white; color: #64748b; font-weight: 600; cursor: pointer; }
                .btn-submit { padding: 12px 24px; background: #3b82f6; color: white; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }
                .btn-submit:disabled { opacity: 0.7; }
                .error { color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block; }
            `}</style>
        </DashboardLayout>
    );
}

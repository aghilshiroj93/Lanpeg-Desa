import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    Upload, 
    Save, 
    X,
    Newspaper,
    Check,
    Eye,
    Calendar,
    Tag,
    AlertCircle
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
                    background: white; border-radius: 20px; width: 100%; max-width: 800px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    animation: modalIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    max-height: 90vh; display: flex; flex-direction: column;
                }
                @keyframes modalIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .modal-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
                .modal-title { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
                .btn-close { border: none; background: none; color: #94a3b8; cursor: pointer; }
                .modal-body { padding: 24px; overflow-y: auto; }
            `}</style>
        </div>
    );
};

export default function BeritaIndex({ berita }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: '',
        kategori: '',
        konten: '',
        status: 'draft',
        thumbnail_file: null,
    });

    const categories = ['Warta Desa', 'Pembangunan', 'Ekonomi', 'Kesehatan', 'Pendidikan', 'Pengumuman'];

    const openCreateModal = () => {
        setEditMode(false);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditMode(true);
        setSelectedId(item.id);
        setData({
            judul: item.judul,
            kategori: item.kategori,
            konten: item.konten,
            status: item.status,
            thumbnail_file: null,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editMode ? `/berita/${selectedId}` : '/berita';
        post(url, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus berita ini?')) {
            router.delete(`/berita/${id}`);
        }
    };

    return (
        <DashboardLayout>
            <Head title="Manajemen Berita" />

            <div className="content-header">
                <div className="header-info">
                    <h1>Berita & Kabar Desa</h1>
                    <p>Kelola semua publikasi, berita, dan pengumuman untuk warga desa.</p>
                </div>
                <button onClick={openCreateModal} className="btn-add">
                    <Plus size={20} />
                    Buat Berita Baru
                </button>
            </div>

            <div className="news-container">
                {berita.length > 0 ? (
                    <div className="news-grid">
                        {berita.map((item) => (
                            <div key={item.id} className="news-card">
                                <div className="news-thumb">
                                    {item.thumbnail ? (
                                        <img src={`/storage/${item.thumbnail}`} alt={item.judul} />
                                    ) : (
                                        <div className="thumb-placeholder">
                                            <Newspaper size={40} />
                                        </div>
                                    )}
                                    <div className={`status-badge ${item.status}`}>
                                        {item.status === 'terbit' ? 'Terbit' : 'Draft'}
                                    </div>
                                </div>
                                <div className="news-content">
                                    <div className="news-meta">
                                        <span className="category-tag"><Tag size={12} /> {item.kategori}</span>
                                        <span className="view-pill"><Eye size={12} /> {item.view_count}</span>
                                    </div>
                                    <h3 className="news-title">{item.judul}</h3>
                                    <p className="news-excerpt">{item.konten.substring(0, 100)}...</p>
                                    <div className="news-footer">
                                        <div className="post-date">
                                            <Calendar size={14} />
                                            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                        <div className="card-actions">
                                            <button onClick={() => openEditModal(item)} className="icon-btn edit"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(item.id)} className="icon-btn delete"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state-card">
                        <AlertCircle size={48} />
                        <h3>Belum ada berita</h3>
                        <p>Silakan buat berita pertama Anda hari ini.</p>
                        <button onClick={openCreateModal} className="btn-add">Mulai Menulis</button>
                    </div>
                )}
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={editMode ? 'Edit Berita' : 'Tulis Berita Baru'}>
                <form onSubmit={handleSubmit} className="premium-form">
                    <div className="form-sections">
                        <div className="form-main">
                            <div className="input-group">
                                <label>Judul Berita / Kabar</label>
                                <input type="text" value={data.judul} onChange={e => setData('judul', e.target.value)} placeholder="Masukkan judul yang menarik..." />
                                {errors.judul && <span className="error">{errors.judul}</span>}
                            </div>
                            
                            <div className="form-row">
                                <div className="input-group">
                                    <label>Kategori</label>
                                    <select value={data.kategori} onChange={e => setData('kategori', e.target.value)}>
                                        <option value="">Pilih Kategori</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    {errors.kategori && <span className="error">{errors.kategori}</span>}
                                </div>
                                <div className="input-group">
                                    <label>Status Publikasi</label>
                                    <select value={data.status} onChange={e => setData('status', e.target.value)}>
                                        <option value="draft">Simpan sebagai Draft</option>
                                        <option value="terbit">Langsung Terbitkan</option>
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Isi Berita</label>
                                <textarea rows="8" value={data.konten} onChange={e => setData('konten', e.target.value)} placeholder="Tulis isi berita selengkap mungkin..."></textarea>
                                {errors.konten && <span className="error">{errors.konten}</span>}
                            </div>
                        </div>

                        <div className="form-side">
                            <label>Thumbnail / Gambar Utama</label>
                            <div className="image-upload-box">
                                <input type="file" id="thumbnail" onChange={e => setData('thumbnail_file', e.target.files[0])} />
                                <label htmlFor="thumbnail">
                                    {data.thumbnail_file ? (
                                        <div className="preview-active">
                                            <Check size={24} />
                                            <span>{data.thumbnail_file.name}</span>
                                        </div>
                                    ) : (
                                        <div className="preview-placeholder">
                                            <Upload size={32} />
                                            <span>Pilih Foto Berita</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                            <p className="help-text">Gunakan gambar rasio 16:9 untuk hasil terbaik (Max 2MB).</p>
                        </div>
                    </div>

                    <div className="modal-actions-footer">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Batal</button>
                        <button type="submit" disabled={processing} className="btn-primary">
                            {processing ? 'Menyimpan...' : (
                                <>
                                    <Save size={18} />
                                    Simpan Berita
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>

            <style>{`
                .content-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; }
                .header-info h1 { font-size: 2.2rem; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
                .header-info p { color: #64748b; font-size: 1.1rem; }

                .btn-add {
                    background: #3b82f6; color: white; padding: 12px 24px; border-radius: 12px;
                    border: none; font-weight: 600; display: flex; align-items: center; gap: 8px;
                    cursor: pointer; transition: 0.2s; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
                }
                .btn-add:hover { background: #2563eb; transform: translateY(-2px); }

                .news-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
                .news-card { background: white; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; transition: 0.3s; }
                .news-card:hover { transform: translateY(-5px); box-shadow: 0 12px 20px rgba(0,0,0,0.08); }

                .news-thumb { position: relative; height: 180px; background: #f1f5f9; }
                .news-thumb img { width: 100%; height: 100%; object-fit: cover; }
                .thumb-placeholder { height: 100%; display: flex; align-items: center; justify-content: center; color: #cbd5e1; }
                
                .status-badge { position: absolute; top: 12px; right: 12px; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
                .status-badge.terbit { background: #ecfdf5; color: #059669; }
                .status-badge.draft { background: #fefce8; color: #a16207; }

                .news-content { padding: 20px; }
                .news-meta { display: flex; justify-content: space-between; margin-bottom: 12px; }
                .category-tag { background: #eff6ff; color: #3b82f6; padding: 2px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 4px; }
                .view-pill { color: #94a3b8; font-size: 0.8rem; display: flex; align-items: center; gap: 4px; }

                .news-title { font-size: 1.15rem; font-weight: 700; color: #1e293b; margin-bottom: 8px; line-height: 1.4; }
                .news-excerpt { color: #64748b; font-size: 0.9rem; margin-bottom: 16px; line-height: 1.6; }

                .news-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid #f1f5f9; }
                .post-date { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #94a3b8; }
                
                .card-actions { display: flex; gap: 8px; }
                .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
                .icon-btn.edit:hover { color: #3b82f6; border-color: #3b82f6; background: #eff6ff; }
                .icon-btn.delete:hover { color: #ef4444; border-color: #ef4444; background: #fef2f2; }

                .empty-state-card { background: white; border-radius: 24px; padding: 60px; text-align: center; border: 2px dashed #e2e8f0; display: flex; flex-direction: column; align-items: center; gap: 16px; }
                .empty-state-card h3 { font-size: 1.5rem; color: #1e293b; }
                .empty-state-card p { color: #64748b; margin-bottom: 8px; }

                /* Form Design */
                .premium-form { display: flex; flex-direction: column; gap: 24px; }
                .form-sections { display: grid; grid-template-columns: 1fr 240px; gap: 32px; }
                .form-main { display: flex; flex-direction: column; gap: 20px; }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

                .input-group label { display: block; font-weight: 600; font-size: 0.9rem; color: #475569; margin-bottom: 8px; }
                .input-group input, .input-group select, .input-group textarea { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc; transition: 0.2s; font-family: inherit; }
                .input-group input:focus, .input-group select:focus, .input-group textarea:focus { border-color: #3b82f6; background: white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); outline: none; }

                .image-upload-box input { display: none; }
                .image-upload-box label { display: block; height: 200px; border: 2px dashed #e2e8f0; border-radius: 16px; background: #f8fafc; cursor: pointer; transition: 0.2s; }
                .image-upload-box label:hover { border-color: #3b82f6; background: #f0f7ff; }
                .preview-placeholder, .preview-active { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: #94a3b8; text-align: center; padding: 20px; }
                .preview-active { color: #10b981; }
                .help-text { font-size: 0.75rem; color: #94a3b8; margin-top: 8px; }

                .modal-actions-footer { display: flex; justify-content: flex-end; gap: 12px; margin-top: 12px; padding-top: 24px; border-top: 1px solid #f1f5f9; }
                .btn-secondary { padding: 12px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: white; color: #64748b; font-weight: 600; cursor: pointer; }
                .btn-primary { padding: 12px 24px; background: #3b82f6; color: white; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }
                .error { color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block; }

                @media (max-width: 768px) {
                    .form-sections { grid-template-columns: 1fr; }
                    .form-side { order: -1; }
                }
            `}</style>
        </DashboardLayout>
    );
}

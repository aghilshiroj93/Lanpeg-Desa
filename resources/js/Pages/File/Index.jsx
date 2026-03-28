import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    FileText, 
    Download, 
    X, 
    Save, 
    Upload,
    FileIcon,
    FileCode,
    FileType,
    Files,
    AlertCircle,
    Check,
    Search,
    Filter,
    FileArchive,
    FileSpreadsheet,
    FileWarning,
    MoreVertical
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
                    background: white; border-radius: 20px; width: 100%; max-width: 600px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    animation: modalIn 0.2s ease-out;
                    max-height: 90vh; display: flex; flex-direction: column;
                }
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .modal-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
                .modal-title { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
                .btn-close { border: none; background: none; color: #94a3b8; cursor: pointer; }
                .modal-body { padding: 24px; overflow-y: auto; }
            `}</style>
        </div>
    );
};

export default function FileIndex({ files }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [filterCategory, setFilterCategory] = useState('Semua');

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: '',
        kategori: 'Peraturan Desa',
        keterangan: '',
        status: 'publik',
        file_file: null,
    });

    const categories = ['Peraturan Desa', 'Peraturan Kepala Desa', 'Laporan Keuangan', 'Formulir Luayanan', 'Pengumuman', 'Lainnya'];

    const filteredFiles = filterCategory === 'Semua' 
        ? files 
        : files.filter(f => f.kategori === filterCategory);

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
            keterangan: item.keterangan || '',
            status: item.status,
            file_file: null,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editMode ? `/files/${selectedId}` : '/files';
        post(url, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus file ini?')) {
            router.delete(`/files/${id}`);
        }
    };

    const getFileIcon = (ext) => {
        const extension = ext?.toLowerCase();
        if (['pdf'].includes(extension)) return <FileType color="#ef4444" size={24} />;
        if (['doc', 'docx'].includes(extension)) return <FileText color="#3b82f6" size={24} />;
        if (['xls', 'xlsx', 'csv'].includes(extension)) return <FileSpreadsheet color="#10b981" size={24} />;
        if (['zip', 'rar', '7z'].includes(extension)) return <FileArchive color="#8b5cf6" size={24} />;
        return <FileIcon color="#94a3b8" size={24} />;
    };

    return (
        <DashboardLayout>
            <Head title="Pusat Unduhan Berkas Desa" />

            <div className="content-header">
                <div className="header-info">
                    <h1>File & Dokumentasi Desa</h1>
                    <p>Kelola dokumen publik, peraturan desa, dan formulir layanan warga.</p>
                </div>
                <button onClick={openCreateModal} className="btn-add">
                    <Plus size={20} />
                    Unggah File Baru
                </button>
            </div>

            <div className="filter-scroll">
                <div className="filter-tabs">
                    <button className={filterCategory === 'Semua' ? 'active' : ''} onClick={() => setFilterCategory('Semua')}>Semua Berkas</button>
                    {categories.map(cat => (
                        <button key={cat} className={filterCategory === cat ? 'active' : ''} onClick={() => setFilterCategory(cat)}>{cat}</button>
                    ))}
                </div>
            </div>

            <div className="file-grid">
                {filteredFiles.length > 0 ? (
                    filteredFiles.map((item) => (
                        <div key={item.id} className="file-card">
                            <div className="file-card-top">
                                <div className="file-icon-wrapper">
                                    {getFileIcon(item.tipe_file)}
                                </div>
                                <div className="file-status">
                                    <span className={`status-dot ${item.status}`}></span>
                                    {item.status}
                                </div>
                            </div>
                            <div className="file-card-body">
                                <span className="category-label">{item.kategori}</span>
                                <h3>{item.judul}</h3>
                                <p className="file-meta">{item.tipe_file.toUpperCase()} • {item.ukuran_file}</p>
                            </div>
                            <div className="file-card-footer">
                                <div className="download-info">
                                    <Download size={14} />
                                    <span>{item.download_count} unduhan</span>
                                </div>
                                <div className="card-actions">
                                    <button onClick={() => openEditModal(item)} className="action-btn edit"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(item.id)} className="action-btn delete"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <Files size={64} color="#e2e8f0" />
                        <h3>Belum ada file di kategori ini</h3>
                        <p>Unggah dokumen agar warga dapat mengaksesnya secara online.</p>
                    </div>
                )}
            </div>

            {/* Modal Form */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={editMode ? 'Edit Dokumen' : 'Unggah Dokumen Baru'}>
                <form onSubmit={handleSubmit} className="premium-form">
                    <div className="input-group">
                        <label>Judul Dokumen</label>
                        <input type="text" value={data.judul} onChange={e => setData('judul', e.target.value)} placeholder="Contoh: PerDes No 5 Tahun 2023 tentang Dana Desa" />
                        {errors.judul && <span className="error">{errors.judul}</span>}
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Kategori</label>
                            <select value={data.kategori} onChange={e => setData('kategori', e.target.value)}>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Status Publikasi</label>
                            <select value={data.status} onChange={e => setData('status', e.target.value)}>
                                <option value="publik">Publik (Dapat diunduh)</option>
                                <option value="draft">Draft (Hanya Admin)</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Keterangan Tambahan (Opsional)</label>
                        <textarea rows="2" value={data.keterangan} onChange={e => setData('keterangan', e.target.value)} placeholder="Berikan catatan singkat tentang isi dokumen ini..."></textarea>
                    </div>

                    <div className="input-group">
                        <label>Pilih File</label>
                        <div className="upload-container">
                            <input type="file" id="file_file" onChange={e => setData('file_file', e.target.files[0])} />
                            <label htmlFor="file_file">
                                {data.file_file ? (
                                    <div className="file-selected"><Check size={20} /> <span>{data.file_file.name}</span></div>
                                ) : (
                                    <div className="file-placeholder"><Upload size={24} /> <span>Klik atau seret file ke sini</span></div>
                                )}
                            </label>
                        </div>
                        <p className="helper-text">Maksimal ukuran file: 10MB</p>
                        {errors.file_file && <span className="error">{errors.file_file}</span>}
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">Batal</button>
                        <button type="submit" disabled={processing} className="btn-save">
                            {processing ? 'Mengunggah...' : (
                                <>
                                    <Save size={18} />
                                    Simpan Berkas
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

                .btn-add { background: #3b82f6; color: white; padding: 12px 24px; border-radius: 12px; border: none; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25); }
                .btn-add:hover { background: #2563eb; transform: translateY(-2px); }

                .filter-scroll { margin-bottom: 24px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
                .filter-scroll::-webkit-scrollbar { display: none; }
                .filter-tabs { display: flex; gap: 8px; white-space: nowrap; }
                .filter-tabs button { padding: 8px 16px; border-radius: 20px; border: 1px solid #e2e8f0; background: white; color: #64748b; font-weight: 600; cursor: pointer; transition: 0.2s; }
                .filter-tabs button.active { background: #1e293b; color: white; border-color: #1e293b; }

                .file-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
                .file-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; transition: 0.2s; display: flex; flex-direction: column; }
                .file-card:hover { border-color: #3b82f6; transform: translateY(-4px); box-shadow: 0 15px 30px -10px rgba(0,0,0,0.05); }

                .file-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
                .file-icon-wrapper { background: #f8fafc; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
                .file-status { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 600; color: #64748b; text-transform: capitalize; }
                .status-dot { width: 6px; height: 6px; border-radius: 50%; }
                .status-dot.publik { background: #10b981; }
                .status-dot.draft { background: #f59e0b; }

                .file-card-body { flex: 1; margin-bottom: 20px; }
                .category-label { font-size: 0.7rem; font-weight: 700; color: #3b82f6; text-transform: uppercase; margin-bottom: 4px; display: block; }
                .file-card-body h3 { font-size: 1rem; font-weight: 700; color: #1e293b; line-height: 1.4; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .file-meta { font-size: 0.8rem; color: #94a3b8; font-weight: 500; }

                .file-card-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid #f1f5f9; }
                .download-info { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #64748b; font-weight: 600; }
                .card-actions { display: flex; gap: 8px; }
                .action-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; color: #64748b; }
                .action-btn.edit:hover { color: #3b82f6; border-color: #3b82f6; background: #eff6ff; }
                .action-btn.delete:hover { color: #ef4444; border-color: #ef4444; background: #fef2f2; }

                /* Form Styles */
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .input-group { margin-bottom: 20px; }
                .input-group label { display: block; font-weight: 700; font-size: 0.85rem; color: #475569; margin-bottom: 8px; }
                .input-group input, .input-group select, .input-group textarea { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc; transition: 0.2s; }
                .input-group input:focus, .input-group select:focus, .input-group textarea:focus { border-color: #3b82f6; background: white; outline: none; }

                .upload-container input { display: none; }
                .upload-container label { display: block; padding: 24px; border: 2px dashed #e2e8f0; border-radius: 12px; cursor: pointer; text-align: center; color: #94a3b8; transition: 0.2s; }
                .upload-container label:hover { border-color: #3b82f6; background: #f0f7ff; color: #3b82f6; }
                .file-selected { color: #10b981; font-weight: 700; display: flex; flex-direction: column; align-items: center; gap: 8px; }
                .file-placeholder { display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; }
                .helper-text { font-size: 0.75rem; color: #94a3b8; margin-top: 4px; }

                .modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding-top: 24px; border-top: 1px solid #f1f5f9; }
                .btn-cancel { padding: 10px 20px; background: white; border: 1px solid #e2e8f0; border-radius: 10px; font-weight: 600; color: #64748b; cursor: pointer; }
                .btn-save { padding: 10px 20px; background: #3b82f6; border: none; border-radius: 10px; font-weight: 600; color: white; cursor: pointer; display: flex; align-items: center; gap: 8px; }

                .empty-state { padding: 80px; text-align: center; color: #94a3b8; grid-column: 1 / -1; }
                .error { color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block; }
            `}</style>
        </DashboardLayout>
    );
}

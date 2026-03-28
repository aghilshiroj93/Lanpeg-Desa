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
    Home,
    ArrowUpDown,
    Check,
    Phone,
    Info
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
                    background: white; border-radius: 20px; width: 100%; max-width: 700px;
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

export default function LembagaIndex({ lembaga }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        singkatan: '',
        logo_file: null,
        deskripsi: '',
        tugas_fungsi: '',
        kontak: '',
        urutan: 0,
        status: 'aktif',
    });

    const openCreateModal = () => {
        setEditMode(false);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditMode(true);
        setSelectedId(item.id);
        setData({
            nama: item.nama,
            singkatan: item.singkatan || '',
            logo_file: null,
            deskripsi: item.deskripsi || '',
            tugas_fungsi: item.tugas_fungsi || '',
            kontak: item.kontak || '',
            urutan: item.urutan,
            status: item.status,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editMode ? `/lembaga/${selectedId}` : '/lembaga';
        post(url, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data lembaga ini?')) {
            router.delete(`/lembaga/${id}`);
        }
    };

    return (
        <DashboardLayout>
            <Head title="Lembaga Desa" />

            <div className="content-header">
                <div className="header-info">
                    <h1>Lembaga Desa</h1>
                    <p>Atur data lembaga kemasyarakatan yang ada di desa (BPD, LPM, PKK, dsb).</p>
                </div>
                <button onClick={openCreateModal} className="btn-add">
                    <Plus size={20} />
                    Tambah Lembaga
                </button>
            </div>

            <div className="table-card">
                <div className="table-container">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th width="70">Logo</th>
                                <th>Nama Lembaga</th>
                                <th>Singkatan</th>
                                <th>Kontak</th>
                                <th width="100">Status</th>
                                <th width="120">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lembaga.length > 0 ? (
                                lembaga.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="logo-box">
                                                {item.logo ? (
                                                    <img src={`/storage/${item.logo}`} alt={item.nama} />
                                                ) : (
                                                    <Home size={20} color="#94a3b8" />
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="name-text">{item.nama}</span>
                                        </td>
                                        <td>
                                            <span className="singkatan-badge">{item.singkatan || '-'}</span>
                                        </td>
                                        <td>
                                            <div className="contact-info">
                                                <Phone size={14} />
                                                {item.kontak || '-'}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-tag ${item.status}`}>
                                                {item.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="actions">
                                                <button onClick={() => openEditModal(item)} className="btn-action edit"><Edit2 size={16} /></button>
                                                <button onClick={() => handleDelete(item.id)} className="btn-action delete"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="empty-state">Data lembaga belum tersedia.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={editMode ? 'Edit Data Lembaga' : 'Tambah Lembaga Baru'}>
                <form onSubmit={handleSubmit} className="indonesian-form">
                    <div className="form-grid">
                        <div className="input-group">
                            <label>Nama Lembaga</label>
                            <input type="text" value={data.nama} onChange={e => setData('nama', e.target.value)} placeholder="Contoh: Pemberdayaan Kesejahteraan Keluarga" />
                            {errors.nama && <span className="error">{errors.nama}</span>}
                        </div>
                        <div className="input-group">
                            <label>Singkatan</label>
                            <input type="text" value={data.singkatan} onChange={e => setData('singkatan', e.target.value)} placeholder="Contoh: PKK" />
                        </div>
                        <div className="input-group">
                            <label>Kontak / No. Telp</label>
                            <input type="text" value={data.kontak} onChange={e => setData('kontak', e.target.value)} placeholder="Masukkan kontak lembaga..." />
                        </div>
                        <div className="input-group">
                            <label>Urutan Tampil</label>
                            <input type="number" value={data.urutan} onChange={e => setData('urutan', e.target.value)} />
                        </div>
                        <div className="input-group full">
                            <label>Status</label>
                            <select value={data.status} onChange={e => setData('status', e.target.value)}>
                                <option value="aktif">Aktif (Tampil)</option>
                                <option value="tidak aktif">Tidak Aktif (Sembunyikan)</option>
                            </select>
                        </div>
                        <div className="input-group full">
                            <label>Profil / Deskripsi</label>
                            <textarea rows="3" value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} placeholder="Jelaskan sejarah atau profil singkat lembaga..."></textarea>
                        </div>
                        <div className="input-group full">
                            <label>Tugas & Fungsi</label>
                            <textarea rows="3" value={data.tugas_fungsi} onChange={e => setData('tugas_fungsi', e.target.value)} placeholder="Sebutkan tugas dan fungsi utama lembaga..."></textarea>
                        </div>
                        <div className="input-group full">
                            <label>Logo Lembaga</label>
                            <div className="file-box">
                                <input type="file" id="logo_file" onChange={e => setData('logo_file', e.target.files[0])} />
                                <label htmlFor="logo_file">
                                    {data.logo_file ? (
                                        <div className="file-info">
                                            <Check size={20} color="#10b981" />
                                            <span>{data.logo_file.name}</span>
                                        </div>
                                    ) : (
                                        <div className="file-placeholder">
                                            <Upload size={20} />
                                            <span>Klik untuk memilih logo</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-batal">Batal</button>
                        <button type="submit" disabled={processing} className="btn-simpan">
                            {processing ? 'Proses...' : (
                                <>
                                    <Save size={18} />
                                    Simpan Perubahan
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>

            <style>{`
                .content-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; gap: 20px; }
                .header-info h1 { font-size: 2rem; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
                .header-info p { color: #64748b; font-size: 1rem; }
                
                .btn-add {
                    background: #3b82f6; color: white; padding: 12px 24px; border-radius: 12px;
                    border: none; font-weight: 600; display: flex; align-items: center; gap: 8px;
                    cursor: pointer; transition: 0.2s; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
                }
                .btn-add:hover { background: #2563eb; transform: translateY(-2px); }

                .table-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .table-container { overflow-x: auto; }
                .premium-table { width: 100%; border-collapse: collapse; }
                .premium-table th { background: #f8fafc; padding: 16px 24px; text-align: left; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #f1f5f9; }
                .premium-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
                
                .logo-box { width: 44px; height: 44px; border-radius: 12px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; overflow: hidden; }
                .logo-box img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
                
                .name-text { display: block; font-weight: 700; color: #1e293b; font-size: 1rem; }
                
                .singkatan-badge { background: #eff6ff; color: #3b82f6; padding: 4px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; }
                
                .contact-info { color: #64748b; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; }
                
                .status-tag { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
                .status-tag.aktif { background: #ecfdf5; color: #059669; }
                .status-tag.tidak.aktif { background: #fef2f2; color: #dc2626; }
                
                .actions { display: flex; gap: 8px; }
                .btn-action { width: 36px; height: 36px; border-radius: 10px; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; background: white; }
                .btn-action.edit:hover { color: #3b82f6; border-color: #3b82f6; background: #eff6ff; }
                .btn-action.delete:hover { color: #ef4444; border-color: #ef4444; background: #fef2f2; }
                
                .empty-state { text-align: center; color: #94a3b8; padding: 60px !important; }

                /* Form Design */
                .indonesian-form { display: flex; flex-direction: column; gap: 24px; }
                .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .input-group.full { grid-column: span 2; }
                .input-group label { display: block; font-weight: 600; font-size: 0.875rem; color: #475569; margin-bottom: 8px; }
                .input-group input, .input-group textarea, .input-group select { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; outline: none; transition: 0.2s; font-family: inherit; font-size: 0.95rem; }
                .input-group input:focus, .input-group textarea:focus, .input-group select:focus { border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
                
                .file-box input { display: none; }
                .file-box label { display: block; border: 2px dashed #e2e8f0; border-radius: 16px; padding: 24px; text-align: center; cursor: pointer; transition: 0.2s; }
                .file-box label:hover { border-color: #3b82f6; background: #f0f7ff; }
                .file-placeholder, .file-info { display: flex; flex-direction: column; align-items: center; gap: 8px; color: #64748b; font-size: 0.9rem; }
                
                .modal-actions { display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid #f1f5f9; padding-top: 24px; }
                .btn-batal { padding: 12px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: white; color: #64748b; font-weight: 600; cursor: pointer; }
                .btn-simpan { padding: 12px 24px; background: #3b82f6; color: white; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }
                .error { color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block; }
                
                @media (max-width: 640px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .input-group.full { grid-column: span 1; }
                }
            `}</style>
        </DashboardLayout>
    );
}

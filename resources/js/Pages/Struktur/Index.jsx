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
    User,
    ArrowUpDown,
    Check
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

export default function StrukturIndex({ aparatur }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        jabatan: '',
        nip: '',
        urutan: 0,
        status: 'aktif',
        deskripsi: '',
        foto_file: null,
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
            jabatan: item.jabatan,
            nip: item.nip || '',
            urutan: item.urutan,
            status: item.status,
            deskripsi: item.deskripsi || '',
            foto_file: null,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editMode ? `/struktur/${selectedId}` : '/struktur';
        post(url, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data aparatur ini?')) {
            router.delete(`/struktur/${id}`);
        }
    };

    return (
        <DashboardLayout>
            <Head title="Struktur Desa" />

            <div className="content-header">
                <div className="header-info">
                    <h1>Struktur Organisasi & Aparatur</h1>
                    <p>Kelola data perangkat desa, kepala desa, dan struktur organisasi desa.</p>
                </div>
                <button onClick={openCreateModal} className="btn-add">
                    <Plus size={20} />
                    Tambah Aparatur
                </button>
            </div>

            <div className="table-card">
                <div className="table-container">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th width="70">Foto</th>
                                <th>Nama Lengkap / NIP</th>
                                <th>Jabatan</th>
                                <th width="100">Urutan</th>
                                <th width="100">Status</th>
                                <th width="120">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aparatur.length > 0 ? (
                                aparatur.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="avatar">
                                                {item.foto ? (
                                                    <img src={`/storage/${item.foto}`} alt={item.nama} />
                                                ) : (
                                                    <User size={20} color="#94a3b8" />
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="name-text">{item.nama}</span>
                                            <span className="nip-text">{item.nip || 'NIP: -'}</span>
                                        </td>
                                        <td>
                                            <span className="jabatan-badge">{item.jabatan}</span>
                                        </td>
                                        <td>
                                            <div className="order-pill">
                                                <ArrowUpDown size={14} />
                                                {item.urutan}
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
                                    <td colSpan="6" className="empty-state">Data aparatur belum tersedia.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={editMode ? 'Edit Data Aparatur' : 'Tambah Aparatur Baru'}>
                <form onSubmit={handleSubmit} className="indonesian-form">
                    <div className="form-grid">
                        <div className="input-group">
                            <label>Nama Lengkap</label>
                            <input type="text" value={data.nama} onChange={e => setData('nama', e.target.value)} placeholder="Masukkan nama lengkap..." />
                            {errors.nama && <span className="error">{errors.nama}</span>}
                        </div>
                        <div className="input-group">
                            <label>Jabatan</label>
                            <input type="text" value={data.jabatan} onChange={e => setData('jabatan', e.target.value)} placeholder="Contoh: Kepala Desa, Sekretaris..." />
                            {errors.jabatan && <span className="error">{errors.jabatan}</span>}
                        </div>
                        <div className="input-group">
                            <label>NIP (Opsional)</label>
                            <input type="text" value={data.nip} onChange={e => setData('nip', e.target.value)} placeholder="Masukkan NIP jika ada..." />
                        </div>
                        <div className="input-group">
                            <label>Urutan Tampil (Prioritas)</label>
                            <input type="number" value={data.urutan} onChange={e => setData('urutan', e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Status</label>
                            <select value={data.status} onChange={e => setData('status', e.target.value)}>
                                <option value="aktif">Aktif (Tampil)</option>
                                <option value="tidak aktif">Tidak Aktif (Sembunyikan)</option>
                            </select>
                        </div>
                        <div className="input-group full">
                            <label>Deskripsi Singkat / Profil</label>
                            <textarea rows="3" value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} placeholder="Deskripsi singkat mengenai aparatur..."></textarea>
                        </div>
                        <div className="input-group full">
                            <label>Foto Formal</label>
                            <div className="file-box">
                                <input type="file" id="foto_file" onChange={e => setData('foto_file', e.target.files[0])} />
                                <label htmlFor="foto_file">
                                    {data.foto_file ? (
                                        <div className="file-info">
                                            <Check size={20} color="#10b981" />
                                            <span>{data.foto_file.name}</span>
                                        </div>
                                    ) : (
                                        <div className="file-placeholder">
                                            <Upload size={20} />
                                            <span>Klik untuk memilih foto</span>
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
                
                .avatar { width: 44px; height: 44px; border-radius: 12px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; overflow: hidden; }
                .avatar img { width: 100%; height: 100%; object-fit: cover; }
                
                .name-text { display: block; font-weight: 700; color: #1e293b; font-size: 1rem; }
                .nip-text { font-size: 0.8rem; color: #94a3b8; }
                
                .jabatan-badge { background: #eff6ff; color: #3b82f6; padding: 4px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; }
                
                .order-pill { background: #f1f5f9; color: #64748b; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; width: fit-content; }
                
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

import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    FileText, 
    Download, 
    Info, 
    CheckCircle, 
    X,
    Save,
    FileCheck,
    ClipboardList,
    HelpCircle,
    Smartphone,
    CreditCard,
    Users,
    Briefcase
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
                    animation: modalScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    max-height: 90vh; display: flex; flex-direction: column;
                }
                @keyframes modalScale {
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

export default function LayananIndex({ layanan }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        icon: 'FileText',
        deskripsi: '',
        persyaratan: '',
        prosedur: '',
        status: 'aktif',
        file_file: null,
    });

    const icons = [
        { name: 'FileText', icon: FileText },
        { name: 'FileCheck', icon: FileCheck },
        { name: 'ClipboardList', icon: ClipboardList },
        { name: 'Smartphone', icon: Smartphone },
        { name: 'CreditCard', icon: CreditCard },
        { name: 'Users', icon: Users },
        { name: 'Briefcase', icon: Briefcase },
        { name: 'HelpCircle', icon: HelpCircle },
    ];

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
            icon: item.icon || 'FileText',
            deskripsi: item.deskripsi || '',
            persyaratan: item.persyaratan || '',
            prosedur: item.prosedur || '',
            status: item.status,
            file_file: null,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editMode ? `/layanan/${selectedId}` : '/layanan';
        post(url, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus layanan ini?')) {
            router.delete(`/layanan/${id}`);
        }
    };

    const getIcon = (iconName) => {
        const found = icons.find(i => i.name === iconName);
        const IconComponent = found ? found.icon : FileText;
        return <IconComponent size={24} />;
    };

    return (
        <DashboardLayout>
            <Head title="Pusat Layanan Desa" />

            <div className="content-header">
                <div className="header-info">
                    <h1>Pusat Layanan Desa</h1>
                    <p>Kelola semua jenis layanan administrasi desa untuk warga.</p>
                </div>
                <button onClick={openCreateModal} className="btn-add">
                    <Plus size={20} />
                    Tambah Layanan
                </button>
            </div>

            <div className="services-grid">
                {layanan.length > 0 ? (
                    layanan.map((item) => (
                        <div key={item.id} className="service-card">
                            <div className="service-top">
                                <div className="service-icon">
                                    {getIcon(item.icon)}
                                </div>
                                <div className={`status-pill ${item.status}`}>
                                    {item.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                                </div>
                            </div>
                            <div className="service-body">
                                <h3>{item.nama}</h3>
                                <p>{item.deskripsi?.substring(0, 80)}...</p>
                            </div>
                            <div className="service-footer">
                                <div className="footer-links">
                                    {item.file_lampiran && (
                                        <a href={`/storage/${item.file_lampiran}`} target="_blank" className="link-download">
                                            <Download size={16} /> Formulir
                                        </a>
                                    )}
                                </div>
                                <div className="footer-actions">
                                    <button onClick={() => openEditModal(item)} className="btn-edit"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(item.id)} className="btn-delete"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <ClipboardList size={64} color="#e2e8f0" />
                        <h3>Belum ada layanan</h3>
                        <p>Mulai tambahkan jenis layanan untuk melayani warga desa.</p>
                    </div>
                )}
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={editMode ? 'Edit Layanan Desa' : 'Tambah Layanan Baru'}>
                <form onSubmit={handleSubmit} className="premium-form">
                    <div className="form-grid">
                        <div className="form-main">
                            <div className="input-group">
                                <label>Nama Layanan</label>
                                <input type="text" value={data.nama} onChange={e => setData('nama', e.target.value)} placeholder="Contoh: Pembuatan KTP / Surat Domisili" />
                                {errors.nama && <span className="error">{errors.nama}</span>}
                            </div>

                            <div className="input-group">
                                <label>Pilih Ikon Layanan</label>
                                <div className="icon-grid">
                                    {icons.map(i => (
                                        <button 
                                            key={i.name} 
                                            type="button" 
                                            className={`icon-btn ${data.icon === i.name ? 'active' : ''}`}
                                            onClick={() => setData('icon', i.name)}
                                        >
                                            <i.icon size={20} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Deskripsi Singkat</label>
                                <textarea rows="2" value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} placeholder="Berikan penjelasan singkat tentang layanan ini..."></textarea>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label>Persyaratan (List)</label>
                                    <textarea rows="4" value={data.persyaratan} onChange={e => setData('persyaratan', e.target.value)} placeholder="1. Fotokopi KK&#10;2. Surat Pengantar RT..."></textarea>
                                </div>
                                <div className="input-group">
                                    <label>Alur / Prosedur</label>
                                    <textarea rows="4" value={data.prosedur} onChange={e => setData('prosedur', e.target.value)} placeholder="Melapor ke Ketua RT, lalu bawa berkas ke kantor desa..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="form-side">
                            <div className="input-group">
                                <label>Status Layanan</label>
                                <select value={data.status} onChange={e => setData('status', e.target.value)}>
                                    <option value="aktif">Aktif (Tampil)</option>
                                    <option value="tidak aktif">Nonaktif (Sembunyikan)</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Upload Formulir (Opsional)</label>
                                <div className="file-upload-box">
                                    <input type="file" id="file_file" onChange={e => setData('file_file', e.target.files[0])} />
                                    <label htmlFor="file_file">
                                        {data.file_file ? (
                                            <div className="file-ready"><CheckCircle size={20} /> <span>{data.file_file.name}</span></div>
                                        ) : (
                                            <div className="file-placeholder"><Download size={24} /> <span>Pilih Berkas</span></div>
                                        )}
                                    </label>
                                </div>
                                <p className="helper-text">Format: PDF, DOC, XLS (Max 5MB)</p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">Batal</button>
                        <button type="submit" disabled={processing} className="btn-save">
                            {processing ? 'Menyimpan...' : (
                                <>
                                    <Save size={18} />
                                    Simpan Layanan
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

                .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
                .service-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 24px; transition: 0.3s; position: relative; }
                .service-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); border-color: #3b82f6; }

                .service-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
                .service-icon { background: #eff6ff; color: #3b82f6; width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
                .status-pill { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; }
                .status-pill.aktif { background: #ecfdf5; color: #059669; }
                .status-pill.tidak.aktif { background: #fef2f2; color: #ef4444; }

                .service-body h3 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
                .service-body p { color: #64748b; font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px; }

                .service-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid #f1f5f9; }
                .link-download { color: #3b82f6; font-size: 0.85rem; font-weight: 700; display: flex; align-items: center; gap: 6px; text-decoration: none; }
                
                .footer-actions { display: flex; gap: 8px; }
                .footer-actions button { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; color: #64748b; }
                .footer-actions .btn-edit:hover { color: #3b82f6; border-color: #3b82f6; background: #eff6ff; }
                .footer-actions .btn-delete:hover { color: #ef4444; border-color: #ef4444; background: #fef2f2; }

                /* Form UI */
                .premium-form { display: flex; flex-direction: column; gap: 24px; }
                .form-grid { display: grid; grid-template-columns: 1fr 240px; gap: 32px; }
                .form-main, .form-side { display: flex; flex-direction: column; gap: 20px; }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

                .input-group label { display: block; font-weight: 700; font-size: 0.85rem; color: #475569; margin-bottom: 8px; }
                .input-group input, .input-group select, .input-group textarea { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc; transition: 0.2s; }
                .input-group input:focus, .input-group select:focus, .input-group textarea:focus { border-color: #3b82f6; background: white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); outline: none; }

                .icon-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
                .icon-btn { height: 44px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; cursor: pointer; color: #64748b; transition: 0.2s; display: flex; align-items: center; justify-content: center; }
                .icon-btn:hover { border-color: #3b82f6; color: #3b82f6; }
                .icon-btn.active { background: #3b82f6; border-color: #3b82f6; color: white; }

                .file-upload-box input { display: none; }
                .file-upload-box label { display: block; padding: 20px; border: 2px dashed #e2e8f0; border-radius: 14px; background: #f8fafc; cursor: pointer; transition: 0.2s; text-align: center; }
                .file-upload-box label:hover { border-color: #3b82f6; background: #f0f7ff; }
                .file-placeholder { color: #94a3b8; display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 0.8rem; font-weight: 700; }
                .file-ready { color: #10b981; display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 0.8rem; font-weight: 700; }

                .modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding-top: 24px; border-top: 1px solid #f1f5f9; }
                .btn-cancel { padding: 12px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: white; color: #64748b; font-weight: 600; cursor: pointer; }
                .btn-save { padding: 12px 24px; background: #3b82f6; color: white; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }
                
                .error { color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block; }
                .empty-state { padding: 80px; text-align: center; color: #94a3b8; grid-column: 1 / -1; }

                @media (max-width: 768px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .form-row { grid-template-columns: 1fr; }
                }
            `}</style>
        </DashboardLayout>
    );
}

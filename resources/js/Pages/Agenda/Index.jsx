import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    Calendar, 
    Clock, 
    MapPin, 
    User, 
    Save, 
    X, 
    Upload,
    CheckCircle,
    AlertCircle,
    Check,
    ChevronRight,
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
                    background: white; border-radius: 24px; width: 100%; max-width: 800px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    animation: modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    max-height: 95vh; display: flex; flex-direction: column;
                }
                @keyframes modalIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .modal-header { padding: 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
                .modal-title { font-size: 1.25rem; font-weight: 800; color: #1e293b; }
                .btn-close { border: none; background: #f1f5f9; color: #64748b; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
                .btn-close:hover { background: #e2e8f0; color: #1e293b; }
                .modal-body { padding: 24px; overflow-y: auto; }
            `}</style>
        </div>
    );
};

export default function AgendaIndex({ agenda }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: '',
        deskripsi: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        lokasi: '',
        penanggung_jawab: '',
        status: 'mendatang',
        poster_file: null,
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
            judul: item.judul,
            deskripsi: item.deskripsi || '',
            tanggal_mulai: item.tanggal_mulai ? item.tanggal_mulai.substring(0, 16) : '',
            tanggal_selesai: item.tanggal_selesai ? item.tanggal_selesai.substring(0, 16) : '',
            lokasi: item.lokasi || '',
            penanggung_jawab: item.penanggung_jawab || '',
            status: item.status,
            poster_file: null,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editMode ? `/agenda/${selectedId}` : '/agenda';
        post(url, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus agenda ini?')) {
            router.delete(`/agenda/${id}`);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredAgenda = agenda.filter(item => 
        item.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <Head title="Kalender Agenda Desa" />

            <div className="content-header">
                <div className="header-info">
                    <h1>Agenda & Kegiatan Desa</h1>
                    <p>Atur jadwal kegiatan, rapat desa, dan event kemasyarakatan.</p>
                </div>
                <div className="header-actions">
                    <div className="search-box">
                        <Search size={18} />
                        <input 
                            type="text" 
                            placeholder="Cari agenda..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button onClick={openCreateModal} className="btn-add">
                        <Plus size={20} />
                        Tambah Agenda
                    </button>
                </div>
            </div>

            <div className="agenda-list">
                {filteredAgenda.length > 0 ? (
                    filteredAgenda.map((item) => (
                        <div key={item.id} className="agenda-item">
                            <div className="agenda-date-box">
                                <span className="day">{new Date(item.tanggal_mulai).getDate()}</span>
                                <span className="month">{new Date(item.tanggal_mulai).toLocaleDateString('id-ID', { month: 'short' })}</span>
                            </div>
                            <div className="agenda-info">
                                <div className="info-top">
                                    <span className={`status-badge ${item.status}`}>{item.status}</span>
                                    <h3>{item.judul}</h3>
                                </div>
                                <div className="info-details">
                                    <div className="detail"><Clock size={14} /> {formatDate(item.tanggal_mulai)}</div>
                                    <div className="detail"><MapPin size={14} /> {item.lokasi || 'Lokasi Belum Ditentukan'}</div>
                                    <div className="detail"><User size={14} /> {item.penanggung_jawab || '-'}</div>
                                </div>
                            </div>
                            <div className="agenda-actions">
                                <button onClick={() => openEditModal(item)} className="btn-circle edit"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(item.id)} className="btn-circle delete"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <Calendar size={64} color="#e2e8f0" />
                        <h3>Belum ada agenda</h3>
                        <p>Jadwalkan kegiatan desa Anda di sini agar warga tetap terinformasi.</p>
                    </div>
                )}
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={editMode ? 'Edit Agenda Kegiatan' : 'Buat Agenda Baru'}>
                <form onSubmit={handleSubmit} className="premium-form">
                    <div className="form-grid">
                        <div className="form-main">
                            <div className="input-group">
                                <label>Nama Kegiatan / Agenda</label>
                                <input type="text" value={data.judul} onChange={e => setData('judul', e.target.value)} placeholder="Contoh: Rapat Koordinasi Dusun III" />
                                {errors.judul && <span className="error">{errors.judul}</span>}
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label>Waktu Mulai</label>
                                    <input type="datetime-local" value={data.tanggal_mulai} onChange={e => setData('tanggal_mulai', e.target.value)} />
                                    {errors.tanggal_mulai && <span className="error">{errors.tanggal_mulai}</span>}
                                </div>
                                <div className="input-group">
                                    <label>Waktu Selesai (Opsional)</label>
                                    <input type="datetime-local" value={data.tanggal_selesai} onChange={e => setData('tanggal_selesai', e.target.value)} />
                                    {errors.tanggal_selesai && <span className="error">{errors.tanggal_selesai}</span>}
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Lokasi Kegiatan</label>
                                <input type="text" value={data.lokasi} onChange={e => setData('lokasi', e.target.value)} placeholder="Contoh: Balai Desa / Lapangan Voli" />
                            </div>

                            <div className="input-group">
                                <label>Deskripsi / Detail Acara</label>
                                <textarea rows="3" value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} placeholder="Tulis rincian acara atau agenda rapat..."></textarea>
                            </div>
                        </div>

                        <div className="form-side">
                            <div className="input-group">
                                <label>Penanggung Jawab</label>
                                <input type="text" value={data.penanggung_jawab} onChange={e => setData('penanggung_jawab', e.target.value)} placeholder="Nama PIC" />
                            </div>

                            <div className="input-group">
                                <label>Status Agenda</label>
                                <select value={data.status} onChange={e => setData('status', e.target.value)}>
                                    <option value="mendatang">Akan Datang</option>
                                    <option value="berlangsung">Berlangsung</option>
                                    <option value="selesai">Selesai</option>
                                    <option value="batal">Dibatalkan</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Poster / Banner (Opsional)</label>
                                <div className="poster-upload">
                                    <input type="file" id="poster_file" onChange={e => setData('poster_file', e.target.files[0])} />
                                    <label htmlFor="poster_file">
                                        {data.poster_file ? (
                                            <div className="file-box active"><Check size={20} /> <span>{data.poster_file.name}</span></div>
                                        ) : (
                                            <div className="file-box"><Upload size={24} /> <span>Pilih Gambar</span></div>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">Batal</button>
                        <button type="submit" disabled={processing} className="btn-save">
                            {processing ? 'Menyimpan...' : (
                                <>
                                    <Save size={18} />
                                    Simpan Agenda
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>

            <style>{`
                .content-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; gap: 24px; }
                .header-info h1 { font-size: 2.2rem; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
                .header-info p { color: #64748b; font-size: 1.1rem; }
                
                .header-actions { display: flex; gap: 16px; align-items: center; }
                .search-box { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0 16px; display: flex; align-items: center; gap: 12px; height: 48px; width: 260px; color: #94a3b8; }
                .search-box input { border: none; background: transparent; outline: none; width: 100%; color: #1e293b; }
                
                .btn-add { background: #3b82f6; color: white; padding: 12px 24px; border-radius: 12px; border: none; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25); height: 48px; }
                .btn-add:hover { background: #2563eb; transform: translateY(-2px); }

                .agenda-list { display: flex; flex-direction: column; gap: 16px; }
                .agenda-item { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 20px; display: flex; align-items: center; gap: 24px; transition: 0.3s; }
                .agenda-item:hover { transform: scale(1.01); border-color: #3b82f6; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); }

                .agenda-date-box { width: 70px; height: 70px; background: #eff6ff; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #3b82f6; }
                .agenda-date-box .day { font-size: 1.5rem; font-weight: 800; line-height: 1; }
                .agenda-date-box .month { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }

                .agenda-info { flex: 1; }
                .info-top { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
                .info-top h3 { font-size: 1.15rem; font-weight: 800; color: #1e293b; margin: 0; }
                
                .status-badge { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; }
                .status-badge.mendatang { background: #eff6ff; color: #3b82f6; }
                .status-badge.berlangsung { background: #ecfdf5; color: #059669; }
                .status-badge.selesai { background: #f1f5f9; color: #64748b; }
                .status-badge.batal { background: #fef2f2; color: #ef4444; }

                .info-details { display: flex; gap: 20px; flex-wrap: wrap; }
                .detail { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: #64748b; }

                .agenda-actions { display: flex; gap: 8px; }
                .btn-circle { width: 36px; height: 36px; border-radius: 50%; border: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; color: #64748b; }
                .btn-circle.edit:hover { background: #eff6ff; border-color: #3b82f6; color: #3b82f6; }
                .btn-circle.delete:hover { background: #fef2f2; border-color: #ef4444; color: #ef4444; }

                /* Form UI */
                .premium-form { display: flex; flex-direction: column; gap: 24px; }
                .form-grid { display: grid; grid-template-columns: 1fr 240px; gap: 32px; }
                .form-main, .form-side { display: flex; flex-direction: column; gap: 20px; }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

                .input-group label { display: block; font-weight: 700; font-size: 0.85rem; color: #475569; margin-bottom: 8px; }
                .input-group input, .input-group select, .input-group textarea { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc; transition: 0.2s; font-family: inherit; }
                .input-group input:focus, .input-group select:focus, .input-group textarea:focus { border-color: #3b82f6; background: white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); outline: none; }

                .poster-upload input { display: none; }
                .poster-upload .file-box { height: 120px; border: 2px dashed #e2e8f0; border-radius: 16px; background: #f8fafc; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: 0.2s; text-align: center; padding: 12px; }
                .poster-upload .file-box:hover { border-color: #3b82f6; background: #f0f7ff; }
                .poster-upload .file-box.active { color: #10b981; border-color: #10b981; background: #ecfdf5; }
                .poster-upload .file-box span { font-size: 0.75rem; font-weight: 700; }

                .modal-footer { display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid #f1f5f9; padding-top: 24px; }
                .btn-cancel { padding: 12px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: white; color: #64748b; font-weight: 600; cursor: pointer; }
                .btn-save { padding: 12px 24px; background: #3b82f6; color: white; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }
                
                .error { color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block; }
                .empty-state { padding: 100px; text-align: center; color: #94a3b8; }
                
                @media (max-width: 768px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .agenda-item { flex-direction: column; align-items: flex-start; }
                    .agenda-actions { width: 100%; justify-content: flex-end; }
                }
            `}</style>
        </DashboardLayout>
    );
}

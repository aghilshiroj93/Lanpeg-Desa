import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, 
    Printer, 
    Trash2, 
    FileText, 
    Search, 
    X, 
    Save, 
    User, 
    CheckCircle,
    Calendar,
    Clock,
    FileSearch,
    ChevronRight,
    SearchCode,
    Users
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
                    background: white; border-radius: 20px; width: 100%; max-width: 600px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    animation: modalIn 0.3s ease-out;
                    max-height: 90vh; display: flex; flex-direction: column;
                }
                @keyframes modalIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .modal-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
                .modal-title { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
                .btn-close { border: none; background: none; color: #94a3b8; cursor: pointer; }
                .modal-body { padding: 24px; overflow-y: auto; }
            `}</style>
        </div>
    );
};

export default function SuratIndex({ surats, penduduks, village_profile }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchWarga, setSearchWarga] = useState('');
    const [selectedWarga, setSelectedWarga] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        penduduk_id: '',
        jenis_surat: 'Surat Keterangan Tidak Mampu (SKTM)',
        keperluan: '',
        nomor_surat: `400/${Math.floor(Math.random() * 1000)}/DS/${new Date().getFullYear()}`,
        tanggal_surat: new Date().toISOString().split('T')[0],
    });

    const suratTypes = [
        'Surat Keterangan Tidak Mampu (SKTM)',
        'Surat Keterangan Domisili',
        'Surat Keterangan Usaha (SKU)',
        'Surat Keterangan Kematian',
        'Surat Keterangan Kelahiran',
        'Surat Pengantar Pindah',
        'Surat Keterangan Catatan Kepolisian',
    ];

    const filteredWarga = searchWarga.length > 2 
        ? penduduks.filter(p => p.nama_lengkap.toLowerCase().includes(searchWarga.toLowerCase()) || p.nik.includes(searchWarga))
        : [];

    const handleSelectWarga = (warga) => {
        setSelectedWarga(warga);
        setData('penduduk_id', warga.id);
        setSearchWarga('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/surat', {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
                setSelectedWarga(null);
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus arsip surat ini?')) {
            router.delete(`/surat/${id}`);
        }
    };

    const handlePrint = (id) => {
        window.open(`/surat/print/${id}`, '_blank');
    };

    return (
        <DashboardLayout>
            <Head title="Administrasi Surat Desa" />

            <div className="content-header">
                <div className="header-info">
                    <h1>Layanan Surat Menyurat</h1>
                    <p>Terbitkan berbagai surat keterangan desa secara otomatis dan cepat.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-add">
                    <Plus size={20} />
                    Buat Surat Baru
                </button>
            </div>

            <div className="surat-list-container">
                <div className="list-card">
                    <div className="card-header">
                        <h3>Arsip Dokumen Terbit</h3>
                        <div className="header-meta">{surats.length} Surat diterbitkan</div>
                    </div>
                    
                    <div className="table-wrapper">
                        <table className="surat-table">
                            <thead>
                                <tr>
                                    <th>Nomor Surat</th>
                                    <th>Nama Warga</th>
                                    <th>Jenis Surat</th>
                                    <th>Tanggal</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {surats.length > 0 ? (
                                    surats.map((surat) => (
                                        <tr key={surat.id}>
                                            <td><code>{surat.nomor_surat}</code></td>
                                            <td>
                                                <div className="warga-info">
                                                    <strong>{surat.penduduk.nama_lengkap}</strong>
                                                    <small>{surat.penduduk.nik}</small>
                                                </div>
                                            </td>
                                            <td><span className="type-badge">{surat.jenis_surat}</span></td>
                                            <td>{new Date(surat.tanggal_surat).toLocaleDateString('id-ID')}</td>
                                            <td>
                                                <div className="table-actions">
                                                    <button onClick={() => handlePrint(surat.id)} className="action-btn print" title="Cetak Surat">
                                                        <Printer size={16} /> <span>Print</span>
                                                    </button>
                                                    <button onClick={() => handleDelete(surat.id)} className="action-btn delete" title="Hapus Arsip">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="empty-row">Beum ada surat yang diterbitkan.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Terbitkan Surat Baru">
                <form onSubmit={handleSubmit} className="premium-form">
                    <div className="input-group">
                        <label>Cari Warga (Nama atau NIK)</label>
                        {selectedWarga ? (
                            <div className="selected-warga">
                                <Users size={20} color="#3b82f6" />
                                <div className="info">
                                    <strong>{selectedWarga.nama_lengkap}</strong>
                                    <span>{selectedWarga.nik} • RT {selectedWarga.rt}/RW {selectedWarga.rw} {selectedWarga.dusun}</span>
                                </div>
                                <button type="button" onClick={() => setSelectedWarga(null)} className="btn-remove-warga"><X size={16} /></button>
                            </div>
                        ) : (
                            <div className="warga-search-box">
                                <Search size={18} className="search-icon" />
                                <input 
                                    type="text" 
                                    placeholder="Ketik minimal 3 karakter untuk mencari..." 
                                    value={searchWarga}
                                    onChange={e => setSearchWarga(e.target.value)}
                                />
                                {filteredWarga.length > 0 && (
                                    <div className="search-results">
                                        {filteredWarga.map(p => (
                                            <div key={p.id} className="result-item" onClick={() => handleSelectWarga(p)}>
                                                <strong>{p.nama_lengkap}</strong>
                                                <small>{p.nik}</small>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {errors.penduduk_id && <span className="error">{errors.penduduk_id}</span>}
                    </div>

                    <div className="input-group">
                        <label>Pilih Jenis Surat</label>
                        <select value={data.jenis_surat} onChange={e => setData('jenis_surat', e.target.value)}>
                            {suratTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Nomor Surat</label>
                            <input type="text" value={data.nomor_surat} onChange={e => setData('nomor_surat', e.target.value)} />
                            {errors.nomor_surat && <span className="error">{errors.nomor_surat}</span>}
                        </div>
                        <div className="input-group">
                            <label>Tanggal Surat</label>
                            <input type="date" value={data.tanggal_surat} onChange={e => setData('tanggal_surat', e.target.value)} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Tujuan / Keperluan Surat</label>
                        <textarea rows="3" value={data.keperluan} onChange={e => setData('keperluan', e.target.value)} placeholder="Contoh: Digunakan untuk pendaftaran bantuan sosial"></textarea>
                        {errors.keperluan && <span className="error">{errors.keperluan}</span>}
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">Batal</button>
                        <button type="submit" disabled={processing} className="btn-save">
                            {processing ? 'Memproses...' : (
                                <>
                                    <FileSearch size={18} />
                                    Terbitkan Surat
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

                .btn-add { background: #1e293b; color: white; padding: 12px 24px; border-radius: 12px; border: none; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                .btn-add:hover { transform: translateY(-2px); background: #0f172a; }

                .surat-list-container { background: white; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; }
                .card-header { padding: 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
                .card-header h3 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin: 0; }
                .header-meta { font-size: 0.85rem; font-weight: 700; color: #3b82f6; background: #eff6ff; padding: 4px 12px; border-radius: 20px; }

                .surat-table { width: 100%; border-collapse: collapse; text-align: left; }
                .surat-table th { padding: 16px 24px; background: #f8fafc; font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; }
                .surat-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; font-size: 0.95rem; }

                .surat-table code { background: #f1f5f9; padding: 4px 8px; border-radius: 6px; color: #1e293b; font-weight: 600; font-family: inherit; }
                .warga-info strong { display: block; color: #1e293b; }
                .warga-info small { color: #94a3b8; font-weight: 600; }
                .type-badge { font-family: system-ui; font-size: 0.8rem; font-weight: 600; color: #475569; background: #f8fafc; padding: 4px 10px; border-radius: 6px; border: 1px solid #e2e8f0; }

                .table-actions { display: flex; gap: 8px; }
                .action-btn { height: 36px; display: flex; align-items: center; gap: 8px; border: 1px solid #e2e8f0; border-radius: 10px; background: white; cursor: pointer; padding: 0 12px; transition: 0.2s; color: #64748b; font-weight: 600; font-size: 0.85rem; }
                .action-btn.print:hover { border-color: #22c55e; color: #22c55e; background: #f0fdf4; }
                .action-btn.delete:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
                .empty-row { text-align: center; padding: 60px; color: #94a3b8; }

                /* Form UI */
                .warga-search-box { position: relative; }
                .warga-search-box .search-icon { position: absolute; left: 14px; top: 14px; color: #94a3b8; }
                .warga-search-box input { width: 100%; padding: 12px 12px 12px 42px; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc; }
                .search-results { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 12px; margin-top: 8px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); z-index: 10; max-height: 200px; overflow-y: auto; }
                .result-item { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; cursor: pointer; }
                .result-item:hover { background: #f8fafc; }
                .result-item strong { display: block; color: #1e293b; }
                .result-item small { color: #94a3b8; }

                .selected-warga { display: flex; align-items: center; gap: 16px; background: #eff6ff; border: 1px solid #3b82f6; padding: 16px; border-radius: 12px; }
                .selected-warga .info { flex: 1; }
                .selected-warga .info strong { display: block; color: #1e293b; }
                .selected-warga .info span { font-size: 0.8rem; color: #3b82f6; font-weight: 600; }
                .btn-remove-warga { background: #white; border: 1px solid #bfdbfe; color: #3b82f6; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
                
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .input-group { margin-bottom: 20px; }
                .input-group label { display: block; font-weight: 700; font-size: 0.85rem; color: #475569; margin-bottom: 8px; }
                .input-group input, .input-group select, .input-group textarea { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc; transition: 0.2s; }
                .input-group input:focus { border-color: #3b82f6; background: white; outline: none; }
                .error { color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block; }

                .modal-footer { display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid #f1f5f9; padding-top: 24px; }
                .btn-cancel { padding: 12px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: white; color: #64748b; font-weight: 600; cursor: pointer; }
                .btn-save { padding: 12px 24px; background: #3b82f6; color: white; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }
            `}</style>
        </DashboardLayout>
    );
}

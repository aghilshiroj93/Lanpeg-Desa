import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    Search, 
    Upload, 
    FileSpreadsheet, 
    PieChart, 
    Users, 
    MoreVertical,
    X,
    Save,
    QrCode as QrIcon,
    Printer,
    CheckCircle,
    MapPin,
    Calendar,
    ChevronRight,
    Download
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
                    background: white; border-radius: 20px; width: 100%; max-width: 850px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    animation: modalShift 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    max-height: 95vh; display: flex; flex-direction: column;
                }
                @keyframes modalShift {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .modal-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
                .modal-title { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
                .btn-close { border: none; background: none; color: #94a3b8; cursor: pointer; }
                .modal-body { padding: 24px; overflow-y: auto; }
            `}</style>
        </div>
    );
};

export default function PendudukIndex({ penduduk, stats }) {
    const [activeTab, setActiveTab] = useState('daftar');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [activeNik, setActiveNik] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        nik: '',
        no_kk: '',
        nama_lengkap: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: 'L',
        dusun: '',
        rt: '',
        rw: '',
        agama: 'Islam',
        pendidikan_terakhir: '',
        pekerjaan: '',
        status_perkawinan: 'Belum Kawin',
        status_penduduk: 'tetap',
    });

    const { data: importData, setData: setImportData, post: postImport, processing: importProcessing } = useForm({
        file_excel: null
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
            nik: item.nik,
            no_kk: item.no_kk,
            nama_lengkap: item.nama_lengkap,
            tempat_lahir: item.tempat_lahir,
            tanggal_lahir: item.tanggal_lahir,
            jenis_kelamin: item.jenis_kelamin,
            dusun: item.dusun || '',
            rt: item.rt || '',
            rw: item.rw || '',
            agama: item.agama || 'Islam',
            pendidikan_terakhir: item.pendidikan_terakhir || '',
            pekerjaan: item.pekerjaan || '',
            status_perkawinan: item.status_perkawinan || 'Belum Kawin',
            status_penduduk: item.status_penduduk,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editMode ? `/penduduk/${selectedId}` : '/penduduk';
        post(url, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data penduduk ini?')) {
            router.delete(`/penduduk/${id}`);
        }
    };

    const handleImport = (e) => {
        e.preventDefault();
        postImport('/penduduk/import', {
            onSuccess: () => setActiveTab('daftar')
        });
    };

    const openQrModal = (nik) => {
        setActiveNik(nik);
        setIsQrModalOpen(true);
    };

    const filteredPenduduk = penduduk.filter(item => 
        item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.nik.includes(searchTerm)
    );

    return (
        <DashboardLayout>
            <Head title="Manajemen Penduduk" />

            <div className="content-header">
                <div className="header-info">
                    <h1>Sistem Data Penduduk</h1>
                    <p>Kelola informasi warga, statistik kependudukan, dan arsip digital desa.</p>
                </div>
                <div className="nav-tabs">
                    <button className={activeTab === 'daftar' ? 'active' : ''} onClick={() => setActiveTab('daftar')}>
                        <Users size={18} /> Daftar Warga
                    </button>
                    <button className={activeTab === 'statistik' ? 'active' : ''} onClick={() => setActiveTab('statistik')}>
                        <PieChart size={18} /> Statistik
                    </button>
                    <button className={activeTab === 'import' ? 'active' : ''} onClick={() => setActiveTab('import')}>
                        <FileSpreadsheet size={18} /> Import Excel
                    </button>
                    <button onClick={openCreateModal} className="btn-add">
                        <Plus size={18} /> Tambah Data
                    </button>
                </div>
            </div>

            {activeTab === 'daftar' && (
                <div className="tab-content">
                    <div className="search-bar-container">
                        <Search className="search-icon" size={20} />
                        <input 
                            type="text" 
                            placeholder="Cari berdasarkan Nama atau NIK..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="table-container">
                        <table className="premium-table">
                            <thead>
                                <tr>
                                    <th>Identitas</th>
                                    <th>NIK / NO. KK</th>
                                    <th>Alamat</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPenduduk.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="resident-info">
                                                <div className={`avatar ${item.jenis_kelamin === 'L' ? 'male' : 'female'}`}>
                                                    {item.nama_lengkap.charAt(0)}
                                                </div>
                                                <div>
                                                    <span className="name">{item.nama_lengkap}</span>
                                                    <span className="gender">{item.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="id-numbers">
                                                <code>{item.nik}</code>
                                                <small>KK: {item.no_kk}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="address-info">
                                                <span>{item.dusun || '-'}</span>
                                                <small>RT {item.rt} / RW {item.rw}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${item.status_penduduk}`}>{item.status_penduduk}</span>
                                        </td>
                                        <td>
                                            <div className="action-row">
                                                <button onClick={() => openQrModal(item.nik)} title="QR Code" className="icon-btn qr"><QrIcon size={16} /></button>
                                                <button onClick={() => openEditModal(item)} title="Edit" className="icon-btn edit"><Edit2 size={16} /></button>
                                                <button onClick={() => handleDelete(item.id)} title="Hapus" className="icon-btn delete"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'statistik' && (
                <div className="tab-content">
                    <div className="stats-grid">
                        <div className="stats-card">
                            <div className="stats-label">Total Penduduk</div>
                            <div className="stats-value">{stats.total}</div>
                            <div className="stats-desc">Jiwa terdaftar</div>
                        </div>
                        <div className="stats-card male">
                            <div className="stats-label">Laki-laki</div>
                            <div className="stats-value">{stats.laki_laki}</div>
                            <div className="stats-desc">{((stats.laki_laki/stats.total)*100).toFixed(1)}% dari total</div>
                        </div>
                        <div className="stats-card female">
                            <div className="stats-label">Perempuan</div>
                            <div className="stats-value">{stats.perempuan}</div>
                            <div className="stats-desc">{((stats.perempuan/stats.total)*100).toFixed(1)}% dari total</div>
                        </div>
                    </div>
                    {/* Placeholder for real charts if needed later */}
                    <div className="chart-placeholder">
                        <p>Visualisasi data lebih mendalam akan tampil setelah data mencukupi.</p>
                    </div>
                </div>
            )}

            {activeTab === 'import' && (
                <div className="tab-content">
                    <div className="import-card">
                        <div className="import-header">
                            <FileSpreadsheet size={48} color="#3b82f6" />
                            <h3>Import Data Masal</h3>
                            <p>Gunakan template excel untuk memasukkan ribuan data warga sekaligus.</p>
                        </div>
                        <form onSubmit={handleImport} className="import-form">
                            <div className="file-drop-zone">
                                <input type="file" id="excel_file" onChange={e => setImportData('file_excel', e.target.files[0])} />
                                <label htmlFor="excel_file">
                                    {importData.file_excel ? (
                                        <div className="selected"><CheckCircle size={32} /> <span>{importData.file_excel.name} Terpilih</span></div>
                                    ) : (
                                        <div className="placeholder"><Upload size={32} /> <span>Pilih File Excel (.xlsx / .csv)</span></div>
                                    )}
                                </label>
                            </div>
                            <div className="import-actions">
                                <a href="#" className="btn-outline"><Download size={18}/> Unduh Template</a>
                                <button type="submit" disabled={importProcessing} className="btn-primary">
                                    {importProcessing ? 'Memproses...' : 'Mulai Import'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Form */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={editMode ? 'Edit Data Warga' : 'Input Warga Baru'}>
                <form onSubmit={handleSubmit} className="resident-form">
                    <div className="form-sections">
                        <div className="section">
                            <h4 className="section-title">Informasi Identitas</h4>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>NIK (No. Induk Kependudukan)</label>
                                    <input type="text" maxLength="16" value={data.nik} onChange={e => setData('nik', e.target.value)} placeholder="16 Digit NIK" />
                                    {errors.nik && <span className="error">{errors.nik}</span>}
                                </div>
                                <div className="input-group">
                                    <label>No. Kartu Keluarga</label>
                                    <input type="text" maxLength="16" value={data.no_kk} onChange={e => setData('no_kk', e.target.value)} placeholder="16 Digit No KK" />
                                    {errors.no_kk && <span className="error">{errors.no_kk}</span>}
                                </div>
                                <div className="input-group full">
                                    <label>Nama Lengkap (Sesuai KTP)</label>
                                    <input type="text" value={data.nama_lengkap} onChange={e => setData('nama_lengkap', e.target.value.toUpperCase())} placeholder="NAMA LENGKAP" />
                                </div>
                                <div className="input-group">
                                    <label>Tempat Lahir</label>
                                    <input type="text" value={data.tempat_lahir} onChange={e => setData('tempat_lahir', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Tanggal Lahir</label>
                                    <input type="date" value={data.tanggal_lahir} onChange={e => setData('tanggal_lahir', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Jenis Kelamin</label>
                                    <select value={data.jenis_kelamin} onChange={e => setData('jenis_kelamin', e.target.value)}>
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Agama</label>
                                    <select value={data.agama} onChange={e => setData('agama', e.target.value)}>
                                        <option value="Islam">Islam</option>
                                        <option value="Kristen">Kristen</option>
                                        <option value="Katolik">Katolik</option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Budha">Budha</option>
                                        <option value="Konghucu">Konghucu</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="section">
                            <h4 className="section-title">Alamat & Pekerjaan</h4>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Dusun</label>
                                    <input type="text" value={data.dusun} onChange={e => setData('dusun', e.target.value)} />
                                </div>
                                <div className="input-group micro">
                                    <label>RT</label>
                                    <input type="text" value={data.rt} onChange={e => setData('rt', e.target.value)} />
                                </div>
                                <div className="input-group micro">
                                    <label>RW</label>
                                    <input type="text" value={data.rw} onChange={e => setData('rw', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Status Perkawinan</label>
                                    <select value={data.status_perkawinan} onChange={e => setData('status_perkawinan', e.target.value)}>
                                        <option value="Belum Kawin">Belum Kawin</option>
                                        <option value="Kawin">Kawin</option>
                                        <option value="Cerai Hidup">Cerai Hidup</option>
                                        <option value="Cerai Mati">Cerai Mati</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Pekerjaan Utama</label>
                                    <input type="text" value={data.pekerjaan} onChange={e => setData('pekerjaan', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Status Penduduk</label>
                                    <select value={data.status_penduduk} onChange={e => setData('status_penduduk', e.target.value)}>
                                        <option value="tetap">Tetap (Aktif)</option>
                                        <option value="pindah">Pindah Luar</option>
                                        <option value="meninggal">Meninggal Dunia</option>
                                    </select>
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
                                    Simpan Data
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* QR Modal */}
            <Modal show={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} title="Digital Signature / QR Profile">
                <div className="qr-container">
                    <p>Scan QR Code untuk verifikasi data warga secara cepat.</p>
                    <div className="qr-box">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=NIK:${activeNik}%20|%20LANPEG-DESA`} alt="QR Code" />
                    </div>
                    <div className="qr-info">
                        <strong>NIK: {activeNik}</strong>
                        <span>Sistem Manajemen Penduduk Desa</span>
                    </div>
                    <button className="btn-print" onClick={() => window.print()}>
                        <Printer size={18} /> Print Identitas
                    </button>
                </div>
            </Modal>

            <style>{`
                .content-header { margin-bottom: 32px; }
                .header-info h1 { font-size: 2.2rem; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
                .header-info p { color: #64748b; font-size: 1.1rem; margin-bottom: 24px; }

                .nav-tabs { display: flex; gap: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 0px; align-items: center; }
                .nav-tabs button { padding: 12px 24px; border: none; background: transparent; color: #64748b; font-weight: 700; cursor: pointer; border-bottom: 3px solid transparent; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
                .nav-tabs button.active { color: #3b82f6; border-bottom-color: #3b82f6; }
                .nav-tabs .btn-add { margin-left: auto; background: #3b82f6; color: white; border-radius: 12px; height: 42px; padding: 0 16px; border-bottom: none; }
                .nav-tabs .btn-add:hover { background: #2563eb; transform: translateY(-2px); }

                .tab-content { padding-top: 24px; }

                /* Daftar Style */
                .search-bar-container { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 0 20px; display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
                .search-icon { color: #94a3b8; }
                .search-bar-container input { border: none; padding: 16px 0; width: 100%; outline: none; font-size: 1rem; }

                .table-container { background: white; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; }
                .premium-table { width: 100%; border-collapse: collapse; text-align: left; }
                .premium-table th { background: #f8fafc; padding: 16px 24px; font-weight: 700; font-size: 0.85rem; color: #475569; text-transform: uppercase; }
                .premium-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; }

                .resident-info { display: flex; align-items: center; gap: 16px; }
                .resident-info .avatar { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: white; }
                .avatar.male { background: #3b82f6; }
                .avatar.female { background: #ec4899; }
                .resident-info .name { display: block; font-weight: 700; color: #1e293b; }
                .resident-info .gender { font-size: 0.75rem; color: #64748b; }

                .id-numbers code { background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-weight: 700; color: #1e293b; }
                .id-numbers small { display: block; margin-top: 4px; color: #94a3b8; }

                .address-info span { font-weight: 600; color: #475569; display: block; }
                .address-info small { color: #94a3b8; }

                .status-badge { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; }
                .status-badge.tetap { background: #ecfdf5; color: #10b981; }
                .status-badge.pindah { background: #fffbeb; color: #f59e0b; }
                .status-badge.meninggal { background: #fef2f2; color: #ef4444; }

                .action-row { display: flex; gap: 8px; }
                .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; color: #64748b; }
                .icon-btn.qr:hover { color: #8b5cf6; border-color: #8b5cf6; background: #f5f3ff; }
                .icon-btn.edit:hover { color: #3b82f6; border-color: #3b82f6; background: #eff6ff; }
                .icon-btn.delete:hover { color: #ef4444; border-color: #ef4444; background: #fef2f2; }

                /* Stats Tab */
                .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px; }
                .stats-card { background: white; padding: 24px; border-radius: 20px; border: 1px solid #e2e8f0; position: relative; overflow: hidden; }
                .stats-label { color: #64748b; font-weight: 700; font-size: 0.9rem; margin-bottom: 8px; }
                .stats-value { font-size: 2.5rem; font-weight: 800; color: #1e293b; line-height: 1; margin-bottom: 8px; }
                .stats-desc { font-size: 0.85rem; color: #94a3b8; }
                .stats-card.male { border-left: 6px solid #3b82f6; }
                .stats-card.female { border-left: 6px solid #ec4899; }
                .chart-placeholder { height: 200px; background: #f8fafc; border: 2px dashed #e2e8f0; border-radius: 24px; display: flex; align-items: center; justify-content: center; color: #94a3b8; }

                /* Import Tab */
                .import-card { max-width: 600px; margin: 40px auto; background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 40px; text-align: center; }
                .import-header h3 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 16px 0 8px; }
                .import-header p { color: #64748b; margin-bottom: 32px; }

                .file-drop-zone input { display: none; }
                .file-drop-zone label { display: block; padding: 40px; border: 3px dashed #e2e8f0; border-radius: 20px; cursor: pointer; transition: 0.3s; }
                .file-drop-zone label:hover { border-color: #3b82f6; background: #eff6ff; }
                .file-drop-zone .placeholder { display: flex; flex-direction: column; align-items: center; gap: 12px; color: #94a3b8; font-weight: 700; }
                .file-drop-zone .selected { display: flex; flex-direction: column; align-items: center; gap: 12px; color: #10b981; font-weight: 700; }

                .import-actions { display: flex; gap: 16px; margin-top: 32px; justify-content: center; }
                .btn-outline { padding: 12px 24px; border: 1px solid #e2e8f0; border-radius: 12px; color: #475569; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 8px; }
                .btn-primary { padding: 12px 32px; background: #3b82f6; border: none; border-radius: 12px; color: white; font-weight: 700; cursor: pointer; }

                /* Form UI */
                .section { margin-bottom: 32px; }
                .section-title { font-size: 0.9rem; font-weight: 800; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 20px; }
                .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                .input-group.full { grid-column: 1 / -1; }
                .input-group.micro { grid-column: span 1 / span 1; width: 80px; }
                
                .input-group label { display: block; font-weight: 700; font-size: 0.8rem; color: #475569; margin-bottom: 8px; }
                .input-group input, .input-group select { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 500; }
                .input-group input:focus { border-color: #3b82f6; background: white; outline: none; }

                .modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding-top: 24px; border-top: 1px solid #f1f5f9; }
                .btn-cancel { padding: 12px 24px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; color: #64748b; font-weight: 700; cursor: pointer; }
                .btn-save { padding: 12px 24px; background: #3b82f6; border: none; border-radius: 12px; color: white; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }

                /* QR Styled */
                .qr-container { text-align: center; padding: 20px 0; }
                .qr-box { background: white; padding: 20px; border: 1px solid #f1f5f9; display: inline-block; border-radius: 20px; margin: 20px 0; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
                .qr-info { margin-bottom: 24px; }
                .qr-info strong { display: block; font-size: 1.25rem; }
                .btn-print { background: #1e293b; color: white; padding: 12px 24px; border-radius: 12px; border: none; font-weight: 700; display: flex; align-items: center; gap: 8px; margin: 0 auto; cursor: pointer; }

                .error { color: #ef4444; font-size: 0.75rem; margin-top: 4px; display: block; }
            `}</style>
        </DashboardLayout>
    );
}

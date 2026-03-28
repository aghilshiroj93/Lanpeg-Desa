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
    Image as ImageIcon,
    Video,
    Filter,
    Link as LinkIcon,
    Check,
    PlayCircle,
    Maximize2
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
                    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.6); 
                    backdrop-filter: blur(8px); display: flex; align-items: center; 
                    justify-content: center; z-index: 1000; padding: 20px;
                }
                .modal-container {
                    background: white; border-radius: 24px; width: 100%; max-width: 650px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    animation: modalScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    max-height: 90vh; display: flex; flex-direction: column;
                }
                @keyframes modalScale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .modal-header { padding: 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
                .modal-title { font-size: 1.25rem; font-weight: 800; color: #1e293b; }
                .btn-close { border: none; background: #f1f5f9; color: #64748b; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
                .modal-body { padding: 24px; overflow-y: auto; }
            `}</style>
        </div>
    );
};

export default function GaleriIndex({ galeri }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [filter, setFilter] = useState('all');

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: '',
        tipe: 'foto',
        kategori_album: '',
        keterangan: '',
        file_foto: null,
        url_video: '',
    });

    const filteredData = filter === 'all' 
        ? galeri 
        : galeri.filter(item => item.tipe === filter);

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
            tipe: item.tipe,
            kategori_album: item.kategori_album || '',
            keterangan: item.keterangan || '',
            file_foto: null,
            url_video: item.tipe === 'video' ? item.file_atau_url : '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editMode ? `/galeri/${selectedId}` : '/galeri';
        post(url, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus dokumentasi ini?')) {
            router.delete(`/galeri/${id}`);
        }
    };

    const getYoutubeID = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <DashboardLayout>
            <Head title="Galeri & Dokumentasi" />

            <div className="content-header">
                <div className="header-info">
                    <h1>Galeri & Dokumentasi</h1>
                    <p>Koleksi foto kegiatan dan video dokumentasi pembangunan desa.</p>
                </div>
                <button onClick={openCreateModal} className="btn-add">
                    <Plus size={20} />
                    Tambah Dokumentasi
                </button>
            </div>

            <div className="filter-bar">
                <div className="filter-tabs">
                    <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Semua Media</button>
                    <button className={filter === 'foto' ? 'active' : ''} onClick={() => setFilter('foto')}><ImageIcon size={16} /> Foto</button>
                    <button className={filter === 'video' ? 'active' : ''} onClick={() => setFilter('video')}><Video size={16} /> Video</button>
                </div>
            </div>

            <div className="gallery-container">
                {filteredData.length > 0 ? (
                    <div className="gallery-grid">
                        {filteredData.map((item) => (
                            <div key={item.id} className="gallery-card">
                                <div className="media-preview">
                                    {item.tipe === 'foto' ? (
                                        <img src={`/storage/${item.file_atau_url}`} alt={item.judul} />
                                    ) : (
                                        <div className="video-thumb">
                                            <img src={`https://img.youtube.com/vi/${getYoutubeID(item.file_atau_url)}/0.jpg`} alt={item.judul} />
                                            <div className="play-overlay"><PlayCircle size={48} /></div>
                                        </div>
                                    )}
                                    <div className="media-type-badge">
                                        {item.tipe === 'foto' ? <ImageIcon size={14} /> : <Video size={14} />}
                                    </div>
                                    <div className="card-hover-actions">
                                        <button onClick={() => openEditModal(item)} className="circle-btn edit"><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(item.id)} className="circle-btn delete"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                                <div className="gallery-info">
                                    <span className="album-tag">{item.kategori_album || 'Lainnya'}</span>
                                    <h3>{item.judul}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-gallery">
                        <ImageIcon size={64} color="#e2e8f0" />
                        <h3>Belum ada dokumentasi</h3>
                        <p>Kumpulkan momen berharga desa dalam satu galeri terpadu.</p>
                    </div>
                )}
            </div>

            {/* Form Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title={editMode ? 'Edit Dokumentasi' : 'Tambah Media Baru'}>
                <form onSubmit={handleSubmit} className="premium-form">
                    <div className="form-group">
                        <label>Pilih Tipe Media</label>
                        <div className="type-selector">
                            <button type="button" className={data.tipe === 'foto' ? 'active' : ''} onClick={() => setData('tipe', 'foto')}>
                                <ImageIcon size={20} /> Foto
                            </button>
                            <button type="button" className={data.tipe === 'video' ? 'active' : ''} onClick={() => setData('tipe', 'video')}>
                                <Video size={20} /> Video YouTube
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Judul Dokumentasi</label>
                        <input type="text" value={data.judul} onChange={e => setData('judul', e.target.value)} placeholder="Contoh: Kerja Bakti Dusun Maju" />
                        {errors.judul && <span className="error">{errors.judul}</span>}
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>Kategori / Nama Album</label>
                            <input type="text" value={data.kategori_album} onChange={e => setData('kategori_album', e.target.value)} placeholder="Contoh: HUT RI ke-78" />
                        </div>
                    </div>

                    {data.tipe === 'foto' ? (
                        <div className="input-group">
                            <label>Upload Foto</label>
                            <div className="upload-zone">
                                <input type="file" id="file_foto" onChange={e => setData('file_foto', e.target.files[0])} />
                                <label htmlFor="file_foto">
                                    {data.file_foto ? (
                                        <div className="selected-state"><Check size={24} /> {data.file_foto.name}</div>
                                    ) : (
                                        <div className="placeholder-state"><Upload size={32} /> Klik untuk pilih foto</div>
                                    )}
                                </label>
                            </div>
                            {errors.file_foto && <span className="error">{errors.file_foto}</span>}
                        </div>
                    ) : (
                        <div className="input-group">
                            <label>Link Video YouTube</label>
                            <div className="url-input">
                                <LinkIcon size={18} />
                                <input type="text" value={data.url_video} onChange={e => setData('url_video', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                            </div>
                            {errors.url_video && <span className="error">{errors.url_video}</span>}
                        </div>
                    )}

                    <div className="input-group">
                        <label>Keterangan Tambahan</label>
                        <textarea rows="3" value={data.keterangan} onChange={e => setData('keterangan', e.target.value)} placeholder="Tulis catatan kecil jika diperlukan..."></textarea>
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">Batal</button>
                        <button type="submit" disabled={processing} className="btn-save">
                            {processing ? 'Menyimpan...' : (
                                <>
                                    <Save size={18} />
                                    Simpan Media
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

                .filter-bar { margin-bottom: 32px; background: white; padding: 8px; border-radius: 16px; width: fit-content; border: 1px solid #e2e8f0; }
                .filter-tabs { display: flex; gap: 4px; }
                .filter-tabs button { padding: 8px 20px; border-radius: 12px; border: none; background: transparent; color: #64748b; font-weight: 600; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 8px; }
                .filter-tabs button.active { background: #3b82f6; color: white; }

                .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
                .gallery-card { background: white; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; transition: 0.3s; }
                .gallery-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
                
                .media-preview { position: relative; height: 200px; background: #f1f5f9; overflow: hidden; }
                .media-preview img { width: 100%; height: 100%; object-fit: cover; }
                
                .video-thumb { position: relative; height: 100%; }
                .play-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; opacity: 0.8; transition: 0.2s; }
                .gallery-card:hover .play-overlay { opacity: 1; transform: scale(1.1); }
                
                .media-type-badge { position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.9); padding: 6px; border-radius: 8px; color: #1e293b; display: flex; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                
                .card-hover-actions { position: absolute; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; gap: 12px; opacity: 0; transition: 0.3s; }
                .gallery-card:hover .card-hover-actions { opacity: 1; }
                
                .circle-btn { width: 44px; height: 44px; border-radius: 50%; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
                .circle-btn.edit { background: white; color: #3b82f6; }
                .circle-btn.delete { background: white; color: #ef4444; }
                .circle-btn:hover { transform: scale(1.1); }

                .gallery-info { padding: 16px; }
                .album-tag { font-size: 0.7rem; font-weight: 700; color: #3b82f6; text-transform: uppercase; background: #eff6ff; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px; display: inline-block; }
                .gallery-info h3 { font-size: 1rem; font-weight: 700; color: #1e293b; margin: 0; }

                /* Form UI */
                .type-selector { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
                .type-selector button { padding: 12px; border: 2px solid #e2e8f0; border-radius: 12px; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 600; color: #64748b; transition: 0.2s; }
                .type-selector button.active { border-color: #3b82f6; background: #eff6ff; color: #3b82f6; }

                .input-group { margin-bottom: 20px; }
                .input-group label { display: block; font-weight: 700; font-size: 0.85rem; color: #475569; margin-bottom: 8px; }
                .input-group input, .input-group textarea { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; transition: 0.2s; }
                .input-group input:focus, .input-group textarea:focus { border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); outline: none; }

                .upload-zone input { display: none; }
                .upload-zone label { display: block; padding: 40px; border: 2px dashed #e2e8f0; border-radius: 16px; text-align: center; cursor: pointer; transition: 0.2s; }
                .upload-zone label:hover { border-color: #3b82f6; background: #f8fafc; }
                .selected-state { color: #10b981; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; }
                .placeholder-state { color: #94a3b8; display: flex; flex-direction: column; align-items: center; gap: 12px; }

                .url-input { display: flex; align-items: center; gap: 12px; background: #f8fafc; padding: 0 16px; border: 1px solid #e2e8f0; border-radius: 12px; color: #94a3b8; }
                .url-input input { border: none !important; background: transparent; padding: 12px 0 !important; }

                .modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding-top: 24px; border-top: 1px solid #f1f5f9; }
                .btn-cancel { padding: 12px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: white; color: #64748b; font-weight: 600; cursor: pointer; }
                .btn-save { padding: 12px 24px; background: #3b82f6; color: white; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }
                
                .error { color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block; }
                .empty-gallery { padding: 80px; text-align: center; color: #94a3b8; grid-column: 1 / -1; }
            `}</style>
        </DashboardLayout>
    );
}

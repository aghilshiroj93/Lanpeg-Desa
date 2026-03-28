import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Phone, 
    Mail, 
    MapPin, 
    Globe, 
    Facebook, 
    Instagram, 
    Youtube, 
    Twitter, 
    Save, 
    Clock, 
    Map as MapIcon,
    Share2,
    CheckCircle
} from 'lucide-react';

export default function ContactSetting({ settings }) {
    const [activeTab, setActiveTab] = useState('kontak');

    const { data, setData, post, processing, recentlySuccessful } = useForm({
        group: activeTab === 'kontak' ? 'contact' : (activeTab === 'peta' ? 'location' : 'social'),
        settings: {
            phone: settings.phone || '',
            whatsapp: settings.whatsapp || '',
            email: settings.email || '',
            address: settings.address || '',
            office_hours: settings.office_hours || '',
            google_maps_embed: settings.google_maps_embed || '',
            facebook: settings.facebook || '',
            instagram: settings.instagram || '',
            youtube: settings.youtube || '',
            tiktok: settings.tiktok || '',
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/kontak-lokasi', {
            onSuccess: () => {
                // Keep the same tab
            }
        });
    };

    const updateSetting = (key, value) => {
        setData('settings', {
            ...data.settings,
            [key]: value
        });
    };

    return (
        <DashboardLayout>
            <Head title="Pengaturan Kontak & Lokasi" />

            <div className="content-header">
                <div className="header-info">
                    <h1>Kontak & Lokasi Desa</h1>
                    <p>Kelola nomor telepon, alamat kantor, koordinat peta, dan tautan sosial media resmi.</p>
                </div>
                {recentlySuccessful && (
                    <div className="success-toast">
                        <CheckCircle size={18} /> Pengaturan disimpan!
                    </div>
                )}
            </div>

            <div className="settings-container">
                <div className="settings-sidebar">
                    <button className={activeTab === 'kontak' ? 'active' : ''} onClick={() => setActiveTab('kontak')}>
                        <Phone size={20} /> Informasi Kontak
                    </button>
                    <button className={activeTab === 'peta' ? 'active' : ''} onClick={() => setActiveTab('peta')}>
                        <MapIcon size={20} /> Lokasi & Map
                    </button>
                    <button className={activeTab === 'sosial' ? 'active' : ''} onClick={() => setActiveTab('sosial')}>
                        <Share2 size={20} /> Sosial Media
                    </button>
                </div>

                <div className="settings-main">
                    <form onSubmit={handleSubmit} className="premium-form">
                        {activeTab === 'kontak' && (
                            <div className="form-section">
                                <h3 className="section-title">Kontak Operasional</h3>
                                <div className="input-grid">
                                    <div className="input-group">
                                        <label><Phone size={14} /> Nomor Telepon Kantor</label>
                                        <input type="text" value={data.settings.phone} onChange={e => updateSetting('phone', e.target.value)} placeholder="(0xxx) xxxxxxx" />
                                    </div>
                                    <div className="input-group">
                                        <label><Phone size={14} color="#22c55e" /> WhatsApp Center</label>
                                        <input type="text" value={data.settings.whatsapp} onChange={e => updateSetting('whatsapp', e.target.value)} placeholder="628xxxxxxxx" />
                                    </div>
                                    <div className="input-group full">
                                        <label><Mail size={14} /> Email Resmi Desa</label>
                                        <input type="email" value={data.settings.email} onChange={e => updateSetting('email', e.target.value)} placeholder="desa-contoh@lanpeg.id" />
                                    </div>
                                    <div className="input-group full">
                                        <label><MapPin size={14} /> Alamat Lengkap Kantor</label>
                                        <textarea rows="3" value={data.settings.address} onChange={e => updateSetting('address', e.target.value)} placeholder="Jl. Raya Desa No. XX, Kecamatan..."></textarea>
                                    </div>
                                    <div className="input-group full">
                                        <label><Clock size={14} /> Jam Operasional</label>
                                        <input type="text" value={data.settings.office_hours} onChange={e => updateSetting('office_hours', e.target.value)} placeholder="Senin - Jumat, 08:00 - 16:00" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'peta' && (
                            <div className="form-section">
                                <h3 className="section-title">Koordinat Google Maps</h3>
                                <div className="input-group full">
                                    <label><MapIcon size={14} /> Embed Code (iframe)</label>
                                    <textarea rows="6" value={data.settings.google_maps_embed} onChange={e => updateSetting('google_maps_embed', e.target.value)} placeholder="Paste <iframe> dari Google Maps di sini..."></textarea>
                                    <p className="helper-text">Caranya: Buka Google Maps - Pilih Lokasi - Klik Share - Pilih Embed a map - Copy HTML.</p>
                                </div>
                                {data.settings.google_maps_embed && (
                                    <div className="maps-preview">
                                        <div dangerouslySetInnerHTML={{ __html: data.settings.google_maps_embed }}></div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'sosial' && (
                            <div className="form-section">
                                <h3 className="section-title">Tautan Media Sosial</h3>
                                <div className="input-grid">
                                    <div className="input-group full">
                                        <label><Facebook size={14} color="#1877F2" /> Facebook</label>
                                        <input type="text" value={data.settings.facebook} onChange={e => updateSetting('facebook', e.target.value)} placeholder="https://facebook.com/desa-anda" />
                                    </div>
                                    <div className="input-group full">
                                        <label><Instagram size={14} color="#E4405F" /> Instagram</label>
                                        <input type="text" value={data.settings.instagram} onChange={e => updateSetting('instagram', e.target.value)} placeholder="https://instagram.com/desa-anda" />
                                    </div>
                                    <div className="input-group full">
                                        <label><Youtube size={14} color="#FF0000" /> YouTube Channel</label>
                                        <input type="text" value={data.settings.youtube} onChange={e => updateSetting('youtube', e.target.value)} placeholder="https://youtube.com/c/desa-anda" />
                                    </div>
                                    <div className="input-group full">
                                        <label><Globe size={14} color="#000" /> TikTok</label>
                                        <input type="text" value={data.settings.tiktok} onChange={e => updateSetting('tiktok', e.target.value)} placeholder="https://tiktok.com/@desa-anda" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="form-footer">
                            <button type="submit" disabled={processing} className="btn-save">
                                <Save size={18} />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
                .content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
                .header-info h1 { font-size: 2.2rem; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
                .header-info p { color: #64748b; font-size: 1.1rem; }
                
                .success-toast { background: #ecfdf5; color: #059669; padding: 12px 20px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 8px; animation: slideIn 0.3s ease-out; border: 1px solid #d1fae5; }
                @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

                .settings-container { display: grid; grid-template-columns: 280px 1fr; gap: 32px; background: white; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; min-height: 600px; }
                
                .settings-sidebar { background: #f8fafc; border-right: 1px solid #e2e8f0; padding: 24px 16px; display: flex; flex-direction: column; gap: 8px; }
                .settings-sidebar button { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 12px; border: none; background: transparent; color: #64748b; font-weight: 700; cursor: pointer; text-align: left; transition: 0.2s; }
                .settings-sidebar button:hover { background: #f1f5f9; color: #1e293b; }
                .settings-sidebar button.active { background: white; color: #3b82f6; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); }

                .settings-main { padding: 40px; }
                .section-title { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin-bottom: 32px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; }

                .input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .input-group.full { grid-column: 1 / -1; }
                .input-group label { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.85rem; color: #475569; margin-bottom: 10px; }
                .input-group input, .input-group textarea { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc; transition: 0.2s; }
                .input-group input:focus, .input-group textarea:focus { border-color: #3b82f6; background: white; outline: none; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }

                .helper-text { font-size: 0.75rem; color: #94a3b8; margin-top: 8px; }
                .maps-preview { margin-top: 24px; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; height: 300px; }
                .maps-preview iframe { width: 100% !important; height: 100% !important; border: none; }

                .form-footer { margin-top: 40px; padding-top: 32px; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; }
                .btn-save { background: #3b82f6; color: white; padding: 14px 32px; border-radius: 12px; border: none; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.2s; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25); }
                .btn-save:hover { background: #2563eb; transform: translateY(-2px); }
                .btn-save:disabled { background: #94a3b8; transform: none; box-shadow: none; cursor: not-allowed; }

                @media (max-width: 992px) {
                    .settings-container { grid-template-columns: 1fr; }
                    .settings-sidebar { flex-direction: row; border-right: none; border-bottom: 1px solid #e2e8f0; overflow-x: auto; }
                    .settings-sidebar button { white-space: nowrap; }
                }
            `}</style>
        </DashboardLayout>
    );
}

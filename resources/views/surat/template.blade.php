<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cetak {{ $surat->jenis_surat }} - {{ $surat->nomor_surat }}</title>
    <style>
        @page { size: A4; margin: 2.5cm; }
        body { font-family: 'Times New Roman', serif; line-height: 1.5; color: #000; background: #fff; margin: 0; padding: 0; }
        .container { max-width: 800px; margin: auto; }
        
        /* Kop Surat */
        .kop-surat { border-bottom: 3px double #000; padding-bottom: 10px; margin-bottom: 25px; display: flex; align-items: center; text-align: center; }
        .logo { width: 80px; height: auto; position: absolute; }
        .header-text { width: 100%; }
        .header-text h2 { margin: 0; text-transform: uppercase; font-size: 1.25rem; }
        .header-text h1 { margin: 0; text-transform: uppercase; font-size: 1.6rem; }
        .header-text p { margin: 2px 0; font-size: 0.9rem; }
        
        .judul-surat { text-align: center; margin-bottom: 30px; }
        .judul-surat h3 { text-decoration: underline; margin-bottom: 2px; text-transform: uppercase; font-size: 1.2rem; }
        .judul-surat p { margin-top: 0; font-size: 1rem; }
        
        .konten { text-align: justify; margin-bottom: 40px; }
        .data-table { margin: 15px 0 15px 40px; }
        .data-table td { padding: 3px 10px; vertical-align: top; }
        
        .penutup { margin-bottom: 50px; }
        
        .tanda-tangan { display: flex; justify-content: flex-end; text-align: center; }
        .ttd-box { width: 250px; }
        .ttd-box p { margin: 0; }
        .ttd-name { margin-top: 70px; font-weight: bold; text-decoration: underline; text-transform: uppercase; }

        @media print {
            .no-print { display: none; }
            body { padding: 0; margin: 0; }
        }

        .no-print { background: #333; padding: 10px; text-align: center; color: #fff; position: sticky; top: 0; z-index: 1000; }
        .btn-print { background: #22c55e; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; }
    </style>
</head>
<body>
    <div class="no-print">
        <button class="btn-print" onclick="window.print()">CETAK SEKARANG (CTRL + P)</button>
        <span style="margin-left: 20px;">Pastikan "Background Graphics" diaktifkan pada pengaturan Print.</span>
    </div>

    <div class="container">
        <!-- Kop Surat -->
        <div class="kop-surat">
            @if($profile && $profile->logo_desa)
                <img src="/storage/{{ $profile->logo_desa }}" class="logo" alt="Logo">
            @endif
            <div class="header-text">
                <h2>PEMERINTAH KABUPATEN {{ $profile->kabupaten ?? '........' }}</h2>
                <h2>KECAMATAN {{ $profile->kecamatan ?? '........' }}</h2>
                <h1>DESA {{ $profile->nama_desa ?? '........' }}</h1>
                <p>Alamat: {{ $profile->alamat_desa ?? '..........................................................' }} Kode Pos {{ $profile->kode_pos ?? '.....' }}</p>
                <p>Email: {{ $profile->email_desa ?? '.....' }} | Website: {{ $profile->website_desa ?? '.....' }}</p>
            </div>
        </div>

        <div class="judul-surat">
            <h3>{{ $surat->jenis_surat }}</h3>
            <p>Nomor: {{ $surat->nomor_surat }}</p>
        </div>

        <div class="konten">
            <p>Yang bertanda tangan di bawah ini Kepala Desa {{ $profile->nama_desa ?? '........' }}, Kecamatan {{ $profile->kecamatan ?? '........' }}, Kabupaten {{ $profile->kabupaten ?? '........' }}, dengan ini menerangkan bahwa:</p>
            
            <table class="data-table">
                <tr><td>Nama Lengkap</td><td>:</td><td><strong>{{ $surat->penduduk->nama_lengkap }}</strong></td></tr>
                <tr><td>NIK</td><td>:</td><td>{{ $surat->penduduk->nik }}</td></tr>
                <tr><td>Tempat/Tgl Lahir</td><td>:</td><td>{{ $surat->penduduk->tempat_lahir }}, {{ \Carbon\Carbon::parse($surat->penduduk->tanggal_lahir)->translatedFormat('d F Y') }}</td></tr>
                <tr><td>Jenis Kelamin</td><td>:</td><td>{{ $surat->penduduk->jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</td></tr>
                <tr><td>Pekerjaan</td><td>:</td><td>{{ $surat->penduduk->pekerjaan }}</td></tr>
                <tr><td>Alamat</td><td>:</td><td>RT {{ $surat->penduduk->rt }} / RW {{ $surat->penduduk->rw }} {{ $surat->penduduk->dusun }}, Desa {{ $profile->nama_desa }}</td></tr>
            </table>

            <p>Adalah benar nama tersebut di atas adalah warga Desa {{ $profile->nama_desa }} yang berdomisili pada alamat tersebut.</p>
            
            <p>Demikian surat keterangan ini diberikan untuk digunakan sebagai: <strong>{{ $surat->keperluan }}</strong>. Harap yang berkepentingan maklum dan dapat menggunakan surat ini sebagaimana mestinya.</p>
        </div>

        <div class="tanda-tangan">
            <div class="ttd-box">
                <p>{{ $profile->nama_desa }}, {{ \Carbon\Carbon::now()->translatedFormat('d F Y') }}</p>
                <p>Kepala Desa {{ $profile->nama_desa }},</p>
                
                <p class="ttd-name">------------------------------------</p>
                <p>NIP. ..................................</p>
            </div>
        </div>
    </div>
</body>
</html>

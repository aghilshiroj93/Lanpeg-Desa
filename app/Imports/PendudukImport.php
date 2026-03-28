<?php

namespace App\Imports;

use App\Models\Penduduk;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PendudukImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Penduduk([
            'nik'                 => $row['nik'],
            'no_kk'               => $row['no_kk'],
            'nama_lengkap'        => $row['nama_lengkap'],
            'tempat_lahir'        => $row['tempat_lahir'],
            'tanggal_lahir'       => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['tanggal_lahir']),
            'jenis_kelamin'       => $row['jenis_kelamin'],
            'dusun'               => $row['dusun'],
            'rt'                  => $row['rt'],
            'rw'                  => $row['rw'],
            'agama'               => $row['agama'],
            'pendidikan_terakhir' => $row['pendidikan_terakhir'],
            'pekerjaan'           => $row['pekerjaan'],
            'status_perkawinan'   => $row['status_perkawinan'],
            'status_penduduk'     => 'tetap',
        ]);
    }
}

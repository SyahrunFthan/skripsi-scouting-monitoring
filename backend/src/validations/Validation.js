const { z } = require("zod");

class Validation {
  static schemaActivities = z.object({
    name: z.string().min(1, { message: "Nama kegiatan harus di isi!" }),
    point: z.string().min(1, { message: "Point harus di isi!" }),
    scale: z.string().min(1, { message: "Skala kegiatan harus di isi!" }),
  });

  static schemaSchools = z.object({
    name: z.string().min(1, { message: "Nama sekolah harus di isi!" }),
    address: z.string().min(1, { message: "Alamat sekolah harus di isi" }),
    total: z.string().min(1, { message: "Jumlah anggota harus di isi!" }),
    noGudep: z.string().min(1, { message: "Nomor Gudep harus di isi!" }),
  });

  static schemaContributions = z.object({
    school: z.string().min(1, { message: "Pilih sekolah!" }),
    activity: z.string().min(1, { message: "Pilih kegiatan!" }),
  });
}

module.exports = Validation;

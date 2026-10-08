export interface ProjectPhase {
  id: string;
  name: string;
  weight: number; // Persentase bobot keseluruhan (e.g. 20%)
  progress: number; // Persentase selesai (0-100)
  status: "selesai" | "proses" | "belum";
  startDate: string;
  endDate: string;
  notes?: string;
}

export interface ProjectDailyLog {
  id: string;
  date: string;
  phaseName: string;
  title: string;
  description: string;
  workerCount: number;
  weather: "Cerah" | "Berawan" | "Hujan Ringan" | "Hujan Lebat";
  photos: string[];
}

export interface PaymentMilestone {
  id: string;
  termNumber: number;
  name: string;
  percentage: number;
  amount: number;
  triggerProgress: number; // Dibayar saat progres mencapai X%
  status: "lunas" | "menunggu" | "belum";
  dueDate: string;
  paidDate?: string;
  invoiceNumber: string;
}

export interface ProjectContract {
  spkNumber: string;
  spkDate: string;
  contractValue: number;
  downPayment: number;
  retentionPercent: number; // Masa retensi (e.g. 5%)
  warrantyMonths: number; // Garansi kebocoran / struktur (e.g. 6 bulan)
  firstPartyName: string; // Klien
  firstPartyKtp?: string;
  firstPartyPhone: string;
  firstPartyAddress: string;
  secondPartyName: string; // Kontraktor
  secondPartyRole: string;
  secondPartyCompany: string;
  secondPartyPhone: string;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
}

export interface ProjectItem {
  id: string;
  projectCode: string; // e.g. "IS-2025-001"
  clientName: string;
  clientPhone: string;
  projectName: string;
  projectCategory: "Bangun Rumah Baru" | "Renovasi Total" | "Renovasi Interior" | "Komersial / Ruko";
  location: string;
  buildingArea: string; // e.g. "220 m² (2 Lantai)"
  startDate: string;
  targetEndDate: string;
  actualEndDate?: string;
  supervisorName: string;
  supervisorPhone: string;
  status: "persiapan" | "pengerjaan" | "finishing" | "serah_terima" | "selesai";
  overallProgress: number; // 0 - 100
  featuredImage: string;
  contract: ProjectContract;
  phases: ProjectPhase[];
  logs: ProjectDailyLog[];
  milestones: PaymentMilestone[];
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    projectCode: "IS-2025-001",
    clientName: "Bpk. Hendra Gunawan",
    clientPhone: "0812-9876-5432",
    projectName: "Renovasi Total & Penambahan Lantai 2",
    projectCategory: "Renovasi Total",
    location: "Cluster Greenwich Park, BSD City, Tangerang Selatan",
    buildingArea: "220 m² (2 Lantai)",
    startDate: "2025-01-10",
    targetEndDate: "2025-05-25",
    supervisorName: "Ir. Bambang Sugiarto",
    supervisorPhone: "0812-8996-9933",
    status: "finishing",
    overallProgress: 78,
    featuredImage: "/image/rumah1.jpg",
    contract: {
      spkNumber: "SPK/IS/2025/01/014",
      spkDate: "2025-01-08",
      contractValue: 435000000,
      downPayment: 130500000,
      retentionPercent: 5,
      warrantyMonths: 6,
      firstPartyName: "Bpk. Hendra Gunawan",
      firstPartyKtp: "3674051208850003",
      firstPartyPhone: "0812-9876-5432",
      firstPartyAddress: "Greenwich Park Blok C7 No. 12, BSD City, Tangerang Selatan",
      secondPartyName: "Mukti Wibowo, S.T.",
      secondPartyRole: "Direktur Operasional",
      secondPartyCompany: "CV. Imperial Serpong Perkasa",
      secondPartyPhone: "0812-8996-9933",
      bankName: "BCA Kantor Cabang BSD",
      bankAccount: "883-092-1144",
      bankHolder: "CV IMPERIAL SERPONG PERKASA",
    },
    phases: [
      {
        id: "ph-1",
        name: "Pekerjaan Pembongkaran, Pondasi Footplate & Sloof",
        weight: 20,
        progress: 100,
        status: "selesai",
        startDate: "2025-01-10",
        endDate: "2025-02-05",
        notes: "Pondasi cakar ayam dan pembesian sloof 15x30 lolos uji tekan beton K-250.",
      },
      {
        id: "ph-2",
        name: "Struktur Kolom, Balok Dak Lantai 2 & Dinding Hebel",
        weight: 25,
        progress: 100,
        status: "selesai",
        startDate: "2025-02-06",
        endDate: "2025-03-05",
        notes: "Pengecoran pelat lantai 2 menggunakan ready mix tebal 12cm dengan wiremesh M8.",
      },
      {
        id: "ph-3",
        name: "Rangka Atap Baja Ringan C75 & Genteng Flat Beton",
        weight: 15,
        progress: 100,
        status: "selesai",
        startDate: "2025-03-06",
        endDate: "2025-03-24",
        notes: "Pemasangan baja ringan taso 0.75mm dan insulasi aluminium foil anti bocor.",
      },
      {
        id: "ph-4",
        name: "Instalasi Mekanikal Elektrikal, Pipa Air & Plafon Gypsum",
        weight: 15,
        progress: 85,
        status: "proses",
        startDate: "2025-03-25",
        endDate: "2025-04-18",
        notes: "Instalasi pipa Rucika AW dan kabel Supreme NYM SNI sudah terpasang rapi.",
      },
      {
        id: "ph-5",
        name: "Pemasangan Granit Tile 60x60, Sanitair & Pengecatan Dulux",
        weight: 20,
        progress: 40,
        status: "proses",
        startDate: "2025-04-15",
        endDate: "2025-05-15",
        notes: "Pemasangan granit lantai utama sedang berjalan dan acian dinding ruang tamu.",
      },
      {
        id: "ph-6",
        name: "Pembersihan Area, Final QC & Serah Terima Kunci (Handover)",
        weight: 5,
        progress: 0,
        status: "belum",
        startDate: "2025-05-16",
        endDate: "2025-05-25",
        notes: "Pembersihan total residu semen dan uji coba kebocoran instalasi air.",
      },
    ],
    logs: [
      {
        id: "log-1",
        date: "2025-04-05",
        phaseName: "Finishing Lantai & Dinding",
        title: "Pemasangan Granit Lantai 2 dan Plester Halus Fasad",
        description: "Tukang granit menyelesaikan area kamar tidur utama lantai 2. Dilakukan perapihan nat 1mm menggunakan tile leveling spacer untuk hasil presisi.",
        workerCount: 7,
        weather: "Cerah",
        photos: ["/image/rumah1.jpg", "/image/rumah2.jpg"],
      },
      {
        id: "log-2",
        date: "2025-03-28",
        phaseName: "Instalasi ME & Plafon",
        title: "Penarikan Jalur Titik Lampu Downlight & Pipa AC",
        description: "Penarikan jalur kelistrikan utama kabel NYM 3x2.5mm dan pipa refrigerant AC tertanam rapi di dalam dinding sebelum diplester.",
        workerCount: 6,
        weather: "Berawan",
        photos: ["/image/rumah3.jpg"],
      },
      {
        id: "log-3",
        date: "2025-03-18",
        phaseName: "Rangka Atap & Genteng",
        title: "Pemasangan Kuda-Kuda Baja Ringan & Nok Genteng",
        description: "Selesai penyetelan jurai dan nok genteng flat beton Monier. Pemasangan talang air cor beton bebas bocor sudah dites genangan air.",
        workerCount: 8,
        weather: "Cerah",
        photos: ["/image/rumah2.jpg"],
      },
    ],
    milestones: [
      {
        id: "m-1",
        termNumber: 1,
        name: "Termin 1: Down Payment (DP) & Mobilisasi Alat/Bahan",
        percentage: 30,
        amount: 130500000,
        triggerProgress: 0,
        status: "lunas",
        dueDate: "2025-01-10",
        paidDate: "2025-01-09",
        invoiceNumber: "INV/IS/2025/001",
      },
      {
        id: "m-2",
        termNumber: 2,
        name: "Termin 2: Progres Struktur Lantai 2 Selesai",
        percentage: 30,
        amount: 130500000,
        triggerProgress: 45,
        status: "lunas",
        dueDate: "2025-03-01",
        paidDate: "2025-03-02",
        invoiceNumber: "INV/IS/2025/038",
      },
      {
        id: "m-3",
        termNumber: 3,
        name: "Termin 3: Atap Selesai & Plafon / Acian Selesai",
        percentage: 25,
        amount: 108750000,
        triggerProgress: 75,
        status: "lunas",
        dueDate: "2025-04-10",
        paidDate: "2025-04-08",
        invoiceNumber: "INV/IS/2025/074",
      },
      {
        id: "m-4",
        termNumber: 4,
        name: "Termin 4: Pelunasan Setelah Serah Terima Kunci (Retensi 5% - 6 Bulan)",
        percentage: 15,
        amount: 65250000,
        triggerProgress: 100,
        status: "menunggu",
        dueDate: "2025-05-25",
        invoiceNumber: "INV/IS/2025/112",
      },
    ],
    createdAt: "2025-01-08T08:00:00Z",
    updatedAt: "2025-04-05T17:30:00Z",
  },
  {
    id: "proj-2",
    projectCode: "IS-2025-002",
    clientName: "Ibu Silvia Tanuwidjaja",
    clientPhone: "0813-1122-3344",
    projectName: "Bangun Rumah Baru Modern Tropical 3 Lantai",
    projectCategory: "Bangun Rumah Baru",
    location: "Cluster Symphonia, Summarecon Serpong, Tangerang",
    buildingArea: "310 m² (3 Lantai)",
    startDate: "2025-02-15",
    targetEndDate: "2025-08-30",
    supervisorName: "Dedi Kurniawan, S.T.",
    supervisorPhone: "0812-8996-9933",
    status: "pengerjaan",
    overallProgress: 42,
    featuredImage: "/image/rumah2.jpg",
    contract: {
      spkNumber: "SPK/IS/2025/02/029",
      spkDate: "2025-02-12",
      contractValue: 980000000,
      downPayment: 294000000,
      retentionPercent: 5,
      warrantyMonths: 12,
      firstPartyName: "Ibu Silvia Tanuwidjaja",
      firstPartyKtp: "3171025506890001",
      firstPartyPhone: "0813-1122-3344",
      firstPartyAddress: "Cluster Verdi Symphonia Blok V5 No. 8, Gading Serpong",
      secondPartyName: "Mukti Wibowo, S.T.",
      secondPartyRole: "Direktur Operasional",
      secondPartyCompany: "CV. Imperial Serpong Perkasa",
      secondPartyPhone: "0812-8996-9933",
      bankName: "BCA Kantor Cabang BSD",
      bankAccount: "883-092-1144",
      bankHolder: "CV IMPERIAL SERPONG PERKASA",
    },
    phases: [
      {
        id: "ph2-1",
        name: "Pekerjaan Bouwplank, Galian & Pondasi Bore Pile 12m",
        weight: 20,
        progress: 100,
        status: "selesai",
        startDate: "2025-02-15",
        endDate: "2025-03-10",
        notes: "18 titik bore pile kedalaman 12m tanah keras telah selesai diuji sondir.",
      },
      {
        id: "ph2-2",
        name: "Pengecoran Sloof, Kolom Utama & Pelat Dak Lantai 2",
        weight: 25,
        progress: 88,
        status: "proses",
        startDate: "2025-03-11",
        endDate: "2025-04-20",
        notes: "Pengecoran dak lantai 2 selesai curing 14 hari, bekisting lantai 3 sedang dirakit.",
      },
      {
        id: "ph2-3",
        name: "Struktur Dak Lantai 3, Dinding Bata Ringan & Balok Keliling",
        weight: 20,
        progress: 0,
        status: "belum",
        startDate: "2025-04-21",
        endDate: "2025-05-30",
      },
      {
        id: "ph2-4",
        name: "Atap Rooftop Garden & Pasangan Kusen Aluminium YKK",
        weight: 15,
        progress: 0,
        status: "belum",
        startDate: "2025-06-01",
        endDate: "2025-06-30",
      },
      {
        id: "ph2-5",
        name: "Finishing Marmer Travertine, Smart Home & Interior Built-in",
        weight: 15,
        progress: 0,
        status: "belum",
        startDate: "2025-07-01",
        endDate: "2025-08-15",
      },
      {
        id: "ph2-6",
        name: "Uji Fungsi Seluruh Sistem & Serah Terima Kunci",
        weight: 5,
        progress: 0,
        status: "belum",
        startDate: "2025-08-16",
        endDate: "2025-08-30",
      },
    ],
    logs: [
      {
        id: "log2-1",
        date: "2025-04-03",
        phaseName: "Struktur Kolom & Balok Lantai 2",
        title: "Pengecoran Kolom Praktis & Pembongkaran Scaffolding Lantai 1",
        description: "Tim struktur membongkar penopang dak lantai 1 setelah beton mencapai umur 21 hari dengan kekuatan optimal. Area bersih dan siap pasang dinding hebel.",
        workerCount: 9,
        weather: "Cerah",
        photos: ["/image/rumah2.jpg", "/image/visualisasi.jpg"],
      },
    ],
    milestones: [
      {
        id: "m2-1",
        termNumber: 1,
        name: "Termin 1: Down Payment (30%)",
        percentage: 30,
        amount: 294000000,
        triggerProgress: 0,
        status: "lunas",
        dueDate: "2025-02-15",
        paidDate: "2025-02-14",
        invoiceNumber: "INV/IS/2025/022",
      },
      {
        id: "m2-2",
        termNumber: 2,
        name: "Termin 2: Progres Struktur 40% (Dak Lantai 2 Selesai)",
        percentage: 30,
        amount: 294000000,
        triggerProgress: 40,
        status: "menunggu",
        dueDate: "2025-04-15",
        invoiceNumber: "INV/IS/2025/085",
      },
      {
        id: "m2-3",
        termNumber: 3,
        name: "Termin 3: Struktur Dak Lantai 3 & Dinding 75%",
        percentage: 25,
        amount: 245000000,
        triggerProgress: 75,
        status: "belum",
        dueDate: "2025-06-30",
        invoiceNumber: "INV/IS/2025/140",
      },
      {
        id: "m2-4",
        termNumber: 4,
        name: "Termin 4: Serah Terima & Garansi Retensi (15%)",
        percentage: 15,
        amount: 147000000,
        triggerProgress: 100,
        status: "belum",
        dueDate: "2025-08-30",
        invoiceNumber: "INV/IS/2025/198",
      },
    ],
    createdAt: "2025-02-12T09:00:00Z",
    updatedAt: "2025-04-03T16:00:00Z",
  },
  {
    id: "proj-3",
    projectCode: "IS-2025-003",
    clientName: "Bpk. Aris Pratama",
    clientPhone: "0811-7788-9900",
    projectName: "Renovasi Fasad Minimalis & Kitchen Extension",
    projectCategory: "Renovasi Total",
    location: "Sektor 9 Bintaro Jaya, Tangerang Selatan",
    buildingArea: "85 m²",
    startDate: "2025-03-01",
    targetEndDate: "2025-04-20",
    supervisorName: "Agus Prasetyo, A.Md.",
    supervisorPhone: "0812-8996-9933",
    status: "finishing",
    overallProgress: 92,
    featuredImage: "/image/rumah3.jpg",
    contract: {
      spkNumber: "SPK/IS/2025/03/041",
      spkDate: "2025-02-26",
      contractValue: 145000000,
      downPayment: 58000000,
      retentionPercent: 5,
      warrantyMonths: 6,
      firstPartyName: "Bpk. Aris Pratama",
      firstPartyPhone: "0811-7788-9900",
      firstPartyAddress: "Kebayoran Harmony Blok KH No. 22, Bintaro Sektor 9",
      secondPartyName: "Mukti Wibowo, S.T.",
      secondPartyRole: "Direktur Operasional",
      secondPartyCompany: "CV. Imperial Serpong Perkasa",
      secondPartyPhone: "0812-8996-9933",
      bankName: "BCA Kantor Cabang BSD",
      bankAccount: "883-092-1144",
      bankHolder: "CV IMPERIAL SERPONG PERKASA",
    },
    phases: [
      {
        id: "ph3-1",
        name: "Pembongkaran Dapur Lama & Pasangan Bata Area Belakang",
        weight: 25,
        progress: 100,
        status: "selesai",
        startDate: "2025-03-01",
        endDate: "2025-03-12",
      },
      {
        id: "ph3-2",
        name: "Pengecoran Meja Dapur Cor Beton & Kanopi Skylight Kaca Tempered",
        weight: 30,
        progress: 100,
        status: "selesai",
        startDate: "2025-03-13",
        endDate: "2025-03-26",
      },
      {
        id: "ph3-3",
        name: "Finishing Fasad Wood-Plastic Composite (WPC) & Cat Weatherbond",
        weight: 35,
        progress: 85,
        status: "proses",
        startDate: "2025-03-27",
        endDate: "2025-04-12",
      },
      {
        id: "ph3-4",
        name: "Pemasangan Lampu LED Strip & Deep Cleaning",
        weight: 10,
        progress: 50,
        status: "proses",
        startDate: "2025-04-13",
        endDate: "2025-04-20",
      },
    ],
    logs: [
      {
        id: "log3-1",
        date: "2025-04-06",
        phaseName: "Finishing Fasad & WPC",
        title: "Pemasangan Kisi-kisi WPC dan Lampu Sorot Fasad",
        description: "Kisi-kisi WPC terpasang sempurna anti rayap dan tahan panas. Pengecatan dinding luar selesai lapis kedua menggunakan cat tahan cuaca Nippon Weatherbond.",
        workerCount: 5,
        weather: "Cerah",
        photos: ["/image/rumah3.jpg"],
      },
    ],
    milestones: [
      {
        id: "m3-1",
        termNumber: 1,
        name: "Termin 1: DP 40%",
        percentage: 40,
        amount: 58000000,
        triggerProgress: 0,
        status: "lunas",
        dueDate: "2025-03-01",
        paidDate: "2025-02-28",
        invoiceNumber: "INV/IS/2025/042",
      },
      {
        id: "m3-2",
        termNumber: 2,
        name: "Termin 2: Progres Fisik 50%",
        percentage: 35,
        amount: 50750000,
        triggerProgress: 50,
        status: "lunas",
        dueDate: "2025-03-25",
        paidDate: "2025-03-26",
        invoiceNumber: "INV/IS/2025/071",
      },
      {
        id: "m3-3",
        termNumber: 3,
        name: "Termin 3: Pelunasan Serah Terima (25%)",
        percentage: 25,
        amount: 36250000,
        triggerProgress: 100,
        status: "menunggu",
        dueDate: "2025-04-20",
        invoiceNumber: "INV/IS/2025/099",
      },
    ],
    createdAt: "2025-02-26T10:00:00Z",
    updatedAt: "2025-04-06T15:00:00Z",
  },
];

const STORAGE_KEY = "imperial_serpong_projects_v1";

export function getStoredProjects(): ProjectItem[] {
  if (typeof window === "undefined") {
    return INITIAL_PROJECTS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PROJECTS;
  } catch {
    return INITIAL_PROJECTS;
  }
}

export function saveStoredProjects(projects: ProjectItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event("imperial_projects_updated"));
  } catch (err) {
    console.error("Failed to save projects to localStorage:", err);
  }
}

export function findProjectByCode(code: string): ProjectItem | undefined {
  const list = getStoredProjects();
  const clean = code.trim().toUpperCase();
  return list.find((p) => p.projectCode.toUpperCase() === clean || p.id === code);
}

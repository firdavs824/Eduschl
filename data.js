// ==========================================
// EduPrime CRM - Boshlang'ich Ma'lumotlar Bazasi
// Xususiy Maktab & Repetitorlik Markazi
// ==========================================

const DEFAULT_DATA = {
  schoolInfo: {
    name: "Ziyo Nur Xususiy Maktabi & Akademiyasi",
    phone: "+998 71 200 45 45",
    address: "Toshkent sh., Yunusobod tumani, Amir Temur shox ko'chasi 14",
    academicYear: "2026-2027",
    currency: "UZS"
  },

  // 1. O'qituvchilar va Repetitorlar
  teachers: [
    {
      id: "TCH-001",
      name: "Javohir Rustamov",
      subject: "Matematika & Oliy Matematika",
      role: "Repetitor & Maktab Ustoz",
      type: "repetitor", // 'repetitor', 'maktab', 'both'
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      phone: "+998 90 123 45 67",
      email: "j.rustamov@ziyonur.uz",
      experience: "7 yil",
      room: "304-xona",
      hourlyRate: "120,000 UZS",
      rating: 4.9,
      status: "Faol",
      bio: "DTM va Prezident maktabiga tayyorlash bo'yicha 500+ muvaffaqiyatli shogirdlar ustozi. O'zbekiston Milliy Universiteti magistri.",
      schedule: [
        { day: "Dushanba", time: "14:30 - 16:00", group: "Math-Prezident-1", room: "304-xona", topic: "Murakkab geometriya va stereometriya" },
        { day: "Dushanba", time: "16:15 - 17:45", group: "Math-Abituriyent-A", room: "304-xona", topic: "Hosila va integral amaliyoti" },
        { day: "Chorshanba", time: "14:30 - 16:00", group: "Math-Prezident-1", room: "304-xona", topic: "Matematik mantiqiy masalalar" },
        { day: "Chorshanba", time: "16:15 - 17:45", group: "Math-Abituriyent-A", room: "304-xona", topic: "Parametrli tenglamalar" },
        { day: "Juma", time: "14:30 - 16:00", group: "Math-Prezident-1", room: "304-xona", topic: "Haftalik test tahlili" },
        { day: "Juma", time: "16:15 - 17:45", group: "Math-Abituriyent-A", room: "304-xona", topic: "Olimpiada masalalari" }
      ],
      tutorGroups: [
        {
          id: "GRP-M1",
          name: "Math-Prezident-1",
          level: "7-8 sinf (Prezident maktabiga)",
          days: "Dush / Chor / Juma",
          time: "14:30 - 16:00",
          monthlyFee: 850000,
          studentIds: ["STU-101", "STU-102", "STU-103", "STU-104", "STU-105"]
        },
        {
          id: "GRP-M2",
          name: "Math-Abituriyent-A",
          level: "10-11 sinf (DTM / West tayyorlov)",
          days: "Dush / Chor / Juma",
          time: "16:15 - 17:45",
          monthlyFee: 950000,
          studentIds: ["STU-106", "STU-107", "STU-108", "STU-109"]
        }
      ]
    },
    {
      id: "TCH-002",
      name: "Madina Karimova",
      subject: "Ingliz tili (IELTS & CEFR)",
      role: "IELTS Repetitori",
      type: "repetitor",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      phone: "+998 97 765 43 21",
      email: "m.karimova@ziyonur.uz",
      experience: "5 yil",
      room: "201-xona (Audio-lab)",
      hourlyRate: "150,000 UZS",
      rating: 5.0,
      status: "Faol",
      bio: "IELTS 8.5 sohibasi. O'quvchilari o'rtacha IELTS 7.0+ natija ko'rsatishadi. British Council sertifikatlangan instruktori.",
      schedule: [
        { day: "Seshanba", time: "15:00 - 16:30", group: "IELTS-Target-7.5", room: "201-xona", topic: "Writing Task 2: Advanced Cohesion" },
        { day: "Seshanba", time: "16:45 - 18:15", group: "General-English-B2", room: "201-xona", topic: "Speaking fluency & collocations" },
        { day: "Payshanba", time: "15:00 - 16:30", group: "IELTS-Target-7.5", room: "201-xona", topic: "Reading True/False/Not Given drills" },
        { day: "Payshanba", time: "16:45 - 18:15", group: "General-English-B2", room: "201-xona", topic: "Grammar: Inversion & Conditionals" },
        { day: "Shanba", time: "10:00 - 12:00", group: "IELTS-Target-7.5", room: "201-xona", topic: "Full Mock Test Exam" }
      ],
      tutorGroups: [
        {
          id: "GRP-E1",
          name: "IELTS-Target-7.5",
          level: "Upper-Intermediate / Advanced",
          days: "Sesh / Pay / Shan",
          time: "15:00 - 16:30",
          monthlyFee: 1100000,
          studentIds: ["STU-110", "STU-111", "STU-112", "STU-113", "STU-114", "STU-115"]
        },
        {
          id: "GRP-E2",
          name: "General-English-B2",
          level: "Intermediate",
          days: "Sesh / Pay",
          time: "16:45 - 18:15",
          monthlyFee: 750000,
          studentIds: ["STU-116", "STU-117", "STU-118"]
        }
      ]
    },
    {
      id: "TCH-003",
      name: "Sardorbek Ergashev",
      subject: "Fizika & Robototexnika",
      role: "Repetitor & Laboratoriya Rahbari",
      type: "repetitor",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      phone: "+998 93 543 21 09",
      email: "s.ergashev@ziyonur.uz",
      experience: "8 yil",
      room: "402-xona (Fizika lab)",
      hourlyRate: "110,000 UZS",
      rating: 4.8,
      status: "Faol",
      bio: "Xalqaro fizika olimpiadalari g'olibi ustozi. Amaliy tajribalar orqali fizika formulalarini chuqur tushuntirish uslubi.",
      schedule: [
        { day: "Dushanba", time: "16:00 - 17:30", group: "Fizika-DTM-Max", room: "402-xona", topic: "Kinematika va dinamika qonunlari" },
        { day: "Chorshanba", time: "16:00 - 17:30", group: "Fizika-DTM-Max", room: "402-xona", topic: "Termodinamika amaliy masalalari" },
        { day: "Juma", time: "16:00 - 17:30", group: "Fizika-DTM-Max", room: "402-xona", topic: "Elektr va magnit maydonlari" }
      ],
      tutorGroups: [
        {
          id: "GRP-F1",
          name: "Fizika-DTM-Max",
          level: "9-11 sinf",
          days: "Dush / Chor / Juma",
          time: "16:00 - 17:30",
          monthlyFee: 800000,
          studentIds: ["STU-101", "STU-106", "STU-119", "STU-120"]
        }
      ]
    },
    {
      id: "TCH-004",
      name: "Dilnoza Olimova",
      subject: "Kimyo & Biologiya (Tibbiyot yo'nalishi)",
      role: "Tibbiyot Repetitori",
      type: "repetitor",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
      phone: "+998 99 888 77 66",
      email: "d.olimova@ziyonur.uz",
      experience: "9 yil",
      room: "405-xona (Kimyo lab)",
      hourlyRate: "130,000 UZS",
      rating: 4.95,
      status: "Faol",
      bio: "Toshkent Tibbiyot Akademiyasiga 100% kirish natijasi bilan mashhur. Kimyoviy reaksiyalar va genetik masalalar bo'yicha maxsus dastur muallifi.",
      schedule: [
        { day: "Seshanba", time: "14:30 - 16:30", group: "Med-Start-2026", room: "405-xona", topic: "Organik kimyo: Alkanlar va Alkenlar" },
        { day: "Payshanba", time: "14:30 - 16:30", group: "Med-Start-2026", room: "405-xona", topic: "Sitologiya va Hujayra tuzilishi" },
        { day: "Shanba", time: "13:00 - 15:00", group: "Med-Start-2026", room: "405-xona", topic: "Kombinatsion masalalar yechish" }
      ],
      tutorGroups: [
        {
          id: "GRP-K1",
          name: "Med-Start-2026",
          level: "10-11 sinf (Tibbiyot tayyorlov)",
          days: "Sesh / Pay / Shan",
          time: "14:30 - 16:30",
          monthlyFee: 950000,
          studentIds: ["STU-121", "STU-122", "STU-123", "STU-124", "STU-125"]
        }
      ]
    },
    {
      id: "TCH-005",
      name: "Akmal Saidov",
      subject: "Tarix va Huquqshunoslik",
      role: "Maktab o'qituvchisi & DTM Ustoz",
      type: "both",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      phone: "+998 91 333 22 11",
      email: "a.saidov@ziyonur.uz",
      experience: "12 yil",
      room: "208-xona",
      hourlyRate: "90,000 UZS",
      rating: 4.7,
      status: "Faol",
      bio: "Tarix fanlari nomzodi. O'zbekiston tarixi va Jahon tarixi xronologiyasini xotirada saqlash mnemotexnikasi bo'yicha mutaxassis.",
      schedule: [
        { day: "Dushanba", time: "09:00 - 10:20", group: "10-A Maktab sinfi", room: "208-xona", topic: "Temuriylar davri madaniyati" },
        { day: "Chorshanba", time: "16:00 - 17:30", group: "Tarix-DTM-Guruh", room: "208-xona", topic: "Jahon tarixi: XX asr xalqaro munosabatlari" },
        { day: "Juma", time: "16:00 - 17:30", group: "Tarix-DTM-Guruh", room: "208-xona", topic: "Sana va xaritalar bo'yicha blits-test" }
      ],
      tutorGroups: [
        {
          id: "GRP-T1",
          name: "Tarix-DTM-Guruh",
          level: "Yuridik yo'nalish abituriyentlari",
          days: "Chor / Juma",
          time: "16:00 - 17:30",
          monthlyFee: 700000,
          studentIds: ["STU-107", "STU-126", "STU-127"]
        }
      ]
    },
    {
      id: "TCH-006",
      name: "Zulxumor Ismoilova",
      subject: "Boshlang'ich Ta'lim & Mental Arifmetika",
      role: "Boshlang'ich Sinflar Rahbari",
      type: "maktab",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      phone: "+998 94 999 11 22",
      email: "z.ismoilova@ziyonur.uz",
      experience: "14 yil",
      room: "102-xona",
      hourlyRate: "80,000 UZS",
      rating: 4.9,
      status: "Faol",
      bio: "Oliy toifali boshlang'ich sinf ustozi. Bolalarda mantiqiy fikrlash va tezkor hisoblash ko'nikmalarini shakllantiruvchi metodist.",
      schedule: [
        { day: "Har kuni", time: "08:30 - 13:00", group: "3-A Maktab sinfi", room: "102-xona", topic: "Boshlang'ich maktab fanlari" },
        { day: "Dush / Chor / Juma", time: "14:00 - 15:30", group: "Mental-Kids-Start", room: "102-xona", topic: "Soroban va tezkor hisoblash" }
      ],
      tutorGroups: [
        {
          id: "GRP-MK1",
          name: "Mental-Kids-Start",
          level: "1-4 sinf o'quvchilari",
          days: "Dush / Chor / Juma",
          time: "14:00 - 15:30",
          monthlyFee: 600000,
          studentIds: ["STU-128", "STU-129", "STU-130", "STU-131"]
        }
      ]
    }
  ],

  // 2. O'quvchilar Ro'yxati (Maktab o'quvchilari va Repetitor o'quvchilari)
  students: [
    {
      id: "STU-101",
      name: "Asadbek Temirov",
      age: 14,
      schoolClass: "8-A sinf",
      parentName: "Temir Po'latov (Otasi)",
      parentPhone: "+998 90 911 22 33",
      enrolledDate: "2024-09-01",
      status: "Faol",
      avatar: "AT",
      tutorCourses: [
        { teacherId: "TCH-001", teacherName: "Javohir Rustamov", subject: "Matematika", group: "Math-Prezident-1", fee: 850000, paymentStatus: "To'langan", grade: "94%" },
        { teacherId: "TCH-003", teacherName: "Sardorbek Ergashev", subject: "Fizika", group: "Fizika-DTM-Max", fee: 800000, paymentStatus: "To'langan", grade: "88%" }
      ],
      schoolTuitionFee: 3500000, // Maktab oylik kontrakti
      schoolPaymentStatus: "To'langan",
      notes: "Prezident maktabi imtihonlariga tayyorlanmoqda. Namunali xulq-atvor."
    },
    {
      id: "STU-102",
      name: "Sevara Mahmudova",
      age: 13,
      schoolClass: "7-B sinf",
      parentName: "Nodira Mahmudova (Onasi)",
      parentPhone: "+998 91 456 78 90",
      enrolledDate: "2024-09-01",
      status: "Faol",
      avatar: "SM",
      tutorCourses: [
        { teacherId: "TCH-001", teacherName: "Javohir Rustamov", subject: "Matematika", group: "Math-Prezident-1", fee: 850000, paymentStatus: "To'langan", grade: "98%" }
      ],
      schoolTuitionFee: 3500000,
      schoolPaymentStatus: "To'langan",
      notes: "Maktab olimpiadasi 1-o'rin sohibasi."
    },
    {
      id: "STU-103",
      name: "Biloliddin Qodirov",
      age: 14,
      schoolClass: "8-A sinf",
      parentName: "Sherzod Qodirov (Otasi)",
      parentPhone: "+998 93 111 44 55",
      enrolledDate: "2024-10-10",
      status: "Faol",
      avatar: "BQ",
      tutorCourses: [
        { teacherId: "TCH-001", teacherName: "Javohir Rustamov", subject: "Matematika", group: "Math-Prezident-1", fee: 850000, paymentStatus: "Qarzdor", debtAmount: 850000, grade: "81%" }
      ],
      schoolTuitionFee: 3500000,
      schoolPaymentStatus: "Qarzdor",
      notes: "To'lov muddati kechikmoqda, ota-onasiga eslatma yuborilgan."
    },
    {
      id: "STU-104",
      name: "Zilola Alimova",
      age: 14,
      schoolClass: "8-B sinf",
      parentName: "Farrux Alimov (Otasi)",
      parentPhone: "+998 97 888 23 12",
      enrolledDate: "2024-09-01",
      status: "Faol",
      avatar: "ZA",
      tutorCourses: [
        { teacherId: "TCH-001", teacherName: "Javohir Rustamov", subject: "Matematika", group: "Math-Prezident-1", fee: 850000, paymentStatus: "To'langan", grade: "90%" }
      ],
      schoolTuitionFee: 3500000,
      schoolPaymentStatus: "To'langan",
      notes: "Darslarga faol qatnashadi."
    },
    {
      id: "STU-105",
      name: "Diyorbek Shamsiyev",
      age: 13,
      schoolClass: "7-A sinf",
      parentName: "Gulnoza Shamsiyeva (Onasi)",
      parentPhone: "+998 99 777 55 44",
      enrolledDate: "2024-09-01",
      status: "Faol",
      avatar: "DS",
      tutorCourses: [
        { teacherId: "TCH-001", teacherName: "Javohir Rustamov", subject: "Matematika", group: "Math-Prezident-1", fee: 850000, paymentStatus: "To'langan", grade: "87%" }
      ],
      schoolTuitionFee: 3500000,
      schoolPaymentStatus: "To'langan",
      notes: "Geometriyadan yaxshi natija ko'rsatmoqda."
    },
    {
      id: "STU-106",
      name: "Bobur Shokirov",
      age: 17,
      schoolClass: "11-A sinf",
      parentName: "Akrom Shokirov (Otasi)",
      parentPhone: "+998 90 234 56 78",
      enrolledDate: "2023-09-01",
      status: "Faol",
      avatar: "BS",
      tutorCourses: [
        { teacherId: "TCH-001", teacherName: "Javohir Rustamov", subject: "Matematika", group: "Math-Abituriyent-A", fee: 950000, paymentStatus: "To'langan", grade: "96%" },
        { teacherId: "TCH-003", teacherName: "Sardorbek Ergashev", subject: "Fizika", group: "Fizika-DTM-Max", fee: 800000, paymentStatus: "To'langan", grade: "92%" }
      ],
      schoolTuitionFee: 3800000,
      schoolPaymentStatus: "To'langan",
      notes: "Gubkin nomidagi neft-gaz universitetiga topshirmoqchi."
    },
    {
      id: "STU-107",
      name: "Shahnoza Yusupova",
      age: 17,
      schoolClass: "11-B sinf",
      parentName: "Dilorom Yusupova (Onasi)",
      parentPhone: "+998 91 345 67 89",
      enrolledDate: "2023-09-01",
      status: "Faol",
      avatar: "SY",
      tutorCourses: [
        { teacherId: "TCH-001", teacherName: "Javohir Rustamov", subject: "Matematika", group: "Math-Abituriyent-A", fee: 950000, paymentStatus: "Qarzdor", debtAmount: 450000, grade: "85%" },
        { teacherId: "TCH-005", teacherName: "Akmal Saidov", subject: "Tarix", group: "Tarix-DTM-Guruh", fee: 700000, paymentStatus: "To'langan", grade: "90%" }
      ],
      schoolTuitionFee: 3800000,
      schoolPaymentStatus: "To'langan",
      notes: "Huquqshunoslik yo'nalishiga tayyorlanmoqda."
    },
    {
      id: "STU-108",
      name: "Jasur Qosimov",
      age: 16,
      schoolClass: "10-A sinf",
      parentName: "Botir Qosimov (Otasi)",
      parentPhone: "+998 93 456 78 91",
      enrolledDate: "2024-09-01",
      status: "Faol",
      avatar: "JQ",
      tutorCourses: [
        { teacherId: "TCH-001", teacherName: "Javohir Rustamov", subject: "Matematika", group: "Math-Abituriyent-A", fee: 950000, paymentStatus: "To'langan", grade: "89%" }
      ],
      schoolTuitionFee: 3800000,
      schoolPaymentStatus: "To'langan",
      notes: "Westminster universiteti litseyiga reja qilgan."
    },
    {
      id: "STU-109",
      name: "Malika Davronova",
      age: 16,
      schoolClass: "10-B sinf",
      parentName: "Aziza Davronova (Onasi)",
      parentPhone: "+998 97 567 89 01",
      enrolledDate: "2024-09-01",
      status: "Faol",
      avatar: "MD",
      tutorCourses: [
        { teacherId: "TCH-001", teacherName: "Javohir Rustamov", subject: "Matematika", group: "Math-Abituriyent-A", fee: 950000, paymentStatus: "To'langan", grade: "91%" }
      ],
      schoolTuitionFee: 3800000,
      schoolPaymentStatus: "To'langan",
      notes: "Iqtisodiyot sohasi qiziqishi yuqori."
    },
    {
      id: "STU-110",
      name: "Kamronbek Mirzayev",
      age: 16,
      schoolClass: "10-A sinf",
      parentName: "Otabek Mirzayev (Otasi)",
      parentPhone: "+998 90 678 90 12",
      enrolledDate: "2024-09-01",
      status: "Faol",
      avatar: "KM",
      tutorCourses: [
        { teacherId: "TCH-002", teacherName: "Madina Karimova", subject: "Ingliz tili", group: "IELTS-Target-7.5", fee: 1100000, paymentStatus: "To'langan", grade: "IELTS 7.0" }
      ],
      schoolTuitionFee: 3800000,
      schoolPaymentStatus: "To'langan",
      notes: "Reading va Listening bo'yicha kuchli, Writing mashq qilmoqda."
    },
    {
      id: "STU-111",
      name: "Ruxshona Nazarova",
      age: 17,
      schoolClass: "11-A sinf",
      parentName: "Saida Nazarova (Onasi)",
      parentPhone: "+998 91 789 01 23",
      enrolledDate: "2023-09-01",
      status: "Faol",
      avatar: "RN",
      tutorCourses: [
        { teacherId: "TCH-002", teacherName: "Madina Karimova", subject: "Ingliz tili", group: "IELTS-Target-7.5", fee: 1100000, paymentStatus: "To'langan", grade: "IELTS 7.5" }
      ],
      schoolTuitionFee: 3800000,
      schoolPaymentStatus: "To'langan",
      notes: "C1 sertifikat olish arafasida."
    },
    {
      id: "STU-112",
      name: "Mirjalol Rahimov",
      age: 16,
      schoolClass: "10-B sinf",
      parentName: "Oybek Rahimov (Otasi)",
      parentPhone: "+998 93 890 12 34",
      enrolledDate: "2024-09-01",
      status: "Faol",
      avatar: "MR",
      tutorCourses: [
        { teacherId: "TCH-002", teacherName: "Madina Karimova", subject: "Ingliz tili", group: "IELTS-Target-7.5", fee: 1100000, paymentStatus: "Qarzdor", debtAmount: 1100000, grade: "IELTS 6.5" }
      ],
      schoolTuitionFee: 3800000,
      schoolPaymentStatus: "Qarzdor",
      notes: "To'lov hisob raqami tekshirilmoqda."
    },
    {
      id: "STU-113",
      name: "Mohira Sobirova",
      age: 17,
      schoolClass: "11-B sinf",
      parentName: "Gulbahor Sobirova (Onasi)",
      parentPhone: "+998 94 901 23 45",
      enrolledDate: "2023-09-01",
      status: "Faol",
      avatar: "MS",
      tutorCourses: [
        { teacherId: "TCH-002", teacherName: "Madina Karimova", subject: "Ingliz tili", group: "IELTS-Target-7.5", fee: 1100000, paymentStatus: "To'langan", grade: "IELTS 7.0" }
      ],
      schoolTuitionFee: 3800000,
      schoolPaymentStatus: "To'langan",
      notes: "Xorijiy grant dasturlariga ariza topshirgan."
    },
    {
      id: "STU-114",
      name: "Shohruh Abdullayev",
      age: 16,
      schoolClass: "10-A sinf",
      parentName: "Ilhom Abdullayev (Otasi)",
      parentPhone: "+998 97 012 34 56",
      enrolledDate: "2024-09-01",
      status: "Faol",
      avatar: "SA",
      tutorCourses: [
        { teacherId: "TCH-002", teacherName: "Madina Karimova", subject: "Ingliz tili", group: "IELTS-Target-7.5", fee: 1100000, paymentStatus: "To'langan", grade: "IELTS 6.5" }
      ],
      schoolTuitionFee: 3800000,
      schoolPaymentStatus: "To'langan",
      notes: "Speaking klublarining faol ishtirokchisi."
    },
    {
      id: "STU-115",
      name: "Zarina To'rayeva",
      age: 17,
      schoolClass: "11-A sinf",
      parentName: "Mansur To'rayev (Otasi)",
      parentPhone: "+998 99 123 45 68",
      enrolledDate: "2023-09-01",
      status: "Faol",
      avatar: "ZT",
      tutorCourses: [
        { teacherId: "TCH-002", teacherName: "Madina Karimova", subject: "Ingliz tili", group: "IELTS-Target-7.5", fee: 1100000, paymentStatus: "To'langan", grade: "IELTS 7.5" }
      ],
      schoolTuitionFee: 3800000,
      schoolPaymentStatus: "To'langan",
      notes: "Universitetga grant yutgan."
    },
    {
      id: "STU-121",
      name: "Sarvar Usmonov",
      age: 17,
      schoolClass: "11-B sinf",
      parentName: "Bahrom Usmonov (Otasi)",
      parentPhone: "+998 90 333 44 55",
      enrolledDate: "2023-09-01",
      status: "Faol",
      avatar: "SU",
      tutorCourses: [
        { teacherId: "TCH-004", teacherName: "Dilnoza Olimova", subject: "Kimyo & Biologiya", group: "Med-Start-2026", fee: 950000, paymentStatus: "To'langan", grade: "95%" }
      ],
      schoolTuitionFee: 3800000,
      schoolPaymentStatus: "To'langan",
      notes: "Tibbiyot Akademiyasiga tayyorgarlik ko'rmoqda."
    },
    {
      id: "STU-122",
      name: "Fotima Xoliqova",
      age: 16,
      schoolClass: "10-A sinf",
      parentName: "Zuhra Xoliqova (Onasi)",
      parentPhone: "+998 91 444 55 66",
      enrolledDate: "2024-09-01",
      status: "Faol",
      avatar: "FX",
      tutorCourses: [
        { teacherId: "TCH-004", teacherName: "Dilnoza Olimova", subject: "Kimyo & Biologiya", group: "Med-Start-2026", fee: 950000, paymentStatus: "To'langan", grade: "91%" }
      ],
      schoolTuitionFee: 3800000,
      schoolPaymentStatus: "To'langan",
      notes: "Kimyo tajribalarida yetakchi."
    },
    {
      id: "STU-128",
      name: "Alijon Vohidov",
      age: 8,
      schoolClass: "2-A sinf",
      parentName: "Sanjar Vohidov (Otasi)",
      parentPhone: "+998 93 555 66 77",
      enrolledDate: "2025-09-01",
      status: "Faol",
      avatar: "AV",
      tutorCourses: [
        { teacherId: "TCH-006", teacherName: "Zulxumor Ismoilova", subject: "Mental Arifmetika", group: "Mental-Kids-Start", fee: 600000, paymentStatus: "To'langan", grade: "99%" }
      ],
      schoolTuitionFee: 3200000,
      schoolPaymentStatus: "To'langan",
      notes: "Tezkor hisoblashda a'lochi."
    }
  ],

  // 3. To'lovlar tarixi va operatsiyalar
  payments: [
    { id: "PAY-901", studentName: "Asadbek Temirov", type: "Repetitor kursi", course: "Math-Prezident-1", teacher: "Javohir Rustamov", amount: 850000, date: "2026-10-05", method: "Payme / Click", status: "Tasdiqlangan" },
    { id: "PAY-902", studentName: "Asadbek Temirov", type: "Maktab kontrakti", course: "8-A sinf oylik to'lov", teacher: "Maktab administratsiyasi", amount: 3500000, date: "2026-10-05", method: "Bank o'tkazmasi", status: "Tasdiqlangan" },
    { id: "PAY-903", studentName: "Madina Karimova (IELTS)", type: "Repetitor kursi", course: "IELTS-Target-7.5", teacher: "Madina Karimova", amount: 1100000, date: "2026-10-06", method: "Naqd pul", status: "Tasdiqlangan" },
    { id: "PAY-904", studentName: "Bobur Shokirov", type: "Repetitor kursi", course: "Math-Abituriyent-A", teacher: "Javohir Rustamov", amount: 950000, date: "2026-10-07", method: "Payme / Click", status: "Tasdiqlangan" },
    { id: "PAY-905", studentName: "Sarvar Usmonov", type: "Repetitor kursi", course: "Med-Start-2026", teacher: "Dilnoza Olimova", amount: 950000, date: "2026-10-07", method: "Uzum Bank", status: "Tasdiqlangan" },
    { id: "PAY-906", studentName: "Shahnoza Yusupova", type: "Repetitor kursi", course: "Tarix-DTM-Guruh", teacher: "Akmal Saidov", amount: 700000, date: "2026-10-04", method: "Payme / Click", status: "Tasdiqlangan" },
    { id: "PAY-907", studentName: "Alijon Vohidov", type: "Repetitor kursi", course: "Mental-Kids-Start", teacher: "Zulxumor Ismoilova", amount: 600000, date: "2026-10-02", method: "Naqd pul", status: "Tasdiqlangan" }
  ],

  // 4. CRM Lidlar (Yangi kelgan arizalar)
  leads: [
    { id: "LEAD-01", name: "Ibrohim Sultonov", age: "9-sinf", phone: "+998 90 990 88 77", course: "IELTS & Matematika", source: "Instagram", status: "Sinov darsi", photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80", date: "Bugun, 11:20", note: "Ustoz Javohir Rustamov sinov darsi belgilandi (Chorshanba 14:30)" },
    { id: "LEAD-02", name: "Zuhra Murodova", age: "11-sinf", phone: "+998 91 120 30 40", course: "Kimyo-Biologiya", source: "Telegram kanal", status: "Yangi", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80", date: "Bugun, 09:45", note: "Tibbiyot yo'nalishi bo'yicha qiziqmoqda" },
    { id: "LEAD-03", name: "Umarxon G'aniyev", age: "5-sinf", phone: "+998 94 400 55 66", course: "Maktabga qabul", source: "Tavsiya orqali", status: "To'lov", photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80", date: "Kecha, 16:00", note: "Suhbatdan a'lo o'tdi, shartnoma rasmiylashtirilmoqda" },
    { id: "LEAD-04", name: "Samira Karimova", age: "7-sinf", phone: "+998 97 700 88 99", course: "Fizika & Robototexnika", source: "Website banner", status: "Sinov darsi", photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80", date: "06-Oktabr", note: "Ustoz Sardorbek Ergashev laboratoriyasini ko'rdi" }
  ],

  // 5. Umumiy dars xonalari
  rooms: [
    { name: "101-xona", type: "Boshlang'ich sinf", capacity: 20 },
    { name: "201-xona", type: "Ingliz tili Audio-lab", capacity: 16 },
    { name: "304-xona", type: "Matematika darsxonasi", capacity: 22 },
    { name: "402-xona", type: "Fizika laboratoriyasi", capacity: 18 },
    { name: "405-xona", type: "Kimyo laboratoriyasi", capacity: 18 },
    { name: "208-xona", type: "Tarix va gumanitar", capacity: 25 }
  ],

  // 6. Xarajatlar va Ish haqi
  expenses: [
    { id: "EXP-001", desc: "Javohir Rustamov — Oktyabr oyi ish haqi", type: "salary", amount: 4500000, date: "2026-10-05", recipient: "Javohir Rustamov", status: "To'langan" },
    { id: "EXP-002", desc: "Madina Karimova — Oktyabr oyi ish haqi", type: "salary", amount: 5200000, date: "2026-10-05", recipient: "Madina Karimova", status: "To'langan" },
    { id: "EXP-003", desc: "Sardorbek Ergashev — Oktyabr oyi ish haqi", type: "salary", amount: 3800000, date: "2026-10-05", recipient: "Sardorbek Ergashev", status: "Kutilmoqda" },
    { id: "EXP-004", desc: "Bino ijara to'lovi — Oktyabr", type: "rent", amount: 8500000, date: "2026-10-01", recipient: "Muallif Invest LLC", status: "To'langan" },
    { id: "EXP-005", desc: "Elektr energiya va gaz — Sentabr", type: "utility", amount: 1200000, date: "2026-09-28", recipient: "Kommunal xizmatlar", status: "To'langan" },
    { id: "EXP-006", desc: "Yangi smartboard — 201-xona", type: "supply", amount: 4800000, date: "2026-10-03", recipient: "TechnoUz do'koni", status: "To'langan" },
    { id: "EXP-007", desc: "Dilnoza Olimova — Oktyabr oyi ish haqi", type: "salary", amount: 4100000, date: "2026-10-06", recipient: "Dilnoza Olimova", status: "Kutilmoqda" },
    { id: "EXP-008", desc: "Darsliklar va o'quv vositalari", type: "supply", amount: 2300000, date: "2026-10-02", recipient: "Kitob Dunyosi LLC", status: "To'langan" },
    { id: "EXP-009", desc: "Internet va server to'lovi", type: "utility", amount: 650000, date: "2026-10-01", recipient: "TuronTelecom", status: "To'langan" },
    { id: "EXP-010", desc: "Qo'riqchi va texnik xodim maoshi", type: "salary", amount: 3200000, date: "2026-10-05", recipient: "Texnik xodimlar", status: "To'langan" }
  ],

  // 7. Bildirishnomalar
  notifications: [
    { id: "NTF-001", type: "debt", icon: "fa-triangle-exclamation", color: "rose", title: "Qarzdorlik eslatmasi", message: "Biloliddin Qodirov — 850,000 UZS qarzdorlik. Ota-onasiga eslatma yuborildi.", date: "2026-10-10 09:30", read: false },
    { id: "NTF-002", type: "payment", icon: "fa-money-bill-wave", color: "emerald", title: "To'lov qabul qilindi", message: "Asadbek Temirov — Math-Prezident-1 kursi uchun 850,000 UZS to'landi.", date: "2026-10-10 08:45", read: false },
    { id: "NTF-003", type: "lead", icon: "fa-user-plus", color: "indigo", title: "Yangi ariza kelib tushdi", message: "Ibrohim Sultonov — IELTS va Matematika bo'yicha sinov darsi so'radi.", date: "2026-10-10 11:20", read: false },
    { id: "NTF-004", type: "sms", icon: "fa-paper-plane", color: "amber", title: "SMS yuborildi", message: "3 nafar qarzdor o'quvchi ota-onasiga to'lov eslatma SMS yuborildi.", date: "2026-10-09 16:00", read: true },
    { id: "NTF-005", type: "attendance", icon: "fa-clipboard-check", color: "indigo", title: "Davomat hisoboti", message: "Bugungi davomat: 94% (17/18 o'quvchi). Biloliddin Qodirov kelmadi.", date: "2026-10-10 13:00", read: false },
    { id: "NTF-006", type: "system", icon: "fa-gear", color: "amber", title: "Tizim yangilandi", message: "EduPrime CRM yangi versiyaga yangilandi. Davomat va guruhlar moduli qo'shildi.", date: "2026-10-09 10:00", read: true },
    { id: "NTF-007", type: "payment", icon: "fa-receipt", color: "emerald", title: "Chek chop etildi", message: "Bobur Shokirov uchun 950,000 UZS to'lov cheki chop etildi.", date: "2026-10-09 14:30", read: true },
    { id: "NTF-008", type: "lead", icon: "fa-bullseye", color: "indigo", title: "Lid statusini yangilang", message: "Zuhra Murodova — Kimyo-Biologiya bo'yicha 2 kun ichida javob berilmagan.", date: "2026-10-09 09:00", read: false },
    { id: "NTF-009", type: "expense", icon: "fa-wallet", color: "rose", title: "Xarajat qayd etildi", message: "Yangi smartboard uchun 4,800,000 UZS xarajat rasmiylashtirildi.", date: "2026-10-08 15:00", read: true },
    { id: "NTF-010", type: "telegram", icon: "fa-paper-plane", color: "emerald", title: "Telegram xabar yuborildi", message: "Barcha ota-onalarga haftalik hisobot Telegram orqali yuborildi.", date: "2026-10-08 18:00", read: true },
    { id: "NTF-011", type: "attendance", icon: "fa-user-check", color: "emerald", title: "Mukammal davomat", message: "Math-Prezident-1 guruhi 100% davomat ko'rsatdi. Ajoyib natija!", date: "2026-10-08 13:00", read: true },
    { id: "NTF-012", type: "debt", icon: "fa-clock", color: "rose", title: "To'lov muddati yaqinlashmoqda", message: "Mirjalol Rahimov — IELTS kursi uchun 1,100,000 UZS. 3 kun qoldi.", date: "2026-10-07 10:00", read: true }
  ],

  // 8. Davomat yozuvlari (attendance records)
  attendance: {},

  // 9. Yuborilgan xabarlar tarixi
  sentMessages: [
    { id: "MSG-001", channel: "sms", target: "Qarzdorlar", text: "Hurmatli ota-ona! Farzandingizning to'lov muddati o'tib ketgan. Iltimos, 3 kun ichida to'lovni amalga oshiring.", date: "2026-10-09 16:00", recipientCount: 3 },
    { id: "MSG-002", channel: "telegram", target: "Barcha ota-onalar", text: "Assalomu alaykum! Haftalik dars jadvali yangilandi. Batafsil: EduPrime CRM orqali ko'ring.", date: "2026-10-08 18:00", recipientCount: 18 },
    { id: "MSG-003", channel: "sms", target: "Math-Prezident-1", text: "Eslatma: Ertaga Dushanba kuni 14:30 da Matematika darsi bo'ladi. O'z vaqtida kelib qolishingizni so'raymiz.", date: "2026-10-06 20:00", recipientCount: 5 },
    { id: "MSG-004", channel: "telegram", target: "IELTS-Target-7.5", text: "IELTS Mock Test natijalari tayyor! O'quvchilar shaxsiy kabinetidan ko'rishlari mumkin.", date: "2026-10-05 14:00", recipientCount: 6 },
    { id: "MSG-005", channel: "both", target: "Barcha ota-onalar", text: "Ziyo Nur Maktabi jamoasi sizni Muallimlar kuniga bag'ishlangan ochiq eshiklar kuniga taklif qiladi! 🎉", date: "2026-10-01 10:00", recipientCount: 18 }
  ]
};

// LocalStorage Helper funksiyalari
const STORAGE_KEY = "EDUPRIME_CRM_DATA_V1";

function loadCRMData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const data = JSON.parse(saved);
      const leadPhotos = [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
      ];
      if (data.leads) {
        data.leads.forEach((l, idx) => {
          if (!l.photo) l.photo = leadPhotos[idx % leadPhotos.length];
        });
      }
      return data;
    } catch (e) {
      console.error("Ma'lumotlarni o'qishda xatolik:", e);
    }
  }
  // Agar saqlangan bo'lmasa, boshlang'ich ma'lumotlarni yozamiz
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveCRMData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function resetCRMData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

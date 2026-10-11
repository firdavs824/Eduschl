// ===================================================================
// EduPrime CRM - Asosiy Dastur Mantiqi (App Logic)
// Xususiy Maktab & Repetitorlik Markazi
// ===================================================================

let state = {
  data: null,
  currentView: "dashboard-view",
  currentRole: "admin", // 'admin' yoki 'teacher'
  selectedTeacherId: null,
  activeTeacherPortalId: "TCH-001", // Agar ustoz rejimiga o'tilsa
  teacherFilter: "all",
  studentFilter: "all",
  searchQuery: ""
};

// ===================================================================
// Tizimni Yuklash va Boshlash
// ===================================================================
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  state.data = loadCRMData();

  // Saqlangan mavzuni tekshirish
  const savedTheme = localStorage.getItem("EDUPRIME_THEME") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  // Hodisalarni bog'lash
  setupNavigationEvents();
  setupSearchEvents();

  // Boshlang'ich renderlar
  renderAll();
  updateBadges();
  loadTelegramSettings();
}

function renderAll() {
  renderDashboard();
  renderTeachersList();
  renderStudentsTable();
  renderScheduleView();
  renderFinanceView();
  renderLeadsView();
  renderAttendanceView();
  renderGroupsView();
  renderExpensesView();
  renderNotificationsView();
}

// ===================================================================
// 1. Navigatsiya va Ko'rinishlar (Views)
// ===================================================================
function setupNavigationEvents() {
  const navItems = document.querySelectorAll(".nav-menu .nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const viewId = item.getAttribute("data-view");
      if (viewId) {
        switchView(viewId);
      }
    });
  });

  // Escape tugmasi bosilganda mobil menyu va oynalarni yopish
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileSidebar();
      closeAllActiveModals();
    }
  });

  // Ekran o'lchami kattalashganda mobil menyuni avtomatik tozalash
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMobileSidebar();
    }
  });
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (sidebar) {
    const isOpen = sidebar.classList.toggle("mobile-open");
    if (backdrop) backdrop.classList.toggle("active", isOpen);
    document.body.classList.toggle("sidebar-lock-scroll", isOpen);
  }
}

function openMobileSidebar() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (sidebar) {
    sidebar.classList.add("mobile-open");
    if (backdrop) backdrop.classList.add("active");
    document.body.classList.add("sidebar-lock-scroll");
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (sidebar) {
    sidebar.classList.remove("mobile-open");
    if (backdrop) backdrop.classList.remove("active");
    document.body.classList.remove("sidebar-lock-scroll");
  }
}

function closeAllActiveModals() {
  document.querySelectorAll(".modal-overlay.active").forEach(m => m.classList.remove("active"));
}

function switchView(viewId) {
  state.currentView = viewId;

  // Mobil qurilmalarda menyuni yopish
  if (window.innerWidth <= 860) {
    closeMobileSidebar();
  }

  // Nav itemlarni yangilash
  document.querySelectorAll(".nav-menu .nav-item").forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("data-view") === viewId) {
      item.classList.add("active");
    }
  });

  // Pastki mobil navigatsiya tugmalarini yangilash
  document.querySelectorAll(".mobile-bottom-nav .bottom-nav-item").forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("data-view") === viewId) {
      item.classList.add("active");
    }
  });

  // Kontent bo'limlarini almashtirish
  document.querySelectorAll(".view-section").forEach(sec => {
    sec.classList.remove("active-view");
  });

  const activeSection = document.getElementById(viewId);
  if (activeSection) {
    activeSection.classList.add("active-view");
  }

  // Sahifa sarlavhasini yangilash
  updateBreadcrumbs(viewId);

  // Sahifani yuqorisiga o'tkazish
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateBreadcrumbs(viewId) {
  const titles = {
    "dashboard-view": { title: "Boshqaruv Paneli", subtitle: "Ziyo Nur Xususiy Maktabi & Repetitorlik Tizimi" },
    "teachers-view": { title: "Ustozlar va Repetitorlar", subtitle: "Ustozlar dars jadvallari va repetitor o'quvchilari ro'yxati" },
    "students-view": { title: "O'quvchilar Bazasi", subtitle: "Barcha maktab va repetitorlik kurslaridagi bolalar" },
    "schedule-view": { title: "Dars Jadvallari", subtitle: "Haftalik smenalar va repetitor soatlari" },
    "finance-view": { title: "Moliya & To'lovlar", subtitle: "Oylik kontraktlar, repetitor to'lovlari va qarzdorliklar" },
    "leads-view": { title: "Qabul & Yangi Arizalar", subtitle: "CRM voronkasi va sinov darslariga yozilganlar" },
    "attendance-view": { title: "Davomat Tizimi", subtitle: "Kunlik keldi/kelmadi belgilash va oylik statistika" },
    "groups-view": { title: "Guruhlar Boshqaruvi", subtitle: "Guruhlar ochish, o'quvchilar qo'shish va sig'imni boshqarish" },
    "expenses-view": { title: "Xarajatlar & Ish Haqi", subtitle: "Oylik chiqimlar, maosh va xarajatlar hisobi" },
    "notifications-view": { title: "Bildirishnomalar Markazi", subtitle: "SMS, Telegram va tizim xabarlari" },
    "settings-view": { title: "Tizim Sozlamalari", subtitle: "Maktab profili va konfiguratsiya" }
  };

  const meta = titles[viewId] || { title: "EduPrime CRM", subtitle: "Boshqaruv paneli" };
  document.getElementById("pageTitle").textContent = meta.title;
  document.getElementById("pageSubtitle").textContent = meta.subtitle;
}

// ===================================================================
// 2. Global Qidiruv Tizimi & Mobil Qidiruv
// ===================================================================
function setupSearchEvents() {
  const searchInput = document.getElementById("globalSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value.toLowerCase().trim();
      state.searchQuery = val;
      const mobileInput = document.getElementById("mobileSearchInput");
      if (mobileInput) mobileInput.value = e.target.value;

      applyGlobalSearch();
    });
  }

  // Mobil swipe orqali sidebarni yopish
  let touchStartX = 0;
  let touchEndX = 0;
  document.addEventListener("touchstart", (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchStartX = e.changedTouches[0].screenX;
    }
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchEndX = e.changedTouches[0].screenX;
      const sidebar = document.getElementById("sidebar");
      if (sidebar && sidebar.classList.contains("mobile-open")) {
        if (touchStartX - touchEndX > 50) {
          closeMobileSidebar();
        }
      }
    }
  }, { passive: true });
}

function toggleMobileSearchBar(forceState) {
  const dropdown = document.getElementById("mobileSearchDropdown");
  const input = document.getElementById("mobileSearchInput");
  if (!dropdown) return;
  const willOpen = forceState !== undefined ? forceState : !dropdown.classList.contains("active");
  dropdown.classList.toggle("active", willOpen);
  if (willOpen && input) {
    setTimeout(() => input.focus(), 60);
    input.value = state.searchQuery || "";
  }
}

function handleMobileSearch(value) {
  state.searchQuery = value.toLowerCase().trim();
  const desktopSearch = document.getElementById("globalSearchInput");
  if (desktopSearch) desktopSearch.value = value;
  applyGlobalSearch();
}

function applyGlobalSearch() {
  if (state.currentView === "teachers-view") {
    renderTeachersList();
  } else if (state.currentView === "students-view") {
    renderStudentsTable();
  } else if (state.currentView === "leads-view") {
    renderLeadsTable();
  } else if (state.currentView === "dashboard-view") {
    if (state.searchQuery) {
      switchView("teachers-view");
      renderTeachersList();
    }
  }
}

// ===================================================================
// 3. Rollar Boshqaruvi: Admin va Ustoz Rejimi
// ===================================================================
function switchSystemRole(role) {
  state.currentRole = role;
  const btnAdmin = document.getElementById("btnAdminRole");
  const btnTeacher = document.getElementById("btnTeacherRole");
  const roleText = document.getElementById("currentRoleText");
  const sideName = document.getElementById("sidebarUserName");
  const sideRole = document.getElementById("sidebarUserRole");
  const sideAvatar = document.getElementById("sidebarAvatar");

  if (role === "admin") {
    btnAdmin.classList.add("active");
    btnTeacher.classList.remove("active");
    roleText.textContent = "Admin Boshqaruvi";
    sideName.textContent = "Bosh Administrator";
    sideRole.textContent = "Super Admin";
    sideAvatar.textContent = "AD";
    showNotificationToast("Administrator rejimi faollashtirildi");
  } else {
    btnAdmin.classList.remove("active");
    btnTeacher.classList.add("active");
    
    // Tanlangan ustoz profiliga o'tamiz
    const teacher = state.data.teachers.find(t => t.id === state.activeTeacherPortalId) || state.data.teachers[0];
    roleText.textContent = `${teacher.name} (Ustoz)`;
    sideName.textContent = teacher.name;
    sideRole.textContent = teacher.subject;
    sideAvatar.textContent = teacher.name.split(" ").map(n => n[0]).join("");
    
    showNotificationToast(`${teacher.name} shaxsiy kabineti ochildi`);
    // Ustoz panelini ochish
    openTeacherDetailModal(teacher.id);
  }
}

function openRoleSwitcherModal() {
  const isCurrentlyAdmin = state.currentRole === "admin";
  switchSystemRole(isCurrentlyAdmin ? "teacher" : "admin");
}

// ===================================================================
// 4. Boshqaruv Paneli (Dashboard) Render
// ===================================================================
function renderDashboard() {
  const d = state.data;
  
  // KPI larni hisoblash
  const totalStudents = d.students.length;
  const totalTeachers = d.teachers.length;
  
  // Qarzdorlar soni
  const debtors = d.students.filter(s => {
    return s.schoolPaymentStatus === "Qarzdor" || 
      (s.tutorCourses && s.tutorCourses.some(tc => tc.paymentStatus === "Qarzdor"));
  });

  document.getElementById("kpiTotalStudents").textContent = totalStudents;
  document.getElementById("kpiTotalTeachers").textContent = totalTeachers;
  document.getElementById("kpiDebtorsCount").textContent = `${debtors.length} nafar`;

  // Bugungi darslar xronologiyasi
  const todayContainer = document.getElementById("dashboardTodayClasses");
  todayContainer.innerHTML = "";

  const allLessons = [];
  d.teachers.forEach(t => {
    t.schedule.forEach(sch => {
      allLessons.push({
        teacherName: t.name,
        subject: t.subject,
        time: sch.time,
        day: sch.day,
        group: sch.group,
        room: sch.room,
        topic: sch.topic,
        type: t.type
      });
    });
  });

  // Bugungi yoki dushanba/seshanba namunasidan 4 tasini chiqaramiz
  const previewLessons = allLessons.slice(0, 5);
  previewLessons.forEach(l => {
    const item = document.createElement("div");
    item.className = `today-class-item ${l.type === "repetitor" ? "repetitor-type" : ""}`;
    item.innerHTML = `
      <div class="today-class-top">
        <span class="class-time-tag"><i class="fa-regular fa-clock"></i> ${l.time}</span>
        <span class="status-badge ${l.type === 'repetitor' ? 'status-trial' : 'status-paid'}">
          ${l.type === 'repetitor' ? 'Repetitor' : 'Maktab'}
        </span>
      </div>
      <div class="class-info">
        <h4>${l.group} — ${l.subject}</h4>
        <p><i class="fa-solid fa-chalkboard-user"></i> ${l.teacherName} • <i class="fa-solid fa-location-dot"></i> ${l.room} • <em>${l.topic}</em></p>
      </div>
    `;
    todayContainer.appendChild(item);
  });

  // Yangi lidlar
  const leadsContainer = document.getElementById("dashboardRecentLeads");
  leadsContainer.innerHTML = "";
  
  const leadFallbackPhotos = [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
  ];

  d.leads.slice(0, 4).forEach((lead, idx) => {
    const div = document.createElement("div");
    div.className = "lead-item";
    div.onclick = () => switchView("leads-view");

    // Statusni qisqartirish va ixchamlashtirish
    let shortStatus = "Yangi";
    let statusClass = "status-info";
    let statusIcon = "fa-sparkles";

    if (lead.status && lead.status.toLowerCase().includes("sinov")) {
      shortStatus = "Sinov darsi";
      statusClass = "status-trial";
      statusIcon = "fa-clock";
    } else if (lead.status && lead.status.toLowerCase().includes("to'lov")) {
      shortStatus = "To'lov";
      statusClass = "status-pending";
      statusIcon = "fa-hourglass-half";
    } else if (lead.status && lead.status.toLowerCase().includes("yangi")) {
      shortStatus = "Yangi";
      statusClass = "status-info";
      statusIcon = "fa-sparkles";
    } else {
      shortStatus = lead.status;
    }

    // Kurs nomini qisqartirish (masalan " Repetitor" so'zini olib tashlash)
    const cleanCourse = (lead.course || "").replace(/\s*Repetitor\s*/i, "").trim();
    const photoUrl = lead.photo || leadFallbackPhotos[idx % leadFallbackPhotos.length];

    div.innerHTML = `
      <div class="lead-left">
        <div class="lead-avatar-wrap">
          <img src="${photoUrl}" alt="${lead.name}" class="lead-avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="lead-avatar-fallback">${lead.name ? lead.name[0] : 'L'}</div>
          <span class="lead-status-dot"></span>
        </div>
        <div class="lead-info">
          <div class="lead-title-row">
            <h4 class="lead-name">${lead.name}</h4>
            <span class="lead-class-badge">${lead.age}</span>
          </div>
          <p class="lead-meta">
            <span class="lead-course-txt" title="${lead.course}">${cleanCourse}</span>
            <span class="lead-dot-sep">•</span>
            <span class="lead-phone-txt"><i class="fa-solid fa-phone"></i> ${lead.phone}</span>
          </p>
        </div>
      </div>
      <div class="lead-right">
        <span class="lead-status-pill ${statusClass}">
          <i class="fa-solid ${statusIcon}"></i> ${shortStatus}
        </span>
      </div>
    `;
    leadsContainer.appendChild(div);
  });

  // Repetitorlar preview
  const teachersPreviewGrid = document.getElementById("dashboardTeachersPreview");
  teachersPreviewGrid.innerHTML = "";
  d.teachers.slice(0, 3).forEach(teacher => {
    teachersPreviewGrid.appendChild(createTeacherCardElement(teacher));
  });
}

// ===================================================================
// 5. MAXSUS ASOSIY FUNKSIYA: O'QITUVCHILAR VA REPETITORLAR BO'LIMI
// "1 ta ustozni ustiga bosganda uning qachon dars otishi va repetitoridagi
// bollarni ism familiyasi chiqib kelishi kerak"
// ===================================================================
function renderTeachersList() {
  const container = document.getElementById("teachersListGrid");
  container.innerHTML = "";

  let list = state.data.teachers;

  // Filtr (repetitor, maktab, barchasi)
  if (state.teacherFilter !== "all") {
    list = list.filter(t => t.type === state.teacherFilter || t.type === "both");
  }

  // Qidiruv
  if (state.searchQuery) {
    const q = state.searchQuery;
    list = list.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.subject.toLowerCase().includes(q) || 
      t.room.toLowerCase().includes(q)
    );
  }

  // Bannerdagi sonlar
  document.getElementById("bannerTotalTutorsCount").textContent = state.data.teachers.length;
  let totalGroups = 0;
  state.data.teachers.forEach(t => totalGroups += (t.tutorGroups ? t.tutorGroups.length : 0));
  document.getElementById("bannerTotalGroupsCount").textContent = totalGroups;

  list.forEach(teacher => {
    container.appendChild(createTeacherCardElement(teacher));
  });
}

function filterTeachers(filterType) {
  state.teacherFilter = filterType;
  document.querySelectorAll("#teacherFilterPills .filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-filter") === filterType);
  });
  renderTeachersList();
}

// Dars jadvalini qisqartirib ixcham satr holiga keltirish
function getShortScheduleSummary(schedule) {
  if (!schedule || schedule.length === 0) return "Jadval belgilanmagan";

  const dayAbbr = {
    "Dushanba": "Dush",
    "Seshanba": "Sesh",
    "Chorshanba": "Chor",
    "Payshanba": "Pay",
    "Juma": "Juma",
    "Shanba": "Shan",
    "Yakshanba": "Yak"
  };

  const days = [];
  schedule.forEach(s => {
    const abbr = dayAbbr[s.day] || (s.day ? s.day.substring(0, 4) : "");
    if (abbr && !days.includes(abbr)) days.push(abbr);
  });

  const startTime = schedule[0]?.time?.split("-")[0]?.trim() || "";
  const daysStr = days.join(", ");

  return startTime ? `${daysStr} • ${startTime}` : daysStr;
}

// Ustoz Kartochkasi Elementini Yaratish (KATTA RASM VA IXCHAM TARKIB)
function createTeacherCardElement(teacher) {
  const card = document.createElement("div");
  card.className = "teacher-card";
  card.onclick = () => openTeacherDetailModal(teacher.id);

  // Bu ustoz repetitoriga qatnaydigan o'quvchilar sonini aniqlash
  const tutorStudentsCount = countStudentsForTeacher(teacher.id);

  // Dars jadvalidan ixcham 1 qatorlik qisqa xulosa
  const shortSchedule = getShortScheduleSummary(teacher.schedule);

  const badgeClass = teacher.type === "repetitor" ? "badge-repetitor" : (teacher.type === "both" ? "badge-both" : "badge-maktab");
  const badgeLabel = teacher.type === "repetitor" ? "⭐ Repetitor" : (teacher.type === "both" ? "⭐ Maktab & Repetitor" : "Maktab Ustozi");

  card.innerHTML = `
    <!-- 1. KATTA VA EFFEKTLI RASM JOYI (HERO COVER BANNER) -->
    <div class="teacher-cover-wrap">
      <img src="${teacher.photo}" alt="${teacher.name}" class="teacher-cover-img" loading="lazy">
      <div class="teacher-cover-gradient"></div>
      
      <!-- Rasmdagi Badjlar -->
      <span class="teacher-card-badge ${badgeClass}">${badgeLabel}</span>
      
      <div class="teacher-rating-chip">
        <i class="fa-solid fa-star"></i> ${teacher.rating}
      </div>

      <!-- Rasmdagi Pastki Effektlar (Faol pulsatsiyasi va tajriba) -->
      <div class="teacher-cover-footer">
        <div class="teacher-live-indicator">
          <span class="pulse-indicator-dot"></span>
          <span>Faol</span>
        </div>
        <div class="teacher-exp-tag">
          <i class="fa-solid fa-award"></i> ${teacher.experience}
        </div>
      </div>
    </div>

    <!-- 2. IXCHAM KARTA ASOSIY QISMI (ORTIQCHA MATNLAR QISQARTIRILGAN) -->
    <div class="teacher-card-body">
      <div class="teacher-title-block">
        <h3 class="teacher-card-name">${teacher.name}</h3>
        <div class="teacher-card-subject">
          <i class="fa-solid fa-graduation-cap"></i> ${teacher.subject}
        </div>
      </div>

      <!-- QISQARTIRILGAN IXCHAM DARS JADVALI CHIP'I (UZUN MATN O'RNIGA) -->
      <div class="teacher-compact-schedule" title="Dars jadvali: ${shortSchedule}">
        <div class="sched-pill-label">
          <i class="fa-solid fa-calendar-check"></i>
          <span class="sched-pill-text">${shortSchedule}</span>
        </div>
        <span class="sched-count-badge">${teacher.schedule.length} dars</span>
      </div>

      <!-- IXCHAM XONA VA NARX KO'RSATKICHLARI -->
      <div class="teacher-quick-stats">
        <div class="quick-stat-badge" title="${teacher.room}">
          <i class="fa-solid fa-door-open"></i>
          <span>${(teacher.room || '').replace(/\s*\(.*?\)/, '')}</span>
        </div>
        <div class="quick-stat-badge price-badge" title="Kurs narxi">
          <i class="fa-solid fa-tag"></i>
          <span>${teacher.hourlyRate}</span>
        </div>
      </div>
    </div>

    <!-- 3. KARTA PASTKI FOOTERI -->
    <div class="teacher-card-footer">
      <div class="students-count-tag">
        <i class="fa-solid fa-users"></i> ${tutorStudentsCount} nafar o'quvchi
      </div>
      <div class="view-details-arrow">
        Batafsil ko'rish <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  `;

  return card;
}

function countStudentsForTeacher(teacherId) {
  let count = 0;
  state.data.students.forEach(s => {
    if (s.tutorCourses && s.tutorCourses.some(tc => tc.teacherId === teacherId)) {
      count++;
    }
  });
  return count;
}

// ===================================================================
// 6. USTOZ BATAFSIL MODALINI OCHISH
// DARS JADVALI VA REPETITORDAGI BOLLARNING ISM-FAMILIYASI CHIQADI!
// ===================================================================
function openTeacherDetailModal(teacherId) {
  state.selectedTeacherId = teacherId;
  const teacher = state.data.teachers.find(t => t.id === teacherId);
  if (!teacher) return;

  // Header ma'lumotlari
  document.getElementById("modalTeacherImg").src = teacher.photo;
  document.getElementById("modalTeacherName").textContent = teacher.name;
  document.getElementById("modalTeacherSubject").textContent = teacher.subject;
  document.getElementById("modalTeacherRoom").textContent = teacher.room;
  document.getElementById("modalTeacherBadge").textContent = teacher.role;

  // 1-TAB: DARS JADVALI (QACHON DARS O'TISHI)
  const scheduleContainer = document.getElementById("modalTeacherScheduleList");
  scheduleContainer.innerHTML = "";
  document.getElementById("modalScheduleCount").textContent = `${teacher.schedule.length} ta`;

  teacher.schedule.forEach(sch => {
    const row = document.createElement("div");
    row.className = "schedule-card-row";
    row.innerHTML = `
      <div class="schedule-day-box">
        <div class="day-badge">${sch.day}</div>
        <div class="schedule-time-meta">
          <div class="time"><i class="fa-solid fa-clock"></i> ${sch.time}</div>
          <div class="group"><i class="fa-solid fa-users-line"></i> Guruh: <strong>${sch.group}</strong></div>
        </div>
      </div>
      <div class="schedule-topic-meta">
        <strong>Dars mavzusi:</strong> ${sch.topic}
      </div>
      <div>
        <span class="schedule-room-badge"><i class="fa-solid fa-location-dot"></i> ${sch.room}</span>
      </div>
    `;
    scheduleContainer.appendChild(row);
  });

  // 2-TAB: REPETITORDAGI BOLALAR RO'YXATI (ISM-FAMILIYALARI)
  const studentsTbody = document.getElementById("modalTeacherStudentsList");
  studentsTbody.innerHTML = "";

  const enrolledStudents = [];
  state.data.students.forEach(st => {
    if (st.tutorCourses) {
      st.tutorCourses.forEach(tc => {
        if (tc.teacherId === teacherId) {
          enrolledStudents.push({
            student: st,
            courseInfo: tc
          });
        }
      });
    }
  });

  document.getElementById("modalTutorStudentsCount").textContent = enrolledStudents.length;

  if (enrolledStudents.length === 0) {
    studentsTbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 24px; color: var(--text-muted);">
          Ushbu ustoz repetitorlik kursiga hozircha o'quvchilar biriktirilmagan.
        </td>
      </tr>
    `;
  } else {
    enrolledStudents.forEach(item => {
      const s = item.student;
      const tc = item.courseInfo;
      const isPaid = tc.paymentStatus === "To'langan";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <div class="student-table-name">
            <div class="avatar-circle-sm">${s.avatar || s.name[0]}</div>
            <div>
              <div class="student-name-text">${s.name}</div>
              <div class="student-phone-sub">ID: ${s.id}</div>
            </div>
          </div>
        </td>
        <td><strong>${s.schoolClass}</strong></td>
        <td><span style="color: var(--primary); font-weight:700;">${tc.group}</span></td>
        <td>
          <div><i class="fa-solid fa-phone" style="font-size:11px; color: var(--text-muted);"></i> ${s.parentPhone}</div>
          <div style="font-size:11px; color: var(--text-muted);">${s.parentName}</div>
        </td>
        <td>
          <span class="status-badge ${isPaid ? 'status-paid' : 'status-debt'}">
            ${isPaid ? "✓ To'langan" : "✗ Qarzdor"}
          </span>
          <div style="font-size: 11px; margin-top: 2px;">${formatMoney(tc.fee)} UZS</div>
        </td>
        <td>
          <strong style="color: var(--accent-emerald);">${tc.grade || '85%'}</strong>
        </td>
      </tr>
      `;
      studentsTbody.appendChild(tr);
    });
  }

  // 3-TAB: USTOZ HAQIDA & TO'LOVLAR
  document.getElementById("modalTeacherPhone").textContent = teacher.phone;
  document.getElementById("modalTeacherEmail").textContent = teacher.email;
  document.getElementById("modalTeacherExp").textContent = teacher.experience;
  document.getElementById("modalTeacherRoomDetail").textContent = teacher.room;
  document.getElementById("modalTeacherRate").textContent = teacher.hourlyRate;
  document.getElementById("modalTeacherBio").textContent = teacher.bio;

  // Jami tushum
  let tutorRevenue = 0;
  enrolledStudents.forEach(e => tutorRevenue += (e.courseInfo.fee || 800000));
  const tutorShare = Math.round(tutorRevenue * 0.7);

  document.getElementById("modalTeacherRevenue").textContent = formatMoney(tutorRevenue) + " UZS";
  document.getElementById("modalTeacherShare").textContent = formatMoney(tutorShare) + " UZS";

  // Tabni birinchisiga o'rnatish
  switchModalTab("tab-schedule");

  // Modalni ko'rsatish
  document.getElementById("teacherDetailModal").classList.add("active");
}

function closeTeacherModal() {
  document.getElementById("teacherDetailModal").classList.remove("active");
}

function switchModalTab(tabId) {
  // Tab tugmalari
  document.querySelectorAll(".modal-tab-btn").forEach(btn => btn.classList.remove("active"));
  if (tabId === "tab-schedule") document.getElementById("btnTabSchedule").classList.add("active");
  if (tabId === "tab-students") document.getElementById("btnTabStudents").classList.add("active");
  if (tabId === "tab-info") document.getElementById("btnTabInfo").classList.add("active");

  // Tab panellari
  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
  const currentPane = document.getElementById(tabId);
  if (currentPane) currentPane.classList.add("active");
}

function simulateSendSMS() {
  const teacher = state.data.teachers.find(t => t.id === state.selectedTeacherId);
  showNotificationToast(`📱 ${teacher.name} guruhlaridagi barcha ota-onalarga dars eslatmasi SMS orqali yuborildi!`);
}

function openTeacherPersonalView() {
  closeTeacherModal();
  state.activeTeacherPortalId = state.selectedTeacherId;
  switchSystemRole("teacher");
}

// ===================================================================
// 7. O'quvchilar Bazasi (Students) Jadvali
// ===================================================================
function renderStudentsTable() {
  const tbody = document.getElementById("studentsTableBody");
  tbody.innerHTML = "";

  let list = state.data.students;

  // Filtr
  if (state.studentFilter === "repetitor") {
    list = list.filter(s => s.tutorCourses && s.tutorCourses.length > 0);
  } else if (state.studentFilter === "debt") {
    list = list.filter(s => s.schoolPaymentStatus === "Qarzdor" || (s.tutorCourses && s.tutorCourses.some(c => c.paymentStatus === "Qarzdor")));
  }

  // Qidiruv
  if (state.searchQuery) {
    const q = state.searchQuery;
    list = list.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.schoolClass.toLowerCase().includes(q) || 
      s.parentPhone.includes(q)
    );
  }

  list.forEach(s => {
    const tr = document.createElement("tr");

    // Repetitor kurslari ro'yxati
    let tutorCoursesHtml = "-";
    if (s.tutorCourses && s.tutorCourses.length > 0) {
      tutorCoursesHtml = s.tutorCourses.map(tc => `
        <div style="font-size:12px; margin-bottom:3px;">
          <span style="font-weight:700; color:var(--primary);">${tc.subject}</span>
          <span style="color:var(--text-muted);">(${tc.teacherName})</span>
        </div>
      `).join("");
    }

    const hasDebt = s.schoolPaymentStatus === "Qarzdor" || (s.tutorCourses && s.tutorCourses.some(c => c.paymentStatus === "Qarzdor"));

    tr.innerHTML = `
      <td>
        <div class="student-table-name">
          <div class="avatar-circle-sm">${s.avatar || s.name[0]}</div>
          <div>
            <div class="student-name-text">${s.name}</div>
            <div class="student-phone-sub">Yoshi: ${s.age} yosh</div>
          </div>
        </div>
      </td>
      <td><strong>${s.schoolClass}</strong></td>
      <td>${tutorCoursesHtml}</td>
      <td>
        <div><i class="fa-solid fa-phone"></i> ${s.parentPhone}</div>
        <div style="font-size:11px; color:var(--text-muted);">${s.parentName}</div>
      </td>
      <td>
        <span class="status-badge ${hasDebt ? 'status-debt' : 'status-paid'}">
          ${hasDebt ? "✗ Qarzdorlik bor" : "✓ To'langan"}
        </span>
      </td>
      <td>
        <strong style="color:var(--accent-emerald);">92%</strong>
      </td>
      <td>
        <div style="display:flex; gap:6px;">
          <button class="icon-btn" title="To'lov qilish" onclick="openPaymentForStudent('${s.id}')">
            <i class="fa-solid fa-receipt"></i>
          </button>
          <button class="icon-btn" title="O'chirish" onclick="deleteStudent('${s.id}')">
            <i class="fa-solid fa-trash-can" style="color: var(--accent-rose);"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterStudents(filterType, btnElement) {
  state.studentFilter = filterType;
  document.querySelectorAll("#studentFilterPills .filter-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  if (btnElement) {
    btnElement.classList.add("active");
  } else if (typeof event !== "undefined" && event && event.target) {
    event.target.classList.add("active");
  }
  renderStudentsTable();
}

function deleteStudent(studentId) {
  if (confirm("Haqiqatan ham ushbu o'quvchini tizimdan o'chirmoqchimisiz?")) {
    state.data.students = state.data.students.filter(s => s.id !== studentId);
    saveCRMData(state.data);
    renderAll();
    updateBadges();
    showNotificationToast("O'quvchi muvaffaqiyatli o'chirildi");
  }
}

// ===================================================================
// 8. Haftalik Dars Jadvallari (Schedule View)
// ===================================================================
function renderScheduleView() {
  const container = document.getElementById("fullScheduleContainer");
  container.innerHTML = "";

  const dayFilter = document.getElementById("scheduleDayFilter").value;

  const allItems = [];
  state.data.teachers.forEach(teacher => {
    teacher.schedule.forEach(sch => {
      if (dayFilter === "all" || sch.day.includes(dayFilter)) {
        allItems.push({
          teacher: teacher,
          schedule: sch
        });
      }
    });
  });

  if (allItems.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 30px; color: var(--text-muted);">Ushbu kunga darslar rejalashtirilmagan.</div>`;
    return;
  }

  allItems.forEach(item => {
    const t = item.teacher;
    const sch = item.schedule;

    const row = document.createElement("div");
    row.className = "schedule-card-row";
    row.innerHTML = `
      <div class="schedule-day-box">
        <div class="day-badge">${sch.day}</div>
        <div class="schedule-time-meta">
          <div class="time"><i class="fa-solid fa-clock"></i> ${sch.time}</div>
          <div class="group"><strong>${sch.group}</strong> (${t.subject})</div>
        </div>
      </div>
      <div class="schedule-topic-meta">
        <strong>Ustoz:</strong> ${t.name} • <em>${sch.topic}</em>
      </div>
      <div style="display:flex; align-items:center; gap:10px;">
        <span class="schedule-room-badge"><i class="fa-solid fa-location-dot"></i> ${sch.room}</span>
        <button class="btn-secondary" style="padding: 6px 12px; font-size: 11px;" onclick="openTeacherDetailModal('${t.id}')">
          Ustoz profilini ochish
        </button>
      </div>
    `;
    container.appendChild(row);
  });
}

// ===================================================================
// 9. Moliya & To'lovlar (Finance View)
// ===================================================================
function renderFinanceView() {
  const tbody = document.getElementById("paymentsTableBody");
  tbody.innerHTML = "";

  state.data.payments.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${p.id}</strong></td>
      <td><strong>${p.studentName}</strong></td>
      <td>${p.course}</td>
      <td>${p.teacher}</td>
      <td><strong style="color:var(--accent-emerald);">${formatMoney(p.amount)} UZS</strong></td>
      <td>${p.date}</td>
      <td>${p.method}</td>
      <td><span class="status-badge status-paid">${p.status}</span></td>
      <td>
        <button class="icon-btn" onclick="quickViewReceipt('${p.id}')" title="Chekni ko'rish">
          <i class="fa-solid fa-print"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function quickViewReceipt(payId) {
  const p = state.data.payments.find(pay => pay.id === payId);
  if (!p) return;

  document.getElementById("recStudentName").textContent = p.studentName;
  document.getElementById("recCourseName").textContent = `${p.course} (${p.teacher})`;
  document.getElementById("recMethod").textContent = p.method;
  document.getElementById("recDate").textContent = p.date;
  document.getElementById("recAmount").textContent = formatMoney(p.amount) + " UZS";

  document.getElementById("paymentModal").classList.add("active");
}

// ===================================================================
// 10. Qabul & Lidlar (Leads View)
// ===================================================================
function renderLeadsView() {
  const tbody = document.getElementById("leadsTableBody");
  tbody.innerHTML = "";

  state.data.leads.forEach(lead => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${lead.id}</strong></td>
      <td><strong>${lead.name}</strong></td>
      <td>${lead.age}</td>
      <td><span style="color:var(--primary); font-weight:700;">${lead.course}</span></td>
      <td><i class="fa-solid fa-phone"></i> ${lead.phone}</td>
      <td><span class="status-badge status-trial">${lead.status}</span></td>
      <td style="font-size:12px; color:var(--text-muted);">${lead.note}</td>
      <td>
        <button class="btn-primary" style="padding: 5px 10px; font-size:11px;" onclick="convertLeadToStudent('${lead.id}')">
          <i class="fa-solid fa-user-check"></i> O'quvchiga aylantirish
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function convertLeadToStudent(leadId) {
  const lead = state.data.leads.find(l => l.id === leadId);
  if (!lead) return;

  // Yangi o'quvchi sifatida ro'yxatga olamiz
  const newStudent = {
    id: "STU-" + Math.floor(100 + Math.random() * 900),
    name: lead.name,
    age: 15,
    schoolClass: "9-A sinf",
    parentName: "Ota-onasi",
    parentPhone: lead.phone,
    enrolledDate: "2026-10-08",
    status: "Faol",
    avatar: lead.name.split(" ").map(w => w[0]).join(""),
    tutorCourses: [
      { teacherId: "TCH-001", teacherName: "Javohir Rustamov", subject: lead.course, group: "Math-Prezident-1", fee: 850000, paymentStatus: "To'langan", grade: "90%" }
    ],
    schoolTuitionFee: 3500000,
    schoolPaymentStatus: "To'langan",
    notes: lead.note
  };

  state.data.students.unshift(newStudent);
  state.data.leads = state.data.leads.filter(l => l.id !== leadId);
  saveCRMData(state.data);
  renderAll();
  updateBadges();

  showNotificationToast(`🎉 ${lead.name} muvaffaqiyatli o'quvchilar safiga qabul qilindi!`);
}

// ===================================================================
// 11. Modal Oynalari va Forma Boshqaruvi (CRUD)
// ===================================================================

// Yangi Ustoz Qo'shish
function openAddTeacherModal() {
  document.getElementById("addTeacherModal").classList.add("active");
}
function closeAddTeacherModal() {
  document.getElementById("addTeacherModal").classList.remove("active");
}

function handleCreateTeacher(e) {
  e.preventDefault();
  const name = document.getElementById("newTeacherName").value;
  const subject = document.getElementById("newTeacherSubject").value;
  const type = document.getElementById("newTeacherType").value;
  const phone = document.getElementById("newTeacherPhone").value;
  const room = document.getElementById("newTeacherRoom").value;
  const exp = document.getElementById("newTeacherExp").value || "3 yil";
  const fee = parseInt(document.getElementById("newTeacherFee").value) || 850000;
  const bio = document.getElementById("newTeacherBio").value || "Malakali mutaxassis.";

  const newTeacher = {
    id: "TCH-00" + (state.data.teachers.length + 1),
    name: name,
    subject: subject,
    role: type === "repetitor" ? "Repetitor Ustoz" : "Maktab Ustozi",
    type: type,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    phone: phone,
    email: name.toLowerCase().replace(/\s+/g, ".") + "@ziyonur.uz",
    experience: exp,
    room: room,
    hourlyRate: formatMoney(fee) + " UZS",
    rating: 5.0,
    status: "Faol",
    bio: bio,
    schedule: [
      { day: "Dushanba", time: "15:00 - 16:30", group: subject + "-Guruh-1", room: room, topic: "Kirish darsi va diagnostik test" },
      { day: "Chorshanba", time: "15:00 - 16:30", group: subject + "-Guruh-1", room: room, topic: "Asosiy mavzular amaliyoti" },
      { day: "Juma", time: "15:00 - 16:30", group: subject + "-Guruh-1", room: room, topic: "Mustahkamlash va test" }
    ],
    tutorGroups: [
      {
        id: "GRP-" + Math.floor(100 + Math.random() * 900),
        name: subject + "-Guruh-1",
        level: "Barcha sinflar",
        days: "Dush / Chor / Juma",
        time: "15:00 - 16:30",
        monthlyFee: fee,
        studentIds: []
      }
    ]
  };

  state.data.teachers.push(newTeacher);
  saveCRMData(state.data);
  closeAddTeacherModal();
  renderAll();
  updateBadges();

  showNotificationToast(`✅ Yangi ustoz ${name} muvaffaqiyatli qo'shildi!`);
}

// Yangi O'quvchi Qo'shish
function openAddStudentModal() {
  const select = document.getElementById("newStudentTutorSelect");
  select.innerHTML = `<option value="">(Repetitor tanlanmagan)</option>`;
  state.data.teachers.forEach(t => {
    select.innerHTML += `<option value="${t.id}">${t.name} (${t.subject})</option>`;
  });

  document.getElementById("addStudentModal").classList.add("active");
}
function closeAddStudentModal() {
  document.getElementById("addStudentModal").classList.remove("active");
}

function handleCreateStudent(e) {
  e.preventDefault();
  const name = document.getElementById("newStudentName").value;
  const schoolClass = document.getElementById("newStudentClass").value;
  const age = parseInt(document.getElementById("newStudentAge").value) || 14;
  const parent = document.getElementById("newStudentParent").value || "Ota-onasi";
  const phone = document.getElementById("newStudentPhone").value;
  const tutorId = document.getElementById("newStudentTutorSelect").value;

  const tutorCourses = [];
  if (tutorId) {
    const teacher = state.data.teachers.find(t => t.id === tutorId);
    if (teacher) {
      tutorCourses.push({
        teacherId: teacher.id,
        teacherName: teacher.name,
        subject: teacher.subject,
        group: teacher.subject + "-Guruhi",
        fee: 850000,
        paymentStatus: "To'langan",
        grade: "90%"
      });
    }
  }

  const newStudent = {
    id: "STU-" + Math.floor(100 + Math.random() * 900),
    name: name,
    age: age,
    schoolClass: schoolClass,
    parentName: parent,
    parentPhone: phone,
    enrolledDate: "2026-10-08",
    status: "Faol",
    avatar: name.split(" ").map(w => w[0]).join(""),
    tutorCourses: tutorCourses,
    schoolTuitionFee: 3500000,
    schoolPaymentStatus: "To'langan",
    notes: "Yangi ro'yxatdan o'tdi"
  };

  state.data.students.unshift(newStudent);
  saveCRMData(state.data);
  closeAddStudentModal();
  renderAll();
  updateBadges();

  showNotificationToast(`✅ O'quvchi ${name} tizimga qo'shildi!`);
}

// To'lov Qabul Qilish Modali
function openPaymentModal() {
  const studentSelect = document.getElementById("payStudentSelect");
  studentSelect.innerHTML = "";
  state.data.students.forEach(s => {
    studentSelect.innerHTML += `<option value="${s.id}">${s.name} (${s.schoolClass})</option>`;
  });

  autoFillPaymentDetails();
  document.getElementById("paymentModal").classList.add("active");
}

function openPaymentForStudent(studentId) {
  openPaymentModal();
  document.getElementById("payStudentSelect").value = studentId;
  autoFillPaymentDetails();
}

function closePaymentModal() {
  document.getElementById("paymentModal").classList.remove("active");
}

function autoFillPaymentDetails() {
  const studentId = document.getElementById("payStudentSelect").value;
  const s = state.data.students.find(st => st.id === studentId);
  if (!s) return;

  const courseName = s.tutorCourses && s.tutorCourses.length > 0 
    ? s.tutorCourses[0].subject + " Repetitor" 
    : s.schoolClass + " oylik to'lovi";

  document.getElementById("payCourseName").value = courseName;
  document.getElementById("recStudentName").textContent = s.name;
  document.getElementById("recCourseName").textContent = courseName;
  document.getElementById("recMethod").textContent = document.getElementById("payMethodSelect").value;
  document.getElementById("recDate").textContent = new Date().toLocaleDateString("uz-UZ");
  document.getElementById("recAmount").textContent = formatMoney(document.getElementById("payAmount").value) + " UZS";
}

function handleCreatePayment(e) {
  e.preventDefault();
  const studentId = document.getElementById("payStudentSelect").value;
  const s = state.data.students.find(st => st.id === studentId);
  const type = document.getElementById("payTypeSelect").value;
  const method = document.getElementById("payMethodSelect").value;
  const course = document.getElementById("payCourseName").value;
  const amount = parseInt(document.getElementById("payAmount").value) || 850000;

  const newPayment = {
    id: "PAY-" + Math.floor(100 + Math.random() * 900),
    studentName: s ? s.name : "O'quvchi",
    type: type,
    course: course,
    teacher: s && s.tutorCourses && s.tutorCourses[0] ? s.tutorCourses[0].teacherName : "Maktab",
    amount: amount,
    date: new Date().toISOString().split("T")[0],
    method: method,
    status: "Tasdiqlangan"
  };

  // O'quvchi qarzdorligini yechish
  if (s) {
    s.schoolPaymentStatus = "To'langan";
    if (s.tutorCourses) {
      s.tutorCourses.forEach(tc => tc.paymentStatus = "To'langan");
    }
  }

  state.data.payments.unshift(newPayment);
  saveCRMData(state.data);
  closePaymentModal();
  renderAll();
  updateBadges();

  // Telegramga avtomatik xabarnoma jo'natish
  const tgMsg = `💰 <b>Yangi To'lov Qabul Qilindi!</b>\n\n` +
    `👤 <b>O'quvchi:</b> ${newPayment.studentName}\n` +
    `📚 <b>Kurs:</b> ${newPayment.course}\n` +
    `💵 <b>Summa:</b> ${formatMoney(amount)} UZS\n` +
    `💳 <b>Usul:</b> ${newPayment.method}\n` +
    `👨‍🏫 <b>Ustoz:</b> ${newPayment.teacher}\n` +
    `📅 <b>Sana:</b> ${newPayment.date}`;
  sendTelegramNotification(tgMsg);

  showNotificationToast(`💵 To'lov muvaffaqiyatli qabul qilindi: ${formatMoney(amount)} UZS`);
}

function printReceipt() {
  window.print();
}

// Repetitorga O'quvchi Biriktirish
function openEnrollStudentModal() {
  const teacher = state.data.teachers.find(t => t.id === state.selectedTeacherId);
  if (!teacher) return;

  document.getElementById("enrollTeacherName").value = `${teacher.name} (${teacher.subject})`;
  
  const studentSelect = document.getElementById("enrollStudentSelect");
  studentSelect.innerHTML = "";
  state.data.students.forEach(s => {
    studentSelect.innerHTML += `<option value="${s.id}">${s.name} (${s.schoolClass})</option>`;
  });

  const groupSelect = document.getElementById("enrollGroupSelect");
  groupSelect.innerHTML = "";
  if (teacher.tutorGroups && teacher.tutorGroups.length > 0) {
    teacher.tutorGroups.forEach(g => {
      groupSelect.innerHTML += `<option value="${g.name}">${g.name} (${g.days})</option>`;
    });
  } else {
    groupSelect.innerHTML = `<option value="Guruh-1">Asosiy Guruh</option>`;
  }

  document.getElementById("enrollModal").classList.add("active");
}

function closeEnrollModal() {
  document.getElementById("enrollModal").classList.remove("active");
}

function handleEnrollStudent(e) {
  e.preventDefault();
  const studentId = document.getElementById("enrollStudentSelect").value;
  const groupName = document.getElementById("enrollGroupSelect").value;
  const teacher = state.data.teachers.find(t => t.id === state.selectedTeacherId);
  const student = state.data.students.find(s => s.id === studentId);

  if (!teacher || !student) return;

  if (!student.tutorCourses) student.tutorCourses = [];
  
  // Allaqachon biriktirilganligini tekshirish
  const alreadyEnrolled = student.tutorCourses.some(tc => tc.teacherId === teacher.id);
  if (alreadyEnrolled) {
    alert("Ushbu o'quvchi allaqachon ushbu ustoz kursiga biriktirilgan!");
    return;
  }

  student.tutorCourses.push({
    teacherId: teacher.id,
    teacherName: teacher.name,
    subject: teacher.subject,
    group: groupName,
    fee: 850000,
    paymentStatus: "To'langan",
    grade: "90%"
  });

  saveCRMData(state.data);
  closeEnrollModal();
  // Modalni qayta render qilish
  openTeacherDetailModal(teacher.id);
  renderAll();

  showNotificationToast(`🎯 ${student.name} ustoz ${teacher.name} guruhiga muvaffaqiyatli biriktirildi!`);
}

// Yangi Lid Modali
function openAddLeadModal() {
  document.getElementById("addLeadModal").classList.add("active");
}
function closeAddLeadModal() {
  document.getElementById("addLeadModal").classList.remove("active");
}

function handleCreateLead(e) {
  e.preventDefault();
  const name = document.getElementById("newLeadName").value;
  const phone = document.getElementById("newLeadPhone").value;
  const age = document.getElementById("newLeadAge").value || "10-sinf";
  const course = document.getElementById("newLeadCourse").value;
  const source = document.getElementById("newLeadSource").value;
  const note = document.getElementById("newLeadNote").value || "Sinov darsiga qiziqmoqda";

  const newLead = {
    id: "LEAD-0" + (state.data.leads.length + 1),
    name: name,
    age: age,
    phone: phone,
    course: course,
    source: source,
    status: "Yangi ariza",
    date: "Bugun",
    note: note
  };

  state.data.leads.unshift(newLead);
  saveCRMData(state.data);
  closeAddLeadModal();
  renderAll();
  updateBadges();

  showNotificationToast(`📥 Yangi ariza qabul qilindi: ${name}`);
}

function openAddModal() {
  if (state.currentView === "teachers-view") {
    openAddTeacherModal();
  } else if (state.currentView === "students-view") {
    openAddStudentModal();
  } else if (state.currentView === "finance-view") {
    openPaymentModal();
  } else if (state.currentView === "leads-view") {
    openAddLeadModal();
  } else {
    // Default dashboard: tanlash berish yoki yangi o'quvchi ochish
    openAddStudentModal();
  }
}

// ===================================================================
// 12. Sozlamalar va Yordamchi Funksiyalar
// ===================================================================
function saveSettings() {
  state.data.schoolInfo.name = document.getElementById("settingSchoolName").value;
  state.data.schoolInfo.phone = document.getElementById("settingPhone").value;
  state.data.schoolInfo.address = document.getElementById("settingAddress").value;
  saveCRMData(state.data);
  showNotificationToast("Sozlamalar muvaffaqiyatli saqlandi!");
}

function resetToDefaultData() {
  if (confirm("Haqiqatan ham barcha ma'lumotlarni boshlang'ich holatga qaytarmoqchimisiz?")) {
    state.data = resetCRMData();
    renderAll();
    updateBadges();
    showNotificationToast("Tizim boshlang'ich holatga qaytarildi");
  }
}

function updateBadges() {
  document.getElementById("totalTutorsBadge").textContent = `${state.data.teachers.length} ustoz`;
  document.getElementById("totalStudentsBadge").textContent = `${state.data.students.length} ta`;
  
  const debtorsCount = state.data.students.filter(s => 
    s.schoolPaymentStatus === "Qarzdor" || (s.tutorCourses && s.tutorCourses.some(c => c.paymentStatus === "Qarzdor"))
  ).length;
  document.getElementById("debtBadge").textContent = `${debtorsCount} qarzdor`;
  document.getElementById("leadsBadge").textContent = `${state.data.leads.length} yangi`;

  // Yangi bo'limlar badgelari
  let totalGroups = 0;
  state.data.teachers.forEach(t => totalGroups += (t.tutorGroups ? t.tutorGroups.length : 0));
  document.getElementById("groupsBadge").textContent = `${totalGroups} guruh`;

  const unreadNotifs = (state.data.notifications || []).filter(n => !n.read).length;
  document.getElementById("notifBadge").textContent = `${unreadNotifs} yangi`;
}

// Qorong'u / Yorug'lik Mavzusi
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("EDUPRIME_THEME", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("themeToggleBtn");
  if (btn) {
    btn.innerHTML = theme === "dark" ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }
}

// Toast Xabarnomalar
function showNotificationToast(msg) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.style.cssText = `
    background: #1e1b4b;
    color: #ffffff;
    padding: 12px 20px;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: fadeIn 0.3s ease;
    border-left: 4px solid var(--accent-emerald);
  `;
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-emerald);"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Raqamlarni formatlash (1000000 -> 1,000,000)
function formatMoney(amount) {
  if (!amount) return "0";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ===================================================================
// 13. DAVOMAT TIZIMI (Attendance System)
// ===================================================================
function renderAttendanceView() {
  const groupSelect = document.getElementById("attendanceGroupSelect");
  const datePicker = document.getElementById("attendanceDatePicker");

  // Bugungi sanani o'rnatish
  if (!datePicker.value) {
    datePicker.value = new Date().toISOString().split("T")[0];
  }

  // Guruhlarni to'ldirish
  if (groupSelect.options.length <= 1) {
    groupSelect.innerHTML = '<option value="all">Barcha o\'quvchilar</option>';
    state.data.teachers.forEach(t => {
      if (t.tutorGroups) {
        t.tutorGroups.forEach(g => {
          groupSelect.innerHTML += `<option value="${g.id}">${g.name} (${t.name})</option>`;
        });
      }
    });
  }

  const selectedGroup = groupSelect.value;
  const selectedDate = datePicker.value;
  const dateKey = selectedDate;

  // O'quvchilarni filtrlash
  let students = state.data.students;
  if (selectedGroup !== "all") {
    students = students.filter(s => {
      return s.tutorCourses && s.tutorCourses.some(tc => {
        const teacher = state.data.teachers.find(t => t.id === tc.teacherId);
        return teacher && teacher.tutorGroups && teacher.tutorGroups.some(g => g.id === selectedGroup);
      });
    });
  }

  const tbody = document.getElementById("attendanceTableBody");
  tbody.innerHTML = "";

  if (!state.data.attendance) state.data.attendance = {};
  if (!state.data.attendance[dateKey]) state.data.attendance[dateKey] = {};

  students.forEach(s => {
    const record = state.data.attendance[dateKey][s.id] || { status: "present", note: "" };
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div class="student-table-name">
          <div class="avatar-circle-sm">${s.avatar || s.name[0]}</div>
          <div>
            <div class="student-name-text">${s.name}</div>
            <div class="student-phone-sub">ID: ${s.id}</div>
          </div>
        </div>
      </td>
      <td><strong>${s.schoolClass}</strong></td>
      <td>
        <div class="attendance-toggle-group" data-student-id="${s.id}">
          <button class="att-btn att-present ${record.status === 'present' ? 'active' : ''}" onclick="setAttendance('${s.id}', 'present', this)">
            <i class="fa-solid fa-check"></i> Keldi
          </button>
          <button class="att-btn att-absent ${record.status === 'absent' ? 'active' : ''}" onclick="setAttendance('${s.id}', 'absent', this)">
            <i class="fa-solid fa-xmark"></i> Kelmadi
          </button>
          <button class="att-btn att-late ${record.status === 'late' ? 'active' : ''}" onclick="setAttendance('${s.id}', 'late', this)">
            <i class="fa-solid fa-clock"></i> Kechikdi
          </button>
          <button class="att-btn att-excused ${record.status === 'excused' ? 'active' : ''}" onclick="setAttendance('${s.id}', 'excused', this)">
            <i class="fa-solid fa-file-medical"></i> Sababli
          </button>
        </div>
      </td>
      <td>
        <input type="text" class="att-note-input" value="${record.note || ''}" placeholder="Izoh..." 
          onchange="setAttendanceNote('${s.id}', this.value)">
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Statistikani yangilash
  updateAttendanceStats();
  renderAttendanceChart();
}

function setAttendance(studentId, status, btnEl) {
  const dateKey = document.getElementById("attendanceDatePicker").value;
  if (!state.data.attendance[dateKey]) state.data.attendance[dateKey] = {};
  if (!state.data.attendance[dateKey][studentId]) state.data.attendance[dateKey][studentId] = {};
  state.data.attendance[dateKey][studentId].status = status;

  // UI yangilash
  const group = btnEl.parentElement;
  group.querySelectorAll(".att-btn").forEach(b => b.classList.remove("active"));
  btnEl.classList.add("active");
}

function setAttendanceNote(studentId, note) {
  const dateKey = document.getElementById("attendanceDatePicker").value;
  if (!state.data.attendance[dateKey]) state.data.attendance[dateKey] = {};
  if (!state.data.attendance[dateKey][studentId]) state.data.attendance[dateKey][studentId] = { status: "present" };
  state.data.attendance[dateKey][studentId].note = note;
}

function saveAttendance() {
  saveCRMData(state.data);
  updateAttendanceStats();

  // Bildirishnoma qo'shish
  const dateKey = document.getElementById("attendanceDatePicker").value;
  const records = state.data.attendance[dateKey] || {};
  const total = Object.keys(records).length || state.data.students.length;
  const present = Object.values(records).filter(r => r.status === "present" || r.status === "late").length;
  const percent = total > 0 ? Math.round((present / total) * 100) : 0;

  addSystemNotification("attendance", "fa-clipboard-check", "indigo",
    "Davomat saqlandi", `${dateKey} sanasidagi davomat: ${percent}% (${present}/${total} o'quvchi)`);

  showNotificationToast(`✅ Davomat muvaffaqiyatli saqlandi! Bugungi davomat: ${percent}%`);
}

function updateAttendanceStats() {
  const dateKey = document.getElementById("attendanceDatePicker")?.value || new Date().toISOString().split("T")[0];
  const records = state.data.attendance?.[dateKey] || {};
  const total = state.data.students.length;
  const present = Object.values(records).filter(r => r.status === "present" || r.status === "late").length;
  const todayPercent = total > 0 ? Math.round((present / total) * 100) : 94;

  const el1 = document.getElementById("attendanceTodayPercent");
  const el2 = document.getElementById("attendanceMonthAvg");
  if (el1) el1.textContent = todayPercent + "%";
  if (el2) el2.textContent = Math.round((todayPercent + 91) / 2) + "%";
}

function renderAttendanceChart() {
  const container = document.getElementById("attendanceChartContainer");
  if (!container) return;

  const days = ["Dush", "Sesh", "Chor", "Pay", "Juma", "Shan", "Yak"];
  const values = [96, 89, 94, 100, 92, 88, 0];

  // Check real data
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split("T")[0];
    const records = state.data.attendance?.[key] || {};
    const vals = Object.values(records);
    if (vals.length > 0) {
      const present = vals.filter(r => r.status === "present" || r.status === "late").length;
      values[i] = Math.round((present / state.data.students.length) * 100);
    }
  }

  container.innerHTML = `
    <div class="att-chart">
      ${days.map((day, i) => {
        const val = values[i];
        const height = Math.max(val * 0.7, 4);
        const color = val >= 90 ? 'var(--accent-emerald)' : val >= 70 ? 'var(--accent-amber)' : 'var(--accent-rose)';
        return `
          <div class="att-chart-col">
            <div class="att-chart-value">${val}%</div>
            <div class="att-chart-bar" style="height: ${height}px; background: ${color};"></div>
            <div class="att-chart-label">${day}</div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// ===================================================================
// 14. GURUHLAR BOSHQARUVI (Groups Management)
// ===================================================================
function renderGroupsView() {
  const container = document.getElementById("groupsGridContainer");
  if (!container) return;
  container.innerHTML = "";

  state.data.teachers.forEach(teacher => {
    if (!teacher.tutorGroups) return;
    teacher.tutorGroups.forEach(group => {
      const enrolledCount = group.studentIds ? group.studentIds.length : 0;
      const capacity = group.capacity || 15;
      const fillPercent = Math.round((enrolledCount / capacity) * 100);
      const fillColor = fillPercent >= 90 ? 'var(--accent-rose)' : fillPercent >= 60 ? 'var(--accent-amber)' : 'var(--accent-emerald)';

      const card = document.createElement("div");
      card.className = "group-card";
      card.innerHTML = `
        <div class="group-card-header">
          <div class="group-card-icon">
            <i class="fa-solid fa-people-group"></i>
          </div>
          <div class="group-card-title">
            <h4>${group.name}</h4>
            <span class="group-teacher-tag"><i class="fa-solid fa-chalkboard-user"></i> ${teacher.name}</span>
          </div>
          <button class="icon-btn" onclick="openTeacherDetailModal('${teacher.id}')" title="Ustoz profilini ochish">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </button>
        </div>
        <div class="group-card-body">
          <div class="group-info-row">
            <span><i class="fa-solid fa-graduation-cap"></i> ${group.level}</span>
            <span><i class="fa-solid fa-calendar-days"></i> ${group.days}</span>
          </div>
          <div class="group-info-row">
            <span><i class="fa-solid fa-clock"></i> ${group.time}</span>
            <span><i class="fa-solid fa-tag"></i> ${formatMoney(group.monthlyFee)} UZS</span>
          </div>
          <div class="group-capacity-bar">
            <div class="capacity-label">
              <span>O'quvchilar: <strong>${enrolledCount}</strong> / ${capacity}</span>
              <span style="color: ${fillColor}; font-weight: 700;">${fillPercent}%</span>
            </div>
            <div class="capacity-track">
              <div class="capacity-fill" style="width: ${fillPercent}%; background: ${fillColor};"></div>
            </div>
          </div>
        </div>
        <div class="group-card-footer">
          <button class="btn-secondary" style="padding: 6px 12px; font-size: 11px;" onclick="removeStudentFromGroupPrompt('${teacher.id}', '${group.id}')">
            <i class="fa-solid fa-user-minus"></i> O'quvchi Chiqarish
          </button>
          <button class="btn-primary" style="padding: 6px 12px; font-size: 11px;" onclick="state.selectedTeacherId='${teacher.id}'; openEnrollStudentModal()">
            <i class="fa-solid fa-user-plus"></i> O'quvchi Qo'shish
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  });
}

function openAddGroupModal() {
  const teacherSelect = document.getElementById("newGroupTeacher");
  teacherSelect.innerHTML = "";
  state.data.teachers.forEach(t => {
    teacherSelect.innerHTML += `<option value="${t.id}">${t.name} (${t.subject})</option>`;
  });
  document.getElementById("addGroupModal").classList.add("active");
}

function closeAddGroupModal() {
  document.getElementById("addGroupModal").classList.remove("active");
}

function handleCreateGroup(e) {
  e.preventDefault();
  const name = document.getElementById("newGroupName").value;
  const teacherId = document.getElementById("newGroupTeacher").value;
  const level = document.getElementById("newGroupLevel").value;
  const days = document.getElementById("newGroupDays").value;
  const time = document.getElementById("newGroupTime").value;
  const fee = parseInt(document.getElementById("newGroupFee").value) || 850000;
  const capacity = parseInt(document.getElementById("newGroupCapacity").value) || 15;

  const teacher = state.data.teachers.find(t => t.id === teacherId);
  if (!teacher) return;

  if (!teacher.tutorGroups) teacher.tutorGroups = [];

  const newGroup = {
    id: "GRP-" + Math.floor(100 + Math.random() * 900),
    name: name,
    level: level,
    days: days,
    time: time,
    monthlyFee: fee,
    capacity: capacity,
    studentIds: []
  };

  teacher.tutorGroups.push(newGroup);
  saveCRMData(state.data);
  closeAddGroupModal();
  renderAll();
  updateBadges();
  showNotificationToast(`✅ "${name}" guruhi muvaffaqiyatli ochildi!`);
}

function removeStudentFromGroupPrompt(teacherId, groupId) {
  const teacher = state.data.teachers.find(t => t.id === teacherId);
  if (!teacher) return;
  const group = teacher.tutorGroups.find(g => g.id === groupId);
  if (!group || !group.studentIds || group.studentIds.length === 0) {
    alert("Bu guruhda hozircha o'quvchi yo'q.");
    return;
  }

  const studentNames = group.studentIds.map(sid => {
    const s = state.data.students.find(st => st.id === sid);
    return s ? s.name : sid;
  });

  const choice = prompt(`Qaysi o'quvchini chiqarmoqchisiz?\n\n${studentNames.map((n, i) => `${i + 1}. ${n}`).join("\n")}\n\nRaqamini kiriting:`);
  if (!choice) return;

  const idx = parseInt(choice) - 1;
  if (idx >= 0 && idx < group.studentIds.length) {
    const removedId = group.studentIds[idx];
    group.studentIds.splice(idx, 1);

    // O'quvchidan ham kursni o'chirish
    const student = state.data.students.find(s => s.id === removedId);
    if (student && student.tutorCourses) {
      student.tutorCourses = student.tutorCourses.filter(tc => tc.group !== group.name || tc.teacherId !== teacherId);
    }

    saveCRMData(state.data);
    renderAll();
    showNotificationToast(`O'quvchi guruhdan muvaffaqiyatli chiqarildi.`);
  }
}

// ===================================================================
// 15. XARAJATLAR & ISH HAQI (Expenses & Salary)
// ===================================================================
function renderExpensesView() {
  if (!state.data.expenses) state.data.expenses = [];

  const tbody = document.getElementById("expensesTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  let list = state.data.expenses;
  if (state.expenseFilter && state.expenseFilter !== "all") {
    list = list.filter(e => e.type === state.expenseFilter);
  }

  const typeLabels = {
    salary: "💼 Maosh",
    rent: "🏢 Ijara",
    supply: "📦 Jihozlar",
    utility: "⚡ Kommunal",
    other: "📋 Boshqa"
  };

  list.forEach(exp => {
    const isPaid = exp.status === "To'langan";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${exp.id}</strong></td>
      <td>${exp.desc}</td>
      <td><span class="expense-type-badge type-${exp.type}">${typeLabels[exp.type] || exp.type}</span></td>
      <td><strong style="color: var(--accent-rose);">${formatMoney(exp.amount)} UZS</strong></td>
      <td>${exp.date}</td>
      <td>${exp.recipient}</td>
      <td>
        <span class="status-badge ${isPaid ? 'status-paid' : 'status-trial'}">
          ${isPaid ? '✓ To\'langan' : '⏳ Kutilmoqda'}
        </span>
      </td>
      <td>
        ${!isPaid ? `<button class="btn-primary" style="padding: 4px 10px; font-size: 11px;" onclick="markExpensePaid('${exp.id}')"><i class="fa-solid fa-check"></i> To'lash</button>` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });

  // KPI hisoblash
  const totalExpenses = state.data.expenses.reduce((s, e) => s + e.amount, 0);
  const salaryExpenses = state.data.expenses.filter(e => e.type === "salary").reduce((s, e) => s + e.amount, 0);
  const unpaidCount = state.data.expenses.filter(e => e.status !== "To'langan").length;

  const income = 48200000; // Taxminiy tushum
  const netProfit = income - totalExpenses;

  const el1 = document.getElementById("kpiTotalExpenses");
  const el2 = document.getElementById("kpiTotalSalaries");
  const el3 = document.getElementById("kpiNetProfit");
  const el4 = document.getElementById("kpiUnpaidSalary");

  if (el1) el1.textContent = (totalExpenses / 1000000).toFixed(1) + " mln";
  if (el2) el2.textContent = (salaryExpenses / 1000000).toFixed(1) + " mln";
  if (el3) el3.textContent = (netProfit / 1000000).toFixed(1) + " mln";
  if (el4) el4.textContent = unpaidCount + " ta";
}

function filterExpenses(filterType, btnEl) {
  state.expenseFilter = filterType;
  document.querySelectorAll("#expenseFilterPills .filter-btn").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  renderExpensesView();
}

function openAddExpenseModal() {
  const recipientSelect = document.getElementById("newExpenseRecipient");
  recipientSelect.innerHTML = '<option value="Maktab administratsiyasi">Maktab administratsiyasi</option>';
  state.data.teachers.forEach(t => {
    recipientSelect.innerHTML += `<option value="${t.name}">${t.name} (${t.subject})</option>`;
  });
  document.getElementById("newExpenseDate").value = new Date().toISOString().split("T")[0];
  document.getElementById("addExpenseModal").classList.add("active");
}

function closeAddExpenseModal() {
  document.getElementById("addExpenseModal").classList.remove("active");
}

function handleCreateExpense(e) {
  e.preventDefault();
  const desc = document.getElementById("newExpenseDesc").value;
  const type = document.getElementById("newExpenseType").value;
  const amount = parseInt(document.getElementById("newExpenseAmount").value) || 0;
  const recipient = document.getElementById("newExpenseRecipient").value;
  const date = document.getElementById("newExpenseDate").value || new Date().toISOString().split("T")[0];

  const newExpense = {
    id: "EXP-" + Math.floor(100 + Math.random() * 900),
    desc: desc,
    type: type,
    amount: amount,
    date: date,
    recipient: recipient,
    status: "Kutilmoqda"
  };

  if (!state.data.expenses) state.data.expenses = [];
  state.data.expenses.unshift(newExpense);
  saveCRMData(state.data);
  closeAddExpenseModal();
  renderExpensesView();
  addSystemNotification("expense", "fa-wallet", "rose",
    "Yangi xarajat qayd etildi", `${desc} — ${formatMoney(amount)} UZS`);
  showNotificationToast(`💰 Xarajat qayd etildi: ${formatMoney(amount)} UZS`);
}

function markExpensePaid(expId) {
  const exp = state.data.expenses.find(e => e.id === expId);
  if (exp) {
    exp.status = "To'langan";
    saveCRMData(state.data);
    renderExpensesView();
    showNotificationToast(`✅ ${exp.desc} — to'landi deb belgilandi.`);
  }
}

// ===================================================================
// 16. BILDIRISHNOMALAR MARKAZI (Notifications Center)
// ===================================================================
function renderNotificationsView() {
  if (!state.data.notifications) state.data.notifications = [];

  const container = document.getElementById("notificationsListContainer");
  if (!container) return;
  container.innerHTML = "";

  const colorMap = {
    rose: "var(--accent-rose)",
    emerald: "var(--accent-emerald)",
    indigo: "var(--primary)",
    amber: "var(--accent-amber)"
  };

  state.data.notifications.forEach(notif => {
    const div = document.createElement("div");
    div.className = `notif-item ${notif.read ? 'notif-read' : 'notif-unread'}`;
    div.onclick = () => {
      notif.read = true;
      saveCRMData(state.data);
      renderNotificationsView();
      updateBadges();
    };
    div.innerHTML = `
      <div class="notif-icon-wrap" style="background: ${colorMap[notif.color] || 'var(--primary)'}20; color: ${colorMap[notif.color] || 'var(--primary)'}">
        <i class="fa-solid ${notif.icon}"></i>
      </div>
      <div class="notif-content">
        <div class="notif-title">${notif.title} ${!notif.read ? '<span class="notif-new-dot"></span>' : ''}</div>
        <div class="notif-message">${notif.message}</div>
        <div class="notif-time"><i class="fa-regular fa-clock"></i> ${notif.date}</div>
      </div>
      <div class="notif-actions">
        <button class="icon-btn" onclick="event.stopPropagation(); deleteNotification('${notif.id}')" title="O'chirish">
          <i class="fa-solid fa-trash-can" style="font-size: 12px; color: var(--text-muted);"></i>
        </button>
      </div>
    `;
    container.appendChild(div);
  });

  // Statistikani yangilash
  const total = state.data.notifications.length;
  const unread = state.data.notifications.filter(n => !n.read).length;
  const smsCount = (state.data.sentMessages || []).filter(m => m.channel === "sms" || m.channel === "both").length;
  const tgCount = (state.data.sentMessages || []).filter(m => m.channel === "telegram" || m.channel === "both").length;

  const el1 = document.getElementById("notifTotalCount");
  const el2 = document.getElementById("notifUnreadCount");
  const el3 = document.getElementById("notifSentSMS");
  const el4 = document.getElementById("notifSentTelegram");

  if (el1) el1.textContent = total;
  if (el2) el2.textContent = unread;
  if (el3) el3.textContent = smsCount;
  if (el4) el4.textContent = tgCount;
}

function markAllNotificationsRead() {
  if (!state.data.notifications) return;
  state.data.notifications.forEach(n => n.read = true);
  saveCRMData(state.data);
  renderNotificationsView();
  updateBadges();
  showNotificationToast("Barcha bildirishnomalar o'qilgan deb belgilandi.");
}

function deleteNotification(notifId) {
  state.data.notifications = state.data.notifications.filter(n => n.id !== notifId);
  saveCRMData(state.data);
  renderNotificationsView();
  updateBadges();
}

function addSystemNotification(type, icon, color, title, message) {
  if (!state.data.notifications) state.data.notifications = [];
  state.data.notifications.unshift({
    id: "NTF-" + Math.floor(100 + Math.random() * 900),
    type: type,
    icon: icon,
    color: color,
    title: title,
    message: message,
    date: new Date().toLocaleString("uz-UZ"),
    read: false
  });
  saveCRMData(state.data);
  updateBadges();
}

// ===================================================================
// 17. SMS / TELEGRAM YUBORISH TIZIMI
// ===================================================================
function openSendSMSModal() {
  // Guruhlar ro'yxatini to'ldirish
  const groupSelect = document.getElementById("smsGroupSelect");
  groupSelect.innerHTML = "";
  state.data.teachers.forEach(t => {
    if (t.tutorGroups) {
      t.tutorGroups.forEach(g => {
        groupSelect.innerHTML += `<option value="${g.id}">${g.name} (${t.name})</option>`;
      });
    }
  });

  // O'quvchilar ro'yxatini to'ldirish
  const studentSelect = document.getElementById("smsStudentSelect");
  studentSelect.innerHTML = "";
  state.data.students.forEach(s => {
    studentSelect.innerHTML += `<option value="${s.id}">${s.name} (${s.parentPhone})</option>`;
  });

  updateSMSTargetInfo();

  // Textarea listener
  const textarea = document.getElementById("smsText");
  textarea.oninput = () => {
    document.getElementById("smsPreviewBody").textContent = textarea.value || "Xabar matnini kiriting...";
    document.getElementById("smsCharCount").textContent = textarea.value.length;
  };

  document.getElementById("sendSMSModal").classList.add("active");
}

function closeSendSMSModal() {
  document.getElementById("sendSMSModal").classList.remove("active");
}

function updateSMSTargetInfo() {
  const target = document.getElementById("smsTarget").value;
  document.getElementById("smsGroupSelectWrap").style.display = target === "group" ? "block" : "none";
  document.getElementById("smsStudentSelectWrap").style.display = target === "single" ? "block" : "none";

  let count = 0;
  if (target === "all_parents") count = state.data.students.length;
  else if (target === "debtors") count = state.data.students.filter(s => s.schoolPaymentStatus === "Qarzdor" || (s.tutorCourses && s.tutorCourses.some(c => c.paymentStatus === "Qarzdor"))).length;
  else if (target === "group") count = 5;
  else if (target === "single") count = 1;

  document.getElementById("smsRecipientCount").textContent = count;
}

function fillSMSTemplate() {
  const template = document.getElementById("smsTemplate").value;
  const textarea = document.getElementById("smsText");

  const templates = {
    custom: "",
    debt_reminder: "Hurmatli ota-ona! Farzandingizning o'quv to'lovi muddati o'tib ketgan. Iltimos, 3 ish kuni ichida to'lovni amalga oshiring. Ma'lumot uchun: +998 71 200 45 45. — Ziyo Nur Maktabi",
    class_reminder: "Eslatma! Ertaga soat 14:30 da dars bo'ladi. Farzandingiz darsliklar va daftarlarni olib kelishini so'raymiz. — Ziyo Nur Maktabi",
    exam_notify: "Hurmatli ota-ona! Farzandingiz uchun nazorat imtihoni belgilandi. Sana va vaqt haqida batafsil ma'lumotni CRM tizimdan ko'rishingiz mumkin. — Ziyo Nur Maktabi",
    holiday_notify: "Assalomu alaykum! Ziyo Nur Maktabi jamoasi sizni bayram bilan tabriklab, sog'liq va muvaffaqiyatlar tilab qoladi! 🎉 — Ziyo Nur Maktabi"
  };

  textarea.value = templates[template] || "";
  document.getElementById("smsPreviewBody").textContent = textarea.value || "Xabar matnini kiriting...";
  document.getElementById("smsCharCount").textContent = textarea.value.length;
}

function handleSendSMS(e) {
  e.preventDefault();
  const channel = document.getElementById("smsChannel").value;
  const target = document.getElementById("smsTarget").value;
  const text = document.getElementById("smsText").value;

  let targetLabel = "Barcha ota-onalar";
  let recipientCount = state.data.students.length;

  if (target === "debtors") {
    targetLabel = "Qarzdorlar";
    recipientCount = state.data.students.filter(s => s.schoolPaymentStatus === "Qarzdor" || (s.tutorCourses && s.tutorCourses.some(c => c.paymentStatus === "Qarzdor"))).length;
  } else if (target === "group") {
    const gid = document.getElementById("smsGroupSelect").value;
    targetLabel = document.getElementById("smsGroupSelect").selectedOptions[0]?.text || "Guruh";
    recipientCount = 5;
  } else if (target === "single") {
    const sid = document.getElementById("smsStudentSelect").value;
    targetLabel = document.getElementById("smsStudentSelect").selectedOptions[0]?.text || "O'quvchi";
    recipientCount = 1;
  }

  const channelLabel = channel === "sms" ? "SMS" : channel === "telegram" ? "Telegram" : "SMS + Telegram";

  // Xabarni saqlash
  if (!state.data.sentMessages) state.data.sentMessages = [];
  state.data.sentMessages.unshift({
    id: "MSG-" + Math.floor(100 + Math.random() * 900),
    channel: channel,
    target: targetLabel,
    text: text,
    date: new Date().toLocaleString("uz-UZ"),
    recipientCount: recipientCount
  });

  // Bildirishnoma qo'shish
  addSystemNotification(
    channel === "telegram" ? "telegram" : "sms",
    "fa-paper-plane",
    "emerald",
    `${channelLabel} yuborildi`,
    `${targetLabel} ga ${recipientCount} ta xabar yuborildi.`
  );

  saveCRMData(state.data);
  closeSendSMSModal();
  renderNotificationsView();

  showNotificationToast(`📤 ${channelLabel} orqali ${recipientCount} ta qabul qiluvchiga xabar yuborildi!`);
}

// ===================================================================
// 15. Excel (CSV) Eksport Funksiyalari
// ===================================================================
function downloadCSV(filename, csvRows) {
  const csvContent = "\uFEFF" + csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function exportStudentsToExcel() {
  const rows = [
    ["ID", "Ism-Familiya", "Sinfi / Guruhi", "Telefon", "Ota-onasi", "Ota-onasi Telefoni", "To'lov Holati", "O'zlashtirish", "Repetitor Kurslari"]
  ];
  state.data.students.forEach(s => {
    const courses = (s.tutorCourses || []).map(c => `${c.subject} (${c.teacherName})`).join("; ");
    rows.push([
      `"${s.id}"`,
      `"${s.name}"`,
      `"${s.schoolClass || ''}"`,
      `"${s.phone || ''}"`,
      `"${s.parentName || ''}"`,
      `"${s.parentPhone || ''}"`,
      `"${s.schoolPaymentStatus || ''}"`,
      `"${s.academicPerformance || ''}"`,
      `"${courses}"`
    ]);
  });
  const dateStr = new Date().toISOString().split("T")[0];
  downloadCSV(`EduPrime_Oquvchilar_${dateStr}.csv`, rows.map(e => e.join(",")));
  showNotificationToast("📊 O'quvchilar ro'yxati Excel (CSV) faylida yuklandi!");
}

function exportFinanceToExcel() {
  const rows = [
    ["Chek ID", "O'quvchi", "Kurs / To'lov Turi", "Ustoz / Repetitor", "Summa (UZS)", "Sana", "To'lov Usuli", "Holat"]
  ];
  state.data.payments.forEach(p => {
    rows.push([
      `"${p.id}"`,
      `"${p.studentName}"`,
      `"${p.course}"`,
      `"${p.teacher || ''}"`,
      `"${p.amount}"`,
      `"${p.date}"`,
      `"${p.method}"`,
      `"${p.status}"`
    ]);
  });
  const dateStr = new Date().toISOString().split("T")[0];
  downloadCSV(`EduPrime_Moliya_${dateStr}.csv`, rows.map(e => e.join(",")));
  showNotificationToast("📊 To'lovlar tarixi Excel (CSV) faylida yuklandi!");
}

function exportAttendanceToExcel() {
  const date = document.getElementById("attendanceDatePicker")?.value || new Date().toISOString().split("T")[0];
  const group = document.getElementById("attendanceGroupSelect")?.value || "Barcha";
  const rows = [
    ["Guruh", "Sana", "O'quvchi", "Davomat Holati", "Izoh"]
  ];
  state.data.students.forEach(s => {
    const att = (state.data.attendance && state.data.attendance[date] && state.data.attendance[date][s.id]) || { status: "Keldi", note: "" };
    rows.push([
      `"${group}"`,
      `"${date}"`,
      `"${s.name}"`,
      `"${att.status}"`,
      `"${att.note || ''}"`
    ]);
  });
  downloadCSV(`EduPrime_Davomat_${date}.csv`, rows.map(e => e.join(",")));
  showNotificationToast(`📋 ${date} sanasidagi davomat Excel faylida yuklandi!`);
}

// ===================================================================
// 16. Telegram Bot Integratsiyasi & Xabarnomalar
// ===================================================================
function loadTelegramSettings() {
  const token = localStorage.getItem("EDUPRIME_TG_TOKEN") || "";
  const chatId = localStorage.getItem("EDUPRIME_TG_CHATID") || "";
  const tokenInput = document.getElementById("settingTgBotToken");
  const chatInput = document.getElementById("settingTgChatId");
  if (tokenInput) tokenInput.value = token;
  if (chatInput) chatInput.value = chatId;
}

function saveTelegramSettings() {
  const token = document.getElementById("settingTgBotToken")?.value.trim() || "";
  const chatId = document.getElementById("settingTgChatId")?.value.trim() || "";
  localStorage.setItem("EDUPRIME_TG_TOKEN", token);
  localStorage.setItem("EDUPRIME_TG_CHATID", chatId);
  showNotificationToast("✈️ Telegram sozlamalari muvaffaqiyatli saqlandi!");
}

async function sendTelegramNotification(text) {
  const token = localStorage.getItem("EDUPRIME_TG_TOKEN");
  const chatId = localStorage.getItem("EDUPRIME_TG_CHATID");
  if (!token || !chatId) return false;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML"
      })
    });
    return res.ok;
  } catch (err) {
    console.warn("Telegram yuborishda xatolik:", err);
    return false;
  }
}

async function testTelegramNotification() {
  const token = document.getElementById("settingTgBotToken")?.value.trim() || "";
  const chatId = document.getElementById("settingTgChatId")?.value.trim() || "";
  if (!token || !chatId) {
    showNotificationToast("⚠️ Iltimos, Telegram Bot Token va Chat ID kiriting!");
    return;
  }
  showNotificationToast("⏳ Test xabar yuborilmoqda...");
  const msg = `⚡ <b>EduPrime CRM Test Xabarnomasi</b>\n\n✅ Telegram boti muvaffaqiyatli ulandi!\n📅 Sana: ${new Date().toLocaleString("uz-UZ")}`;
  const success = await sendTelegramNotification(msg);
  if (success) {
    showNotificationToast("🎉 Telegramga test xabar yetib bordi!");
  } else {
    showNotificationToast("❌ Xabar yuborilmadi! Token yoki Chat ID ni tekshiring.");
  }
}

// ===================================================================
// 17. Zaxira Nusxa (JSON Backup & Restore)
// ===================================================================
function exportFullDatabaseJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.data, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", `EduPrime_Backup_${new Date().toISOString().split("T")[0]}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showNotificationToast("💾 CRM bazasining to'liq nusxasi yuklab olindi!");
}

function importFullDatabaseJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const parsed = JSON.parse(event.target.result);
      if (parsed && parsed.students && parsed.teachers) {
        state.data = parsed;
        saveCRMData(state.data);
        renderAll();
        updateBadges();
        showNotificationToast("✅ Baza muvaffaqiyatli tiklandi va yangilandi!");
      } else {
        alert("Noto'g'ri fayl formati! EduPrime zaxira JSON faylini tanlang.");
      }
    } catch (err) {
      alert("JSON faylni o'qishda xatolik yuz berdi!");
    }
  };
  reader.readAsText(file);
}

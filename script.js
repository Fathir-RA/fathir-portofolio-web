/**
 * ==========================================
 * PORTFOLIO MANAGER CLASS
 * Mengelola: Navbar, Dark Mode, Animasi, & Mobile Menu
 * ==========================================
 */
class Portfolio {
    constructor() {
        // Elements
        this.navbar = document.getElementById('navbar');
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        
        // Mobile Menu Elements
        this.mobileBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.mobileIcon = this.mobileBtn ? this.mobileBtn.querySelector('i') : null;

        this.init();
    }

    init() {
        this.handleTheme();     // Setup tema awal
        this.handleScroll();    // Setup scroll effect
        this.handleReveal();    // Setup animasi scroll
        this.setupEventListeners(); // Setup semua tombol
    }

    // --- 1. LOGIKA DARK MODE ---
    handleTheme() {
        // Cek LocalStorage atau Preferensi Sistem
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            this.themeIcon.innerText = '☀️';
        } else {
            document.documentElement.classList.remove('dark');
            this.themeIcon.innerText = '🌙';
        }
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.themeIcon.innerText = isDark ? '☀️' : '🌙';
    }

    // --- 2. LOGIKA NAVBAR & SCROLL ---
    handleScroll() {
        window.addEventListener('scroll', () => {
            // Navbar Glass Effect
            if (window.scrollY > 50) {
                this.navbar.classList.add('nav-scrolled', 'py-2');
                this.navbar.classList.remove('py-4');
            } else {
                this.navbar.classList.remove('nav-scrolled', 'py-2');
                this.navbar.classList.add('py-4');
            }
            // Panggil fungsi reveal element
            this.handleReveal();
        });
    }

    handleReveal() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }

    // --- 3. LOGIKA MOBILE MENU (HAMBURGER) ---
    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('hidden');
        
        // Ubah Icon Hamburger <-> Silang
        if (this.mobileMenu.classList.contains('hidden')) {
            this.mobileIcon.classList.remove('fa-xmark');
            this.mobileIcon.classList.add('fa-bars');
        } else {
            this.mobileIcon.classList.remove('fa-bars');
            this.mobileIcon.classList.add('fa-xmark');
        }
    }

    closeMobileMenu() {
        if (!this.mobileMenu.classList.contains('hidden')) {
            this.toggleMobileMenu();
        }
    }

    // --- 4. SETUP EVENT LISTENERS ---
    setupEventListeners() {
        // Toggle Dark Mode
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Toggle Mobile Menu
        if (this.mobileBtn) {
            this.mobileBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Mencegah klik tembus ke document
                this.toggleMobileMenu();
            });
        }

        // Tutup Mobile Menu jika klik di luar
        document.addEventListener('click', (e) => {
            if (this.mobileMenu && !this.mobileMenu.contains(e.target) && !this.mobileBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Tutup Mobile Menu jika link diklik
        if (this.mobileMenu) {
            const mobileLinks = this.mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMobileMenu());
            });
        }
    }
}

// Inisialisasi Class saat DOM Siap
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});


/**
 * ==========================================
 * GLOBAL FUNCTIONS (Diakses via HTML onclick)
 * ==========================================
 */

// 1. FILTER PROJECT
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.btn-filter');

    // Update Tombol Aktif
    buttons.forEach(btn => btn.classList.remove('active', 'bg-blue-600', 'text-white'));
    event.currentTarget.classList.add('active', 'bg-blue-600', 'text-white');

    // Filter Logic
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory.includes(category)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// 2. PROJECT DATA DATABASE
const projectsData = {
    'kompos': {
        title: "Monitoring Kematangan Kompos Berbasis IoT & Machine Learning",
        image: "assets/img/monitoring-kompos.webp",
        tags: ["IoT", "Machine Learning", "ESP32"],
        desc: "Sistem cerdas untuk memantau proses pengomposan secara real-time. Menggunakan mikrokontroler ESP32 untuk mengambil data suhu, kelembaban, dan pH tanah, kemudian dikirim via protokol MQTT. Algoritma Random Forest digunakan untuk memprediksi tingkat kematangan kompos.",
        tech: ["ESP32", "Python", "MQTT", "Google Colab", "Firebase", "API"],
        github: "https://github.com/komposmonitor-sys/Monitoring-Kompos",
        demo: "https://monitoring-kompos.vercel.app/"
    },
    'robot': {
        title: "Robot Line Follower Fire Fighter Berbasis IoT",
        image: "assets/img/line-followe-fire-fighter.webp",
        tags: ["Robotics", "Computer Vision", "C++"],
        desc: "Sistem pemadam api otomatis yang cerdas dan responsif. Robot ini menggabungkan kecanggihan Computer Vision melalui kamera eksternal (Laptop/PC) dengan mobilitas robot otonom berbasis ESP32. Menggunakan kamera untuk deteksi dini api dari jarak jauh sebelum mulai bergerak menuju titik api menggunakan navigasi garis.",
        tech: ["ESP32", "Python", "OpenCV", "C++", "PID Control"],
        github: "https://github.com/Fathir-RA/RobotLineFollower-PemadamApi",
        demo: "#"
    },
    'web': {
        title: "Website Ruly Sport Center",
        image: "assets/img/web-rsc.webp",
        tags: ["Web Dev", "Frontend", "UI/UX"],
        desc: "Mengembangkan website profil perusahaan yang responsif menggunakan Framework Bootstrap 5 untuk meningkatkan transparansi informasi harga fasilitas dan efisiensi reservasi pelanggan melalui integrasi WhatsApp.",
        tech: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript", "AOS"],
        github: "#",
        demo: "http://rulysportcenter.com"
    },
    'alarm-system': {
        title: "Alarm System With Solar Panel",
        image: "assets/img/alarm-system.webp",
        tags: ["IoT", "LoRa", "Solar Energy"],
        desc: "Mengembangkan sistem keamanan mandiri (off-grid) menggunakan ESP32 dan modul komunikasi LoRa untuk pemantauan jarak jauh tanpa ketergantungan internet. Proyek ini mencakup perancangan arsitektur pengkabelan dan manajemen daya (BMS + Panel Surya + Baterai).",
        tech: ["ESP32", "LoRa", "Solar Panel", "BMS", "C++"],
        github: "#",
        demo: "#"
    },
    'rc-fire': {
        title: "Automatic Fire Fighter RC Car",
        image: "assets/img/fire-fighter-rc-car.webp",
        tags: ["Robotics", "IoT", "ESP32"],
        desc: "Mengembangkan robot pemadam api hybrid berbasis ESP32. Robot ini memiliki dua mode operasi: Mode Manual dengan kendali jarak jauh melalui Dashboard UI (konektivitas WiFi), dan Mode Otomatis yang menggunakan sensor api.",
        tech: ["ESP32", "WiFi Manager", "Control System", "Sensor"],
        github: "#",
        demo: "https://youtu.be/tHRq9BmbVz0"
    },
    'oxce': {
        title: "OXCE - Ocean Expedition App",
        image: "assets/img/ocxe.webp",
        tags: ["Software Dev", "Java", "OOP"],
        desc: "Aplikasi desktop untuk reservasi tiket ekspedisi laut yang dikembangkan menggunakan bahasa Java dengan pendekatan Object-Oriented Programming (OOP). Mengintegrasikan sistem database untuk manajemen data penumpang dan jadwal.",
        tech: ["Java", "MySQL", "JDBC", "SceneBuilder"],
        github: "https://github.com/Fathir-RA/oxce",
        demo: "#"
    }
};

// 3. MODAL FUNCTIONS
function openModal(projectId) {
    const modal = document.getElementById('project-modal');
    const data = projectsData[projectId];

    if (!data) return;

    // Isi Konten
    document.getElementById('modal-image').src = data.image;
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-desc').innerText = data.desc;
    
    // Setup Tombol
    const btnGithub = document.getElementById('modal-github');
    const btnDemo = document.getElementById('modal-demo');
    
    btnGithub.href = data.github;
    btnDemo.href = data.demo;

    btnGithub.style.display = data.github === '#' ? 'none' : 'inline-flex';
    btnDemo.style.display = data.demo === '#' ? 'none' : 'inline-flex';

    // Render Tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = data.tags.map(tag => 
        `<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider border border-transparent dark:border-blue-800">${tag}</span>`
    ).join('');

    // Render Tech Stack
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = data.tech.map(t => 
        `<span class="px-3 py-1 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm">${t}</span>`
    ).join('');

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; 
}

// Tutup dengan ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});
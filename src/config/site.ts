export const site: string = "https://api.avalanch.uz/";
export const siteConfig = {
  links: {
    signup: site + "auth/signup",
    signin: site + "auth/signin",
    logout: site + "auth/logout",
    user: site + "auth/user",
    authdealer: site + "auth/dealer/",
    chat: site + "chat/",
    org: site + "org/",
    twoauth: site + "auth/twoauth",
    profile: site + "auth/me",
    dashboard: site + "dash/",
    sales: site + "sales/",
  },
  ws: { chat: "wss://api.avalanch.uz/chat" },
  uz: {
    last_modified: "Ohirgi o'zgarish vaqti: ",
    created: "Qo'shilish vaqti: ",
    editprofile: "Profilni o'zgartirish",
    editprofilemes:
      "Profil tafsilotlarini o'zgartirish uchun ushbu sahifadan foydalaning.",
    delconfirm: "Tasdiqlash",
    deleteprofile: "Profil hisobini o'chirish",
    areusure: "Haqiqatan ham o'chirmoqchimisiz?",
    deletemes1: "Bu jarayon ortga qaytarilmaydi. Iltimos, ",
    deletemes2:
      " so'zini tasdiqlash uchun kiriting. Sizning profilingiz, bog‘langan veb-saytlaringiz va ularning barcha metrik ma'lumotlari o‘chiriladi.",
    integrationmes:
      "Veb-saytingiz uchun integratsiya kodini oling va uni sahifangizga qo‘shing.",
    integration: "Integratsiya kodi",
    addwebsite: "Veb-sayt qo'shish",
    addwebsitemes: "Yangi veb-sayt qo‘shish va uning trafikasini kuzatish.",
    pleaseinput: "Iltimos, ushbu ",
    deleteconfirm: " so‘zini tasdiqlash uchun kiriting.",
    deletewebsitemes:
      "Veb-sayt va uning barcha tafsilotlarini butunlay o‘chirish.",
    deletewebsite: "Veb-saytni o‘chirish",
    refreshmetric: "Eng yangi statistikalarni olish uchun yangilash.",
    updatewebsite: "Metrikalarni yangilash",
    editwebsite: "Veb-saytni tahrirlash",
    websiteurl: "Veb-sayt URL manzili",
    description: "Tavsif",
    geodistro: "Geografik taqsimot",
    geodistromes:
      "Ushbu grafik veb-sayt trafikining mamlakatlar bo‘yicha taqsimotini ko‘rsatadi.",
    avgsession: "O'rtacha sessiya davomiyligi",
    avgsessionmes:
      "Bu grafik foydalanuvchilarning sahifada qancha vaqt o'tkazganini ko‘rsatadi.",
    pages: "Sahifalar",
    pagesmes:
      "Har bir sahifaning berilgan vaqt oralig‘idagi trafik ko‘rsatkichi.",
    refermes: "Berilgan vaqt oralig‘ida trafik kelib chiqqan manbalar.",
    referrers: "Yo‘naltiruvchilar",
    devdismes: "Foydalanuvchi qurilmalarining taqsimoti.",
    devdistribution: "Qurilma taqsimoti",
    avgbounceratemes:
      "Foydalanuvchilarning sahifalar o‘rtasida sakrash darajasini ko‘rsatuvchi grafik.",
    avgbouncerate: "O‘rtacha sakrash darajasi",
    visitchartmes:
      "Berilgan vaqt davomida tashriflar va noyob tashrifchilar grafigi.",
    visitchart: "Tashriflar statistikasi",
    avgloadtime: "O‘rtacha yuklanish vaqti",
    avgloadtimedesc:
      "Ushbu grafik sahifaning o‘rtacha yuklanish vaqtini ko‘rsatadi: ",
    infomes: "Ushbu veb-sayt haqida qo‘shimcha ma'lumotlar.",
    day: "24 soat",
    week: "Hafta",
    month: "Oy",
    all: "Barcha vaqtlar",
    profile: "Profil",
    nometricmes: "Oxirgi 24 soatda ma'lumotlar mavjud emas.",
    visits: "Tashriflar",
    uniquevisits: "Noyob tashrifchilar",
    bouncerate: "Sakrash darajasi",
    avgses: "O‘rt. sessiya",
    toppages: "Eng ko‘p tashrif buyurilgan sahifalar",
    topreferrers: "Eng ko‘p yo‘naltiruvchi manbalar",
    mobile: "Mobil",
    tablet: "Planshet",
    desktop: "Kompyuter",
    totalvisits: "Jami tashriflar",
    nowebmes: "Hali hech qanday veb-sayt qo‘shilmagan.",
    webcreate: "Veb-sayt qo‘shish",
    language: "Til",
    metrics: "Ko‘rsatkichlar",
    website: "Veb-sayt",
    menu: "Menyu",
    system: "Tizim",
    theme: "Ko‘rinish",
    dark: "Qorong‘u",
    light: "Yorug‘",
    twoauthm:
      "Tasdiqlash uchun elektron pochtangizga bir martalik kod yuborildi. Ushbu joyga kodni kiriting.",
    forgot: "Parolni unutdingizmi?",
    username: "Foydalanuvchi nomi",
    firstname: "Ism",
    lastname: "Familiya",
    email: "Elektron pochta",
    password: "Parol",
    role: "Vazifa",
    owner: "Egası",
    manager: "Menejer",
    dev: "Dasturchi",
    designer: "Dizayner",
    analyst: "Tahlilchi",
    project: "Loyiha",
    work: "Ish",
    team: "Jamoa",
    teammember: "Jamoa a'zosi",
    issue: "Muammo",
    signup: "Ro‘yxatdan o‘tish",
    signin: "Tizimga kirish",
    signout: "Tizimdan chiqish",
    twoauth: "Ikki bosqichli tekshiruv",
    hide: "Parolni yashirish",
    show: "Parolni ko‘rsatish",
    dashboard: "Asosiy panel",
    process: "Jarayon",
    docs: "Hujjatlar",
    about: "Haqida",
    error: "Xatolik",
    NotAuthorized: "Sizda kerakli ruxsat yo‘q!",
    Forbidden: "Bu ma'lumot sizga taqiqlangan!",
    NotFound: "Bu ma'lumot tizimda mavjud emas.",
    CrashServer: "Ichki tizim xatosi yuz berdi.",
    loading: "Ma'lumotlar yuklanmoqda, iltimos kuting...",
  },
  en: {
    last_modified: "Last modified at: ",
    created: "Created at: ",
    editprofile: "Edit Profile",
    editprofilemes:
      "Modify your profile details such as name, email, and password.",
    delconfirm: "Confirm",
    deleteprofile: "Delete Profile",
    areusure: "Are you sure you want to delete your profile?",
    deletemes1: "This action is irreversible. Please type ",
    deletemes2:
      "to confirm. Your account, websites, and all associated analytics data will be permanently deleted.",
    integrationmes:
      "Copy and paste this embedding code into your website to start tracking analytics.",
    integration: "Integration Code",
    addwebsite: "Add Website",
    addwebsitemes:
      "Register a new website to track traffic and view analytics.",
    pleaseinput: "Please input ",
    deleteconfirm:
      " to confirm the deletion of this website and its associated data.",
    deletewebsitemes:
      "Permanently remove this website and all its recorded analytics data.",
    deletewebsite: "Delete Website",
    refreshmetric: "Retrieve the latest analytics data for this website.",
    updatewebsite: "Update website metrics",
    editwebsite: "Edit Website",
    websiteurl: "Website URL",
    description: "Description",
    geodistro: "Geographical Distribution",
    geodistromes: "This graph displays traffic distribution by country.",
    avgsession: "Average Session Duration (s)",
    avgsessionmes: "Represents the average time users spend on a page.",
    pages: "Pages",
    pagesmes: "Displays traffic per page over a selected time period.",
    refermes: "Traffic sources for the selected time period.",
    referrers: "Referrers",
    devdismes: "Breakdown of visitors by device type.",
    devdistribution: "Device Distribution",
    avgbounceratemes:
      "Shows the percentage of users who leave the site after viewing only one page.",
    avgbouncerate: "Average Bounce Rate",
    visitchartmes: "Shows the number of visits and unique visitors over time.",
    visitchart: "Visitor Trends",
    avgloadtime: "Average Load Time",
    avgloadtimedesc:
      "Represents the average time it takes for the website to load.",
    infomes: "General information about this website.",
    day: "Last 24 hours",
    week: "Week",
    month: "Month",
    all: "All time",
    profile: "Profile",
    nometricmes: "No analytics data available for the past 24 hours.",
    visits: "Visits",
    uniquevisits: "Unique Visitors",
    bouncerate: "Bounce Rate",
    avgses: "Avg. Session",
    toppages: "Top Pages",
    topreferrers: "Top Referrers",
    mobile: "Mobile",
    tablet: "Tablet",
    desktop: "Desktop",
    totalvisits: "Total Visits",
    nowebmes: "No websites have been added yet.",
    webcreate: "Add Website",
    language: "Language",
    metrics: "View Analytics",
    website: "Website",
    menu: "Menu",
    system: "System",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    twoauthm:
      "A one-time code has been sent to your email. Please enter it here to verify your identity.",
    forgot: "Forgot your password?",
    username: "Username",
    firstname: "First Name",
    lastname: "Last Name",
    email: "Email",
    password: "Password",
    role: "Role",
    owner: "Owner",
    manager: "Manager",
    dev: "Developer",
    designer: "Designer",
    analyst: "Analyst",
    project: "Projects",
    work: "Work",
    team: "Team",
    teammember: "Team Member",
    issue: "Issue",
    signup: "Sign Up",
    signin: "Sign In",
    signout: "Sign Out",
    twoauth: "Two-Factor Authentication",
    hide: "Hide Password",
    show: "Show Password",
    dashboard: "Dashboard",
    process: "Process",
    docs: "Documentation",
    about: "About",
    error: "Error",
    NotAuthorized: "You are not authorized to access this page.",
    Forbidden: "You do not have permission to view this content.",
    NotFound: "Sorry, the requested page could not be found.",
    CrashServer: "An internal server error occurred. Please try again later.",
    loading: "Loading data... Please wait.",
  },
};

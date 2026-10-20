const $ = (selector) => document.querySelector(selector);
const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalMessage = $("#modalMessage");
const toast = $("#toast");

const messages = {
  surprise: {
    title: "Hari ini tentang kamu ♡",
    message: "Happy birthday, Fia! Semoga di umur yang baru ini kamu makin bahagia, makin dekat sama mimpi-mimpimu, dan selalu dikelilingi orang yang tulus. Hari ini kamu boleh senyum lebih banyak, ya. Kamu pantas merayakan dirimu sendiri."
  },
  letter: {
    title: "Baca ini baik-baik ♡",
    message: "Kalau suatu hari kamu capek, ingat kalau kamu nggak harus selalu kuat setiap saat. Istirahat boleh, nangis juga nggak apa-apa, lalu coba lagi saat kamu siap. Aku berharap kamu selalu punya ruang untuk jadi diri sendiri dan merasa disayangi tanpa harus berpura-pura."
  },
  final: {
    title: "Satu harapan terakhir ♡",
    message: "Aku berharap semua doa baik yang kamu simpan diam-diam satu per satu menemukan jalannya. Semoga kamu sehat, tenang, punya banyak alasan untuk tertawa, dan nggak kehilangan hal-hal yang bikin kamu jadi Fia. Selamat ulang tahun, ya. Hari ini spesial karena kamu ada."
  }
};

function openModal(type) {
  const item = messages[type] || messages.surprise;
  modalTitle.innerHTML = `${item.title.replace(" ♡", "")} <span>♡</span>`;
  modalMessage.textContent = item.message;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2800);
}

$("#surpriseBtn").addEventListener("click", () => openModal("surprise"));
$("#letterBtn").addEventListener("click", () => openModal("letter"));
$("#loveBtn").addEventListener("click", () => openModal("final"));
$("#modalClose").addEventListener("click", closeModal);
$("#modalOkay").addEventListener("click", closeModal);
$("#modalBackdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

const nav = $("#nav");
$("#menuToggle").addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const glow = $(".cursor-glow");
window.addEventListener("pointermove", (event) => {
  if (window.innerWidth > 800) {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
}, { passive: true });

// No audio file is bundled, so this button gives a clear, friendly interaction
// instead of pretending to play music. You can add your own audio later.
$("#soundBtn").addEventListener("click", () => {
  showToast("Tambahkan musik favoritmu lewat file audio sendiri ♡");
});

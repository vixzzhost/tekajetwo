// script.js - perbaikan showPage & fitur kecil tambahan (tanpa mengubah tampilan)

// Saat halaman selesai load, buka halaman terakhir yang tersimpan (jika ada)
document.addEventListener("DOMContentLoaded", () => {
  const last = localStorage.getItem("lastPage");
  if (last && document.getElementById(last)) {
    // Temukan tombol yang cocok dan panggil showPage dengan tombol tersebut
    const btn = findButtonForPage(last);
    showPage(last, btn, false); // false => jangan simpan kembali
  } else {
    // Pastikan tombol Beranda yang aktif jika tidak ada lastPage
    const berandaBtn = findButtonForPage('beranda');
    if (berandaBtn) berandaBtn.classList.add('active');
  }

  // pasang animasi mikro pada .card (aman)
  document.querySelectorAll('.card').forEach(card => {
    card.style.transition = 'transform .15s ease, box-shadow .2s ease';
    card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.01)');
    card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
  });
});

// Utility: cari tombol nav yang memanggil pageId
function findButtonForPage(pageId) {
  // tombol punya onclick seperti: showPage('beranda', this)
  const buttons = document.querySelectorAll('nav button');
  for (let btn of buttons) {
    // cek atribut onclick secara aman
    const onclick = btn.getAttribute('onclick') || '';
    if (onclick.indexOf("'" + pageId + "'") !== -1 || onclick.indexOf('"' + pageId + '"') !== -1) {
      return btn;
    }
  }
  return null;
}

/**
 * Tampilkan halaman
 * @param {string} pageId - id elemen .page yang akan ditampilkan
 * @param {HTMLElement} buttonEl - (opsional) tombol yang memicu aksi, dipakai untuk menandai active
 * @param {boolean} save - (opsional) apakah menyimpan ke localStorage (default true)
 */
function showPage(pageId, buttonEl, save = true) {
  // validasi
  const page = document.getElementById(pageId);
  if (!page) return;

  // sembunyikan semua .page
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

  // tampilkan halaman yang diminta
  page.style.display = 'block';

  // update tombol active
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));

  // jika tombol diserahkan pakai itu, else cari tombol yang cocok
  let btn = buttonEl || findButtonForPage(pageId);
  if (btn) btn.classList.add('active');

  // simpan halaman terakhir jika diminta
  if (save) {
    try {
      localStorage.setItem('lastPage', pageId);
    } catch (e) {
      // jika localStorage diblokir, abaikan tanpa error
      console.warn('localStorage not available:', e);
    }
  }
}





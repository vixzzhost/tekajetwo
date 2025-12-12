// --- FITUR: Smooth scroll browser ---
document.documentElement.style.scrollBehavior = "smooth";

// --- FITUR: Animasi ringan untuk card (tanpa ubah tampilan) ---
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.transition = "transform .15s ease, box-shadow .2s ease";

        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.01)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });
});

// --- FITUR: Cache offline (tanpa ubah file apa pun) ---
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(err => console.log(err));
}




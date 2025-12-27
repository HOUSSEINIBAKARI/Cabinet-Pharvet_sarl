 
    // ==========================
    // PHARVET — Script JS
    // Fonctions : filtres produits, modal produit, animations et formulaire
    // ==========================
    //header
   const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

    // Smooth scroll for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      })
    })

    
    //texte automatique 

const text = "Bonjour et Bienvenue ici votre cabinet de référence où il y a des produits et services de qualité";
const speed = 60;
const pauseAfter = 2000; // pause avant de recommencer

let index = 0;
const el = document.getElementById("typing");

function typeEffect() {
    if (index < text.length) {
        el.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, speed);
    } else {
        // Pause puis recommence
        setTimeout(() => {
            el.innerHTML = "";
            index = 0;
            typeEffect();
        }, pauseAfter);
    }
}

typeEffect();

// slide
const slides = document.querySelectorAll('.slider-img');
let current = 0;

function changeSlide() {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[current].classList.add('active');
  current = (current + 1) % slides.length;
}

setInterval(changeSlide, 2000);


    // Product filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    filterBtns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        filterBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        cards.forEach(c=>{
          if(cat === 'all' || c.dataset.cat === cat) c.style.display = 'flex'; else c.style.display = 'none';
        })
        runFadeIn();
      })
    })

    // Product modal
    function openProduct(name,dose,img){
      document.getElementById('modalName').innerText = name;
      document.getElementById('modalDose').innerText = dose;
      document.getElementById('modalImg').src = img;
      document.getElementById('productModal').style.display = 'flex';
    }
    function closeModal(){document.getElementById('productModal').style.display = 'none'}

    // Form submit (simulé)
    function submitForm(e){
      e.preventDefault();
      // Ici vous pouvez brancher une API ou un e-mailer (ex: POST fetch)
      alert('Merci — votre message a été envoyé. Nous vous répondrons sous peu.');
      e.target.reset();
    }

    // Small reveal on scroll
    const faders = document.querySelectorAll('.fade-in');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('show');}
      })
    },{threshold:0.12});
    faders.forEach(f=>io.observe(f));

    function runFadeIn(){
      document.querySelectorAll('.fade-in').forEach(el=>el.classList.remove('show'));
      setTimeout(()=>{document.querySelectorAll('.fade-in').forEach(el=>io.observe(el))},50);
    }

    // Mobile menu toggle (simplifié)
    document.getElementById('menuToggle').addEventListener('click', ()=>{
      const nav = document.querySelector('nav ul');
      if(nav.style.display === 'flex') nav.style.display = 'none'; else nav.style.display = 'flex';
    })

    // Accessibility: close modal on ESC
    document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeModal(); })
  
/// GPS
const DEFAULT_LAT = 6.52;   // Meiganga
const DEFAULT_LNG = 14.29;

const mapImage = document.getElementById("mapImage");

function loadMap(lat, lng) {
    mapImage.src =
        `https://staticmap.openstreetmap.de/staticmap.php` +
        `?center=${lat},${lng}` +
        `&zoom=14` +
        `&size=600x300` +
        `&markers=${lat},${lng},red-pushpin`;
}

// 1️⃣ Charger la carte par défaut (TOUJOURS)
loadMap(DEFAULT_LAT, DEFAULT_LNG);

// 2️⃣ Essayer le GPS (optionnel)
if (navigator.geolocation && location.protocol === "https:") {
    navigator.geolocation.getCurrentPosition(
        position => {
            loadMap(
                position.coords.latitude,
                position.coords.longitude
            );
        },
        () => {
            // GPS refusé → on garde Meiganga
            console.warn("GPS refusé, carte par défaut affichée");
        },
        {
            enableHighAccuracy: true,
            timeout: 8000
        }
    );
}

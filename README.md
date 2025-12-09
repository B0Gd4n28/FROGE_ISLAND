# 🔥 FORGE ACADEMY — Landing Page Islanda

Landing page modern și responsiv pentru expediția de transformare în Islanda organizată de Forge Academy.

## 📋 Caracteristici

### Design
- ✅ **Brand Identity**: Culori Forge Flame (#FF7B09) și Forge Coal (#181615)
- ✅ **Tipografie**: Tektur (headings) + Anonymous Pro (body text)
- ✅ **Responsive**: Optimizat pentru mobile, tablet și desktop
- ✅ **Animații smooth**: AOS (Animate On Scroll) + parallax effects

### Secțiuni Implementate
1. **Hero Section** — Titlu dramatic cu date, durată și locuri disponibile
2. **Beneficii (4 carduri)** — De ce să participi la expediție
3. **Despre Forge Academy** — Misiune, filosofie și statistici
4. **Program (8 zile)** — Timeline complet cu activități detaliate
5. **Hartă Interactivă** — Puncte cheie pe harta Islandei
6. **Pentru Cine** — Target audience (antreprenori, lideri)
7. **Preț Transparent** — €2,090/persoană cu incluziuni clare
8. **Galerie Vizuală** — Preview peisaje islandeze
9. **Formular Rezervare** — Cu validare și handling complet
10. **FAQ Accordion** — Răspunsuri la întrebări frecvente
11. **Footer** — Contact, social media, legal links

### Funcționalități JavaScript
- ✅ Scroll reveal animations
- ✅ Parallax effect pe hero
- ✅ Number counter animat (statistici)
- ✅ Hartă interactivă cu hover states
- ✅ FAQ accordion funcțional
- ✅ Form validation + submission handling
- ✅ Smooth scroll navigation
- ✅ Scroll progress indicator
- ✅ Mobile menu ready
- ✅ Timeline progress tracking

## 🚀 Instalare și Rulare

### Metoda 1: Deschide Direct în Browser
```bash
# Navighează în folder
cd c:\Users\Bogdan\Desktop\lading2.0

# Deschide index.html în browser (double-click sau):
start index.html
```

### Metoda 2: Server Local (Recomandat pentru Development)

**Opțiunea A: Python Server**
```bash
# Python 3.x
python -m http.server 8000

# Apoi deschide: http://localhost:8000
```

**Opțiunea B: Node.js http-server**
```bash
# Instalează global (o singură dată)
npm install -g http-server

# Rulează serverul
http-server -p 8000

# Deschide: http://localhost:8000
```

**Opțiunea C: VS Code Live Server**
1. Instalează extensia "Live Server" în VS Code
2. Click dreapta pe `index.html` → "Open with Live Server"
3. Se va deschide automat la `http://127.0.0.1:5500`

## 📁 Structura Proiectului

```
lading2.0/
│
├── index.html                 # Pagina principală
├── README.md                  # Acest fișier
│
├── assets/
│   ├── css/
│   │   └── style.css         # Stiluri complete (Forge brand)
│   │
│   ├── js/
│   │   └── main.js           # JavaScript (animații, interactivitate)
│   │
│   └── images/               # Folder pentru imagini
│       └── (adaugă aici imaginile tale)
│
├── Forge_academy.pdf         # Brand guidelines (analizat)
└── Исландия.pdf             # Conținut călătorie (analizat)
```

## 🎨 Paleta de Culori (Forge Brand)

```css
--forge-flame: #FF7B09;        /* Portocaliu intens — CTA, accente */
--forge-coal: #181615;         /* Negru antracit — fundal principal */
--forge-flame-light: #ff9033;  /* Hover states */
--forge-flame-dark: #cc6207;   /* Shadows */
--white: #FFFFFF;              /* Text principal */
--grey-medium: #9E9E9E;        /* Text secundar */
```

## 🖼️ Cum Să Adaugi Imaginile Reale

1. **Salvează imaginile** în `assets/images/`
2. **Redenumește-le logic**:
   - `hero-kirkjufell.jpg` — pentru hero section
   - `day2-snaefellsnes.jpg` — pentru ziua 2
   - `day4-golden-circle.jpg` — pentru ziua 4
   - etc.

3. **Înlocuiește placeholder-urile** în HTML:
   
   Găsește:
   ```html
   <div class="image-placeholder" style="background: ...">
   ```
   
   Înlocuiește cu:
   ```html
   <img src="assets/images/nume-imagine.jpg" alt="Descriere">
   ```

4. **Pentru background-ul hero**, adaugă în CSS:
   ```css
   .hero-bg {
       background-image: url('../images/hero-kirkjufell.jpg');
       background-size: cover;
       background-position: center;
   }
   ```

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (layout complet)
- **Tablet**: 768px - 1024px (layout adaptat)
- **Mobile**: < 768px (stacked layout, menu hamburger)
- **Small Mobile**: < 480px (font sizes reduse)

## 🔧 Customizare

### Schimbă Culorile
Modifică în `assets/css/style.css`:
```css
:root {
    --forge-flame: #TUA_CULOARE;
    --forge-coal: #TUA_CULOARE;
}
```

### Adaugă/Modifică Secțiuni
1. Editează `index.html`
2. Adaugă stiluri în `assets/css/style.css`
3. Adaugă funcționalitate în `assets/js/main.js`

### Conectează Backend-ul (Form Submission)
În `assets/js/main.js`, găsește:
```javascript
// Simulate form submission (replace with actual API call)
setTimeout(() => {
    // Replace this with:
    fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Handle success
    });
}, 1500);
```

## 📊 Optimizări Implementate

- ✅ **Performance**: CSS optimizat, JavaScript modular
- ✅ **SEO**: Meta tags, semantic HTML, structured data ready
- ✅ **Accessibility**: ARIA labels, keyboard navigation, focus states
- ✅ **Loading**: Fade-in animation, lazy loading ready
- ✅ **Animations**: 60fps smooth transitions, hardware-accelerated

## 🌐 Deploy (Opțiuni)

### 1. **Netlify** (Recomandat — Gratuit)
```bash
# Instalează Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### 2. **Vercel**
```bash
npm install -g vercel
vercel
```

### 3. **GitHub Pages**
1. Creează repo pe GitHub
2. Push codul
3. Settings → Pages → Deploy from main branch

### 4. **FTP Hosting Tradițional**
- Urcă toate fișierele pe serverul tău
- Asigură-te că `index.html` e în root

## 📝 To-Do (Îmbunătățiri Viitoare)

- [ ] Adaugă imagini reale din Islanda
- [ ] Conectează formularul la backend/CRM
- [ ] Implementează lightbox pentru galerie
- [ ] Adaugă Google Maps embed pentru hartă
- [ ] Integrare newsletter (Mailchimp/SendGrid)
- [ ] Analytics (Google Analytics / Plausible)
- [ ] A/B testing pentru CTA buttons
- [ ] Multi-language support (RO/EN/RU)

## 🐛 Debugging

### Dacă animațiile nu funcționează:
- Verifică console-ul browserului (F12)
- Asigură-te că AOS library se încarcă corect
- Refresh hard: `Ctrl + Shift + R`

### Dacă stilurile nu se aplică:
- Verifică path-urile în `<link>` tags
- Clear cache: `Ctrl + F5`
- Verifică structura folderelor

### Dacă formularul nu se trimite:
- Verifică console pentru erori JavaScript
- Asigură-te că validarea e corectă
- Implementează backend endpoint

## 📞 Support

Pentru întrebări sau probleme:
- Email: mail@forgeacademy.info
- GitHub Issues: [link-to-repo]/issues

## 📜 License

© 2025 Forge Academy. Toate drepturile rezervate.

---

**Creat cu 🔥 pentru Forge Academy**  
*Ковать лидеров будущего*

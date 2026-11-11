# Upravljanje fotografijama i portfolio galerijama — Amox Photography

Ovaj dokument detaljno objašnjava kako se dodaju, organizuju i prikazuju fotografije u portfoliju sajta **Amox Photography**, bez potrebe za ručnim menjanjem React ili TypeScript komponenti.

---

## 1. Gde se dodaju fotografije (Sedam kategorija portfolija)

Sve fotografije za portfolio nalaze se u direktorijumu `public/photos/`, podeljenom na tačno **7 kategorijskih foldera**:

```text
public/photos/
├── svadbe/                  → 1. Svadbe (EN: Weddings)
├── 18-rodjendani/           → 2. 18. rođendani (EN: 18th Birthdays)
├── 1-rodjendani/            → 3. 1. rođendani (EN: 1st Birthdays)
├── krstenja/                → 4. Krštenja (EN: Baptisms)
├── proslave-dogadjaji/      → 5. Portreti (EN: Portraits)
├── ngo-organizacije/        → 6. NGO i organizacije (EN: NGOs & Organizations)
└── korporativni-dogadjaji/  → 7. Korporativni događaji (EN: Corporate Events)
```

### Pravila organizacije:
- **Svaki folder predstavlja celu kategoriju**, a ne pojedinačni događaj ili klijenta.
- U odgovarajući folder (npr. `public/photos/18-rodjendani/`) ubacite direktno željene fotografije (npr. desetak odabranih fotografija sa različitih proslava 18. rođendana).
- **Nemojte praviti podfoldere** unutar kategorijskih foldera — sistem čita isključivo fajlove koji se nalaze direktno u odgovarajućem folderu kategorije.
- Mapiranje foldera i dvojezičnih naziva kategorija centralizovano je na jednom mestu u fajlu `lib/photo-categories.ts`.

---

## 2. Podržani formati i redosled prikazivanja

### Podržani formati slika:
Sistem automatski prihvata sledeće ekstenzije (velika i mala slova su podržana):
- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.avif`

Svi ostali fajlovi (npr. `.DS_Store`, `.gitkeep`, `.txt`, `.mp4` ili skriveni fajlovi koji počinju tačkom `.`) automatski se ignorišu radi bezbednosti i čistoće galerije.

### Kontrola redosleda prikazivanja:
Fotografije unutar svake kategorije sortiraju se **prirodnim alfanumeričkim redosledom** (`01`, `02`, ..., `10`).
Ako želite tačno određen redosled prikazivanja, preporučuje se imenovanje fajlova sa vodećim brojem, na primer:
- `01-ulazak-mladenaca.jpg`
- `02-portret-portret.jpg`
- `03-detalji-dekoracije.webp`

### Automatska orijentacija kadra u mreži:
- Podrazumevani prikaz u mreži je horizontalni (`landscape`, odnos `4:3`).
- Ako naziv fajla sadrži reč `portret`, `portrait` ili `vert` (npr. `02-mladenci-portret.jpg`), kartica u galeriji će automatski dobiti vertikalni portretni odnos (`3:4`).
- Ako naziv fajla sadrži reč `square` ili `kvadrat`, kartica će dobiti kvadratni odnos (`1:1`).
- U Lightbox prikazu (klikom na fotografiju) svaka slika se prikazuje u svom izvornom formatu (`object-contain`).

---

## 3. Kako sistem otkriva nove fotografije

Implementiran je **dvostruki (modularni) mehanizam** u fajlovima `lib/photo-discovery.ts`, `app/api/photos/route.ts` i `scripts/generate-photo-manifest.mjs`, kako bi sajt radio pouzdano bez obzira na to koji tip hostinga izaberete u budućnosti:

1. **Serversko čitanje direktorijuma u realnom vremenu (`filesystem` režim):**
   - API ruta `/api/photos` (`force-dynamic`) pri svakom učitavanju stranice proverava foldere u `public/photos/<kategorija>` direktno na serveru.
   - Validira imena fajlova i ekstenzije, nikad ne izlaže serverske putanje i vraća listu javnih URL putanja (`/photos/<kategorija>/<ime-fajla>`).
2. **Statički manifest kao rezervni mehanizam (`manifest` režim):**
   - Skripta `scripts/generate-photo-manifest.mjs` skenira `public/photos/*` i upisuje listu pronađenih fajlova u `lib/photos-manifest.json`.
   - Ova skripta se izvršava automatski pre svakog `npm run build` procesa (ili ručno komandom `npm run photos:manifest`).
   - Ukoliko izabrani hosting ne dozvoljava serversko čitanje direktorijuma u runtime-u, sistem automatski koristi `lib/photos-manifest.json`.

---

## 4. Da li je potrebno ponovno objavljivanje (build/deploy) sajta?

To zavisi isključivo od vrste hostinga koji budete izabrali:

### Scenario A: Hosting sa trajnim fajl-sistemom i aktivnim Node.js serverom (VPS, Dedicated server, Docker/Cloud Run sa trajnim diskom, cPanel Node.js)
- **Vidljivost:** **Odmah nakon osvežavanja stranice (Refresh)**, bez ponovnog build-a i bez menjanja koda.
- **Postupak:** Dovoljno je da putem FTP/SFTP/SSH ili fajl-menadžera na hostingu otpremite nove fotografije u odgovarajući folder unutar `public/photos/<kategorija>/`. Pri sledećem otvaranju sajta, `/api/photos` ih automatski pronalazi i prikazuje.

### Scenario B: Serverless / CDN / Statički hosting (Vercel, Netlify, Cloudflare Pages)
- Na serverless/CDN platformama folder `public/` se pakuje i šalje na CDN mrežu prilikom objavljivanja (*deploy*-a) sajta i ne postoji klasičan FTP folder koji se menja uživo bez deploy-a.
- **Vidljivost:** **Nakon ponovnog objavljivanja (deploy/build) sajta**, ali **bez ikakvog menjanja React ili TypeScript koda**.
- **Postupak:** Dodate nove fotografije u odgovarajući folder `public/photos/<kategorija>/` i pokrenete objavljivanje (`git push` ili `npm run build`). Tokom `npm run build`, skripta `scripts/generate-photo-manifest.mjs` se automatski pokreće, ažurira `lib/photos-manifest.json` i sve nove fotografije postaju vidljive na sajtu.

---

## 5. Rešavanje problema (Troubleshooting) ako se fotografija ne prikaže

Ako ste dodali fotografiju, a ona se ne vidi u galeriji, proverite sledeće:

1. **Da li je fotografija u pravom folderu?**
   - Proverite da li se fajl nalazi direktno u jednom od 7 foldera unutar `public/photos/` (`svadbe`, `18-rodjendani`, `1-rodjendani`, `krstenja`, `proslave-dogadjaji`, `ngo-organizacije`, `korporativni-dogadjaji`), a ne u podfolderu.
2. **Da li je format fajla podržan?**
   - Dozvoljeni formati su `.jpg`, `.jpeg`, `.png`, `.webp` i `.avif`. Fajlovi u `.heic`, `.tiff` ili `.raw`/`.cr2`/`.arw` formatu neće biti prikazani dok se ne eksportuju u neki od podržanih web formata.
3. **Da li naziv fajla počinje tačkom?**
   - Fajlovi čije ime počinje tačkom (npr. `.slika.jpg`) tretiraju se kao skriveni sistemski fajlovi i preskaču se.
4. **Da li koristite statički/serverless hosting?**
   - Ako ste na statičkom/serverless hostingu, pokrenite `npm run photos:manifest` ili `npm run build` kako bi se statički manifest osvežio i objavio na CDN.
5. **Velike dimenzije ili težina fajla:**
   - Radi brzog učitavanja galerije preporučuje se da fotografije budu optimizovane za web (duža strana 2000–2500 px, kvalitet 80–85%, JPG ili WebP).

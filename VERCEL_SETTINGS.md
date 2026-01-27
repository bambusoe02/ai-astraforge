# ⚙️ Vercel Settings - Krok po kroku

## 📸 Widzę Twój ekran konfiguracji

### ✅ Co jest OK:
- **Framework Preset:** Next.js ✓
- **Root Directory:** apps/web ✓
- **Repository:** bambusoe02/ai-astraforge ✓
- **Branch:** main ✓

### 🔧 Co trzeba zmienić:

#### 1. **Build Command**
**ZMIEŃ Z:**
```
turbo run build
```

**NA:**
```
cd ../.. && npm install && npm run build --filter=web
```

**LUB (jeśli pierwsze nie działa):**
```
npm install && npm run build --filter=web
```

#### 2. **Output Directory**
**ZMIEŃ Z:**
```
Next.js default
```

**NA:**
```
.next
```

#### 3. **Install Command**
**ZMIEŃ Z:**
```
npm install --prefix=../..
```

**NA:**
```
npm install
```

**LUB zostaw puste** (Vercel automatycznie zainstaluje)

---

## 📝 Pełna konfiguracja:

```
Framework Preset: Next.js
Root Directory: apps/web
Build Command: cd ../.. && npm install && npm run build --filter=web
Output Directory: .next
Install Command: npm install
```

---

## 🎯 Dlaczego te zmiany?

1. **Build Command:** 
   - Musi przejść do root monorepo (`cd ../..`)
   - Zainstalować wszystkie zależności
   - Zbudować tylko web app (`--filter=web`)

2. **Output Directory:**
   - Next.js domyślnie buduje do `.next`
   - Musimy to jawnie podać dla Vercel

3. **Install Command:**
   - Vercel automatycznie instaluje w root directory
   - Nie potrzebujemy `--prefix`

---

## ✅ Po ustawieniu:

1. Kliknij **"Deploy"**
2. Poczekaj na build (może zająć 2-5 minut)
3. Sprawdź czy build się powiódł
4. Jeśli są błędy, sprawdź logi w Vercel Dashboard

---

## 🚨 Jeśli build się nie powiedzie:

**Błąd: "Cannot find module @astraforge/ui"**
- Rozwiązanie: Upewnij się, że `Build Command` instaluje wszystkie zależności

**Błąd: "Turbo not found"**
- Rozwiązanie: Dodaj `turbo` do root `package.json` devDependencies

**Błąd: "Output directory not found"**
- Rozwiązanie: Sprawdź czy Output Directory to `.next` (bez `/` na początku)

---

## 💡 Alternatywna konfiguracja (jeśli powyższe nie działa):

```
Build Command: npm run build --filter=web
Output Directory: apps/web/.next
Install Command: (puste)
```

Spróbuj tej opcji jeśli pierwsza nie zadziała!

# 🔒 Rozwiązanie gdy WSZYSTKO jest zablokowane w Vercel

## Problem
- ❌ Framework Preset - zablokowane
- ❌ Build Command - zablokowane  
- ❌ Output Directory - zablokowane
- ✅ Install Command - można edytować

## ✅ ROZWIĄZANIE: vercel.json w repozytorium

Vercel automatycznie użyje `vercel.json` z root repozytorium i **nadpisze** wszystkie ustawienia z UI!

### Krok 1: Sprawdź czy vercel.json jest w repo

```bash
git status vercel.json
```

Jeśli jest, przejdź do Kroku 2.
Jeśli nie ma, dodaj go:

```bash
git add vercel.json
git commit -m "Add Vercel config for monorepo"
git push
```

### Krok 2: W Install Command (jedyne edytowalne pole)

Wpisz:
```bash
cd ../.. && npm install
```

**LUB zostaw puste** - Vercel zainstaluje automatycznie.

### Krok 3: Deploy

Kliknij **"Deploy"** - Vercel użyje `vercel.json` zamiast ustawień z UI!

---

## 📝 Co jest w vercel.json:

```json
{
  "buildCommand": "cd ../.. && npm install && npm run build --filter=web",
  "outputDirectory": ".next",
  "installCommand": "cd ../.. && npm install"
}
```

To nadpisze wszystkie zablokowane pola!

---

## 🔍 Jak sprawdzić czy działa:

1. **Deploy projekt**
2. **Sprawdź logi builda** w Vercel Dashboard
3. **Szukaj w logach:**
   ```
   Running "cd ../.. && npm install && npm run build --filter=web"
   ```
4. **Jeśli widzisz ten command** - działa! ✅

---

## ⚠️ Jeśli build się nie powiedzie:

**Błąd: "Cannot find module"**
- Sprawdź czy `installCommand` instaluje w root
- Sprawdź czy wszystkie workspace dependencies są w package.json

**Błąd: "Turbo not found"**
- Upewnij się, że `turbo` jest w root `package.json` devDependencies

**Błąd: "Output directory not found"**
- Sprawdź czy Output Directory to `.next` (bez `/`)

---

## 🎯 Alternatywa: Install Command z buildem

Jeśli `vercel.json` nie działa, użyj Install Command do wszystkiego:

**Install Command:**
```bash
cd ../.. && npm install && npm run build --filter=web
```

**Build Command:** (zostaw domyślne - będzie ignorowane)

**Output Directory:** (zostaw domyślne - Vercel znajdzie `.next`)

---

## ✅ Najlepsze rozwiązanie:

1. **Commit vercel.json** (już jest w repo)
2. **W Install Command:** `cd ../.. && npm install` (lub puste)
3. **Kliknij Deploy**
4. **Vercel użyje vercel.json automatycznie!**

---

## 📊 Sprawdź po deploy:

Vercel Dashboard → Settings → General → Build & Development Settings

Powinieneś zobaczyć, że Vercel używa wartości z `vercel.json`!

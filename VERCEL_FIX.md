# 🔓 Rozwiązanie dla zablokowanych pól w Vercel

## Problem
Vercel automatycznie wykrył Next.js i zablokował edycję:
- ❌ Build Command (zablokowane)
- ❌ Output Directory (zablokowane)
- ✅ Install Command (można edytować)

## ✅ Rozwiązanie 1: Zmień Framework Preset

1. **Kliknij dropdown "Framework Preset"**
2. **Wybierz "Other"** (zamiast Next.js)
3. **Teraz wszystkie pola będą edytowalne!**
4. **Ustaw ręcznie:**
   - Framework: Next.js (lub zostaw Other)
   - Build Command: `cd ../.. && npm install && npm run build --filter=web`
   - Output Directory: `.next`
   - Install Command: `cd ../.. && npm install`

## ✅ Rozwiązanie 2: Użyj Install Command

Ponieważ tylko Install Command można edytować, możesz tam wykonać wszystko:

**Install Command:**
```bash
cd ../.. && npm install && npm run build --filter=web
```

**Build Command:** (zostaw domyślne, będzie ignorowane)
**Output Directory:** `.next` (zostaw domyślne)

⚠️ **UWAGA:** To może nie zadziałać idealnie, bo Vercel może próbować budować ponownie.

## ✅ Rozwiązanie 3: vercel.json (NAJLEPSZE)

Plik `vercel.json` w root repozytorium **nadpisze** ustawienia z UI!

**Już masz `vercel.json`** - sprawdź czy jest w root:
```
/home/bambusoe/ai-astraforge/vercel.json
```

**Jeśli jest w root, Vercel automatycznie go użyje!**

### Co zrobić:
1. **Zostaw ustawienia w UI jak są** (nawet zablokowane)
2. **Upewnij się, że `vercel.json` jest w root repozytorium**
3. **Commit i push:**
   ```bash
   git add vercel.json
   git commit -m "Add Vercel config for monorepo"
   git push
   ```
4. **Vercel automatycznie użyje `vercel.json`** przy następnym deploy

## ✅ Rozwiązanie 4: Zmień Root Directory

Możesz spróbować zmienić Root Directory na root projektu:

1. **Root Directory:** `.` (root)
2. **Build Command:** `npm install && npm run build --filter=web`
3. **Output Directory:** `apps/web/.next`

Ale to może być bardziej skomplikowane.

---

## 🎯 REKOMENDACJA

**Użyj Rozwiązania 1** (Framework Preset → Other):
- Najprostsze
- Daje pełną kontrolę
- Działa od razu

**LUB Rozwiązanie 3** (vercel.json):
- Najbardziej profesjonalne
- Konfiguracja w kodzie
- Łatwe do utrzymania

---

## 📝 Quick Fix - Install Command

Jeśli chcesz szybko przetestować, użyj tego w **Install Command**:

```bash
cd ../.. && npm install && npm run build --filter=web
```

A potem ustaw:
- **Build Command:** (zostaw puste lub domyślne)
- **Output Directory:** `.next`

---

## ✅ Sprawdź po deploy

Po deploy sprawdź w Vercel Dashboard → Settings → General:
- Czy Build Command się wykonał poprawnie
- Czy Output Directory jest poprawne
- Sprawdź logi builda

Jeśli są błędy, pokaż mi logi!

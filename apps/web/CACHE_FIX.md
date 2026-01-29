# Jak naprawić problem z cache w Next.js

## Problem: Widzisz starą wersję po update

Next.js cache'uje komponenty, obrazy i buildy. Jeśli widzisz starą wersję, wykonaj te kroki:

## Rozwiązanie lokalne

### 1. Wyczyść cache Next.js
```bash
cd apps/web
npm run clean
# lub ręcznie:
rm -rf .next .turbo node_modules/.cache
```

### 2. Uruchom dev server z czystym cache
```bash
npm run dev:clean
```

### 3. Wyczyść cache przeglądarki
- **Chrome/Edge**: `Ctrl+Shift+Delete` (Windows) lub `Cmd+Shift+Delete` (Mac)
- Wybierz "Cached images and files"
- Kliknij "Clear data"

### 4. Hard refresh w przeglądarce
- **Windows/Linux**: `Ctrl + F5` lub `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

## Rozwiązanie dla Vercel (produkcja)

### 1. Wyczyść Vercel Build Cache
1. Idź do Vercel Dashboard
2. Project Settings → General
3. Scroll do "Build & Development Settings"
4. Kliknij "Clear Build Cache"
5. Redeploy project

### 2. Force redeploy
```bash
git commit --allow-empty -m "Force redeploy"
git push
```

### 3. Sprawdź czy obrazy się zaktualizowały
- Otwórz DevTools (F12)
- Network tab
- Odśwież stronę z `Disable cache` zaznaczonym
- Sprawdź czy obrazy mają nowe timestamps

## Debugowanie

### Sprawdź czy pliki są zaktualizowane
```bash
# Sprawdź datę modyfikacji screenshots
ls -la apps/web/public/screenshots/

# Sprawdź czy komponenty są zaktualizowane
grep -r "placeholder" apps/web/components/
```

### Sprawdź cache Next.js
```bash
# Zobacz co jest w cache
ls -la apps/web/.next/cache/
```

### Sprawdź czy build używa nowych plików
```bash
cd apps/web
npm run build
# Sprawdź output - powinien pokazać nowe pliki
```

## Najczęstsze przyczyny

1. **Browser cache** - Najczęstsza przyczyna
2. **Next.js .next folder** - Stary build
3. **Vercel cache** - Stary deployment
4. **CDN cache** - Jeśli używasz CDN
5. **Service Worker** - Jeśli masz PWA

## Automatyczne czyszczenie

Dodaj do `.gitignore` (już jest):
```
.next/
.turbo/
node_modules/.cache/
```

## Sprawdź czy działa

Po wyczyszczeniu cache:
1. Otwórz DevTools → Network
2. Odśwież stronę
3. Sprawdź czy obrazy mają nowe timestamps
4. Sprawdź czy komponenty są zaktualizowane

---

**Tip**: Jeśli nadal widzisz starą wersję, użyj incognito/private mode w przeglądarce.


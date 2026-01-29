# Lokalny Development - Jak to działa

## Szybki Start

```bash
# 1. Zainstaluj zależności
npm install

# 2. Ustaw zmienne środowiskowe
cp ../../env.example .env.local
# Edytuj .env.local i dodaj ANTHROPIC_API_KEY

# 3. Uruchom dev server
npm run dev
```

## Jak działa lokalnie

### 1. Next.js Dev Server
- **Port**: `http://localhost:3000`
- **Hot Reload**: Automatycznie odświeża po zmianach
- **Fast Refresh**: React komponenty odświeżają się bez utraty stanu

### 2. Cache Next.js
Next.js cache'uje:
- **Komponenty** w `.next/cache/`
- **Obrazy** w `.next/cache/images/`
- **Build artifacts** w `.next/`

### 3. Problem z cache

Jeśli widzisz starą wersję:

```bash
# Szybkie rozwiązanie
npm run clean && npm run dev

# Lub ręcznie
rm -rf .next .turbo node_modules/.cache
npm run dev
```

### 4. Browser Cache

Przeglądarka też cache'uje:
- **Hard Refresh**: `Ctrl+Shift+R` (Windows) lub `Cmd+Shift+R` (Mac)
- **DevTools**: Network tab → "Disable cache"
- **Incognito**: Otwórz w trybie prywatnym

## Struktura projektu

```
apps/web/
├── app/              # Next.js 14 App Router
│   ├── api/          # API routes (server-side)
│   ├── dashboard/    # Dashboard pages
│   └── page.tsx      # Landing page
├── components/       # React komponenty
├── lib/              # Utilities i API client
├── public/           # Statyczne pliki (obrazy, etc.)
└── .next/            # Build output (ignorowany w git)
```

## API Routes (Server-side)

API routes działają na serwerze:
- `/api/chat` - Chat z Claude
- `/api/generate-code` - Generowanie kodu
- `/api/agent-status` - Status agentów

**Ważne**: API routes wymagają `ANTHROPIC_API_KEY` w `.env.local`

## Environment Variables

```bash
# .env.local (nie commituj!)
ANTHROPIC_API_KEY=sk-ant-your-key-here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Debugowanie

### Sprawdź czy zmiany się załadowały
```bash
# 1. Sprawdź czy plik został zmieniony
ls -la apps/web/components/your-component.tsx

# 2. Sprawdź czy Next.js widzi zmiany
# W terminalu gdzie działa `npm run dev` powinieneś zobaczyć:
# "compiled /your-page successfully"
```

### Sprawdź cache
```bash
# Zobacz co jest w cache
ls -la apps/web/.next/cache/

# Wyczyść cache
npm run clean
```

### Sprawdź build
```bash
# Zbuduj produkcyjną wersję
npm run build

# Uruchom produkcyjny server
npm start
```

## Najczęstsze problemy

### 1. "Module not found"
```bash
# Wyczyść i zainstaluj ponownie
rm -rf node_modules .next
npm install
```

### 2. "Port 3000 already in use"
```bash
# Zabij proces na porcie 3000
lsof -ti:3000 | xargs kill -9
# Lub użyj innego portu
PORT=3001 npm run dev
```

### 3. "API key not configured"
```bash
# Sprawdź czy .env.local istnieje
cat .env.local

# Sprawdź czy zmienna jest ustawiona
echo $ANTHROPIC_API_KEY
```

### 4. Stara wersja po update
```bash
# Zobacz CACHE_FIX.md
npm run clean
npm run dev
# Hard refresh w przeglądarce (Ctrl+Shift+R)
```

## Tips

1. **Używaj DevTools**: F12 → Network tab → "Disable cache"
2. **Hot Reload**: Zmiany w komponentach odświeżają się automatycznie
3. **TypeScript**: Błędy pokazują się w terminalu i w przeglądarce
4. **Console**: Sprawdź console w DevTools dla błędów

## Production Build

```bash
# Zbuduj produkcyjną wersję
npm run build

# Uruchom produkcyjny server
npm start
```

Produkcyjna wersja jest zoptymalizowana i cache'owana.

---

**Pytania?** Zobacz `CACHE_FIX.md` dla szczegółów o cache.


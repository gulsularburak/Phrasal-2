# Sinaps — GitHub Actions ile Otomatik APK

Bu paket, makinene **hiçbir şey kurmadan** (Android Studio / SDK gerekmez) bulutta APK üretmek içindir. GitHub'a yüklersin, GitHub senin yerine derler, sen hazır `.apk`'yi indirirsin.

## Klasör yapısı
```
sinaps-app/
├── www/
│   └── index.html              ← uygulaman (STT/TTS native köprüsü dahil)
├── scripts/
│   └── patch-android.mjs       ← manifeste mikrofon/internet izinlerini ekler
├── .github/workflows/
│   └── build.yml               ← APK'yi derleyen otomasyon
├── capacitor.config.json
└── package.json
```

## Adım adım

### 1) GitHub deposu oluştur
- github.com → giriş yap → sağ üst **+** → **New repository**
- İsim: `sinaps-app` · **Public** (Actions ücretsiz çalışır) · **Create repository**

### 2) Dosyaları yükle
**Kolay yol (sürükle-bırak):**
- Depo sayfasında **Add file → Upload files**
- Bu klasördeki TÜM dosyaları (klasör yapısını koruyarak) sürükle.
  - ⚠️ `.github` klasörünün de yüklendiğinden emin ol. Tarayıcı gizli klasörü atlarsa: önce normal dosyaları yükle, sonra **Add file → Create new file** ile yol olarak `.github/workflows/build.yml` yazıp içeriğini yapıştır.
- **Commit changes**

**Git bilenler için:**
```bash
cd sinaps-app
git init && git add . && git commit -m "Sinaps"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/sinaps-app.git
git push -u origin main
```

### 3) Derlemeyi bekle
- Depoda **Actions** sekmesine geç.
- "Build Sinaps APK" otomatik başlar (push ile). Başlamazsa: Actions → workflow seç → **Run workflow**.
- Süre ~3–6 dakika. Yeşil ✓ olunca biter.

### 4) APK'yi indir
- Biten çalışmaya tıkla → en altta **Artifacts** → **sinaps-debug-apk** → indir.
- Zip'ten çıkan `app-debug.apk`'yi telefonuna at, "Bilinmeyen kaynaklara izin ver" diyip kur.

## Notlar
- Bu bir **debug** APK'dır: test için mükemmel, ama Google Play'e yüklenemez. Play için imzalı **AAB** gerekir (Capacitor paketleme rehberindeki "İmzalama" bölümüne bak).
- Mikrofon (STT) ve sesli okuma (TTS) **gerçek cihazda** çalışır; ilk mikrofon kullanımında Android izin soracaktır.
- Uygulamayı güncellemek için `www/index.html`'i değiştirip tekrar push et — Actions yeni APK'yi otomatik üretir.
- İkon/splash şu an varsayılan. Özel logo için `@capacitor/assets` adımını ekleyebiliriz.

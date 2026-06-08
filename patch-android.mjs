// android/ klasörü CI'da üretildiğinde manifeste izinleri ekler (idempotent).
import fs from 'fs';

const p = 'android/app/src/main/AndroidManifest.xml';
let x = fs.readFileSync(p, 'utf8');

const perms = [
  'android.permission.INTERNET',
  'android.permission.RECORD_AUDIO',
  'android.permission.MODIFY_AUDIO_SETTINGS'
];

let inject = '';
for (const perm of perms) {
  if (!x.includes(perm)) {
    inject += `    <uses-permission android:name="${perm}" />\n`;
  }
}

if (!x.includes('android.speech.RecognitionService')) {
  inject +=
    `    <queries>\n` +
    `        <intent><action android:name="android.speech.RecognitionService" /></intent>\n` +
    `        <intent><action android:name="android.intent.action.TTS_SERVICE" /></intent>\n` +
    `    </queries>\n`;
}

if (inject) {
  // <application ...> etiketinden hemen once ekle
  x = x.replace(/(\n\s*)<application/, `\n${inject}\n    <application`);
  fs.writeFileSync(p, x);
  console.log('AndroidManifest izinleri eklendi:\n' + inject);
} else {
  console.log('AndroidManifest zaten gerekli izinlere sahip.');
}

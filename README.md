# 🔐 FireChat P2P

**Безопасный мессенджер с E2E шифрованием. Работает прямо в браузере — без сервера, без регистрации, без слежки.**

## 🚀 Быстрый старт (GitHub Pages)

### 1. Создай репозиторий
1. Зайди на [github.com](https://github.com)
2. Создай новый публичный репозиторий: `yourusername.github.io`
3. Или любое имя: `yourusername/firechat`

### 2. Загрузи файлы
```bash
# Клонировать репозиторий
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io

# Скопировать файлы
cp /path/to/firechat/* .

# Закоммитить и запушить
git add .
git commit -m "Deploy FireChat P2P"
git push origin main
```

Или через веб-интерфейс:
1. Открой репозиторий на GitHub
2. Нажми **Add file** → **Upload files**
3. Загрузи `index.html`
4. Нажми **Commit changes**

### 3. Включи GitHub Pages
1. В репозитории: **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. Выбери **main** → **/(root)**
4. Нажми **Save**
5. Через 2-5 минут сайт будет доступен по адресу:
   - `https://yourusername.github.io` (если репозиторий `yourusername.github.io`)
   - `https://yourusername.github.io/firechat` (если репозиторий `firechat`)

### 4. Настрой Firebase (опционально, для авто-подключения)
1. Зайди в [Firebase Console](https://console.firebase.google.com/)
2. Создай проект → Realtime Database
3. Правила безопасности (для простоты):
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
4. Скопируй конфигурацию и замени в `index.html`:
```javascript
const firebaseConfig = {
  apiKey: "ТВОЙ_API_KEY",
  authDomain: "ТВОЙ_ПРОЕКТ.firebaseapp.com",
  databaseURL: "https://ТВОЙ_ПРОЕКТ-default-rtdb.firebaseio.com",
  // ...
};
```

> ⚠️ Без Firebase приложение работает через **ручной обмен SDP** — copy-paste offer/answer.

---

## 📱 Как пользоваться

### Первый запуск
1. Открой сайт на телефоне/ноутбуке
2. Введи имя → **🚀 Войти**
3. Разреши уведомления (опционально)

### Создать чат
1. Нажми **+** (справа снизу)
2. Придумай пароль шифрования (его знаете только ты и собеседник)
3. Скопируй код + пароль → отправь собеседнику

### Присоединиться
1. Нажми **🔗 Присоединиться**
2. Введи код друга
3. Введи **тот же пароль**
4. Готово!

### Добавить на рабочий стол (PWA)
- **iPhone (Safari)**: Поделиться → «На экран Домой»
- **Android (Chrome)**: Меню → «Установить приложение»
- **Desktop (Chrome/Edge)**: Адресная строка → 🖥️ «Установить»

---

## 🔒 Безопасность

```
Ты пишешь "Привет"
        ↓
Браузер шифрует AES-256-GCM (пароль: "МойКот")
        ↓
WebRTC шифрует канал (DTLS 1.2)
        ↓
Интернет (два слоя шифрования)
        ↓
Друг расшифровывает DTLS → AES-GCM
        ↓
Друг читает "Привет"
```

- **Без пароля** сообщения — белый шум
- **Ни Firebase, ни TURN не могут прочитать** трафик [^17^]
- **История хранится только на устройствах** (IndexedDB)
- **Нет метаданных** — сервер не знает, кто с кем общается

---

## 🛠️ Технологии

| Компонент | Технология |
|-----------|-----------|
| P2P соединение | WebRTC DataChannel |
| Сигналинг | Firebase RTDB (fallback) |
| Шифрование | AES-256-GCM + PBKDF2 |
| Хранение | IndexedDB |
| PWA | Service Worker + Manifest |
| Хостинг | GitHub Pages (бесплатно) |

---

## ⚠️ Ограничения

- **Файлы до 10MB** — DataChannel ограничение
- **Браузеры**: Chrome, Edge, Firefox, Safari (iOS 14.3+)
- **WebRTC IP leak**: при VPN используйте TURN-only режим
- **Firebase**: может быть заблокирован в некоторых странах — используйте ручной обмен

---

## 📄 Лицензия

MIT — используй, модифицируй, делись.

**Сделано для своих.** 🔐

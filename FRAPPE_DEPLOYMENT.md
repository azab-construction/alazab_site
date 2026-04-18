# دليل النشر على Frappe Bench (Production)

## المعمارية النهائية

```
┌─────────────────────────────────────────────┐
│  Frappe Bench Nginx (80/443)                │
│  ├── /api/*       → Frappe Python (gunicorn)│
│  ├── /app/*       → ERPNext Desk            │
│  └── /portal/*    → alazab_portal app       │
│                     └── React SPA (static)  │
└─────────────────────────────────────────────┘
                    ↓
            Supabase (Backend)
```

## التثبيت لأول مرة

### 1. نسخ تطبيق Frappe إلى bench

```bash
# على سيرفر Frappe
cd /home/frappe/frappe-bench

# نسخ التطبيق من هذا الريبو
cp -r /path/to/this-repo/apps/alazab_portal apps/

# أو من Git مباشرة
bench get-app alazab_portal https://github.com/<org>/alazab_portal.git
```

### 2. تثبيت التطبيق على الموقع

```bash
bench --site <your-site> install-app alazab_portal
```

### 3. بناء React وحقنه في Frappe

من جهازك المحلي (أو CI):

```bash
# في جذر مشروع React
BUILD_TARGET=frappe npm run build

# نسخ المخرجات إلى الـ bench
rsync -av --delete dist/ \
  frappe@server:/home/frappe/frappe-bench/apps/alazab_portal/alazab_portal/public/dist/
```

أو استخدم السكريبت الجاهز إذا كان الكود على نفس السيرفر:

```bash
BUILD_TARGET=frappe ./scripts/deploy-to-frappe.sh /home/frappe/frappe-bench <your-site>
```

### 4. تجميع assets الـ Frappe

```bash
cd /home/frappe/frappe-bench
bench build --app alazab_portal
bench --site <your-site> clear-cache
bench restart
```

### 5. الوصول

- `https://<your-site>/portal` → الصفحة الرئيسية
- `https://<your-site>/portal/projects/123` → React Router يعمل تلقائياً
- `https://<your-site>/app` → ERPNext Desk (كما هو)

## التحديثات اللاحقة

```bash
# في مشروع React
git pull
BUILD_TARGET=frappe npm run build
rsync -av --delete dist/ frappe@server:/home/frappe/frappe-bench/apps/alazab_portal/alazab_portal/public/dist/

# على السيرفر
ssh frappe@server "cd frappe-bench && bench build --app alazab_portal && bench restart"
```

## استكشاف الأخطاء

| المشكلة | الحل |
|---------|------|
| `404 على /portal` | تأكد من `bench --site <site> install-app alazab_portal` و `bench restart` |
| الصفحة بيضاء | تحقق من وجود `dist/index.html` في `apps/alazab_portal/alazab_portal/public/dist/` |
| المسارات الفرعية لا تعمل | `website_route_rules` في `hooks.py` تتولى ذلك تلقائياً |
| Assets لا تُحمّل | تأكد من البناء بـ `BUILD_TARGET=frappe npm run build` |
| تعديلات لا تظهر | `bench build --app alazab_portal && bench restart` ومسح cache المتصفح |

## الفرق عن النشر السابق (Docker)

| العنصر | Docker (السابق) | Frappe Integration (الجديد) |
|---------|----------------|----------------------------|
| الاستضافة | حاوية Nginx مستقلة | داخل Frappe Bench |
| Reverse Proxy | يحتاج إعداد منفصل | تلقائي عبر Frappe nginx |
| التحديث | `docker compose build` | `npm run build` + `rsync` + `bench restart` |
| HTTPS | certbot يدوي | يستخدم شهادة Frappe الموجودة |
| التكامل مع ERPNext | عبر API فقط | نفس النطاق، نفس الجلسة |

## الخيارات المتاحة لك الآن

1. **Frappe-only**: استخدم `apps/alazab_portal` فقط (الموصى به الآن)
2. **Docker-only**: استخدم `Dockerfile` + `docker-compose.yml` (السابق)
3. **هجين**: شغّل Docker على بورت داخلي وأضف upstream في Frappe nginx

كل الملفات السابقة (`Dockerfile`, `docker-compose.yml`, `nginx/`) محفوظة كخيار بديل.

# Al-Azab Portal — Frappe App Wrapper

تطبيق Frappe خفيف يعمل كـ **wrapper** لتطبيق React/Vite SPA الخاص بالعزب،
ويتيح خدمته عبر Frappe Bench كصفحة `www` مع SPA routing كامل.

## المعمارية

```
frappe-bench/
├── apps/
│   ├── frappe/
│   ├── erpnext/            (اختياري)
│   └── alazab_portal/      ← هذا التطبيق
│       └── alazab_portal/
│           ├── public/dist/   ← مخرجات `npm run build` تُنسخ هنا
│           └── www/portal/    ← صفحة Jinja تُحمّل index.html
└── sites/<site>/
```

## التثبيت

```bash
# داخل frappe-bench
cd frappe-bench

# 1) إضافة التطبيق من المسار المحلي أو Git
bench get-app /path/to/alazab_portal
# أو:
bench get-app https://github.com/<org>/alazab_portal.git

# 2) تثبيت على الموقع
bench --site <site-name> install-app alazab_portal

# 3) بناء React ونسخ المخرجات
cd /path/to/react-source
npm ci --legacy-peer-deps
npm run build
cp -r dist/* /path/to/frappe-bench/apps/alazab_portal/alazab_portal/public/dist/

# 4) إعادة بناء assets
bench build --app alazab_portal
bench --site <site-name> clear-cache
bench restart
```

## الوصول

بعد التثبيت، التطبيق متاح على:
- `https://<site>/portal` — الصفحة الرئيسية (تحميل React SPA)
- `https://<site>/portal/<أي-مسار>` — يعمل مع React Router

## التحديث

```bash
cd /path/to/react-source
git pull
npm ci --legacy-peer-deps
npm run build
cp -r dist/* /path/to/frappe-bench/apps/alazab_portal/alazab_portal/public/dist/
bench build --app alazab_portal
bench restart
```

## License

MIT

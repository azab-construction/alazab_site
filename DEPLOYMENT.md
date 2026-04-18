# دليل النشر على Production مع frappe-bench عبر Docker

## نظرة عامة

هذا التطبيق هو **React + Vite SPA** يستخدم **Supabase** كـ Backend.
يتم تعبئته في صورة Docker تعمل خلف **Nginx**، ثم يقوم
**frappe-bench nginx** بعمل reverse-proxy له.

```
[المستخدم] → [Frappe Nginx :80/443] → [Container alazab-web :80] → [SPA]
                                    ↘ [Frappe ERPNext]
```

## المتطلبات

- خادم سحابي (Ubuntu 22.04+ موصى به)
- Docker + Docker Compose v2 مثبتان
- frappe-bench يعمل بالفعل (في Docker أو مباشرة)
- دومين/سب-دومين موجه للسيرفر

## خطوات النشر

### 1. استنساخ المشروع

```bash
git clone <REPO_URL> /opt/alazab-web
cd /opt/alazab-web
```

### 2. ضبط متغيرات البيئة

```bash
cp .env.example .env
nano .env
```
املأ قيم Supabase الحقيقية.

### 3. التحقق من الشبكة المشتركة مع Frappe

```bash
docker network ls | grep frappe
```
عدّل اسم الشبكة في `docker-compose.yml` (`frappe_default`) ليطابق
شبكة frappe لديك. لو frappe لا يعمل بـ Docker، احذف قسم `networks`
واعتمد على `127.0.0.1:8085`.

### 4. بناء وتشغيل الحاوية

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f web
```

### 5. اختبار محلي

```bash
curl http://127.0.0.1:8085/health
# المخرج المتوقع: ok
```

### 6. ربط Frappe Nginx كـ Reverse Proxy

انسخ `nginx/frappe-site.conf.example` إلى تكوين nginx لديك،
عدّل `server_name`، ثم:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

أو لو frappe يعمل بـ Docker:
```bash
docker exec frappe_nginx nginx -t
docker exec frappe_nginx nginx -s reload
```

### 7. تفعيل HTTPS

```bash
sudo certbot --nginx -d app.example.com
```

## التحديث

```bash
cd /opt/alazab-web
git pull
docker compose up -d --build
docker image prune -f
```

## استكشاف الأخطاء

| المشكلة | الحل |
|---------|------|
| `502 Bad Gateway` | تأكد أن الحاوية شغّالة: `docker compose ps` |
| `Network not found` | أنشئ الشبكة: `docker network create frappe_default` أو عدّل الاسم |
| الصفحة بيضاء | افحص `docker compose logs web` ومتغيرات `VITE_*` |
| 404 على إعادة التحميل | تأكد أن `try_files ... /index.html` موجود في `nginx/app.conf` |

## بنية الملفات المضافة

```
.
├── Dockerfile                       # بناء متعدد المراحل (Node → Nginx)
├── .dockerignore
├── docker-compose.yml               # تشغيل الإنتاج
├── .env.example                     # نموذج المتغيرات
├── nginx/
│   ├── app.conf                     # تكوين Nginx داخل الحاوية
│   └── frappe-site.conf.example     # نموذج reverse-proxy لـ frappe
└── DEPLOYMENT.md                    # هذا الملف
```

#!/usr/bin/env bash
# ============================================================
# Build React/Vite app and deploy into a frappe-bench app.
#
# Usage:
#   ./scripts/deploy-to-frappe.sh /path/to/frappe-bench <site-name>
#
# Example:
#   ./scripts/deploy-to-frappe.sh /home/frappe/frappe-bench mysite.local
# ============================================================
set -euo pipefail

BENCH_PATH="${1:-}"
SITE_NAME="${2:-}"

if [[ -z "$BENCH_PATH" || -z "$SITE_NAME" ]]; then
  echo "Usage: $0 <bench-path> <site-name>"
  exit 1
fi

APP_DIST="$BENCH_PATH/apps/alazab_portal/alazab_portal/public/dist"

if [[ ! -d "$BENCH_PATH/apps/alazab_portal" ]]; then
  echo "❌ alazab_portal app not found in $BENCH_PATH/apps/"
  echo "   Install it first:  bench get-app /path/to/alazab_portal"
  exit 1
fi

echo "📦 Building React app..."
npm ci --legacy-peer-deps
npm run build

echo "🚚 Copying dist/ → $APP_DIST"
mkdir -p "$APP_DIST"
rm -rf "$APP_DIST"/*
cp -r dist/* "$APP_DIST/"

echo "🔧 Building Frappe assets..."
cd "$BENCH_PATH"
bench build --app alazab_portal
bench --site "$SITE_NAME" clear-cache
bench restart || true

echo "✅ Deployed. Visit: https://$SITE_NAME/portal"

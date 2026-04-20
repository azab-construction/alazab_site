app_name = "alazab_portal"
app_title = "Al-Azab Portal"
app_publisher = "Al-Azab"
app_description = "React/Vite SPA portal served via Frappe Bench"
app_email = "info@alazab.com"
app_license = "mit"
app_version = "1.0.0"

# ------------------------------------------------------------------
# Static assets
# ------------------------------------------------------------------
# Files placed in alazab_portal/public/ are served at /assets/alazab_portal/...
# The React build output goes to alazab_portal/public/dist/
# so it is reachable at /assets/alazab_portal/dist/...
# (The dist/ folder is created by `npm run build` + copy; not committed.)

# ------------------------------------------------------------------
# Website route rules
# ------------------------------------------------------------------
# Map every sub-path under /portal/* to the same Jinja page so that
# React Router (BrowserRouter) can handle client-side routing.
website_route_rules = [
    {"from_route": "/portal/<path:app_path>", "to_route": "portal"},
]

# ------------------------------------------------------------------
# Allow the /portal page to be viewed by guests (public site)
# ------------------------------------------------------------------
website_context = {
    "favicon": "/assets/alazab_portal/dist/favicon.ico",
    "splash_image": "/assets/alazab_portal/dist/favicon.ico",
}

# Pages accessible without login
website_route_rules_guest = ["/portal", "/portal/*"]

# ------------------------------------------------------------------
# No DocTypes / fixtures — this is a pure static-hosting wrapper.
# ------------------------------------------------------------------

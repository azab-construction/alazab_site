import frappe

no_cache = 1


def get_context(context):
	"""Public SPA loader page — accessible to guests.

	The actual React assets live in /assets/alazab_portal/dist/ and are
	injected client-side by the loader script in portal.html.
	"""
	context.no_cache = 1
	context.show_sidebar = False
	context.title = "Al-Azab Portal"
	# Allow unauthenticated visitors (public marketing + maintenance request form)
	frappe.local.flags.redirect_location = None
	return context

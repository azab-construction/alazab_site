import frappe

no_cache = 1


def get_context(context):
	"""Public SPA page — accessible without login."""
	context.no_cache = 1
	context.show_sidebar = False
	context.title = "Al-Azab Portal"
	# Allow guest access (public marketing site)
	context.allow_guest = True
	return context

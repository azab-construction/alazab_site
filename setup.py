
from setuptools import setup, find_packages

with open("requirements.txt") as f:
    install_requires = f.read().strip().split("\n")

# get version from __version__ variable in alazab_site/__init__.py
from alazab_site import __version__ as version

setup(
    name="alazab_site",
    version=version,
    description="Al-Azab Construction Template Refinement for Frappe",
    author="Al-Azab Construction Company",
    author_email="info@al-azab.co",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=install_requires
)

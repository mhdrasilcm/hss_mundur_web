#!/usr/bin/env python3
"""Regenerate the responsive WebP variants used by components/Photo.js.

Usage (from the repo root):  python3 scripts/optimize-images.py
Requires Pillow:             pip install pillow

Reads the full-size originals in public/images/<name>.jpg and writes
public/images/<name>-<width>.webp. EXIF orientation is applied, so
portrait photos taken sideways come out the right way up.
"""
import os
from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(HERE, '..', 'public', 'images')

# name -> output widths (keep in sync with IMAGES in components/Photo.js)
SPEC = {
    'c1': [480, 960, 1600],
    'c2': [480, 960, 1600],
    'lb1': [480, 960, 1600],
    'lb2': [480, 960],
}

for name, widths in SPEC.items():
    src = Image.open(os.path.join(IMG_DIR, f'{name}.jpg'))
    img = ImageOps.exif_transpose(src).convert('RGB')
    for w in widths:
        h = round(img.height * w / img.width)
        out = os.path.join(IMG_DIR, f'{name}-{w}.webp')
        img.resize((w, h), Image.LANCZOS).save(out, 'WEBP', quality=72, method=6)
        print(f'{name}-{w}.webp  {w}x{h}  {os.path.getsize(out) // 1024} KB')

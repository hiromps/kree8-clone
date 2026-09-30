"""Regenerate the 花とちょうちょ (hanatotyoutyo) web font subsets in public/fonts/.

Usage:
    python scripts/subset-hana-font.py <path/to/hanatotyoutyo.ttf>

Requires fontTools (`pip install fonttools brotli`). The source TTF is not committed
(5 MB); pass its path explicitly.

Two chunks share one @font-face family (see app/globals.css):
  hana-a.woff2  ASCII, kana, punctuation and every kanji that appears in the site copy
                (app/**, components/**, lib/site.ts). Small; this is the only file
                the current pages download.
  hana-b.woff2  The rest of JIS X 0208 level-1 kanji. Only fetched if copy gains a
                kanji that chunk A does not cover, so new text never falls back to
                the sans face mid-sentence.

Run this again whenever the copy changes so chunk A stays complete.
"""

from __future__ import annotations

import glob
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "fonts")

# Everything except kanji: ASCII, Latin-1 punctuation, general punctuation (……, ──),
# arrows, box drawing, CJK punctuation, hiragana, katakana, full-width forms.
BASE_RANGES = (
    "U+0020-007E,U+00A0-00FF,U+2000-206F,U+2190-21FF,U+2500-257F,"
    "U+3000-303F,U+3040-309F,U+30A0-30FF,U+FF01-FF60,U+FFE0-FFE6"
)


def used_kanji() -> set[str]:
    files = (
        glob.glob(os.path.join(ROOT, "app", "**", "*.tsx"), recursive=True)
        + glob.glob(os.path.join(ROOT, "components", "**", "*.tsx"), recursive=True)
        + [os.path.join(ROOT, "lib", "site.ts")]
    )
    chars: set[str] = set()
    for path in files:
        with open(path, encoding="utf-8") as fh:
            chars.update(c for c in fh.read() if "一" <= c <= "鿿")
    return chars


def jis_level1_kanji() -> set[str]:
    # JIS X 0208 rows 16-47 are level-1 kanji; walk the Shift_JIS lead bytes for them.
    chars: set[str] = set()
    for hi in range(0x88, 0x98 + 1):
        for lo in list(range(0x40, 0x7F)) + list(range(0x80, 0xFD)):
            try:
                ch = bytes([hi, lo]).decode("shift_jis")
            except UnicodeDecodeError:
                continue
            if "一" <= ch <= "鿿":
                chars.add(ch)
    return chars


def subset(src: str, out: str, unicodes: str | None, text: str | None) -> None:
    args = [
        sys.executable,
        "-m",
        "fontTools.subset",
        src,
        "--flavor=woff2",
        "--layout-features=*",
        "--no-hinting",
        "--desubroutinize",
        f"--output-file={out}",
    ]
    if unicodes:
        args.append(f"--unicodes={unicodes}")
    if text is not None:
        args.append(f"--text={text}")
    subprocess.run(args, check=True)
    print(f"{os.path.relpath(out, ROOT)}  {os.path.getsize(out) // 1024} KB")


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    src = sys.argv[1]
    os.makedirs(OUT_DIR, exist_ok=True)

    used = used_kanji()
    rest = jis_level1_kanji() - used
    print(f"kanji in copy: {len(used)}, remaining level-1: {len(rest)}")

    subset(src, os.path.join(OUT_DIR, "hana-a.woff2"), BASE_RANGES, "".join(sorted(used)))
    subset(src, os.path.join(OUT_DIR, "hana-b.woff2"), None, "".join(sorted(rest)))

    # Print the unicode-range for chunk A's kanji so globals.css can be kept in sync.
    cps = sorted(ord(c) for c in used)
    print("chunk A kanji unicode-range:")
    print(",".join(f"U+{cp:04X}" for cp in cps))


if __name__ == "__main__":
    main()

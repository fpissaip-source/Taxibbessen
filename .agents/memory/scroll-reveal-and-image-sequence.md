---
name: Scroll reveal & image-sequence hero pitfalls
description: Reliable patterns for framer-motion scroll reveals and scroll-scrubbed image-sequence backgrounds, especially on mobile
---

# Scroll-triggered word reveal (framer-motion)

**Rule:** For multi-word/line reveals, drive the animation from ONE parent observer using `variants` + `staggerChildren`, not a separate `whileInView` on each word.

**Why:** Per-element `whileInView` (each word its own IntersectionObserver) is flaky on mobile during fast scroll — some observers don't fire, leaving words stuck at `opacity:0`/`y:110%` permanently. This bit the Taxi B&B CTA heading ("Fragen Sie jetzt Ihre nächste Fahrt AN!") repeatedly: only partial text ("IHRE NÄCHSTE") showed.

**How to apply:** Parent `motion.h2` with `initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.25 }}` and `variants={{ visible:{ transition:{ staggerChildren } } }}`. Children are `motion.span` with `hidden`/`visible` variants. Also: never nest `<div>` inside `<h2>` (invalid) — use `<span>` with flex.

# Scroll-scrubbed image-sequence hero background

**Rule:** When swapping frames by scroll progress, if the target frame isn't loaded yet, show the NEAREST already-loaded frame instead of skipping. And keep total asset payload small.

**Why:** The hero uses 77 JPEG frames (~12 MB). On mobile they load slowly; the scrubber only set `img.src` when `frame.complete` was true, so it jumped straight from frame 1 to the end frame ("only start and end frame, nothing between"). Separately, large competing assets made it worse: switching 3 service icons from JPEG (~205 KB total) to transparent PNG (~1.2 MB total) starved the frames of bandwidth. Compressing the PNGs with `pngquant` (nix-shell -p pngquant, --quality=55-80) brought them back to ~184 KB total with no visible quality loss.

**How to apply:** Add a `nearestReady(idx)` fallback in the rAF loop. Keep decorative PNGs compressed. The animation code itself was correct — verify with `git diff <checkpoint> HEAD` before "restoring" logic that didn't actually change.

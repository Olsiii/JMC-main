// Renders the downloadable Instagram card for an article: 1080×1350 (Instagram's 4:5 portrait).
//
//   ┌────────────────────────┐
//   │ logo                   │  article photo, with the site's image treatment
//   │                        │
//   ├────────────────────────┤
//   │ | CATEGORY             │  paper background
//   │ Serif title, up to     │
//   │ four lines             │
//   │ ──                     │
//   │ Excerpt…               │
//   │────────────────────────│
//   │ DATE · READ TIME   URL │
//   └────────────────────────┘

const W = 1080;
const H = 1350;
const PAD = 80;
const PHOTO_H = 500;
const CONTENT_W = W - PAD * 2;
const LOGO_RATIO = 945.93 / 104; // JMC_Legal_Logo.svg viewBox

const SERIF = '"EB Garamond", Georgia, serif';
const SANS = '"IBM Plex Sans", Arial, sans-serif';

// Brand colour token from index.css, e.g. token('ink', 0.5) -> 'rgba(20, 23, 27, 0.5)'.
const token = (name, alpha = 1) => {
  const [r, g, b] = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim()
    .split(/\s+/)
    .map(Number);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

// Letter-spaced text, drawn character by character so it works in every browser.
function drawTracked(ctx, text, x, y, tracking, align = 'left') {
  const chars = [...text];
  const width = chars.reduce((sum, c) => sum + ctx.measureText(c).width, 0) + tracking * (chars.length - 1);
  let cx = align === 'right' ? x - width : x;
  chars.forEach((c) => {
    ctx.fillText(c, cx, y);
    cx += ctx.measureText(c).width + tracking;
  });
}

function wrapLines(ctx, text, maxWidth) {
  const lines = [];
  let line = '';
  text.split(/\s+/).forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

// Keeps at most maxLines, ending the last one with an ellipsis if text was cut.
function clampLines(ctx, lines, maxLines, maxWidth) {
  if (maxLines <= 0) return [];
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  let last = kept[maxLines - 1];
  while (last.includes(' ') && ctx.measureText(`${last}…`).width > maxWidth) {
    last = last.replace(/\s+\S+$/, '');
  }
  kept[maxLines - 1] = `${last.replace(/[\s,.;:—–-]+$/, '')}…`;
  return kept;
}

function drawPhoto(ctx, img) {
  // Cover-crop into the top band.
  const scale = Math.max(W / img.width, PHOTO_H / img.height);
  const sw = W / scale;
  const sh = PHOTO_H / scale;
  ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, W, PHOTO_H);

  // Same treatment as .img-treat: greyscale, slight warm tone, reduced brightness.
  const frame = ctx.getImageData(0, 0, W, PHOTO_H);
  const px = frame.data;
  for (let i = 0; i < px.length; i += 4) {
    const v = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) * 0.86;
    px[i] = Math.min(255, v * 1.06 + 4);
    px[i + 1] = Math.min(255, v * 1.01 + 2);
    px[i + 2] = v * 0.92;
  }
  ctx.putImageData(frame, 0, 0);

  // Darken the top so the logo reads.
  const shade = ctx.createLinearGradient(0, 0, 0, PHOTO_H);
  shade.addColorStop(0, token('ink', 0.6));
  shade.addColorStop(0.45, token('ink', 0.1));
  shade.addColorStop(1, token('ink', 0.2));
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, W, PHOTO_H);
}

function drawLogo(ctx, logo) {
  const height = 30;
  if (logo) {
    try {
      ctx.drawImage(logo, PAD, PAD - 8, height * LOGO_RATIO, height);
      return;
    } catch {
      // Some browsers cannot draw an SVG without intrinsic size; fall back to text.
    }
  }
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `600 30px ${SANS}`;
  ctx.fillText('JMC LEGAL', PAD, PAD + 20);
}

export async function renderInstagramCard({ title, excerpt, category, meta, image }) {
  await Promise.all(
    [`400 72px ${SERIF}`, `500 24px ${SANS}`, `400 28px ${SANS}`].map((font) => document.fonts.load(font))
  ).catch(() => {});
  const [photo, logo] = await Promise.all([
    image ? loadImage(image) : null,
    loadImage('/images/JMC_Legal_Logo.svg'),
  ]);

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = token('paper');
  ctx.fillRect(0, 0, W, H);

  if (photo) {
    drawPhoto(ctx, photo);
  } else {
    ctx.fillStyle = token('ink');
    ctx.fillRect(0, 0, W, PHOTO_H);
  }
  drawLogo(ctx, logo);

  // Category, preceded by the burgundy "|" marker.
  let y = PHOTO_H + 92;
  ctx.fillStyle = token('accent');
  ctx.fillRect(PAD, y - 21, 3, 26);
  ctx.font = `500 24px ${SANS}`;
  drawTracked(ctx, category.toUpperCase(), PAD + 22, y, 4.5);

  // Title: the largest size (76 → 54px) that fits in four lines.
  let size = 76;
  let lines;
  for (; size >= 54; size -= 2) {
    ctx.font = `400 ${size}px ${SERIF}`;
    lines = wrapLines(ctx, title, CONTENT_W);
    if (lines.length <= 4) break;
  }
  lines = clampLines(ctx, lines, 4, CONTENT_W);
  const titleLead = Math.round(size * 1.12);
  ctx.fillStyle = token('ink');
  y += 34;
  lines.forEach((line, i) => ctx.fillText(line, PAD, y + size + i * titleLead));
  y += size + (lines.length - 1) * titleLead;

  // Short rule.
  y += 46;
  ctx.fillStyle = token('ink');
  ctx.fillRect(PAD, y, 64, 2);

  // Footer.
  const footerRule = H - PAD - 58;
  ctx.fillStyle = token('line-strong');
  ctx.fillRect(PAD, footerRule, CONTENT_W, 1);
  ctx.font = `500 22px ${SANS}`;
  ctx.fillStyle = token('subtle');
  drawTracked(ctx, meta.toUpperCase(), PAD, H - PAD, 3.5);
  ctx.fillStyle = token('ink');
  drawTracked(ctx, 'JMCLEGAL.ORG', W - PAD, H - PAD, 3.5, 'right');

  // Excerpt fills the space left between the rule and the footer.
  const excerptLead = 44;
  const firstBaseline = y + 62;
  const maxLines = Math.max(0, Math.floor((footerRule - 40 - firstBaseline) / excerptLead) + 1);
  ctx.font = `400 28px ${SANS}`;
  ctx.fillStyle = token('muted');
  clampLines(ctx, wrapLines(ctx, excerpt, CONTENT_W), maxLines, CONTENT_W).forEach((line, i) =>
    ctx.fillText(line, PAD, firstBaseline + i * excerptLead)
  );

  return canvas;
}

// jobs verifier

const emojis = ['🌱', '🌿', '🍀', '🌳', '🌲', '🌴', '🌵', '🌾', '🌺', '🌻', '🌼', '🌷', '🌸', '🍁', '🍂', '🍃'];

function getApplicationCode() {
  const dateStr = new Date().toISOString();
  let encoded = '';
  for (let i = 0; i < dateStr.length; i++) {
    const code = dateStr.charCodeAt(i);
    encoded += emojis[Math.floor(code / emojis.length)] + emojis[code % emojis.length];
  }
  return encoded;
}

function readApplicationCode(encoded) {
  const chars = Array.from(encoded);
  let decoded = '';
  for (let i = 0; i < chars.length; i += 2) {
    const code = emojis.indexOf(chars[i]) * emojis.length + emojis.indexOf(chars[i + 1]);
    decoded += String.fromCharCode(code);
  }
  return decoded;
}

window.readApplicationCode = readApplicationCode;
console.log('application code', getApplicationCode());

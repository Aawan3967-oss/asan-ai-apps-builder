// سادہ domain/name generator (mock). In production use WHOIS/Cloudflare API.
function generateNames(keywords = [], count = 8) {
  const suffixes = ['hub', 'site', 'io', 'app', 'space', 'cloud'];
  const names = [];
  for (let i = 0; i < count; i++) {
    const k = keywords[i % keywords.length] || 'gen';
    const s = suffixes[i % suffixes.length];
    names.push(`${k}${s}${Math.floor(Math.random() * 999)}`);
  }
  return names;
}

module.exports = { generateNames };

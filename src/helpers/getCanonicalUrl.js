const linksRegex = /<link.*href\s*=\s*(["']).*(["']).*>/gi;
const hrefRegex = /href\s*=\s*(["'])(.*?)\1/i;

function findLinks(html) {
  return (html.match(linksRegex) || []).map(x => x.toString());
}

function getHref(html) {
  const matches = html.match(hrefRegex);
  return matches && matches.length >= 3 ? matches[2] : null;
}

function getCanonicalUrl(html) {
  if (html instanceof Buffer) {
    html = html.toString('utf8');
  }

  const links = findLinks(html);
  const canonical = links.find(link => link.includes('canonical'));
  return canonical ? getHref(canonical) : null;
}

module.exports = getCanonicalUrl;

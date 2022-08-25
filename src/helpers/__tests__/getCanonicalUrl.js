const getCanonicalUrl = require('../getCanonicalUrl');

describe('#getCanonicalUrl', () => {
  test('should be a function', () => {
    expect(getCanonicalUrl).toBeInstanceOf(Function);
  });

  test('should return null if call with incorrect signature', () => {
    expect(getCanonicalUrl()).toBe(null);
    expect(getCanonicalUrl(1)).toBe(null);
    expect(getCanonicalUrl([])).toBe(null);
    expect(getCanonicalUrl({})).toBe(null);
    expect(getCanonicalUrl(NaN)).toBe(null);
    expect(getCanonicalUrl(new Date())).toBe(null);
  });

  test('should return null if no canonical link-tag is found', () => {
    expect(getCanonicalUrl('')).toBe(null);
    expect(getCanonicalUrl('<h1>Hello</h1>')).toBe(null);
    expect(getCanonicalUrl('<link rel="stylesheet" href="/style.css">')).toBe(
      null
    );
    expect(
      getCanonicalUrl(
        `
      <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/my-font.woff2">
      <link rel="alternate" href="https://www.example.com/en" hreflang="x-default">
      <link rel="alternate" href="https://www.example.com/de" hreflang="de-DE" />
      <link rel="alternate" href="https://www.example.com/en" hreflang="en" />
      <link rel="alternate" href="https://www.example.com/fr" hreflang="fr-FR" />
      <link rel="alternate" href="https://www.example.com/sv" hreflang="sv-SE" />
      <link rel="alternate" href="https://www.example.com/ja" hreflang="ja-JP" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="manifest" href="/manifest.json">
      `
      )
    ).toBe(null);
  });

  test('should return the canonical href when a tag is found', () => {
    expect(
      getCanonicalUrl('<link rel="canonical" href="https://www.foo.com/">')
    ).toBe('https://www.foo.com/');
    expect(
      getCanonicalUrl('<link href="https://www.bar.com/" rel="canonical">')
    ).toBe('https://www.bar.com/');
    expect(
      getCanonicalUrl('<link href="https://www.baz.com/" rel="canonical" />')
    ).toBe('https://www.baz.com/');
    expect(
      getCanonicalUrl(`
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <link rel="canonical" href="https://www.qux.com/">
        </head>
        <body>
          <h1>Hello</h1>
        </body>
      </html>
    `)
    ).toBe('https://www.qux.com/');
  });
});

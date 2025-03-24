class Config {
  constructor(name, idRegex, bgColor, fgColor) {
    this.name = name;
    this.idRegex = idRegex;
    this.bgColor = bgColor;
    this.fgColor = fgColor;
  }

  matches(url) {
    return url.match(this.idRegex);
  }

  docId(url) {
    return this.matches(url)[1];
  }
}

let configs = [
  new Config(
    "Google Docs",
    /docs.google.com\/document\/d\/([_A-Za-z0-9-]+)/,
    [15, 105, 255, 255],
    [255, 255, 255, 255],
  ),
  new Config(
    "Google Drawings",
    /docs.google.com\/drawings\/d\/([_A-Za-z0-9-]+)/,
    [222, 83, 71, 255],
    [255, 255, 255, 255],
  ),
  new Config(
    "Google Forms",
    /docs.google.com\/forms\/d\/([_A-Za-z0-9-]+)/,
    [114, 73, 188, 255],
    [255, 255, 255, 255],
  ),
  new Config(
    "Google Slides",
    /docs.google.com\/presentation\/d\/([_A-Za-z0-9-]+)/,
    [245, 186, 19, 255],
    [74, 74, 74, 255],
  ),
  new Config(
    "Google Sheets",
    /docs.google.com\/spreadsheets\/d\/([_A-Za-z0-9-]+)/,
    [29, 135, 83, 255],
    [255, 255, 255, 255],
  ),
  new Config(
    "Google Drive File",
    /drive.google.com\/file\/d\/([_A-Za-z0-9-]+)/,
    [180, 0, 224, 255],
    [255, 255, 255, 255],
  ),
  new Config(
    "Google Drive Folder",
    /drive.google.com\/drive\/folders\/([_A-Za-z0-9-]+)/,
    [180, 0, 224, 255],
    [255, 255, 255, 255],
  ),
];

// Find a config that matches the current URL
let config = configs.find((config) => config.matches(document.URL));

// If there is a config for the current URL, update the favicon based on that config
if (config) {
  let docId = config.docId(document.URL);
  let docHash = sha1(docId);

  let iconBase64 = new Identicon(docHash, {
    background: config.bgColor,
    foreground: config.fgColor,
  }).toString();
  document.querySelector('link[rel*="icon"]').href =
    "data:image/png;base64," + iconBase64;
}

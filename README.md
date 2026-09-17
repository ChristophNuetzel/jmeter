# Apache-JMeter-Website

Statische, responsive Website mit klarer Trennung von Darstellung und Inhalt.

## Struktur
- `index.html`: semantisches Grundgerüst
- `css/style.css`: vollständiges responsives Design
- `js/app.js`: JSON-Renderer und Tab-Navigation
- `data/content.json`: sämtliche Texte und Inhaltsstruktur
- `images/`: Ablageort für optionale Logo-Dateien

## Lokal starten
Da Browser lokale JSON-Dateien bei direktem Öffnen häufig blockieren, die Seite über einen kleinen Webserver starten:

```bash
python3 -m http.server 8000
```

Danach `http://localhost:8000` öffnen.

## Inhalte ändern
Nur `data/content.json` bearbeiten. Darstellung und Logik bleiben unverändert.

## Logos
Aus rechtlichen und technischen Gründen sind keine offiziellen Logo-Dateien eingebettet. Die Kopfzeile enthält barrierearme Textmarken. Eigene freigegebene SVG- oder PNG-Dateien können im Ordner `images/` abgelegt und in `index.html` eingebunden werden.

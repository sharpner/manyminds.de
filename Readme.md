# manyminds.de

Persönlicher Beratungsauftritt von Nino Wagensonner. Statisches HTML/CSS/JavaScript mit zwei echten Vercel-API-Endpunkten für Terminanfragen. Kein Frontend-Framework und kein Buildschritt nötig.

## Lokal starten und prüfen

```sh
npm ci
npm run dev
npm run check
npm test
npm run test:browser
```

Vorschau: **http://localhost:5173**. Der lokale Express-Server verwendet dieselben Handler wie Vercel. Er liefert ausschließlich öffentliche Website-Dateien aus, keine Originalfotos oder Arbeitsdateien. Port 3000 bleibt für andere Projekte frei. Für Browserprüfungen wird eine lokale Google-Chrome-Installation verwendet; Playwright startet ein isoliertes Testprofil.

Für einen echten Mailversand muss `RESEND_API_KEY` in `.env.local` beziehungsweise der Vercel-Umgebung gesetzt sein. Keine Zugangsdaten einchecken. Tests ersetzen ausschließlich den externen Maildienst; die Browserprüfungen verwenden die echten lokalen Slot-Endpunkte und versenden keine Mail.

`npm test` umfasst außerdem einen nativen Node-Lauf der kompilierten API-Handler (`test:runtime`). Die TypeScript-Konfiguration nutzt `NodeNext` für Modulformat und Auflösung, passend zum Vercel-Node-Builder. Der Test prüft den Start ohne tsx, echte HTTP-Slot-Antworten und die Ablehnung ungültiger Buchungsanfragen. Er ersetzt keinen Smoke-Test des veröffentlichten Vercel-Deployments.

## Inhalt und Quellen

Die neue Positionierung stammt aus den ausdrücklichen Nutzerangaben vom 04.11.2026: technischer Generalist, breite praktische Erfahrung, gründliche und pragmatische Arbeitsweise; KI erweitert diese Expertise. Neue, knappe Texte sind ausdrücklich beauftragt. Die frühere Pflicht zur wortgleichen Übernahme der alten Marketingtexte ist damit ersetzt.

- Portfolio: https://manyminds.github.io/Portfolio.pdf — externer Link, kein eingebetteter Lebenslauf.
- Eigene GmbH: https://isar-innovations.dev/; eigene Forschung: https://isar-innovations.dev/research.
- „Fast 20 Jahre Berufserfahrung“ ist die ausdrücklich gewählte Formulierung nach Abgleich des Lebenslaufs: beruflicher Beginn 2009 einschließlich Ausbildung. Keine Behauptung von über 20 Berufsjahren.
- Kundenprojekte bei freenet, DIE ZEIT, Brainloop und aidhere sind mit dem jeweiligen Aufgabenbezug dargestellt. Keine erfundenen Testimonials oder Ergebniskennzahlen.
- Originale Kundenlogos liegen in `assets/clients/`. Herkunft und Prüfungen stehen in `agent-files/design-judge/logo-sources.txt`: DIE ZEIT und Brainloop von offiziellen Websites; freenet und aidhere aus dem bereitgestellten Portfolio. Keine CSS-Nachbildungen und keine Umfärbung.
- Das Studioporträt wurde mit ImageGen aus Nutzerfotos erzeugt und ausdrücklich akzeptiert. Originale bleiben in `ressources/` und werden nicht deployt.
- Unzutreffend zugeschriebene McKinsey-/Gartner-Aussagen sowie das unbelegte Ausfallfreiheitsversprechen wurden aus Deutsch, Englisch, Metadaten und LLM-Kurzfassungen entfernt.
- Die Website ist die aktuelle Inhaltsquelle; `agent-files/design-judge/copy-v1.txt` dokumentiert den vorausgegangenen redaktionellen Entwurf.
- Die hervorgehobene Referenz ist auf Nutzerwunsch jetzt projectfit.ai. Bei DIE ZEIT steht ausdrücklich „Mitentwicklung“.
- V2 vertieft projectfit.ai, die Performance-Anforderung der ZEIT Shop App auf günstigen Android-Geräten und Brainloops Anforderungen an sensible Daten. Grundlage sind die jeweiligen Projektseiten im Portfolio; Anforderungen werden nicht als gemessene Ergebnisse ausgegeben.
- Die vertieften Beispiele sind nach App-Entwicklung, Backend-Entwicklung, technischer Beratung und KI-Entwicklung geordnet. Der KI-Leistungsumfang einschließlich Training, Embeddings und produktreifer Anwendungen stammt aus den ergänzenden Nutzerangaben; die konkreten projectfit-Beiträge bleiben gesondert durch das Portfolio belegt.
- Die Produktansicht ist der vom Nutzer am 04.11.2026 bereitgestellte Screenshot, unverändert in `assets/projectfit/dashboard.png` (2498 × 2356 Pixel). Die Seite zeigt einen oberen Ausschnitt; der Vergrößerungslink öffnet das vollständige Original. Er ersetzt die deutlich kleinere Marketinggrafik der Produktwebsite. Keine generierte oder nachgezeichnete Oberfläche.
- Die Arbeitsweise verbindet die Nutzerangaben zu User Journey, Performance, Sicherheit und Pragmatismus mit Zusammenarbeit, früher nutzbarer Software und Rückmeldungen aus dem [Agilen Manifest](https://agilemanifesto.org/iso/de/manifesto) und seinen [Prinzipien](https://agilemanifesto.org/iso/de/principles.html). Eigene Formulierung, keine behauptete Zertifizierung oder kopiertes Manifest.
- Das Impressum liegt auf einer eigenen Seite `impressum.html`, direkt im Footer verlinkt und ohne JavaScript lesbar. Betreiber ist Nino Wagensonner persönlich. Der Nutzer wünscht ausdrücklich nur „85716 Unterschleißheim“ als Ortsangabe; Straße und Hausnummer fehlen weiterhin. Die Seite ist deshalb nicht als vollständiges geschäftliches Impressum abgenommen. Die Umsatzsteuer-ID stammt aus dem bisherigen persönlichen Impressum.

## Gestaltung

Die lokale Fassung nutzt eine eigene, reduzierte Gestaltung. Die politische Referenz ist keine fortgeführte Designvorlage. `schuhbaum.dev` diente als Vergleich für persönliche Absenderklarheit und problembezogene Leistungen; keine Texte, Kundenempfehlungen oder Markenassets wurden übernommen.

`styles.css` ist die Quelle aller Designwerte:

| Rolle | Wert |
| --- | --- |
| Primärfarbe | Kobalt `#2944D8` |
| Hover | `#1D31AA` |
| Text | `#162336` |
| Sekundärtext | `#566171` |
| Heller Hintergrund | `#F7F8FA` |
| Kontaktfläche | `#EEF1FA` |
| Linien | `#D9DFE7` |
| Dunkler Abschnitt | `#142033` |
| Schrift | Inter 400 / 500 / 700, lokal mit OFL-Lizenz |

- Einheitliche Wortmarke „nino wagensonner.“ in Kopf und Fuß. Keine wechselnde Hauptmarke.
- Mittlere Schriftgewichte und großzügige Abstände; keine Work-Sans-Black-Schlagzeilen oder schrägen Akzentbalken.
- Kreisförmiges Porträt nach Nutzerwunsch, vier konkrete Projektreferenzen und projectfit.ai als eigenes Produktbeispiel, vier Leistungsfelder, Arbeitsweise, GmbH/Forschung und Kontakt.
- Maximal 1280px Inhaltsbreite, flexible Abstände, mobile Neuordnung.
- Mobil stehen das kompakte Kreisporträt und die Berufserfahrung nebeneinander. Kundenreferenzen bilden einzelne Logo-/Textzeilen. Die Produktansicht bleibt auf Touchgeräten gerade; ein leichter 3D-Hover-/Fokuseffekt ist auf größere Geräte mit Maus und ohne reduzierte Bewegung beschränkt.
- Native Tastaturbedienung, Skip-Link, Fokusführung, Formularzustände und echtes Kalender-API bleiben erhalten.
- Ohne JavaScript sind Text, Navigation, Portfolio und E-Mail nutzbar. EN per `?lang=en` oder Sprachschalter.
- Browserprüfungen bei 320/390/768/1440/1920px, 200% Textgröße und reduzierter Bewegung. Axe ergänzt die Sichtprüfung, zertifiziert keine vollständige WCAG-Konformität.
- Die ausgelieferten Inter-Latin-Subsets behalten sämtliche im aktuellen deutschen und englischen Inhalt verwendeten Zeichen der Originalfonts, einschließlich Umlauten und ß. Originalfonts und OFL-Lizenz bleiben erhalten. Glyphenkonturen und Zeichenbreiten wurden beim Sol-Review auf Gleichheit geprüft. Die drei Fontdateien benötigen zusammen rund 97 statt 227 KB.
- Ein lokaler simulierter mobiler Lighthouse-Vergleich ergab nach der Schriftoptimierung 87 → 92 für Performance und 3,8 → 3,2 Sekunden LCP. Dies sind einzelne Labormessungen, keine Produktions-Felddaten oder garantierten Ladezeiten.

## Review-Verfahren

Sol bewertet Marke, Text, Typografie, Logoanwendung und Mobile getrennt von technischen Tests. Das Verfahren steht in `agent-files/design-judge/protocol.txt`; für einen Blindvergleich darf ausschließlich das bereinigte `judge-brief.txt` verwendet werden. Das interne Briefing enthält bekannte Ablehnung und Kandidatenmerkmale und ist dafür ungeeignet.

Es gibt noch keinen mit unabhängigen menschlichen Vergleichsurteilen kalibrierten Judge. Ein redaktioneller oder visueller Sol-Review ist kein validierter Geschmackstest, kein Conversion-Nachweis und kein monetäres Wertgutachten. Technisch grüne Tests beenden offene Markenkritik nicht.

Forschungsgrundlage: [MT-Bench](https://arxiv.org/abs/2306.05685), [Positionsbias](https://arxiv.org/abs/2406.07791), [VAB](https://arxiv.org/abs/2605.12684), [WiserUI](https://aclanthology.org/2026.acl-long.2049/). Accessibility: [W3C-Kontrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [Bedienflächen](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

## Terminanfragen und API

- `GET /api/slots`: serverseitige Wunschtermine aus `api/slots.ts`, ab der nächsten Kalenderwoche nach Berliner Datum. Vier Kalendermonate ab deren Beginn, maximal fünf Zeitfenster pro Monat. Dienstag 10 Uhr, Mittwoch 14 Uhr, Freitag 9/15 Uhr. Derselbe Terminbestand validiert Buchungsanfragen.
- `POST /api/book`: validiert den Wunsch gegen dieselbe Quelle, validiert Eingaben und sendet über Resend eine Anfrage mit vorläufigem ICS-Termin.
- Es gibt keinen verbundenen Belegungskalender und keine verbindliche Reservierung. Die Oberfläche nennt deshalb „Wunschtermin“ und zeigt `Europe/Berlin` an.
- API-/Netzwerkfehler führen zu einer Fehlermeldung mit erneutem Versuch; keine erfundenen Ersatztermine. Erst bestätigte Annahme durch Resend liefert `success: true`. Das ist kein Nachweis der tatsächlichen Zustellung.
- Es gibt keine clientseitige dauerhafte Sperrung angeblich gebuchter Termine. In derselben Sitzung abgesendete Anfragen werden als „Angefragt“ markiert.
- `api/http.d.ts` beschreibt nur die von Vercel bereitgestellten Node-Request/Response-Methoden. Das umfangreiche Vercel-Buildwerkzeug wird dafür nicht als Projektabhängigkeit installiert.

## Veröffentlichung und offene Betriebsprüfung

Ein Push auf `main` kann das bestehende Vercel-Deployment auslösen. **Nicht ohne ausdrücklichen Auftrag pushen.** Der Nutzer hat den Push des aktuellen Stands am 04.11.2026 ausdrücklich beauftragt. Originalfotos und Arbeitsdateien bleiben lokal.

Vor einer Produktionsfreigabe prüfen:

1. Reale Mailzustellung und verifizierten Absender im bestehenden Resend-Konto. Im Code bleibt die bisherige Absenderdomain erhalten; kein stiller Wechsel auf eine unbestätigte Domain.
2. Deploymentweiten Missbrauchsschutz für `POST /api/book`, etwa eine aktive Vercel-WAF-Regel für Wiederholungs-/Burst-Limits. Im Repository lässt sich keine aktive Regel nachweisen. CORS und Eingabevalidierung ersetzen keinen solchen Schutz; ein lokales In-Memory-Limit wäre in Serverless ebenfalls kein belastbarer Ersatz. [Vercel Rate Limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting)
3. Die übernommenen Rechtsangaben vor Veröffentlichung prüfen und vervollständigen. Das bestehende Impressum ist keine rechtlich geprüfte Neufassung. Die früheren Statistik- und Ausfallfreiheitsbehauptungen sind entfernt; die Erfahrungsangabe wurde auf Basis der neuen Nutzerangaben präzisiert.

`.vercelignore` schließt Originalfotos, Arbeitsdateien, Tests, lokale Startskripte und Umgebungsdateien vom Deployment aus.

# Hornbill Freight Desk landing page: design notes

## Logo colours (measured, not guessed)

Source: `Logo/Hornbill logo a transparent PNG at 1000px.png` (actually 1254 × 1254 px, RGBA, mark only, no wordmark).
Method: decoded the PNG, kept only opaque pixels (alpha ≥ 240, which drops the transparent background and the anti-aliased halo), grouped them by hue and lightness, and took the median of each group.

| Logo colour | Hex | Share of opaque pixels |
|---|---|---|
| Charcoal (main body) | `#26272C` | 22% |
| Slate (lit side of body) | `#43454E` | 19% |
| Black (eye, shading) | `#050506` | 16% |
| Yellow (beak) | `#FDE202` | 13% |
| Orange (casque) | `#FD7B01` | 12% |
| Red-orange (casque tip, outer edge) | `#FD4F01` | 8% |
| Amber (gradient middle) | `#FDB301` | 5% |
| White (crescent, eye highlight) | `#F1F2F4` | 4% |
| Red (eye ring) | `#F91116` | <1% |

## Colour tokens

The only hues are the logo's colours. Everything else is neutral.

| Token | Hex | Source | Role |
|---|---|---|---|
| `--ink` | `#26272C` | logo charcoal | body text, dark bands, footer |
| `--black` | `#050506` | logo black (darkest) | text on accent buttons |
| `--slate` | `#43454E` | logo slate | the one muted grey: secondary text, form-control borders, rules on dark bands |
| `--accent` | `#FD4F01` | logo red-orange (most vivid) | Book demo buttons, stamp borders, highlights. Rare on purpose. |
| `--accent-deep` | `#BE3B01` | `--accent` darkened, same hue | accent-coloured *text* on paper or white (stamps, negative profit) |
| `--yellow` | `#FDE202` | logo yellow | timeline track, "pending" chip, rear number plate |
| `--amber` | `#FDB301` | logo amber | progress bar fill |
| `--orange` | `#FD7B01` | logo orange | small rules and tags in mockups |
| `--red` | `#F91116` | logo eye ring | "missing" chip border and icon only, never text |
| `--paper` | `#F2F0EA` | neutral | page background (the brief's `#F4F1EA`, cooled a touch toward the logo's blue-grey slate) |
| `--sheet` | `#FFFFFF` | neutral | product screens, documents |
| `--rule` | `#CFCBC2` | neutral | ledger lines and dividers (decorative only) |

### Contrast (WCAG 2.x)

| Pair | Ratio | Use |
|---|---|---|
| ink on paper | 13.1 | body text |
| slate on paper | 8.4 | secondary text |
| black on accent | **6.1** | Book demo button text |
| white on accent | 3.3 ✗ | not used. White text fails on the accent, so the accent stays unaltered and buttons take black text. |
| accent on paper | 2.9 ✗ | not used for text. `--accent-deep` (4.8 on paper, 5.3 on white) is used instead. |
| paper on ink | 13.1 | dark bands |
| yellow on ink | 11.4 | timeline numbers on the dark band |
| ink on yellow | 11.4 | pending chip |
| rule on ink | 9.2 | secondary text on dark bands |

## Type

| Role | Face | Why |
|---|---|---|
| Headings | **Barlow Condensed** 600/700 | Narrow, flat-sided letters that read like gate and yard signage, and they fit long headlines on a phone. |
| Body | **IBM Plex Sans** 400/600 | Plain, sturdy and very legible at 16–17px. It shares a skeleton with Plex Mono, so data sits in running text without a jolt. |
| Data | **IBM Plex Mono** 400/600 | Only for real data: job numbers, BL numbers, KES amounts and plate numbers. Tabular figures keep ledger columns aligned. |
| Container IDs | **Big Shoulders Stencil Display** 800 | Only for container numbers (`MSKU 401619-0`), echoing the painted stencil on a box door. |

All are self-hosted latin-subset woff2 with `font-display: swap`. Licences are in `fonts/OFL.txt`.

The scale follows the classic sequence: 12 / 14 / 16 / 17 (body) / 21 / 24 / 36 / 48 / 72+.

## Concept: the shipping manifest

The page borrows from the paperwork a clearing agent handles every day: a job file with a document checklist, a ledger with a double rule under the totals, a trip sheet, a delivery note with a "Signed" line, a gate pass with field labels, and rubber stamps.

**The one bold move:** the hero's job file **HFD/0142/2026**. When the page loads, a rubber stamp reading "6/8 RECEIVED" lands once on its checklist. That is the only motion on the page that the visitor didn't trigger, and it is static under `prefers-reduced-motion`. Everything else is quiet: paper, ink, ruled lines, and the red-orange saved for the buttons and stamps.

## Sections

1. **Top bar.** Mark plus "Hornbill Freight Desk" set in Barlow Condensed, and a Book demo button. On mobile, a "Book demo on WhatsApp" bar is pinned to the bottom of the screen once the visitor scrolls past the hero.
2. **Hero.** Left-aligned headline "Every BL, document and shilling, in one job file." and a sub-line naming the three audiences, ending "Built in Kenya". Two CTAs, Book demo and See how it works. On the right sits screen A in a slightly tilted browser frame.
3. **Who it's for.** Three tabs styled as file dividers: a vertical list on desktop, a stacked selector on mobile. Each panel is a ledger sheet with two columns, "Now" (the pain) and "With Freight Desk" (the payoff), plus its own prefilled Book demo link.
4. **How a job moves.** A charcoal band. Eight numbered steps on a yellow track: horizontal on desktop, 4 × 2 on tablet, vertical on mobile.
5. **Screens.** Screens A–D, with an uneven rhythm:
   - A: a detail crop beside its caption
   - B: the full-width ledger
   - C and D: a narrow trip sheet paired with a wide dashboard

   Each has a one-line caption saying what it saves the user.
6. **Modules and pricing.** The pricing statement on the left; on the right, an order sheet with 7 tick boxes and a live preview of the WhatsApp message.
7. **Trust.** The client quote as a signed delivery note. The ODPC registration as a stamp. A gate-pass list with the office and maps link, who built it, support, and setup time.
8. **FAQ.** Six questions as `<details>`, with the heading on the left on desktop.
9. **Final CTA band.** Charcoal band, one line, Book demo.
10. **Footer.** Charcoal. The logo sits on a paper plate (see the logo note below). Address, email, WhatsApp, the ODPC line, © Hornbill and the privacy policy link.

## Self-review against generic defaults, and what changed

| First idea | Problem | Changed to |
|---|---|---|
| Step numbers 01–08 in the mono face | Mono for small labels is a stock tell. Mono should mean "data". | Step numbers in Barlow Condensed. Mono is kept strictly for data the brief lists. |
| "Exhibit A–D" labels above each screen | An invented label above content, and legal language rather than freight language | No labels. Each screen carries its real in-app title, and the caption below says what it saves. |
| Small uppercase eyebrow over each section heading | Template chrome | Removed. Sentence-case headings only. Uppercase appears only on stamps, as on real paper. |
| Hairline rules everywhere | Reads as a broadsheet newspaper | Rules appear only where paperwork has them: ledger rows, a double rule under totals, form fields, and the delivery-note signature line. |
| Rounded cards with soft shadows for audiences and modules | The SaaS card kit | Audiences are tabbed file dividers. Modules are a single order sheet. Square paper edges everywhere; only the browser frames get a radius. |
| Coloured traffic-light dots in the browser frames | Adds green, which isn't in the logo | Neutral rule-grey dots. |

## Product screens: what was taken from the app screenshots

The 11 screenshots of the live app (kept outside the site folder, in `C:\Projects\freightdesk-screenshots\`, because they contain real client data) were used for layout and labels only. None of their data appears on the site: no client names, KRA PINs, phone numbers, container or BL numbers, driver names or amounts. Every figure in the mockups comes from the brief.

| Screen | Real-app pattern borrowed | Labels now used |
|---|---|---|
| A, shipment file (hero and detail) | Jobs list fields, status pills, progress bar with % | Shipment File, Bill of Lading, Container, Route, Customs Processing, Progress/Comments tab, Progress 75% |
| B, finance | Finance Dashboard page title, subtitle and summary table. The role sidebar shows when the frame is at least 900px wide and is cropped away on smaller screens. | Finance Dashboard, "Shipment Revenue, Expenses & Profitability", Shipment Financial Summary, columns Shipment / Customer / Revenue / Expenses / Paid / Balance / Profit, sidebar Finance Module / Shipment Reconciliation / Vehicle Expense Reconciliation / Reports |
| C, trip | Trip Management columns and expense types | Trip Management, In Progress, Agreed Price, Trip Fuel, Tolls & Parking |
| D, director | Director Dashboard stat tiles and the Shipment Status list with count pills | Director Dashboard, Total Revenue, Outstanding Invoices, Clearing Net Profit, Transport Profit, Shipment Status (New Requests, Customs Processing, In Transit, Arrived, Delivered), Missing Documents |

Two other conventions follow the real app:
- Dark table header rows (ink background, paper text).
- Rounded status pills inside the app UI. The landing page keeps its square paper edges.

The app's blues, greens and cyans are **not** carried over. Pills use the logo's yellow, amber, orange and ink.

Two values from the brief were replaced on request, because they match real records in the app:

| Field | Value used on the site | Why |
|---|---|---|
| Bill of lading (screen A) | `MEDUH0142026` (invented) | The brief's BL belongs to a real client job, and BL numbers can be tracked publicly. |
| Vehicle plate (screen C) | `KZZ 101T` (invented) | The brief's plate is on a real trip record. The KZZ series has not been issued in Kenya. |

## Logo use and notes

- Optimised copies are in `img/`. The transparent margin is cropped and the artwork is otherwise untouched.
  - `logo-40/80/120.png` (1×/2×/3×)
  - `favicon.ico` (16/32/48)
  - `icon-192.png`
  - `apple-touch-icon.png`
- The mark's body is charcoal and black, so it disappears on the charcoal footer. In the footer and in the apple-touch icon (which iOS fills black) it sits on a paper-coloured plate.
- The source PNG has a soft orange and yellow halo of semi-transparent pixels around the edge, left over from background removal. It is barely visible at 40px.
- The source also carries C2PA content-credentials metadata. The optimised copies drop it.

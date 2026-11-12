# BuildMap hand-off contract (v0.1)

This is what Paul's agent hands to the website builder for every job. Paul's agent keeps making its PDF exactly as now; it **also** writes one data file and saves the images separately. The website builder reads only this folder, so if the folder is right, the website builds without questions.

The formal definition is [`buildmap.schema.json`](buildmap.schema.json). A filled-in example from the 275 Montreal Level 1 report is in [`../examples/275-montreal/buildmap.json`](../examples/275-montreal/buildmap.json).

## 1. The job folder

One folder per job, named by the job id the order form gives (`BM-<yyyymmdd>-<slug>`):

```
BM-20261008-275-montreal/
  buildmap.json            <- the data file (job + site come from the order form; Paul's agent fills level1/2/3)
  intake/                  <- anything the client uploaded (title, LIM, survey, photos)
  level-1/
    report.pdf             <- the Level 1 PDF, as today
    images/                <- every render, plan and diagram as its own file
      01-exterior-west.jpg
      03-plan-ground.png
  level-2/
    report.pdf
    images/
  level-3/
    report.pdf
    images/
```

## 2. Who writes what

| Part of buildmap.json | Written by | When |
| --- | --- | --- |
| `job` | Order form | When the client orders. Never changed afterwards. |
| `site` | Automatic site record (Level 0), corrected by Paul's agent | Straight after the order; Paul's agent fixes anything wrong and adds a source |
| `level1` | Paul's agent | Status `in-progress`, then `issued` when Paul signs it off |
| `level2`, `level3` | Paul's agent | Same, if ordered |
| `website` | Kiri (or the client) | Optional: style, development name, headline, agents, prices |

A level only counts once its `status` is `issued`. **The website is built as soon as Level 1 is issued**, and rebuilt when Level 2 or 3 is issued.

## 3. Level 1 must include

- `concept`: a 2 to 4 sentence summary, typology (subdivision, townhouses, apartments...), positioning (entry, family, mid, prestige), storeys, up to 8 key points, architecture and materials.
- `residences`: one entry per home or lot, with a stable `id` (e.g. `apt-06`, `lot-3`), name, bedrooms, bathrooms, floor area **and whether it is gross or net**, outdoor area, and features. Homes that share a plan share a `type_group`.
- `totals`: residences, gross floor area, site coverage, car parks (with a note if not proven).
- `amenities` if any.
- `images`: every render and plan as a **separate file of at least 2000 px** on the long side, never only inside the PDF. Each has a kind (exterior/interior/aerial render, floor plan, site plan, section...), a title, which residences it shows, and whether it is an artist's impression. Mark one or two exteriors as `hero_candidate`.
- `open_items`: everything still to check (survey, consent, heritage, engineering, parking). The website never presents these as resolved.
- `disclaimer`: the exact line printed on the website wherever Level 1 content appears (today: "Concept design, not for consent or construction").

## 4. Level 2 and Level 3 (to confirm with Paul)

The schema has a first guess at these, to be replaced by Paul's real table of contents:

- **Level 2 (technical):** section summaries, planning pathway and the rules checked (complies / minor breach / breach / unknown), specification items (each marked public or not), engineering notes by discipline, risks with a rating and mitigation.
- **Level 3 (construction plan):** programme stages (start week, duration), target completion, cost plan (kept private by default), procurement route, staging.

On the website, Level 2 becomes a specification section and a due-diligence download; Level 3 becomes a build timeline and a "build-ready" story. Anything marked `public: false` stays out of the website and goes only into a gated download.

## 5. Checking a package

```
cd buildmap
npm install
node tools/validate.mjs /path/to/BM-20261008-275-montreal      # checks the data and that every file exists
node tools/to-site-brief.mjs /path/to/BM-20261008-275-montreal # writes site-brief.md and copy-seed.json for the website
```

`READY` means the website can be built. `NOT READY` lists exactly what to fix (a missing image, a residence id that doesn't match, a wrong value).

## 6. Rules of thumb for Paul's agent

1. Numbers are numbers (`144.4`, not `"144.4 m²"`). Units are in the field name.
2. Don't invent prices, sale values or consent outcomes. Leave a field out rather than guess.
3. Keep ids stable across revisions so prices and images stay attached.
4. When a level is re-issued, bump `revision` and `issued_on`; the website rebuilds from the newest.

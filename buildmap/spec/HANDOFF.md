# BuildMap hand-off contract (v0.3)

This is what Paul's agent hands to the website builder for every job. Paul's agent keeps making its PDF exactly as now; it **also** writes one data file and saves the images separately. The website builder reads only this folder, so if the folder is right, the website builds without questions.

The formal definition is [`buildmap.schema.json`](buildmap.schema.json). There are two filled-in examples: a single infill scheme from the 275 Montreal concept report ([`../examples/275-montreal/buildmap.json`](../examples/275-montreal/buildmap.json)) and a job with four alternatives, two infill and two subdivision, from the 9 Lowes Road hand-off ([`../examples/9-lowes-road/buildmap.json`](../examples/9-lowes-road/buildmap.json)).

## 0. What changed in v0.3

v0.3 comes from the answers Paul's agent gave on the Lowes Road job. Nothing from v0.2 was removed.

1. **Options.** A job can hold several `options`, each typed `infill` (homes built on the site) or `subdivision` (vacant lots). They are mutually exclusive: nothing is ever added across options, and each carries its own totals, checks, open items and images.
2. **Lots are not homes.** A subdivision option lists `lots` (area, how the area was measured, shape test, building test). A lot cannot carry bedrooms, bathrooms or a floor area. An infill option lists `homes`.
3. **Allowance is not floor area.** Before a floor plan exists, a home carries `floor_area_allowance_m2` with `floor_area_status: "allowance"`. The website never shows an allowance as the size of a home.
4. **A fit is not compliance.** Each check says whether it is `geometric` (the shape fits on the drawing) or a `full-assessment`, and how well it is evidenced. `minor-breach` is only used when a planner has said so.
5. **Unknown is left out.** Unknown numbers are omitted, never written as 0. The schema rejects zero areas.
6. **Issued means signed off.** A level only counts as issued when `signed_off_by` and `signed_off_on` are filled in with Paul's sign-off.
7. **One option goes public.** `selection` records which option the website and marketing use, who chose it and when.
8. **Private stays private.** An image with `public: false` is left out of the website, brochure, ads and downloads.
9. **Four separate answers.** The checker reports separately whether the data is sound, whether levels are signed off, whether an option is selected, and whether anything blocks publication.
10. **Development type on the order.** `job.development_type` (infill, subdivision, both, not-sure) comes from the order form.

## 1. The job folder

One folder per job, named by the job id the order form gives (`BM-<yyyymmdd>-<slug>`):

```
BM-20261008-275-montreal/
  buildmap.json            <- the data file (job + site come from the order form; Paul's agent fills level1/2/3)
  intake/                  <- anything the client uploaded (title, LIM, survey, photos)
  level-1/
    report.pdf             <- basic report
  level-2/
    report.pdf             <- technical report
  level-3/
    report.pdf             <- development plan
    images/                <- every render, plan and diagram as its own file
      01-exterior-west.jpg
      03-plan-ground.png
```

## 2. Who writes what

| Part of buildmap.json | Written by | When |
| --- | --- | --- |
| `job` | Order form | When the client orders. Never changed afterwards. |
| `site` | Automatic site record (Level 0), corrected by Paul's agent | Straight after the order; Paul's agent fixes anything wrong and adds a source |
| `level1` | Paul's agent (mostly automated) | Status `in-progress`, then `issued` |
| `level2`, `level3` | Paul's agent | Same, if ordered; `issued` when Paul signs it off |
| `options`, `open_items`, `images` | Paul's agent | Whenever the report compares more than one way to develop the site |
| `selection`, `signed_off_by`, `signed_off_on` | Paul (recorded by his agent) | Never filled in by an agent on its own judgement |
| `website` | Order form, then Ant (or the client) | `lead_email` (where site enquiries go: the client's existing address), `brand` (colours, fonts and logo pulled from the client's own website), plus optional style, development name, headline, agents, prices |

A level only counts once its `status` is `issued` and Paul's sign-off is recorded. **The website and marketing are built once Level 3 (the development plan) is issued and signed off**, and, where the job has options, once one option is selected.

## 3. What each level must include

### Level 1: basic report ($99, mostly automated)

A short-form due diligence accelerator. No renders.

- `summary`: 3 to 5 plain sentences with the headline answer for the site.
- `zoning`: the zone, the district plan, **what you can do on the site** (each option with its consent pathway and an indicative yield) and the key rules behind that (height, coverage, setbacks), each with its source.
- `hazards`: every hazard to be aware of (flood, liquefaction, coastal, slope, contamination, heritage, protected trees, easements), each with a level (none found, low, medium, high, unknown), what it means in plain words, and the source.
- `next_steps` and the `disclaimer` (desktop review, not a LIM or consent opinion).

### Level 2: technical report ($499, within 24 hours)

Almost everything needed in a due diligence period to make a decision.

- `planning`: pathway and each rule checked (complies / minor breach / breach / unknown).
- `title_and_interests`: easements, covenants, consent notices.
- `services`: water, wastewater, stormwater, power, fibre, access.
- `engineering`: notes by discipline (geotechnical, structural, civil, traffic, fire).
- `market`: summary and comparable sales.
- `risks`: each with a rating and mitigation.
- `decision`: proceed, proceed with conditions, do not proceed, or more information needed, with reasons.

### Level 3: full development plan (price on application, within 48 hours)

- `concept`: a 2 to 4 sentence summary, typology, positioning, storeys, key points, architecture and materials.
- `residences`: one entry per home or lot, with a stable `id` (e.g. `apt-06`, `lot-3`), bedrooms, bathrooms, floor area **and whether it is gross or net**, outdoor area, features. Homes that share a plan share a `type_group`.
- `totals`, `amenities`, `comparables`.
- `images`: every render and plan as a **separate file of at least 2000 px** on the long side, never only inside the PDF. Each has a kind, a title, which residences it shows, and whether it is an artist's impression. Mark one or two exteriors as `hero_candidate`.
- `programme`, `staging`, `cost_plan`, `feasibility` and `procurement`. Costs and feasibility are private by default.
- `open_items`: everything still to check. The website never presents these as resolved.

### Full package (price on application, within 5 working days)

`job.package` is true. The website, brochure, ad concepts, strategy and feasibility are built from Levels 1 to 3. Anything marked `public: false` stays out of the website.

These fields are a first version, to be replaced by what Paul's agent actually produces once it has answered the note.

## 5. Checking a package

```
cd buildmap
npm install
node tools/validate.mjs /path/to/BM-20261008-275-montreal      # checks the data and that every file exists
node tools/to-site-brief.mjs /path/to/BM-20261008-275-montreal # writes site-brief.md and copy-seed.json for the website
```

The checker gives one of three answers:

- `NOT VALID`: the data is wrong. It lists exactly what to fix (a missing image, an id that doesn't match, a lot with bedrooms).
- `VALID` with holds: the data is sound but it cannot be published yet. Each hold is named: no sign-off, no option selected, blocking open items.
- `READY`: the website can be built and published.

For a private preview before sign-off, add `--draft` to the brief tool, and `--option C` to preview one option before a selection is recorded. Draft briefs are stamped as drafts.

## 6. Rules of thumb for Paul's agent

1. Numbers are numbers (`144.4`, not `"144.4 m²"`). Units are in the field name.
2. Don't invent prices, sale values or consent outcomes. Leave a field out rather than guess.
3. Keep ids stable across revisions so prices and images stay attached.
4. When a level is re-issued, bump `revision` and `issued_on`; the website rebuilds from the newest.
5. Never add options together, and never copy one option's figures into `level3.totals` unless it is the selected option.
6. Image fields are `file` (not `path`) and `artists_impression`.

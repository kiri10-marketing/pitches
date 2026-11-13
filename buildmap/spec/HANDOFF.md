# BuildMap hand-off contract (v0.4)

This is what Paul's agent hands to the BuildMap website for every job. The assessment workflow stays exactly as it is. This contract is the export and delivery layer around it: one data file, the report PDFs, and every plan as its own image file.

The formal definition is [`buildmap.schema.json`](buildmap.schema.json). The worked example is 9 Lowes Road ([`../examples/9-lowes-road/buildmap.json`](../examples/9-lowes-road/buildmap.json)): one job holding a subdivision and two townhouse alternatives.

## 0. What changed in v0.4

v0.4 comes from Paul's handoff review of 13 November 2026. Nothing from v0.3 was removed, and a v0.3 package still passes once its version number is changed.

1. **Lite and detailed come as a pair.** Level 1 (the one-page Lite report) and Level 2 (the detailed report) are generated together from one assessment run, recorded under `run`. Both carry the same `run_id`.
2. **Paying is separate from the findings.** What the customer may open is recorded under `access.entitlements`. A purchase never changes a finding, never removes a qualification and never gives permission to publish.
3. **Level 3 is separately commissioned.** It is never produced from an address alone, and it is only present when it has actually been commissioned and produced.
4. **Release states.** A report moves through `generated`, `checked`, `reviewed` and `issued`. `issued` still means Paul's recorded sign-off. A report can be issued as a conditional desktop concept; say so in `issue_scope`.
5. **A road lot is not a section.** Each lot has a `kind` (residential, road, access, reserve, utility). Only residential lots count in `totals.lots`. Seven residential lots plus a road lot is seven sections.
6. **Four separate facts on every check.** `applicability`, the model `result`, `evidence_status` and the `consent` consequence are kept apart. A model pass is not an approval, and missing evidence can never be recorded as a pass.
7. **Highest tested, not maximum.** `totals.yield_label` is `highest-tested` unless a verified maximum is actually supported, and `yield_note` says what limits the search.
8. **Figures keep their basis.** Site area is split into recorded, mapped, net and surveyed. `quantities` holds any figure with its unit, basis, inclusions and whether it is provisional. Coverage says what was measured and what it was divided by.
9. **Three audiences.** `visibility` is `public`, `client` or `internal` on images, documents and specification lines. The website enforces it on the server. The older `public: false` flag is still read.
10. **Plans are plans.** Image kinds now include `scheme-plan` and `movement-diagram`. A plan cannot be flagged as an artist's impression, and the checker warns when a plan is under 2,000 px on the long side. Renders, materials and architecture notes are only included when a real design exists.
11. **Sources and open items say more.** `sources` have ids, dates, pages and limitations. An open item can say its effect, the evidence needed, who closes it and what counts as closed.
12. **The original order is never rewritten.** Corrections to the site go in `site.corrections` with their evidence.
13. **The checker only checks the package.** Its answers are now `PACKAGE NOT VALID`, `PACKAGE VALID` and `PACKAGE READY`. It says in every run that it does not check the planning findings.

Still true from v0.3: options are mutually exclusive and never added together, lots carry no bedrooms or floor area, an allowance is not a floor area, unknown numbers are left out and never written as 0, and one option is selected before anything goes public.

## 1. The job folder

One folder per job, named by the job id the order form gives (`BM-<yyyymmdd>-<slug>`):

```
BM-20261113-9-lowes-road/
  buildmap.json            <- the data file (job + site come from the order form; Paul's agent fills level1/2/3)
  intake/                  <- anything the client uploaded (title, LIM, survey, photos); never a public folder
  level-1/
    report.pdf             <- the one-page Lite report
    images/                <- the scheme exports, one file per option
  level-2/
    report.pdf             <- the detailed report, from the same run
    images/                <- plans, sections and movement diagrams
  level-3/                 <- only if separately commissioned and actually produced
```

## 2. Who writes what

| Part of buildmap.json | Written by | When |
| --- | --- | --- |
| `job` | Order form | When the client orders. Never changed afterwards. |
| `site` | Automatic site record (Level 0), corrected by Paul's agent | Straight after the order; Paul's agent fixes anything wrong and adds a source |
| `run`, `sources` | Paul's agent | Once per assessment run |
| `level1`, `level2` | Paul's agent | Generated together. Status `generated`, then `checked`, `reviewed`, `issued` |
| `level3` | Paul's agent | Only when separately commissioned |
| `options`, `open_items`, `images` | Paul's agent | Whenever the report compares more than one way to develop the site |
| `selection`, `signed_off_by`, `signed_off_on` | Paul (recorded by his agent) | Never filled in by an agent on its own judgement |
| `access` | The website (entitlements) and Paul (publication) | Never written by the assessment |
| `website` | Order form, then Ant (or the client) | `lead_email` (where site enquiries go: the client's existing address), `brand` (colours, fonts and logo pulled from the client's own website), plus optional style, development name, headline, agents, prices |

A report is only shown to a customer once its `status` is `issued` and Paul's sign-off is recorded. The Lite report is shown at that point; the detailed report is released to a customer who is entitled to that revision. **A public project website is a separate decision**: it needs an issued Level 3, one selected option and `access.publication.permitted`.

## 3. What each level must include

Prices are not part of this contract. They live in the website's own settings.

### Level 1: the Lite report

One page, made from the same run as Level 2. It must stay legible and must not drop an option or a hold.

- `summary`: 3 to 5 plain sentences with the headline answer for the site.
- Each option, its residential count, key areas and parking, read from `options`.
- `zoning`: the zone, the plan, what you can do on the site and the key rules behind it, each with its source.
- `hazards`: each with a level, what it means in plain words, and the source.
- Every material hold, the assessment date and revision, and the `disclaimer`.

### Level 2: the detailed report

Generated in the same run as Level 1. Buying it gives access to it; it does not produce different findings.

- `planning`: the pathway and each rule checked, with applicability, result, evidence status and consent consequence kept apart.
- `title_and_interests`, `services`, `engineering`, `risks`, `decision`, where the report covers them.
- The tested alternatives, calculations and sources.
- Its own plan, section and movement-diagram exports under `level-2/images/`.

### Level 3: the development plan

Separately commissioned. Present only when it has actually been produced. When it is, it carries the concept, the homes or lots, images, programme, staging and costs, and its `issue_scope` says exactly what was issued. A cost estimate or a programme is never described as consent or as ready to build.

### Images

Export each actual plan from its vector or numerical source at 2,000 px or more on the long side, and keep the vector original where there is one. An enlarged small image does not count. Give each image its option, revision, kind, a scale bar or `not_to_scale`, and its orientation. Third-party diagrams need `reuse_permitted`.

## 5. Checking a package

```
cd buildmap
npm install
node tools/validate.mjs /path/to/BM-20261113-9-lowes-road      # checks the data and that every file exists
node tools/to-site-brief.mjs /path/to/BM-20261113-9-lowes-road # writes site-brief.md and copy-seed.json for the website
```

The checker gives one of three answers:

- `PACKAGE NOT VALID`: the data is malformed. It lists exactly what to fix (a road lot counted as a section, a missing image, a pass recorded with missing evidence).
- `PACKAGE VALID` with holds: the data is well formed but a public website cannot be built yet. Each hold is named.
- `PACKAGE READY`: a public website can be built.

Every run also says whether the Lite and detailed reports can be released, which is a separate question. The checker only checks the package. It does not check the planning, the identity of the site, the geometry or any approval; those stay with the assessment's own QA and with Paul.

For a private preview before sign-off, add `--draft` to the brief tool, and `--option C` to preview one option before a selection is recorded. Draft briefs are stamped as drafts.

## 6. Rules of thumb for Paul's agent

1. Numbers are numbers (`144.4`, not `"144.4 m²"`). Units are in the field name.
2. Don't invent prices, sale values or consent outcomes. Leave a field out rather than guess.
3. Keep ids stable across revisions so prices and images stay attached.
4. When a level is re-issued, bump `revision` and `issued_on`; the website rebuilds from the newest.
5. Never add options together, and never copy one option's figures into `level3.totals` unless it is the selected option.
6. Image fields are `file` (not `path`) and `artists_impression`.
7. Scenario ids are stable and say what they are (`subdivision-main`, `th-2bed-75`). Home and lot ids stay the same across revisions; when one changes or is retired, say so in its note.
8. Calculate totals from unrounded values and round once, at the end.
9. The 8 x 15 m building-fit rectangle is a geometry test. Never turn it into a house of 120 m2.

## 7. What the website must do

These are the website's obligations, not the agent's.

1. Enforce `visibility` and entitlements on the server, for JSON, images, PDFs and direct download links, and check that the job belongs to the customer asking. Never send the whole package to a browser and hide parts of it.
2. Show conditional and unresolved results honestly. An address is enough to start; it is not enough to promise a verified yield for every site.
3. Keep "highest tested concept yield" wording wherever `yield_label` is `highest-tested`.
4. Never show alternatives as a combined total.
5. When a corrected report is issued, link the revisions and decide which revision each customer can open.

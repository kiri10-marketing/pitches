# 9 Lowes Road: one job, four options

Mapped from the Lowes Road hand-off package into contract v0.3. It shows a single job holding two infill options (A: 14 two-bedroom terraces, B: 12 three-bedroom terraces) and two subdivision options (C: 7 lots, D: 8 lots that fail the shape test as drawn). The options are alternatives and are never added together.

- The `job` record is a placeholder: no order-form record exists for this job.
- The report PDF and the seven images are not stored here, so check it with `--no-files`.
- All images are private, no level is signed off and no option is selected, so the checker answers `VALID` with holds and the brief tool refuses to build.

```
node tools/validate.mjs examples/9-lowes-road --no-files
node tools/to-site-brief.mjs examples/9-lowes-road /tmp/lowes-preview --draft --option C   # private preview only
```

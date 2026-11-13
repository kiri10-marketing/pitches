# 9 Lowes Road: one job, three alternatives

Mapped into contract v0.4 from the figures in Paul's handoff review of 13 November 2026. One job holds a subdivision (7 residential lots plus road lot 8) and two townhouse schemes (A: 36 two-bedroom homes, B: 27 three-bedroom homes). They are alternatives and are never added together.

- The `job` record is a placeholder: no order-form record exists for this job.
- The four Lowes PDFs and the plan exports were not supplied to the website side, so there are no images and the per-lot areas are left out rather than guessed. Check it with `--no-files`.
- Both reports are `generated`, not issued, no option is selected and publication is not permitted, so the checker answers `PACKAGE VALID` with holds and the brief tool refuses to build.
- This replaces the v0.3 example (14 and 12 terraces, 7 and 8 lots), which came from an earlier report.

```
node tools/validate.mjs examples/9-lowes-road --no-files
```

# TODO

- [ ] STEP 1: Confirm Appointment model has `status` enum+default (src/models/Appointment.ts). If missing, add.
- [ ] STEP 2: Ensure admin page shows status badge under `{appointment.service}` (src/app/admin/appointments/page.tsx). If missing, add.
- [ ] STEP 3: Create PATCH endpoint at `src/app/api/appointments/[id]/route.ts` to update appointment status.
- [ ] [optional] STEP 4: Add status dropdown UI in admin appointment card (render only, no wiring yet).


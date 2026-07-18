# Beacon — Phase 1 Functional Implementation
**Powered by Zynasty**

A project-wise finance management system. Every financial transaction
(expense, client payment, vendor payment, document) is linked to a
`Project`, and all derived numbers — profit, pending payments,
dashboard totals — are recalculated live from that ledger. Nothing in
the UI stores its own copy of a total; everything reads through
`CalculationService`.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc --noEmit
npm run build
```

> This zip was authored in a sandboxed environment without network
> access, so `npm install` has not been run against it here — there may
> be a small dependency-version hiccup to fix on first install, but the
> architecture, types, and component logic are complete and consistent.

## Folder structure

```
src/
  types/models.ts          — every domain type (Project, Expense, Vendor, …)
  utils/                   — formatting, id generation
  services/                — pure business logic, one file per concern
    CalculationService.ts    → profit / pending / dashboard totals (single source of truth)
    ProjectService.ts        → project creation/validation
    ExpenseService.ts        → expense creation/validation
    PaymentService.ts        → client & vendor payment creation
    VendorService.ts         → CRM integration point (mocked)
    OCRService.ts             → OCR/AI bill-extraction integration point (mocked)
    DocumentService.ts       → document/file record creation
    TimelineService.ts       → activity log entries
  state/
    appReducer.ts            → the ONE place state mutates + recalculates
    actions.ts                → typed action union
    AppContext.tsx            → React context + typed action creators
    selectors.ts               → derived-data readers (dashboard stats, per-project data, cash flow)
    seedData.ts                → demo data (swap for a real API fetch)
  hooks/                    — useDashboardStats, useProjectWorkspace, useVendorSearch
  components/
    ui/                      — Card, Badge, Button, Modal, IconCircle, form controls
    layout/                  — Sidebar, Topbar, Placeholder
    dashboard/                — KpiGrid, CashFlowChart, PaymentAlerts, RecentProjects, RecentActivity, DashboardPage
    projects/                  — ProjectsPage, ProjectRow, NewProjectModal
    workspace/                 — ProjectWorkspace (tab shell) + tabs/ (Overview, ClientPayments, Expenses, Documents, Timeline, Reports)
    expenses/                   — AddExpenseModal, VendorSelect, RecordPaymentModal
  App.tsx / main.tsx
```

## How data flows

1. **Everything is an action.** Adding an expense, recording a
   payment, uploading a document — each becomes a dispatch to
   `appReducer` via a typed action in `actions.ts`.
2. **The reducer recalculates, it never trusts the caller.** On
   `ADD_EXPENSE` / `ADD_CLIENT_PAYMENT` / etc., the reducer calls
   `recalcProject()` to rebuild that project's `spent` / `received`
   from the full ledger — not by incrementing a running total — so the
   numbers can never drift.
3. **The reducer also writes the timeline.** Every mutating action
   produces a `TimelineActivity` via `TimelineService.createActivity`,
   so the activity feed's vocabulary is centralized in one place
   instead of duplicated per screen.
4. **Selectors do the reading.** Components never filter/reduce
   `state.expenses` inline — they call a selector
   (`selectExpensesForProject`, `selectDashboardStats`, …), so the same
   aggregation logic can't silently diverge between the Dashboard and
   a Project Workspace.
5. **Hooks are the only thing components import.** `useDashboardStats()`
   and `useProjectWorkspace(projectId)` bundle state + selectors +
   actions for their screen. Because they read from context, any
   mutation anywhere in the app causes every consumer to recompute —
   that's what makes "dashboard updates instantly" a property of the
   architecture rather than something each screen has to remember to do.

## Expense flow (Manual / GST / Non-GST / Scan)

`AddExpenseModal` is one component with four entry tabs, but they all
funnel into the same review form before saving:

- **Manual Entry** goes straight to the editable form.
- **Upload GST Bill / Upload Non-GST Bill / Scan Bill** call
  `OCRService.extractBillData(file, method)`, which returns an
  `ExtractedBillData` draft. That draft populates the *same* editable
  fields — vendor, amount, date, invoice number, category, description
  — and the user must still press **Save Expense**. Nothing is
  committed to state until that click; `handleSave` runs
  `validateExpenseDraft` first and blocks on any missing required
  field.
- If a file was attached, `DocumentService.createDocumentRecord`
  builds a document record and the reducer's `ADD_EXPENSE` case stores
  it and links it via `expense.documentId`, and logs a `bill_uploaded`
  timeline entry in addition to `expense_added`.

## Vendor selection

Beacon does not own vendor records. `VendorSelect` calls
`VendorService.searchVendors()`, which is intentionally the single
integration seam for a real CRM call — swap the mock array in
`VendorService.ts` for a `fetch` to your CRM endpoint and every screen
that lists vendors (just this one, today) updates with zero other
changes. Selecting a vendor auto-fills its name onto the draft;
**"No Vendor / Cash Purchase"** is always present as the CRM-agnostic
fallback (`NO_VENDOR` in `types/models.ts`).

## Calculation rules (`CalculationService.ts`)

```
Amount Spent          = sum of all expenses for the project
Amount Received       = sum of all "Received" client payments
Current Profit        = Amount Received − Amount Spent
Pending Client Payment = max(0, Project Value − Amount Received)
Budget Utilization %   = Amount Spent / Project Value

Dashboard totals are the sum of the above across every project,
recomputed on every render from the current project list — never
cached or manually incremented.
```

## Integration points prepared for later phases

Each of these is a single, swappable module — nothing else in the app
needs to change when the real integration lands:

| Future integration | Swap this file |
|---|---|
| CRM (vendor sync) | `services/VendorService.ts` — replace `fetchVendorsFromCRM` |
| OCR / AI bill reading | `services/OCRService.ts` — replace `extractBillData` |
| Studio Portal | Add a new selector + hook reading the same `AppState`; no reducer changes needed |
| Client Portal | `selectClientPaymentsForProject` / `selectProjectById` already expose exactly the read surface a client-facing view would need |
| Material & Production Manager | `Expense.category` + `DocumentFile` already model bill-level material data; extend `ExpenseCategory` and add a dedicated selector when that module is scoped |
| Real backend | Replace `seedData.ts`'s `HYDRATE` dispatch in `AppContext.tsx` with a `GET /api/projects` fetch, and turn each `services/*` mutation into an API call before dispatching |

## Known gaps in this phase (intentional, scoped for later)

- `totalPayables` on the dashboard is currently derived as a fixed
  proportion of expenses (see the comment in `CalculationService.ts`)
  until a real vendor-payment-due ledger exists.
- Income, Vendors (directory view), Reports (business-wide), and
  Settings sidebar sections are stubbed with `Placeholder` — the
  Project Workspace's Reports tab is fully live and can be lifted into
  a business-wide version once needed.
- Document storage uses `URL.createObjectURL` (in-memory); swap
  `DocumentService.createDocumentRecord` for real upload storage.

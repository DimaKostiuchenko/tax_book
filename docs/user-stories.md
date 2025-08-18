# User Stories

## Authentication & User Management
- As a user, I want to register an account so that I can access the tax book application
- As a user, I want to log in to my account so that I can manage my tax records
- As a user, I want to reset my password so that I can regain access if I forget it

## Tax Record Management
- As a user, I want to add income records so that I can track my earnings
- As a user, I want to add expense records so that I can track my spending
- As a user, I want to add deduction records so that I can track tax deductions
- As a user, I want to edit existing records so that I can correct mistakes
- As a user, I want to delete records so that I can remove incorrect entries

## Category Management
- As a user, I want to create custom categories so that I can organize my records
- As a user, I want to edit category names so that I can improve organization
- As a user, I want to delete categories so that I can remove unused ones

## User Story: Tax Year Management

### As a
ФОП (sole proprietor) user

### I want
to view all my tax obligations (payments & reports) organized by month in a calendar view

### So that
I can easily keep track of deadlines, make payments, and ensure my financial records stay updated.

---

### Acceptance Criteria
1. **Monthly Calendar View**
    - Shows all tax-related events (payment deadlines, reporting deadlines).
    - Events are color-coded by type (e.g., payment vs report).
    - I can switch between month, week, and list views.

2. **Event Details**
    - When I click an event, I see:
        - Tax type (ESV, ЄП, etc.)
        - Due date
        - Precalculated payment amount (based on my data)
        - Option to edit tax-related details (e.g., income, group, rates)

3. **Payment**
    - I can confirm and pay the tax directly from the event view.
    - Payment is logged in my profile.
    - A receipt or confirmation is saved for future reference.

4. **Data Reuse**
    - Paid amounts and submitted reports are stored.
    - This data is automatically reused in:
        - Charts (income vs taxes, yearly overview, etc.)
        - Precalculated reports (quarterly, annual summaries)
        - Future payment suggestions

5. **Notifications**
    - Reminder notifications (email/Telegram/app) are sent before each due date.
    - If I pay/report early, reminders are canceled.

---

### Example Flow
- Open calendar → See March 2025 → "ЄП Payment due 20 March" event.
- Click event → See due date + 1340₴ precalculated amount.
- Edit if needed → Pay → Success confirmation stored.
- Dashboard updates → March chart now shows “ЄП: 1340₴ paid”.
- Annual report draft now includes this payment automatically.

> 📋 See [Requirements](./requirements.md) for business context and [Database Schema](./database-schema.md) for data structures.

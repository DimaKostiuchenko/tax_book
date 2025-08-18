# Web Application for Sole Proprietors: A User-Friendly Interface for the Simplified Taxation System

This project is an intuitive web application designed for Ukrainian sole proprietors (ФОП) on the simplified taxation system.  
The app helps entrepreneurs stay compliant by streamlining income tracking, tax payments, and report submissions — with automation, reminders, and visual insights.

---

## 🎯 Problem Statement
Ukrainian sole proprietors often struggle with:
- Remembering tax deadlines and payment details
- Calculating Single Tax (ЄП) and Unified Social Contribution (ЄСВ) amounts
- Generating and submitting accurate reports
- Keeping all financial/tax data in one place

This app solves these pains by combining **a tax calendar, smart reminders, and automation tools** in a single platform.

---

## 👤 User Personas
- **FOP Group 1 & 2:** Small entrepreneurs with monthly ЄП obligations
- **FOP Group 3:** Entrepreneurs with quarterly reporting and payments
- **Accountants / Bookkeepers:** Managing multiple FOP accounts

---

## 📌 Core User Stories

### 1. Dashboard Overview
- **As a** FOP user
- **I want** to see my key financial and tax information (income, deadlines, amounts due) on a single screen
- **So that** I always know my current situation and what’s next

Acceptance Criteria:
- Current income (quarterly + annual)
- Income limit progress bar
- Upcoming events with countdown timers
- Precalculated tax amounts (ЄП, ЄСВ)

---

### 2. Income Management
- **As a** FOP user
- **I want** to quickly record, edit, and track my income
- **So that** my reports and tax calculations stay accurate

Acceptance Criteria:
- Add income with date, amount, description
- View transaction history with filters/search
- Edit or delete records

---

### 3. Tax Year Management (Calendar)
- **As a** FOP user
- **I want** to view all tax deadlines (payments & reports) on a calendar, click into them, and take action
- **So that** I never miss a due date and can handle taxes directly in the app

Acceptance Criteria:
- Interactive monthly calendar with events divided by months
- Color-coded tax events (payments vs reports)
- Click event → see details, precalculated amount, edit data, pay
- Paid amounts stored for charts, reports, and future calculations
- Notifications (web/email/messenger) before deadlines

---

### 4. Reports & Declarations
- **As a** FOP user
- **I want** the system to generate draft tax declarations based on my data
- **So that** I save time and reduce risk of mistakes

Acceptance Criteria:
- Auto-generate drafts for ЄП and ЄСВ declarations
- Group 3 → quarterly declarations within 40 days
- Group 1 & 2 → annual declaration within 60 days of year end
- Ability to export or download declaration in official format

---

### 5. Payments
- **As a** FOP user
- **I want** to pay my taxes directly from the app (or copy correct details easily)
- **So that** I don’t waste time searching for bank requisites or risk errors

Acceptance Criteria:
- Store official payment details for ЄП & ЄСВ
- Pre-fill forms with user’s info (group, rate)
- Log payments with receipts/confirmation

---

## 🌟 Key Advantages
- **Simplicity**: Built for non-accountants
- **Automation**: Precalculated taxes, auto-reminders, draft reports
- **Visualization**: Charts and progress bars for financial clarity
- **Centralization**: All tax obligations in one place

---

## 🔮 Future Extensions
- Integration with **Diia** or banking APIs for auto-payments
- Multi-user access (entrepreneur + accountant)
- AI assistant for personalized tax advice  

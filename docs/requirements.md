# Requirements Document: Tax Calendar Web Application for Sole Proprietors (ФОП)

## 1. Business Context
Ukrainian sole proprietors (ФОП) often face challenges with:
- Remembering tax payment and reporting deadlines
- Correctly calculating Single Tax (ЄП) and Unified Social Contribution (ЄСВ)
- Filing tax declarations on time
- Avoiding mistakes due to manual tracking

This app provides an **interactive tax calendar, reminders, income tracking, and automation** to reduce errors and simplify tax compliance.

---

## 2. User Personas
- **FOP Group 1 & 2 Entrepreneurs** → Monthly ЄП, annual reports  
- **FOP Group 3 Entrepreneurs** → Quarterly ЄП & ЄСВ, quarterly reports  
- **Accountants** → Manage multiple FOP accounts efficiently  

---

## 3. User Stories

### 3.1 Dashboard Overview
- **As a** FOP user  
- **I want** to see my financial and tax overview on a dashboard  
- **So that** I can track my income, deadlines, and upcoming payments easily  

Acceptance Criteria:
- Show current income (quarter & year)  
- Income limit progress bar  
- Upcoming events with countdown timers  
- Precalculated amounts for ЄП & ЄСВ  

---

### 3.2 Income Management
- **As a** FOP user  
- **I want** to add, edit, and view my income entries  
- **So that** my tax calculations and reports are accurate  

Acceptance Criteria:
- Add income (date, amount, description)  
- Transaction history with filters & search  
- Edit/delete income records  

---

### 3.3 Tax Year Management (Calendar)
- **As a** FOP user  
- **I want** to see tax obligations on a monthly calendar  
- **So that** I never miss deadlines and can act directly from events  

Acceptance Criteria:
- Calendar with events: payments & reports  
- Color-coded by type (ЄП, ЄСВ, Declarations)  
- Click event → view details, edit data, pay precalculated amount  
- Store paid amounts for reports & charts  
- Notifications before deadlines (web/email/messenger)  

---

### 3.4 Reports & Declarations
- **As a** FOP user  
- **I want** draft tax declarations generated automatically  
- **So that** I save time and reduce errors  

Acceptance Criteria:
- Group 3 → quarterly declarations (40 days after quarter end)  
- Groups 1 & 2 → annual declaration (60 days after year end)  
- Download/export in official format  

---

### 3.5 Payments
- **As a** FOP user  
- **I want** to pay taxes directly from the app or copy bank details  
- **So that** I don’t waste time searching or risk mistakes  

Acceptance Criteria:
- Store official payment requisites for ЄП & ЄСВ  
- Pre-filled data based on profile  
- Log payments with receipts  

---

## 4. Core Features (MVP)
1. Dashboard (income, deadlines, amounts due)  
2. Income tracking (CRUD)  
3. Tax calendar with events & notifications  
4. Draft report generation  
5. Payment requisites & logging  

---

## 5. Non-Functional Requirements
- **Responsive UI** (desktop, mobile)  
- **Localization** → Ukrainian (default), scalable for other languages  
- **Notifications** → email + optional messenger integration  
- **Security** → authentication, role-based access (entrepreneur, accountant)  

---

## 6. Future Enhancements
- Integration with **Diia** for official submission  
- Banking APIs for direct auto-payments  
- AI-based tax advisor & anomaly detection  
- Multi-user access (entrepreneur + accountant collaboration)  


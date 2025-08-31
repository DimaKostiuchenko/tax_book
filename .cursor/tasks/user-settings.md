🛠️ "Settings" Page
General Logic

Page is available only to authorized users.

Has tabs for easy navigation.

Each tab saves changes separately (with a "Save" button).

Success/error notifications are displayed inline (toast/banner).

Tabs
1. Profile

Purpose: collect basic personal and tax-related information.

Fields:

User type (Individual Entrepreneur [FOP] / Legal Entity) → controls which form fields appear.

If FOP (sole proprietor):

Full Name

TIN (10 digits)

Tax regime: Single tax (group 1/2/3) or General system

If Legal Entity:

Company name

EDRPOU (8 digits, company code in Ukraine)

Phone (format +380XXXXXXXXX)

Email (readonly, used for login)

System:

Timezone (default: Europe/Kyiv)

2. Notifications

Purpose: configure channels for receiving reminders about tax events.

Fields:

Email (primary, required)

Telegram — button "Connect bot" (deep-link), field "Connection status", button "Send test message"

Viber — phone number field, button "Connect", "Send test"

Reminder lead time (checkboxes: 7 days before, 3 days before, 1 day before)

(Phase 2) Quiet hours, channel priority

3. Security

Purpose: account access and security control.

Fields:

Change password (current password, new password, confirmation)

(Phase 2) Enable 2FA (Google Authenticator, backup codes)

(Phase 2) Active sessions (list + "Log out from all devices")

4. Site Preferences

Purpose: interface personalization.

Fields:

Language: (Ukrainian [default], English)

Theme: light / dark / system

(Phase 2) Date format: dd.mm.yyyy or yyyy-mm-dd

(Phase 2) Accessibility: high contrast, larger font

UX Suggestions

Tabs positioned on top or left sidebar:

Profile

Notifications

Security

Site Preferences

Each tab has a "Save changes" button.

On success → green toast: "Changes saved".

On error → inline red highlight with a hint.

For messengers — add a "Send test notification" button.

For codes (EDRPOU, TIN) — input mask + instant validation.

⚡ This way, the user gets a single place to manage their profile, tax status, notifications, and site preferences.

---

# User Settings Page - Sequential Task Breakdown

## Overview
Create a comprehensive user settings page with tabbed navigation for profile management, notifications, security, and site preferences.

## Sequential Implementation Plan

### Phase 1: Foundation & Database Setup ✅
1. **Create Settings Migration** ✅
   - Add user settings fields to users table ✅
   - Add tax-related fields (user_type, tin, edrpou, tax_regime, vat_payer, vat_number, reporting_period) ✅
   - Add notification fields (telegram_connected, viber_phone, reminder_lead_time) ✅
   - Add preference fields (language, theme, timezone) ✅

2. **Update User Model** ✅
   - Add new fields to fillable array ✅
   - Add casts for JSON fields (reminder_lead_time) ✅
   - Add validation rules for tax fields ✅
   - Add helper methods for user type validation ✅

3. **Create Settings Controller** ✅
   - Implement `UserSettingsController` ✅
   - Add methods for each tab (profile, notifications, security, preferences) ✅
   - Add validation rules for each section ✅
   - Implement save logic for each tab ✅

### Phase 2: Core Settings Page Structure ✅
4. **Create Main Settings Page** ✅
   - Create `settings.tsx` page component ✅
   - Implement tab navigation using Shadcn Tabs component ✅
   - Add basic layout with sidebar or top navigation ✅
   - Ensure page is protected with auth middleware ✅

5. **Create Tab Components** ✅
   - Create `ProfileTab.tsx` component ✅
   - Create `NotificationsTab.tsx` component ✅
   - Create `SecurityTab.tsx` component ✅
   - Create `PreferencesTab.tsx` component ✅
   - Each component should be self-contained with its own form ✅

6. **Implement Form State Management** ✅
   - Use Inertia useForm for each tab ✅
   - Add proper validation and error handling ✅
   - Implement separate save buttons for each tab ✅
   - Add loading states for form submission ✅

### Phase 3: Profile Tab Implementation
7. **Create Profile Form Fields**
   - Add user type selector (FOP/Legal Entity)
   - Implement conditional field rendering based on user type
   - Add input masks for TIN (10 digits) and EDRPOU (8 digits)
   - Add tax regime and VAT payer fields
   - Add phone number field with Ukrainian format

8. **Add Profile Validation**
   - Validate TIN format (10 digits for FOP)
   - Validate EDRPOU format (8 digits for Legal Entity)
   - Validate phone number format (+380XXXXXXXXX)
   - Add conditional validation based on user type
   - Implement real-time validation feedback

9. **Profile Save Functionality**
   - Implement profile update logic in controller
   - Add success/error notifications
   - Handle form submission and response
   - Add proper error display for each field

### Phase 4: Notifications Tab Implementation
10. **Create Notification Settings Form**
    - Add email notification toggle (always enabled)
    - Add Telegram connection section with status display
    - Add Viber phone number field
    - Add reminder lead time checkboxes (7, 3, 1 days)
    - Add "Send test message" buttons

11. **Implement Messenger Integration**
    - Add Telegram bot connection logic
    - Add Viber connection placeholder
    - Implement test message sending
    - Add connection status indicators
    - Handle connection/disconnection flows

12. **Notification Save & Test**
    - Implement notification settings save
    - Add test message functionality
    - Handle connection status updates
    - Add proper error handling for failed connections

### Phase 5: Security Tab Implementation
13. **Create Password Change Form**
    - Add current password field
    - Add new password field with strength indicator
    - Add password confirmation field
    - Add password visibility toggles
    - Implement password strength validation

14. **Security Validation & Save**
    - Validate current password matches
    - Validate new password strength
    - Validate password confirmation
    - Implement password change logic
    - Add success/error notifications

15. **Security Features (Phase 2)**
    - Add 2FA toggle and setup
    - Add active sessions list
    - Add "Log out from all devices" functionality
    - Implement backup codes generation

### Phase 6: Site Preferences Implementation
16. **Create Preferences Form**
    - Add language selector (Ukrainian/English)
    - Add theme selector (light/dark/system)
    - Add timezone selector (default: Europe/Kyiv)
    - Add preference save functionality

17. **Implement Theme Switching**
    - Add theme context/provider
    - Implement theme switching logic
    - Add theme persistence in localStorage
    - Handle system theme detection

18. **Language & Locale Management**
    - Implement language switching
    - Add locale persistence
    - Update page content based on language
    - Handle RTL/LTR layout if needed

### Phase 7: UI/UX Enhancement
19. **Add Toast Notifications**
    - Implement toast system for success/error messages
    - Add different toast types (success, error, warning, info)
    - Add auto-dismiss functionality
    - Style toasts consistently with app theme

20. **Input Masks & Validation**
    - Add input masks for TIN and EDRPOU fields
    - Implement real-time validation feedback
    - Add field-specific error messages
    - Add validation icons and states

21. **Responsive Design**
    - Ensure settings page works on mobile
    - Optimize tab navigation for small screens
    - Add proper spacing and typography
    - Test on different screen sizes

### Phase 8: Advanced Features (Phase 2)
22. **Enhanced Notifications**
    - Add quiet hours configuration
    - Add channel priority settings
    - Implement notification scheduling
    - Add notification history

23. **Advanced Security**
    - Implement 2FA with Google Authenticator
    - Add backup codes generation
    - Add active sessions management
    - Add security audit log

24. **Accessibility & Preferences**
    - Add date format preferences
    - Add accessibility options (high contrast, larger font)
    - Implement keyboard navigation
    - Add screen reader support

## Implementation Order
1. **Start with Phase 1** - Database and model setup
2. **Build Phase 2** - Core page structure and navigation
3. **Implement Phase 3** - Profile tab (most important)
4. **Add Phase 4** - Notifications tab
5. **Create Phase 5** - Security tab
6. **Build Phase 6** - Site preferences
7. **Polish Phase 7** - UI/UX enhancements
8. **Enhance Phase 8** - Advanced features (optional)

## Success Criteria
- [ ] Settings page accessible only to authenticated users
- [ ] Tab navigation works smoothly
- [ ] Profile tab saves user tax information correctly
- [ ] Notifications tab handles messenger connections
- [ ] Security tab allows password changes
- [ ] Preferences tab switches theme and language
- [ ] All forms show proper validation feedback
- [ ] Success/error notifications work consistently
- [ ] Input masks work for tax identification numbers
- [ ] Page is responsive on all devices

## Technical Requirements
- Use Shadcn components for consistent UI
- Implement proper form validation with error handling
- Use Inertia.js for seamless form submissions
- Add proper TypeScript types for all components
- Ensure accessibility standards are met
- Add proper loading states and error boundaries
- Implement proper security measures for sensitive data

## Notes
- Start with the Profile tab as it's the most complex and important
- Use existing auth middleware for protection
- Implement proper CSRF protection for all forms
- Add proper logging for security-related actions
- Consider using React Hook Form for complex form management
- Add proper error boundaries for each tab component
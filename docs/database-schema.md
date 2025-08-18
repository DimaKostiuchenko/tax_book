# Database Schema

## Current Tables
- **users** - User authentication and profiles
- **password_reset_tokens** - Password reset functionality
- **sessions** - User sessions

## Domain Tables

### Events
```sql
events
- id (pk)
- user_id (fk → users.id)
- event_type enum('payment','report')
- title string
- description text nullable
- start_date datetime
- end_date datetime
- status enum('pending','completed','overdue') default 'pending'
- created_at timestamp
- updated_at timestamp
```

### Payment Events
```sql
payment_events
- id (pk)
- event_id (fk → events.id)
- amount decimal(12,2)
- paid_at datetime nullable
- transaction_id string nullable
- created_at timestamp
- updated_at timestamp
```

### Report Events
```sql
report_events
- id (pk)
- event_id (fk → events.id)
- file_path string nullable
- submitted_at datetime nullable
- reference_no string nullable
- created_at timestamp
- updated_at timestamp
```

## Relationships
- User has many Events
- Event belongs to User
- Event has one PaymentEvent (when event_type = 'payment')
- Event has one ReportEvent (when event_type = 'report')
- PaymentEvent belongs to Event
- ReportEvent belongs to Event


> 📋 See [Requirements](./requirements.md) for business context and [User Stories](./user-stories.md) for feature requirements.

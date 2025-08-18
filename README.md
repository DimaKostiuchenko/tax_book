# Tax Book Application

A modern tax record management application built with Laravel, Inertia.js, and React.

## Quick Start

```bash
# Install dependencies
composer install && npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate

# Start development
npm run dev
```

## Tech Stack

- **Backend**: Laravel 12 + Inertia.js
- **Frontend**: React + TypeScript + shadcn/ui
- **Database**: SQLite (dev) / MySQL/PostgreSQL (prod)
- **Testing**: Pest

## Documentation

- [Requirements](./docs/requirements.md) - Business requirements and features
- [Database Schema](./docs/database-schema.md) - Data models and relationships
- [User Stories](./docs/user-stories.md) - Feature requirements and user flows
- [Development Guide](./docs/development-guidelines.md) - UI components and coding standards

## Development Commands

```bash
# Development servers
npm run dev          # Start Vite + Laravel
php artisan serve    # Laravel only
npm run build        # Build for production

# Testing
php artisan test     # Run tests
npm run test         # Frontend tests (if configured)

# Database
php artisan migrate  # Run migrations
php artisan migrate:fresh --seed  # Reset database
```

## Project Structure



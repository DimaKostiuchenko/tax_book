# Laravel/PHP Development Guidelines

## Project Structure
```
app/
├── Console/Commands/          # Artisan commands
├── Http/
│   ├── Controllers/          # HTTP controllers
│   │   ├── Api/             # API controllers
│   │   ├── Auth/            # Authentication controllers
│   │   └── Settings/        # Feature-specific controllers
│   ├── Middleware/          # Custom middleware
│   └── Requests/            # Form request validation
├── Jobs/                    # Queue jobs
├── Models/                  # Eloquent models
├── Providers/              # Service providers
└── Services/               # Business logic services
```

## SOLID Principles

### 1. Single Responsibility Principle (SRP)
- **One class = One responsibility**
- Controllers handle HTTP requests only
- Models handle data relationships only
- Services handle business logic
- Jobs handle background tasks

```php
// ✅ Good - Single responsibility
class UserController extends Controller
{
    public function store(StoreUserRequest $request, UserService $userService)
    {
        $user = $userService->createUser($request->validated());
        return response()->json($user);
    }
}

// ❌ Bad - Multiple responsibilities
class UserController extends Controller
{
    public function store(Request $request)
    {
        // Validation logic
        // Business logic
        // Email sending
        // Database operations
        // Response formatting
    }
}
```

### 2. Open/Closed Principle (OCP)
- Classes should be open for extension, closed for modification
- Use interfaces and dependency injection
- Implement strategy pattern for different behaviors

```php
// ✅ Good - Open for extension
interface PaymentProcessorInterface
{
    public function process(Payment $payment): bool;
}

class StripePaymentProcessor implements PaymentProcessorInterface
{
    public function process(Payment $payment): bool
    {
        // Stripe-specific logic
    }
}

class PayPalPaymentProcessor implements PaymentProcessorInterface
{
    public function process(Payment $payment): bool
    {
        // PayPal-specific logic
    }
}
```

### 3. Liskov Substitution Principle (LSP)
- Derived classes must be substitutable for base classes
- Maintain consistent method signatures
- Don't change behavior in unexpected ways

### 4. Interface Segregation Principle (ISP)
- Keep interfaces focused and minimal
- Don't force classes to implement unused methods

```php
// ✅ Good - Focused interfaces
interface ReadableInterface
{
    public function read(): string;
}

interface WritableInterface
{
    public function write(string $data): bool;
}

// ❌ Bad - Fat interface
interface FileInterface
{
    public function read(): string;
    public function write(string $data): bool;
    public function delete(): bool;
    public function compress(): bool;
    public function encrypt(): bool;
}
```

### 5. Dependency Inversion Principle (DIP)
- Depend on abstractions, not concretions
- Use dependency injection
- Keep high-level modules independent of low-level modules

```php
// ✅ Good - Dependency injection
class UserService
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
        private EmailServiceInterface $emailService
    ) {}
}

// ❌ Bad - Direct dependencies
class UserService
{
    public function __construct()
    {
        $this->userRepository = new UserRepository();
        $this->emailService = new EmailService();
    }
}
```

## DRY (Don't Repeat Yourself)

### Extract Repeated Logic
- **Repeated validation** → Create Form Request classes
- **Repeated business logic** → Extract to Service classes
- **Repeated database queries** → Create Repository classes
- **Repeated API responses** → Create Resource classes
- **Repeated middleware logic** → Create custom middleware

### Service Layer Pattern
```php
// ✅ Good - Service class
class TaxCalculationService
{
    public function calculateTax(TaxAccount $account, float $amount): float
    {
        // Complex tax calculation logic
        return $amount * $account->tax_rate;
    }
}

// Use in controller
class TaxController extends Controller
{
    public function __construct(private TaxCalculationService $taxService) {}
    
    public function calculate(Request $request)
    {
        $tax = $this->taxService->calculateTax($account, $request->amount);
        return response()->json(['tax' => $tax]);
    }
}
```

### Repository Pattern
```php
// ✅ Good - Repository interface
interface UserRepositoryInterface
{
    public function findByEmail(string $email): ?User;
    public function create(array $data): User;
    public function update(User $user, array $data): User;
}

// ✅ Good - Repository implementation
class EloquentUserRepository implements UserRepositoryInterface
{
    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }
}
```

## KISS (Keep It Simple, Stupid)

### Simplicity Guidelines
- **Prefer simple solutions** over complex ones
- **Use Laravel conventions** instead of custom implementations
- **Clear method names** over clever ones
- **Small, focused methods** over large monoliths
- **Laravel's built-in features** over custom code

### Method Organization
```php
// ✅ Good - Simple, focused methods
class EventController extends Controller
{
    public function index()
    {
        $events = $this->eventService->getUserEvents(auth()->id());
        return Inertia::render('Events/Index', compact('events'));
    }
    
    public function store(StoreEventRequest $request)
    {
        $event = $this->eventService->createEvent($request->validated());
        return redirect()->route('events.show', $event);
    }
}

// ❌ Bad - Complex, doing too much
class EventController extends Controller
{
    public function index()
    {
        // Complex filtering logic
        // Database queries
        // Data transformation
        // Response formatting
        // Error handling
        // Logging
        // Caching
    }
}
```

## Laravel Best Practices

### 1. Controllers
```php
// ✅ Good - Thin controllers
class UserController extends Controller
{
    public function __construct(
        private UserService $userService,
        private UserRepositoryInterface $userRepository
    ) {}
    
    public function store(StoreUserRequest $request)
    {
        $user = $this->userService->createUser($request->validated());
        return response()->json($user, 201);
    }
}

// ❌ Bad - Fat controllers
class UserController extends Controller
{
    public function store(Request $request)
    {
        // 50+ lines of business logic
    }
}
```

### 2. Models
```php
// ✅ Good - Focused model
class User extends Authenticatable
{
    protected $fillable = ['name', 'email', 'password'];
    
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    
    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
    
    public function isVatPayer(): bool
    {
        return $this->vat_payer === true;
    }
}

// ❌ Bad - Model doing too much
class User extends Authenticatable
{
    public function createEvent($data) { /* business logic */ }
    public function sendEmail($message) { /* email logic */ }
    public function calculateTax($amount) { /* tax logic */ }
}
```

### 3. Form Requests
```php
// ✅ Good - Dedicated request class
class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ];
    }
    
    public function messages(): array
    {
        return [
            'email.unique' => 'This email is already registered.',
        ];
    }
}
```

### 4. Services
```php
// ✅ Good - Service class
class UserService
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
        private EmailServiceInterface $emailService
    ) {}
    
    public function createUser(array $data): User
    {
        $user = $this->userRepository->create($data);
        $this->emailService->sendWelcomeEmail($user);
        return $user;
    }
}
```

### 5. Jobs
```php
// ✅ Good - Focused job
class ProcessTaxFileJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    public function __construct(
        private TaxFile $taxFile
    ) {}
    
    public function handle(TaxDataFetcher $fetcher): void
    {
        $fetcher->processFile($this->taxFile);
    }
}
```

## Naming Conventions

### Classes
- **Controllers**: `UserController`, `EventController`
- **Services**: `UserService`, `TaxCalculationService`
- **Repositories**: `UserRepository`, `EventRepository`
- **Jobs**: `ProcessTaxFileJob`, `SendEmailJob`
- **Models**: `User`, `Event`, `TaxAccount`

### Methods
- **Controllers**: `index()`, `store()`, `show()`, `update()`, `destroy()`
- **Services**: `createUser()`, `updateUser()`, `deleteUser()`
- **Repositories**: `findById()`, `findByEmail()`, `create()`, `update()`

### Files
- **Controllers**: `UserController.php`
- **Services**: `UserService.php`
- **Jobs**: `ProcessTaxFileJob.php`
- **Requests**: `StoreUserRequest.php`

## Database Best Practices

### 1. Migrations
```php
// ✅ Good - Clear migration
Schema::create('events', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('title');
    $table->text('description')->nullable();
    $table->date('due_date');
    $table->timestamps();
    
    $table->index(['user_id', 'due_date']);
});
```

### 2. Model Relationships
```php
// ✅ Good - Clear relationships
class User extends Model
{
    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
    
    public function taxAccounts(): HasMany
    {
        return $this->hasMany(TaxAccount::class);
    }
}
```

### 3. Query Optimization
```php
// ✅ Good - Eager loading
$users = User::with(['events', 'taxAccounts'])->get();

// ❌ Bad - N+1 queries
$users = User::all();
foreach ($users as $user) {
    $user->events; // N+1 query
}
```

## Testing Best Practices

### 1. Feature Tests
```php
// ✅ Good - Feature test
test('user can create event', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($user)
        ->post('/events', [
            'title' => 'Test Event',
            'due_date' => '2024-12-31',
        ]);
    
    $response->assertRedirect('/events');
    $this->assertDatabaseHas('events', [
        'title' => 'Test Event',
        'user_id' => $user->id,
    ]);
});
```

### 2. Unit Tests
```php
// ✅ Good - Unit test
test('tax calculation service calculates correctly', function () {
    $service = new TaxCalculationService();
    $account = TaxAccount::factory()->create(['tax_rate' => 0.20]);
    
    $result = $service->calculateTax($account, 1000);
    
    expect($result)->toBe(200.0);
});
```

## Performance Best Practices

### 1. Database Optimization
```php
// ✅ Good - Efficient queries
$events = Event::select('id', 'title', 'due_date')
    ->where('user_id', auth()->id())
    ->where('due_date', '>=', now())
    ->orderBy('due_date')
    ->get();

// ❌ Bad - Inefficient queries
$events = Event::all()->filter(function ($event) {
    return $event->user_id === auth()->id() && $event->due_date >= now();
});
```

### 2. Caching
```php
// ✅ Good - Strategic caching
class TaxDataService
{
    public function getTaxRates(): array
    {
        return Cache::remember('tax_rates', 3600, function () {
            return TaxRate::all()->toArray();
        });
    }
}
```

### 3. Queue Usage
```php
// ✅ Good - Queue heavy operations
ProcessTaxFileJob::dispatch($taxFile);
SendEmailJob::dispatch($user, $message);
```

## Security Best Practices

### 1. Input Validation
```php
// ✅ Good - Form request validation
class StoreEventRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'due_date' => 'required|date|after:today',
        ];
    }
}
```

### 2. Authorization
```php
// ✅ Good - Policy-based authorization
class EventPolicy
{
    public function update(User $user, Event $event): bool
    {
        return $user->id === $event->user_id;
    }
}
```

### 3. Mass Assignment Protection
```php
// ✅ Good - Protected attributes
class User extends Model
{
    protected $fillable = ['name', 'email'];
    protected $guarded = ['id', 'password', 'admin'];
}
```

## Error Handling

### 1. Exception Handling
```php
// ✅ Good - Specific exception handling
try {
    $user = $this->userService->createUser($data);
} catch (ValidationException $e) {
    return back()->withErrors($e->errors());
} catch (DuplicateEmailException $e) {
    return back()->with('error', 'Email already exists');
}
```

### 2. Logging
```php
// ✅ Good - Strategic logging
Log::info('User created', ['user_id' => $user->id]);
Log::error('Tax calculation failed', ['error' => $e->getMessage()]);
```

## Quick Reference

### When to Extract Services
- [ ] Business logic in controllers
- [ ] Complex calculations
- [ ] External API integrations
- [ ] Email/notification logic
- [ ] Data transformation

### When to Extract Repositories
- [ ] Complex database queries
- [ ] Multiple data sources
- [ ] Query optimization needed
- [ ] Testing with mock data

### When to Extract Jobs
- [ ] Heavy operations
- [ ] External API calls
- [ ] Email sending
- [ ] File processing
- [ ] Data imports

### File Organization
- **Controllers**: `/app/Http/Controllers/`
- **Services**: `/app/Services/`
- **Repositories**: `/app/Repositories/`
- **Jobs**: `/app/Jobs/`
- **Requests**: `/app/Http/Requests/`
- **Models**: `/app/Models/`
- **Policies**: `/app/Policies/`

## Red Flags (When to Refactor)
- Controller method >20 lines
- Model method >15 lines
- Service method >30 lines
- Repeated database queries
- Business logic in controllers
- Complex conditional logic
- Hard to test
- Tight coupling

---

*Follow these guidelines for maintainable, testable, and scalable Laravel applications.*

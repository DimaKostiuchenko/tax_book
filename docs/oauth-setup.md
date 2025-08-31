# OAuth Setup Instructions

## Environment Variables

Add the following variables to your `.env` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback

# Facebook OAuth
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
FACEBOOK_REDIRECT_URI=http://localhost:8000/auth/facebook/callback
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:8000/auth/google/callback` (for development)
   - `https://yourdomain.com/auth/google/callback` (for production)
7. Copy the Client ID and Client Secret to your `.env` file

## Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select an existing one
3. Add Facebook Login product to your app
4. Go to "Facebook Login" → "Settings"
5. Add Valid OAuth Redirect URIs:
   - `http://localhost:8000/auth/facebook/callback` (for development)
   - `https://yourdomain.com/auth/facebook/callback` (for production)
6. Copy the App ID and App Secret to your `.env` file

## Testing

1. Start your Laravel development server: `php artisan serve`
2. Visit `http://localhost:8000/login`
3. Click on "Увійти через Google" or "Увійти через Facebook"
4. Complete the OAuth flow
5. You should be redirected to the dashboard after successful authentication

## Features

- ✅ Google OAuth integration
- ✅ Facebook OAuth integration
- ✅ Automatic user creation/login
- ✅ Token storage for API access
- ✅ Beautiful login page with color palette
- ✅ Responsive design
- ✅ Error handling
- ✅ Ukrainian language support

# 📰 EchoNow — Modern News Aggregator

EchoNow is a dynamic newspaper web application with role-based dashboards, article management, subscription models, and admin controls.

## 🔥 Key Features

- **Responsive Design** - Works on Mobile, Tablet, and Desktop
- **Firebase Authentication** - Secure email/password and Google login
- **Role-based Access** - Admin, Premium, and Normal user dashboards
- **Article Management** - Create, approve, and manage articles
- **Subscription System** - Premium features with Stripe payments
- **Dark/Light Theme** - Toggle between color schemes
- **Real-time Data** - Using TanStack Query for data fetching

## 🚀 Technologies

- React 18 + Vite
- Firebase Authentication
- TanStack Query (React Query)
- Tailwind CSS
- Stripe Payment Integration
- Recharts for Analytics
- React Hook Form
- Axios for API calls

## 🛠 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/for-Sifad99/Echonow-client.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` with your configuration

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Routes

### Public
- `/` - Home page
- `/auth/login` - Login
- `/auth/register` - Register
- `/all-articles` - Browse articles
- `/article/:id` - View article
- `*` - 404 page

### Private
- `/add-article` - Submit articles
- `/my-articles` - Manage your articles
- `/my-profile` - Profile settings
- `/premium-articles` - Premium content
- `/subscription` - Subscription options

### Admin
- `/Dashboard/dashboard` - Admin dashboard
- `/Dashboard/all-users` - User management
- `/Dashboard/all-articles` - Article moderation
- `/Dashboard/add-publisher` - Add publishers
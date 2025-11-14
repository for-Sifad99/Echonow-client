# 📰 EchoNow — Modern News Aggregator
EchoNow is a dynamic and modern newspaper web application that revolutionizes the way users consume news. From trending articles to premium content, subscription models, and admin controls — this full-stack app has everything to serve a real-world news platform experience.

The application features a responsive React frontend with Vite tooling, connected to an Express.js backend with MongoDB for data storage. It includes user authentication via Firebase, role-based access control, article management, subscription payments via Stripe, and comprehensive admin dashboard functionality.

---

- **Live Site:** [Live Demo!](https://echonow.netlify.app/)
- **Admin Email:** sifayed99@gmail.com
- **Admin Password:** @Admin1234

---

## 🔥 Features

- ✅ Fully responsive across **Mobile, Tablet, and Desktop** with Tailwind CSS
- ✅ Real-time **protected routes using Firebase authentication token**
- ✅ **Role-based dashboard** with different admin/user functionalities
- ✅ **Article submission** with filter, search, approval & premium tagging
- ✅ Premium users enjoy **exclusive features** and **unlimited posting**
- ✅ Uses `react-query` (TanStack) for all **GET** data fetching
- ✅ Environment variables secure **Firebase & MongoDB secrets**
- ✅ Smooth UI/UX with **private & public routes**
- ✅ **Pagination** support on `All Articles` page
- ✅ **Carousel slider** for trending articles on homepage
- ✅ **Dark/Light theme** toggle functionality
- ✅ **Social login** with Google
- ✅ **Subscription system** with Stripe payment integration
- ✅ **Admin panel** with user management, article approval, and publisher management
- ✅ **Email verification** system for user authentication
- ✅ **Analytics dashboard** with interactive charts for admin insights
- ✅ **Smart premium modal** that auto-triggers after 10 seconds on homepage

---

## 🚀 Technologies Used

### Frontend
- **React 18** with **Vite**
- **Firebase Authentication**
- **React Router DOM v7**
- **TanStack Query (React Query) v5** for data fetching and caching
- **Tailwind CSS v4** for responsive styling
- **Material UI (MUI)** components
- **Stripe** Payment Integration
- **Recharts** for data visualization
- **GSAP** for animations
- **Swiper** and **React Slick** for carousels
- **React Icons** and **Lucide React** for icons
- **React Hook Form** for form validation
- **Axios** for API calls
- **Sonner** for toast notifications
- **React Loading Skeleton** for loading states

### Backend
- **Node.js** with **Express.js** framework
- **MongoDB** with **MongoDB Atlas** for database
- **Firebase Admin** for server-side authentication
- **Stripe** for payment processing
- **Nodemailer** for email services
- **CORS** for cross-origin resource sharing

---

### Public Routes:

- `/` - Home page with trending articles (carousel), publishers, statistics, subscription plans & more
- `/auth/login` - Login form with validations and Google authentication
- `/auth/register` - Register form with complex password validations
- `/all-articles` - Searchable and filterable list of approved articles with pagination
- `/our-blogs` - Static blog posts section
- `/article/:id` - View single article (public access) with view count tracking
- `*` - Custom 404 Not Found page

### Private Routes:

- `/add-article` - Post articles (normal users: 1 post max; premium: unlimited)
- `/my-articles` - User's own articles (edit/delete/view status)
- `/my-profile` - View and update profile info with email verification
- `/premium-articles` - Premium-only articles view with subscription validation
- `/subscription` - Subscription packages & payment flow
- `/payment/:duration/:cost` - Payment processing page with Stripe integration

### Admin Routes:

- `/Dashboard/dashboard` - Role-based sidebar dashboard with analytics charts
- `/Dashboard/all-users` - Manage users (Make Admin and handle users)
- `/Dashboard/all-articles` - Approve/Decline/Make Premium articles with filtering
- `/Dashboard/add-publisher` - Add new publishers to the platform

---

## 🔐 Authentication

- Firebase Email/Password + Google Login with OAuth 2.0
- Secure Firebase authentication token stored in **localStorage** with automatic refresh
- Private routes remain intact even after reload using persistent login
- Protected admin routes based on user role (user/admin)
- Email verification system with OTP for enhanced security
- Role-based access control with context API for state management
- Automatic session management and token validation

---

## 🏗 Application Architecture

### Frontend Structure
- **Component-based architecture** with reusable UI components
- **Context API** for state management (Auth, Theme)
- **Custom hooks** for reusable logic (useAuth, useAxios, useDbUser)
- **Protected routes** with role-based access control
- **Responsive design** with mobile-first approach
- **Lazy loading** for improved performance

### Backend Structure
- **RESTful API** architecture with Express.js
- **MongoDB** with Mongoose-like operations for data storage
- **Middleware** for authentication and authorization
- **Controller-Routes** pattern for organized code structure
- **Environment-based configuration** for different deployments
- **Error handling** with centralized error management

---

## ⚙️ Environment Variables

You need to setup `.env.local` file:

```env
# 🔹 Firebase Config
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID

# 🔹 Image Upload Key
VITE_image_upload_key=YOUR_IMAGE_UPLOAD_KEY

# 🔹 Payment Gateway (Stripe) Keys
VITE_payment_key=YOUR_STRIPE_PUBLIC_KEY

# 🔹 Server URL
VITE_SERVER_URL=http://localhost:5001
```

---

## 🛠 Installation & Setup

### Frontend Setup

1. Clone the client repo
   ```bash
   git clone https://github.com/for-Sifad99/Echonow-client.git
   ```

2. Navigate to the project directory
   ```bash
   cd echonow-client
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and add your environment variables

5. Start the development server
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the server directory
   ```bash
   cd ../echonow-server
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables

4. Start the development server
   ```bash
   npm run dev
   ```

> **Note:** Both frontend and backend servers need to be running simultaneously for the application to work correctly.

---

## 💡 Unique Features

1. Real-time publisher stats shown with **interactive Pie Chart** using Recharts
2. **Advanced analytics** for admins: Line, Bar, and Area charts with live data updates
3. Trending articles auto-detected and highlighted based on **view count** with automatic tracking
4. Smart Premium Modal → auto-triggers after 10s on homepage for **subscription** with localStorage tracking
5. Dynamic publisher assignment → admin can **approve/decline** posts and assign publisher roles
6. **Context-aware alerts** → Toast & SweetAlert customized for each action (CRUD/auth)
7. **Responsive carousel slider** for trending articles on homepage using Swiper
8. **Theme switching** between light and dark modes with persistent user preference
9. **Role-based dashboard** with different views for users and admins
10. **Article approval workflow** with status tracking (pending, approved, declined)
11. **Subscription management** with premium user validation and expiration tracking
12. **Email verification** system with OTP for enhanced account security

---

## 🔮 Future Updates

This project is just the beginning. In the future, many exciting features and improvements will be added to make the platform more powerful, user-friendly, and engaging. Planned updates include:

- **AI-powered content recommendation** based on user reading history
- **Mobile app** development for iOS and Android
- **Advanced search** with filters and sorting options
- **Commenting system** for user engagement
- **Social sharing** features for articles
- **Newsletter subscription** with personalized content
- **Multi-language support** for global accessibility
- **Enhanced analytics** with user behavior tracking

Stay tuned for these upcoming updates!

---

## 🪶 Notes

You can paste this entire block into your `README.md` file in the client repo.

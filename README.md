# 📰 EchoNow — Modern News Aggregator

**Live Site:** [https://echonow-client.web.app](https://echonow-client.web.app)  
**Admin Email:** admin@echonow.com  
**Admin Password:** Admin@123  

EchoNow is a dynamic and modern newspaper web application that revolutionizes the way users consume news. From trending articles to premium content, subscription models, and admin controls — this full-stack app has everything to serve a real-world news platform experience.

## 🔥 Features

✅ Fully responsive across **Mobile, Tablet, and Desktop**  
✅ Email/password and Google **authentication**  
✅ Real-time **JWT protected routes**  
✅ **Role-based dashboard** with different admin/user functionalities  
✅ Article submission, filtering, searching, approval & premium tagging  
✅ Premium users get **exclusive features** and **unlimited posting**  
✅ Uses `react-query` (TanStack) for all **GET** data fetching  
✅ Environment variables hide **Firebase & MongoDB secrets**  
✅ Custom **toast notifications** for CRUD/auth actions  
✅ Sweet UI/UX with conditional rendering and private/public routes  
✅ **Charts** and visual data analytics for admin using `react-google-charts`  
✅ Premium modal shown after **10 seconds** on homepage  
✅ Admin can approve/decline posts and assign **publishers dynamically**  
✅ **Pagination** support on dashboard (Admin: All Users, All Articles)

---

## 🚀 Technologies Used

- **React**
- **Firebase Authentication**
- **React Router DOM**
- **TanStack Query**
- **SweetAlert2 / React Hot Toast**
- **Imgbb / Cloudinary**
- **Tailwind CSS**
- **React Google Charts**
- **React CountUp**
- **React Leaflet**
- **GSAP (for animations)**
- **React Simple Typewriter**

---

## 📁 Pages & Routes

### Public Routes:
- `/` - Home page with trending articles (slider), publishers, statistics, subscription plans & more
- `/login` - Login form with validations
- `/register` - Register form with complex password validations
- `/all-articles` - Searchable and filterable list of approved articles
- `/article/:id` - View single article (only for logged-in users)
- `*` - Custom 404 Not Found page

### Private Routes:
- `/add-article` - Post articles (normal users: 1 post max; premium: unlimited)
- `/my-articles` - User’s own articles (edit/delete/view status)
- `/profile` - View and update profile info
- `/premium-articles` - Premium-only articles view
- `/subscription` - Subscription packages & payment flow

### Admin Routes:
- `/dashboard` - Role-based sidebar dashboard
  - `/dashboard/all-users` - Manage users (Make Admin)
  - `/dashboard/all-articles` - Approve/Decline/Make Premium articles
  - `/dashboard/add-publisher` - Add new publishers
  - `/dashboard/charts` - Analytics with dynamic Pie, Bar, Line Charts

---

## 🔐 Authentication

- Firebase Email/Password + Google Login
- Secure JWT stored in **localStorage**
- Private routes remain intact even after reload using persistent login
- Protected admin routes based on user role

---

## 🌍 Environment Variables

`.env` file is used to securely hide credentials:  
```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket_name
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key

---

## 🛠 Installation & Setup

# Clone the client repo
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-for-Sifad99.git

# Navigate to the project directory
cd echonow-client

# Install dependencies
npm install

# Start the development server
npm run dev

---

## 💡 Unique Functionalities

- Toast and SweetAlert feedback for all actions
- JWT Auth with reload persistence
- Dynamic publisher stats (Pie Chart)
- Extra charts (Line, Bar, Area)
- Trending articles based on view count
- Filter/Search by title, tags, publisher
- Homepage modal after 10s for premium upsell
- Role-based UI rendering with clean dashboard

---

## 🤝 Contributing
We’re actively looking for passionate developers who want to make an impact! If you’d like to contribute, submit a pull request or reach out!



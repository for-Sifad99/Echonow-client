# 📰 EchoNow — Modern News Aggregator

- **Live Site:** [Live Demo!](https://echonow.netlify.app/)  
- **Admin Email:** sifayed99@gmail.com
- **Admin Password:** @Admin1234

EchoNow is a dynamic and modern newspaper web application that revolutionizes the way users consume news. From trending articles to premium content, subscription models, and admin controls — this full-stack app has everything to serve a real-world news platform experience.

## 🔥 Features

✅ Fully responsive across **Mobile, Tablet, and Desktop**  
✅ Real-time **protected routes using Firebase authentication token**  
✅ **Role-based dashboard** with different admin/user functionalities  
✅ **Article submission** with filter, search, approval & premium tagging  
✅ Premium users enjoy **exclusive features** and **unlimited posting**  
✅ Uses `react-query` (TanStack) for all **GET** data fetching  
✅ Environment variables secure **Firebase & MongoDB secrets**  
✅ Smooth UI/UX with **private & public routes** 
✅ **Pagination** support on `All Articles` page

---

## 🚀 Technologies Used

- **React**
- **Firebase Authentication**
- **React Router DOM**
- **TanStack Query**
- **SweetAlert2 / React Hot Toast**
- **Imgbb**
- **Tailwind CSS**
- **Material UI (MUI)**
- **Stripe (Payment Integration)**
- **Recharts / react-google-charts (Data Visualization)**
- **GSAP (Animation Library)**
- **React CountUp**
- **React Simple Typewriter**
- **React Icons**
- **React Hook Form**
- **React Helmet Async (SEO)**
- **React Loading Skeleton**
- **React Select**
- **LDRS (Loaders)**
- **Axios (API calls)**
- **Clsx (Conditional classNames)**

---

### Public Routes:

- `/` - Home page with trending articles (slider), publishers, statistics, subscription plans & more
- `/auth/login` - Login form with validations
- `/auth/register` - Register form with complex password validations
- `/all-articles` - Searchable and filterable list of approved articles
- `/our-blogs` - Showed some relevant static blogs card
- `*` - Custom 404 Not Found page

### Private Routes:

- `/article/:id` - View single article (only for logged-in users)
- `/add-article` - Post articles (normal users: 1 post max; premium: unlimited)
- `/my-articles` - User’s own articles (edit/delete/view status)
- `/my-profile` - View and update profile info
- `/premium-articles` - Premium-only articles view
- `/subscription` - Subscription packages & payment flow

### Admin Routes:

- `/dashboard/dashboard` - Role-based sidebar dashboard
  - `/dashboard/all-users` - Manage users (Make Admin and handle users)
  - `/dashboard/all-articles` - Approve/Decline/Make Premium articles
  - `/dashboard/add-publisher` - Add new publishers

---

## 🔐 Authentication

- Firebase Email/Password + Google Login
- Secure Firebase authentication token stored in **localStorage**
- Private routes remain intact even after reload using persistent login
- Protected admin routes based on user role

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

## 💡 Unique Features

✨ Real-time publisher stats shown with **interactive Pie Chart**
✨ **Advanced analytics** for admins: Line, Bar, and Area charts with live data updates
✨ Trending articles auto-detected and highlighted based on **view count**
✨ Smart Premium Modal → auto-triggers after 10s on homepage for **subscription**
✨ Dynamic publisher assignment → admin can **approve/decline** posts and assign publisher roles
✨ **Context-aware alerts** → Toast & SweetAlert customized for each action (CRUD/auth)

---

## 🔮 Future Updates

This project is just the beginning. In the future, many exciting features and improvements will be added to make the platform more powerful, user-friendly, and engaging. Stay tuned for upcoming updates!
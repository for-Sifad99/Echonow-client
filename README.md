# 📰 EchoNow — Modern News Aggregator
EchoNow is a dynamic and modern newspaper web application that revolutionizes the way users consume news. From trending articles to premium content, subscription models, and admin controls — this full-stack app has everything to serve a real-world news platform experience.

---

- **Live Site:** [Live Demo!](https://echonow.netlify.app/)  
- **Admin Email:** sifayed99@gmail.com
- **Admin Password:** @Admin1234

---

## 🔥 Features

- ✅ Fully responsive across **Mobile, Tablet, and Desktop**  
- ✅ Real-time **protected routes using Firebase authentication token**  
- ✅ **Role-based dashboard** with different admin/user functionalities  
- ✅ **Article submission** with filter, search, approval & premium tagging  
- ✅ Premium users enjoy **exclusive features** and **unlimited posting**  
- ✅ Uses `react-query` (TanStack) for all **GET** data fetching  
- ✅ Environment variables secure **Firebase & MongoDB secrets**  
- ✅ Smooth UI/UX with **private & public routes** 
- ✅ **Pagination** support on `All Articles` page

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

## ⚙️ Environment Variables

You need to setup `.env`file:

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
```

---

## 🛠 Installation & Setup

1. Clone the client repo
   - git clone https://github.com/for-Sifad99/Echonow-client.git

2. Navigate to the project directory
   - cd echonow-client

3. Install dependencies
   - npm install

4. Start the development server
   - npm run dev

---

## 💡 Unique Features

1. Real-time publisher stats shown with **interactive Pie Chart**
2. **Advanced analytics** for admins: Line, Bar, and Area charts with live data updates
3. Trending articles auto-detected and highlighted based on **view count**
4. Smart Premium Modal → auto-triggers after 10s on homepage for **subscription**
5. Dynamic publisher assignment → admin can **approve/decline** posts and assign publisher roles
6. **Context-aware alerts** → Toast & SweetAlert customized for each action (CRUD/auth)

---

## 🔮 Future Updates

This project is just the beginning. In the future, many exciting features and improvements will be added to make the platform more powerful, user-friendly, and engaging. Stay tuned for upcoming updates!

---

## 🪶 Notes

You can paste this entire block into your `README.md` file in the client repo. 
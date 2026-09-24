# AI_BRAIN.md — Project Memory for ShopHub

This file is my persistent memory of the **ShopHub** project. Read it at the start of every session before making changes.

---

## 🏗️ What Is This Project?

An e-commerce **bookstore** ("ShopHub") with:
- **React 19 + Vite (rolldown-vite) + Tailwind CSS v4** frontend
- **Node.js + Express 5 + MongoDB (Mongoose 9)** backend
- **JWT cookie-based auth** with role-based access (User / Admin)
- **Cloudinary** for book image uploads
- Glassmorphism UI, charcoal flat theme (`bg-slate-950`) with neon-lime accents (`lime-400/500/300`) (NO purple/violet/fuchsia — replaced Sep 2026; emerald/teal/cyan → lime Sep 2026)

Project root: `D:\Junaid Mansuri\Desktop\crud` (git repo)
Remote: `thedevmj/online-shopping-center` on GitHub (branch `main`)

---

## 📦 Monorepo Layout

```
crud/
├── package.json          # ROOT: shared/mixed deps (axios, express, mongoose, react-router...). NO scripts.
├── .env                  # Dev env vars (Port 3000, JWT, Cloudinary) — ignored by git
├── API_CONNECTIONS_AND_CAREER_VALUE.md   # API roadmap doc / portfolio analysis (stale, aspirational)
├── AI_BRAIN.md           # ← this file
├── client/               # React frontend (Vite)
│   ├── index.html        # title still says "client"
│   ├── vite.config.js    # react + @tailwindcss/vite plugins
│   └── src/
│       ├── main.jsx      # Entry: BookContext > BrowserRouter > ToastContainer > App
│       ├── App.jsx       # All routes defined here
│       ├── config.js     # API_BASE_URL (VITE_API_URL || http://localhost:3000)
│       ├── api/bookapi.jsx   # ALL axios/fetch API calls (single place)
│       ├── context/(empty)  # unused
│       ├── routes/       # ProtectedRoutes.jsx, AdminRoute.jsx (role-check only)
│       ├── component/    # pages/feature components
│       └── component/AdminComponents/  # AdminStats, BookManagement, OrderManagement, UserManagement (lazy-loaded)
└── server/               # Express backend (CommonJS)
    ├── index.js          # entry: loads app + db
    ├── app.js            # express app, CORS, cookie-parser, fileUpload, mounts routes
    ├── db.js             # mongoose connect (local: mongodb://localhost:27017/bookStore)
    ├── config/           # cloudinary.js, config.env (gitignored)
    ├── routes/           # book.routes.js, auth-routes.js
    ├── controller/       # book.controller.js, usercontroller.js
    ├── middleware/       # authMiddleware.js (verifyToken, isAdmin)
    ├── model/            # user, book.model, cart, categories, Favorite, order
    └── services/test.js  # unused placeholder
```

---

## 🚀 Commands

```bash
# Backend (server/ dir)
npm run dev        # nodemon index.js  (port 3000)

# Frontend (client/ dir)
npm run dev        # Vite dev (default http://localhost:5173)
npm run build      # Vite build
npm run lint       # ESLint
```

- Backend & frontend must run in **separate terminals**.
- MongoDB must be running locally (`mongodb://localhost:27017/bookStore`) unless `MONGODB_URI`/`DATABASE_URL` is set.

---

## 🔐 Auth Flow

- **User model** (`server/model/user.js`): email (unique/lowercase), password (min 6, `select:false`, bcrypt-hashed via `pre("save")`), role (`User`|`Admin`, default User), status (`active`|`inactive`).
- `getSignedJwtToken()` signs `{id, role}` with `JWT_SECRET`, expires `JWT_EXPIRE` (7d).
- Login/Register set an **httpOnly cookie** `authToken` (7d, sameSite strict). Token also returned in JSON.
- `verifyToken` (`server/middleware/authMiddleware.js:5`) reads `req.cookies.authToken` OR `Authorization: Bearer`. Side-effect: also caches... it sets `req.user = decoded`.
- `isAdmin` checks `req.user.role === "Admin"` (403 otherwise).
- **Client role handling**: `localStorage.setItem("user", data.user.role)` after login. `ProtectedRoutes.jsx` checks `localStorage.user === "User"`; `AdminRoute.jsx` redirects role==="User" to `/shopping` and missing role to `/Login`. This is a **role name check, NOT real token verification** — refresh / no-token users can still pass if the string matches.
- `LoginForm.jsx` uses raw `fetch` with `credentials: "include"`; logout via `Leok`... uses `/auth/user/logout`.

---

## 🌐 Server Routes (mounted in `server/app.js`)

Base `/api/book` (`server/routes/book.routes.js`):
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/getall` | public | all books, populate category |
| POST | `/addbook` | verifyToken + isAdmin | multipart with `image` file → Cloudinary |
| GET | `/:id` | verifyToken + isAdmin | book by id |
| PUT | `/update/:id` | verifyToken + isAdmin | partial fields only (no category/image) |
| DELETE | `/delete/:id` | verifyToken + isAdmin | |
| GET | `/getcategories` | public | categories |
| POST | `/category` | verifyToken + isAdmin | ⚠️ BUG: `name` not saved |
| POST | `/addtocart` | verifyToken | `{bookId, quantity}` |
| GET | `/getallcarts` | verifyToken | user cart, populated |
| GET | `/findbook/:id` | verifyToken | cart lookup |
| DELETE | `/deletecart/:id` | verifyToken | pulls item by item._id |
| PUT | `/favorite/:id` | verifyToken | body `{bookId}`, upsert favorite:true |
| GET | `/favoritebooks` | verifyToken | user favorites, populate book |
| DELETE | `/removefromfavorite/:id` | verifyToken | |

Base `/auth/user` (`server/routes/auth-routes.js`):
| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/register` | public | create user + cookie |
| POST | `/login` | public | sets status active + cookie |
| POST | `/logout` | verifyToken | sets status inactive, clears cookie |
| GET | `/me` | none | ⚠️ checkAuth uses `req.User` (uppercase) — broken, no middleware |
| GET | `/getuserdetails` | public | **all users** (leaky — meant for admin) |
| POST | `/userorder` | verifyToken | create/update order (upsert per user) |
| GET | `/getuserorder` | public | ⚠️ all orders (admin view) |
| GET | `/orderbyid` | verifyToken | user's orders |
| PUT | `/:id` | none | ⚠️ changeOrderStatus needs `{status}` body; `type: mongodb`? client sends no body → broken |

---

## 🗄️ MongoDB Models

| Model | File | Key fields / Notes |
|---|---|---|
| User | `model/user.js` | see Auth section |
| books | `model/book.model.js` | bookname, bookTitle, bookAuthor, bookPrice(String!), publishDate, bookCategory(ObjectId→categories), stock, image(Cloudinary URL), description |
| categories | `model/categories.js` | name (unique, required), isDefault |
| Cart | `model/cart.js` | user(ObjectId→User), items[] {book(ObjectId→books), quantity} |
| favBook | `model/Favorite.js` | user(ObjectId→ `"user"` ref mismatch ⚠️ model is "User"), book(ObjectId→books), favorite(bool) |
| Order | `model/order.js` | user, items[]{book,title,priceAtPurchase,quantity}, totalAmount, paymentId, paymentStatus(pending/completed/failed), orderStatus(processing/shipped/delivered/cancelled) |

⚠️ Common gotcha: `Favorite.js` refs `"user"` (lowercase) but the User model registers as `"User"`. `populate("user")` on favorites will not populate.

---

## 🖥️ Frontend Pages / Components (`client/src/component/`)

| Component | Route (App.jsx) | Purpose |
|---|---|---|
| HeroLanding | `/` | landing page |
| LoginForm | `/Login` | login (raw fetch) |
| Signup | `/signup` | register (uses `createUser`) |
| Shophub_cart | `/shopping` | book storefront: category filter, search, price/az sort, favorites toggle, Buy Now → OrderCart |
| OrderCart | `/ordercart` | single-book detail + Add to Cart / Buy Now (reads selectedBook from localStorage + BookContext) |
| Allusercarts | `/allcarts` | view cart items, remove items |
| Favorites | `/favorites` | favorite books |
| UserOrders | `/orders` | user orders |
| Vieworder | `/vieworder` | order view |
| Userdashboard | `/userdashboard` | user hub (some paths are placeholders: /profile, /settings) |
| Admindashboard | `/admindashboard` | tabs: AdminStats/BookManagement/OrderManagement/UserManagement (React.lazy) |
| AdminHome | `/adminhome` | Add Book form (FormData + Cloudinary image) |
| Update_books | `/updateBook` | edit/delete books |
| Navbar | global | dynamic by role, cart badge **hardcoded 3**, categories dropdown, filter, mobile menu |
| Logout | — | modal confirm logout |
| Toast | global | showToast("msg","success"/"error"/"info") |
| Billboard | inside Shophub | auto-rotating book carousel |
| BookContext | global context | selectedBook, books (fetched once, cached in state) |

**API layer**: `client/src/api/bookapi.jsx` exports createUser, LoginUser, LogoutUser, createbook, getallbooks, getcartById, getusers, Updatebooks, Deletebook, getallCategories, cartadd, getallCarts, deleteCart, addtoFavorite, getallfavorite, removeFromfav, createOrder (raw fetch), getallOrders, getorderById, orderstatus (⚠️ no body sent).

Base URLs from `src/config.js`: `API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"`.

---

## ⚠️ Known Bugs / Issues (found during analysis — verify before relying)

1. **`save_category`** (`book.controller.js:143`) — `categories.create({})` never saves the `name`. Category creation silently saves empty docs.
2. **`checkAuth`** (`usercontroller.js`) — reads `req.User._id` (uppercase) which is never set → always 500. Route `/auth/user/me` also has no `verifyToken`.
3. **`addUser`** (`usercontroller.js:5`) — on error only `console.log`, no HTTP response → client hangs on register failure.
4. **`manageOrders`** ✅ FIXED — now `order.create(...)` creates a NEW order per purchase (was: one upserted order per user that accumulated items).
5. **`getOrderByid`** ✅ FIXED — returns `data: []` when a user has no orders (was: no response → client hangs).
6. **Favorite ref mismatch** — model refs `"user"` but Mongoose model is named `"User"`.
7. **Route guards are role-string checks** — `ProtectedRoutes.jsx` compares `localStorage.getItem("user") === "User"`; not token-validated. Stale/forged values pass.
8. **`bookPrice` stored as String** — sorting compares `Number()` (client does this ok, but DB stores text).
9. **Cart model `items[]` uses ref "books"** — matches Book model name `books` ✓.
10. **Root `package.json` vs `client/package.json`** — client code imports `axios` and `react-router-dom`, but client deps only list `react-router-dom`; `axios` lives in root package.json (hoisted via node_modules). Fragile if root package.json is ignored.
11. **Navbar cart badge** hardcoded to `3`.
12. **`changeOrderStatus`** ✅ FIXED (now responds 500 on error). Admin OrderManagement now imports `showToast` and sends `{status}` body; unused `orderstatus` api fn left in bookapi.jsx.
13. `index.html` title is still "client", not "ShopHub".

## ✅ Order Purchase Flow (fixed Sep 2026)
1. Shop "Buy Now" → `OrderCart` (`/ordercart`) → "Buy Now" → `UserOrders` (`/orders`, the checkout page).
2. `UserOrders` "Purchase" → `createOrder()` → `POST /auth/user/userorder` → server `manageOrders` creates a **new** Order doc (201).
3. On success: imports/uses `showToast` → "Order purchased successfully!" → clears `selectedBook` → `navigate("/vieworder")`.
4. `ViewOrder` (`/vieworder`) fetches `GET /auth/user/orderbyid` → shows each order with $ total + status badge (lime). Users can cancel via `PUT /auth/user/cancelorder/:id` — allowed ONLY while `orderStatus === "processing"` AND within 24h of `createdAt` (`CANCEL_WINDOW_MS` in usercontroller). Cancelled orders show a red badge; a "Cancel window expired" chip shows when past 24h. Frontend gates the button the same way (`canCancel()` in Vieworder.jsx).
5. Navbar "Orders" link + post-purchase redirect both go to `/vieworder`.

---

## 🎨 UI Conventions

- **Theme**: charcoal flat backgrounds (`bg-slate-950`, NO via-teal/via-slate gradients), neon-lime primary accent (`lime-400/500` gradients, `lime-300` text, `lime-400` icons) + subtle blue (`blue-400/500/10`) secondary glow blobs, glassmorphism (`backdrop-blur-xl bg-white/10 border border-white/20`).
- **Contrast rule**: buttons with `from-lime-400 to-lime-500` gradients MUST use `text-slate-950` (NOT `text-white` — lime is too bright for white text).
- **NO violet/purple/fuchsia/pink/indigo anywhere** — user requirement.
- Cards: `rounded-3xl shadow-2xl p-6`.
- Feedback: `showToast()` from `Toast.jsx` (must be imported where used).
- Admin dashboard uses React.memo + lazy + Suspense pattern.
- Animated blurred blobs (`animate-pulse`, `animation-delay-*` keyframes) on page backgrounds.

---

## 📌 Style / Conventions for My Changes

- **Backend**: CommonJS (`require`/`module.exports`), camelCase, controllers throw/catch with `res.status(500).json({message, error})`, JWT `req.user`, admin routes = `verifyToken, isAdmin`.
- **Frontend**: React function components, hooks (`useCallback`, `useMemo`), fetch or axios, `credentials: "include"`, heroicons, Tailwind utility classes.
- **DO NOT add comments** unless the user asks.
- **DO NOT commit** unless explicitly asked.
- Lint: `npm run lint` in `client/`. No server lint/test scripts.

---

## 🎯 Roadmap That Was Intended (from API_CONNECTIONS doc, mostly implemented)

✅ Auth · ✅ Books CRUD · ✅ Categories · ✅ Cart · ✅ Orders · ✅ Favorites · ✅ Admin/stats. Payment (Stripe dep is installed in server but **not wired**), deploy (Render is referenced in db.js), Docker, CI/CD → not done.
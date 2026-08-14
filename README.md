# Sweety Beauty Studio and Spa - POS Billing System

A modern, PWA-enabled Point of Sale (POS) billing and management system built for **Sweety Beauty Studio and Spa**, Peroorkada, Trivandrum. It handles quick invoice generation, WhatsApp delivery of digital receipts, order history, and detailed sales analytics.

## Features

### 🧾 POS Billing Panel
- Quick invoice generator with a searchable service catalog
- Add custom items with price and quantity controls
- Manual discounts (fixed ₹ or percent %)
- Apply GST with configurable percentage
- Optional delivery fee
- Cash payment tracking with auto-calculated change return
- Backdate support (custom / past bill dates)
- Online / Offline (POS) order source toggle
- Send bill directly to the customer via WhatsApp with a digital invoice link

### 📜 Order History
- Search orders by ID, customer name, or phone number
- Filter by source (Online / Offline) and status
- Period filters (All Time, Today, Week, Month, Year, Custom range)
- View detailed order modal
- Print / download invoice as PDF
- Resend invoice via WhatsApp
- Export filtered orders to CSV (admin only)
- Delete invoices (admin only)

### 📊 Analytics Dashboard (Admin only)
- KPIs: total revenue, completed bills, offline/online split, items sold, avg order value
- Today's Sales tab with revenue, bills, items sold, and top items
- Monthly and weekly revenue trend charts
- Service (product) sales leaderboard with market share
- Coupon / promo campaign performance tracking
- Custom period filters and contact/invoice search

### 📱 PWA & Mobile
- Installable as a standalone app
- Offline-first service worker with network-first caching
- Responsive mobile-friendly UI

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Supabase](https://supabase.com) (PostgreSQL backend)
- [lucide-react](https://lucide.dev) (icons)

## Getting Started

### Prerequisites

- Node.js (v20 or later recommended)
- npm
- A Supabase project with the schema described below

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd Sweety-POS
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# POS access passcodes (optional, defaults are used if unset)
ADMIN_PASSCODE=your-admin-passcode
STAFF_PASSCODE=your-staff-passcode
```

> **Note:** If passcodes are not set, the built-in defaults are used. Change them in production.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- Public store page: `/`
- POS terminal: `/pos/admin/secure/control-panel/sweety-beauty-studio`
- Digital invoice: `/invoice/[invoice-id]`

## Database Schema

Create these tables in your Supabase project.

### `customers`

| Column | Type | Notes |
| ------ | ---- | ----- |
| `id` | `uuid` | Primary key, default `gen_random_uuid()` |
| `name` | `text` | Customer name |
| `phone` | `text` | Unique. Stores phone + order metadata (see note) |
| `created_at` | `timestamptz` | Default `now()` |

> **Note:** The `phone` field stores a composite value like `phone_name_timestamp_DATE:<timestamp>` to support backdated orders. Invoice pages parse the phone prefix (`split("_")[0]`) to display the number.

### `products` (Catalog)

| Column | Type | Notes |
| ------ | ---- | ----- |
| `id` | `uuid` | Primary key |
| `name` | `text` | Service / product name |
| `description` | `text` | Optional description |
| `default_price` | `numeric(10,2)` | Default price |
| `category` | `text` | Category label |

### `orders`

| Column | Type | Notes |
| ------ | ---- | ----- |
| `id` | `text` | Primary key, e.g. `INV-2026-ABC12` |
| `customer_id` | `uuid` | FK → `customers(id)` |
| `source` | `text` | `ONLINE` or `OFFLINE` |
| `status` | `text` | `COMPLETED` / `PENDING` |
| `subtotal` | `numeric(10,2)` | Pre-discount total |
| `discount_type` | `text` | `PERCENT` or `FIXED` |
| `discount_value` | `numeric(10,2)` | Discount input value |
| `discount_amount` | `numeric(10,2)` | Calculated discount |
| `delivery_fee` | `numeric(10,2)` | Delivery fee |
| `grand_total` | `numeric(10,2)` | Final total |
| `cash_received` | `numeric(10,2)` | Cash paid by customer |
| `created_at` | `timestamptz` | Default `now()` |

### `order_items`

| Column | Type | Notes |
| ------ | ---- | ----- |
| `id` | `uuid` | Primary key |
| `order_id` | `text` | FK → `orders(id)` |
| `snapshot_name` | `text` | Item name at time of sale |
| `snapshot_price` | `numeric(10,2)` | Item price at time of sale |
| `quantity` | `int` | Quantity sold |

> GST is stored as an additional order item named `GST (X%)`.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
├── app/
│   ├── components/
│   │   └── PWAHandler.tsx        # Service worker registration & install prompt
│   ├── invoice/
│   │   └── [id]/page.tsx         # Public printable digital invoice
│   ├── pos/
│   │   ├── actions.ts            # Passcode verification server action
│   │   └── admin/secure/control-panel/
│   │       └── sweety-beauty-studio/page.tsx   # POS dashboard
│   ├── layout.tsx                # Root layout + PWA metadata
│   ├── page.tsx                  # Public store directory page
│   └── globals.css               # Global styles & Tailwind theme
├── lib/
│   └── supabase.ts               # Supabase client
├── public/
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker (network-first)
│   └── logo.png / icon.png       # App icons
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Roles

- **Staff** — Can access the Billing Panel and Order History.
- **Admin** — Full access, including the Analytics Dashboard and the ability to delete orders.

The role is determined by which passcode is used to log in.

## PWA Notes

- The app registers `/sw.js`, which uses a **network-first** caching strategy with an offline cache fallback.
- The manifest `start_url` points directly to the POS terminal for standalone app mode.
- PWA install prompt appears on first visit (hidden on invoice pages and after installation).

## License

© 2026 Sweety Beauty Studio and Spa. All Rights Reserved.

Powered by [Cenexa Systems](https://www.cenexasystems.com/).

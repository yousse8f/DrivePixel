# Real Estate + Logistics + Transportation System

Complete Next.js 15 application with MySQL database for managing real estate properties, transportation services, and logistics operations.

## Features

- **Real Estate Management**: Browse, list, and manage properties
- **Transportation Services**: Book and track transport orders
- **Logistics Operations**: Create and monitor logistics requests
- **Admin Dashboard**: Complete management interface for administrators
- **Client Dashboard**: User-friendly interface for customers
- **Authentication**: Secure JWT-based authentication system
- **Role-Based Access**: Different permissions for admins and users

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MySQL with Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: JWT (JSON Web Tokens)
- **Maps**: Mapbox integration

## Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd mvp-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Update the following variables:
- `DATABASE_URL`: Your MySQL connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox API token

### 4. Set up the database

Run Prisma migrations:

```bash
npm run db:generate
npm run db:push
```

Alternatively, you can use the SQL script:

```bash
mysql -u username -p database_name < scripts/init-db.sql
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
mvp-site/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── dashboard/         # Client dashboard
│   ├── properties/        # Property pages
│   └── ...
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Prisma client
│   ├── middleware.ts     # API middleware
│   └── ...
├── prisma/               # Prisma schema
└── scripts/              # Database scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Properties
- `GET /api/properties` - List properties
- `POST /api/properties` - Create property (Admin)
- `GET /api/properties/[id]` - Get property details
- `PUT /api/properties/[id]` - Update property (Admin)
- `DELETE /api/properties/[id]` - Delete property (Admin)

### Transport
- `GET /api/transport` - List transport orders
- `POST /api/transport` - Create transport order
- `PUT /api/transport/[id]` - Update transport order

### Logistics
- `GET /api/logistics` - List logistics requests
- `POST /api/logistics` - Create logistics request
- `PUT /api/logistics/[id]` - Update logistics request

## Default Admin Account

After running the database initialization:
- Email: admin@example.com
- Password: admin123

**Important**: Change this password immediately in production!

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Prisma Studio

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for VPS hosting.

## License

MIT

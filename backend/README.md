# Backend API

A Node.js/Express backend API built with TypeScript for managing users, leads, and properties.

## Project Structure

```
backend/
├── src/
│   ├── server.ts           # Entry point
│   ├── routes/             # API routes
│   │   ├── authRoutes.ts
│   │   ├── usersRoutes.ts
│   │   ├── leadsRoutes.ts
│   │   └── propertiesRoutes.ts
│   ├── controllers/        # Business logic
│   │   ├── authController.ts
│   │   ├── usersController.ts
│   │   ├── leadsController.ts
│   │   └── propertiesController.ts
│   ├── models/             # Data models & schemas
│   │   ├── userModel.ts
│   │   ├── leadModel.ts
│   │   └── propertyModel.ts
│   └── utils/              # Helper functions
│       ├── validation.ts    # Zod schemas
│       ├── apiResponse.ts   # Response formatting
│       └── authUtils.ts     # Auth utilities
├── package.json
├── tsconfig.json
└── .env.example
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

3. **Update .env with your configuration:**
   ```
   PORT=5000
   JWT_SECRET=your-secret-key
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   NODE_ENV=development
   ```

## Running the Server

**Development mode (with hot reload):**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Run production build:**
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Users (Protected)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Leads (Protected)
- `POST /api/leads` - Create a new lead
- `GET /api/leads` - Get all user leads
- `GET /api/leads/:id` - Get specific lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Properties (Protected)
- `POST /api/properties` - Create a new property
- `GET /api/properties` - Get all user properties
- `GET /api/properties/:id` - Get specific property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Health Check
- `GET /api/health` - Server health status

## Authentication

Protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Technologies

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **bcrypt** - Password hashing
- **JWT** - Token authentication
- **PostgreSQL** - Database (pg driver)
- **CORS** - Cross-origin requests

## Notes

- Currently using in-memory storage for demo purposes
- Database integration with PostgreSQL can be added
- All endpoints include proper error handling and validation

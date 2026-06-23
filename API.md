
# APIs Present In Backend

Base URL:

```http
/api
```

---

# Authentication

### Login

```http
POST /api/auth/login
```

### Logout

```http
POST /api/auth/logout
```

### Current User

```http
GET /api/auth/me
```

### Refresh Token

```http
POST /api/auth/refresh
```

---

# Users

### Create User

```http
POST /api/users
```

Permission:

```txt
user.create
```

### Get All Users

```http
GET /api/users
```

Permission:

```txt
user.view
```

### Get User By ID

```http
GET /api/users/:id
```

### Update User

```http
PUT /api/users/:id
```

### Delete User

```http
DELETE /api/users/:id
```

### Toggle User Status

```http
PATCH /api/users/toggle-status/:id
```

---

# Roles

### Get Roles

```http
GET /api/roles
```

---

# Categories

### Create Category

```http
POST /api/categories
```

### Get Categories

```http
GET /api/categories
```

### Get Category

```http
GET /api/categories/:id
```

### Update Category

```http
PUT /api/categories/:id
```

### Delete Category

```http
DELETE /api/categories/:id
```

### Toggle Category Status

```http
PATCH /api/categories/toggle-status/:id
```

---

# Modules

### Create Module

```http
POST /api/modules
```

### Get Modules

```http
GET /api/modules
```

### Get Module

```http
GET /api/modules/:id
```

### Update Module

```http
PUT /api/modules/:id
```

### Delete Module

```http
DELETE /api/modules/:id
```

### Toggle Module Status

```http
PATCH /api/modules/toggle-status/:id
```

---

# Query Definitions

### Create Query

```http
POST /api/query-definitions
```

### Get Queries

```http
GET /api/query-definitions
```

### Get Query By ID

```http
GET /api/query-definitions/:id
```

### Update Query

```http
PUT /api/query-definitions/:id
```

### Delete Query

```http
DELETE /api/query-definitions/:id
```

---

## Query Access Management

### Assign Role

```http
PATCH /api/query-definitions/:id/assign-role
```

### Remove Role

```http
PATCH /api/query-definitions/:id/remove-role
```

### Assign User

```http
PATCH /api/query-definitions/:id/assign-user
```

### Remove User

```http
PATCH /api/query-definitions/:id/remove-user
```

### Deny User

```http
PATCH /api/query-definitions/:id/deny-user
```

### Remove Denied User

```http
PATCH /api/query-definitions/:id/remove-denied-user
```

---

## Query Lifecycle

### Publish Query

```http
PATCH /api/query-definitions/publish/:id
```

### Archive Query

```http
PATCH /api/query-definitions/archive/:id
```

### Rollback Query Version

```http
PATCH /api/query-definitions/rollback/:id
```

---

# SQL Engine

### Generate SQL

```http
POST /api/sql/generate
```

Body:

```json
{
  "queryId": "123",
  "payload": {}
}
```

This:

* Checks permissions
* Checks query is published
* Generates SQL
* Saves history
* Creates audit log

---

# Favorites

### Get Favorites

```http
GET /api/favorites
```

### Add Favorite

```http
POST /api/favorites
```

### Remove Favorite

```http
DELETE /api/favorites/:id
```

---

# Dashboard

### Admin Dashboard

```http
GET /api/dashboard/admin
```

Returns:

* Total Users
* Total Categories
* Total Modules
* Total Queries
* Total Generated Queries
* Today's Queries
* Monthly Queries
* Recent Activities
* Top Queries

---

# Search

### Global Search

```http
GET /api/search?q=keyword
```

Searches:

* Users
* Categories
* Modules
* Query Definitions

---

# Settings

### Get Settings

```http
GET /api/settings
```

### Update Settings

```http
PUT /api/settings
```

---

# What I Found Missing

The backend is around **70–80% complete**, but some important pieces still appear missing:

### 1. Query Execution API

Currently:

```txt
Generate SQL ✔
Execute SQL ✘
```

I only found SQL generation.

No endpoint like:

```http
POST /api/sql/execute
```

---

### 2. Query History APIs

Models exist:

```txt
QueryHistory Model ✔
```

But routes/controllers are missing.

Need:

```http
GET /api/history
GET /api/history/:id
```

---

### 3. Audit Log APIs

Models exist:

```txt
AuditLog Model ✔
```

But no routes.

Need:

```http
GET /api/audit
GET /api/audit/:id
```

---

### 4. Permission Management APIs

I found:

```txt
Role Model ✔
Permission Model ✔
```

But only:

```http
GET /api/roles
```

exists.

Missing:

```http
POST /api/roles
PUT /api/roles/:id
DELETE /api/roles/:id
GET /api/permissions
```

---

### 5. Module Wise Query APIs

Frontend will likely need:

```http
GET /api/modules/:id/queries
GET /api/categories/:id/modules
```

Not found.

---

### 6. User Accessible Query APIs

Very important.

Need:

```http
GET /api/my-queries
```

which returns only assigned queries.

Currently I don't see this.

---

### 7. Query Preview API

Useful before publish.

Example:

```http
POST /api/query-definitions/:id/preview
```

Not found.

---

### 8. Query Cloning API

Very useful for admin.

```http
POST /api/query-definitions/:id/clone
```

Not found.

---

### 9. Export APIs

Not found.

```http
GET /api/query-definitions/export
GET /api/history/export
```

---

### 10. Dashboard Analytics Expansion

Currently basic counts only.

Missing:

* Query usage trends
* Top users
* Category analytics
* Module analytics
* Monthly graphs

---

From what I see, the **core architecture is correct and quite solid**. Before starting the frontend, I would finish:

1. History APIs
2. Audit APIs
3. My Queries API
4. Permissions CRUD
5. Query Execute API (if required)
6. Dashboard Analytics

Those are the biggest remaining backend gaps.

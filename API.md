API LIST

AUTH
POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me

USERS
POST /api/users

GET /api/users

GET /api/users/:id

PUT /api/users/:id

DELETE /api/users/:id

PATCH /api/users/toggle-status/:id

ROLES
GET /api/roles

Category
POST /api/categories
GET /api/categories?page=1&limit=10
GET /api/categories?search=ucc
PUT /api/categories/:id
DELETE /api/categories/:id
PATCH /api/categories/toggle-status/:id
🧬 Express REST API Server

A modular Node.js + Express application serving both JSON-based API endpoints and basic web routes.
The API powers a research-focused site that manages posts, news, research projects, and team members.

⚙️ Features

✅ Modular architecture (controllers, routes, models, middleware)

✅ RESTful API under /api

✅ Web routes under /

✅ Request validation for POST / PUT / PATCH

✅ Centralized error and logging utilities

✅ CORS support for frontend clients

✅ In-memory data models (no DB required)

🚀 Installation
git clone https://github.com/lar888/work60
cd work60
Install dependencies: yarn
Run the development server: yarn dev
node src/server.mjs

Server running at:
👉 http://localhost:3000

📁 Project Structure
src/
├── config/
│ └── http.mjs
├── controllers/
│ ├── newsController.mjs
│ ├── pageController.mjs
│ ├── postController.mjs
│ ├── researchController.mjs
│ └── usersController.mjs
├── data/
│ ├── db_news.mjs
│ ├── db_posts.mjs
│ ├── db_research.mjs
│ └── db_users.mjs
├── middleware/
│ ├── errorHandlers.mjs
│ └── validation.mjs
├── models/
│ ├── news.mjs
│ ├── posts.mjs
│ ├── research.mjs
│ └── users.mjs
├── routes/
│ ├── api/
│ │ ├── index.mjs
│ │ ├── news.mjs
│ │ ├── posts.mjs
│ │ ├── research.mjs
│ │ └── users.mjs
│ └── web/
│ ├── index.mjs
│ └── pages.mjs
├── utils/
│ └── logger.mjs
└── server.mjs

🌐 Routes Overview
🔸 Web Routes
Method Route Description
GET / Returns basic HTML/text response (root route)
🔸 API Routes

All API routes are available under /api.

🧩 1. Posts (/api/posts)

Full CRUD operations for scientific articles or posts.

Method Route Description
GET /api/posts Get all posts
GET /api/posts/:id Get post by ID
POST /api/posts Create new post
PUT /api/posts/:id Replace (update entire post)
PATCH /api/posts/:id Partially update post
DELETE /api/posts/:id Delete post

Example POST request:

{
"title": "Molecular Dynamics of Protein Folding",
"description": "Simulations reveal new folding pathways of small proteins.",
"category": "Biophysics",
"tags": ["protein", "folding", "simulation"],
"year": 2025,
"image": "https://picsum.photos/640/480?random=42",
"selected": false
}

Example Response:

{
"success": true,
"data": {
"id": 4,
"title": "Molecular Dynamics of Protein Folding",
"description": "Simulations reveal new folding pathways of small proteins.",
"category": "Biophysics",
"tags": ["protein", "folding", "simulation"],
"year": 2025,
"image": "https://picsum.photos/640/480?random=42",
"selected": false
},
"message": "Пост успішно створено"
}

📰 2. News (/api/news)

Returns the latest scientific or research-related news.
Data source: src/data/db_news.mjs

Sample Data:

{
"id": 1,
"image": "https://picsum.photos/640/480?random=1",
"date": "2025-01-05",
"description": "Researchers identify a new protein folding pathway that may explain resilience in neurodegenerative diseases."
}

Example Response:

{
"success": true,
"data": [
{
"id": 1,
"image": "https://picsum.photos/640/480?random=1",
"date": "2025-01-05",
"description": "Researchers identify a new protein folding pathway that may explain resilience in neurodegenerative diseases."
}
],
"count": 1
}

🔬 3. Research (/api/research)

Provides research project listings and scientific focus areas.
Data source: src/data/db_research.mjs

Sample Data:

{
"id": 1,
"image": "https://picsum.photos/640/480?random=1",
"title": "Electron and Proton Transfer in Proteins",
"description": "Life depends on the efficient movement of electrons and protons through protein structures. Our research focuses on the physical principles and structural determinants that govern these transfer processes, from redox cofactors to hydrogen-bonded networks. By combining biochemical, spectroscopic, and computational approaches, we seek to understand how proteins optimize charge transfer for processes such as respiration, photosynthesis, and enzymatic catalysis."
}

Example Response:

{
"success": true,
"data": [
{
"id": 1,
"image": "https://picsum.photos/640/480?random=1",
"title": "Electron and Proton Transfer in Proteins",
"description": "Life depends on the efficient movement of electrons and protons through protein structures..."
}
],
"count": 1
}

👩‍🔬 4. Users (/api/users)

Returns information about team members and researchers.
Data source: src/data/db_users.mjs

Sample Data:

{
"id": 1,
"image": "https://picsum.photos/640/480?random=1",
"member": "Alice Morgan - Post Doctoral Researcher",
"description": "Focuses on protein folding mechanisms and misfolding in neurodegenerative diseases. Her work combines biochemical assays with computational simulations to understand how proteins adopt stable structures and what happens when these processes go wrong, providing insights into Alzheimer’s and Parkinson’s disease."
}

Example Response:

{
"success": true,
"data": [
{
"id": 1,
"image": "https://picsum.photos/640/480?random=1",
"member": "Alice Morgan - Post Doctoral Researcher",
"description": "Focuses on protein folding mechanisms and misfolding in neurodegenerative diseases..."
}
],
"count": 1
}

⚠️ Error Handling
Global Error Middleware

Located in middleware/errorHandlers.mjs:

Logs all unexpected errors

Sends JSON { success: false, error: <message> } for /api/\* routes

Sends plain text for web routes

Validation Middleware

Located in middleware/validation.mjs:

Checks fields like title, description, category, tags, year, etc.

Returns:

{
"success": false,
"error": "Невірні дані посту: перевірте title, description, category, tags, year, image та selected"
}

📜 HTTP Configuration

From src/config/http.mjs:

Constant Description Value
HTTP_STATUS.OK 200 Success
HTTP_STATUS.CREATED 201 Created
HTTP_STATUS.BAD_REQUEST 400 Bad Request
HTTP_STATUS.NOT_FOUND 404 Not Found
HTTP_STATUS.INTERNAL_SERVER_ERROR 500 Server Error
🧠 Logging

src/utils/logger.mjs provides logging with timestamps:

[2025-10-19T21:48:10.342Z] API: Отримання списку новин

Functions:

log(message, data?)

error(message, err?)

info, warn, debug

🧪 Example Curl Commands

# Get all news

curl http://localhost:3000/api/news

# Get all research

curl http://localhost:3000/api/research

# Get all users

curl http://localhost:3000/api/users

# Add a post

curl -X POST http://localhost:3000/api/posts \
 -H "Content-Type: application/json" \
 -d '{"title":"Quantum Biology","description":"Study of quantum effects in living systems","category":"Biophysics","tags":["quantum","biology"],"year":2025,"image":"https://picsum.photos/640/480?random=5","selected":false}'

🧱 Summary
Component Role
server.mjs Entry point; mounts all routers, applies middleware
controllers/ Business logic for each entity
models/ In-memory storage and CRUD
middleware/ Validation & global error handling
routes/ API and web routes
utils/logger.mjs Logging utility
data/ JSON-like in-memory databases
🏁 License

MIT License — free for personal and educational use.

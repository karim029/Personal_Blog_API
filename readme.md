# Personal Blog API

A REST API for a personal blogging platform, built with NestJS, TypeORM, and MySQL. Built as part of the [roadmap.sh Blogging Platform API project](https://roadmap.sh/projects/blogging-platform-api).

## Features

- Full CRUD for blog posts (create, read, update, delete)
- Many-to-many tagging: posts can have multiple tags, tags can belong to multiple posts
- Find-or-create tag logic: tags are created automatically the first time they're used, and reused on subsequent posts rather than duplicated
- Partial updates (PATCH): any subset of fields can be updated without affecting the rest
- Updating a post's tags fully replaces its tag list (old tag links are removed, new ones are added)
- Request validation via `class-validator` / `class-transformer`

## Stack

- NestJS + TypeScript
- TypeORM
- MySQL (run locally via Docker)

## Data model

- **Blog**: `id`, `title`, `content`, `category`, `createdAt`, `updatedAt`, and a many-to-many relation to `Tag`
- **Tag**: `id`, `name`
- A join table (auto-managed by TypeORM via `@JoinTable()`) links blogs and tags

Auth was intentionally left out of scope — this is a single-user/personal blogging API.

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Start MySQL via Docker:
   ```
   docker compose up -d
   ```
3. Create a `.env` file in the project root:
   ```
   DB_HOST=localhost
   DB_PORT=3307
   DB_USERNAME=app_user
   DB_PASSWORD=app_password
   DB_DATABASE=app_db
   ```
4. Start the server:
   ```
   npm run start:dev
   ```

## API

| Method | Endpoint      | Description           |
|--------|---------------|------------------------|
| POST   | `/blogs`      | Create a blog post     |
| GET    | `/blogs`      | List all blog posts    |
| GET    | `/blogs/:id`  | Get a single blog post |
| PATCH  | `/blogs/:id`  | Update a blog post     |
| DELETE | `/blogs/:id`  | Delete a blog post     |

**Create / example body:**
```json
{
  "title": "Getting Started with NestJS",
  "content": "NestJS is a progressive Node.js framework for building efficient, scalable server-side applications.",
  "category": "backend",
  "tags": ["nestjs", "typescript", "tutorial"]
}
```

**Update tags (replaces the full tag list):**
```json
{
  "tags": ["nestjs", "docker"]
}
```

## Known limitations

- No authentication — single-user scope by design
- `category` is a free-text string, not a fixed/validated set of categories
- No pagination on `GET /blogs`
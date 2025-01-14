### Tech Stack

-   [AdonisJS](https://adonisjs.com/)
-   [PostgreSQL](https://postgresql.org/)
-   [ReactJS](https://react.dev/)
-   [Typescript](http://typescript.com/)
-   [TailwindCSS](https://tailwindcss.com/)
-   [ViteJS](https://vitejs.dev/)

### Requirements

-   Node.js (v20.13.1)
-   NPM (v10.5.2)
-   PostgreSQL

### Steps (Development)

1. Create database first
2. Fill the .env file with your database credentials
3. Run `pnpm install`
4. Run migration with `node ace migrate:run`
5. Run `pnpm dev`

### Steps (Production)

1. Run `pnpm build`
2. Run `pnpm install --prod`
3. Move `/inertia`, `tailwind.config.js`, and `.env` to `/build` folder
4. Run `pnpm start`

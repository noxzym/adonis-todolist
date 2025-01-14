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

1. Buat database terlebih dahulu
2. Isikan konfigurasi database pada file `.env`
3. Jalankan `pnpm install`
4. Jalankan migrasi dengan `node ace migrate:run`
5. Jalankan `pnpm dev`

### Steps (Production)

1. Buat database terlebih dahulu
2. Isikan konfigurasi database pada file `.env`
3. Jalankan `pnpm install`
4. Jalankan migrasi dengan `node ace migrate:run`
5. Jalankan `pnpm build`
6. Masuk kedalam folder build dengan `cd build`
7. Jalankan `pnpm install --prod`
8. Pindahkan folder `inertia` dan file `.env` ke dalam folder `build`
9. Jalankan `pnpm start`

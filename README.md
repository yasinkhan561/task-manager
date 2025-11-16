## 🚀 Task Manager Application

A modern, full-stack Task Manager built for speed, simplicity, and real-time interaction. Users can manage projects and tasks, reorder items with drag-and-drop, and enjoy a smooth SPA-like experience powered by React + Inertia, all running inside a clean Docker development environment.

# 🛠️ Technology Stack :

Component Technology Purpose

Backend Laravel (v12.37) API, routing, migrations, Eloquent ORM

Frontend Framework React Component-based modern UI

Styling Tailwind CSS Utility-first CSS framework

Adapter Inertia.js Connects Laravel backend with React SPA frontend

Authentication Laravel Breeze Login/Register scaffolding

Dev Environment Docker + Laravel Sail PHP, Nginx, MySQL, Redis containers

Task Reordering SortableJS Drag-and-drop functionality

# ⚙️ Project Setup (Recommended): Docker Desktop + Laravel Sail

This is the easiest, most consistent setup on Windows, macOS, and Linux.
Docker Desktop will handle PHP, MySQL, Nginx, Redis, Node, and everything else for you.

✅ Prerequisites

You must have the following installed:

Docker Desktop

Git

✔ No need to install PHP, Composer, Node.js, or MySQL — Sail provides all of them.

📌 Step 1: Clone the Repository
git clone https://github.com/yasinkhan561/task-manager.git
cd task-manager

📌 Step 2: Create Environment File + App Key
cp .env.example .env

Generate the Laravel app key using a temporary PHP container:

docker run --rm \
 -v "$(pwd):/var/www/html" \
 -w /var/www/html php:8.3-cli \
 php artisan key:generate

📌 Step 3: Start Docker Containers (Laravel Sail)
./vendor/bin/sail up -d

Windows PowerShell (if needed):

vendor\bin\sail up -d

💡 Tip: Create a Sail alias so you can type sail instead of ./vendor/bin/sail.

📌 Step 4: Install PHP & JS Dependencies

# Install Composer dependencies

./vendor/bin/sail composer install

# Install Node dependencies

./vendor/bin/sail npm install

📌 Step 5: Migrate and Seed the Database
./vendor/bin/sail artisan migrate --seed

This will also load dummy data for testing.

📌 Step 6: Build Frontend Assets

Development mode (recommended):

./vendor/bin/sail npm run dev

Production build:

./vendor/bin/sail npm run build

📌 Step 7: Access the Application

Once Sail is running, open:

👉 http://localhost

Your Task Manager should now be fully operational.

🐳 Docker Desktop Setup — Additional Notes
▶ Ensure Docker Desktop is running

On Windows/macOS, Docker Desktop must be open before running Sail.

▶ WSL2 requirements (Windows only)

Windows 10/11

WSL2 enabled

Docker Desktop → Settings → Enable WSL Integration

🛠️ Troubleshooting (Common Issues)
❌ “This page isn’t working — ERR_EMPTY_RESPONSE”

Likely the containers failed to start.

Run:

./vendor/bin/sail ps
docker ps

If laravel.test is not running → restart Sail:

./vendor/bin/sail down -v
./vendor/bin/sail up -d

❌ Port 80 in use

Nginx needs port 80.

Find what is using it:

sudo lsof -i :80

Kill conflicting process.

❌ Node / Vite errors

Restart assets:

./vendor/bin/sail npm run dev

❌ MySQL connection issues

Check DB container logs:

./vendor/bin/sail logs mysql

# 🖥️ Alternative Setup (Without Docker)

If you prefer to run PHP, MySQL, and Node locally:

Prerequisites

PHP 8.3+

Composer

MySQL

Node.js & NPM

Steps

git clone https://github.com/yasinkhan561/task-manager.git
cd task-manager
cp .env.example .env

composer install
npm install
php artisan key:generate
php artisan migrate --seed

npm run dev
php artisan serve

Access at:

👉 http://127.0.0.1:8000

# 💻 Frontend Architecture

React components inside resources/js/Pages

Inertia.js used for client-side navigation with server-side data

Tailwind CSS for styling

SortableJS for task drag-and-drop

Laravel controllers return Inertia responses with props injected into React

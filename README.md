🚀 Task Manager Application

This is a modern, full-stack Task Manager designed for high performance and real-time user interaction. It allows users to organize tasks within projects and reorder tasks using a drag-and-drop interface, leveraging a dynamic front-end powered by React and Inertia.

🛠️ Technology Stack

This project uses a robust, modern stack packaged neatly with Docker for easy development:

Component

Technology

Description

Backend

Laravel (v12.37)

Provides the core API, routing, database migration, and Eloquent ORM.

Frontend Framework

React

Used for building the dynamic, component-based user interface.

Styling

Tailwind CSS

A utility-first CSS framework for rapid and responsive UI development.

Adapter

Inertia.js

The "modern monolith" adapter that connects the Laravel backend with the React frontend seamlessly.

Authentication

Laravel Breeze

Scaffolding used for a quick and secure authentication setup (Login, Register).

Development Environment

Laravel Sail & Docker

Provides a light-weight, ready-to-use Docker environment, including PHP, Nginx, MySQL, and Redis.

Task Management

SortableJS

Used for the drag-and-drop task reordering functionality on the front end.

⚙️ Project Setup and Installation

Since this project uses Laravel Sail, setup is extremely fast and consistent across all operating systems.

Prerequisites

You must have the following software installed on your machine:

Docker and Docker Compose

Git

Step 1: Clone the Repository

Clone the project from GitHub and navigate into the project directory:

git clone [https://github.com/yasinkhan561/task-manager.git](https://github.com/yasinkhan561/task-manager.git)
cd task-manager

Step 2: Configure the Environment

Create a copy of the default environment file and generate the application key:

cp .env.example .env
docker run --rm \
 -v "$(pwd):/var/www/html" \
 -w /var/www/html php:8.3-cli \
 php artisan key:generate

Step 3: Start the Sail Environment

Use the Sail command to build and start all necessary Docker containers (PHP, MySQL, Nginx, etc.). This may take several minutes the first time.

./vendor/bin/sail up -d

Note: If you are on Windows, you will need to use vendor\bin\sail up -d. You can also create a bash alias for ./vendor/bin/sail as simply sail.

Step 4: Install Dependencies

Once the containers are running, execute Composer (for PHP) and NPM (for JavaScript) dependency installation inside the running Docker environment:

# Install PHP dependencies (Composer)

./vendor/bin/sail composer install

# Install Node.js dependencies (NPM)

./vendor/bin/sail npm install

Step 5: Database Migration and Seeding

Run the migrations to create the necessary database tables (like users, projects, and tasks):

./vendor/bin/sail artisan migrate --seed

The --seed flag will populate the database with dummy data for initial testing.

Step 6: Build Frontend Assets

The React/Inertia/Tailwind assets need to be compiled. Use the development server for real-time changes or build the production assets:

# To run the development asset watcher (recommended for active development)

./vendor/bin/sail npm run dev

# To build production-ready, minified assets

# ./vendor/bin/sail npm run build

Step 7: Access the Application

The application should now be fully running and accessible in your web browser:

http://localhost

You can now register a new user using the /register route or log in with the seeded credentials if available.

💻 Frontend Implementation Details

The frontend logic is managed entirely by React components integrated via Inertia.js.

Views: All main views (e.g., resources/js/Pages/Tasks/Index.tsx) are React components.

Styling: All styling is handled via Tailwind CSS utility classes applied directly to the JSX elements.

Data Flow: Data fetched by the Laravel backend (e.g., projects and tasks) is passed as Inertia Props directly to the React components. State changes (like task creation or reordering) are handled via Inertia form helpers, making the flow feel like a traditional MVC application while delivering a single-page application experience.

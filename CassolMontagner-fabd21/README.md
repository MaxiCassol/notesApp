# Notes App

This is a simple Notes application built with Nest.js for the backend and React.js for the frontend.

## Features

- **Backend (Nest.js with Typescript):**

  - RESTful API for managing notes.
  - Supports CRUD operations (Create, Read, Update, Delete) for notes.
  - Archives and unarchives notes.
  - Uses TypeORM for database interaction.

- **Frontend (React.js with Javascript):**
  - Displays a list of notes.
  - Allows creation, deletion, and archiving of notes.
  - Minimalistic and modern UI.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher) or yarn (v1.22 or higher)
- Git

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ensolvers-github-challenges/CassolMontagner-fabd21.git
   cd CassolMontagner-fabd21/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database connection:

- Ensure PostgreSQL is installed and running.
- Modify data-source.ts in your backend to match your PostgreSQL configuration:

  ```Typescript
  import { DataSource } from 'typeorm';
  import { Note } from './note/entities/note.entity';

  export const AppDataSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'postgres',
   database: 'postgres',
   entities: [Note],
   synchronize: true,
  });
  ```

4. Start the backend server:
   ```bash
   nest start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

### Usage

-Open your browser and go to http://localhost:3000 to access the Notes application.

-Use the application to create new notes, view existing notes, archive/unarchive notes, and delete notes as needed.

-This guide assumes you've already configured your `data-source.ts` correctly with your PostgreSQL credentials. Adjust the credentials (`username`, `password`, `database`) in the `AppDataSource` object as per your PostgreSQL setup. This setup should help users understand how to set up both the backend and frontend of your application.

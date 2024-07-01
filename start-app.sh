#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js could not be found. Please install it first."
    exit
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm could not be found. Please install it first."
    exit
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null
then
    echo "PostgreSQL could not be found. Please install it first."
    exit
fi

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Start PostgreSQL service (adjust path if necessary)
echo "Starting PostgreSQL service..."
pg_ctl -D "C:/Program Files/PostgreSQL/13/data" start

# Wait for PostgreSQL to start
sleep 5

# Set up the database
echo "Setting up the database..."
PGPASSWORD=postgres psql -U postgres -h localhost -p 5432 -d postgres -c "DROP DATABASE IF EXISTS postgres;"
PGPASSWORD=postgres psql -U postgres -h localhost -p 5432 -d postgres -c "CREATE DATABASE postgres;"
PGPASSWORD=postgres psql -U postgres -h localhost -p 5432 -d postgres -c "CREATE USER postgres WITH PASSWORD 'postgres';"
PGPASSWORD=postgres psql -U postgres -h localhost -p 5432 -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;"

# Apply database migrations (adjust this command according to your migration tool)
echo "Applying database migrations..."
npm run migrate

# Start the app
echo "Starting the app..."
npm start

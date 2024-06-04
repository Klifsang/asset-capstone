# Asset-Ace 

## Overview

Asset-Ace is designed to manage employee and admin records, asset inventory, requests, and notifications. It provides various REST API endpoints for CRUD operations and authentication.

## Project Structure

- **app.py**: Main application file initializing Flask, configuring middleware, and defining routes.
- **config.py**: Configuration file for the application.
- **models/**: Directory containing database models.
- **endpoints/**: Directory containing endpoint functions for different modules (employee, admin, assets, requests, authentication, notifications).
- **client/**: Directory containing frontend assets (React application).

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Set up a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   Create a `.env` file with the following:
   ```
   FLASK_APP=app.py
   FLASK_ENV=development
   DATABASE_URI=<your-database-uri>
   ```

5. **Run database migrations**:
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

6. **Build the frontend**:
   Navigate to the client directory and build the React application:
   ```bash
   cd client
   npm install
   npm run build
   ```

## Running the Application

1. **Start the Flask server**:
   ```bash
   flask run
   ```

   The server will run on `http://127.0.0.1:5000`.

## API Endpoints

### Authentication

- **Login**: 
  - `POST /api/user/login`
  - **Description**: Logs in a user and starts a session.

- **Logout**: 
  - `POST /api/logout`
  - **Description**: Logs out the current user and ends the session.

- **Check Session**: 
  - `GET /api/checksession`
  - **Description**: Checks the current session and returns user data.

### Employees

- **Register Employee**:
  - `POST /api/staff/register`
  - **Description**: Registers a new employee.

- **Delete Employee**:
  - `DELETE /api/staff/delete`
  - **Description**: Deletes the current employee.

- **Update Employee**:
  - `PATCH /api/staff/update`
  - **Description**: Updates the current employee's details.

- **Get Employees**:
  - `GET /api/staff/get`
  - **Description**: Retrieves all employees.

- **Get Specific Employee**:
  - `POST /api/staff/getstaff`
  - **Description**: Retrieves a specific employee by ID.

### Admins

- **Register Admin**:
  - `POST /api/admin/register`
  - **Description**: Registers a new admin.

- **Delete Admin**:
  - `DELETE /api/admin/delete`
  - **Description**: Deletes the current admin.

- **Update Admin**:
  - `PATCH /api/admin/update`
  - **Description**: Updates the current admin's details.

- **Get Admins**:
  - `POST /api/admin/get`
  - **Description**: Retrieves all admins.

### Assets

- **Add Asset**:
  - `POST /api/assets/add`
  - **Description**: Adds a new asset.

- **Delete Asset**:
  - `DELETE /api/assets/delete`
  - **Description**: Deletes an asset.

- **Update Asset**:
  - `PATCH /api/assets/update`
  - **Description**: Updates an asset's details.

- **Get Assets**:
  - `GET /api/assets/get`
  - **Description**: Retrieves all assets.

- **Get Assets for User**:
  - `POST /api/myassets`
  - **Description**: Retrieves approved assets for a specific user.

### Requests

- **Add Request**:
  - `POST /api/requests/add`
  - **Description**: Adds a new request.

- **Delete Request**:
  - `DELETE /api/requests/delete/<int:id>`
  - **Description**: Deletes a request by ID.

- **Update Request**:
  - `PATCH /api/requests/update`
  - **Description**: Updates a request's details.

- **Get Requests**:
  - `GET /api/requests/get`
  - **Description**: Retrieves all requests.

- **Get My Requests**:
  - `GET /api/myrequests/get`
  - **Description**: Retrieves requests made by the current user.

### Notifications

- **Get Notifications**:
  - `GET /api/notifications`
  - **Description**: Retrieves all notifications for the current user.

- **Delete Notification**:
  - `DELETE /api/notifications/<int:id>`
  - **Description**: Deletes a notification by ID.

- **Mark as Read**:
  - `POST /api/mark_as_read/<int:id>`
  - **Description**: Marks a notification as read by ID.

## Middleware

- **CORS**: Configured with credentials support.
- **Session**: Configured for server-side session management.
- **Bcrypt**: Used for password hashing.
- **Migrate**: Used for database migrations.

## Custom Decorators

- **login_required**: Ensures that the user is logged in before accessing the route.
- **is_admin**: Ensures that the user is an admin before accessing the route.

## Error Handling

- **404 Handler**: Redirects to the index page for any non-existent routes.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your branch and create a pull request.

## License

This project is licensed under the MIT License.

---

This readme provides an overview of the application, its structure, installation steps, API endpoints, middleware, custom decorators, and error handling. For more detailed information on each part, refer to the source code and comments within the codebase.
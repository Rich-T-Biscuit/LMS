# LearnSpace LMS

LearnSpace LMS is a full-stack Learning Management System developed using Django, Django REST Framework and React.

The application provides different functionality depending on whether the authenticated user is a **Student**, **Teacher**, or **Administrator**.

The project was created to demonstrate full-stack web development skills including frontend development, backend development, REST APIs, database management, authentication, CRUD functionality and role-based permissions.

## Features

### Student

Students can:

- Log in to the LMS.
- View their dashboard.
- View courses they are currently enrolled in.
- Browse courses available for enrolment.
- Enrol in available courses.
- Log out securely.

### Teacher

Teachers can:

- Log in to the LMS.
- View their dashboard.
- View courses assigned to them.
- Create new courses.
- Edit their own courses.
- Delete their own courses.
- Log out securely.

Teachers cannot modify courses belonging to another teacher.

### Administrator

Administrators can:

- Log in to the LMS.
- View their dashboard.
- View all users.
- Search users by username, email or role.
- Edit usernames and email addresses.
- Change user roles.
- Delete user accounts.
- View all courses.
- Search courses.
- Create courses.
- Edit courses.
- Assign or reassign courses to teachers.
- Delete courses.
- Log out securely.

Administrators have access to all course-management functionality regardless of which teacher owns a course.

## Technologies Used

### Frontend

- React
- JavaScript
- HTML5
- CSS3
- React Router
- Vite

### Backend

- Python
- Django
- Django REST Framework
- Django REST Framework Token Authentication
- django-cors-headers

### Database

- SQLite

### Development and Version Control

- Visual Studio Code
- Git
- GitHub
- npm

## Project Structure

```text
LMS/
├── backend/
│   └── LMS/
│       ├── courses/
│       ├── users/
│       ├── LMS/
│       ├── manage.py
│       └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Database Design

The application uses a relational SQLite database.

The main data areas are:

### Users

Users contain the information required for authentication and role-based access.

Supported LMS roles are:

- Student
- Teacher
- Administrator

### Courses

Courses contain information including:

- Course title
- Course description
- Assigned teacher

Each course is associated with a teacher.

### Enrolments

Enrolments connect students to courses.

This allows the application to determine:

- Which courses a student is enrolled in.
- Which courses remain available for the student to enrol in.

## Authentication and Permissions

The LMS uses Django REST Framework token authentication.

When a user successfully logs in, the backend returns an authentication token and information about the authenticated user.

The React frontend uses this information to display the appropriate dashboard and routes for the user's role.

Backend permissions are also used to protect API functionality.

Examples include:

- Students can browse and enrol in courses but cannot create courses.
- Teachers can create and manage their own courses but cannot manage other teachers' courses.
- Teachers cannot manage user accounts.
- Administrators can manage users and all courses.
- Administrators cannot enrol in courses as students.

Logging out invalidates the active authentication token and clears the authentication information stored by the frontend.

## API Endpoints

The application provides REST API endpoints including:

```text
/api/login/
/api/logout/
/api/users/
/api/courses/
/api/enrollments/
```

The Django REST Framework browsable API is also available during development.

## Local Installation

### 1. Clone the Repository

Clone the project and navigate into the repository:

```bash
git clone <repository-url>
cd LMS
```

## Backend Setup

Navigate to the Django project:

```bash
cd backend/LMS
```

Install the required Python dependencies.

The project requires packages including:

```text
Django
djangorestframework
django-cors-headers
python-dotenv
```

Create a `.env` file using `.env.example` as a guide.

The `.env` file should contain your Django secret key.

For example:

```text
DJANGO_SECRET_KEY=your-secret-key
```

Do not commit the real `.env` file or secret key to GitHub.

Apply the database migrations:

```bash
python manage.py migrate
```

Run the Django development server:

```bash
python manage.py runserver
```

The backend development server will normally run at:

```text
http://127.0.0.1:8000/
```

## Frontend Setup

Open a second terminal and navigate to the frontend:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The terminal will display the local URL used to access the React application.

## Running the Application

During local development, both servers need to be running.

### Terminal 1 — Django

```bash
cd backend/LMS
python manage.py runserver
```

### Terminal 2 — React

```bash
cd frontend
npm run dev
```

The React frontend communicates with the Django REST API to retrieve and update application data.

## Testing

Functionality has been manually tested across the three LMS roles.

Testing includes:

### Student Permissions

- Login.
- View courses.
- View enrolments.
- Enrol in a course.
- Prevention of course creation.
- Prevention of user management.

### Teacher Permissions

- Login.
- View assigned courses.
- Create a course.
- Edit an owned course.
- Delete an owned course.
- Prevention of editing another teacher's course.
- Prevention of user management.
- Prevention of student enrolment actions.

### Administrator Permissions

- Login.
- View users.
- Edit users.
- Change user roles.
- Delete users.
- View all courses.
- Create courses.
- Edit courses.
- Reassign courses.
- Delete courses.
- Prevention of student enrolment actions.

Authentication and logout behaviour have also been manually tested.

## Security

Sensitive configuration is stored using environment variables.

The following files and directories should not be committed to the repository:

```text
.env
db.sqlite3
__pycache__/
node_modules/
```

An `.env.example` file can be included to document the environment variables required to run the application without exposing the real secret key.

Authentication and permission checks are enforced by the Django backend rather than relying solely on frontend route protection.

## Responsive Design and Accessibility

The frontend uses semantic HTML elements, labelled form controls and reusable styling.

Further accessibility, responsive-design and user-interface testing will be completed as part of the final project review.

## Wireframes

Wireframes for the LMS user interface will be created using Figma.

The final Figma design/wireframe link will be added here:

**Figma:** `[Add Figma link here]`

## Deployment

Deployment information will be added once the final application has been prepared for deployment.

## Future Improvements

Possible future improvements include:

- User profile management.
- Password-reset functionality.
- Additional course content.
- Course progress tracking.
- Automated testing.
- Improved accessibility.
- Enhanced responsive design.
- Production deployment.

## Project Status

The core full-stack functionality is implemented.

Completed areas include:

- Django database and models.
- REST API.
- Token authentication.
- Role-based backend permissions.
- React authentication integration.
- Student course enrolment.
- Teacher course management.
- Administrator course management.
- Administrator user management.
- Backend token logout.

Final UI, accessibility, responsive-design, documentation and deployment work will be completed during the remaining development phases.

## Author

**Richard Taylor**

Full-Stack Learning Management System Project
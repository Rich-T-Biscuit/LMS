# LearnSpace LMS

LearnSpace LMS is a full-stack Learning Management System developed using Django, Django REST Framework and React.

The application provides different functionality depending on whether the authenticated user is a **Student**, **Teacher**, or **Administrator**.

The project was created to demonstrate full-stack web development skills including frontend development, backend development, REST APIs, database management, authentication, CRUD functionality and role-based permissions.

## Live Project

**Frontend:** https://rich-t-biscuit.github.io/LMS/

**Backend / API:** https://lms-backend-y5v1.onrender.com/api/

**Django Admin:** https://lms-backend-y5v1.onrender.com/admin/

> The backend is hosted on Render. A free instance may take longer to respond to the first request after a period of inactivity.

## Demo Accounts

| Role | Username | Password |
| --- | --- | --- |
| Student | `student` | `E88Nd3ye75A9rcH` |
| Teacher | `teacher1` | `fwnt5crSX7K8wEX` |
| Teacher | `teacher2` | `Rq66dQmjgbEnFe5` |
| Administrator | `admin` | `Zyi2sKMDXp67fuz` |

These are demonstration accounts only.

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
- Vitest
- React Testing Library
- ESLint

### Backend

- Python
- Django
- Django REST Framework
- Django REST Framework Token Authentication
- django-cors-headers

### Database

- SQLite (local development)
- PostgreSQL (production deployment)

### Development and Version Control

- Visual Studio Code
- Git
- GitHub
- npm
- GitHub Pages
- GitHub Actions
- Render

## Project Structure

```text
LMS/
├── backend/
│   └── LMS/
│       ├── courses/
│       ├── users/
│       ├── LMS/
│       ├── manage.py
│       ├── requirements.txt
│       └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── test/
│   │   │   ├── app.test.jsx
│   │   │   └── setup.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── eslint.config.js
│   ├── package.json
│   └── vite.config.js
|
├── docs/
│   ├── screenshots/
│   │   ├── screen-sizes/
│   │   └── validation/
│   └── screenshots.md
│
└── README.md

```

## Database Design

The application uses a relational database: SQLite during local development and PostgreSQL for the deployed application.

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

Install the required Python dependencies from the project's `requirements.txt` file:

```bash
python -m pip install -r requirements.txt
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

### Automated Backend Testing

The Django test suite contains **17 automated tests**.

```text
Found 17 test(s).
.................
Ran 17 tests

OK
```

Django validation also completed successfully:

```text
System check identified no issues (0 silenced).
No changes detected
```

### Automated Frontend Testing

The React frontend was tested using Vitest and React Testing Library.

**5 automated tests passed**, covering:

- Redirecting unauthenticated users to the login page.
- Displaying the Student dashboard for a Student.
- Displaying the Teacher dashboard for a Teacher.
- Displaying the Administrator dashboard for an Administrator.
- Preventing a Student from accessing an Administrator route.

```text
Test Files  1 passed (1)
Tests       5 passed (5)
```

### Code and Markup Validation

Validation was completed against the deployed application and project source code.

| Validation | Result |
| --- | --- |
| W3C HTML Validator | Passed — no errors or warnings |
| W3C Jigsaw CSS Validator | Passed — no errors |
| Flake8 Python linting | Passed — no linting violations |
| Django system check | Passed — no issues |
| Django automated tests | Passed — 17/17 |
| Vitest / React Testing Library | Passed — 5/5 |
| ESLint | Passed — 0 errors, 1 non-blocking Fast Refresh warning |
| Vite production build | Passed — 43 modules transformed |

Validation evidence is documented in [screenshots.md](docs/screenshots.md), with supporting images in the [validation screenshots folder](docs/screenshots/validation/).

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

Responsive testing was completed at:

| Viewport | Result |
| --- | --- |
| Mobile — 375 × 667 | Passed |
| Tablet — 768 × 1024 | Passed |
| Desktop — 1920 × 1080 | Passed |

Keyboard accessibility was also tested using `Tab`, `Shift + Tab`, `Enter` and `Space`. Login controls, dashboard navigation, form fields and management controls were keyboard accessible, visible focus was confirmed, and no keyboard traps were identified.

**Accessibility result: Passed**

Supporting screen-size evidence is available in the [screen-size screenshots folder](docs/screenshots/screen-sizes/) and is indexed in [screenshots.md](docs/screenshots.md).

## Wireframes

Wireframes for the LMS user interface were created using Figma.

**Figma Wireframe:** [View the LMS wireframe](https://www.figma.com/design/H81wmIbqLi3LBkU0MW9IJj/LMS---Project?node-id=0-1&t=pIMLD2BXugMFA3nX-1)


## Deployment

### Frontend — GitHub Pages

The React/Vite frontend is deployed using GitHub Pages:

https://rich-t-biscuit.github.io/LMS/

GitHub Actions builds the application from the `frontend` directory and deploys the generated `dist` output. The Vite base path is configured for the `/LMS/` repository path.

### Backend — Render

The Django REST API is deployed as a Python web service on Render:

https://lms-backend-y5v1.onrender.com/

The deployed backend uses Gunicorn, WhiteNoise and PostgreSQL. Sensitive configuration is supplied through environment variables, including:

```text
DJANGO_SECRET_KEY
DJANGO_DEBUG
DJANGO_ALLOWED_HOSTS
DATABASE_URL
```

The GitHub Actions frontend build receives the production API address through:

```text
VITE_API_BASE_URL
```

Actual secret values are not committed to the repository.

### Production Testing

The deployed GitHub Pages frontend was tested against the Render Django API and PostgreSQL database.

| Test | Result |
| --- | --- |
| Demo account authentication | Passed |
| Student enrolment | Passed |
| Teacher course filtering | Passed |
| Administrator user management | Passed |
| Administrator course management | Passed |
| Frontend-to-backend API communication | Passed |

## Future Improvements

Possible future improvements include:

- User profile management.
- Password-reset functionality.
- Additional course content.
- Course progress tracking.
- Additional automated frontend testing.
- Expanded accessibility auditing.
- Course lessons, materials and progress tracking.
- Production email-based password reset.

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
- Automated backend testing (17/17 passing).
- Automated React testing (5/5 passing).
- W3C HTML and CSS validation.
- Flake8 Python validation.
- ESLint and production build validation.
- Responsive and keyboard accessibility testing.
- GitHub Pages frontend deployment.
- Render Django backend deployment.
- PostgreSQL production database.
- Production end-to-end role testing.

The core full-stack application has been implemented, validated, tested and deployed. Supporting responsive-design, accessibility and validation evidence is included in the project documentation.

## Author

**Richard Taylor**

Full-Stack Learning Management System Project
# LearnSpace LMS

LearnSpace LMS is a full-stack Learning Management System developed using Django, Django REST Framework and React.

The application provides different functionality depending on whether the authenticated user is a **Student**, **Teacher**, or **Administrator**.

The project was created to demonstrate full-stack web development skills including frontend development, backend development, REST APIs, database management, authentication, CRUD functionality, automated testing, responsive design and role-based permissions.

## Live Project

**Frontend:** https://rich-t-biscuit.github.io/LMS/

**Backend / API:** https://lms-backend-y5v1.onrender.com/api/

**Django Admin:** https://lms-backend-y5v1.onrender.com/admin/

> The backend is hosted on Render. A free instance may take longer to respond to the first request after a period of inactivity.

## Demo Accounts

The deployed application contains demonstration accounts for each LMS role:

| Role | Username |
| --- | --- |
| Student | `student` |
| Teacher | `teacher1` |
| Teacher | `teacher2` |
| Administrator | `admin` |

Demo credentials can be supplied separately when required.

New users can also create their own **Student** account using the **Create an account** option on the login page.

## Features

### Student

Students can:

- Register for a new Student account.
- Log in to the LMS.
- View their dashboard.
- View courses they are currently enrolled in.
- Browse courses available for enrolment.
- Enrol in available courses.
- Log out securely.

Newly registered accounts are automatically assigned the Student role. Users cannot select a Teacher or Administrator role during registration.

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

- SQLite — local development
- PostgreSQL — production deployment

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
│
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

Users who self-register through the public registration page are automatically created as Students.

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

Backend permissions are also used to protect API functionality rather than relying only on frontend route protection.

Examples include:

- Unauthenticated users can register for a Student account.
- Registration does not allow users to assign themselves Teacher or Administrator privileges.
- Students can browse and enrol in courses but cannot create courses.
- Teachers can create and manage their own courses but cannot manage another teacher's courses.
- Teachers cannot manage user accounts.
- Administrators can manage users and all courses.
- Administrators cannot enrol in courses as students.

Logging out invalidates the active authentication token and clears the authentication information stored by the frontend.

## API Endpoints

The application provides REST API endpoints including:

```text
/api/register/
/api/login/
/api/logout/
/api/users/
/api/courses/
/api/enrollments/
```

The registration endpoint accepts `POST` requests for creating new Student accounts.

The Django REST Framework browsable API is also available during development.

## Local Installation

### 1. Clone the Repository

Clone the project and navigate into the repository:

```bash
git clone <repository-url>
cd LMS
```

### 2. Create and Activate a Virtual Environment

On Windows:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

## Backend Setup

Navigate to the Django project:

```bash
cd backend/LMS
```

Install the required Python dependencies:

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

Open a second terminal and navigate to the frontend directory:

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

The terminal displays the local URL used to access the React application.

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

The application has been tested using automated backend and frontend tests together with manual role-based and production testing.

### Automated Backend Testing

From `backend/LMS`:

```bash
python manage.py check
python manage.py test
```

The final Django test suite contains **21 automated tests**:

```text
Found 21 test(s).
.....................
----------------------------------------------------------------------
Ran 21 tests

OK
```

The final Django system check also completed successfully:

```text
System check identified no issues (0 silenced).
```

The automated backend suite covers authentication, registration, permissions, course management and enrolment behaviour.

### Python Linting

Flake8 was used to check the Python source code.

From `backend/LMS`:

```bash
python -m flake8 . --exclude=migrations,__pycache__ --max-line-length=88
```

The final command completed with no Flake8 violations.

### Automated Frontend Testing

The React frontend was tested using Vitest and React Testing Library.

From `frontend`:

```bash
npm test
```

The final suite contains **7 automated tests**:

```text
Test Files  1 passed (1)
Tests       7 passed (7)
```

The tests cover:

- Redirecting unauthenticated users to the login page.
- Displaying the Student dashboard for a Student.
- Displaying the Teacher dashboard for a Teacher.
- Displaying the Administrator dashboard for an Administrator.
- Preventing a Student from accessing an Administrator route.
- Displaying the registration page.
- Rejecting registration when the passwords do not match.

### Frontend Linting

From `frontend`:

```bash
npm run lint
```

Final result:

```text
0 errors
1 warning
```

The remaining warning relates to React Fast Refresh and is non-blocking.

### Production Build

The frontend production build was verified with:

```bash
npm run build
```

Final result:

```text
43 modules transformed
Build completed successfully
```

### Code and Markup Validation

Validation was completed against the finished application and project source code.

| Validation | Result |
| --- | --- |
| W3C HTML Validator | Passed — no errors or warnings |
| W3C Jigsaw CSS Validator | Passed — no errors |
| Flake8 Python linting | Passed — no linting violations |
| Django system check | Passed — no issues |
| Django automated tests | Passed — 21/21 |
| Vitest / React Testing Library | Passed — 7/7 |
| ESLint | Passed — 0 errors, 1 non-blocking Fast Refresh warning |
| Vite production build | Passed — 43 modules transformed |

Validation evidence is documented in [screenshots.md](docs/screenshots.md), with supporting images in the [validation screenshots folder](docs/screenshots/validation/).

## Manual Role Testing

### Student Permissions

The following Student functionality was manually tested:

- Registration.
- Login.
- Student dashboard access.
- View courses.
- View enrolments.
- Enrol in a course.
- Prevention of course creation.
- Prevention of user management.
- Logout.

### Teacher Permissions

The following Teacher functionality was manually tested:

- Login.
- Teacher dashboard access.
- View assigned courses.
- Create a course.
- Edit an owned course.
- Delete an owned course.
- Prevention of editing another teacher's course.
- Prevention of user management.
- Prevention of student enrolment actions.
- Logout.

### Administrator Permissions

The following Administrator functionality was manually tested:

- Login.
- Administrator dashboard access.
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
- Logout.

## Security

Sensitive configuration is stored using environment variables.

The following files and directories should not be committed to the repository:

```text
.env
db.sqlite3
__pycache__/
node_modules/
```

An `.env.example` file documents the environment variables required to run the application without exposing the real secret key.

Authentication and permission checks are enforced by the Django backend rather than relying solely on frontend route protection.

Public registration creates Student accounts only, preventing a registering user from assigning themselves elevated Teacher or Administrator permissions.

Passwords are handled through Django's authentication system rather than being stored directly by the frontend.

## Screen-Size Testing and Accessibility

The frontend uses semantic HTML elements, labelled form controls and reusable styling.

Screen-size testing was completed at:

| Viewport | Result |
| --- | --- |
| Mobile — 375 × 667 | Passed |
| Tablet — 768 × 1024 | Passed |
| Desktop — 1920 × 1080 | Passed |

Keyboard accessibility was also tested using `Tab`, `Shift + Tab`, `Enter` and `Space`.

Login controls, dashboard navigation, form fields and management controls were keyboard accessible, visible focus was confirmed, and no keyboard traps were identified.

**Accessibility result: Passed**

Supporting screen-size evidence is available in the [screen-size screenshots folder](docs/screenshots/screen-sizes/) and is indexed in [screenshots.md](docs/screenshots.md).

## Wireframes

Wireframes for the LMS user interface were created using Figma.

**Figma Wireframe:** [View the LMS wireframe](https://www.figma.com/design/H81wmIbqLi3LBkU0MW9IJj/LMS---Project?node-id=0-1&t=pIMLD2BXugMFA3nX-1)

## Deployment

### Frontend — GitHub Pages

The React/Vite frontend is deployed using GitHub Pages:

https://rich-t-biscuit.github.io/LMS/

GitHub Actions builds the application from the `frontend` directory and deploys the generated `dist` output.

The Vite base path is configured for the `/LMS/` repository path.

### Backend — Render

The Django REST API is deployed as a Python web service on Render:

https://lms-backend-y5v1.onrender.com/

The deployed backend uses Gunicorn, WhiteNoise and PostgreSQL.

Sensitive configuration is supplied through environment variables, including:

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
| Student account registration | Passed |
| Newly registered Student login | Passed |
| Student dashboard access after registration | Passed |
| Student enrolment | Passed |
| Teacher course filtering | Passed |
| Administrator user management | Passed |
| Administrator course management | Passed |
| Frontend-to-backend API communication | Passed |
| Registration API endpoint | Passed |

The `/api/register/` production endpoint was also confirmed to accept `POST` and `OPTIONS` requests.

## Validation Evidence

Final validation evidence is stored under:

```text
docs/screenshots/validation/
```

This includes evidence for:

- Django automated tests.
- Python/Flake8 validation.
- React automated tests.
- W3C HTML validation.
- W3C Jigsaw CSS validation.

Screen-size testing evidence is stored separately under:

```text
docs/screenshots/screen-sizes/
```

The evidence is indexed in:

```text
docs/screenshots.md
```

## Credits

### Documentation and Resources

The following official documentation was used as reference material during development:

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vite.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [ESLint Documentation](https://eslint.org/)
- [Python Documentation](https://docs.python.org/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Render Documentation](https://render.com/docs)
- [W3C Markup Validation Service](https://validator.w3.org/)
- [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)

### AI Assistance

ChatGPT by OpenAI was used during development as a support tool for troubleshooting, code review, testing guidance, documentation and deployment assistance.

All generated suggestions were reviewed, tested and adapted as required for this project. Final implementation decisions, validation and testing were carried out as part of the development process.

## Future Improvements

Possible future improvements include:

- User profile management.
- Production email-based password reset.
- Additional course content.
- Course lessons and learning materials.
- Course progress tracking.
- Additional automated frontend testing.
- Expanded accessibility auditing.
- Expanded registration validation and user feedback.
- Email verification for newly registered accounts.

## Project Status

The full-stack LMS functionality has been implemented, tested, validated and deployed.

Completed areas include:

- Django database and models.
- REST API.
- Student self-registration.
- Secure Student-only public registration.
- Token authentication.
- Role-based backend permissions.
- React authentication integration.
- Student course enrolment.
- Teacher course management.
- Administrator course management.
- Administrator user management.
- Backend token logout.
- Automated backend testing — **21/21 passing**.
- Automated React testing — **7/7 passing**.
- W3C HTML validation.
- W3C CSS validation.
- Flake8 Python validation.
- ESLint validation — **0 errors**.
- Vite production build validation.
- Screen-size and keyboard accessibility testing.
- GitHub Pages frontend deployment.
- Render Django backend deployment.
- PostgreSQL production database.
- Production registration testing.
- Production end-to-end role testing.

The application has been implemented, validated, tested and deployed with supporting screen-size, accessibility, automated-testing and validation evidence included in the project documentation.

## Author

**Richard Taylor**

Full-Stack Learning Management System Project
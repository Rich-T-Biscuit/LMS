import { useState } from "react";

import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

/* ==================================================
   Protected Route
   ================================================== */

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    (!user || !allowedRoles.includes(user.role))
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

/* ==================================================
   Login
   ================================================== */

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError(
        "Please enter your username and password."
      );
      return;
    }

    const result = login(
      username.trim(),
      password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard", {
      replace: true,
    });
  };

  return (
    <main className="page-container">
      <div className="form-card login-card">
        <h1>Learning Management System</h1>

        <h2>Login</h2>

        {error && (
          <div
            className="alert alert-error"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              placeholder="Enter your username"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="button button-primary"
          >
            Login
          </button>
        </form>

        <button
          type="button"
          className="link-button"
          onClick={() =>
            navigate("/forgot-password")
          }
        >
          Forgot password?
        </button>
      </div>
    </main>
  );
}

/* ==================================================
   Student Dashboard
   ================================================== */

function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <main className="page-container">
      <section className="page-header">
        <div>
          <h1>Student Dashboard</h1>

          <p>
            Welcome back, {user.name}.
          </p>
        </div>

        <button
          type="button"
          className="button button-secondary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>

      <section className="dashboard-user">
        <h2>Your Account</h2>

        <p>
          <strong>Username:</strong>{" "}
          {user.username}
        </p>

        <p>
          <strong>Role:</strong> Student
        </p>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <h2>My Courses</h2>

          <p>
            View the courses you are currently
            enrolled in.
          </p>

          <button
            type="button"
            className="button button-primary"
            onClick={() =>
              navigate("/courses")
            }
          >
            View Courses
          </button>
        </article>

        <article className="dashboard-card">
          <h2>Available Courses</h2>

          <p>
            Browse courses available for
            enrolment.
          </p>

          <button
            type="button"
            className="button button-secondary"
            onClick={() =>
              navigate("/courses")
            }
          >
            Browse Courses
          </button>
        </article>

        <article className="dashboard-card">
          <h2>Profile</h2>

          <p>
            View and manage your account
            information.
          </p>

          <button
            type="button"
            className="button button-secondary"
          >
            View Profile
          </button>
        </article>
      </section>
    </main>
  );
}

/* ==================================================
   Teacher Dashboard
   ================================================== */

function TeacherDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <main className="page-container">
      <section className="page-header">
        <div>
          <h1>Teacher Dashboard</h1>

          <p>
            Welcome back, {user.name}.
          </p>
        </div>

        <button
          type="button"
          className="button button-secondary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>

      <section className="dashboard-user">
        <h2>Your Account</h2>

        <p>
          <strong>Username:</strong>{" "}
          {user.username}
        </p>

        <p>
          <strong>Role:</strong> Teacher
        </p>
      </section>

      <section className="dashboard-grid dashboard-grid-centered">
        <article className="dashboard-card">
          <h2>Course Details</h2>

          <p>
            View and manage your courses. Create
            new courses or edit and delete existing
            courses.
          </p>

          <button
            type="button"
            className="button button-primary"
            onClick={() =>
              navigate("/teacher/courses")
            }
          >
            Course Details
          </button>
        </article>

        <article className="dashboard-card">
          <h2>Profile</h2>

          <p>
            View and manage your account
            information.
          </p>

          <button
            type="button"
            className="button button-secondary"
          >
            View Profile
          </button>
        </article>
      </section>
    </main>
  );
}

/* ==================================================
   Admin Dashboard
   ================================================== */

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <main className="page-container">
      <section className="page-header">
        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Welcome back, {user.name}.
          </p>
        </div>

        <button
          type="button"
          className="button button-secondary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>

      <section className="dashboard-user">
        <h2>Your Account</h2>

        <p>
          <strong>Username:</strong>{" "}
          {user.username}
        </p>

        <p>
          <strong>Role:</strong> Administrator
        </p>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <h2>Manage Users</h2>

          <p>
            Search, update and delete user
            accounts.
          </p>

          <button
            type="button"
            className="button button-primary"
            onClick={() =>
              navigate("/admin/users")
            }
          >
            Manage Users
          </button>
        </article>

        <article className="dashboard-card">
          <h2>Manage Courses</h2>

          <p>
            View and manage all courses,
            regardless of teacher.
          </p>

          <button
            type="button"
            className="button button-secondary"
            onClick={() =>
              navigate("/admin/courses")
            }
          >
            Manage Courses
          </button>
        </article>

        <article className="dashboard-card">
          <h2>Profile</h2>

          <p>
            View and manage your account
            information.
          </p>

          <button
            type="button"
            className="button button-secondary"
          >
            View Profile
          </button>
        </article>
      </section>
    </main>
  );
}

/* ==================================================
   Dashboard Selector
   ================================================== */

function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "teacher") {
    return <TeacherDashboard />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  return <StudentDashboard />;
}

/* ==================================================
   Student Courses
   ================================================== */

function Courses() {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Introduction to Python",
      category: "Programming",
      description:
        "Learn the fundamentals of Python programming, including variables, functions and data structures.",
      teacher: "Teacher User",
    },
    {
      id: 2,
      title:
        "Introduction to Web Development",
      category: "Web Development",
      description:
        "Learn HTML, CSS and JavaScript fundamentals for building modern websites.",
      teacher: "Teacher User",
    },
    {
      id: 3,
      title: "Introduction to SQL",
      category: "Database",
      description:
        "Learn how databases work and how to retrieve and manage data using SQL.",
      teacher: "Another Teacher",
    },
  ];

  return (
    <main className="page-container">
      <section className="page-header">
        <div>
          <h1>Courses</h1>

          <p>
            Browse available courses.
          </p>
        </div>
      </section>

      <section className="course-grid">
        {courses.map((course) => (
          <article
            className="course-card"
            key={course.id}
          >
            <div className="course-card-content">
              <span className="course-category">
                {course.category}
              </span>

              <h2>{course.title}</h2>

              <p>{course.description}</p>

              <p className="course-teacher">
                <strong>Teacher:</strong>{" "}
                {course.teacher}
              </p>

              <button
                type="button"
                className="button button-primary"
              >
                View Course
              </button>
            </div>
          </article>
        ))}
      </section>

      <div className="page-navigation">
        <button
          type="button"
          className="button button-secondary"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}

/* ==================================================
   Teacher Course Details
   ================================================== */

function TeacherCourses() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to Python",
      category: "Programming",
      description:
        "Learn the fundamentals of Python programming.",
      teacher: "Teacher User",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      category: "Web Development",
      description:
        "Develop more advanced JavaScript skills.",
      teacher: "Teacher User",
    },
    {
      id: 3,
      title: "Database Design",
      category: "Database",
      description:
        "Learn the principles of relational database design.",
      teacher: "Another Teacher",
    },
  ]);

  const [showForm, setShowForm] =
    useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const teacherCourses = courses.filter(
    (course) =>
      course.teacher === user.name
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleCreate = (event) => {
    event.preventDefault();

    const newCourse = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      description: formData.description,
      teacher: user.name,
    };

    setCourses((currentCourses) => [
      ...currentCourses,
      newCourse,
    ]);

    setFormData({
      title: "",
      category: "",
      description: "",
    });

    setShowForm(false);
  };

  const handleDelete = (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    setCourses((currentCourses) =>
      currentCourses.filter(
        (course) => course.id !== courseId
      )
    );
  };

  return (
    <main className="page-container">
      <section className="page-header teacher-course-header">
        <div>
          <h1>Course Details</h1>

          <p>
            Manage the courses you teach.
          </p>
        </div>
      </section>

      <div className="create-course-container">
        <button
          type="button"
          className="button button-primary"
          onClick={() =>
            setShowForm(!showForm)
          }
        >
          {showForm
            ? "Cancel"
            : "Create New Course"}
        </button>
      </div>

      {showForm && (
        <section className="form-card">
          <h2>Create New Course</h2>

          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label htmlFor="course-title">
                Course Name
              </label>

              <input
                type="text"
                id="course-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="course-category">
                Category
              </label>

              <input
                type="text"
                id="course-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="course-description">
                Description
              </label>

              <textarea
                id="course-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            <button
              type="submit"
              className="button button-primary"
            >
              Create Course
            </button>
          </form>
        </section>
      )}

      <section className="course-list">
        {teacherCourses.length === 0 ? (
          <div className="empty-state">
            <h2>No Courses</h2>

            <p>
              You do not currently have any
              courses.
            </p>
          </div>
        ) : (
          teacherCourses.map((course) => (
            <article
              className="management-card"
              key={course.id}
            >
              <div className="management-card-content">
                <span className="course-category">
                  {course.category}
                </span>

                <h2>{course.title}</h2>

                <p>{course.description}</p>

                <p>
                  <strong>Teacher:</strong>{" "}
                  {course.teacher}
                </p>
              </div>

              <div className="management-card-actions">
                <button
                  type="button"
                  className="button button-secondary"
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="button button-danger"
                  onClick={() =>
                    handleDelete(course.id)
                  }
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      <div className="page-navigation">
        <button
          type="button"
          className="button button-secondary"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}

/* ==================================================
   Admin Manage Courses
   ================================================== */

function AdminCourses() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] =
    useState("");

  const courses = [
    {
      id: 1,
      title: "Introduction to Python",
      category: "Programming",
      teacher: "Teacher User",
      description:
        "Learn the fundamentals of Python programming.",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      category: "Web Development",
      teacher: "Teacher User",
      description:
        "Develop more advanced JavaScript skills.",
    },
    {
      id: 3,
      title: "Database Design",
      category: "Database",
      teacher: "Another Teacher",
      description:
        "Learn the principles of relational database design.",
    },
  ];

  const search = searchTerm.toLowerCase();

  const filteredCourses = courses.filter(
    (course) =>
      course.title
        .toLowerCase()
        .includes(search) ||
      course.category
        .toLowerCase()
        .includes(search) ||
      course.teacher
        .toLowerCase()
        .includes(search)
  );

  return (
    <main className="page-container">
      <section className="page-header">
        <div>
          <h1>Manage Courses</h1>

          <p>
            View and manage all courses.
          </p>
        </div>
      </section>

      <section className="search-section">
        <label htmlFor="course-search">
          Search Courses
        </label>

        <input
          type="search"
          id="course-search"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(
              event.target.value
            );
          }}
          placeholder="Search by course, category or teacher..."
        />
      </section>

      <section className="course-list">
        {filteredCourses.length === 0 ? (
          <div className="empty-state">
            <h2>No Courses Found</h2>

            <p>
              No courses match your search.
            </p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <article
              className="management-card"
              key={course.id}
            >
              <div className="management-card-content">
                <span className="course-category">
                  {course.category}
                </span>

                <h2>{course.title}</h2>

                <p>{course.description}</p>

                <p>
                  <strong>Teacher:</strong>{" "}
                  {course.teacher}
                </p>
              </div>

              <div className="management-card-actions">
                <button
                  type="button"
                  className="button button-secondary"
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="button button-danger"
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      <div className="page-navigation">
        <button
          type="button"
          className="button button-secondary"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}

/* ==================================================
   Admin Manage Users
   ================================================== */

function AdminUsers() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] =
    useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "student",
      email: "student@example.com",
      role: "student",
    },
    {
      id: 2,
      username: "teacher",
      email: "teacher@example.com",
      role: "teacher",
    },
    {
      id: 3,
      username: "admin",
      email: "admin@example.com",
      role: "admin",
    },
  ]);

  const handleUserChange = (
    id,
    field,
    value
  ) => {
    setUsers((currentUsers) => {
      return currentUsers.map(
        (currentUser) => {
          if (currentUser.id === id) {
            return {
              ...currentUser,
              [field]: value,
            };
          }

          return currentUser;
        }
      );
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user account?"
    );

    if (!confirmed) {
      return;
    }

    setUsers((currentUsers) => {
      return currentUsers.filter(
        (currentUser) =>
          currentUser.id !== id
      );
    });
  };

  const search = searchTerm.toLowerCase();

  const filteredUsers = users.filter(
    (currentUser) => {
      return (
        currentUser.username
          .toLowerCase()
          .includes(search) ||
        currentUser.email
          .toLowerCase()
          .includes(search) ||
        currentUser.role
          .toLowerCase()
          .includes(search)
      );
    }
  );

  return (
    <main className="page-container">
      <section className="page-header">
        <div>
          <h1>Manage Users</h1>

          <p>
            Search and manage user accounts.
          </p>
        </div>
      </section>

      <section className="search-section">
        <label htmlFor="user-search">
          Search Users
        </label>

        <input
          type="search"
          id="user-search"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(
              event.target.value
            );
          }}
          placeholder="Search by username, email or role..."
        />
      </section>

      <section className="user-list">
        {filteredUsers.length === 0 ? (
          <div className="empty-state">
            <h2>No Users Found</h2>

            <p>
              No users match your search.
            </p>
          </div>
        ) : (
          filteredUsers.map(
            (currentUser) => (
              <article
                className="user-management-card"
                key={currentUser.id}
              >
                <div className="user-management-fields">
                  <div className="form-group">
                    <label
                      htmlFor={
                        "username-" +
                        currentUser.id
                      }
                    >
                      Username
                    </label>

                    <input
                      type="text"
                      id={
                        "username-" +
                        currentUser.id
                      }
                      value={
                        currentUser.username
                      }
                      onChange={(event) => {
                        handleUserChange(
                          currentUser.id,
                          "username",
                          event.target.value
                        );
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor={
                        "email-" +
                        currentUser.id
                      }
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      id={
                        "email-" +
                        currentUser.id
                      }
                      value={
                        currentUser.email
                      }
                      onChange={(event) => {
                        handleUserChange(
                          currentUser.id,
                          "email",
                          event.target.value
                        );
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor={
                        "role-" +
                        currentUser.id
                      }
                    >
                      Role
                    </label>

                    <select
                      id={
                        "role-" +
                        currentUser.id
                      }
                      value={
                        currentUser.role
                      }
                      onChange={(event) => {
                        handleUserChange(
                          currentUser.id,
                          "role",
                          event.target.value
                        );
                      }}
                    >
                      <option value="student">
                        Student
                      </option>

                      <option value="teacher">
                        Teacher
                      </option>

                      <option value="admin">
                        Admin
                      </option>
                    </select>
                  </div>
                </div>

                <div className="management-card-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => {
                      window.alert(
                        "User changes saved successfully."
                      );
                    }}
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="button button-danger"
                    onClick={() => {
                      handleDelete(
                        currentUser.id
                      );
                    }}
                  >
                    Delete User
                  </button>
                </div>
              </article>
            )
          )
        )}
      </section>

      <div className="page-navigation">
        <button
          type="button"
          className="button button-secondary"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}

/* ==================================================
   Forgot Password
   ================================================== */

function ForgotPassword() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage(
      "If an account exists for this username, password reset instructions will be provided."
    );
  };

  return (
    <main className="page-container">
      <div className="form-card">
        <h1>Reset Password</h1>

        <p>
          Enter your username to request a
          password reset.
        </p>

        {message && (
          <div
            className="alert alert-success"
            role="status"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reset-username">
              Username
            </label>

            <input
              type="text"
              id="reset-username"
              value={username}
              onChange={(event) => {
                setUsername(
                  event.target.value
                );
              }}
              placeholder="Enter your username"
              required
            />
          </div>

          <button
            type="submit"
            className="button button-primary"
          >
            Request Password Reset
          </button>
        </form>

        <button
          type="button"
          className="link-button"
          onClick={() =>
            navigate("/login")
          }
        >
          Return to Login
        </button>
      </div>
    </main>
  );
}

/* ==================================================
   Not Found
   ================================================== */

function NotFound() {
  return (
    <main className="page-container">
      <div className="empty-state">
        <h1>Page Not Found</h1>

        <p>
          The page you are looking for does not
          exist.
        </p>
      </div>
    </main>
  );
}

/* ==================================================
   Application Routes
   ================================================== */

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute
            allowedRoles={["student"]}
          >
            <Courses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/courses"
        element={
          <ProtectedRoute
            allowedRoles={["teacher"]}
          >
            <TeacherCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute
            allowedRoles={["admin"]}
          >
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/courses"
        element={
          <ProtectedRoute
            allowedRoles={["admin"]}
          >
            <AdminCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;

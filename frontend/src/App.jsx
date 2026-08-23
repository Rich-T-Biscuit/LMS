import { useEffect, useState } from "react";

import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import { API_BASE_URL } from "./config/api";

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

const handleSubmit = async (event) => {
  event.preventDefault();
  setError("");

  if (!username.trim() || !password) {
    setError(
      "Please enter your username and password."
    );
    return;
  }

  const result = await login(
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

  const handleLogout = async () => {
    await logout();

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
            Welcome back, {user.username}.
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
              navigate("/available-courses")
            }
          >
            Browse Courses
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

  const handleLogout = async () => {
    await logout();

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
            Welcome back, {user.username}.
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

      <section className="dashboard-grid">
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

  const handleLogout = async () => {
    await logout();

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
            Welcome back, {user.username}.
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

function MyCourses() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const headers = {
          Authorization: `Token ${token}`,
        };

        const [coursesResponse, enrollmentsResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/api/courses/`, {
              headers,
            }),
            fetch(`${API_BASE_URL}/api/enrollments/`, {
              headers,
            }),
          ]);

        if (
          !coursesResponse.ok ||
          !enrollmentsResponse.ok
        ) {
          throw new Error(
            "Unable to load course information."
          );
        }

        const coursesData =
          await coursesResponse.json();

        const enrollmentsData =
          await enrollmentsResponse.json();

        setCourses(coursesData);
        setEnrollments(enrollmentsData);
      } catch {
        setError(
          "Unable to load your courses. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [token]);

  const enrolledCourseIds = enrollments.map(
    (enrollment) => enrollment.course
  );

  const myCourses = courses.filter((course) =>
    enrolledCourseIds.includes(course.id)
  );

  if (loading) {
    return (
      <main className="page-container">
        <div
          className="empty-state"
          role="status"
          aria-live="polite"
        >
          <h1>My Courses</h1>
          <p>Loading courses...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <section className="page-header">
        <div>
          <h1>My Courses</h1>

          <p>
            View the courses you are currently
            enrolled in.
          </p>
        </div>
      </section>

      {error && (
        <div
          className="alert alert-error"
          role="alert"
        >
          {error}
        </div>
      )}

      <section>
        {myCourses.length === 0 ? (
          <div className="empty-state">
            <p>
              You are not currently enrolled in any
              courses.
            </p>
          </div>
        ) : (
          <div className="course-grid">
            {myCourses.map((course) => (
              <article
                className="course-card"
                key={course.id}
              >
                <div className="course-card-content">
                  <h2>{course.title}</h2>

                  <p>{course.description}</p>

                  <p className="course-teacher">
                    <strong>Teacher:</strong>{" "}
                    {course.teacher_name}
                  </p>
                </div>
              </article>
            ))}
          </div>
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
   Student Available Courses
   ================================================== */

function AvailableCourses() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const headers = {
          Authorization: `Token ${token}`,
        };

        const [coursesResponse, enrollmentsResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/api/courses/`, {
              headers,
            }),
            fetch(`${API_BASE_URL}/api/enrollments/`, {
              headers,
            }),
          ]);

        if (
          !coursesResponse.ok ||
          !enrollmentsResponse.ok
        ) {
          throw new Error(
            "Unable to load course information."
          );
        }

        const coursesData =
          await coursesResponse.json();

        const enrollmentsData =
          await enrollmentsResponse.json();

        setCourses(coursesData);
        setEnrollments(enrollmentsData);
      } catch {
        setError(
          "Unable to load available courses. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [token]);

  const enrolledCourseIds = enrollments.map(
    (enrollment) => enrollment.course
  );

  const availableCourses = courses.filter(
    (course) =>
      !enrolledCourseIds.includes(course.id)
  );

  const handleEnroll = async (courseId) => {
    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/enrollments/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course: courseId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to enrol in this course."
        );
      }

      const newEnrollment = await response.json();

      setEnrollments((currentEnrollments) => [
        ...currentEnrollments,
        newEnrollment,
      ]);

      setMessage(
        "You have successfully enrolled in the course."
      );
    } catch {
      setError(
        "Unable to enrol in this course. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <main className="page-container">
        <div
          className="empty-state"
          role="status"
          aria-live="polite"
        >
          <h1>Available Courses</h1>
          <p>Loading courses...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <section className="page-header">
        <div>
          <h1>Available Courses</h1>

          <p>
            Browse courses available for
            enrolment.
          </p>
        </div>
      </section>

      {error && (
        <div
          className="alert alert-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {message && (
        <div
          className="alert alert-success"
          role="status"
        >
          {message}
        </div>
      )}

      <section>
        {availableCourses.length === 0 ? (
          <div className="empty-state">
            <p>
              There are no additional courses
              available for enrolment.
            </p>
          </div>
        ) : (
          <div className="course-grid">
            {availableCourses.map((course) => (
              <article
                className="course-card"
                key={course.id}
              >
                <div className="course-card-content">
                  <h2>{course.title}</h2>

                  <p>{course.description}</p>

                  <p className="course-teacher">
                    <strong>Teacher:</strong>{" "}
                    {course.teacher_name}
                  </p>

                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() =>
                      handleEnroll(course.id)
                    }
                  >
                    Enrol
                  </button>
                </div>
              </article>
            ))}
          </div>
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
   Teacher Course Details
   ================================================== */

function TeacherCourses() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] =
    useState(false);
  const [editingCourseId, setEditingCourseId] =
    useState(null);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] =
    useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/courses/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load courses."
          );
        }

        const data = await response.json();

        const teacherCourses = data.filter(
          (course) =>
            course.teacher === user.id
        );

        setCourses(teacherCourses);
      } catch {
        setError(
          "Unable to load your courses. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [token, user.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
    });

    setEditingCourseId(null);
    setShowForm(false);
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/courses/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            description:
              formData.description,
            teacher: user.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to create course."
        );
      }

      const newCourse =
        await response.json();

      setCourses((currentCourses) => [
        ...currentCourses,
        newCourse,
      ]);

      resetForm();

      setMessage(
        "Course created successfully."
      );
    } catch {
      setError(
        "Unable to create the course. Please try again."
      );
    }
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
    });

    setEditingCourseId(course.id);
    setShowForm(true);
    setError("");
    setMessage("");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/courses/${editingCourseId}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            description:
              formData.description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to update course."
        );
      }

      const updatedCourse =
        await response.json();

      setCourses((currentCourses) =>
        currentCourses.map((course) =>
          course.id === updatedCourse.id
            ? updatedCourse
            : course
        )
      );

      resetForm();

      setMessage(
        "Course updated successfully."
      );
    } catch {
      setError(
        "Unable to update the course. Please try again."
      );
    }
  };

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/courses/${courseId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete course."
        );
      }

      setCourses((currentCourses) =>
        currentCourses.filter(
          (course) =>
            course.id !== courseId
        )
      );

      if (editingCourseId === courseId) {
        resetForm();
      }

      setMessage(
        "Course deleted successfully."
      );
    } catch {
      setError(
        "Unable to delete the course. Please try again."
      );
    }
  };

  const handleCancelForm = () => {
    resetForm();
    setError("");
  };

  if (loading) {
    return (
      <main className="page-container">
        <div
          className="empty-state"
          role="status"
          aria-live="polite"
        >
          <h1>Course Details</h1>
          <p>Loading courses...</p>
        </div>
      </main>
    );
  }

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

      {error && (
        <div
          className="alert alert-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {message && (
        <div
          className="alert alert-success"
          role="status"
        >
          {message}
        </div>
      )}

      <div className="create-course-container">
        <button
          type="button"
          className="button button-primary"
          onClick={() => {
            if (showForm) {
              handleCancelForm();
            } else {
              setShowForm(true);
              setEditingCourseId(null);
              setFormData({
                title: "",
                description: "",
              });
              setError("");
              setMessage("");
            }
          }}
        >
          {showForm
            ? "Cancel"
            : "Create New Course"}
        </button>
      </div>

      {showForm && (
        <section className="form-card">
          <h2>
            {editingCourseId
              ? "Edit Course"
              : "Create New Course"}
          </h2>

          <form
            onSubmit={
              editingCourseId
                ? handleUpdate
                : handleCreate
            }
          >
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
              {editingCourseId
                ? "Save Changes"
                : "Create Course"}
            </button>
          </form>
        </section>
      )}

      <section className="course-list">
        {courses.length === 0 ? (
          <div className="empty-state">
            <h2>No Courses</h2>

            <p>
              You do not currently have any
              courses.
            </p>
          </div>
        ) : (
          courses.map((course) => (
            <article
              className="management-card"
              key={course.id}
            >
              <div className="management-card-content">
                <h2>{course.title}</h2>

                <p>{course.description}</p>

                <p>
                  <strong>Teacher:</strong>{" "}
                  {course.teacher_name || user.username}
                </p>
              </div>

              <div className="management-card-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() =>
                    handleEdit(course)
                  }
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
  const { token } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] =
    useState("");
  const [showForm, setShowForm] =
    useState(false);
  const [editingCourseId, setEditingCourseId] =
    useState(null);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] =
    useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    teacher: "",
  });
  useEffect(() => {
    const loadAdminData = async () => {
      try {
        setLoading(true);
        setError("");

        const headers = {
          Authorization: `Token ${token}`,
        };

        const [coursesResponse, usersResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/api/courses/`, {
              headers,
            }),
            fetch(`${API_BASE_URL}/api/users/`, {
              headers,
            }),
          ]);

        if (
          !coursesResponse.ok ||
          !usersResponse.ok
        ) {
          throw new Error(
            "Unable to load course information."
          );
        }

        const coursesData =
          await coursesResponse.json();

        const usersData =
          await usersResponse.json();

        const teacherUsers = usersData.filter(
          (currentUser) =>
            currentUser.role === "TEACHER"
        );

        setCourses(coursesData);
        setTeachers(teacherUsers);
      } catch {
        setError(
          "Unable to load courses. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      teacher: "",
    });

    setEditingCourseId(null);
    setShowForm(false);
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/courses/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            description:
              formData.description,
            teacher: Number(formData.teacher),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to create course."
        );
      }

      const newCourse =
        await response.json();

      setCourses((currentCourses) => [
        ...currentCourses,
        newCourse,
      ]);

      resetForm();

      setMessage(
        "Course created successfully."
      );
    } catch {
      setError(
        "Unable to create the course. Please try again."
      );
    }
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
      teacher: String(course.teacher),
    });

    setEditingCourseId(course.id);
    setShowForm(true);
    setError("");
    setMessage("");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/courses/${editingCourseId}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            description:
              formData.description,
            teacher: Number(formData.teacher),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to update course."
        );
      }

      const updatedCourse =
        await response.json();

      setCourses((currentCourses) =>
        currentCourses.map((course) =>
          course.id === updatedCourse.id
            ? updatedCourse
            : course
        )
      );

      resetForm();

      setMessage(
        "Course updated successfully."
      );
    } catch {
      setError(
        "Unable to update the course. Please try again."
      );
    }
  };

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/courses/${courseId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete course."
        );
      }

      setCourses((currentCourses) =>
        currentCourses.filter(
          (course) =>
            course.id !== courseId
        )
      );

      if (editingCourseId === courseId) {
        resetForm();
      }

      setMessage(
        "Course deleted successfully."
      );
    } catch {
      setError(
        "Unable to delete the course. Please try again."
      );
    }
  };

  const handleCancelForm = () => {
    resetForm();
    setError("");
  };

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find(
      (currentTeacher) =>
        currentTeacher.id === teacherId
    );

    return teacher
      ? teacher.username
      : `Teacher ID ${teacherId}`;
  };

  const search = searchTerm.toLowerCase();

  const filteredCourses = courses.filter(
    (course) => {
      const teacherName =
        getTeacherName(course.teacher);

      return (
        course.title
          .toLowerCase()
          .includes(search) ||
        course.description
          .toLowerCase()
          .includes(search) ||
        teacherName
          .toLowerCase()
          .includes(search)
      );
    }
  );

  if (loading) {
    return (
      <main className="page-container">
        <div
          className="empty-state"
          role="status"
          aria-live="polite"
        >
          <h1>Manage Courses</h1>
          <p>Loading courses...</p>
        </div>
      </main>
    );
  }

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

      {error && (
        <div
          className="alert alert-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {message && (
        <div
          className="alert alert-success"
          role="status"
        >
          {message}
        </div>
      )}

      <div className="create-course-container">
        <button
          type="button"
          className="button button-primary"
          onClick={() => {
            if (showForm) {
              handleCancelForm();
            } else {
              setShowForm(true);
              setEditingCourseId(null);
              setFormData({
                title: "",
                description: "",
                teacher: "",
              });
              setError("");
              setMessage("");
            }
          }}
        >
          {showForm
            ? "Cancel"
            : "Create New Course"}
        </button>
      </div>

      {showForm && (
        <section className="form-card">
          <h2>
            {editingCourseId
              ? "Edit Course"
              : "Create New Course"}
          </h2>

          <form
            onSubmit={
              editingCourseId
                ? handleUpdate
                : handleCreate
            }
          >
            <div className="form-group">
              <label htmlFor="admin-course-title">
                Course Name
              </label>

              <input
                type="text"
                id="admin-course-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="admin-course-description">
                Description
              </label>

              <textarea
                id="admin-course-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="admin-course-teacher">
                Teacher
              </label>

              <select
                id="admin-course-teacher"
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select a teacher
                </option>

                {teachers.map((teacher) => (
                  <option
                    key={teacher.id}
                    value={teacher.id}
                  >
                    {teacher.username}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="button button-primary"
            >
              {editingCourseId
                ? "Save Changes"
                : "Create Course"}
            </button>
          </form>
        </section>
      )}

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
          placeholder="Search by course or teacher..."
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
                <h2>{course.title}</h2>

                <p>{course.description}</p>

                <p>
                  <strong>Teacher:</strong>{" "}
                  {getTeacherName(
                    course.teacher
                  )}
                </p>
              </div>

              <div className="management-card-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() =>
                    handleEdit(course)
                  }
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
   Admin Manage Users
   ================================================== */

function AdminUsers() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] =
    useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] =
    useState("");
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/users/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load users."
          );
        }

        const data = await response.json();

        setUsers(
          data.map((currentUser) => ({
            ...currentUser,
            role: currentUser.role.toLowerCase(),
          }))
        );
      } catch {
        setError(
          "Unable to load users. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [token]);

  const handleUserChange = (
    id,
    field,
    value
  ) => {
    setUsers((currentUsers) =>
      currentUsers.map((currentUser) =>
        currentUser.id === id
          ? {
              ...currentUser,
              [field]: value,
            }
          : currentUser
      )
    );
  };

  const handleSave = async (currentUser) => {
    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/users/${currentUser.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            username: currentUser.username,
            email: currentUser.email,
            role: currentUser.role.toUpperCase(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to update user."
        );
      }

      const updatedUser =
        await response.json();

      setUsers((currentUsers) =>
        currentUsers.map((existingUser) =>
          existingUser.id === updatedUser.id
            ? {
                ...updatedUser,
                role:
                  updatedUser.role.toLowerCase(),
              }
            : existingUser
        )
      );

      setMessage(
        "User changes saved successfully."
      );
    } catch {
      setError(
        "Unable to save user changes. Please try again."
      );
    }
  };

  const handleDelete = async (
    currentUser
  ) => {
    if (currentUser.id === user.id) {
      setError(
        "You cannot delete the account you are currently signed in with."
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this user account?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/users/${currentUser.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete user."
        );
      }

      setUsers((currentUsers) =>
        currentUsers.filter(
          (existingUser) =>
            existingUser.id !== currentUser.id
        )
      );

      setMessage(
        "User deleted successfully."
      );
    } catch {
      setError(
        "Unable to delete the user. Please try again."
      );
    }
  };

  const search = searchTerm.toLowerCase();

  const filteredUsers = users.filter(
    (currentUser) =>
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

  if (loading) {
    return (
      <main className="page-container">
        <div
          className="empty-state"
          role="status"
          aria-live="polite"
        >
          <h1>Manage Users</h1>
          <p>Loading users...</p>
        </div>
      </main>
    );
  }

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

      {error && (
        <div
          className="alert alert-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {message && (
        <div
          className="alert alert-success"
          role="status"
        >
          {message}
        </div>
      )}

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
                    onClick={() =>
                      handleSave(currentUser)
                    }
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="button button-danger"
                    onClick={() =>
                      handleDelete(currentUser)
                    }
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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="page-container">
      <div className="empty-state">
        <h1>Page Not Found</h1>

        <p>
          The page you are looking for does not
          exist.
        </p>

        <button
          type="button"
          className="button button-primary"
          onClick={() =>
            navigate(
              isAuthenticated
                ? "/dashboard"
                : "/login"
            )
          }
        >
          {isAuthenticated
            ? "Back to Dashboard"
            : "Back to Login"}
        </button>
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
            <MyCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/available-courses"
        element={
          <ProtectedRoute
            allowedRoles={["student"]}
          >
            <AvailableCourses />
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
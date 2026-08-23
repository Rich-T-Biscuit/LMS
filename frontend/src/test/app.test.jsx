import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  afterEach,
  describe,
  expect,
  test,
} from "vitest";
import { MemoryRouter } from "react-router-dom";

import App from "../App";
import {
  AuthProvider,
} from "../context/AuthContext";


function renderApp(
  route = "/",
  user = null,
  token = null
) {
  localStorage.clear();

  if (user) {
    localStorage.setItem(
      "lmsUser",
      JSON.stringify(user)
    );
  }

  if (token) {
    localStorage.setItem(
      "lmsToken",
      token
    );
  }

  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );
}


afterEach(() => {
  cleanup();
  localStorage.clear();
});


describe("LMS routing and dashboards", () => {
  test(
    "redirects an unauthenticated user to login",
    async () => {
      renderApp("/dashboard");

      expect(
        await screen.findByRole(
          "heading",
          { name: "Login" }
        )
      ).toBeInTheDocument();
    }
  );

  test(
    "shows the student dashboard for a student",
    async () => {
      renderApp(
        "/dashboard",
        {
          id: 1,
          username: "student",
          email: "student@example.com",
          role: "student",
        },
        "student-test-token"
      );

      expect(
        await screen.findByRole(
          "heading",
          { name: "Student Dashboard" }
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Welcome back, student."
        )
      ).toBeInTheDocument();
    }
  );

  test(
    "shows the teacher dashboard for a teacher",
    async () => {
      renderApp(
        "/dashboard",
        {
          id: 2,
          username: "teacher1",
          email: "teacher1@example.com",
          role: "teacher",
        },
        "teacher-test-token"
      );

      expect(
        await screen.findByRole(
          "heading",
          { name: "Teacher Dashboard" }
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Welcome back, teacher1."
        )
      ).toBeInTheDocument();
    }
  );

  test(
    "shows the admin dashboard for an admin",
    async () => {
      renderApp(
        "/dashboard",
        {
          id: 3,
          username: "admin",
          email: "admin@example.com",
          role: "admin",
        },
        "admin-test-token"
      );

      expect(
        await screen.findByRole(
          "heading",
          { name: "Admin Dashboard" }
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Welcome back, admin."
        )
      ).toBeInTheDocument();
    }
  );

  test(
    "prevents a student accessing an admin route",
    async () => {
      renderApp(
        "/admin/users",
        {
          id: 1,
          username: "student",
          email: "student@example.com",
          role: "student",
        },
        "student-test-token"
      );

      expect(
        await screen.findByRole(
          "heading",
          { name: "Student Dashboard" }
        )
      ).toBeInTheDocument();

      expect(
        screen.queryByRole(
          "heading",
          { name: "Manage Users" }
        )
      ).not.toBeInTheDocument();
    }
  );
});

describe("LMS registration", () => {
  test(
    "shows the registration page",
    async () => {
      renderApp("/register");

      expect(
        await screen.findByRole(
          "heading",
          { name: "Create Account" }
        )
      ).toBeInTheDocument();

      expect(
        screen.getByLabelText("Username")
      ).toBeInTheDocument();

      expect(
        screen.getByLabelText("Email")
      ).toBeInTheDocument();

      expect(
        screen.getByLabelText("Password")
      ).toBeInTheDocument();

      expect(
        screen.getByLabelText(
          "Confirm Password"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "New accounts are created with Student access."
        )
      ).toBeInTheDocument();
    }
  );

  test(
    "rejects passwords that do not match",
    async () => {
      const user = userEvent.setup();

      renderApp("/register");

      await user.type(
        screen.getByLabelText("Username"),
        "newstudent"
      );

      await user.type(
        screen.getByLabelText("Email"),
        "newstudent@example.com"
      );

      await user.type(
        screen.getByLabelText("Password"),
        "TestPassword123!"
      );

      await user.type(
        screen.getByLabelText(
          "Confirm Password"
        ),
        "DifferentPassword123!"
      );

      await user.click(
        screen.getByRole(
          "button",
          { name: "Create Account" }
        )
      );

      expect(
        await screen.findByRole("alert")
      ).toHaveTextContent(
        "Passwords do not match."
      );
    }
  );
});

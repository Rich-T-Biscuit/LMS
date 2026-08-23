## Screen Size and Responsive Design Testing

### Login - Responsive
![Login Page - Responsive](screenshots/screen-sizes/R%20-%20Login.gif)

### Login - Pixel 10
![Login Page - Pixel 10](screenshots/screen-sizes/Pixel%20-%20Login.gif)

### Login - iPhone 16 Pro Max
![Login Page - iPhone 16 Pro Max](screenshots/screen-sizes/iPhone%20-%20Login.gif)

### Student Dashboard - Responsive
![Student Dashboard](screenshots/screen-sizes/R%20-%20Dash%20St.gif)

### Student Dashboard - Pixel 10
![Student Dashboard](screenshots/screen-sizes/Pixel%20-%20Dash%20St.gif)

### Student Dashboard - iPhone 16 Pro Max
![Student Dashboard](screenshots/screen-sizes/iPhone%20-%20Dash%20St.gif)

### Student My Courses - Responsive
![My Courses](screenshots/screen-sizes/R%20-%20St%20MC.gif)

### Student My Courses - Pixel 10
![My Courses](screenshots/screen-sizes/Pixel%20-%20St%20MC.gif)

### Student My Courses - iPhone 16 Pro Max
![My Courses](screenshots/screen-sizes/iPhone%20-%20St%20MC.gif)

### Available Courses - Responsive
![Available Courses](screenshots/screen-sizes/R%20-%20St%20AC.gif)

### Available Courses - Pixel 10
![Available Courses](screenshots/screen-sizes/Pixel%20-%20St%20AC.gif)

### Available Courses - iPhone 16 Pro Max
![Available Courses](screenshots/screen-sizes/iPhone%20-%20St%20AC.gif)

### Teacher Dashboard - Responsive
![Teacher Dashboard](screenshots/screen-sizes/R%20-%20Dash%20T.gif)

### Teacher Dashboard - Pixel 10
![Teacher Dashboard](screenshots/screen-sizes/Pixel%20-%20Dash%20T.gif)

### Teacher Dashboard - iPhone 16 Pro Max
![Teacher Dashboard](screenshots/screen-sizes/iPhone%20-%20Dash%20T.gif)

### Teacher Course Management - Responsive
![Teacher Course Management](screenshots/screen-sizes/R%20-%20TCD.gif)
![Teacher Course Management - Add & Edit](screenshots/screen-sizes/R%20-%20TCD%20A.E.gif)

### Teacher Course Management - Pixel 10
![Teacher Course Management](screenshots/screen-sizes/Pixel%20-%20TCD.gif)
![Teacher Course Management - Add & Edit](screenshots/screen-sizes/Pixel%20-%20TCD%20A.E.gif)

### Teacher Course Management - iPhone 16 Pro Max
![Teacher Course Management](screenshots/screen-sizes/iPhone%20-%20TCD.gif)
![Teacher Course Management - Add & Edit](screenshots/screen-sizes/iPhone%20-%20TCD%20A.E.gif)

### Admin Dashboard - Responsive
![Admin Dashboard](screenshots/screen-sizes/R%20-%20Dash%20A.gif)

### Admin Dashboard - Pixel 10
![Admin Dashboard](screenshots/screen-sizes/Pixel%20-%20Dash%20A.gif)

### Admin Dashboard - iPhone 16 Pro Max
![Admin Dashboard](screenshots/screen-sizes/iPhone%20-%20Dash%20A.gif)

### Admin Manage Users - Responsive
![Manage Users](screenshots/screen-sizes/R%20-%20AMU.gif)
![Manage Users - Search](screenshots/screen-sizes/R%20-%20AMU%20S.gif)

### Admin Manage Users - Pixel 10
![Manage Users](screenshots/screen-sizes/Pixel%20-%20AMU.gif)
![Manage Users - Search](screenshots/screen-sizes/Pixel%20-%20AMU%20S.gif)
![Manage Users - Role Drop Down](screenshots/screen-sizes/Pixel%20-%20AMU%20DD.gif)

### Admin Manage Users - iPhone 16 Pro Max
![Manage Users](screenshots/screen-sizes/iPhone%20-%20AMU.gif)
![Manage Users - Search](screenshots/screen-sizes/iPhone%20-%20AMU%20S.gif)
![Manage Users - Role Drop Down](screenshots/screen-sizes/iPhone%20-%20AMU%20DD.gif)

### Admin Manage Courses - Responsive
![Manage Courses](screenshots/screen-sizes/R%20-%20AMC.gif)
![Manage Courses - Search](screenshots/screen-sizes/R%20-%20AMC%20S.gif)
![Manage Courses - Create New & Edit](screenshots/screen-sizes/R%20-%20AMC%20A%20C.gif)

### Admin Manage Courses - Pixel 10
![Manage Courses](screenshots/screen-sizes/Pixel%20-%20AMC.gif)
![Manage Courses - Search](screenshots/screen-sizes/Pixel%20-%20AMC%20S.gif)
![Manage Courses - Create New & Edit](screenshots/screen-sizes/Pixel%20-%20AMC%20A.C.gif)

### Admin Manage Courses - iPhone 16 Pro Max
![Manage Courses](screenshots/screen-sizes/iPhone%20-%20AMC.gif)
![Manage Courses - Search](screenshots/screen-sizes/iPhone%20-%20AMC%20S.gif)
![Manage Courses - Create New & Edit](screenshots/screen-sizes/iPhone%20-%20AMC%20A.C.gif)

## Validation Testing

### W3C HTML Validation
The deployed application was tested using the W3C HTML Validator.

**Result:** Passed — no errors or warnings.

![W3C HTML validation](screenshots/validation/w3c-html.png)

### W3C Jigsaw CSS Validation
The deployed application was tested using the W3C CSS Validation Service.

**Result:** Passed — no errors found.

![W3C CSS validation](screenshots/validation/jigsaw-css.png)

### Python Validation — Flake8
The Django backend was checked using Flake8. Initial formatting issues were identified and corrected before validation was run again.

**Final result:** Passed — no linting violations found.

![Flake8 validation](screenshots/validation/python-lint.png)

### Django System Check and Automated Tests
The Django system check and automated backend test suite were run after the linting amendments.

**Result:** Passed — no system-check issues and 17/17 automated tests passed.

![Django tests](screenshots/validation/django-tests.png)

### React Automated Tests, ESLint and Production Build
The React frontend was tested with Vitest and React Testing Library. ESLint and the Vite production build were then run as final frontend safety checks.

**Results:**
- Vitest / React Testing Library: 5/5 tests passed.
- ESLint: 0 errors and 1 non-blocking React Fast Refresh warning.
- Vite production build: passed with 43 modules transformed.

![React tests and validation](screenshots/validation/react-tests.png)

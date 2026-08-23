from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from users.models import User

from .models import Course, Enrollment


class CoursePermissionTests(APITestCase):
    def setUp(self):
        self.student = User.objects.create_user(
            username="teststudent",
            password="TestPassword123!",
            role=User.Role.STUDENT,
        )

        self.teacher_one = User.objects.create_user(
            username="teacherone",
            password="TestPassword123!",
            role=User.Role.TEACHER,
        )

        self.teacher_two = User.objects.create_user(
            username="teachertwo",
            password="TestPassword123!",
            role=User.Role.TEACHER,
        )

        self.admin = User.objects.create_user(
            username="testadmin",
            password="TestPassword123!",
            role=User.Role.ADMIN,
        )

        self.course = Course.objects.create(
            title="Teacher One Course",
            description="Course used for API permission testing.",
            teacher=self.teacher_one,
        )

        self.course_list_url = reverse("course-list")

    def test_unauthenticated_user_cannot_access_courses(self):
        response = self.client.get(self.course_list_url)

        self.assertIn(
            response.status_code,
            [
                status.HTTP_401_UNAUTHORIZED,
                status.HTTP_403_FORBIDDEN,
            ],
        )

    def test_student_can_view_courses(self):
        self.client.force_authenticate(
            user=self.student
        )

        response = self.client.get(
            self.course_list_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

    def test_student_cannot_create_course(self):
        self.client.force_authenticate(
            user=self.student
        )

        response = self.client.post(
            self.course_list_url,
            {
                "title": "Student Course",
                "description": (
                    "This should not be created."
                ),
                "teacher": self.teacher_one.id,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

    def test_teacher_can_create_course(self):
        self.client.force_authenticate(
            user=self.teacher_one
        )

        response = self.client.post(
            self.course_list_url,
            {
                "title": "New Teacher Course",
                "description": (
                    "Created by teacher one."
                ),
                "teacher": self.teacher_two.id,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        created_course = Course.objects.get(
            title="New Teacher Course"
        )

        self.assertEqual(
            created_course.teacher,
            self.teacher_one,
        )

    def test_teacher_can_update_own_course(self):
        self.client.force_authenticate(
            user=self.teacher_one
        )

        url = reverse(
            "course-detail",
            args=[self.course.id],
        )

        response = self.client.patch(
            url,
            {
                "title": "Updated Course",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.course.refresh_from_db()

        self.assertEqual(
            self.course.title,
            "Updated Course",
        )

    def test_teacher_cannot_update_another_teachers_course(
        self,
    ):
        self.client.force_authenticate(
            user=self.teacher_two
        )

        url = reverse(
            "course-detail",
            args=[self.course.id],
        )

        response = self.client.patch(
            url,
            {
                "title": "Unauthorised Update",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.course.refresh_from_db()

        self.assertEqual(
            self.course.title,
            "Teacher One Course",
        )

    def test_teacher_cannot_delete_another_teachers_course(
        self,
    ):
        self.client.force_authenticate(
            user=self.teacher_two
        )

        url = reverse(
            "course-detail",
            args=[self.course.id],
        )

        response = self.client.delete(url)

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.assertTrue(
            Course.objects.filter(
                id=self.course.id
            ).exists()
        )

    def test_admin_can_update_any_course(self):
        self.client.force_authenticate(
            user=self.admin
        )

        url = reverse(
            "course-detail",
            args=[self.course.id],
        )

        response = self.client.patch(
            url,
            {
                "title": "Admin Updated Course",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.course.refresh_from_db()

        self.assertEqual(
            self.course.title,
            "Admin Updated Course",
        )


class EnrollmentPermissionTests(APITestCase):
    def setUp(self):
        self.student = User.objects.create_user(
            username="teststudent",
            password="TestPassword123!",
            role=User.Role.STUDENT,
        )

        self.teacher = User.objects.create_user(
            username="testteacher",
            password="TestPassword123!",
            role=User.Role.TEACHER,
        )

        self.admin = User.objects.create_user(
            username="testadmin",
            password="TestPassword123!",
            role=User.Role.ADMIN,
        )

        self.course = Course.objects.create(
            title="Test Course",
            description="Enrollment test course.",
            teacher=self.teacher,
        )

        self.enrollment_list_url = reverse(
            "enrollment-list"
        )

    def test_student_can_enroll(self):
        self.client.force_authenticate(
            user=self.student
        )

        response = self.client.post(
            self.enrollment_list_url,
            {
                "course": self.course.id,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertTrue(
            Enrollment.objects.filter(
                student=self.student,
                course=self.course,
            ).exists()
        )

    def test_teacher_cannot_enroll(self):
        self.client.force_authenticate(
            user=self.teacher
        )

        response = self.client.post(
            self.enrollment_list_url,
            {
                "course": self.course.id,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

    def test_admin_cannot_enroll(self):
        self.client.force_authenticate(
            user=self.admin
        )

        response = self.client.post(
            self.enrollment_list_url,
            {
                "course": self.course.id,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

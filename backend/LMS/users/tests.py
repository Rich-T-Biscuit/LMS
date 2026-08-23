from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User


class UserPermissionTests(APITestCase):
    def setUp(self):
        self.student = User.objects.create_user(
            username="teststudent",
            email="student@example.com",
            password="TestPassword123!",
            role=User.Role.STUDENT,
        )

        self.teacher = User.objects.create_user(
            username="testteacher",
            email="teacher@example.com",
            password="TestPassword123!",
            role=User.Role.TEACHER,
        )

        self.admin = User.objects.create_user(
            username="testadmin",
            email="admin@example.com",
            password="TestPassword123!",
            role=User.Role.ADMIN,
        )

        self.user_list_url = reverse("user-list")

    def test_unauthenticated_user_cannot_access_users(self):
        response = self.client.get(self.user_list_url)

        self.assertIn(
            response.status_code,
            [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN],
        )

    def test_student_cannot_access_users(self):
        self.client.force_authenticate(user=self.student)

        response = self.client.get(self.user_list_url)

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

    def test_teacher_cannot_access_users(self):
        self.client.force_authenticate(user=self.teacher)

        response = self.client.get(self.user_list_url)

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

    def test_admin_can_access_users(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.get(self.user_list_url)

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

    def test_admin_can_update_user(self):
        self.client.force_authenticate(user=self.admin)

        url = reverse(
            "user-detail",
            args=[self.student.id],
        )

        response = self.client.patch(
            url,
            {
                "email": "updated@example.com",
                "role": User.Role.TEACHER,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.student.refresh_from_db()

        self.assertEqual(
            self.student.email,
            "updated@example.com",
        )

        self.assertEqual(
            self.student.role,
            User.Role.TEACHER,
        )

    def test_admin_can_delete_user(self):
        disposable_user = User.objects.create_user(
            username="deleteuser",
            password="TestPassword123!",
            role=User.Role.STUDENT,
        )

        self.client.force_authenticate(user=self.admin)

        url = reverse(
            "user-detail",
            args=[disposable_user.id],
        )

        response = self.client.delete(url)

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
        )

        self.assertFalse(
            User.objects.filter(
                id=disposable_user.id
            ).exists()
        )

from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from courses.views import CourseViewSet, EnrollmentViewSet
from users.views import CustomAuthToken, UserViewSet


router = DefaultRouter()
router.register("users", UserViewSet)
router.register("courses", CourseViewSet)
router.register("enrollments", EnrollmentViewSet, basename="enrollment")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/login/", CustomAuthToken.as_view(), name="api_login"),
    path("api/", include(router.urls)),
    path(
        "api-auth/",
        include("rest_framework.urls", namespace="rest_framework"),
    ),
]
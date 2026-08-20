from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from courses.views import CourseViewSet
from users.views import UserViewSet
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register("users", UserViewSet)
router.register("courses", CourseViewSet)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/login/", obtain_auth_token, name="api_login"),
    path("api/", include(router.urls)),
    path(
        "api-auth/",
        include("rest_framework.urls", namespace="rest_framework"),
    ),
]
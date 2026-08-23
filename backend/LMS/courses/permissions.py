from rest_framework import permissions


class CoursePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if not user.is_authenticated:
            return False

        if request.method in permissions.SAFE_METHODS:
            return True

        return user.role in ["TEACHER", "ADMIN"]

    def has_object_permission(self, request, view, obj):
        user = request.user

        if request.method in permissions.SAFE_METHODS:
            return True

        if user.role == "ADMIN":
            return True

        if user.role == "TEACHER":
            return obj.teacher == user

        return False


class EnrollmentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if not user.is_authenticated:
            return False

        return user.role == "STUDENT"

from rest_framework import viewsets

from .models import Course, Enrollment
from .permissions import CoursePermission, EnrollmentPermission
from .serializers import CourseSerializer, EnrollmentSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [CoursePermission]

    def perform_create(self, serializer):
        if self.request.user.role == "TEACHER":
            serializer.save(teacher=self.request.user)
        else:
            serializer.save()


class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [EnrollmentPermission]

    def get_queryset(self):
        return Enrollment.objects.filter(student=self.request.user)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

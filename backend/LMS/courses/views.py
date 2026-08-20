from rest_framework import viewsets

from .models import Course
from .permissions import CoursePermission
from .serializers import CourseSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [CoursePermission]

    def perform_create(self, serializer):
        if self.request.user.role == "TEACHER":
            serializer.save(teacher=self.request.user)
        else:
            serializer.save()
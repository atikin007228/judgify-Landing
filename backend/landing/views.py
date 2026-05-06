from django.db.models import Q
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Competition, UserSavedCompetition
from .serializers import CompetitionCardSerializer, SidebarCompetitionSerializer


class LandingCompetitionsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        qs = Competition.objects.filter(is_public=True)

        search = request.query_params.get('search')
        tab = request.query_params.get('tab')
        statuses = request.query_params.getlist('status')
        event_types = request.query_params.getlist('event_type')
        participation_types = request.query_params.getlist('participation_type')
        industries = request.query_params.getlist('industry')
        difficulties = request.query_params.getlist('difficulty')

        if search:
            qs = qs.filter(Q(name__icontains=search) | Q(short_description__icontains=search))
        if statuses:
            qs = qs.filter(status__in=statuses)
        if event_types:
            qs = qs.filter(event_type__in=event_types)
        if participation_types:
            qs = qs.filter(participation_type__in=participation_types)
        if industries:
            qs = qs.filter(industry__in=industries)
        if difficulties:
            qs = qs.filter(difficulty__in=difficulties)

        if tab == 'trending' or not tab:
            qs = qs.order_by('-trending_score', '-created_at')
        elif tab == 'new':
            qs = qs.order_by('-created_at')
        elif tab == 'open_submission':
            qs = qs.filter(submissions_open=True).order_by('-created_at')
        elif tab == 'live_stream':
            qs = qs.filter(is_live_stream_enabled=True, is_online_now=True).order_by('-created_at')

        serializer = CompetitionCardSerializer(qs[:20], many=True, context={'request': request})
        return Response(serializer.data)


class LandingSidebarView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({"last_competitions": [], "saved_competitions": []})

        last_competitions = Competition.objects.filter(is_public=True).order_by("-created_at")[:6]

        saved_ids = UserSavedCompetition.objects.filter(user=request.user).values_list("competition_id", flat=True)
        saved_competitions = Competition.objects.filter(id__in=saved_ids).order_by("-created_at")[:3]

        return Response({
            "last_competitions": SidebarCompetitionSerializer(last_competitions, many=True).data,
            "saved_competitions": SidebarCompetitionSerializer(saved_competitions, many=True).data,
        })


class LandingFiltersView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            'status': [
                {'value': 'upcoming', 'label': 'Upcoming'},
                {'value': 'registration_open', 'label': 'Registration open'},
                {'value': 'active', 'label': 'Active'},
                {'value': 'finished', 'label': 'Finished'},
                {'value': 'judging', 'label': 'Judging'},
                {'value': 'archived', 'label': 'Archived'},
            ],
            'event_type': [
                {'value': 'online', 'label': 'Online'},
                {'value': 'offline', 'label': 'Offline'},
                {'value': 'hybrid', 'label': 'Hybrid'},
            ],
            'participation_type': [
                {'value': 'team', 'label': 'Team'},
                {'value': 'individual', 'label': 'Individual'},
            ],
            'industry': [
                {'value': 'programming', 'label': 'Programming'},
                {'value': 'design', 'label': 'Design'},
                {'value': 'robotics', 'label': 'Robotics'},
                {'value': 'cybersecurity', 'label': 'Cybersecurity'},
            ],
            'difficulty': [
                {'value': 'beginner', 'label': 'Beginner'},
                {'value': 'intermediate', 'label': 'Intermediate'},
                {'value': 'advanced', 'label': 'Advanced'},
                {'value': 'mixed', 'label': 'Mixed'},
            ],
        })

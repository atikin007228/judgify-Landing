from rest_framework import serializers
from .models import Competition


class CompetitionCardSerializer(serializers.ModelSerializer):
    is_saved = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        fields = [
            "id",
            "slug",
            "name",
            "short_description",
            "cover_image",
            "status",
            "event_type",
            "participation_type",
            "industry",
            "difficulty",
            "current_round",
            "total_rounds",
            "participants_count",
            "comments_count",
            "views_count",
            "followers_count",
            "is_live_stream_enabled",
            "is_online_now",
            "registration_open",
            "submissions_open",
            "timer_deadline",
            "created_at",
            "is_saved",
        ]

    def get_is_saved(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False
        return obj.saved_by_users.filter(user=request.user).exists()


class SidebarCompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = [
            "id",
            "slug",
            "name",
            "cover_image",
            "participants_count",
            "comments_count",
            "status",
            "is_online_now",
            "timer_deadline",
        ]
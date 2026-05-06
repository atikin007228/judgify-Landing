from django.conf import settings
from django.db import models
from django.utils.text import slugify


class Competition(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('registration_open', 'Registration Open'),
        ('active', 'Active'),
        ('judging', 'Judging'),
        ('finished', 'Finished'),
        ('archived', 'Archived'),
    ]
    EVENT_TYPE_CHOICES = [('online', 'Online'), ('offline', 'Offline'), ('hybrid', 'Hybrid')]
    PARTICIPATION_TYPE_CHOICES = [('team', 'Team'), ('individual', 'Individual')]
    INDUSTRY_CHOICES = [
        ('programming', 'Programming'),
        ('design', 'Design'),
        ('robotics', 'Robotics'),
        ('cybersecurity', 'Cybersecurity'),
    ]
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('mixed', 'Mixed'),
    ]

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    short_description = models.TextField(blank=True)
    cover_image = models.URLField(blank=True)
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, db_index=True)
    event_type = models.CharField(max_length=16, choices=EVENT_TYPE_CHOICES, db_index=True)
    participation_type = models.CharField(max_length=16, choices=PARTICIPATION_TYPE_CHOICES, db_index=True)
    industry = models.CharField(max_length=32, choices=INDUSTRY_CHOICES, db_index=True)
    difficulty = models.CharField(max_length=32, choices=DIFFICULTY_CHOICES, db_index=True)
    current_round = models.PositiveIntegerField(default=1)
    total_rounds = models.PositiveIntegerField(default=1)
    participants_count = models.PositiveIntegerField(default=0)
    comments_count = models.PositiveIntegerField(default=0)
    views_count = models.PositiveIntegerField(default=0)
    followers_count = models.PositiveIntegerField(default=0)
    is_live_stream_enabled = models.BooleanField(default=False)
    is_online_now = models.BooleanField(default=False)
    registration_open = models.BooleanField(default=False)
    submissions_open = models.BooleanField(default=False)
    is_public = models.BooleanField(default=True)
    trending_score = models.FloatField(default=0)
    starts_at = models.DateTimeField(null=True, blank=True)
    ends_at = models.DateTimeField(null=True, blank=True)
    timer_deadline = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class UserSavedCompetition(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='saved_competitions')
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, related_name='saved_by_users')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'competition')
        ordering = ['-created_at']


class UserCompetitionWatch(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='watched_competitions')
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, related_name='watchers')
    watch_live = models.BooleanField(default=True)
    watch_rounds = models.BooleanField(default=True)
    watch_updates = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'competition')

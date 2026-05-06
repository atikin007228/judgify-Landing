from django.urls import path
from .views import LandingCompetitionsView, LandingSidebarView, LandingFiltersView

urlpatterns = [
    path('landing/competitions/', LandingCompetitionsView.as_view(), name='landing-competitions'),
    path('landing/sidebar/', LandingSidebarView.as_view(), name='landing-sidebar'),
    path('landing/filters/', LandingFiltersView.as_view(), name='landing-filters'),
]

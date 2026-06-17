from django.contrib import admin
from .models import Services
from .models import ServiceFeature
from .models import Project
from .models import Contact
# Register your models here.
admin.site.register(Services)
admin.site.register(ServiceFeature)
admin.site.register(Project)
admin.site.register(Contact)

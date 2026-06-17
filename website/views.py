from django.shortcuts import render  # type: ignore[import]
from .models import Services
from .models import Experience
from .models import ServiceFeature
from .models import Project
from .models import Contact

def home(request):
    if request.method=='POST':
         Contact.objects.create(
            name=request.POST.get("name"),
            email=request.POST.get("email"),
            service=request.POST.get("service"),
            message=request.POST.get("message")
        )

    services=Services.objects.all()
    experiences=Experience.objects.all()
    servicefeatures=ServiceFeature.objects.all()
    projectinfos=Project.objects.all()
    context={
        "services" : services,
        "experiences":experiences,
        "servicefeatures":servicefeatures,
        "projectinfos":projectinfos,

    }
    return render(request, "home.html", context)
    
    

from django.db import models

class Services(models.Model):
    title=models.CharField(max_length=100)
    number=models.IntegerField()

    def __str__(self):
        return self.title
    
    
class Experience(models.Model):
    role=models.CharField(max_length=100)
    company=models.CharField(max_length=100)
    duration=models.TextField(max_length=100)
    def __str__(self):
        return self.company
    
class ServiceFeature(models.Model):
    service = models.ForeignKey(Services, on_delete=models.CASCADE, related_name="features")
    text = models.CharField(max_length=300)

    def __str__(self):
        return self.text
    
class Project(models.Model):
    title=models.CharField(max_length=100)
    description=models.TextField(max_length=400)
    projecttag=models.CharField(max_length=100)
    image=models.ImageField(upload_to ='projects/')
    image = models.ImageField(upload_to='projects/')

class Contact(models.Model):
    name=models.CharField(max_length=100)
    email=models.TextField(max_length=400)
    service=models.TextField(max_length=200)
    message=models.TextField()
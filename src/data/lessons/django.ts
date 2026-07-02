import type { LessonBody } from "@/types";

export const django: Record<string, LessonBody> = {
  "django-intro": {
    story:
      "Imagine you want to open a restaurant. You could weld your own oven, saw your own tables, and stitch your own aprons from scratch — or you could rent a fully-equipped kitchen where the oven, fridge, sinks, and health-code paperwork are already sorted, and you just cook. Django is that fully-equipped kitchen for building websites. It is a Python toolkit that already includes a database system, a login system, an admin dashboard, and security guards at the door — so you spend your time building your actual idea, not re-inventing the plumbing. Instagram, Pinterest, and Mozilla were all built on it. People call Django 'batteries included' because you unbox it and almost everything you need is already there.",
    problem:
      "Building a real website means solving the same boring problems every single time: talking to a database, handling logins, blocking hackers, showing HTML pages, processing forms. Writing all of that yourself for every project is slow and error-prone. You want to skip straight to the part that makes YOUR site special.",
    analogy:
      "Django is a pre-furnished apartment: the wiring, plumbing, and locks are already installed, so you just move your furniture in and start living.",
    explanation: [
      "Django is a web framework — a big bundle of pre-written Python code that handles the repetitive parts of a website so you only write the parts unique to your idea.",
      "A framework is different from a library: a library is a tool you call when you want; a framework is a house you move into and fill in the blanks. Django decides the overall structure, you fill in the details.",
      "It follows a pattern people call MVT — Models (your data), Views (the logic that decides what to show), Templates (the HTML pages the visitor sees). We will meet each one in this course.",
      "Use Django when you need a database-backed site with users, forms, and an admin area — blogs, shops, booking systems, dashboards, social apps. It shines when there is real data to store and manage.",
      "Reach for something lighter (like Flask) if you are building a tiny one-page tool or a bare API with no database — Django's power is overkill there, like renting a full kitchen to make toast.",
      "You do not memorize Django. You learn its handful of ideas, then look things up. The whole point is that it does the heavy lifting for you.",
    ],
    code: {
      language: "python",
      source: `# In your terminal, you install Django and start a project.
# These are commands you type, shown here so you see the shape of it.

# 1) Install Django (one time)
#    pip install django

# 2) Create a new project called "mysite"
#    django-admin startproject mysite

# 3) Move into it and run the built-in web server
#    cd mysite
#    python manage.py runserver

# Now open http://127.0.0.1:8000 in your browser and you'll see
# Django's welcome page. You just ran a real web server. That's it.`,
      explanation:
        "manage.py is your remote control for the whole project — every Django command you run goes through it. runserver starts a live website on your own computer so you can see your work instantly.",
    },
    exercise: {
      prompt:
        "You've created the project. Write the command that starts the development web server so you can view the site in a browser.",
      starter: `# manage.py is in your project folder.
# TODO: write the command that runs the local server
command = "..."
print(command)`,
      solution: `command = "python manage.py runserver"
print(command)`,
    },
    quiz: [
      {
        question: "What does 'batteries included' mean for Django?",
        options: [
          "It needs extra hardware to run",
          "Most common website features (database, login, admin) come built in",
          "It only works on laptops",
          "It runs without Python",
        ],
        answerIndex: 1,
        explanation:
          "Django ships with the database layer, authentication, an admin panel, and security already built, so you don't reassemble them from scratch each time.",
      },
      {
        question: "What is manage.py used for?",
        options: [
          "It's the homepage of your site",
          "It stores your database",
          "It's the command tool you use to run and control your Django project",
          "It's where CSS goes",
        ],
        answerIndex: 2,
        explanation:
          "manage.py is the command-line entry point — you use it to run the server, create database tables, make an admin user, and much more.",
      },
    ],
    flashcards: [
      { front: "Django", back: "A batteries-included Python web framework for building database-backed websites fast." },
      { front: "Web framework", back: "A pre-built structure of code that handles a website's repetitive parts so you only write the unique bits." },
      { front: "MVT", back: "Django's pattern: Models (data), Views (logic), Templates (the HTML the visitor sees)." },
      { front: "manage.py", back: "The command-line control panel for your project — runs the server, migrations, admin user, and more." },
    ],
    miniProject: {
      title: "Boot Up Your First Django Site",
      brief: "Install Django and get the welcome page showing in your browser — proof you have a real web server running.",
      steps: [
        "Install Django with pip install django.",
        "Create a project: django-admin startproject mysite.",
        "Move into the folder and run python manage.py runserver.",
        "Open http://127.0.0.1:8000 and confirm you see the rocket welcome page.",
      ],
    },
    industryUse: [
      "Instagram runs its backend on Django to serve billions of requests",
      "Pinterest used Django in its early explosive-growth years",
      "Mozilla (makers of Firefox) uses Django for many of its web properties",
    ],
    commonMistakes: [
      "Confusing django-admin startproject (creates the whole project) with startapp (creates one feature inside it) — you start with a project.",
      "Editing files but forgetting the server auto-reloads — if nothing changes, check you saved the file and the terminal shows no red errors.",
    ],
    interviewQuestions: [
      "What does it mean that Django is 'batteries included', and when might that be a downside?",
      "Explain Django's MVT pattern in plain language.",
      "When would you choose Django over a lighter framework like Flask?",
    ],
    papers: [],
    nextUp: ["django-views", "django-models"],
    cheatsheet: [
      "pip install django",
      "django-admin startproject mysite",
      "python manage.py runserver  -> starts local site",
      "Pattern: Models (data) + Views (logic) + Templates (pages)",
      "Great for data-heavy sites with users; overkill for tiny one-pagers",
    ],
  },

  "django-views": {
    story:
      "Think about what happens when you type a web address and hit Enter. Your browser sends a little note to a server that says, 'Hey, someone asked for the /about page — what should I show them?' In Django, three friends team up to answer that note. The URL map is the receptionist who reads the address and decides who handles it. The view is the worker who does the thinking and gathers what's needed. The template is the designer who lays it all out as a pretty HTML page. Together they turn 'someone asked for /about' into an actual page appearing on the screen.",
    problem:
      "A website has to answer many different addresses — the home page, the about page, each blog post — and each one needs its own logic and its own layout. Without a clear system, this becomes a tangled mess of if-statements. You need an orderly way to say 'this address runs this code and shows that page.'",
    analogy:
      "It's a restaurant: the URL is the receptionist seating you, the view is the chef cooking your order, and the template is the plate that presents the meal beautifully.",
    explanation: [
      "A URL pattern connects a web address (like /about/) to a specific view function. Django reads the incoming address top-to-bottom through your list of patterns and picks the first that matches.",
      "A view is just a normal Python function that takes a request and returns a response. It's where your logic lives: fetch data, do a calculation, decide what to say.",
      "A template is an HTML file with little placeholders. The view hands the template some data, and the template drops that data into the right spots — like a mail-merge letter that fills in each person's name.",
      "Templates use double curly braces to show a value ( {{ name }} ) and percent tags for logic like loops and if-statements. That's the whole 'template language' in a nutshell.",
      "Keeping logic in views and layout in templates means a designer can edit the page's look without touching your Python, and you can change the logic without touching the HTML.",
      "The flow is always the same: browser asks -> URL matches -> view runs -> template renders -> page comes back. Once this clicks, every Django page makes sense.",
    ],
    code: {
      language: "python",
      source: `# views.py  --  the worker that decides what to show
from django.shortcuts import render

def home(request):
    # gather some data, then hand it to a template
    context = {"name": "Maria", "loaves": 24}
    return render(request, "home.html", context)


# urls.py  --  the receptionist mapping addresses to views
from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),   # the "" is the homepage
]


# home.html  --  the template (an HTML file with placeholders)
# <h1>Welcome, {{ name }}!</h1>
# <p>Bake about {{ loaves }} loaves today.</p>`,
      explanation:
        "render() glues the three together: it takes the request, the template file, and a dictionary of data, then returns a finished HTML page. The {{ name }} in the template gets replaced with 'Maria'.",
    },
    exercise: {
      prompt:
        "Add a view called about that returns the template about.html with a company_name of 'SkillRoute'. Fill in the missing pieces.",
      starter: `from django.shortcuts import render

def about(request):
    context = {"company_name": "..."}  # TODO
    return render(request, "...", context)  # TODO: which template?`,
      solution: `from django.shortcuts import render

def about(request):
    context = {"company_name": "SkillRoute"}
    return render(request, "about.html", context)`,
    },
    quiz: [
      {
        question: "What is a Django view?",
        options: [
          "The database table",
          "A Python function that takes a request and returns a response",
          "The CSS styling",
          "The web address itself",
        ],
        answerIndex: 1,
        explanation:
          "A view is where your logic lives — a function that receives the request and returns what should be shown, usually a rendered template.",
      },
      {
        question: "In a template, how do you display the value of a variable called title?",
        options: ["<title>", "{{ title }}", "[title]", "print(title)"],
        answerIndex: 1,
        explanation:
          "Django templates use double curly braces to output a value: {{ title }} gets replaced with the actual data the view passed in.",
      },
      {
        question: "What is the job of the urls.py file?",
        options: [
          "To style the page",
          "To store user passwords",
          "To match incoming web addresses to the correct view",
          "To run the database",
        ],
        answerIndex: 2,
        explanation:
          "urls.py is the receptionist: it reads the requested address and routes it to the matching view function.",
      },
    ],
    flashcards: [
      { front: "URL pattern", back: "A rule connecting a web address to the view that should handle it." },
      { front: "View", back: "A Python function that takes a request and returns a response (usually a rendered page)." },
      { front: "Template", back: "An HTML file with placeholders that get filled in with data from the view." },
      { front: "render()", back: "Django helper that combines a request, a template, and data into a finished HTML response." },
    ],
    miniProject: {
      title: "A Three-Page Mini Site",
      brief: "Build Home, About, and Contact pages, each with its own URL, view, and template.",
      steps: [
        "Create three view functions: home, about, contact.",
        "Add a URL pattern for each in urls.py.",
        "Make three HTML templates and pass one variable into each.",
        "Run the server and click through all three pages in your browser.",
      ],
    },
    industryUse: [
      "News sites like The Washington Post map each article URL to a view that loads that story",
      "E-commerce stores route /product/shoes to a view that fetches shoe data and renders a product template",
      "SaaS dashboards use views to gather a user's stats and templates to display them",
    ],
    commonMistakes: [
      "Forgetting the trailing slash in URL patterns — Django is picky, so /about/ and /about can behave differently.",
      "Putting HTML directly inside the view as a giant Python string instead of using a template — it works but becomes unmaintainable fast.",
    ],
    interviewQuestions: [
      "Walk me through what happens from typing a URL to seeing the page in Django.",
      "What's the difference between a view and a template?",
      "Why separate logic (views) from presentation (templates)?",
    ],
    papers: [],
    nextUp: ["django-models", "django-forms"],
    cheatsheet: [
      "URL -> view -> template -> page",
      "path(\"about/\", views.about, name=\"about\")",
      "def view(request): return render(request, \"file.html\", context)",
      "Show data: {{ variable }}",
      "Logic in views, layout in templates",
    ],
  },

  "django-models": {
    story:
      "You run that bakery and you keep every order in a paper notebook: customer name, item, price, date. It works — until you want to find 'all chocolate cakes sold in June,' and now you're flipping pages for an hour. A database is a smart notebook that can answer those questions instantly. But talking to a database normally means learning SQL, a whole separate language. Django's ORM is a translator: you describe your data as ordinary Python classes, and Django writes and speaks the database's language for you. You say Order.objects.filter(item='cake') in plain Python, and Django quietly does the database gymnastics behind the curtain.",
    problem:
      "Your data has to be saved somewhere permanent, or it vanishes the moment the server restarts. Databases are the answer, but they speak SQL — an unfamiliar language full of its own rules. You want to store and fetch data using the Python you already know, not switch languages every time you touch your data.",
    analogy:
      "The ORM is a bilingual assistant: you speak Python, the database speaks SQL, and the assistant translates every request perfectly in both directions.",
    explanation: [
      "A model is a Python class that describes one kind of thing you want to store — a Post, a User, an Order. Each attribute becomes a column in a database table.",
      "ORM stands for Object-Relational Mapping. In plain words: it maps your Python objects to database rows, so you never hand-write SQL for everyday tasks.",
      "You pick a field type for each piece of data: CharField for short text, TextField for long text, IntegerField for whole numbers, DateTimeField for dates. The field type tells the database what to expect.",
      "After writing or changing a model, you run two commands: makemigrations (Django writes a plan for the database change) and migrate (Django applies that plan). Migrations are like version control for your database's shape.",
      "To use the data you go through .objects: Post.objects.all() gets everything, .filter(...) narrows it down, .get(...) fetches one, and .create(...) adds a new row. This is called a QuerySet.",
      "Use models for anything you need to remember between visits — posts, comments, products, bookings. If data doesn't need saving, it doesn't need a model.",
    ],
    code: {
      language: "python",
      source: `# models.py  --  describe your data as a Python class
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)     # short text
    body = models.TextField()                    # long text
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title   # nice label in the admin & shell


# After saving this file, run in the terminal:
#   python manage.py makemigrations   # write the plan
#   python manage.py migrate          # build the table


# Then you can use plain Python to work with data:
#   Post.objects.create(title="Hello", body="My first post!")
#   Post.objects.all()                      # every post
#   Post.objects.filter(title="Hello")      # matching posts`,
      explanation:
        "The Post class becomes a real database table with title, body, and created columns — no SQL written. makemigrations plans the change and migrate builds it; then .objects lets you add and fetch rows in pure Python.",
    },
    exercise: {
      prompt:
        "Create a Comment model with a text field (long text) and an author field (short text, max 100 characters). Fill in the field types.",
      starter: `from django.db import models

class Comment(models.Model):
    text = models.___()               # TODO: long text
    author = models.___(max_length=100)  # TODO: short text`,
      solution: `from django.db import models

class Comment(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=100)`,
    },
    quiz: [
      {
        question: "What does the ORM let you avoid writing?",
        options: ["Python", "HTML", "Raw SQL for everyday database tasks", "CSS"],
        answerIndex: 2,
        explanation:
          "The ORM translates your Python into SQL behind the scenes, so you describe and query data in Python instead of hand-writing SQL.",
      },
      {
        question: "You changed a model. Which two commands apply that change to the database?",
        options: [
          "runserver then migrate",
          "makemigrations then migrate",
          "startapp then runserver",
          "collectstatic then migrate",
        ],
        answerIndex: 1,
        explanation:
          "makemigrations writes the plan for the change; migrate applies that plan to the actual database.",
      },
      {
        question: "What does Post.objects.filter(title='Hello') return?",
        options: [
          "A single string",
          "All posts whose title equals 'Hello'",
          "The number of posts",
          "An error unless you write SQL",
        ],
        answerIndex: 1,
        explanation:
          "filter() returns a QuerySet of every row that matches the condition — here, all posts titled 'Hello'.",
      },
    ],
    flashcards: [
      { front: "Model", back: "A Python class describing one kind of stored data; each becomes a database table." },
      { front: "ORM", back: "Object-Relational Mapping — lets you use Python instead of SQL to work with the database." },
      { front: "Migration", back: "A recorded plan for changing the database's shape; makemigrations writes it, migrate applies it." },
      { front: "QuerySet", back: "The result of a database query (from .all(), .filter(), etc.) that you can loop over." },
    ],
    miniProject: {
      title: "Model a Bookshelf",
      brief: "Design a Book model and store a few of your favorite books in the database.",
      steps: [
        "Write a Book model with title, author, and year fields.",
        "Run makemigrations and migrate to build the table.",
        "Open the shell with python manage.py shell and create 3 books with .create().",
        "Fetch them back with Book.objects.all() and filter by author.",
      ],
    },
    industryUse: [
      "Instagram stores every photo, like, and comment as Django models",
      "Online stores model Products, Orders, and Customers with the ORM",
      "Booking platforms model Rooms and Reservations to check availability instantly",
    ],
    commonMistakes: [
      "Changing a model but forgetting to run makemigrations and migrate — the database stays the old shape and errors appear.",
      "Confusing .get() (returns one object, errors if zero or many) with .filter() (returns a set, safe when empty) — use get only when you expect exactly one.",
    ],
    interviewQuestions: [
      "What is an ORM and what problem does it solve?",
      "Explain the difference between makemigrations and migrate.",
      "When would you use .get() versus .filter()?",
    ],
    papers: [],
    nextUp: ["django-admin", "django-forms"],
    cheatsheet: [
      "Model = Python class = database table",
      "Fields: CharField, TextField, IntegerField, DateTimeField",
      "makemigrations -> migrate  (plan then apply)",
      "Post.objects.all() / .filter() / .get() / .create()",
      "No hand-written SQL for everyday work",
    ],
  },

  "django-admin": {
    story:
      "Most web frameworks make you build your own back-office by hand: a page to add products, a page to edit them, a page to delete the spam. That's weeks of dull work before you sell a single thing. Django hands you all of it for free. The moment you register a model, Django auto-generates a full, polished control panel — with search boxes, filters, edit forms, and delete buttons — for managing your data. Newspaper editors use it to publish stories. Shop owners use it to add products. It is genuinely one of the reasons people fall in love with Django, and you get it with about two lines of code.",
    problem:
      "Every real site needs a private area where staff can add, edit, and remove data — new blog posts, product listings, user accounts. Building that CRUD interface (Create, Read, Update, Delete) by hand for every model is repetitive and slow. You'd rather it just appear.",
    analogy:
      "The admin panel is a self-assembling filing cabinet: the instant you tell it what kind of documents you have, it builds all the labeled drawers, folders, and a search index for you.",
    explanation: [
      "The admin is a ready-made, secure web dashboard for managing your models — no design or coding required to get it working.",
      "You turn it on by registering a model in admin.py: admin.site.register(Post). That single line makes Post fully manageable in the dashboard.",
      "To get in, you create a superuser (an all-powerful admin account) with python manage.py createsuperuser, then log in at /admin.",
      "You can customize it: list_display picks which columns to show, list_filter adds sidebar filters, and search_fields adds a search box — all with a few lines.",
      "It's perfect for you and your team to manage content, and great for prototyping. It is NOT meant to be shown to your everyday visitors — it's the staff entrance, not the front door.",
      "Because it enforces logins and permissions out of the box, non-technical teammates (editors, moderators) can safely manage data without ever touching code.",
    ],
    code: {
      language: "python",
      source: `# admin.py  --  register your models to manage them in the dashboard
from django.contrib import admin
from .models import Post

# The simplest version: one line, and Post is fully manageable
admin.site.register(Post)


# A customized version for a nicer dashboard:
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "created")   # columns in the list view
    list_filter = ("created",)            # filter sidebar
    search_fields = ("title", "body")     # search box

# (use one registration, not both)
# admin.site.register(Post, PostAdmin)


# In the terminal, create your admin login once:
#   python manage.py createsuperuser
# then visit  http://127.0.0.1:8000/admin`,
      explanation:
        "Registering Post makes it appear in the admin dashboard. The PostAdmin class is optional polish — it decides which columns, filters, and search box show up. createsuperuser makes the login you use to get in.",
    },
    exercise: {
      prompt:
        "Register a Product model in the admin and show its name and price as columns. Fill in the blanks.",
      starter: `from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ("...", "...")   # TODO: show name and price

admin.site.register(Product, ProductAdmin)`,
      solution: `from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price")

admin.site.register(Product, ProductAdmin)`,
    },
    quiz: [
      {
        question: "How do you make a model appear in the admin dashboard?",
        options: [
          "Add it to urls.py",
          "Register it in admin.py",
          "Write raw SQL",
          "It appears automatically with no code",
        ],
        answerIndex: 1,
        explanation:
          "You register the model in admin.py with admin.site.register(YourModel) — that one line wires up the whole management interface.",
      },
      {
        question: "What is a superuser?",
        options: [
          "A visitor who reads a lot of pages",
          "An all-powerful admin account used to log into the dashboard",
          "A fast database",
          "A type of model field",
        ],
        answerIndex: 1,
        explanation:
          "A superuser is an admin account with full permissions; you create one with createsuperuser and use it to log into /admin.",
      },
      {
        question: "Who is the admin panel intended for?",
        options: [
          "Your everyday public visitors",
          "Search engines only",
          "You and your staff to manage data",
          "Nobody — it's decorative",
        ],
        answerIndex: 2,
        explanation:
          "The admin is the staff entrance for managing content, not the public-facing site your visitors browse.",
      },
    ],
    flashcards: [
      { front: "Django admin", back: "An auto-generated, secure dashboard for managing your models' data." },
      { front: "Register (admin)", back: "admin.site.register(Model) — the line that makes a model manageable in the admin." },
      { front: "Superuser", back: "An all-powerful admin account, created with createsuperuser, used to log into /admin." },
      { front: "list_display", back: "An admin option that chooses which fields show as columns in the list view." },
    ],
    miniProject: {
      title: "Run Your Own Newsroom",
      brief: "Use the admin panel to publish and manage blog posts entirely through the browser.",
      steps: [
        "Register your Post model in admin.py.",
        "Create a superuser and log into /admin.",
        "Add list_display and search_fields for a nicer view.",
        "Create, edit, and delete a few posts using only the dashboard.",
      ],
    },
    industryUse: [
      "Newspaper and magazine teams publish and edit articles through customized Django admins",
      "Small e-commerce shops manage their product catalog entirely in the admin",
      "Startups use it as an instant internal tool to manage users and data before building anything custom",
    ],
    commonMistakes: [
      "Forgetting to register the model — then wondering why it's missing from the dashboard.",
      "Exposing the admin to the public or using a weak superuser password — it's a powerful door, so protect it.",
    ],
    interviewQuestions: [
      "What is the Django admin and why is it considered a killer feature?",
      "How do you customize which columns appear in the admin list view?",
      "Why shouldn't the admin be used as your public user interface?",
    ],
    papers: [],
    nextUp: ["django-forms", "django-auth-lesson"],
    cheatsheet: [
      "admin.site.register(Model)  -> instant dashboard",
      "createsuperuser  -> your admin login",
      "Visit /admin to log in",
      "list_display / list_filter / search_fields = polish",
      "Staff entrance, not the public front door",
    ],
  },

  "django-forms": {
    story:
      "Every time you sign up for something, leave a comment, or search a website, you're filling in a form. From the site's side, a form is surprisingly tricky: you have to show the input boxes, catch what the user typed, check it's valid (no blank names, real email addresses), show friendly error messages if it's wrong, and only then save it. Doing all that by hand for every field is exhausting. Django's forms handle the whole dance for you — they draw the inputs, validate the data, remember what the user typed when they make a mistake, and hand you clean, safe data at the end.",
    problem:
      "User input is messy and dangerous. People leave fields blank, type words where numbers belong, or try to sneak in malicious code. You need to display input fields, validate everything, show clear errors, and protect against attacks — for every single form. That's a lot of fiddly, error-prone work.",
    analogy:
      "A Django form is a strict but friendly receptionist: it hands you a clipboard, checks every box is filled correctly, politely points out mistakes, and only passes the paperwork through once it's perfect.",
    explanation: [
      "A form in Django is a Python class describing the fields you want and their rules — like 'name is required text, email must be a valid email.'",
      "A ModelForm is a shortcut: point it at a model and it auto-builds a matching form, so you don't repeat your fields twice.",
      "Validation is automatic. Call form.is_valid() and Django checks every rule; if something's wrong, it fills form.errors with friendly messages you can show the user.",
      "The same view handles two cases: a GET request shows a blank form; a POST request (the user hit submit) processes the data. You check request.method to tell them apart.",
      "Every form needs the CSRF token — a small hidden security tag ( {% csrf_token %} in the template) that blocks a sneaky attack where another site tries to submit forms on your user's behalf. Django refuses the form without it.",
      "When the data is valid, form.save() (for a ModelForm) writes it straight to the database, and you usually redirect the user to a fresh page so refreshing doesn't resubmit.",
    ],
    code: {
      language: "python",
      source: `# forms.py  --  build a form straight from a model
from django import forms
from .models import Comment

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ["author", "text"]   # which fields to show


# views.py  --  one view handles both showing and saving
from django.shortcuts import render, redirect
from .forms import CommentForm

def add_comment(request):
    if request.method == "POST":          # user submitted
        form = CommentForm(request.POST)
        if form.is_valid():               # all rules pass?
            form.save()                   # write to database
            return redirect("home")
    else:                                 # first visit: blank form
        form = CommentForm()
    return render(request, "add_comment.html", {"form": form})


# add_comment.html  --  the template
# <form method="post">
#   {% csrf_token %}     <-- required security tag
#   {{ form }}           <-- Django draws the input boxes
#   <button>Send</button>
# </form>`,
      explanation:
        "The ModelForm auto-builds inputs from the Comment model. The view shows a blank form on GET and validates-then-saves on POST. In the template, {{ form }} draws the fields and {% csrf_token %} adds the security check Django requires.",
    },
    exercise: {
      prompt:
        "Build a ModelForm for a Post model that shows only the title and body fields. Fill in the Meta section.",
      starter: `from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = ...          # TODO
        fields = [...]       # TODO: title and body`,
      solution: `from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["title", "body"]`,
    },
    quiz: [
      {
        question: "What does form.is_valid() do?",
        options: [
          "Saves the form to the database",
          "Checks all the form's rules and reports if the data is acceptable",
          "Deletes the form",
          "Styles the form with CSS",
        ],
        answerIndex: 1,
        explanation:
          "is_valid() runs every field's validation rules and returns True only if the data passes; failures land in form.errors.",
      },
      {
        question: "Why is {% csrf_token %} required in a form?",
        options: [
          "It makes the form look nicer",
          "It's a security tag that blocks forged cross-site submissions",
          "It saves the data faster",
          "It's optional and can always be removed",
        ],
        answerIndex: 1,
        explanation:
          "The CSRF token protects against cross-site request forgery — an attack where another site tries to submit forms as your user. Django rejects forms without it.",
      },
      {
        question: "What's the advantage of a ModelForm over a plain Form?",
        options: [
          "It runs faster",
          "It auto-builds the form fields from a model, so you don't repeat yourself",
          "It doesn't need validation",
          "It skips the database",
        ],
        answerIndex: 1,
        explanation:
          "A ModelForm generates its fields from an existing model, saving you from defining the same fields twice and giving you .save() for free.",
      },
    ],
    flashcards: [
      { front: "Form", back: "A Python class describing input fields and their validation rules." },
      { front: "ModelForm", back: "A form auto-built from a model, so fields aren't defined twice; comes with .save()." },
      { front: "is_valid()", back: "Runs all validation rules; returns True only if the submitted data passes." },
      { front: "CSRF token", back: "A hidden security tag ({% csrf_token %}) that blocks forged cross-site form submissions." },
    ],
    miniProject: {
      title: "A Guestbook Form",
      brief: "Let visitors leave a signed message that saves to the database and shows up on the page.",
      steps: [
        "Create a Guestbook model with name and message fields.",
        "Build a ModelForm for it.",
        "Write a view that shows the form on GET and saves on POST.",
        "Add the CSRF token in the template and list all saved messages below the form.",
      ],
    },
    industryUse: [
      "Sign-up and login pages across sites validate credentials with Django forms",
      "E-commerce checkout collects and validates shipping and payment details",
      "Support portals use forms to capture and validate customer tickets",
    ],
    commonMistakes: [
      "Forgetting {% csrf_token %} in the template — the form submission is rejected with a 403 error.",
      "Not checking request.method, so the same code tries to save data even on the first (blank) visit.",
    ],
    interviewQuestions: [
      "How does Django handle form validation, and what does is_valid() do?",
      "What is CSRF and how does Django protect against it?",
      "What's the difference between a Form and a ModelForm?",
    ],
    papers: [],
    nextUp: ["django-auth-lesson", "django-blog"],
    cheatsheet: [
      "ModelForm auto-builds fields from a model",
      "GET = show blank form, POST = process it",
      "if form.is_valid(): form.save()",
      "Always add {% csrf_token %} in the template",
      "Redirect after a successful save",
    ],
  },

  "django-auth-lesson": {
    story:
      "Think about your favorite app. It knows who you are, keeps your stuff separate from everyone else's, and won't let a stranger delete your account. That's authentication (proving who you are) and authorization (deciding what you're allowed to do). Building this safely is genuinely hard — passwords must never be stored as plain text, sessions must be tamper-proof, and one slip can leak everyone's data. Django comes with a full, battle-tested user system already built: sign-up, login, logout, password hashing, and 'is this person logged in?' checks. You get security that took experts years to perfect, for free.",
    problem:
      "Almost every real site needs accounts: users must sign up, log in, stay logged in, and see only their own data. Rolling your own login system is a minefield — store a password wrong and you endanger every user. You need something safe and proven, not a homemade guess.",
    analogy:
      "Django's auth is a hotel front desk: it checks your ID at check-in (login), gives you a keycard that only opens your room (session), and the manager decides which floors you're allowed on (permissions).",
    explanation: [
      "Authentication answers 'who are you?' (logging in). Authorization answers 'what are you allowed to do?' (permissions). Two different jobs, both handled by Django.",
      "Django ships a User model out of the box, storing username, email, and a securely hashed password. It never stores the raw password — even you can't read it, which is exactly the point.",
      "A session is how the site remembers you're logged in across pages: after login, Django gives the browser a signed cookie, like that hotel keycard, so you don't re-enter your password on every click.",
      "Ready-made helpers do the heavy lifting: authenticate() checks a username/password, login() starts the session, and logout() ends it.",
      "To protect a page, add the @login_required decorator above a view — anyone not logged in gets bounced to the login page. In templates, {% if user.is_authenticated %} shows different content to logged-in visitors.",
      "Use request.user inside any view to get the current person, so you can show or save only their data — the foundation of any multi-user app.",
    ],
    code: {
      language: "python",
      source: `# views.py  --  logging in and protecting a page
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

def login_view(request):
    if request.method == "POST":
        user = authenticate(
            username=request.POST["username"],
            password=request.POST["password"],
        )
        if user is not None:      # correct credentials
            login(request, user)  # start the session
            return redirect("dashboard")
    return render(request, "login.html")

@login_required   # only logged-in users may enter
def dashboard(request):
    # request.user is the person currently logged in
    return render(request, "dashboard.html", {"me": request.user})


# In a template:
# {% if user.is_authenticated %}
#   Hi, {{ user.username }}!
# {% else %}
#   <a href="/login/">Log in</a>
# {% endif %}`,
      explanation:
        "authenticate() checks the password safely, login() remembers the user via a session, and @login_required guards the dashboard so strangers get sent to the login page. request.user is always the current visitor.",
    },
    exercise: {
      prompt:
        "Protect a view called profile so only logged-in users can see it. Add the missing decorator.",
      starter: `from django.contrib.auth.decorators import login_required
from django.shortcuts import render

# TODO: add the decorator that requires a login
def profile(request):
    return render(request, "profile.html", {"me": request.user})`,
      solution: `from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required
def profile(request):
    return render(request, "profile.html", {"me": request.user})`,
    },
    quiz: [
      {
        question: "What's the difference between authentication and authorization?",
        options: [
          "They mean the same thing",
          "Authentication is 'who are you?'; authorization is 'what may you do?'",
          "Authentication is for admins only",
          "Authorization happens before login",
        ],
        answerIndex: 1,
        explanation:
          "Authentication verifies identity (login); authorization decides what that identity is permitted to do (permissions).",
      },
      {
        question: "Why does Django store passwords hashed instead of as plain text?",
        options: [
          "To save disk space",
          "So even a database leak doesn't expose users' real passwords",
          "To make login faster",
          "It's just a style choice",
        ],
        answerIndex: 1,
        explanation:
          "Hashing is a one-way scramble — if the database is stolen, attackers still can't read the actual passwords. Never store raw passwords.",
      },
      {
        question: "What does @login_required do to a view?",
        options: [
          "Deletes the view",
          "Sends visitors who aren't logged in to the login page",
          "Makes the page load faster",
          "Logs everyone out",
        ],
        answerIndex: 1,
        explanation:
          "@login_required guards a view: only authenticated users can access it, and everyone else is redirected to log in.",
      },
    ],
    flashcards: [
      { front: "Authentication", back: "Proving who a user is — logging in with a username and password." },
      { front: "Authorization", back: "Deciding what an authenticated user is allowed to do (permissions)." },
      { front: "Session", back: "How Django remembers you're logged in across pages, via a signed cookie." },
      { front: "@login_required", back: "A decorator that restricts a view to logged-in users only." },
    ],
    miniProject: {
      title: "Members-Only Clubhouse",
      brief: "Build a site with a public home page and a secret members page only logged-in users can reach.",
      steps: [
        "Add login and logout views using Django's auth helpers.",
        "Create a members view protected with @login_required.",
        "In the navbar template, show 'Log in' or 'Log out' based on user.is_authenticated.",
        "Test it: try the members page while logged out, then log in and try again.",
      ],
    },
    industryUse: [
      "Any Django SaaS app uses this system so each customer sees only their own account",
      "Online banking portals rely on secure sessions and password hashing to protect accounts",
      "Content platforms use permissions so editors can publish but readers cannot",
    ],
    commonMistakes: [
      "Trying to store or compare passwords yourself instead of using authenticate() — a serious security risk.",
      "Forgetting @login_required on sensitive views, leaving private pages open to anyone with the URL.",
    ],
    interviewQuestions: [
      "Explain the difference between authentication and authorization.",
      "How does Django keep a user logged in across requests?",
      "Why should passwords never be stored in plain text, and how does Django handle this?",
    ],
    papers: [],
    nextUp: ["django-deploy", "django-blog"],
    cheatsheet: [
      "Authentication = who you are; Authorization = what you may do",
      "authenticate() -> login() -> session cookie",
      "@login_required guards a view",
      "request.user = the current visitor",
      "Passwords are hashed, never stored raw",
    ],
  },

  "django-deploy": {
    story:
      "Right now your Django site lives on your own computer at that friendly http://127.0.0.1:8000 address — which only YOU can see. Deploying means moving it to a computer on the internet that's always on, so anyone in the world can visit. It's the difference between cooking a meal in your kitchen and opening a restaurant. A few things change on the way: you flip off 'debug mode' so strangers can't see your error details, you tell Django which web address it's allowed to serve, you switch from the toy database to a grown-up one, and you hand the actual serving to production-grade tools. It sounds like a lot, but modern hosts do most of it for you.",
    problem:
      "The development server is a practice track — fast to start, but insecure and slow, and only reachable from your machine. To share your site with real people you need it running on a public server, configured for safety and speed, not for convenience. The settings that are handy while building are dangerous once you're live.",
    analogy:
      "Deploying is moving from your home kitchen to a licensed restaurant: same recipes, but now there's a proper stove, health inspections, a locked front door, and the public can walk in.",
    explanation: [
      "Set DEBUG = False for the live site. Debug mode shows detailed error pages — incredibly helpful for you, but a gift to attackers, since it can reveal your code and settings.",
      "Fill in ALLOWED_HOSTS with your real domain (like myblog.com). This tells Django which web addresses it's permitted to answer, blocking a class of tricks.",
      "Keep secrets out of your code. Your SECRET_KEY, database password, and API keys should come from environment variables, not sit in a file you might accidentally share.",
      "Swap the built-in SQLite (a single file, great for learning) for a robust database like PostgreSQL, which handles many users at once without breaking a sweat.",
      "The dev server can't serve your CSS and images efficiently in production. Run collectstatic to gather them, and let a proper web server or CDN deliver them fast.",
      "A real deploy uses a production server (Gunicorn) behind a web server (Nginx), or simply a platform like Render, Railway, Heroku, or PythonAnywhere that wires all this up for you with a few clicks.",
    ],
    code: {
      language: "python",
      source: `# settings.py  --  the key changes for going live
import os

# Debug OFF in production (never True on a public site)
DEBUG = False

# Which domains is this site allowed to serve?
ALLOWED_HOSTS = ["myblog.com", "www.myblog.com"]

# Never hard-code secrets: read them from the environment
SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]

# Gather CSS/JS/images into one folder for the web server
STATIC_ROOT = "staticfiles"


# Typical deploy steps in the terminal:
#   python manage.py collectstatic   # gather static files
#   python manage.py migrate         # set up the live database
#   gunicorn mysite.wsgi             # run the production server`,
      explanation:
        "These are the settings that must change before real users arrive: debug off, allowed hosts set, secrets pulled from the environment, and static files collected. gunicorn is the sturdy server that runs your app in production instead of the practice one.",
    },
    exercise: {
      prompt:
        "Make settings.py production-safe: turn debug off and read the secret key from an environment variable. Fill in the blanks.",
      starter: `import os

DEBUG = ...                       # TODO: production value
SECRET_KEY = os.environ["..."]    # TODO: read from environment`,
      solution: `import os

DEBUG = False
SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]`,
    },
    quiz: [
      {
        question: "Why must DEBUG be False on a live site?",
        options: [
          "It makes pages prettier",
          "Debug mode can leak sensitive error and code details to attackers",
          "It's required to run the server at all",
          "It speeds up the database",
        ],
        answerIndex: 1,
        explanation:
          "Debug pages expose internals like your settings and stack traces — helpful while building, dangerous in public. Always set DEBUG = False in production.",
      },
      {
        question: "What is ALLOWED_HOSTS for?",
        options: [
          "Listing which users can log in",
          "Listing the domains your Django site is permitted to serve",
          "Choosing a database",
          "Setting the admin password",
        ],
        answerIndex: 1,
        explanation:
          "ALLOWED_HOSTS names the domains Django will answer to, blocking requests aimed at hostnames you don't control.",
      },
      {
        question: "Why switch from SQLite to PostgreSQL for production?",
        options: [
          "SQLite is illegal",
          "PostgreSQL handles many simultaneous users reliably",
          "SQLite can't store text",
          "PostgreSQL is required to use Python",
        ],
        answerIndex: 1,
        explanation:
          "SQLite is a simple single file — perfect for learning — but PostgreSQL is built to serve many concurrent users safely and quickly.",
      },
    ],
    flashcards: [
      { front: "DEBUG", back: "A setting that shows detailed errors; must be False in production for safety." },
      { front: "ALLOWED_HOSTS", back: "The list of domains your Django site is permitted to serve." },
      { front: "collectstatic", back: "Command that gathers CSS/JS/images into one folder for a production web server to serve." },
      { front: "Gunicorn", back: "A production-grade server that runs your Django app for real traffic, replacing the dev server." },
    ],
    miniProject: {
      title: "Put Your Site on the Internet",
      brief: "Deploy your Django app to a free host so a friend can open it on their phone.",
      steps: [
        "Set DEBUG = False and fill in ALLOWED_HOSTS with your host's domain.",
        "Move SECRET_KEY into an environment variable.",
        "Push your code to a host like Render or Railway and connect a PostgreSQL database.",
        "Run migrate and collectstatic on the host, then open your live URL and share it.",
      ],
    },
    industryUse: [
      "Startups deploy Django apps on Render, Railway, or Heroku to launch quickly",
      "Larger companies run Django behind Nginx and Gunicorn on cloud servers like AWS",
      "Agencies use PythonAnywhere to host client sites with minimal setup",
    ],
    commonMistakes: [
      "Leaving DEBUG = True in production — a serious security hole that exposes your internals.",
      "Committing SECRET_KEY or database passwords into your code repository instead of using environment variables.",
    ],
    interviewQuestions: [
      "What settings must change when moving a Django app from development to production?",
      "Why is DEBUG = True dangerous on a live site?",
      "What does collectstatic do and why is it needed?",
    ],
    papers: [],
    nextUp: ["django-blog"],
    cheatsheet: [
      "DEBUG = False in production",
      "Set ALLOWED_HOSTS to your real domain",
      "Secrets from environment variables, never in code",
      "SQLite (dev) -> PostgreSQL (production)",
      "collectstatic + migrate + gunicorn to go live",
    ],
  },

  "django-blog": {
    story:
      "Now you put it all together. A blog platform is the perfect first real Django app because it touches every skill you've learned: a Post model to store articles, views and templates to display them, forms so authors can write new posts, the admin panel to manage everything, and authentication so only logged-in users can publish. By the end you'll have a working website where anyone can read posts and registered users can write them. This is the same shape as a shop, a forum, or a portfolio — build a blog once and you understand how most of the web is built.",
    problem:
      "Learning pieces separately is one thing; wiring them into a single working app is another. A blog forces every part to cooperate: data storage, page rendering, user input, security, and login must all click together. Doing it once turns scattered lessons into a skill you actually own.",
    analogy:
      "This is your first full meal, not just practicing knife cuts: models are the ingredients, views and templates are the cooking and plating, forms are taking the order, and auth is checking who's allowed in the kitchen.",
    explanation: [
      "Start with the Post model — title, body, author, and a created date. That's your data foundation; run makemigrations and migrate to build the table.",
      "Build two main views: a list view showing all posts newest-first, and a detail view showing one full post. Each gets its own URL and template.",
      "Give authors a PostForm (a ModelForm) so they can create posts through the site, protected by @login_required so only logged-in users can publish.",
      "Set the post's author to request.user automatically when saving, so each article is correctly credited to whoever wrote it.",
      "Use one base template with the shared header and footer, and let each page extend it — so you write the layout once and every page stays consistent.",
      "Register Post in the admin so you can moderate or fix content without code, and you have a complete, real content platform.",
    ],
    code: {
      language: "python",
      source: `# The blog, assembled from everything you've learned.

# models.py
from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title

# views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Post
from .forms import PostForm

def post_list(request):
    posts = Post.objects.order_by("-created")   # newest first
    return render(request, "post_list.html", {"posts": posts})

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, "post_detail.html", {"post": post})

@login_required
def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)   # hold before saving
            post.author = request.user       # credit the writer
            post.save()
            return redirect("post_detail", pk=post.pk)
    else:
        form = PostForm()
    return render(request, "post_new.html", {"form": form})`,
      explanation:
        "Every skill appears here: a model with a ForeignKey to the built-in User, list and detail views with their own URLs, a login-protected create view, and form.save(commit=False) so you can attach the author before writing to the database.",
    },
    exercise: {
      prompt:
        "In the list view, show only the 5 most recent posts instead of all of them. Adjust the query.",
      starter: `def post_list(request):
    posts = Post.objects.order_by("-created")  # TODO: only the 5 newest
    return render(request, "post_list.html", {"posts": posts})`,
      solution: `def post_list(request):
    posts = Post.objects.order_by("-created")[:5]
    return render(request, "post_list.html", {"posts": posts})`,
    },
    quiz: [
      {
        question: "Why use form.save(commit=False) before setting the author?",
        options: [
          "To make saving faster",
          "To build the post object without writing it yet, so you can add the author first",
          "To delete the post",
          "It's required for every form",
        ],
        answerIndex: 1,
        explanation:
          "commit=False creates the object in memory without hitting the database, giving you a chance to set post.author = request.user before the final save.",
      },
      {
        question: "What does Post.objects.order_by('-created') do?",
        options: [
          "Deletes old posts",
          "Returns posts sorted by created date, newest first",
          "Creates a new post",
          "Filters posts by author",
        ],
        answerIndex: 1,
        explanation:
          "order_by sorts a QuerySet; the minus sign means descending, so the most recently created posts come first.",
      },
      {
        question: "Why is @login_required on the post_new view?",
        options: [
          "To style the page",
          "So only logged-in users can create posts",
          "To make posts load faster",
          "To sort the posts",
        ],
        answerIndex: 1,
        explanation:
          "@login_required guards the create view, ensuring anonymous visitors can read the blog but only authenticated users can publish.",
      },
    ],
    flashcards: [
      { front: "ForeignKey", back: "A model field linking one row to another — here, each Post to its User author." },
      { front: "get_object_or_404", back: "Fetches one object or shows a 404 page if it doesn't exist — perfect for detail views." },
      { front: "commit=False", back: "form.save(commit=False) builds the object without saving, so you can set extra fields first." },
      { front: "Base template", back: "A shared layout other templates extend, so header/footer are written once." },
    ],
    miniProject: {
      title: "Ship Your Own Blog",
      brief: "Assemble a working blog where anyone can read posts and logged-in users can write them.",
      steps: [
        "Create the Post model with a ForeignKey to User and run migrations.",
        "Build post_list and post_detail views with their URLs and templates.",
        "Add a login-protected post_new view using a PostForm, setting author to request.user.",
        "Make a base template with a header and nav, and have every page extend it.",
        "Register Post in the admin, create a superuser, and publish your first post live.",
      ],
    },
    industryUse: [
      "Company blogs and newsrooms run on Django apps shaped exactly like this",
      "Portfolio and personal sites use the same model-view-template-auth pattern",
      "Community forums extend this blog structure with comments and user profiles",
    ],
    commonMistakes: [
      "Forgetting to set post.author before saving, leaving posts with no writer or a database error.",
      "Copying layout into every template instead of extending one base template — changes then have to be made in a dozen places.",
    ],
    interviewQuestions: [
      "Walk through how a blog post goes from a form submission to appearing on the page.",
      "Why use commit=False when saving a form, and when is it useful?",
      "How does a ForeignKey connect posts to their authors?",
    ],
    papers: [],
    nextUp: ["django-deploy"],
    cheatsheet: [
      "Post model with ForeignKey to User",
      "List + detail views, each with a URL and template",
      "@login_required + PostForm to publish",
      "save(commit=False) -> set author -> save()",
      "One base template, every page extends it",
    ],
  },
};

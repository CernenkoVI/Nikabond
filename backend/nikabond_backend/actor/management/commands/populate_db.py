import random
from datetime import date, timedelta

from django.core.management.base import BaseCommand

from actor.models import Actor
from agent.models import Agent
from project.models import Project
from role.models import Role
from session.models import Session


FIRST_NAMES_F = [
    "Emma", "Olivia", "Sophia", "Isabella", "Mia",
    "Charlotte", "Amelia", "Harper", "Evelyn", "Luna",
]
FIRST_NAMES_M = [
    "Liam", "Noah", "Oliver", "James", "Elijah",
    "William", "Henry", "Lucas", "Benjamin", "Theodore",
]
LAST_NAMES = [
    "Anderson", "Brooks", "Carter", "Davis", "Evans",
    "Fisher", "Garcia", "Harris", "Ivanov", "Jensen",
    "Kim", "Lopez", "Mitchell", "Nakamura", "O'Brien",
    "Park", "Quinn", "Rivera", "Santos", "Taylor",
]

HAIR_COLORS = ["Black", "Brown", "Blonde", "Red", "Auburn", "Gray"]
HAIR_STYLES = ["Short", "Long", "Curly", "Straight", "Wavy", "Buzz cut", "Bob"]
EYE_COLORS = ["Brown", "Blue", "Green", "Hazel", "Gray", "Amber"]
SKILLS = [
    "Stage combat", "Improv", "Singing", "Dancing", "Horseback riding",
    "Martial arts", "Swimming", "Fencing", "Dialect work", "Voice acting",
    "Stunt work", "Musical instruments", "Acrobatics", "Mime", "Puppetry",
]
OCCUPATIONS = [
    "Film actor", "Theater actor", "Voice actor", "Model", "Stunt performer",
    "Commercial actor", "TV actor", "Extra", "Stand-in", "Dancer",
]
LANGUAGES = [
    "English", "Spanish", "French", "German", "Italian",
    "Japanese", "Mandarin", "Korean", "Portuguese", "Russian",
]
COUNTRIES = [
    ("United States", "US"), ("United Kingdom", "GB"), ("Canada", "CA"),
    ("Australia", "AU"), ("Germany", "DE"), ("France", "FR"),
    ("Japan", "JP"), ("South Korea", "KR"), ("Sweden", "SE"), ("Brazil", "BR"),
]
GENDERS = ["male", "female"]
ETHNICITIES = ["black", "white", "asian", "other", None]

AGENT_COMPANIES = [
    ("Sterling Talent Agency", "Premier representation for film, television and theater talent."),
    ("Horizon Artists Management", "Boutique agency focused on emerging talent and diverse voices."),
    ("Apex Creative Partners", "Full-service talent management with global reach."),
    ("Blue Sky Casting Agency", "Specializing in commercial and voice-over talent."),
    ("Nova Star Representation", "Dedicated to nurturing the next generation of performers."),
]

PROJECT_DATA = [
    ("The Last Horizon", "An epic sci-fi drama about humanity's final frontier colony."),
    ("Midnight in Prague", "A romantic thriller set in the cobblestone streets of Prague."),
    ("Broken Compass", "A gritty detective series following a disgraced PI."),
    ("Wildflower", "A coming-of-age film set in rural 1970s America."),
    ("Electric Dreams", "A neon-lit cyberpunk anthology series."),
]

ROLE_DATA = [
    ("Captain Elena Vasquez", "Lead role. A determined space colony commander facing impossible odds."),
    ("Dr. Marcus Webb", "Supporting role. A brilliant but troubled scientist."),
    ("Sophie Laurent", "Lead role. A mysterious art dealer with a hidden past."),
    ("Detective Frank Malone", "Lead role. A world-weary PI seeking redemption."),
    ("Young Lily", "Lead role. A 16-year-old navigating family secrets in rural Texas."),
    ("Rex Donovan", "Villain. A charismatic tech mogul with dark intentions."),
    ("Nurse Takahashi", "Supporting role. Compassionate and resourceful field medic."),
    ("Officer Reyes", "Recurring. A rookie cop caught between duty and loyalty."),
    ("Grandma Rose", "Supporting role. The matriarch hiding a lifetime of secrets."),
    ("The Stranger", "Guest role. An enigmatic drifter who changes everything."),
]


def random_phone():
    return f"+1-{random.randint(200,999)}-{random.randint(100,999)}-{random.randint(1000,9999)}"


def random_date_range(base, min_gap=7, max_gap=30):
    start = base + timedelta(days=random.randint(0, 10))
    end = start + timedelta(days=random.randint(min_gap, max_gap))
    return start, end


class Command(BaseCommand):
    help = "Populate database with mock data: 20 actors, 5 agents, 5 projects, 10 roles"

    def handle(self, *args, **options):
        self.stdout.write("Creating mock data...")

        # --- Agents ---
        agents = []
        for i, (name, desc) in enumerate(AGENT_COMPANIES):
            agent = Agent.objects.create(
                name=name,
                description=desc,
                email=f"contact@{name.lower().replace(' ', '')}.com",
                phone=random_phone(),
            )
            agents.append(agent)
            self.stdout.write(f"  Agent: {agent.name}")

        # --- Actors ---
        actors = []
        used_emails = set()
        for i in range(20):
            if i < 10:
                gender = "female"
                first = FIRST_NAMES_F[i]
            else:
                gender = "male"
                first = FIRST_NAMES_M[i - 10]
            last = LAST_NAMES[i]
            name = f"{first} {last}"
            email = f"{first.lower()}.{last.lower()}@example.com"
            country_name, country_code = COUNTRIES[i % len(COUNTRIES)]

            dob = date(
                random.randint(1975, 2002),
                random.randint(1, 12),
                random.randint(1, 28),
            )

            skills = ", ".join(random.sample(SKILLS, random.randint(2, 5)))
            occupations = ", ".join(random.sample(OCCUPATIONS, random.randint(1, 3)))
            languages = ", ".join(random.sample(LANGUAGES, random.randint(1, 3)))

            actor = Actor.objects.create(
                name=name,
                dob=dob,
                email=email,
                phone=random_phone(),
                description=f"{name} is a versatile performer with a passion for storytelling.",
                haircolor=random.choice(HAIR_COLORS),
                hairstyle=random.choice(HAIR_STYLES),
                eyecolor=random.choice(EYE_COLORS),
                gender=gender,
                ethnicity=random.choice(ETHNICITIES),
                info=f"Based in {country_name}. Available for international projects. Trained at various acting studios.",
                experience=f"{random.randint(1, 25)} years in film, theater and television.",
                skills=skills,
                occupations=occupations,
                languages=languages,
                country=country_name,
                country_code=country_code,
                licence="Full driving licence",
                height=round(random.uniform(155, 195), 1),
                citizenship=country_name,
                work_permits=country_name,
                size=random.choice(["XS", "S", "M", "L", "XL"]),
                shoe_size=str(random.randint(36, 46)),
                cwh=f"{random.randint(80,110)}-{random.randint(60,90)}-{random.randint(80,110)}",
                agent=random.choice(agents) if random.random() > 0.3 else None,
            )
            actors.append(actor)
            self.stdout.write(f"  Actor: {actor.name}")

        # --- Projects ---
        projects = []
        for i, (name, desc) in enumerate(PROJECT_DATA):
            base = date.today() + timedelta(days=30 * (i + 1))
            cb_start, cb_end = random_date_range(base)
            try_start, try_end = random_date_range(cb_end)
            reh_start, reh_end = random_date_range(try_end)
            shoot_start, shoot_end = random_date_range(reh_end, min_gap=14, max_gap=60)

            project = Project.objects.create(
                name=name,
                description=desc,
                callback_start=cb_start,
                callback_end=cb_end,
                tryons_start=try_start,
                tryons_end=try_end,
                rehearsal_start=reh_start,
                rehearsal_end=reh_end,
                shooting_start=shoot_start,
                shooting_end=shoot_end,
            )
            projects.append(project)
            self.stdout.write(f"  Project: {project.name}")

        # --- Roles ---
        roles = []
        for i, (name, desc) in enumerate(ROLE_DATA):
            project = projects[i % len(projects)]
            role = Role.objects.create(
                name=name,
                description=desc,
                project=project,
            )
            # Assign 1-4 random actors to each role
            role_actors = random.sample(actors, random.randint(1, 4))
            role.actors.set(role_actors)
            roles.append(role)
            self.stdout.write(f"  Role: {role.name} (Project: {project.name})")

        self.stdout.write(self.style.SUCCESS(
            f"\nDone! Created {len(agents)} agents, {len(actors)} actors, "
            f"{len(projects)} projects, {len(roles)} roles."
        ))

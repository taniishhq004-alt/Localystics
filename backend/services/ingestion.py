from sources.predicthq import PredictHQSource


def classify_event(event):
    """Convert PredictHQ event data into Localystic categories."""

    phq_category = (event.get("category") or "").lower().strip()
    title = (event.get("title") or "").lower()
    description = (event.get("description") or "").lower()

    labels = event.get("phq_labels", []) or event.get("tags", []) or []

    label_text = " ".join(
        item.get("label", "") if isinstance(item, dict) else str(item)
        for item in labels
    ).lower()

    text = f"{title} {description} {label_text}"

    # -------------------------
    # Sports
    # -------------------------

    if phq_category in {"sports", "sport"}:
        return "Sports"

    sports_keywords = [
        "marathon",
        "football",
        "cricket",
        "basketball",
        "tennis",
        "running",
        "sport",
        "race",
        "cycling",
        "swimming",
        "athletics",
        "golf",
        "hockey",
        "badminton",
    ]

    if any(keyword in text for keyword in sports_keywords):
        return "Sports"

    # -------------------------
    # Workshops / Hackathons
    # -------------------------

    workshop_keywords = [
        "workshop",
        "bootcamp",
        "training",
        "hands-on",
        "masterclass",
        "hackathon",
    ]

    if any(keyword in text for keyword in workshop_keywords):
        return "Workshop"

    # -------------------------
    # Meetups
    # -------------------------

    meetup_keywords = [
        "meetup",
        "meet-up",
        "networking meetup",
        "community meetup",
    ]

    if any(keyword in text for keyword in meetup_keywords):
        return "Meetup"

    # -------------------------
    # Internships
    # -------------------------

    internship_keywords = [
        "internship",
        "intern ",
        "placement",
        "recruitment",
        "hiring",
    ]

    if any(keyword in text for keyword in internship_keywords):
        return "Internship"

    # -------------------------
    # Volunteering
    # -------------------------

    volunteer_keywords = [
        "volunteer",
        "volunteering",
        "charity",
        "fundraiser",
        "community service",
    ]

    if any(keyword in text for keyword in volunteer_keywords):
        return "Volunteering"

    # -------------------------
    # College / Education
    # -------------------------

    college_keywords = [
        "college",
        "university",
        "campus",
        "education fair",
        "student",
        "career fair",
        "academic",
        "school",
        "institute",
    ]

    if any(keyword in text for keyword in college_keywords):
        return "College Event"

    # -------------------------
    # Technology
    # -------------------------

    tech_keywords = [
        "technology",
        "tech",
        "software",
        "engineering",
        "computer",
        "data science",
        "artificial intelligence",
        " ai ",
        "automation",
        "industrial",
        "innovation",
        "electronics",
        "cyber",
        "cloud",
        "developer",
        "science",
        "manufacturing",
        "digital",
        "expo",
        "exhibition",
        "conference",
    ]

    # PredictHQ expo/conference events
    # are treated as Tech Events unless
    # a more specific category matched above.
    if phq_category in {
        "expos",
        "expo",
        "conference",
        "conferences",
    }:
        return "Tech Event"

    if any(keyword in text for keyword in tech_keywords):
        return "Tech Event"

    # -------------------------
    # Everything else
    # -------------------------

    return "Other"


def get_live_opportunities():
    """
    Fetch live events from PredictHQ
    and normalize them for Localystic.
    """

    source = PredictHQSource()

    raw_events = source.fetch_events()

    opportunities = []

    for event in raw_events:

        # -------------------------
        # GEO DATA
        # -------------------------

        geo = event.get("geo") or {}

        geometry = geo.get("geometry") or {}

        coordinates = geometry.get("coordinates") or []

        longitude = event.get("longitude")

        latitude = event.get("latitude")

        # PredictHQ coordinates are:
        # [longitude, latitude]

        if latitude is None and len(coordinates) >= 2:
            longitude = coordinates[0]
            latitude = coordinates[1]

        # -------------------------
        # LOCATION
        # -------------------------

        location_data = event.get("location")

        address = geo.get("address", {}) or {}

        # Prefer human-readable address
        if address.get("formatted_address"):

            location = address["formatted_address"]

        elif isinstance(location_data, list):

            location = ", ".join(
                str(value)
                for value in location_data
            )

        else:

            location = location_data or ""

        # -------------------------
        # TAGS
        # -------------------------

        labels = event.get("phq_labels", [])

        tags = [
            item.get("label", "")
            if isinstance(item, dict)
            else str(item)
            for item in labels
        ]

        # -------------------------
        # DESCRIPTION
        # -------------------------

        description = event.get(
            "description",
            ""
        )

        # Remove duplicate PredictHQ prefix
        description = description.replace(
            "Sourced from predicthq.com - ",
            "",
            1
        ).strip()

        if not description:
            description = "Sourced from PredictHQ"

        # -------------------------
        # COUNTRY
        # -------------------------

        country = (
            event.get("country")
            or address.get("country_code", "")
        )

        # -------------------------
        # DATE
        # -------------------------

        date = (
            event.get("start_local")
            or event.get("start")
        )

        # -------------------------
        # NORMALIZED EVENT
        # -------------------------

        opportunity = {

            "id": event.get("id"),

            "title": event.get(
                "title",
                "Untitled Event"
            ),

            "description": description,

            "category": classify_event(event),

            "date": date,

            "location": location,

            "venue": event.get(
                "venue",
                ""
            ),

            "latitude": latitude,

            "longitude": longitude,

            "country": country,

            "tags": tags,

            "source": "PredictHQ",
        }

        opportunities.append(
            opportunity
        )

    return opportunities
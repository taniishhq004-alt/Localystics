import os
import requests
from dotenv import load_dotenv

from sources.base import EventSource

load_dotenv()

PREDICTHQ_URL = "https://api.predicthq.com/v1/events/"


class PredictHQSource(EventSource):

    def __init__(self):
        self.api_key = os.getenv("PREDICTHQ_API_KEY")

    def fetch_events(self):

        if not self.api_key:
            print("ERROR: PREDICTHQ_API_KEY not found in .env")
            return []

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "application/json"
        }

        params = {
            "country": "IN",
            "limit": 20
        }

        try:
            response = requests.get(
                PREDICTHQ_URL,
                headers=headers,
                params=params,
                timeout=20
            )

            print("PredictHQ status:", response.status_code)

            response.raise_for_status()

            data = response.json()

            return data.get("results", [])

        except requests.exceptions.RequestException as error:
            print("PredictHQ request failed:")
            print(error)
            return []
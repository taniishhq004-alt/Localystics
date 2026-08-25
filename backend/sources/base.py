from abc import ABC, abstractmethod


class EventSource(ABC):

    @abstractmethod
    def fetch_events(self):
        pass
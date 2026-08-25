from fastapi import APIRouter
from services.ingestion import get_live_opportunities

router = APIRouter(
    prefix="/opportunities",
    tags=["Opportunities"]
)


@router.get("/")
def get_opportunities():

    events = get_live_opportunities()

    return {
        "count": len(events),
        "events": events
    }
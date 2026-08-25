from fastapi import FastAPI

from routers.opportunities import router as opportunities_router


app = FastAPI(
    title="Localystic API",
    description="Local event discovery backend",
    version="1.0.0"
)


app.include_router(opportunities_router)


@app.get("/")
def root():
    return {
        "message": "Localystic backend is running"
    }
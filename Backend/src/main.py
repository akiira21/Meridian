from config import Config
from fastapi import FastAPI

from database import db

config = Config()

app = FastAPI(title="Meridian API")

@app.get("/health")
def health():
    db.init(config.DATABASE_URL)
    return  {
        "status": "ok",
        "database": "ok" if db.ping() else "failed"
    }

@app.get("/health/db")
def health_db():
    return {"status": "ok" if db.ping() else "error"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=config.HOST, port=config.PORT)

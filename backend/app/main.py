from fastapi import FastAPI


app = FastAPI(
    title="Processes Automation Platform API",
    version="0.1.0",
)

# app.include_router(api_router, prefix="/")
# app.include_router(api_router)

@app.get("/")
async def root():
    return { "message" : "Hello World!" }


@app.get("/pdf_analysis")
async def pdf_analysis():
    return { "pdf-content" : "Text here" }
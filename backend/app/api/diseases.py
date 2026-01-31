from fastapi import APIRouter, HTTPException
import json
import os

router = APIRouter()

# Path: backend/medical_data/diseases.json
# __file__ → backend/app/api/diseases.py
# dirname(dirname(dirname(__file__))) → backend/
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
DATA_FILE = os.path.join(BASE_DIR, "medical_data", "diseases.json")

@router.get("/diseases")
def all_diseases():
    try:
        with open(DATA_FILE, "r") as file:
            return json.load(file)
    except Exception as e:
        print("Error loading diseases.json:", e)
        raise HTTPException(status_code=500, detail="Could not load diseases data")

@router.get("/diseases/{d_id}")
def disease_details(d_id: int):
    try:
        with open(DATA_FILE, "r") as file:
            data = json.load(file)

        for category in data:
            for disease in category["items"]:
                if disease["id"] == d_id:
                    return disease

        raise HTTPException(status_code=404, detail="Disease not found")

    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Error processing disease data")

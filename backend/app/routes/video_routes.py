from fastapi import APIRouter, UploadFile, File

router = APIRouter()


@router.post("/upload-video")
async def upload_video(
    file: UploadFile = File(...)
):

    # Mock AI extraction result

    extracted_data = {

        "product_name":
        "Nike Blue Running Shoes",

        "brand":
        "Nike",

        "category":
        "Shoes",

        "color":
        "Blue",

        "material":
        "Mesh",

        "gender":
        "Men",

        "confidence_score":
        "92%",

        "detected_keywords": [
            "running shoes",
            "sports shoes",
            "lightweight",
            "mesh upper"
        ]
    }

    return {

        "message":
        "Video processed successfully",

        "ai_extracted_data":
        extracted_data
    }
from fastapi import APIRouter
from pydantic import BaseModel

from groq import Groq

import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


class TitleRequest(BaseModel):

    title: str


@router.post("/enhance-title")
def enhance_title(data: TitleRequest):

    prompt = f"""
Generate ONLY ONE optimized ecommerce product title.

Product:
{data.title}

Rules:
- Return ONLY the final title
- No explanation
- No bullet points
- No markdown
- Maximum 15 words
- SEO friendly
- Professional
"""

    response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        temperature=0.5,

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]

    )

    enhanced_title = response.choices[0].message.content

    return {
        "original_title": data.title,
        "enhanced_title": enhanced_title
    }
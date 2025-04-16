from pydantic import BaseModel, Field

class Item(BaseModel):
    name: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)

class User(BaseModel):
    username: str = Field(..., min_length=1)
    bio: str = Field(..., min_length=1)
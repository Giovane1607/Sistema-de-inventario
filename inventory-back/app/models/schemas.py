import datetime
from typing import List
from pydantic import BaseModel

class InventoryItemBase(BaseModel):
    barcode: str
    description: str
    quantity: int
    unit: str

class InventoryItemCreate(InventoryItemBase):
    pass


class InventoryItem(InventoryItemBase):
    id: int

    class Config:
        from_attributes = True  # Isso permite que o Pydantic converta modelos do SQLAlchemy em JSON


class InventoryResponse(BaseModel):
    items: List[InventoryItem]
    timestamp: datetime.datetime

    class Config:
        arbitrary_types_allowed = True


# isso aqui é um schema de response da API
class CreateItemResponse(BaseModel):
    message: str
    barcode: str

    class Config:
        from_attributes = True
from sqlalchemy import Column, Integer, String
from app.core.config import Base

class InventoryItem(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, index=True) # autoincrement
    barcode = Column(String, unique=True, index=True)
    description = Column(String, index=True)
    quantity = Column(Integer)
    unit = Column(String)
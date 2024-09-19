import datetime
from typing import List, Union
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.models import InventoryItem as InventoryItemModel
from app.models.schemas import InventoryItemCreate, InventoryResponse, CreateItemResponse, InventoryItem
from app.core.config import SessionLocal


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/items", response_model=InventoryResponse)
def list_items(db: Session = Depends(get_db)):
 
    items = db.query(InventoryItemModel).all()
    current_time = datetime.datetime.now()
    return {"items": items, "timestamp": current_time}



@router.post("/items", response_model=List[CreateItemResponse])
def create_item(
    items: Union[InventoryItemCreate, List[InventoryItemCreate]],
    db: Session = Depends(get_db)
):
    """
    Rota para criar um ou vários itens no inventário.
    """
    if not isinstance(items, list):
        items = [items]  # Se for um único item, converte para lista

    created_items = []
    for item in items:
        db_item = db.query(InventoryItemModel).filter(InventoryItemModel.barcode == item.barcode).first()
        if db_item:
            raise HTTPException(status_code=400, detail=f"Item com código de barras {item.barcode} já existe")
        
        new_item = InventoryItemModel(**item.dict())
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
        
        # Adicionar o item recém-criado à lista de respostas
        created_items.append(CreateItemResponse(message="Item criado com sucesso", barcode=new_item.barcode))
    
    return created_items

@router.get("/item/{item_id}", response_model=InventoryItem)
def retrieve_item(item_id: int, db: Session = Depends(get_db)):
    """
    Rota para buscar um único item por ID.
    """
    item = db.query(InventoryItemModel).filter(InventoryItemModel.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    return item

@router.put("/item/{barcode}", response_model=CreateItemResponse)
def update_item(
    barcode: str, 
    item_data: InventoryItemCreate,
    db: Session = Depends(get_db)
):

    item = db.query(InventoryItemModel).filter(InventoryItemModel.barcode == barcode).first()
    
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")

    item.description = item_data.description
    item.quantity = item_data.quantity
    item.unit = item_data.unit
    
    db.commit()
    db.refresh(item)
    
    return CreateItemResponse(message=f"Item {item.barcode} atualizado com sucesso", barcode=item.barcode)


@router.delete("/item/{item_id}", response_model=CreateItemResponse)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    """
    Rota para deletar um item pelo ID.
    """
    item = db.query(InventoryItemModel).filter(InventoryItemModel.id == item_id).first()
    
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    
    db.delete(item)
    db.commit()
    
    return CreateItemResponse(message=f"Item {item_id} deletado com sucesso", barcode=item.barcode)
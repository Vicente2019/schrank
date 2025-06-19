import Container from "../components/ui/Container";
import ItemForm from "../components/items/ItemForm";
import { useNavigate } from "react-router-dom";
import { createItem } from "../services/itemService";

export default function NewItemPage() {
  const navigate = useNavigate();
  const handleCreate = (form: FormData) => createItem(form)
    .then(() => navigate("/items"))
    .catch(console.error);

  return (
    <Container className="py-6">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <ItemForm onSubmit={handleCreate}/>
    </Container>
  );
}

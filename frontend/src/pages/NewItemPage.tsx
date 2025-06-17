import Container from "../components/ui/Container";
import NewItemForm from "../components/items/NewItemForm";

export default function NewItemPage() {
  return (
    <Container className="py-6">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <NewItemForm />
    </Container>
  );
}

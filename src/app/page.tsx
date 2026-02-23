import IngredientForm from "@/components/home/IngredientForm";

export default function HomePage() {
  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-text-primary">오늘 뭐 먹지?</h2>
        <p className="mt-2 text-sm text-text-secondary">
          재료를 입력하면 AI가 레시피를 만들어줘요
        </p>
      </div>
      <IngredientForm />
    </div>
  );
}

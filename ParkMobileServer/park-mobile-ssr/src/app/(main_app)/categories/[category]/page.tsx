import { ProductObertka } from "@/Components/Catalog/Products/ProductObertka/ProductObertka";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const selectedCategory = (await params).category;
  return <ProductObertka category={selectedCategory} />;
}

export const generateStaticParams = async () => {
  const categories = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Dyson",
    "Headphones",
    "Gaming",
  ];

  return categories.map((category) => ({
    category,
  }));
};

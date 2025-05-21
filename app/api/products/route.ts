import { NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid"; // Import uuid
import { dummyProducts } from "@/constants";
// const dummyProducts = [
//   {
//     id: uuidv4(),
//     name: "Rice",
//     category: "Grains",
//     quantity: 100,
//     unit: "kg",
//   },
//   {
//     id: uuidv4(),
//     name: "Sugar",
//     category: "Sweetener",
//     quantity: 50,
//     unit: "kg",
//   },
//   {
//     id: uuidv4(),
//     name: "Oil",
//     category: "Cooking",
//     quantity: 80,
//     unit: "liters",
//   },
//   {
//     id: uuidv4(),
//     name: "Wheat Flour",
//     category: "Grains",
//     quantity: 200,
//     unit: "kg",
//   },
// ];

export async function GET() {
  return NextResponse.json(dummyProducts);
}

export async function POST(req: Request) {
  const newProduct = await req.json();
  dummyProducts.push(newProduct);
  return NextResponse.json(
    { message: "Product added", product: newProduct },
    { status: 201 }
  );
}

// export { dummyProducts };

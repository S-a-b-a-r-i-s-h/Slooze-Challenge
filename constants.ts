import { v4 as uuidv4 } from "uuid"; // Import uuid

const dummyProducts = [
  {
    id: uuidv4(),
    name: "Rice",
    category: "Grains",
    quantity: 100,
    unit: "kg",
  },
  {
    id: uuidv4(),
    name: "Sugar",
    category: "Sweetener",
    quantity: 50,
    unit: "kg",
  },
  {
    id: uuidv4(),
    name: "Oil",
    category: "Cooking",
    quantity: 80,
    unit: "liters",
  },
  {
    id: uuidv4(),
    name: "Wheat Flour",
    category: "Grains",
    quantity: 200,
    unit: "kg",
  },
];

export { dummyProducts };
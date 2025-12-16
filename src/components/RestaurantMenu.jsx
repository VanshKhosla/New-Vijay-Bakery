import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  "All", "Add-Ons", "Veg Pizza", "Non Veg Pizza",
  "Small Bites (Veg)", "Small Bites (Non-Veg)", "Breakfast",
  "Sandwich (Veg)", "Sandwich (Non-Veg)", "Burger (Veg)", "Burger (Non-Veg)",
  "Breads & More (Veg)", "Breads & More (Non-Veg)",
  "Kathi Roll & Grilled Wraps (Veg)", "Kathi Roll & Grilled Wraps (Non-Veg)",
  "Sizzlers (Veg)", "Sizzlers (Non-Veg)",
  "Nachos (Veg)", "Nachos (Non-Veg)",
  "Pan & Baked Pasta (Veg)", "Pan & Baked Pasta (Non-Veg)",
  "Salads (Veg)", "Salads (Non-Veg)",
  "Main Course (Veg)", "Main Course (Non-Veg)",
  "Indo-Chinese (Veg)", "Indo-Chinese (Non-Veg)",
  "Waffles", "Soups", "Hot Beverages", "Hot Latte",
  "Premium Hot Latte", "Hot Tea", "Iced Tea",
  "Cold Beverages", "Premium Cold Beverages",
  "Mocktails", "Premium Mocktails", "Shakes",
  "Premium Chocolate Shakes", "Smoothies", "Sundae"
];

const GOLD_GRADIENT = {
  background: "linear-gradient(90deg, #b8860b, #ffd700, #b8860b)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold"
};

const GOLD_SOFT = { color: "#ffd700" };

// ⬇ SAMPLE (EMPTY) menu. You will paste your menu here later.
const menuItems = [
  {
    id: 1,
    name: "Margherita",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Margherita.jpg",
    description: "Basic Layer of Mozzarella Cheese",
    variants: [
      { size: "Medium", price: 140 },
      { size: "Large", price: 200 }
    ]
  },
  {
    id: 2,
    name: "Classic Corn & Tomato",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Classic-Corn-&-Tomato.jpg",
    description: "Corn & Tomato Rings with Cheese",
    variants: [
      { size: "Medium", price: 170 },
      { size: "Large", price: 230 }
    ]
  },
  {
    id: 3,
    name: "Veg. Crunch",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Veg-Crunch.jpg",
    description: "Onion & Capsicum",
    variants: [
      { size: "Medium", price: 200 },
      { size: "Large", price: 270 }
    ]
  },
  {
    id: 4,
    name: "5 Peppery Triplet",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/5-Peppery-Triplet.jpg",
    description: "Green, Red, Yellow, Pepper, Green chilli and Paprika",
    variants: [
      { size: "Medium", price: 280 },
      { size: "Large", price: 380 }
    ]
  },
  {
    id: 5,
    name: "Famous Pizza",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Famous-Pizza.jpg",
    description: "Mushroom, Capsicum, Onion & Olives",
    variants: [
      { size: "Medium", price: 290 },
      { size: "Large", price: 310 }
    ]
  },
  {
    id: 6,
    name: "Farm House",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Farm-House.jpg",
    description: "Onion, Capsicum, Tomato, Corn, Olives & Jalapeno",
    variants: [
      { size: "Medium", price: 300 },
      { size: "Large", price: 380 }
    ]
  },
  {
    id: 7,
    name: "Indian Delight",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Indian-Delight.jpg",
    description: "Onion, Capsicum, Mushroom & Cottage Cheese",
    variants: [
      { size: "Medium", price: 290 },
      { size: "Large", price: 350 }
    ]
  },
  {
    id: 8,
    name: "South Indian Tadka",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/South-Indian-Tadka.jpg",
    description: "Onion, Capsicum, Sauteed Paneer, Mustard Seeds & Curry Leaves",
    variants: [
      { size: "Medium", price: 310 },
      { size: "Large", price: 370 }
    ]
  },
  {
    id: 9,
    name: "Peri Peri (Spicy)",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Peri-Peri-Spicy.jpg",
    description: "Onion, Capsicum, Jalapeno, Paprika & Marinated Paneer",
    variants: [
      { size: "Medium", price: 300 },
      { size: "Large", price: 390 }
    ]
  },
  {
    id: 10,
    name: "Mexican Salsa",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Mexican-Salsa.jpg",
    description: "Onion, Capsicum, Sweet Corn, Tomato, Parsley & Salsa Paneer",
    variants: [
      { size: "Medium", price: 320 },
      { size: "Large", price: 400 }
    ]
  },
  {
    id: 11,
    name: "Paneer Makhni",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Paneer-Makhni.jpg",
    description: "Capsicum, Onion, Corn & Sauteed Makhni Paneer",
    variants: [
      { size: "Medium", price: 320 },
      { size: "Large", price: 400 }
    ]
  },
  {
    id: 12,
    name: "Achari Paneer Tikka",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Achari-Paneer-Tikka.jpg",
    description: "Onion, Capsicum, Tomato & Achari Paneer Tikka",
    variants: [
      { size: "Medium", price: 330 },
      { size: "Large", price: 410 }
    ]
  },
  {
    id: 13,
    name: "Hara Bhara Paneer",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Hara-Bhara-Paneer.jpg",
    description: "Onion, Capsicum, Roasted Spinach & Pudina Paneer",
    variants: [
      { size: "Medium", price: 340 },
      { size: "Large", price: 420 }
    ]
  },
  {
    id: 14,
    name: "Afghani Paneer Tikka",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Afghani-Paneer-Tikka.jpg",
    description: "Onion, Red & Yellow Pepper, Jalapeno With Paneer Tikka",
    variants: [
      { size: "Medium", price: 360 },
      { size: "Large", price: 440 }
    ]
  },
  {
    id: 15,
    name: "Schezwan Fiery Spicy Cheese",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Schezwan-Fiery-Spicy-Cheese.jpg",
    description: "Onion, Capsicum, Paneer, Black Olives & Jalapeno",
    variants: [
      { size: "Medium", price: 280 },
      { size: "Large", price: 380 }
    ]
  },
  {
    id: 16,
    name: "Beijing Style Tom Yam",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Beijing-Style-Tom-Yam.jpg",
    description: "Onion, Capsicum, Cabbage, Paneer in Sweet Chilli Sauce",
    variants: [
      { size: "Medium", price: 310 },
      { size: "Large", price: 410 }
    ]
  },
  {
    id: 17,
    name: "Middle Eastern",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Middle-Eastern.jpg",
    description: "Onion, Capsicum, Corn, Broccoli With Sumac Seasoning",
    variants: [
      { size: "Medium", price: 320 },
      { size: "Large", price: 420 }
    ]
  },
  {
    id: 18,
    name: "Exotic Veggies Mania",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Exotic-Veggies-Mania.jpg",
    description:
      "Onion, Capsicum, Red & Yellow Pepper, Broccoli, Zucchini, Jalapeno & Olives",
    variants: [
      { size: "Medium", price: 370 },
      { size: "Large", price: 440 }
    ]
  },
  {
    id: 19,
    name: "Veg. Fajitas",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Veg-Fajitas.jpg",
    description:
      "Onion, Capsicum, Paprika, Parsley, Green Chilli & Paneer",
    variants: [
      { size: "Medium", price: 300 },
      { size: "Large", price: 390 }
    ]
  },
  {
    id: 20,
    name: "Rifle 18 (Royal Signature Deep Dish)",
    category: "Veg Pizza",
    type: "veg",
    img: "/Images/Rifle-18.jpg",
    description: "Make Your Own Pizza with 8 Toppings",
    variants: [
      { size: "Medium", price: 400 },
      { size: "Large", price: 500 }
    ]
  },

  // ─────────────── NON VEG PIZZA ───────────────

  {
    id: 21,
    name: "Chicken Margherita",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Chicken-Margherita.jpg",
    description: "Chicken & Cheese",
    variants: [
      { size: "Medium", price: 200 },
      { size: "Large", price: 270 }
    ]
  },
  {
    id: 22,
    name: "BBQ Chilli Chicken Pizza",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/BBQ-Chilli-Chicken-Pizza.jpg",
    description: "Chicken, Paprika & Chilli Flakes",
    variants: [
      { size: "Medium", price: 230 },
      { size: "Large", price: 310 }
    ]
  },
  {
    id: 23,
    name: "Chicken Pizza",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Chicken-Pizza.jpg",
    description: "Onion, Capsicum, Olives & Chicken",
    variants: [
      { size: "Medium", price: 250 },
      { size: "Large", price: 310 }
    ]
  },
  {
    id: 24,
    name: "Tandoori Murgh",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Tandoori-Murgh.jpg",
    description: "Onion, Capsicum, Tomato With Tandoori Chicken Tikka",
    variants: [
      { size: "Medium", price: 270 },
      { size: "Large", price: 330 }
    ]
  },
  {
    id: 25,
    name: "Bhunna Lasooni Chicken",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Bhunna-Lasooni-Chicken.jpg",
    description:
      "Garlic Chicken Tikka, Onion, Olives, Capsicum & Tomato",
    variants: [
      { size: "Medium", price: 290 },
      { size: "Large", price: 350 }
    ]
  },
  {
    id: 26,
    name: "Bianca Salami",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Bianca-Salami.jpg",
    description: "Chicken, Salami, Onion, Jalapeno & Corn",
    variants: [
      { size: "Medium", price: 290 },
      { size: "Large", price: 350 }
    ]
  },
  {
    id: 27,
    name: "Murgh Methi Malai",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Murgh-Methi-Malai.jpg",
    description:
      "Chicken Tikka, Onion, Capsicum, Corn & Fenugreek",
    variants: [
      { size: "Medium", price: 310 },
      { size: "Large", price: 370 }
    ]
  },
  {
    id: 28,
    name: "Afghani Dum Chicken",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Afghani-Dum-Chicken.jpg",
    description:
      "White Chicken, Onion, Olives, Jalapeno & Capsicum",
    variants: [
      { size: "Medium", price: 330 },
      { size: "Large", price: 390 }
    ]
  },
  {
    id: 29,
    name: "Minced Romero Chicken",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Minced-Romero-Chicken.jpg",
    description: "Minced Chicken, Peppers in Cajun Seasoning",
    variants: [
      { size: "Medium", price: 340 },
      { size: "Large", price: 400 }
    ]
  },
  {
    id: 30,
    name: "Peri Peri Chicken Pizza",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Peri-Peri-Chicken-Pizza.jpg",
    description: "Spicy Chicken, Sausages, Onion & Capsicum",
    variants: [
      { size: "Medium", price: 300 },
      { size: "Large", price: 360 }
    ]
  },
  {
    id: 31,
    name: "Chicken Caprese",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Chicken-Caprese.jpg",
    description: "Onion, Tomato, Pepper & Chicken Ham",
    variants: [
      { size: "Medium", price: 340 },
      { size: "Large", price: 390 }
    ]
  },
  {
    id: 32,
    name: "Fiori Di Zucca Chicken",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Fiori-Di-Zucca-Chicken.jpg",
    description:
      "Peppers, Green Chilli & Seasoned Chicken",
    variants: [
      { size: "Medium", price: 360 },
      { size: "Large", price: 410 }
    ]
  },
  {
    id: 33,
    name: "Mutton Rustica",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Mutton-Rustica.jpg",
    description:
      "Mutton Patty Cubes, Salami, Onion & Olives",
    variants: [
      { size: "Medium", price: 370 },
      { size: "Large", price: 420 }
    ]
  },
  {
    id: 34,
    name: "Chicken Bismark",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Chicken-Bismark.jpg",
    description:
      "Chicken, Broccoli, Mushroom & Pineapple Cubes",
    variants: [
      { size: "Medium", price: 370 },
      { size: "Large", price: 420 }
    ]
  },
  {
    id: 35,
    name: "Vietnamese Spicy Egg & Chicken",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Vietnamese-Spicy-Egg-&-Chicken.jpg",
    description:
      "Egg Ribbon, Chicken, Onion, Peppers & Jalapeno",
    variants: [
      { size: "Medium", price: 380 },
      { size: "Large", price: 440 }
    ]
  },
  {
    id: 36,
    name: "Porchetta Fish",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Porchetta-Fish.jpg",
    description:
      "Fish Cubes, Sausages, Onion, Corn & Zucchini",
    variants: [
      { size: "Medium", price: 410 },
      { size: "Large", price: 450 }
    ]
  },
  {
    id: 37,
    name: "Schezwan Peppery Chicken",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Schezwan-Peppery-Chicken.jpg",
    description:
      "Chicken, Baby Corn, Schezwan Sauce, Sausages & Jalapeno",
    variants: [
      { size: "Medium", price: 440 },
      { size: "Large", price: 520 }
    ]
  },
  {
    id: 38,
    name: "Quad City Chicken",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Quad-City-Chicken.jpg",
    description:
      "Seekh, Sausages, Salami, Tandoori Chicken, Onion, Tomato, Olives & Corn",
    variants: [
      { size: "Medium", price: 460 },
      { size: "Large", price: 520 }
    ]
  },
  {
    id: 39,
    name: "Hawaiian Pepperoni",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Hawaiian-Pepperoni.jpg",
    description:
      "Chicken, Ham, Pepperoni & Fruits",
    variants: [
      { size: "Medium", price: 480 },
      { size: "Large", price: 530 }
    ]
  },
  {
    id: 40,
    name: "Rifle 18 (Royal Salute Deep Dish)",
    category: "Non Veg Pizza",
    type: "nonveg",
    img: "/Images/Rifle-18-Royal-Salute.jpg",
    description: "Make Your Own Pizza with 8 Toppings",
    variants: [
      { size: "Medium", price: 550 },
      { size: "Large", price: 600 }
    ]
  },
  {
    id: 41,
    name: "French Fries",
    category: "Small Bites (Veg)",
    type: "veg",
    img: "/Images/French-Fries.jpg",
    description: "Classic salted fries",
    variants: [{ size: "Regular", price: 130 }]
  },
  {
    id: 42,
    name: "Peri Peri French Fries",
    category: "Small Bites (Veg)",
    type: "veg",
    img: "/Images/Peri-Peri-French-Fries.jpg",
    description: "Fries tossed in peri peri seasoning",
    variants: [{ size: "Regular", price: 150 }]
  },
  {
    id: 43,
    name: "Masala Fries",
    category: "Small Bites (Veg)",
    type: "veg",
    img: "/Images/Masala-Fries.jpg",
    description: "Fries seasoned with Indian masala mix",
    variants: [{ size: "Regular", price: 170 }]
  },
  {
    id: 44,
    name: "Veggie Fingers (6 Pcs)",
    category: "Small Bites (Veg)",
    type: "veg",
    img: "/Images/Veggie-Fingers.jpg",
    description: "Crunchy vegetable fingers (6 pieces)",
    variants: [{ size: "6 Pcs", price: 180 }]
  },
  {
    id: 45,
    name: "Cheesy Shots (10 Pcs)",
    category: "Small Bites (Veg)",
    type: "veg",
    img: "/Images/Cheesy-Shots.jpg",
    description: "Bite-sized cheese-filled shots (10 pcs)",
    variants: [{ size: "10 Pcs", price: 200 }]
  },
  {
    id: 46,
    name: "Fried Wedges",
    category: "Small Bites (Veg)",
    type: "veg",
    img: "/Images/Fried-Wedges.jpg",
    description: "Deep-fried potato wedges",
    variants: [{ size: "Regular", price: 170 }]
  },
  {
    id: 47,
    name: "Veggie Nuggets (10 Pcs)",
    category: "Small Bites (Veg)",
    type: "veg",
    img: "/Images/Veggie-Nuggets.jpg",
    description: "Crispy vegetable nuggets (10 pcs)",
    variants: [{ size: "10 Pcs", price: 200 }]
  },
  {
    id: 48,
    name: "Potato Bites (15 Pcs)",
    category: "Small Bites (Veg)",
    type: "veg",
    img: "/Images/Potato-Bites.jpg",
    description: "Mini potato bites (15 pcs)",
    variants: [{ size: "15 Pcs", price: 180 }]
  },
  {
    id: 49,
    name: "Cheese Strips in Lime & Sesame Style",
    category: "Small Bites (Veg)",
    type: "veg",
    img: "/Images/Cheese-Strips-Lime-Sesame.jpg",
    description: "Cheese strips tossed with lime & sesame seasoning",
    variants: [{ size: "Regular", price: 260 }]
  },
  {
    id: 50,
    name: "Masala Fries Baked (Poutine Style)",
    category: "Small Bites (Veg)",
    type: "veg",
    img: "/Images/Masala-Fries-Baked-Poutine.jpg",
    description: "Baked fries topped in poutine-style seasoning",
    variants: [{ size: "Regular", price: 270 }]
  },
  {
    id: 51,
    name: "Peri Peri Wedges Baked (Cheesy Baked)",
    category: "Small Bites (Veg)",
    type: "veg",
    img: "/Images/Peri-Peri-Wedges-Baked-Cheesy.jpg",
    description: "Baked peri-peri wedges with cheese",
    variants: [{ size: "Regular", price: 250 }]
  },
  {
    id: 52,
    name: "Corn & Cheese Filled Short Fried Roll",
    category: "Small Bites (Veg)",
    type: "veg",
    img: "/Images/Corn-Cheese-Short-Fried-Roll.jpg",
    description: "Short rolls filled with corn & cheese blend",
    variants: [{ size: "Regular", price: 290 }]
  },

  // ─────────────── SMALL BITES NON-VEG ───────────────

  {
    id: 53,
    name: "Chicken Nuggets (10 Pcs)",
    category: "Small Bites (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Nuggets.jpg",
    description: "Crispy chicken nuggets (10 pieces)",
    variants: [{ size: "10 Pcs", price: 190 }]
  },
  {
    id: 54,
    name: "Crispy Fried Chicken",
    category: "Small Bites (Non-Veg)",
    type: "nonveg",
    img: "/Images/Crispy-Fried-Chicken.jpg",
    description: "Deep-fried crispy chicken portions",
    variants: [{ size: "Regular", price: 250 }]
  },
  {
    id: 55,
    name: "Chicken Strips",
    category: "Small Bites (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Strips.jpg",
    description: "Crispy breaded chicken strips",
    variants: [{ size: "Regular", price: 270 }]
  },
  {
    id: 56,
    name: "Chicken Popcorn",
    category: "Small Bites (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Popcorn.jpg",
    description: "Bite-sized crispy chicken popcorn",
    variants: [{ size: "Regular", price: 210 }]
  },
  {
    id: 57,
    name: "Chicken Drumsticks in Hoisin Sauce (4 Pcs)",
    category: "Small Bites (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Drumsticks-Hoisin.jpg",
    description: "Drumsticks tossed in hoisin sauce (4 pcs)",
    variants: [{ size: "4 Pcs", price: 370 }]
  },
  {
    id: 58,
    name: "Chicken Wings in Chilli Garlic Sauce (4 Pcs)",
    category: "Small Bites (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Wings-Chilli-Garlic.jpg",
    description: "Chicken wings coated in chilli garlic sauce",
    variants: [
      { size: "4 Pcs", price: 200 },
      { size: "8 Pcs", price: 270 }
    ]
  },
  {
    id: 59,
    name: "Chicken Wings in Americano Sauce (4 Pcs)",
    category: "Small Bites (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Wings-Americano.jpg",
    description: "Chicken wings glazed with Americano sauce",
    variants: [
      { size: "4 Pcs", price: 200 },
      { size: "8 Pcs", price: 270 }
    ]
  },
  {
    id: 60,
    name: "Chicken Wings in Teriyaki Sauce (4 Pcs)",
    category: "Small Bites (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Wings-Teriyaki.jpg",
    description: "Wings tossed in teriyaki sauce",
    variants: [
      { size: "4 Pcs", price: 240 },
      { size: "8 Pcs", price: 320 }
    ]
  },
  {
    id: 61,
    name: "Chicken Wings in Hoisin Sauce (4 Pcs)",
    category: "Small Bites (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Wings-Hoisin.jpg",
    description: "Chicken wings flavored with hoisin sauce",
    variants: [
      { size: "4 Pcs", price: 240 },
      { size: "8 Pcs", price: 320 }
    ]
  },
  {
    id: 62,
    name: "Fish & Chips",
    category: "Small Bites (Non-Veg)",
    type: "nonveg",
    img: "/Images/Fish-and-Chips.jpg",
    description: "Fried fish served with potato fries",
    variants: [{ size: "Regular", price: 370 }]
  },

  // ─────────────── BREAKFAST ───────────────

  {
    id: 63,
    name: "Texas",
    category: "Breakfast",
    type: "nonveg",
    img: "/Images/Texas.jpg",
    description: "Cheese omelette, 2 toasts, butter, jam",
    variants: [{ size: "Regular", price: 200 }]
  },
  {
    id: 64,
    name: "Chicago",
    category: "Breakfast",
    type: "nonveg",
    img: "/Images/Chicago.jpg",
    description: "Masala omelette, 2 toasts, butter, jam",
    variants: [{ size: "Regular", price: 180 }]
  },
  {
    id: 65,
    name: "New York",
    category: "Breakfast",
    type: "nonveg",
    img: "/Images/New-York.jpg",
    description: "Scrambled eggs, 2 toasts, butter, jam",
    variants: [{ size: "Regular", price: 210 }]
  },
  {
    id: 66,
    name: "Turkish Style Poached Egg",
    category: "Breakfast",
    type: "nonveg",
    img: "/Images/Turkish-Style-Poached-Egg.jpg",
    description: "Turkish-style spiced poached egg",
    variants: [{ size: "Regular", price: 230 }]
  },
  {
    id: 67,
    name: "Morning Fruitful Waffle",
    category: "Breakfast",
    type: "veg",
    img: "/Images/Morning-Fruitful-Waffle.jpg",
    description: "Fresh fruit waffle served in breakfast style",
    variants: [{ size: "Regular", price: 250 }]
  },
  {
    id: 68,
    name: "Egg Shakshuka (Baked)",
    category: "Breakfast",
    type: "nonveg",
    img: "/Images/Egg-Shakshuka-Baked.jpg",
    description: "Baked eggs in tomato-based shakshuka sauce",
    variants: [{ size: "Regular", price: 270 }]
  },
  {
    id: 69,
    name: "Egg Frittata",
    category: "Breakfast",
    type: "nonveg",
    img: "/Images/Egg-Frittata.jpg",
    description: "Baked egg frittata",
    variants: [{ size: "Regular", price: 300 }]
  },

  // ─────────────── VEG SANDWICHES ───────────────

  {
    id: 70,
    name: "Cheese Tomato Chilli Sandwich",
    category: "Sandwich (Veg)",
    type: "veg",
    img: "/Images/Cheese-Tomato-Chilli-Sandwich.jpg",
    description: "Cheese, tomato & green chilli sandwich",
    variants: [{ size: "Regular", price: 110 }]
  },
  {
    id: 71,
    name: "Go Green Cuts Sandwich",
    category: "Sandwich (Veg)",
    type: "veg",
    img: "/Images/Go-Green-Cuts-Sandwich.jpg",
    description: "Green veggie-filled sandwich",
    variants: [{ size: "Regular", price: 120 }]
  },
  {
    id: 72,
    name: "Tandoori Paneer Sandwich",
    category: "Sandwich (Veg)",
    type: "veg",
    img: "/Images/Tandoori-Paneer-Sandwich.jpg",
    description: "Sandwich stuffed with tandoori paneer",
    variants: [{ size: "Regular", price: 190 }]
  },
  {
    id: 73,
    name: "Veg Coleslaw Sandwich",
    category: "Sandwich (Veg)",
    type: "veg",
    img: "/Images/Veg-Coleslaw-Sandwich.jpg",
    description: "Mixed vegetable coleslaw sandwich",
    variants: [{ size: "Regular", price: 180 }]
  },
  {
    id: 74,
    name: "Crispy Cheese & Corn Sandwich",
    category: "Sandwich (Veg)",
    type: "veg",
    img: "/Images/Crispy-Cheese-Corn-Sandwich.jpg",
    description: "Cheese and sweet corn sandwich",
    variants: [{ size: "Regular", price: 210 }]
  },
  {
    id: 75,
    name: "Rifle 18 Sandwich",
    category: "Sandwich (Veg)",
    type: "veg",
    img: "/Images/Rifle-18-Sandwich.jpg",
    description: "Signature veg-loaded sandwich by Rifle 18",
    variants: [{ size: "Regular", price: 320 }]
  },
  {
    id: 76,
    name: "Triple Layer Sandwich",
    category: "Sandwich (Veg)",
    type: "veg",
    img: "/Images/Triple-Layer-Sandwich.jpg",
    description: "Triple-layered veg sandwich",
    variants: [{ size: "Regular", price: 250 }]
  },
  {
    id: 77,
    name: "Rifle 18 Signature Sandwich (Quad Core)",
    category: "Sandwich (Veg)",
    type: "veg",
    img: "/Images/Rifle-18-Signature-Sandwich-Quad-Core.jpg",
    description: "Quad-layered signature veg sandwich",
    variants: [{ size: "Regular", price: 280 }]
  },

  // ─────────────── NON-VEG SANDWICHES ───────────────

  {
    id: 78,
    name: "Country Road Chicken Sandwich",
    category: "Sandwich (Non-Veg)",
    type: "nonveg",
    img: "/Images/Country-Road-Chicken-Sandwich.jpg",
    description: "Chicken-filled sandwich in country-style seasoning",
    variants: [{ size: "Regular", price: 170 }]
  },
  {
    id: 79,
    name: "Barbeque Chicken Sandwich",
    category: "Sandwich (Non-Veg)",
    type: "nonveg",
    img: "/Images/Barbeque-Chicken-Sandwich.jpg",
    description: "BBQ-flavoured chicken sandwich",
    variants: [{ size: "Regular", price: 190 }]
  },
  {
    id: 80,
    name: "Tandoori Chicken Sandwich",
    category: "Sandwich (Non-Veg)",
    type: "nonveg",
    img: "/Images/Tandoori-Chicken-Sandwich.jpg",
    description: "Sandwich stuffed with tandoori chicken",
    variants: [{ size: "Regular", price: 200 }]
  },
  {
    id: 81,
    name: "Chicken & Egg Sandwich",
    category: "Sandwich (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Egg-Sandwich.jpg",
    description: "Chicken and egg combined sandwich",
    variants: [{ size: "Regular", price: 230 }]
  },
  {
    id: 82,
    name: "Fried Mutton Cubes Sandwich",
    category: "Sandwich (Non-Veg)",
    type: "nonveg",
    img: "/Images/Fried-Mutton-Cubes-Sandwich.jpg",
    description: "Sandwich filled with fried mutton cubes",
    variants: [{ size: "Regular", price: 250 }]
  },
  {
    id: 83,
    name: "Chicken Ham & Cheese Sandwich",
    category: "Sandwich (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Ham-Cheese-Sandwich.jpg",
    description: "Chicken ham with cheese sandwich",
    variants: [{ size: "Regular", price: 280 }]
  },
  {
    id: 84,
    name: "Triple Layer Chicken Volume Sandwich",
    category: "Sandwich (Non-Veg)",
    type: "nonveg",
    img: "/Images/Triple-Layer-Chicken-Volume-Sandwich.jpg",
    description: "Triple-layered chicken sandwich",
    variants: [{ size: "Regular", price: 300 }]
  },
  {
    id: 85,
    name: "Rifle 18 Sandwich",
    category: "Sandwich (Non-Veg)",
    type: "nonveg",
    img: "/Images/Rifle-18-Chicken-Sandwich.jpg",
    description: "Signature chicken sandwich variant",
    variants: [{ size: "Regular", price: 270 }]
  },
  {
    id: 86,
    name: "Rifle 18 Signature Sandwich (Quad Core)",
    category: "Sandwich (Non-Veg)",
    type: "nonveg",
    img: "/Images/Rifle-18-Signature-Chicken-Sandwich-Quad-Core.jpg",
    description: "Quad-layered chicken signature sandwich",
    variants: [{ size: "Regular", price: 310 }]
  },

  // ─────────── VEG BURGERS ───────────

  {
    id: 87,
    name: "Chilly Potato Burger",
    category: "Burger (Veg)",
    type: "veg",
    img: "/Images/Chilly-Potato-Burger.jpg",
    description: "Burger with spicy chilly potato patty",
    variants: [{ size: "Regular", price: 110 }]
  },
  {
    id: 88,
    name: "Potato Corn Cheese Burger",
    category: "Burger (Veg)",
    type: "veg",
    img: "/Images/Potato-Corn-Cheese-Burger.jpg",
    description: "Potato, corn & cheese-filled veg burger",
    variants: [{ size: "Regular", price: 140 }]
  },
  {
    id: 89,
    name: "Grilled Paneer Burger",
    category: "Burger (Veg)",
    type: "veg",
    img: "/Images/Grilled-Paneer-Burger.jpg",
    description: "Burger with grilled paneer patty",
    variants: [{ size: "Regular", price: 160 }]
  },
  {
    id: 90,
    name: "Crispy Paneer Burger",
    category: "Burger (Veg)",
    type: "veg",
    img: "/Images/Crispy-Paneer-Burger.jpg",
    description: "Crispy-coated paneer patty burger",
    variants: [{ size: "Regular", price: 170 }]
  },
  {
    id: 91,
    name: "Stuffed Cheese Burger",
    category: "Burger (Veg)",
    type: "veg",
    img: "/Images/Stuffed-Cheese-Burger.jpg",
    description: "Burger with a cheese-stuffed veg patty",
    variants: [{ size: "Regular", price: 200 }]
  },
  {
    id: 92,
    name: "Loaded Cheese Finger Burger",
    category: "Burger (Veg)",
    type: "veg",
    img: "/Images/Loaded-Cheese-Finger-Burger.jpg",
    description: "Burger loaded with cheese fingers",
    variants: [{ size: "Regular", price: 220 }]
  },
  {
    id: 93,
    name: "Rifle 18 Double Decker (Cheesy & Veggie Patty)",
    category: "Burger (Veg)",
    type: "veg",
    img: "/Images/Rifle-18-Double-Decker-Burger.jpg",
    description: "Double-layered veg burger with cheesy & veggie patties",
    variants: [{ size: "Regular", price: 210 }]
  },
  {
    id: 94,
    name: "Quatrro Schezwan Burger",
    category: "Burger (Veg)",
    type: "veg",
    img: "/Images/Quatrro-Schezwan-Burger.jpg",
    description: "Schezwan-style spicy veg burger",
    variants: [{ size: "Regular", price: 280 }]
  },

  // ─────────── NON-VEG BURGERS ───────────

  {
    id: 95,
    name: "Barbeque Chicken Burger",
    category: "Burger (Non-Veg)",
    type: "nonveg",
    img: "/Images/Barbeque-Chicken-Burger.jpg",
    description: "BBQ-flavoured chicken patty burger",
    variants: [{ size: "Regular", price: 160 }]
  },
  {
    id: 96,
    name: "English Style Chicken Burger",
    category: "Burger (Non-Veg)",
    type: "nonveg",
    img: "/Images/English-Style-Chicken-Burger.jpg",
    description: "Classic English-style chicken burger",
    variants: [{ size: "Regular", price: 180 }]
  },
  {
    id: 97,
    name: "Chicken Ham Burger",
    category: "Burger (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Ham-Burger.jpg",
    description: "Burger with chicken ham filling",
    variants: [{ size: "Regular", price: 210 }]
  },
  {
    id: 98,
    name: "Egg & Chicken Volume Burger",
    category: "Burger (Non-Veg)",
    type: "nonveg",
    img: "/Images/Egg-Chicken-Volume-Burger.jpg",
    description: "Egg and chicken combo patty burger",
    variants: [{ size: "Regular", price: 230 }]
  },
  {
    id: 99,
    name: "Chicken Cold Cuts Burger",
    category: "Burger (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Cold-Cuts-Burger.jpg",
    description: "Burger stuffed with chicken cold cut slices",
    variants: [{ size: "Regular", price: 260 }]
  },
  {
    id: 100,
    name: "Mutton Patty Harissa Sauce Burger",
    category: "Burger (Non-Veg)",
    type: "nonveg",
    img: "/Images/Mutton-Patty-Harissa-Sauce-Burger.jpg",
    description: "Mutton patty burger with harissa sauce",
    variants: [{ size: "Regular", price: 240 }]
  },
  {
    id: 101,
    name: "Chicken Schnitzel Cheesy Burger",
    category: "Burger (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Schnitzel-Cheesy-Burger.jpg",
    description: "Cheesy chicken schnitzel burger",
    variants: [{ size: "Regular", price: 270 }]
  },
  {
    id: 102,
    name: "Grilled Minced Chicken Burger",
    category: "Burger (Non-Veg)",
    type: "nonveg",
    img: "/Images/Grilled-Minced-Chicken-Burger.jpg",
    description: "Burger with grilled minced chicken patty",
    variants: [{ size: "Regular", price: 250 }]
  },
  {
    id: 103,
    name: "Rifle 18 Double Decker (Mutton Patty & Chicken Patty)",
    category: "Burger (Non-Veg)",
    type: "nonveg",
    img: "/Images/Rifle-18-Double-Decker-Mutton-Chicken-Burger.jpg",
    description: "Double decker burger with mutton & chicken patties",
    variants: [{ size: "Regular", price: 290 }]
  },
  {
    id: 104,
    name: "Fish Patty Burger",
    category: "Burger (Non-Veg)",
    type: "nonveg",
    img: "/Images/Fish-Patty-Burger.jpg",
    description: "Burger with crispy fish patty",
    variants: [{ size: "Regular", price: 310 }]
  },

  // ─────────── BREADS & MORE (VEG) ───────────

  {
    id: 105,
    name: "Garlic Bread",
    category: "Breads & More (Veg)",
    type: "veg",
    img: "/Images/Garlic-Bread.jpg",
    description: "Classic garlic-flavoured bread",
    variants: [{ size: "Regular", price: 100 }]
  },
  {
    id: 106,
    name: "Cheese Garlic Bread",
    category: "Breads & More (Veg)",
    type: "veg",
    img: "/Images/Cheese-Garlic-Bread.jpg",
    description: "Garlic bread topped with melted cheese",
    variants: [{ size: "Regular", price: 130 }]
  },
  {
    id: 107,
    name: "Exotic Garlic Bread",
    category: "Breads & More (Veg)",
    type: "veg",
    img: "/Images/Exotic-Garlic-Bread.jpg",
    description: "Garlic bread with exotic vegetable toppings",
    variants: [{ size: "Regular", price: 140 }]
  },
  {
    id: 108,
    name: "Chilli Corn Garlic Bread",
    category: "Breads & More (Veg)",
    type: "veg",
    img: "/Images/Chilli-Corn-Garlic-Bread.jpg",
    description: "Garlic bread topped with chilli & corn",
    variants: [{ size: "Regular", price: 150 }]
  },
  {
    id: 109,
    name: "Mushroom Garlic Bread",
    category: "Breads & More (Veg)",
    type: "veg",
    img: "/Images/Mushroom-Garlic-Bread.jpg",
    description: "Garlic bread topped with sautéed mushrooms",
    variants: [{ size: "Regular", price: 160 }]
  },
  {
    id: 110,
    name: "Stuffed Cheese Garlic Bread",
    category: "Breads & More (Veg)",
    type: "veg",
    img: "/Images/Stuffed-Cheese-Garlic-Bread.jpg",
    description: "Garlic bread stuffed with cheese filling",
    variants: [{ size: "Regular", price: 180 }]
  },
  {
    id: 111,
    name: "Classic Italian Bruschetta",
    category: "Breads & More (Veg)",
    type: "veg",
    img: "/Images/Classic-Italian-Bruschetta.jpg",
    description: "Italian-style toasted bread with toppings",
    variants: [{ size: "Regular", price: 200 }]
  },
  {
    id: 112,
    name: "Corn and Mushroom Crostini",
    category: "Breads & More (Veg)",
    type: "veg",
    img: "/Images/Corn-Mushroom-Crostini.jpg",
    description: "Crostini topped with corn & mushroom",
    variants: [{ size: "Regular", price: 220 }]
  },

  // ─────────── BREADS & MORE (NON-VEG) ───────────

  {
    id: 113,
    name: "Chicken Garlic Bread",
    category: "Breads & More (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Garlic-Bread.jpg",
    description: "Garlic bread topped with chicken",
    variants: [{ size: "Regular", price: 140 }]
  },
  {
    id: 114,
    name: "Hawaiian and Cheesy Chicken Garlic Bread",
    category: "Breads & More (Non-Veg)",
    type: "nonveg",
    img: "/Images/Hawaiian-Cheesy-Chicken-Garlic-Bread.jpg",
    description: "Chicken garlic bread with Hawaiian toppings & cheese",
    variants: [{ size: "Regular", price: 170 }]
  },
  {
    id: 115,
    name: "Smoked Salami Chicken Garlic Bread",
    category: "Breads & More (Non-Veg)",
    type: "nonveg",
    img: "/Images/Smoked-Salami-Chicken-Garlic-Bread.jpg",
    description: "Garlic bread topped with smoked chicken salami",
    variants: [{ size: "Regular", price: 180 }]
  },
  {
    id: 116,
    name: "Chicken Pepperoni Cuts Garlic Bread",
    category: "Breads & More (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Pepperoni-Cuts-Garlic-Bread.jpg",
    description: "Garlic bread with chicken pepperoni slices",
    variants: [{ size: "Regular", price: 200 }]
  },
  {
    id: 117,
    name: "Egg Ribbon & Chicken Garlic Bread",
    category: "Breads & More (Non-Veg)",
    type: "nonveg",
    img: "/Images/Egg-Ribbon-Chicken-Garlic-Bread.jpg",
    description: "Garlic bread topped with egg ribbon & chicken",
    variants: [{ size: "Regular", price: 220 }]
  },
  {
    id: 118,
    name: "Chicken Stuffed Garlic Bread",
    category: "Breads & More (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Stuffed-Garlic-Bread.jpg",
    description: "Garlic bread stuffed with chicken filling",
    variants: [{ size: "Regular", price: 230 }]
  },
  {
    id: 119,
    name: "Moroccan Pesto Chicken Bruschetta",
    category: "Breads & More (Non-Veg)",
    type: "nonveg",
    img: "/Images/Moroccan-Pesto-Chicken-Bruschetta.jpg",
    description: "Bruschetta topped with chicken & Moroccan pesto",
    variants: [{ size: "Regular", price: 240 }]
  },
  {
    id: 120,
    name: "Cheesy Jalapeno & Pepperoni Crostini",
    category: "Breads & More (Non-Veg)",
    type: "nonveg",
    img: "/Images/Cheesy-Jalapeno-Pepperoni-Crostini.jpg",
    description: "Crostini topped with cheese, jalapeno & pepperoni",
    variants: [{ size: "Regular", price: 260 }]
  },
  // ─────────── KATHI ROLL & GRILLED WRAPS (VEG) ───────────

  {
    id: 121,
    name: "Paneer Tikka Kathi Roll",
    category: "Kathi Roll & Grilled Wraps (Veg)",
    type: "veg",
    img: "/Images/Paneer-Tikka-Kathi-Roll.jpg",
    description: "Kathi roll stuffed with paneer tikka",
    variants: [{ size: "Regular", price: 180 }]
  },
  {
    id: 122,
    name: "Achari Paneer Tikka Kathi Roll",
    category: "Kathi Roll & Grilled Wraps (Veg)",
    type: "veg",
    img: "/Images/Achari-Paneer-Tikka-Kathi-Roll.jpg",
    description: "Tangy achari paneer tikka roll",
    variants: [{ size: "Regular", price: 200 }]
  },
  {
    id: 123,
    name: "Hara Bhara Paneer Tikka Kathi Roll",
    category: "Kathi Roll & Grilled Wraps (Veg)",
    type: "veg",
    img: "/Images/Hara-Bhara-Paneer-Tikka-Kathi-Roll.jpg",
    description: "Spinach & herb paneer tikka-filled roll",
    variants: [{ size: "Regular", price: 200 }]
  },
  {
    id: 124,
    name: "Malai Paneer Tikka Kathi Roll",
    category: "Kathi Roll & Grilled Wraps (Veg)",
    type: "veg",
    img: "/Images/Malai-Paneer-Tikka-Kathi-Roll.jpg",
    description: "Creamy malai paneer tikka wrap",
    variants: [{ size: "Regular", price: 210 }]
  },
  {
    id: 125,
    name: "Mexican Salsa Grilled Wrap",
    category: "Kathi Roll & Grilled Wraps (Veg)",
    type: "veg",
    img: "/Images/Mexican-Salsa-Grilled-Wrap.jpg",
    description: "Veg wrap filled with salsa-seasoned ingredients",
    variants: [{ size: "Regular", price: 210 }]
  },
  {
    id: 126,
    name: "Schezwan Spicy Cheese Grilled Wrap",
    category: "Kathi Roll & Grilled Wraps (Veg)",
    type: "veg",
    img: "/Images/Schezwan-Spicy-Cheese-Grilled-Wrap.jpg",
    description: "Spicy Schezwan cheesy veg wrap",
    variants: [{ size: "Regular", price: 230 }]
  },
  {
    id: 127,
    name: "Veg. Cheesy Quesadilla",
    category: "Kathi Roll & Grilled Wraps (Veg)",
    type: "veg",
    img: "/Images/Veg-Cheesy-Quesadilla.jpg",
    description: "Cheesy vegetarian quesadilla",
    variants: [{ size: "Regular", price: 250 }]
  },

  // ─────────── KATHI ROLL (NON-VEG) ───────────

  {
    id: 128,
    name: "Tandoori Chicken Tikka Kathi Roll",
    category: "Kathi Roll & Grilled Wraps (Non-Veg)",
    type: "nonveg",
    img: "/Images/Tandoori-Chicken-Tikka-Kathi-Roll.jpg",
    description: "Roll stuffed with tandoori chicken tikka",
    variants: [{ size: "Regular", price: 200 }]
  },
  {
    id: 129,
    name: "Achari Chicken Tikka Kathi Roll",
    category: "Kathi Roll & Grilled Wraps (Non-Veg)",
    type: "nonveg",
    img: "/Images/Achari-Chicken-Tikka-Kathi-Roll.jpg",
    description: "Tangy achari chicken tikka roll",
    variants: [{ size: "Regular", price: 210 }]
  },
  {
    id: 130,
    name: "Chicken Haryali Tikka Kathi Roll",
    category: "Kathi Roll & Grilled Wraps (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Haryali-Tikka-Kathi-Roll.jpg",
    description: "Chicken haryali tikka filled kathi roll",
    variants: [{ size: "Regular", price: 210 }]
  },
  {
    id: 131,
    name: "Afghani Chicken Tikka Kathi Roll",
    category: "Kathi Roll & Grilled Wraps (Non-Veg)",
    type: "nonveg",
    img: "/Images/Afghani-Chicken-Tikka-Kathi-Roll.jpg",
    description: "Mild Afghani-style chicken tikka roll",
    variants: [{ size: "Regular", price: 230 }]
  },
  {
    id: 132,
    name: "Double Egg Chicken Kathi Roll",
    category: "Kathi Roll & Grilled Wraps (Non-Veg)",
    type: "nonveg",
    img: "/Images/Double-Egg-Chicken-Kathi-Roll.jpg",
    description: "Chicken roll loaded with double egg",
    variants: [{ size: "Regular", price: 250 }]
  },
  {
    id: 133,
    name: "Egg Benedict Chicken Grilled Wrap",
    category: "Kathi Roll & Grilled Wraps (Non-Veg)",
    type: "nonveg",
    img: "/Images/Egg-Benedict-Chicken-Grilled-Wrap.jpg",
    description: "Chicken wrap infused with egg benedict style",
    variants: [{ size: "Regular", price: 260 }]
  },
  {
    id: 134,
    name: "Chicken Ham and Cheese Grilled Wrap",
    category: "Kathi Roll & Grilled Wraps (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Ham-Cheese-Grilled-Wrap.jpg",
    description: "Wrap stuffed with chicken ham & cheese",
    variants: [{ size: "Regular", price: 290 }]
  },
  {
    id: 135,
    name: "Loaded Chicken and Pepperoni Grilled Wrap",
    category: "Kathi Roll & Grilled Wraps (Non-Veg)",
    type: "nonveg",
    img: "/Images/Loaded-Chicken-Pepperoni-Grilled-Wrap.jpg",
    description: "Grilled wrap with chicken & pepperoni",
    variants: [{ size: "Regular", price: 310 }]
  },
  {
    id: 136,
    name: "Non Veg Cheesy Quesadilla",
    category: "Kathi Roll & Grilled Wraps (Non-Veg)",
    type: "nonveg",
    img: "/Images/Non-Veg-Cheesy-Quesadilla.jpg",
    description: "Cheesy non-veg quesadilla with chicken",
    variants: [{ size: "Regular", price: 330 }]
  },

  // ─────────── SIZZLERS (VEG) ───────────

  {
    id: 137,
    name: "Sizzler in Pesto Sauce",
    category: "Sizzlers (Veg)",
    type: "veg",
    img: "/Images/Sizzler-Pesto-Sauce.jpg",
    description: "Veg sizzler served with pesto sauce",
    variants: [{ size: "Regular", price: 430 }]
  },
  {
    id: 138,
    name: "Sizzler in Peri Peri Sauce",
    category: "Sizzlers (Veg)",
    type: "veg",
    img: "/Images/Sizzler-Peri-Peri-Sauce.jpg",
    description: "Veg sizzler topped with peri peri sauce",
    variants: [{ size: "Regular", price: 450 }]
  },
  {
    id: 139,
    name: "Sizzler in Mushroom Sauce",
    category: "Sizzlers (Veg)",
    type: "veg",
    img: "/Images/Sizzler-Mushroom-Sauce.jpg",
    description: "Veg sizzler with creamy mushroom sauce",
    variants: [{ size: "Regular", price: 470 }]
  },
  {
    id: 140,
    name: "Sizzler in Orange Mustard Sauce",
    category: "Sizzlers (Veg)",
    type: "veg",
    img: "/Images/Sizzler-Orange-Mustard-Sauce.jpg",
    description: "Veg sizzler with orange–mustard fusion sauce",
    variants: [{ size: "Regular", price: 480 }]
  },
  {
    id: 141,
    name: "Sizzler in Stir Fry Teriyaki Sauce",
    category: "Sizzlers (Veg)",
    type: "veg",
    img: "/Images/Sizzler-Stir-Fry-Teriyaki-Sauce.jpg",
    description: "Veg sizzler tossed in teriyaki stir-fry sauce",
    variants: [{ size: "Regular", price: 500 }]
  },
  {
    id: 142,
    name: "Sizzler in Florentine Sauce",
    category: "Sizzlers (Veg)",
    type: "veg",
    img: "/Images/Sizzler-Florentine-Sauce.jpg",
    description: "Veg sizzler with Florentine-style creamy sauce",
    variants: [{ size: "Regular", price: 460 }]
  },
  {
    id: 143,
    name: "Sizzler in Schezwan Spicy Sauce",
    category: "Sizzlers (Veg)",
    type: "veg",
    img: "/Images/Sizzler-Schezwan-Spicy-Sauce.jpg",
    description: "Veg sizzler with spicy Schezwan sauce",
    variants: [{ size: "Regular", price: 470 }]
  },
  {
    id: 144,
    name: "Sizzler in Lime & Parsley Sauce",
    category: "Sizzlers (Veg)",
    type: "veg",
    img: "/Images/Sizzler-Lime-Parsley-Sauce.jpg",
    description: "Veg sizzler topped with lime & parsley sauce",
    variants: [{ size: "Regular", price: 480 }]
  },
  {
    id: 145,
    name: "Sizzler in Hoisin Sesame Sauce",
    category: "Sizzlers (Veg)",
    type: "veg",
    img: "/Images/Sizzler-Hoisin-Sesame-Sauce.jpg",
    description: "Veg sizzler tossed in hoisin–sesame sauce",
    variants: [{ size: "Regular", price: 500 }]
  },
  {
    id: 146,
    name: "Sizzler in Brown Hash-Honey Sauce",
    category: "Sizzlers (Veg)",
    type: "veg",
    img: "/Images/Sizzler-Brown-Hash-Honey-Sauce.jpg",
    description: "Veg sizzler in sweet-spicy hash-honey glaze",
    variants: [{ size: "Regular", price: 540 }]
  },

  // ─────────── SIZZLERS (NON-VEG) ───────────

  {
    id: 147,
    name: "Chicken Sizzler in Pesto Sauce",
    category: "Sizzlers (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Sizzler-Pesto-Sauce.jpg",
    description: "Chicken sizzler served with pesto sauce",
    variants: [{ size: "Regular", price: 430 }]
  },
  {
    id: 148,
    name: "Chicken Sizzler in Peri Peri Sauce",
    category: "Sizzlers (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Sizzler-Peri-Peri-Sauce.jpg",
    description: "Chicken sizzler topped with peri peri sauce",
    variants: [{ size: "Regular", price: 450 }]
  },
  {
    id: 149,
    name: "Chicken Sizzler in Mushroom Sauce",
    category: "Sizzlers (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Sizzler-Mushroom-Sauce.jpg",
    description: "Chicken sizzler served with creamy mushroom sauce",
    variants: [{ size: "Regular", price: 470 }]
  },
  {
    id: 150,
    name: "Chicken Sizzler in Orange Mustard Sauce",
    category: "Sizzlers (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Sizzler-Orange-Mustard-Sauce.jpg",
    description: "Chicken sizzler with orange–mustard sauce",
    variants: [{ size: "Regular", price: 480 }]
  },
  {
    id: 151,
    name: "Chicken Sizzler in Stir Fry Teriyaki Sauce",
    category: "Sizzlers (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Sizzler-Stir-Fry-Teriyaki-Sauce.jpg",
    description: "Chicken sizzler tossed in teriyaki stir-fry sauce",
    variants: [{ size: "Regular", price: 500 }]
  },
  {
    id: 152,
    name: "Chicken Sizzler in Florentine Sauce",
    category: "Sizzlers (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Sizzler-Florentine-Sauce.jpg",
    description: "Chicken sizzler in Florentine-style sauce",
    variants: [{ size: "Regular", price: 460 }]
  },
  {
    id: 153,
    name: "Chicken Sizzler in Schezwan Spicy Sauce",
    category: "Sizzlers (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Sizzler-Schezwan-Spicy-Sauce.jpg",
    description: "Chicken sizzler topped with spicy Schezwan sauce",
    variants: [{ size: "Regular", price: 470 }]
  },
  {
    id: 154,
    name: "Chicken Sizzler in Lime & Parsley Sauce",
    category: "Sizzlers (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Sizzler-Lime-Parsley-Sauce.jpg",
    description: "Chicken sizzler with lime and parsley dressing",
    variants: [{ size: "Regular", price: 480 }]
  },
  {
    id: 155,
    name: "Chicken Sizzler in Hoisin Sesame Sauce",
    category: "Sizzlers (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Sizzler-Hoisin-Sesame-Sauce.jpg",
    description: "Chicken sizzler tossed in hoisin–sesame sauce",
    variants: [{ size: "Regular", price: 500 }]
  },
  {
    id: 156,
    name: "Chicken Sizzler in Brown Hash-Honey Sauce",
    category: "Sizzlers (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Sizzler-Brown-Hash-Honey-Sauce.jpg",
    description: "Chicken sizzler coated in sweet-spicy hash-honey glaze",
    variants: [{ size: "Regular", price: 540 }]
  },
  {
    id: 157,
    name: "Plain Nachos With Salsa",
    category: "Nachos (Veg)",
    type: "veg",
    img: "/Images/Plain-Nachos-With-Salsa.jpg",
    description: "Classic nachos served with salsa",
    variants: [{ size: "Regular", price: 130 }]
  },
  {
    id: 158,
    name: "Veg Sauteed Nachos",
    category: "Nachos (Veg)",
    type: "veg",
    img: "/Images/Veg-Sauteed-Nachos.jpg",
    description: "Nachos topped with sautéed vegetables",
    variants: [{ size: "Regular", price: 140 }]
  },
  {
    id: 159,
    name: "Double Shaded Nachos (Nachos & Fries)",
    category: "Nachos (Veg)",
    type: "veg",
    img: "/Images/Double-Shaded-Nachos.jpg",
    description: "Combination of fries and nachos",
    variants: [{ size: "Regular", price: 170 }]
  },
  {
    id: 160,
    name: "Chilli & Cheesy Baked Nachos",
    category: "Nachos (Veg)",
    type: "veg",
    img: "/Images/Chilli-Cheesy-Baked-Nachos.jpg",
    description: "Baked nachos with chilli and cheese",
    variants: [{ size: "Regular", price: 200 }]
  },
  {
    id: 161,
    name: "Rifle-18 Nachos Baked (One Pot Exotic Veg. Baked)",
    category: "Nachos (Veg)",
    type: "veg",
    img: "/Images/Rifle-18-Nachos-Baked-Exotic-Veg.jpg",
    description: "One-pot baked nachos with exotic veggies",
    variants: [{ size: "Regular", price: 230 }]
  },
  {
    id: 162,
    name: "Chicken Tossed Nachos",
    category: "Nachos (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Tossed-Nachos.jpg",
    description: "Nachos tossed with chicken",
    variants: [{ size: "Regular", price: 170 }]
  },
  {
    id: 163,
    name: "Salami Ribbon Nachos",
    category: "Nachos (Non-Veg)",
    type: "nonveg",
    img: "/Images/Salami-Ribbon-Nachos.jpg",
    description: "Nachos topped with chicken salami ribbons",
    variants: [{ size: "Regular", price: 190 }]
  },
  {
    id: 164,
    name: "Ham & Mutton Chops Nachos",
    category: "Nachos (Non-Veg)",
    type: "nonveg",
    img: "/Images/Ham-Mutton-Chops-Nachos.jpg",
    description: "Nachos topped with ham & mutton pieces",
    variants: [{ size: "Regular", price: 210 }]
  },
  {
    id: 165,
    name: "Baked Pepperoni & Chicken Nachos",
    category: "Nachos (Non-Veg)",
    type: "nonveg",
    img: "/Images/Baked-Pepperoni-Chicken-Nachos.jpg",
    description: "Baked nachos with pepperoni & chicken",
    variants: [{ size: "Regular", price: 230 }]
  },
  {
    id: 166,
    name: "Rifle-18 (One Pot Chicken Baked Nachos)",
    category: "Nachos (Non-Veg)",
    type: "nonveg",
    img: "/Images/Rifle-18-Chicken-Baked-Nachos.jpg",
    description: "One-pot baked chicken nachos",
    variants: [{ size: "Regular", price: 270 }]
  },
  {
    id: 167,
    name: "Al-Fungi Pasta (White Sauce)",
    category: "Pan & Baked Pasta (Veg)",
    type: "veg",
    img: "/Images/Al-Fungi-Pasta-White-Sauce.jpg",
    description: "White sauce pasta with mushrooms",
    variants: [
      { size: "Pan", price: 180 },
      { size: "Baked", price: 260 }
    ]
  },
  {
    id: 168,
    name: "Pan Toasted Al-Fredo (White Sauce)",
    category: "Pan & Baked Pasta (Veg)",
    type: "veg",
    img: "/Images/Pan-Toasted-Al-Fredo-White-Sauce.jpg",
    description: "Classic Alfredo white sauce pasta",
    variants: [
      { size: "Pan", price: 200 },
      { size: "Baked", price: 280 }
    ]
  },
  {
    id: 169,
    name: "Napolean Pasta (Red Sauce)",
    category: "Pan & Baked Pasta (Veg)",
    type: "veg",
    img: "/Images/Napolean-Pasta-Red-Sauce.jpg",
    description: "Red sauce pasta in Napolean style",
    variants: [
      { size: "Pan", price: 170 },
      { size: "Baked", price: 250 }
    ]
  },
  {
    id: 170,
    name: "Tandoori Pasta (Smoked Tandoori Sauce)",
    category: "Pan & Baked Pasta (Veg)",
    type: "veg",
    img: "/Images/Tandoori-Pasta-Smoked-Tandoori-Sauce.jpg",
    description: "Pasta cooked in smoky tandoori sauce",
    variants: [
      { size: "Pan", price: 190 },
      { size: "Baked", price: 270 }
    ]
  },
  {
    id: 171,
    name: "Rifle-18 Pasta (Twin Sauce)",
    category: "Pan & Baked Pasta (Veg)",
    type: "veg",
    img: "/Images/Rifle-18-Pasta-Twin-Sauce.jpg",
    description: "Pasta served with a blend of two sauces",
    variants: [
      { size: "Pan", price: 210 },
      { size: "Baked", price: 290 }
    ]
  },
  {
    id: 172,
    name: "Stir-Fry Pesto Spinach & Corn (Pesto Sauce)",
    category: "Pan & Baked Pasta (Veg)",
    type: "veg",
    img: "/Images/Stir-Fry-Pesto-Spinach-Corn-Pasta.jpg",
    description: "Pesto pasta with spinach & corn",
    variants: [
      { size: "Pan", price: 220 },
      { size: "Baked", price: 300 }
    ]
  },
  {
    id: 173,
    name: "Buffalo Sauce",
    category: "Pan & Baked Pasta (Veg)",
    type: "veg",
    img: "/Images/Buffalo-Sauce-Pasta.jpg",
    description: "Extremely spicy red buffalo sauce pasta",
    variants: [
      { size: "Pan", price: 240 },
      { size: "Baked", price: 320 }
    ]
  },
  {
    id: 174,
    name: "Cacio-e-Pepe",
    category: "Pan & Baked Pasta (Veg)",
    type: "veg",
    img: "/Images/Cacio-e-Pepe-Pasta.jpg",
    description: "Black pepper & cheese sauce pasta",
    variants: [
      { size: "Pan", price: 230 },
      { size: "Baked", price: 310 }
    ]
  },
  {
    id: 175,
    name: "Salsa Di Noci",
    category: "Pan & Baked Pasta (Veg)",
    type: "veg",
    img: "/Images/Salsa-Di-Noci-Pasta.jpg",
    description: "Salsa & red wine sauce pasta",
    variants: [
      { size: "Pan", price: 250 },
      { size: "Baked", price: 330 }
    ]
  },
  {
    id: 176,
    name: "Lemon Butter Sauce",
    category: "Pan & Baked Pasta (Veg)",
    type: "veg",
    img: "/Images/Lemon-Butter-Sauce-Pasta.jpg",
    description: "Pasta in tangy lemon butter white sauce",
    variants: [
      { size: "Pan", price: 270 },
      { size: "Baked", price: 350 }
    ]
  },
  {
    id: 177,
    name: "Creamy Chicken Pasta (White Sauce)",
    category: "Pan & Baked Pasta (Non-Veg)",
    type: "nonveg",
    img: "/Images/Creamy-Chicken-Pasta-White-Sauce.jpg",
    description: "Chicken pasta cooked in creamy white sauce",
    variants: [
      { size: "Pan", price: 220 },
      { size: "Baked", price: 300 }
    ]
  },

  {
    id: 178,
    name: "Tandoori Chicken Pasta (Red Sauce)",
    category: "Pan & Baked Pasta (Non-Veg)",
    type: "nonveg",
    img: "/Images/Tandoori-Chicken-Pasta-Red-Sauce.jpg",
    description: "Pasta cooked in tandoori-style red sauce with chicken",
    variants: [
      { size: "Pan", price: 230 },
      { size: "Baked", price: 310 }
    ]
  },
  {
    id: 179,
    name: "American Chicken Pasta (BBQ Sauce)",
    category: "Pan & Baked Pasta (Non-Veg)",
    type: "nonveg",
    img: "/Images/American-Chicken-Pasta-BBQ-Sauce.jpg",
    description: "Chicken pasta tossed in BBQ sauce",
    variants: [
      { size: "Pan", price: 230 },
      { size: "Baked", price: 310 }
    ]
  },
  {
    id: 180,
    name: "Al-Fredo Chicken Pasta (White Sauce)",
    category: "Pan & Baked Pasta (Non-Veg)",
    type: "nonveg",
    img: "/Images/Al-Fredo-Chicken-Pasta-White-Sauce.jpg",
    description: "Classic Alfredo white sauce pasta with chicken",
    variants: [
      { size: "Pan", price: 230 },
      { size: "Baked", price: 310 }
    ]
  },
  {
    id: 181,
    name: "Rifle-18 Chicken Pasta (Twin Sauce)",
    category: "Pan & Baked Pasta (Non-Veg)",
    type: "nonveg",
    img: "/Images/Rifle-18-Chicken-Pasta-Twin-Sauce.jpg",
    description: "Chicken pasta with a blend of two sauces",
    variants: [
      { size: "Pan", price: 240 },
      { size: "Baked", price: 320 }
    ]
  },
  {
    id: 182,
    name: "Stir-Fry Pesto Chicken (Pesto Sauce)",
    category: "Pan & Baked Pasta (Non-Veg)",
    type: "nonveg",
    img: "/Images/Stir-Fry-Pesto-Chicken-Pasta.jpg",
    description: "Chicken pasta tossed in pesto sauce",
    variants: [
      { size: "Pan", price: 260 },
      { size: "Baked", price: 340 }
    ]
  },
  {
    id: 183,
    name: "Buffalo Sauce with Mutton & Chicken",
    category: "Pan & Baked Pasta (Non-Veg)",
    type: "nonveg",
    img: "/Images/Buffalo-Sauce-Mutton-Chicken-Pasta.jpg",
    description: "Extremely spicy buffalo sauce pasta with chicken & mutton",
    variants: [
      { size: "Pan", price: 280 },
      { size: "Baked", price: 360 }
    ]
  },
  {
    id: 184,
    name: "Cacio-e-Pepe Chicken Ham and Pineapple",
    category: "Pan & Baked Pasta (Non-Veg)",
    type: "nonveg",
    img: "/Images/Cacio-e-Pepe-Chicken-Ham-Pineapple-Pasta.jpg",
    description: "Black pepper cheesy sauce pasta with chicken ham & pineapple",
    variants: [
      { size: "Pan", price: 270 },
      { size: "Baked", price: 350 }
    ]
  },
  {
    id: 185,
    name: "Salsa Di Noci with Sausages and Chicken",
    category: "Pan & Baked Pasta (Non-Veg)",
    type: "nonveg",
    img: "/Images/Salsa-Di-Noci-Sausages-Chicken-Pasta.jpg",
    description: "Spicy salsa pasta with sausages & chicken",
    variants: [
      { size: "Pan", price: 290 },
      { size: "Baked", price: 370 }
    ]
  },
  {
    id: 186,
    name: "Lemon & Butter Sauce with Chicken Ham & Sausages",
    category: "Pan & Baked Pasta (Non-Veg)",
    type: "nonveg",
    img: "/Images/Lemon-Butter-Sauce-Chicken-Ham-Sausages-Pasta.jpg",
    description: "Lemon butter sauce pasta with chicken ham & sausages",
    variants: [
      { size: "Pan", price: 310 },
      { size: "Baked", price: 390 }
    ]
  },
  {
    id: 187,
    name: "One Pot Cold Cuts Chicken in Hash Brown Sauce",
    category: "Pan & Baked Pasta (Non-Veg)",
    type: "nonveg",
    img: "/Images/Cold-Cuts-Chicken-Hash-Brown-Sauce-Pasta.jpg",
    description: "Pasta with pepperoni, sausages, ham & chicken cubes",
    variants: [
      { size: "Pan", price: 350 },
      { size: "Baked", price: 430 }
    ]
  },
  {
    id: 188,
    name: "Tandoori Paneer Salad (Hot)",
    category: "Salads (Veg)",
    type: "veg",
    img: "/Images/Tandoori-Paneer-Salad-Hot.jpg",
    description: "Hot salad with tandoori paneer",
    variants: [{ size: "Regular", price: 230 }]
  },
  {
    id: 189,
    name: "Greek Salad (Cold)",
    category: "Salads (Veg)",
    type: "veg",
    img: "/Images/Greek-Salad-Cold.jpg",
    description: "Classic cold Greek vegetable salad",
    variants: [{ size: "Regular", price: 240 }]
  },
  {
    id: 190,
    name: "Russian Salad (Cold)",
    category: "Salads (Veg)",
    type: "veg",
    img: "/Images/Russian-Salad-Cold.jpg",
    description: "Cold creamy Russian veg salad",
    variants: [{ size: "Regular", price: 250 }]
  },
  {
    id: 191,
    name: "Sumac Dressing Middle Eastern Salad (Cold)",
    category: "Salads (Veg)",
    type: "veg",
    img: "/Images/Sumac-Dressing-Middle-Eastern-Salad-Cold.jpg",
    description: "Middle Eastern-style salad with sumac dressing",
    variants: [{ size: "Regular", price: 270 }]
  },
  {
    id: 192,
    name: "Thai Style Kimchi Spicy Salad (Cold)",
    category: "Salads (Veg)",
    type: "veg",
    img: "/Images/Thai-Style-Kimchi-Spicy-Salad-Cold.jpg",
    description: "Spicy Thai-style kimchi salad",
    variants: [{ size: "Regular", price: 290 }]
  },
  {
    id: 193,
    name: "Stir-Fry Veggies Pesto Salad (Hot)",
    category: "Salads (Veg)",
    type: "veg",
    img: "/Images/Stir-Fry-Veggies-Pesto-Salad-Hot.jpg",
    description: "Hot stir-fry vegetables tossed in pesto",
    variants: [{ size: "Regular", price: 280 }]
  },
  {
    id: 194,
    name: "Caesar Salad (Cold)",
    category: "Salads (Veg)",
    type: "veg",
    img: "/Images/Caesar-Salad-Cold.jpg",
    description: "Classic Caesar salad (veg)",
    variants: [{ size: "Regular", price: 300 }]
  },
  {
    id: 195,
    name: "Tandoori Chicken Salad (Hot)",
    category: "Salads (Non-Veg)",
    type: "nonveg",
    img: "/Images/Tandoori-Chicken-Salad-Hot.jpg",
    description: "Hot salad with tandoori chicken",
    variants: [{ size: "Regular", price: 240 }]
  },
  {
    id: 196,
    name: "Peri Peri Chicken Salad (Hot)",
    category: "Salads (Non-Veg)",
    type: "nonveg",
    img: "/Images/Peri-Peri-Chicken-Salad-Hot.jpg",
    description: "Hot salad tossed with peri peri chicken",
    variants: [{ size: "Regular", price: 250 }]
  },
  {
    id: 197,
    name: "Hawaiian Chicken Salad (Cold)",
    category: "Salads (Non-Veg)",
    type: "nonveg",
    img: "/Images/Hawaiian-Chicken-Salad-Cold.jpg",
    description: "Cold salad with chicken & fruits",
    variants: [{ size: "Regular", price: 260 }]
  },
  {
    id: 198,
    name: "Pesto & Ham Cuts Salad (Hot)",
    category: "Salads (Non-Veg)",
    type: "nonveg",
    img: "/Images/Pesto-Ham-Cuts-Salad-Hot.jpg",
    description: "Hot pesto salad with chicken & ham",
    variants: [{ size: "Regular", price: 270 }]
  },
  {
    id: 199,
    name: "Tom Yam Chicken & Egg Salad (Spicy)",
    category: "Salads (Non-Veg)",
    type: "nonveg",
    img: "/Images/Tom-Yam-Chicken-Egg-Salad-Spicy.jpg",
    description: "Spicy Thai Tom Yam style chicken & egg salad",
    variants: [{ size: "Regular", price: 290 }]
  },
  {
    id: 200,
    name: "Chicken Tzatziki (Yogurt Salad)",
    category: "Salads (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Tzatziki-Yogurt-Salad.jpg",
    description: "Chicken salad served with TZATZIKI yogurt",
    variants: [{ size: "Regular", price: 280 }]
  },
  {
    id: 201,
    name: "Chicken Cobb Salad",
    category: "Salads (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Cobb-Salad.jpg",
    description: "Hot salad with ham, pepperoni, chicken & sausages",
    variants: [{ size: "Regular", price: 330 }]
  },
  {
    id: 202,
    name: "Chilli Cottage Stuffed Steak",
    category: "Main Course (Veg)",
    type: "veg",
    img: "/Images/Chilli-Cottage-Stuffed-Steak.jpg",
    description: "Stuffed cottage cheese steak in chilli flavour",
    variants: [{ size: "Regular", price: 310 }]
  },
  {
    id: 203,
    name: "Baked Vegetable Au-Gratin with Herb Rice",
    category: "Main Course (Veg)",
    type: "veg",
    img: "/Images/Baked-Vegetable-Au-Gratin-Herb-Rice.jpg",
    description: "Baked vegetable au-gratin with herb rice",
    variants: [{ size: "Regular", price: 340 }]
  },
  {
    id: 204,
    name: "Mushroom Goulash in Spicy Buffalo Sauce",
    category: "Main Course (Veg)",
    type: "veg",
    img: "/Images/Mushroom-Goulash-Spicy-Buffalo-Sauce.jpg",
    description: "Mushroom goulash cooked in spicy buffalo sauce",
    variants: [{ size: "Regular", price: 300 }]
  },
  {
    id: 205,
    name: "Sauteed Corn & Mushroom Baked With Mexican Rice",
    category: "Main Course (Veg)",
    type: "veg",
    img: "/Images/Sauteed-Corn-Mushroom-Baked-Mexican-Rice.jpg",
    description: "Corn & mushroom baked dish with Mexican rice",
    variants: [{ size: "Regular", price: 360 }]
  },
  {
    id: 206,
    name: "Classic Italian Baked Tomato",
    category: "Main Course (Veg)",
    type: "veg",
    img: "/Images/Classic-Italian-Baked-Tomato.jpg",
    description: "Italian-style baked tomato dish",
    variants: [{ size: "Regular", price: 330 }]
  },
  {
    id: 207,
    name: "Cottage Cheese Cubes in Katsu Curry (Coconut) with Lemon Rice",
    category: "Main Course (Veg)",
    type: "veg",
    img: "/Images/Cottage-Cheese-Katsu-Curry-Lemon-Rice.jpg",
    description: "Paneer cubes in coconut katsu curry with lemon rice",
    variants: [{ size: "Regular", price: 370 }]
  },
  {
    id: 208,
    name: "Baked Canneloni in Florentine Sauce",
    category: "Main Course (Veg)",
    type: "veg",
    img: "/Images/Baked-Canneloni-Florentine-Sauce.jpg",
    description: "Baked cannelloni pasta in Florentine sauce",
    variants: [{ size: "Regular", price: 380 }]
  },
  {
    id: 209,
    name: "Middle Eastern Grilled Paneer With Pita Bread",
    category: "Main Course (Veg)",
    type: "veg",
    img: "/Images/Middle-Eastern-Grilled-Paneer-Pita.jpg",
    description: "Middle Eastern-style grilled paneer with pita",
    variants: [{ size: "Regular", price: 380 }]
  },
  {
    id: 210,
    name: "Veg Lasagne (Baked)",
    category: "Main Course (Veg)",
    type: "veg",
    img: "/Images/Veg-Lasagne-Baked.jpg",
    description: "Classic baked vegetarian lasagne",
    variants: [{ size: "Regular", price: 290 }]
  },
  {
    id: 211,
    name: "Loaded Cheese Filled Lasagne (Baked)",
    category: "Main Course (Veg)",
    type: "veg",
    img: "/Images/Loaded-Cheese-Filled-Lasagne-Baked.jpg",
    description: "Extra cheesy baked veg lasagne",
    variants: [{ size: "Regular", price: 350 }]
  },
  {
    id: 212,
    name: "Exotic High Protein Saute in Lemon Butter Sauce with Herb Rice",
    category: "Main Course (Veg)",
    type: "veg",
    img: "/Images/High-Protein-Saute-Lemon-Butter-Herb-Rice.jpg",
    description: "High-protein veg sauté with herb rice",
    variants: [{ size: "Regular", price: 410 }]
  },
  {
    id: 213,
    name: "Grilled Paneer Roulade with Cheese Jalapeno Sauce",
    category: "Main Course (Veg)",
    type: "veg",
    img: "/Images/Grilled-Paneer-Roulade-Cheese-Jalapeno-Sauce.jpg",
    description: "Paneer roulade with jalapeno cheese sauce",
    variants: [{ size: "Regular", price: 430 }]
  },
  {
    id: 214,
    name: "Chicken Steak in Peri Peri Sauce with Herb Rice",
    category: "Main Course (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Steak-Peri-Peri-Herb-Rice.jpg",
    description: "Chicken steak with peri peri sauce & herb rice",
    variants: [{ size: "Regular", price: 330 }]
  },
  {
    id: 215,
    name: "Grilled Chicken in Americano Sauce with Mexican Rice",
    category: "Main Course (Non-Veg)",
    type: "nonveg",
    img: "/Images/Grilled-Chicken-Americano-Mexican-Rice.jpg",
    description: "Grilled chicken in Americano sauce with Mexican rice",
    variants: [{ size: "Regular", price: 340 }]
  },
  {
    id: 216,
    name: "Grilled Chicken in Sriracha Sauce with Fried Rice",
    category: "Main Course (Non-Veg)",
    type: "nonveg",
    img: "/Images/Grilled-Chicken-Sriracha-Fried-Rice.jpg",
    description: "Grilled chicken coated in Sriracha sauce, served with fried rice",
    variants: [{ size: "Regular", price: 360 }]
  },
  {
    id: 217,
    name: "Chicken Au-Gratin (Baked) with Corn & Chilli Rice",
    category: "Main Course (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Au-Gratin-Corn-Chilli-Rice.jpg",
    description: "Baked chicken au-gratin with corn & chilli rice",
    variants: [{ size: "Regular", price: 380 }]
  },
  {
    id: 218,
    name: "Chicken Kiev with Mushroom Rice",
    category: "Main Course (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Kiev-Mushroom-Rice.jpg",
    description: "Stuffed chicken Kiev with mushroom rice",
    variants: [{ size: "Regular", price: 410 }]
  },
  {
    id: 219,
    name: "Chicken Roulade with Exotic Veggies with Herb Rice",
    category: "Main Course (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Roulade-Exotic-Veggies-Herb-Rice.jpg",
    description: "Chicken roulade with exotic vegetables & herb rice",
    variants: [{ size: "Regular", price: 430 }]
  },
  {
    id: 220,
    name: "Chicken Souvlaki Sticks with Pita Bread",
    category: "Main Course (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Souvlaki-Pita-Bread.jpg",
    description: "Greek-style chicken souvlaki with pita bread",
    variants: [{ size: "Regular", price: 440 }]
  },
  {
    id: 221,
    name: "Non-Veg Canneloni in Florentine Sauce",
    category: "Main Course (Non-Veg)",
    type: "nonveg",
    img: "/Images/Non-Veg-Canneloni-Florentine-Sauce.jpg",
    description: "Baked non-veg cannelloni in Florentine sauce",
    variants: [{ size: "Regular", price: 330 }]
  },
  {
    id: 222,
    name: "Chicken and Ham Filled Lasagne",
    category: "Main Course (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Ham-Filled-Lasagne.jpg",
    description: "Lasagne filled with chicken and ham",
    variants: [{ size: "Regular", price: 360 }]
  },
  {
    id: 223,
    name: "Cheesy Pepperoni & Chicken Chunks Lasagne",
    category: "Main Course (Non-Veg)",
    type: "nonveg",
    img: "/Images/Cheesy-Pepperoni-Chicken-Chunks-Lasagne.jpg",
    description: "Lasagne with cheese, pepperoni & chicken chunks",
    variants: [{ size: "Regular", price: 390 }]
  },
  {
    id: 224,
    name: "Exotic Cold Cuts Sauteed Chicken in Lemon Butter Sauce with Herb Rice",
    category: "Main Course (Non-Veg)",
    type: "nonveg",
    img: "/Images/Cold-Cuts-Chicken-Lemon-Butter-Herb-Rice.jpg",
    description: "Sauteed chicken with assorted cold cuts in lemon butter sauce",
    variants: [{ size: "Regular", price: 430 }]
  },
  {
    id: 225,
    name: "Glock Chowmein",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Glock-Chowmein.jpg",
    description: "Classic veg chowmein",
    variants: [{ size: "Regular", price: 140 }]
  },
  {
    id: 226,
    name: "Glock Hakka Chowmein",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Glock-Hakka-Chowmein.jpg",
    description: "Veg Hakka-style chowmein",
    variants: [{ size: "Regular", price: 160 }]
  },
  {
    id: 227,
    name: "Chilli Garlic Noodles",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Chilli-Garlic-Noodles.jpg",
    description: "Noodles tossed in chilli & garlic",
    variants: [{ size: "Regular", price: 180 }]
  },
  {
    id: 228,
    name: "Burnt Garlic Hakka Noodles",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Burnt-Garlic-Hakka-Noodles.jpg",
    description: "Hakka noodles with burnt garlic",
    variants: [{ size: "Regular", price: 190 }]
  },
  {
    id: 229,
    name: "Schezwan Style Hot Garlic Noodles",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Schezwan-Hot-Garlic-Noodles.jpg",
    description: "Spicy Schezwan-style hot garlic noodles",
    variants: [{ size: "Regular", price: 200 }]
  },
  {
    id: 230,
    name: "Pad Thai Peanuts Spicy Noodles in Hoisin Sauce",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Pad-Thai-Peanuts-Spicy-Noodles-Hoisin.jpg",
    description: "Thai-style noodles with peanuts in hoisin sauce",
    variants: [{ size: "Regular", price: 230 }]
  },
  {
    id: 231,
    name: "Rainbow Style Exotic Veg & Cheese Ribbon Noodles in Spicy Teriyaki Sauce",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Rainbow-Exotic-Veg-Cheese-Ribbon-Noodles-Teriyaki.jpg",
    description: "Colorful exotic veg noodles in teriyaki sauce",
    variants: [{ size: "Regular", price: 250 }]
  },
  {
    id: 232,
    name: "Chinese Chopsuey",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Chinese-Chopsuey.jpg",
    description: "Crispy noodles topped with Chinese gravy",
    variants: [{ size: "Regular", price: 210 }]
  },
  {
    id: 233,
    name: "Veg Fingers in Chilli Garlic Sauce",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Veg-Fingers-Chilli-Garlic-Sauce.jpg",
    description: "Veg fingers tossed in chilli garlic sauce",
    variants: [{ size: "Regular", price: 220 }]
  },
  {
    id: 234,
    name: "Extremely Spicy Cheesy Kung Pao with Plain Noodles",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Cheesy-Kung-Pao-With-Noodles.jpg",
    description: "Very spicy cheesy Kung Pao with noodles",
    variants: [{ size: "Regular", price: 280 }]
  },
  {
    id: 235,
    name: "Thai Short Veg Spring Roll",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Thai-Short-Veg-Spring-Roll.jpg",
    description: "Thai-style veg spring rolls",
    variants: [{ size: "Regular", price: 230 }]
  },
  {
    id: 236,
    name: "Vietnamese Paneer Satay Sticks in Schezwan Sauce",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Vietnamese-Paneer-Satay-Schezwan.jpg",
    description: "Paneer satay sticks in Schezwan sauce",
    variants: [{ size: "Regular", price: 290 }]
  },
  {
    id: 237,
    name: "Cheese Chilly",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Cheese-Chilly.jpg",
    description: "Spicy Indo-Chinese cheese chilli",
    variants: [{ size: "Regular", price: 310 }]
  },
  {
    id: 238,
    name: "Mushroom Chilly",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Mushroom-Chilly.jpg",
    description: "Mushrooms tossed in chilli sauce",
    variants: [{ size: "Regular", price: 280 }]
  },
  {
    id: 239,
    name: "Veg. Triplet",
    category: "Indo-Chinese (Veg)",
    type: "veg",
    img: "/Images/Veg-Triplet.jpg",
    description: "Trio-style Chinese veg combo",
    variants: [{ size: "Regular", price: 350 }]
  },
  {
    id: 240,
    name: "M-16 Egg Fried Chowmein",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/M16-Egg-Fried-Chowmein.jpg",
    description: "Chowmein tossed with egg",
    variants: [{ size: "Regular", price: 180 }]
  },
  {
    id: 241,
    name: "AK-47 Chicken Chowmein",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/AK47-Chicken-Chowmein.jpg",
    description: "Chicken-loaded chowmein",
    variants: [{ size: "Regular", price: 200 }]
  },
  {
    id: 242,
    name: "Chilli Garlic Chicken Noodles",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chilli-Garlic-Chicken-Noodles.jpg",
    description: "Chicken noodles in chilli garlic sauce",
    variants: [{ size: "Regular", price: 210 }]
  },
  {
    id: 243,
    name: "Salami & Chicken Pulled Noodles",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/Salami-Chicken-Pulled-Noodles.jpg",
    description: "Noodles tossed with salami & pulled chicken",
    variants: [{ size: "Regular", price: 220 }]
  },
  {
    id: 244,
    name: "Burnt Garlic Chicken Hakka Noodles",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/Burnt-Garlic-Chicken-Hakka-Noodles.jpg",
    description: "Chicken Hakka noodles with burnt garlic",
    variants: [{ size: "Regular", price: 240 }]
  },
  {
    id: 245,
    name: "Chicken Ham & Sausages Schezwan Peppery Noodles",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Ham-Sausages-Schezwan-Noodles.jpg",
    description: "Schezwan noodles with ham & sausages",
    variants: [{ size: "Regular", price: 270 }]
  },
  {
    id: 246,
    name: "Pad Thai Spicy Peanut Chicken Noodles in Hoisin Sauce",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/Pad-Thai-Spicy-Peanut-Chicken-Noodles-Hoisin.jpg",
    description: "Thai-style peanut chicken noodles",
    variants: [{ size: "Regular", price: 280 }]
  },
  {
    id: 247,
    name: "One Pot of Assorted Chicken Noodles with Egg Ribbon",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/Assorted-Chicken-Noodles-Egg-Ribbon.jpg",
    description: "One-pot noodles with assorted chicken & egg ribbon",
    variants: [{ size: "Regular", price: 310 }]
  },
  {
    id: 248,
    name: "American Chopsuey (Non-Veg)",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/American-Chopsuey-Non-Veg.jpg",
    description: "Crispy noodles topped with non-veg gravy",
    variants: [{ size: "Regular", price: 230 }]
  },
  {
    id: 249,
    name: "Chicken Lollipop in Schezwan Sauce (6 Pcs)",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Lollipop-Schezwan.jpg",
    description: "Chicken lollipops tossed in Schezwan sauce",
    variants: [{ size: "6 Pcs", price: 270 }]
  },
  {
    id: 250,
    name: "Chicken Kung Pao Extremely Spicy with Lemon Rice",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Kung-Pao-Lemon-Rice.jpg",
    description: "Extremely spicy Kung Pao chicken with lemon rice",
    variants: [{ size: "Regular", price: 330 }]
  },
  {
    id: 251,
    name: "Chilli Chicken",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chilli-Chicken.jpg",
    description: "Classic spicy Indo-Chinese chilli chicken",
    variants: [{ size: "Regular", price: 300 }]
  },
  {
    id: 252,
    name: "Thai Short Egg and Chicken Filled Spring Rolls",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/Thai-Short-Egg-Chicken-Spring-Rolls.jpg",
    description: "Thai spring rolls stuffed with egg & chicken",
    variants: [{ size: "Regular", price: 270 }]
  },
  {
    id: 253,
    name: "Chicken Satay Sticks in Schezwan Sauce",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Satay-Schezwan.jpg",
    description: "Chicken satay sticks tossed in Schezwan sauce",
    variants: [{ size: "Regular", price: 310 }]
  },
  {
    id: 254,
    name: "Chicken Triplet",
    category: "Indo-Chinese (Non-Veg)",
    type: "nonveg",
    img: "/Images/Chicken-Triplet.jpg",
    description: "Triple-style chicken Indo-Chinese combo",
    variants: [{ size: "Regular", price: 380 }]
  },
  {
    id: 255,
    name: "Nutella Waffle",
    category: "Waffles",
    img: "/Images/Nutella-Waffle.jpg",
    description: "Waffle topped generously with Nutella",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 256,
    name: "Belgian Fruit Waffle",
    category: "Waffles",
    img: "/Images/Belgian-Fruit-Waffle.jpg",
    description: "Belgian-style waffle topped with assorted fruits",
    variants: [
      { size: "Regular", price: 240 }
    ]
  },
  {
    id: 257,
    name: "Choco Bursted Waffle",
    category: "Waffles",
    img: "/Images/Choco-Bursted-Waffle.jpg",
    description: "Rich chocolate-loaded waffle",
    variants: [
      { size: "Regular", price: 270 }
    ]
  },
  {
    id: 258,
    name: "Pineapple & White Choco Waffle",
    category: "Waffles",
    img: "/Images/Pineapple-White-Choco-Waffle.jpg",
    description: "Waffle topped with pineapple and white chocolate",
    variants: [
      { size: "Regular", price: 290 }
    ]
  },
  {
    id: 259,
    name: "Fruit Punch Assorted Waffle",
    category: "Waffles",
    img: "/Images/Fruit-Punch-Assorted-Waffle.jpg",
    description: "Assorted fruit toppings on a waffle",
    variants: [
      { size: "Regular", price: 310 }
    ]
  },
  {
    id: 260,
    name: "Brownie Mixture Waffle with Chocolates",
    category: "Waffles",
    img: "/Images/Brownie-Mixture-Waffle-Chocolates.jpg",
    description: "Waffle topped with brownie mix and chocolates",
    variants: [
      { size: "Regular", price: 340 }
    ]
  },
  {
    id: 261,
    name: "Cream of Tomato",
    category: "Soups",
    img: "/Images/Cream-of-Tomato.jpg",
    description: "Classic creamy tomato soup",
    variants: [
      { size: "Regular", price: 130 }
    ]
  },
  {
    id: 262,
    name: "Cream of Mushroom",
    category: "Soups",
    img: "/Images/Cream-of-Mushroom.jpg",
    description: "Smooth and creamy mushroom soup",
    variants: [
      { size: "Regular", price: 160 }
    ]
  },
  {
    id: 263,
    name: "French Onion Baked Soup",
    category: "Soups",
    img: "/Images/French-Onion-Baked-Soup.jpg",
    description: "Baked onion soup with cheese topping",
    variants: [
      { size: "Regular", price: 190 }
    ]
  },
  {
    id: 264,
    name: "Minestrone Soup (Mixed Veggies With Pasta)",
    category: "Soups",
    img: "/Images/Minestrone-Soup.jpg",
    description: "Italian vegetable soup with pasta",
    variants: [
      { size: "Regular", price: 150 }
    ]
  },
  {
    id: 265,
    name: "Manchow Soup",
    category: "Soups",
    img: "/Images/Manchow-Soup.jpg",
    description: "Indo-Chinese spicy manchow soup",
    variants: [
      { size: "Regular", price: 90 }
    ]
  },
  {
    id: 266,
    name: "Espresso Without Milk (30ml)",
    category: "Hot Beverages",
    img: "/Images/Espresso-Without-Milk.jpg",
    description: "Strong single-shot espresso",
    variants: [
      { size: "30ml", price: 60 }
    ]
  },
  {
    id: 267,
    name: "Double Espresso (60ml)",
    category: "Hot Beverages",
    img: "/Images/Double-Espresso.jpg",
    description: "Double-shot concentrated espresso",
    variants: [
      { size: "60ml", price: 90 }
    ]
  },
  {
    id: 268,
    name: "Cappuccino",
    category: "Hot Beverages",
    img: "/Images/Cappuccino.jpg",
    description: "Espresso with steamed milk & foam",
    variants: [
      { size: "Regular", price: 90 }
    ]
  },
  {
    id: 269,
    name: "Flat White Cappuccino (Extra Hot)",
    category: "Hot Beverages",
    img: "/Images/Flat-White-Cappuccino.jpg",
    description: "Stronger cappuccino served extra hot",
    variants: [
      { size: "Regular", price: 100 }
    ]
  },
  {
    id: 270,
    name: "Long Black Without Milk",
    category: "Hot Beverages",
    img: "/Images/Long-Black-Without-Milk.jpg",
    description: "Hot water topped with espresso",
    variants: [
      { size: "Regular", price: 90 }
    ]
  },
  {
    id: 271,
    name: "Hazelnut Cappuccino",
    category: "Hot Beverages",
    img: "/Images/Hazelnut-Cappuccino.jpg",
    description: "Cappuccino with hazelnut flavour",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 272,
    name: "Irish Cappuccino",
    category: "Hot Beverages",
    img: "/Images/Irish-Cappuccino.jpg",
    description: "Irish-flavoured cappuccino",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 273,
    name: "Caramel Cappuccino",
    category: "Hot Beverages",
    img: "/Images/Caramel-Cappuccino.jpg",
    description: "Cappuccino with caramel syrup",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 274,
    name: "French Vanilla Cappuccino",
    category: "Hot Beverages",
    img: "/Images/French-Vanilla-Cappuccino.jpg",
    description: "Vanilla-flavoured cappuccino",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 275,
    name: "Vanilla Cappuccino",
    category: "Hot Beverages",
    img: "/Images/Vanilla-Cappuccino.jpg",
    description: "Classic vanilla infused cappuccino",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 276,
    name: "Caramel Hot Chocolate",
    category: "Hot Beverages",
    img: "/Images/Caramel-Hot-Chocolate.jpg",
    description: "Hot chocolate blended with caramel",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 277,
    name: "Classic Hot Chocolate",
    category: "Hot Beverages",
    img: "/Images/Classic-Hot-Chocolate.jpg",
    description: "Traditional rich hot chocolate",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 278,
    name: "Caffe Macchiato",
    category: "Hot Beverages",
    img: "/Images/Caffe-Macchiato.jpg",
    description: "Espresso topped with milk foam",
    variants: [
      { size: "Regular", price: 110 }
    ]
  },
  {
    id: 279,
    name: "Inverted Cappuccino (With Jaggery)",
    category: "Hot Beverages",
    img: "/Images/Inverted-Cappuccino-Jaggery.jpg",
    description: "Cappuccino sweetened with jaggery",
    variants: [
      { size: "Regular", price: 150 }
    ]
  },
  {
    id: 280,
    name: "Red Rose Cappuccino",
    category: "Hot Beverages",
    img: "/Images/Red-Rose-Cappuccino.jpg",
    description: "Rose-flavoured cappuccino",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 281,
    name: "Triple Sec Cappuccino",
    category: "Hot Beverages",
    img: "/Images/Triple-Sec-Cappuccino.jpg",
    description: "Citrus-infused triple sec cappuccino",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 282,
    name: "Vanilla Hazelnut Cappuccino",
    category: "Hot Beverages",
    img: "/Images/Vanilla-Hazelnut-Cappuccino.jpg",
    description: "Blend of vanilla & hazelnut cappuccino",
    variants: [
      { size: "Regular", price: 190 }
    ]
  },
  {
    id: 283,
    name: "White Hot Chocolate",
    category: "Hot Beverages",
    img: "/Images/White-Hot-Chocolate.jpg",
    description: "Creamy white chocolate hot drink",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 284,
    name: "Rifle-18 Signature Cappuccino (Triple Flavour)",
    category: "Hot Beverages",
    img: "/Images/Rifle-18-Signature-Cappuccino.jpg",
    description: "Signature cappuccino with three blended flavours",
    variants: [
      { size: "Regular", price: 220 }
    ]
  },
  {
    id: 285,
    name: "Caffe Latte",
    category: "Hot Latte",
    img: "/Images/Caffe-Latte.jpg",
    description: "Smooth espresso with steamed milk",
    variants: [
      { size: "Regular", price: 100 }
    ]
  },
  {
    id: 286,
    name: "Caffe Mocha",
    category: "Hot Latte",
    img: "/Images/Caffe-Mocha.jpg",
    description: "Chocolate-infused latte",
    variants: [
      { size: "Regular", price: 110 }
    ]
  },
  {
    id: 287,
    name: "Mocha Latte",
    category: "Hot Latte",
    img: "/Images/Mocha-Latte.jpg",
    description: "Rich mocha-flavoured latte",
    variants: [
      { size: "Regular", price: 110 }
    ]
  },
  {
    id: 288,
    name: "Hazelnut Latte",
    category: "Hot Latte",
    img: "/Images/Hazelnut-Latte.jpg",
    description: "Latte with hazelnut syrup",
    variants: [
      { size: "Regular", price: 160 }
    ]
  },
  {
    id: 289,
    name: "Irish Latte",
    category: "Hot Latte",
    img: "/Images/Irish-Latte.jpg",
    description: "Latte with Irish flavouring",
    variants: [
      { size: "Regular", price: 160 }
    ]
  },
  {
    id: 290,
    name: "Caramel Latte",
    category: "Hot Latte",
    img: "/Images/Caramel-Latte.jpg",
    description: "Latte blended with caramel syrup",
    variants: [
      { size: "Regular", price: 160 }
    ]
  },
  {
    id: 291,
    name: "Vanilla Latte",
    category: "Hot Latte",
    img: "/Images/Vanilla-Latte.jpg",
    description: "Smooth latte with vanilla flavour",
    variants: [
      { size: "Regular", price: 160 }
    ]
  },
  {
    id: 292,
    name: "French Vanilla Latte",
    category: "Hot Latte",
    img: "/Images/French-Vanilla-Latte.jpg",
    description: "Enhanced vanilla-flavoured latte",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 293,
    name: "Red Rose Latte",
    category: "Premium Hot Latte",
    img: "/Images/Red-Rose-Latte.jpg",
    description: "Latte infused with rose flavour",
    variants: [
      { size: "Regular", price: 180 }
    ]
  },
  {
    id: 294,
    name: "Triple Sec Latte",
    category: "Premium Hot Latte",
    img: "/Images/Triple-Sec-Latte.jpg",
    description: "Latte with citrus triple-sec essence",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 295,
    name: "Vanilla Hazelnut Latte",
    category: "Premium Hot Latte",
    img: "/Images/Vanilla-Hazelnut-Latte.jpg",
    description: "Blend of vanilla & hazelnut flavour",
    variants: [
      { size: "Regular", price: 210 }
    ]
  },
  {
    id: 296,
    name: "Caramelized French Vanilla Latte",
    category: "Premium Hot Latte",
    img: "/Images/Caramelized-French-Vanilla-Latte.jpg",
    description: "Caramel-enhanced French vanilla latte",
    variants: [
      { size: "Regular", price: 210 }
    ]
  },
  {
    id: 297,
    name: "Rifle-18 Signature Latte (Triple Flavour Latte)",
    category: "Premium Hot Latte",
    img: "/Images/Rifle-18-Signature-Latte.jpg",
    description: "Signature triple-flavour latte",
    variants: [
      { size: "Regular", price: 240 }
    ]
  },
  {
    id: 298,
    name: "Masala Tea",
    category: "Hot Tea",
    img: "/Images/Masala-Tea.jpg",
    description: "Traditional Indian masala-flavoured tea",
    variants: [
      { size: "Regular", price: 70 }
    ]
  },
  {
    id: 299,
    name: "Elaichi Tea",
    category: "Hot Tea",
    img: "/Images/Elaichi-Tea.jpg",
    description: "Cardamom-infused hot tea",
    variants: [
      { size: "Regular", price: 80 }
    ]
  },
  {
    id: 300,
    name: "Green Tea",
    category: "Hot Tea",
    img: "/Images/Green-Tea.jpg",
    description: "Classic herbal green tea",
    variants: [
      { size: "Regular", price: 80 }
    ]
  },
  {
    id: 301,
    name: "Lemon Tea",
    category: "Hot Tea",
    img: "/Images/Lemon-Tea.jpg",
    description: "Tea blended with lemon",
    variants: [
      { size: "Regular", price: 80 }
    ]
  },
  {
    id: 302,
    name: "Lemon and Ginger Honey Tea",
    category: "Hot Tea",
    img: "/Images/Lemon-Ginger-Honey-Tea.jpg",
    description: "Hot tea with lemon, ginger & honey",
    variants: [
      { size: "Regular", price: 90 }
    ]
  },
  {
    id: 303,
    name: "Lemon Ice Tea",
    category: "Iced Tea",
    img: "/Images/Lemon-Ice-Tea.jpg",
    description: "Chilled lemon-flavoured iced tea",
    variants: [
      { size: "Regular", price: 100 }
    ]
  },
  {
    id: 304,
    name: "Peach Ice Tea",
    category: "Iced Tea",
    img: "/Images/Peach-Ice-Tea.jpg",
    description: "Iced tea with peach flavour",
    variants: [
      { size: "Regular", price: 110 }
    ]
  },
  {
    id: 305,
    name: "Mint Ice Tea",
    category: "Iced Tea",
    img: "/Images/Mint-Ice-Tea.jpg",
    description: "Refreshing mint-flavoured iced tea",
    variants: [
      { size: "Regular", price: 110 }
    ]
  },
  {
    id: 306,
    name: "Lemon Honey & Ginger",
    category: "Iced Tea",
    img: "/Images/Lemon-Honey-Ginger-Iced-Tea.jpg",
    description: "Cool lemon, honey & ginger drink (iced variant)",
    variants: [
      { size: "Regular", price: 130 }
    ]
  },
  {
    id: 307,
    name: "Cold Coffee",
    category: "Cold Beverages",
    img: "/Images/Cold-Coffee.jpg",
    description: "Classic cold coffee",
    variants: [
      { size: "Regular", price: 110 }
    ]
  },
  {
    id: 308,
    name: "Caffe Frappe",
    category: "Cold Beverages",
    img: "/Images/Caffe-Frappe.jpg",
    description: "Blended iced coffee frappe",
    variants: [
      { size: "Regular", price: 130 }
    ]
  },
  {
    id: 309,
    name: "Choco Tropo Frappe",
    category: "Cold Beverages",
    img: "/Images/Choco-Tropo-Frappe.jpg",
    description: "Chocolate-flavoured frappe",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 310,
    name: "Iced Cappuccino",
    category: "Cold Beverages",
    img: "/Images/Iced-Cappuccino.jpg",
    description: "Chilled cappuccino",
    variants: [
      { size: "Regular", price: 100 }
    ]
  },
  {
    id: 311,
    name: "Diet Iced Cappuccino",
    category: "Cold Beverages",
    img: "/Images/Diet-Iced-Cappuccino.jpg",
    description: "Low-calorie iced cappuccino",
    variants: [
      { size: "Regular", price: 100 }
    ]
  },
  {
    id: 312,
    name: "Iced Café Americano (Without Milk)",
    category: "Cold Beverages",
    img: "/Images/Iced-Cafe-Americano.jpg",
    description: "Chilled black coffee (no milk)",
    variants: [
      { size: "Regular", price: 100 }
    ]
  },
  {
    id: 313,
    name: "Irish Cold Coffee",
    category: "Cold Beverages",
    img: "/Images/Irish-Cold-Coffee.jpg",
    description: "Cold coffee with Irish flavour",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 314,
    name: "Caramel Cold Coffee",
    category: "Cold Beverages",
    img: "/Images/Caramel-Cold-Coffee.jpg",
    description: "Cold coffee with caramel syrup",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 315,
    name: "Hazelnut Cold Coffee",
    category: "Cold Beverages",
    img: "/Images/Hazelnut-Cold-Coffee.jpg",
    description: "Hazelnut-flavoured cold coffee",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 316,
    name: "Cardamom Flavoured Cold Coffee",
    category: "Premium Cold Beverages",
    img: "/Images/Cardamom-Cold-Coffee.jpg",
    description: "Cold coffee infused with cardamom",
    variants: [
      { size: "Regular", price: 160 }
    ]
  },
  {
    id: 317,
    name: "Coco Choco Cold Coffee",
    category: "Premium Cold Beverages",
    img: "/Images/Coco-Choco-Cold-Coffee.jpg",
    description: "Rich cocoa-chocolate cold coffee",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 318,
    name: "Triple Sec Cold Coffee",
    category: "Premium Cold Beverages",
    img: "/Images/Triple-Sec-Cold-Coffee.jpg",
    description: "Citrus-infused triple-sec cold coffee",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 319,
    name: "Café Nirvana (Signature)",
    category: "Premium Cold Beverages",
    img: "/Images/Cafe-Nirvana.jpg",
    description: "Signature special cold coffee blend",
    variants: [
      { size: "Regular", price: 220 }
    ]
  },
  {
    id: 320,
    name: "Rifle-18 (Black Signature)",
    category: "Premium Cold Beverages",
    img: "/Images/Rifle-18-Black-Signature.jpg",
    description: "Strong black signature cold brew-style beverage",
    variants: [
      { size: "Regular", price: 250 }
    ]
  },
  {
    id: 321,
    name: "Classic Dalgona Cold Coffee",
    category: "Premium Cold Beverages",
    img: "/Images/Classic-Dalgona-Cold-Coffee.jpg",
    description: "Whipped dalgona-style cold coffee",
    variants: [
      { size: "Regular", price: 270 }
    ]
  },
  {
    id: 322,
    name: "Fresh Lime",
    category: "Mocktails",
    img: "/Images/Fresh-Lime.jpg",
    description: "Classic fresh lime drink",
    variants: [
      { size: "Regular", price: 80 }
    ]
  },
  {
    id: 323,
    name: "Mint Mojito",
    category: "Mocktails",
    img: "/Images/Mint-Mojito.jpg",
    description: "Refreshing mint-based mojito",
    variants: [
      { size: "Regular", price: 120 }
    ]
  },
  {
    id: 324,
    name: "Masala Lemonade",
    category: "Mocktails",
    img: "/Images/Masala-Lemonade.jpg",
    description: "Lemonade with Indian masala twist",
    variants: [
      { size: "Regular", price: 120 }
    ]
  },
  {
    id: 325,
    name: "Blue Curacao",
    category: "Mocktails",
    img: "/Images/Blue-Curacao.jpg",
    description: "Blue curacao-flavoured mocktail",
    variants: [
      { size: "Regular", price: 120 }
    ]
  },
  {
    id: 326,
    name: "Green Apple Lemonade",
    category: "Mocktails",
    img: "/Images/Green-Apple-Lemonade.jpg",
    description: "Green apple infused lemonade",
    variants: [
      { size: "Regular", price: 130 }
    ]
  },
  {
    id: 327,
    name: "Watermelon Lemonade",
    category: "Mocktails",
    img: "/Images/Watermelon-Lemonade.jpg",
    description: "Watermelon-flavoured lemonade",
    variants: [
      { size: "Regular", price: 130 }
    ]
  },
  {
    id: 328,
    name: "Guava Pollutant",
    category: "Mocktails",
    img: "/Images/Guava-Pollutant.jpg",
    description: "Spicy-tangy guava drink",
    variants: [
      { size: "Regular", price: 160 }
    ]
  },
  {
    id: 329,
    name: "Rifle-18 Bomb Blast",
    category: "Mocktails",
    img: "/Images/Rifle-18-Bomb-Blast.jpg",
    description: "House special explosive flavour mix",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 330,
    name: "Cotton Candy Mania",
    category: "Mocktails",
    img: "/Images/Cotton-Candy-Mania.jpg",
    description: "Cotton candy flavoured mocktail",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 331,
    name: "Rifle-18 Beer (Non-Alcoholic)",
    category: "Mocktails",
    img: "/Images/Rifle-18-Beer-Non-Alcoholic.jpg",
    description: "Non-alcoholic malt-based beverage",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 332,
    name: "Fresh Lime Soda",
    category: "Premium Mocktails",
    img: "/Images/Fresh-Lime-Soda.jpg",
    description: "Classic lime soda (sweet/salty)",
    variants: [
      { size: "Regular", price: 90 }
    ]
  },
  {
    id: 333,
    name: "Masala Box Lemonade",
    category: "Premium Mocktails",
    img: "/Images/Masala-Box-Lemonade.jpg",
    description: "Strong masala-flavoured lemonade",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 334,
    name: "Spicy Guava Blast",
    category: "Premium Mocktails",
    img: "/Images/Spicy-Guava-Blast.jpg",
    description: "Spicy guava mocktail",
    variants: [
      { size: "Regular", price: 180 }
    ]
  },
  {
    id: 335,
    name: "Rose Fizz",
    category: "Premium Mocktails",
    img: "/Images/Rose-Fizz.jpg",
    description: "Rose-flavoured fizzy drink",
    variants: [
      { size: "Regular", price: 190 }
    ]
  },
  {
    id: 336,
    name: "Blue Foggy Blossoms",
    category: "Premium Mocktails",
    img: "/Images/Blue-Foggy-Blossoms.jpg",
    description: "Blueberry-floral fizz drink",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 337,
    name: "Pink Lady",
    category: "Premium Mocktails",
    img: "/Images/Pink-Lady.jpg",
    description: "Pink fruity mocktail",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 338,
    name: "Raspberry Mojito",
    category: "Premium Mocktails",
    img: "/Images/Raspberry-Mojito.jpg",
    description: "Raspberry flavoured mojito",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 339,
    name: "Passion Fruits",
    category: "Premium Mocktails",
    img: "/Images/Passion-Fruits.jpg",
    description: "Passion fruit-based drink",
    variants: [
      { size: "Regular", price: 160 }
    ]
  },
  {
    id: 340,
    name: "Rosemary Lemonade",
    category: "Premium Mocktails",
    img: "/Images/Rosemary-Lemonade.jpg",
    description: "Herbal lemonade with rosemary",
    variants: [
      { size: "Regular", price: 160 }
    ]
  },
  {
    id: 341,
    name: "Kala Khata",
    category: "Premium Mocktails",
    img: "/Images/Kala-Khata.jpg",
    description: "Tangy kala khatta mocktail",
    variants: [
      { size: "Regular", price: 150 }
    ]
  },
  {
    id: 342,
    name: "Virgin Pina-Colada",
    category: "Premium Mocktails",
    img: "/Images/Virgin-Pina-Colada.jpg",
    description: "Pineapple & coconut virgin colada",
    variants: [
      { size: "Regular", price: 180 }
    ]
  },
  {
    id: 343,
    name: "Triple Layer Mocktail (Strawberry, Green Apple & Kiwi)",
    category: "Premium Mocktails",
    img: "/Images/Triple-Layer-Mocktail.jpg",
    description: "Three-layered fruit mocktail",
    variants: [
      { size: "Regular", price: 210 }
    ]
  },
  {
    id: 344,
    name: "Cosmopolitan",
    category: "Premium Mocktails",
    img: "/Images/Cosmopolitan.jpg",
    description: "Fruity cosmo-style mocktail",
    variants: [
      { size: "Regular", price: 220 }
    ]
  },
  {
    id: 345,
    name: "Ginger Ale",
    category: "Premium Mocktails",
    img: "/Images/Ginger-Ale.jpg",
    description: "Classic ginger-flavoured sparkling drink",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 346,
    name: "Orange Mango Quencher",
    category: "Premium Mocktails",
    img: "/Images/Orange-Mango-Quencher.jpg",
    description: "Orange & mango blended mocktail",
    variants: [
      { size: "Regular", price: 230 }
    ]
  },
  {
    id: 347,
    name: "Strawberry Cooler",
    category: "Lime & Cooler",
    img: "/Images/Strawberry-Cooler.jpg",
    description: "Chilled strawberry-flavoured cooler",
    variants: [
      { size: "Regular", price: 120 }
    ]
  },
  {
    id: 348,
    name: "Mango Cooler",
    category: "Lime & Cooler",
    img: "/Images/Mango-Cooler.jpg",
    description: "Sweet mango-flavoured cooler",
    variants: [
      { size: "Regular", price: 120 }
    ]
  },
  {
    id: 349,
    name: "Black Currant Cooler",
    category: "Lime & Cooler",
    img: "/Images/Black-Currant-Cooler.jpg",
    description: "Black currant chilled drink",
    variants: [
      { size: "Regular", price: 120 }
    ]
  },
  {
    id: 350,
    name: "Kiwi Cooler",
    category: "Lime & Cooler",
    img: "/Images/Kiwi-Cooler.jpg",
    description: "Refreshing kiwi-flavoured cooler",
    variants: [
      { size: "Regular", price: 120 }
    ]
  },
  {
    id: 351,
    name: "Green Apple Cooler",
    category: "Lime & Cooler",
    img: "/Images/Green-Apple-Cooler.jpg",
    description: "Green apple cooler with tangy notes",
    variants: [
      { size: "Regular", price: 120 }
    ]
  },
  {
    id: 352,
    name: "Pineapple Cooler",
    category: "Premium Lime & Cooler",
    img: "/Images/Pineapple-Cooler.jpg",
    description: "Pineapple-flavoured chilled drink",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 353,
    name: "Litchi Cooler",
    category: "Premium Lime & Cooler",
    img: "/Images/Litchi-Cooler.jpg",
    description: "Sweet litchi cooler",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 354,
    name: "Orange Cooler",
    category: "Premium Lime & Cooler",
    img: "/Images/Orange-Cooler.jpg",
    description: "Orange citrus cooler",
    variants: [
      { size: "Regular", price: 150 }
    ]
  },
  {
    id: 355,
    name: "Black Forest Cooler (Strawberry + Black Currant)",
    category: "Premium Lime & Cooler",
    img: "/Images/Black-Forest-Cooler.jpg",
    description: "Mixed cooler with strawberry & black currant",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 356,
    name: "Blueberry Cooler",
    category: "Premium Lime & Cooler",
    img: "/Images/Blueberry-Cooler.jpg",
    description: "Blueberry-flavoured chilled cooler",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 357,
    name: "Strawberry Shake",
    category: "Shakes",
    img: "/Images/Strawberry-Shake.jpg",
    description: "Classic strawberry milkshake.",
    variants: [
      { size: "Regular", price: 130 }
    ]
  },
  {
    id: 358,
    name: "Mango Shake",
    category: "Shakes",
    img: "/Images/Mango-Shake.jpg",
    description: "Thick mango milkshake.",
    variants: [
      { size: "Regular", price: 150 }
    ]
  },
  {
    id: 359,
    name: "Butterscotch Shake",
    category: "Shakes",
    img: "/Images/Butterscotch-Shake.jpg",
    description: "Sweet butterscotch-flavoured shake.",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 360,
    name: "Kiwi Shake",
    category: "Shakes",
    img: "/Images/Kiwi-Shake.jpg",
    description: "Refreshing kiwi fruit shake.",
    variants: [
      { size: "Regular", price: 150 }
    ]
  },
  {
    id: 361,
    name: "Black Currant Shake",
    category: "Shakes",
    img: "/Images/Black-Currant-Shake.jpg",
    description: "Black currant–flavoured milkshake.",
    variants: [
      { size: "Regular", price: 150 }
    ]
  },
  {
    id: 362,
    name: "Blueberry Shake",
    category: "Shakes",
    img: "/Images/Blueberry-Shake.jpg",
    description: "Blueberry ice-cream milkshake.",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 363,
    name: "Turkish Delight Shake",
    category: "Shakes",
    img: "/Images/Turkish-Delight-Shake.jpg",
    description: "Turkish sweet-inspired shake.",
    variants: [
      { size: "Regular", price: 210 }
    ]
  },
  {
    id: 364,
    name: "Aroma Thandai Shake",
    category: "Shakes",
    img: "/Images/Aroma-Thandai-Shake.jpg",
    description: "Festive thandai-flavoured shake.",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 365,
    name: "Cheese Cassata Cake Shake",
    category: "Shakes",
    img: "/Images/Cheese-Cassata-Cake-Shake.jpg",
    description: "Cassata cake blended into a shake.",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 366,
    name: "Nutella Nuts",
    category: "Shakes",
    img: "/Images/Nutella-Nuts.jpg",
    description: "Nutella shake with nuts.",
    variants: [
      { size: "Regular", price: 220 }
    ]
  },
  {
    id: 367,
    name: "Fruitful Peanut Shake",
    category: "Shakes",
    img: "/Images/Fruitful-Peanut-Shake.jpg",
    description: "Peanut-flavoured thick shake.",
    variants: [
      { size: "Regular", price: 240 }
    ]
  },
  {
    id: 368,
    name: "Vanilla Shake",
    category: "Shakes",
    img: "/Images/Vanilla-Shake.jpg",
    description: "Classic vanilla milkshake.",
    variants: [
      { size: "Regular", price: 120 }
    ]
  },
  {
    id: 369,
    name: "Chocolate Shake",
    category: "Shakes",
    img: "/Images/Chocolate-Shake.jpg",
    description: "Traditional chocolate shake.",
    variants: [
      { size: "Regular", price: 130 }
    ]
  },
  {
    id: 370,
    name: "Kit-Kat Shake",
    category: "Shakes",
    img: "/Images/KitKat-Shake.jpg",
    description: "Kit-Kat blended milkshake.",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 371,
    name: "Oreo Shake",
    category: "Shakes",
    img: "/Images/Oreo-Shake.jpg",
    description: "Cookies-and-cream Oreo shake.",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 372,
    name: "Brownie Shake",
    category: "Shakes",
    img: "/Images/Brownie-Shake.jpg",
    description: "Chocolate brownie blended shake.",
    variants: [
      { size: "Regular", price: 180 }
    ]
  },
  {
    id: 373,
    name: "Snickers Shake",
    category: "Shakes",
    img: "/Images/Snickers-Shake.jpg",
    description: "Shake made with Snickers bar.",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 374,
    name: "Peanut Butter Shake",
    category: "Shakes",
    img: "/Images/Peanut-Butter-Shake.jpg",
    description: "Creamy peanut butter thick shake.",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 375,
    name: "Rifle-18 Shake",
    category: "Premium Chocolate Shakes",
    img: "/Images/Rifle-18-Shake.jpg",
    description: "Signature chocolate shake.",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 376,
    name: "Hazelnut Brownie Shake",
    category: "Premium Chocolate Shakes",
    img: "/Images/Hazelnut-Brownie-Shake.jpg",
    description: "Brownie + hazelnut blended shake.",
    variants: [
      { size: "Regular", price: 210 }
    ]
  },
  {
    id: 377,
    name: "Caramelized Snickers",
    category: "Premium Chocolate Shakes",
    img: "/Images/Caramelized-Snickers.jpg",
    description: "Snickers shake with caramel.",
    variants: [
      { size: "Regular", price: 210 }
    ]
  },
  {
    id: 378,
    name: "White Oreo Shake",
    category: "Premium Chocolate Shakes",
    img: "/Images/White-Oreo-Shake.jpg",
    description: "White chocolate Oreo shake.",
    variants: [
      { size: "Regular", price: 220 }
    ]
  },
  {
    id: 379,
    name: "Dazzled Dark Kit-Kat Shake",
    category: "Premium Chocolate Shakes",
    img: "/Images/Dazzled-Dark-KitKat-Shake.jpg",
    description: "Dark chocolate Kit-Kat shake.",
    variants: [
      { size: "Regular", price: 230 }
    ]
  },
  {
    id: 380,
    name: "Fiesta of Five Star",
    category: "Premium Chocolate Shakes",
    img: "/Images/Fiesta-of-Five-Star.jpg",
    description: "Five Star chocolate blended thick shake.",
    variants: [
      { size: "Regular", price: 250 }
    ]
  },
  {
    id: 381,
    name: "Alphonso Mango Smoothie",
    category: "Smoothies",
    img: "/Images/Alphonso-Mango-Smoothie.jpg",
    description: "Mango-based smoothie.",
    variants: [
      { size: "Regular", price: 140 }
    ]
  },
  {
    id: 382,
    name: "Mango Strawberry Smoothie",
    category: "Smoothies",
    img: "/Images/Mango-Strawberry-Smoothie.jpg",
    description: "Blend of mango & strawberry.",
    variants: [
      { size: "Regular", price: 150 }
    ]
  },
  {
    id: 383,
    name: "Mango Pineapple Smoothie",
    category: "Smoothies",
    img: "/Images/Mango-Pineapple-Smoothie.jpg",
    description: "Tropical pineapple + mango smoothie.",
    variants: [
      { size: "Regular", price: 150 }
    ]
  },
  {
    id: 384,
    name: "Blueberry Smoothie",
    category: "Smoothies",
    img: "/Images/Blueberry-Smoothie.jpg",
    description: "Blueberry fruit smoothie.",
    variants: [
      { size: "Regular", price: 160 }
    ]
  },
  {
    id: 385,
    name: "Lemon Blueberry Smoothie",
    category: "Smoothies",
    img: "/Images/Lemon-Blueberry-Smoothie.jpg",
    description: "Blueberry smoothie with lemon.",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 386,
    name: "Banana Strawberry Smoothie",
    category: "Smoothies",
    img: "/Images/Banana-Strawberry-Smoothie.jpg",
    description: "Banana + strawberry smoothie.",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 387,
    name: "Signature Smoothie",
    category: "Smoothies",
    img: "/Images/Signature-Smoothie.jpg",
    description: "Customizable smoothie (choose mango, strawberry, pineapple, blueberry, banana).",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 388,
    name: "Hot Choco Peanut Fudge",
    category: "Sundae",
    img: "/Images/Hot-Choco-Peanut-Fudge.jpg",
    description: "Chocolate & peanut fudge sundae.",
    variants: [
      { size: "Regular", price: 180 }
    ]
  },
  {
    id: 389,
    name: "Caramelized Hazelnut Fudge",
    category: "Sundae",
    img: "/Images/Caramelized-Hazelnut-Fudge.jpg",
    description: "Hazelnut + caramel fudge sundae.",
    variants: [
      { size: "Regular", price: 190 }
    ]
  },
  {
    id: 390,
    name: "Smoking Brownie Sundae",
    category: "Sundae",
    img: "/Images/Smoking-Brownie-Sundae.jpg",
    description: "Warm brownie sundae.",
    variants: [
      { size: "Regular", price: 170 }
    ]
  },
  {
    id: 391,
    name: "Heart Leaf Brownie Sundae",
    category: "Sundae",
    img: "/Images/Heart-Leaf-Brownie-Sundae.jpg",
    description: "Brownie sundae with heart-shaped presentation.",
    variants: [
      { size: "Regular", price: 200 }
    ]
  },
  {
    id: 392,
    name: "Golden Heart Leaf Brownie Sundae",
    category: "Sundae",
    img: "/Images/Golden-Heart-Leaf-Brownie-Sundae.jpg",
    description: "Premium golden version of the heart brownie.",
    variants: [
      { size: "Regular", price: 220 }
    ]
  },
  {
    id: 393,
    name: "Death on Chocolate",
    category: "Sundae",
    img: "/Images/Death-on-Chocolate.jpg",
    description: "Heavy chocolate overdose sundae.",
    variants: [
      { size: "Regular", price: 240 }
    ]
  },
  /* ------------------ PIZZA ADD-ONS ------------------ */
  {
    id: 394,
    name: "Cheese Burst Base",
    category: "Add-Ons",
    img: "/Images/Cheese-Burst-Base.jpg",
    description: "Add rich molten cheese burst base.",
    variants: [
      { size: "Medium", price: 60 },
      { size: "Large", price: 90 }
    ]
  },

  /* ------------------ SALAD ADD-ONS (COMBINED) ------------------ */
  {
    id: 395,
    name: "Salad Toppings",
    category: "Add-Ons",
    img: "/Images/Salad-Toppings.jpg",
    description: "Add extra toppings to your salad.",
    variants: [
      { size: "Veg Toppings", price: 60 },
      { size: "Non-Veg Toppings", price: 70 }
    ]
  },

  /* ------------------ SOUP ADD-ONS (COMBINED) ------------------ */
  {
    id: 396,
    name: "Soup Add-Ons",
    category: "Add-Ons",
    img: "/Images/Soup-Addons.jpg",
    description: "Enhance your soup with additional ingredients.",
    variants: [
      { size: "Extra Chicken", price: 60 },
      { size: "Extra Veggies", price: 50 }
    ]
  },

  /* ------------------ DRINKS ADD-ONS ------------------ */
  {
    id: 397,
    name: "Whipped Cream",
    category: "Add-Ons",
    img: "/Images/Whipped-Cream.jpg",
    description: "Add whipped cream to beverages.",
    variants: [
      { size: "Regular", price: 60 }
    ]
  }

];

function getItemType(category) {
  if (category.toLowerCase().includes("non")) return "nonveg";
  return "veg";
}

export default function RestaurantMenu() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let items = menuItems.filter((it) => {
      if (category !== "All" && it.category !== category) return false;

      if (
        q &&
        !(it.name.toLowerCase().includes(q) ||
          it.description.toLowerCase().includes(q))
      )
        return false;

      return true;
    });

    return items;
  }, [query, category]);

  return (
    <div
      className="min-h-screen p-6 sm:p-12"
      style={{ backgroundColor: "#4e513c" }}
    >
      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-8 flex items-center gap-4">
        <img
          src="/Images/logo.png"
          alt="Cafe Logo"
          className="w-14 h-14 rounded-full bg-white p-1 object-contain shadow"
          style={{ border: "2px solid rgba(255,255,255,0.4)" }}
        />

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={GOLD_GRADIENT}>
            Rifle 18 Cafe & Lounge
          </h1>
          <p style={{ ...GOLD_SOFT, opacity: 0.75 }}>
            Modern restaurant menu — filter, search & animate.
          </p>
        </div>
      </header>

      {/* LAYOUT */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <aside
          className="lg:col-span-1 p-5 rounded-2xl shadow-xl"
          style={{ backgroundColor: "#4e513c", color: "#ffd700" }}
        >
          {/* SEARCH */}
          <div className="mb-4">
            <label className="block text-sm mb-2" style={GOLD_SOFT}>Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full px-3 py-2 rounded-lg border"
              style={{
                backgroundColor: "#3f4230",
                color: "#ffd700",
                borderColor: "#b89f40",
              }}
            />
          </div>

          {/* CATEGORY DROPDOWN */}
          <div className="mb-4">
            <label className="block text-sm mb-2" style={GOLD_SOFT}>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border"
              style={{
                backgroundColor: "#3f4230",
                color: "#ffd700",
                borderColor: "#b89f40",
              }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} style={{ color: "#ffffff" }}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* MENU LIST */}
        <section className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* LIST WITHOUT ANIMATION — FIXES iOS CRASH */}
            {filtered.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl shadow-xl overflow-hidden transition"
                style={{ backgroundColor: "#4e513c" }}
              >
                {/* IMAGE */}
                <div className="relative h-44 sm:h-56">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />

                  <div
                    className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.4)",
                      ...GOLD_SOFT
                    }}
                  >
                    {item.category}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4">

                  {/* NAME + DOT */}
                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-lg" style={GOLD_GRADIENT}>
                      {item.name}
                    </h3>

                    {/* Only show dot if type exists */}
                    {item.type && (
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor:
                            item.type === "veg" ? "#0f8a0f" : "#c40000",
                          border: "2px solid #ffd700",
                          display: "inline-block",
                          marginLeft: "8px",
                          boxShadow: "0 0 6px rgba(255,215,0,0.4)"
                        }}
                      />
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  {item.description && (
                    <p
                      className="text-sm mt-1 leading-snug"
                      style={{ ...GOLD_SOFT, opacity: 0.8 }}
                    >
                      {item.description}
                    </p>
                  )}

                  {/* VARIANTS */}
                  {item.variants && (
                    <div
                      className="mt-3 p-3 rounded-lg text-sm"
                      style={{
                        backgroundColor: "rgba(255, 215, 0, 0.08)",
                        border: "1px solid rgba(255,215,0,0.3)",
                        color: "#ffd700"
                      }}
                    >
                      {item.variants.map((v, i) => (
                        <div
                          key={i}
                          className="flex justify-between py-1 border-b last:border-none"
                          style={{ borderColor: "rgba(255,215,0,0.2)" }}
                        >
                          <span>{v.size}</span>
                          <span>₹{v.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}

          </div>
        </section>
      </main>

      <footer
        className="max-w-6xl mx-auto mt-12 text-center text-sm"
        style={{ color: "#ffd700" }}
      >
        © Rifle 18 — Built with ❤️
      </footer>
    </div>
  );
}

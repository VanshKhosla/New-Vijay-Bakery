import React, { useMemo, useState, useEffect } from "react";

const CATEGORIES = [
  "All", "Add-Ons", "Kulcha", "Deluxe Pizza", "Pizza", "Burger", "Sandwich", "Subway", "Wrap", "Pasta", "Noodles",
  "Twister", "Garlic Bread", "Salad", "Mocktail", "Coffee", "Cold Coffee", "Mushroom Dish", "Italian Dish", "Soup",
  "Street Food", "Fried Rice", "Champ", "Fries"
];

const GOLD_GRADIENT = {
  background: "linear-gradient(90deg, #b8860b, #ffd700, #b8860b)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold"
};

const GOLD_SOFT = { color: "#ffd700" };

function getItemType(category) {
  if (category.toLowerCase().includes("non")) return "nonveg";
  return "veg";
}

export default function RestaurantMenu() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [allMenuItems, setAllMenuItems] = useState([]); // Stores all items
  const [loading, setLoading] = useState(true); // Start true as we fetch immediately
  const [error, setError] = useState(null);

  // Single-Fetch: Load All.json ONE time on mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch("/data/All.json");
        if (!response.ok) {
          throw new Error("Failed to load menu data");
        }
        const data = await response.json();
        setAllMenuItems(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load menu data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []); // Empty dependency array = runs once

  // Client-Side Instant Filtering (0ms)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allMenuItems.filter((item) => {
      // 1. Filter by Category (if not "All")
      if (category !== "All" && item.category !== category) {
        return false;
      }

      // 2. Filter by Search Query
      if (q && !(
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
      )) {
        return false;
      }

      return true;
    });
  }, [query, category, allMenuItems]);

  return (
    <div
      className="min-h-screen p-6 sm:p-12"
      style={{ backgroundColor: "#4e513c" }}
    >
      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 md:ml-0">

          {/* LEFT: LOGO / ARTWORK */}
          <div className="flex-shrink-0">
            <img
              src="/Images/logo.png"
              alt="New Vijay Bakery"
              loading="eager"
              className="w-10 sm:w-12 md:w-14 lg:w-16 aspect-square object-cover rounded-lg shadow-sm"
            />
          </div>

          {/* RIGHT: TEXT */}
          <div className="text-center pb-1">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-none"
              style={GOLD_GRADIENT}
            >
              NEW VIJAY BAKERY
            </h1>

            <p
              className="mt-1 text-xs sm:text-sm md:text-base"
              style={{ ...GOLD_SOFT, opacity: 0.85 }}
            >
              BAKED WITH CARE, SERVED WITH LOVE
            </p>
          </div>

        </div>
      </header>

      <div className="max-w-6xl mx-auto mb-8 border-b border-yellow-500/30" />


      {/* LAYOUT */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 mt-0">


        {/* SIDEBAR */}
        <aside
          className="lg:col-span-1 p-5 rounded-2xl shadow-xl h-fit"
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
          {loading ? (
            <div className="text-center py-12" style={GOLD_SOFT}>Loading menu...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-400">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12" style={GOLD_SOFT}>No items found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                      loading="lazy"
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
          )}
        </section>
      </main>

      <footer
        className="max-w-6xl mx-auto mt-12 text-center text-sm"
        style={{ color: "#ffd700" }}
      >
        © NEW VIJAY BAKERY — Built with ❤️
      </footer>
    </div>
  );
}

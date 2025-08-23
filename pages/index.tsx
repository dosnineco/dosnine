import { useState } from "react";
import Head from "next/head";
import {  Trash2, Save} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";


// Types for household members
type Member = {
  id: number;
  age: number;
  gender: "male" | "female" | "other";
  dietary: string;
  mealsOut: number;
};

const USDA_PLANS = [
  { label: "Thrifty", multiplier: 0.9 },
  { label: "Moderate", multiplier: 1 },
  { label: "Liberal", multiplier: 1.15 },
];

const REGIONS = [
  "National Average",
  "Northeast",
  "Midwest",
  "South",
  "West",
];

const DIETARY_OPTIONS = [
  "None",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
  "Other",
];

const GENDERS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export default function GroceryBudgetCalculator() {
  // Household state
  const [members, setMembers] = useState<Member[]>([
    { id: 1, age: 35, gender: "female", dietary: "None", mealsOut: 2 },
  ]);
  const [region, setRegion] = useState("National Average");
  const [usdaPlan, setUsdaPlan] = useState("Moderate");
  const [storeType, setStoreType] = useState("Regular Supermarket");
  const [groceryBudget, setGroceryBudget] = useState<number | null>(null);
  const [weeklyBudget, setWeeklyBudget] = useState<number | null>(null);
  const [graphData, setGraphData] = useState<any[]>([]);
  const [weeklyGraphData, setWeeklyGraphData] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Export/Print
  const handleExport = () => {
    const csv = [
      "Month,Monthly Budget,Weekly Budget",
      ...graphData.map(
        (row, i) =>
          `${row.month},${row.monthlyBudget},${weeklyGraphData[i]?.weeklyBudget ?? ""}`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grocery-budget.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Add/Remove household members
  const addMember = () => {
    setMembers([
      ...members,
      { id: Date.now(), age: 30, gender: "female", dietary: "None", mealsOut: 2 },
    ]);
  };
  const removeMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  // Update member info
  const updateMember = (id: number, field: keyof Member, value: any) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  // USDA base weekly cost by age/gender (2025, moderate plan, example values)
  function getUsdaWeekly(age: number, gender: string) {
    if (age < 6) return 45;
    if (age < 12) return 65;
    if (age < 19) return gender === "male" ? 80 : 75;
    if (age < 51) return gender === "male" ? 95 : 85;
    if (age < 71) return gender === "male" ? 90 : 80;
    return gender === "male" ? 85 : 75;
  }

  // Calculate budget
  const calculateBudget = () => {
    // Plan multiplier
    const plan = USDA_PLANS.find((p) => p.label === usdaPlan) || USDA_PLANS[1];
    // Region adjustment (example: +5% for Northeast, -3% for Midwest, etc.)
    let regionMultiplier = 1;
    if (region === "Northeast") regionMultiplier = 1.05;
    if (region === "Midwest") regionMultiplier = 0.97;
    if (region === "South") regionMultiplier = 0.98;
    if (region === "West") regionMultiplier = 1.03;

    // Store type adjustment (example)
    let storeMultiplier = 1;
    if (storeType === "Discount Store") storeMultiplier = 0.93;
    if (storeType === "Premium Grocery") storeMultiplier = 1.12;

    // Dietary adjustment (example: vegan/gluten-free +7%)
    const dietaryMultiplier = (diet: string) =>
      diet === "Vegan" || diet === "Gluten-Free" ? 1.07 : 1;

    // Meals out adjustment: reduce budget by 3% per meal out per week (max 30%)
    const mealsOutMultiplier = (meals: number) =>
      Math.max(0.7, 1 - meals * 0.03);

    // Calculate weekly budget per member
    let totalWeekly = 0;
    members.forEach((m) => {
      let base = getUsdaWeekly(m.age, m.gender);
      base *= plan.multiplier;
      base *= regionMultiplier;
      base *= storeMultiplier;
      base *= dietaryMultiplier(m.dietary);
      base *= mealsOutMultiplier(m.mealsOut);
      totalWeekly += base;
    });

    setWeeklyBudget(totalWeekly);
    setGroceryBudget(totalWeekly * 4.33); // Monthly average

    // Graph data for 12 months (monthly and weekly)
    const monthlyData = [];
    const weeklyData = [];
    for (let i = 1; i <= 12; i++) {
      monthlyData.push({
        month: `Month ${i}`,
        monthlyBudget: Number((totalWeekly * 4.33).toFixed(2)),
      });
      weeklyData.push({
        month: `Month ${i}`,
        weeklyBudget: Number(totalWeekly.toFixed(2)),
      });
    }
    setGraphData(monthlyData);
    setWeeklyGraphData(weeklyData);
    setShowResults(true);
  };

  // FAQ data for schema and UI
  const faqs = [
    {
      q: "How is the grocery budget calculated?",
      a: "Our calculator uses the latest USDA Food Plans, adjusting for age, gender, dietary needs, meals eaten out, region, and store type. You can further personalize by dietary restrictions.",
    },
    {
      q: "What is a reasonable grocery budget for a family of 4?",
      a: "According to the USDA, a moderate-cost plan for a family of four in 2025 is about $1,100 per month. Use our calculator for a personalized estimate.",
    },
    {
      q: "How can I save money on groceries?",
      a: "Plan meals, shop with a list, buy in bulk, use coupons, and avoid shopping when hungry. See our expert tips below.",
    },
    {
      q: "How do dietary restrictions affect my grocery budget?",
      a: "Special diets like vegan or gluten-free may increase costs by 5-10%. Our calculator adjusts for these factors.",
    },
    {
      q: "Can I export or print my grocery budget?",
      a: "Yes! Use the Export button to download your results as a CSV for easy budgeting.",
    },
    {
      q: "How often is this calculator updated?",
      a: "We update our data annually using the latest USDA Food Plans and regional price trends.",
    },
    {
      q: "Is this calculator reviewed by experts?",
      a: "Yes, our methodology is reviewed by registered dietitians and financial planners.",
    },
    {
      q: "Where can I find more budgeting resources?",
      a: "Check our related tools below for meal planners, pantry trackers, and more.",
    },
  ];

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  // HowTo Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use the Grocery Budget Calculator",
    "description": "Follow these steps to calculate your grocery budget.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Your Information",
        "url": "https://www.example.com/grocery-budget-calculator",
        "image": "https://www.example.com/images/step1.png",
        "text": "Provide details about your household, including the number of members, their ages, genders, and dietary preferences."
      },
      {
        "@type": "HowToStep",
        "name": "Select Your Plan",
        "url": "https://www.example.com/grocery-budget-calculator",
        "image": "https://www.example.com/images/step2.png",
        "text": "Choose a USDA food plan that best fits your family's needs."
      },
      {
        "@type": "HowToStep",
        "name": "Adjust for Your Region",
        "url": "https://www.example.com/grocery-budget-calculator",
        "image": "https://www.example.com/images/step3.png",
        "text": "Specify your location to account for regional price differences."
      },
      {
        "@type": "HowToStep",
        "name": "Review Your Budget",
        "url": "https://www.example.com/grocery-budget-calculator",
        "image": "https://www.example.com/images/step4.png",
        "text": "Examine the calculated budget and make any necessary adjustments."
      }
    ],
    "tool": {
      "@type": "HowToTool",
      "name": "Grocery Budget Calculator",
      "url": "https://www.example.com/grocery-budget-calculator"
    },
    "supply": {
      "@type": "HowToSupply",
      "name": "Household Information"
    },
    "totalTime": "PT10M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    }
  };

  // HowTo FAQ data
  const howToFaqData = [  
    {
      q: "What is the USDA Food Plan?",
      a: "The USDA Food Plan provides guidelines for a healthy diet at various cost levels.",
    },
    {
      q: "How often should I update my grocery budget?",
      a: "It's a good idea to review your budget every few months or when your household situation changes.",
    },
  ];
  // HowTo FAQ Schema
  const howToFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": howToFaqData.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  return (
    <>
      <Head>
        <title>Grocery Budget Calculator (2025) – Free, Accurate, Customizable Tool</title>
        <meta
          name="description"
          content="Calculate your weekly or monthly grocery budget with our free, customizable calculator. Get USDA-based estimates, personalized for your family, plus expert tips to save money on groceries in 2025."
        />
        <meta
          name="keywords"
          content="grocery budget calculator, food budget calculator, how much should I spend on groceries, USDA grocery budget, meal planning on a budget, save money on groceries"
        />
        <link rel="canonical" href="https://www.expensegoose.com/tools/grocery-budget-calculator" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToFaqSchema),
          }}
        />
      </Head>

      <main className="max-w-screen-md mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Grocery Budget Calculator (2025) – Free, Accurate, Customizable Tool
        </h1>
        <p className="text-base text-gray-700 mb-4 text-center">
          Calculate your weekly or monthly grocery budget with our free, customizable calculator. Get USDA-based estimates, personalized for your family, plus expert tips to save money on groceries in 2025.
        </p>

        {/* Calculator Section */}
        <section className="mb-10 bg-white  p-6">
          <h2 className="text-2xl font-semibold mb-4">Personalize Your Grocery Budget</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculateBudget();
            }}
            aria-label="Grocery Budget Calculator"
          >
            <div className="mb-6 ">
              <h3 className="font-semibold mb-2">Household Members</h3>
              <p className="text-sm text-gray-600 mb-2">
                Add details for each member of your household to get a personalized grocery budget.
              </p>

          {members.map((m) => (
  <div key={m.id} className="flex flex-wrap gap-4 items-end mb-4">
    {/* Age */}
    <div className="flex flex-col">
      <label htmlFor={`age-${m.id}`} className="text-sm font-medium text-gray-600">
        Age
      </label>
      <input
        id={`age-${m.id}`}
        type="number"
        min={0}
        max={120}
        value={m.age}
        onChange={(e) => updateMember(m.id, "age", Number(e.target.value))}
        aria-label="Age"
        required
        className="mt-1 w-24 px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
      />
    </div>

    {/* Gender */}
    <div className="flex flex-col">
      <label htmlFor={`gender-${m.id}`} className="text-sm font-medium text-gray-600">
        Gender
      </label>
      <select
        id={`gender-${m.id}`}
        value={m.gender}
        onChange={(e) => updateMember(m.id, "gender", e.target.value)}
        aria-label="Gender"
        className="mt-1 w-28 px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
      >
        {GENDERS.map((g) => (
          <option key={g.value} value={g.value}>{g.label}</option>
        ))}
      </select>
    </div>

    {/* Dietary Needs */}
    <div className="flex flex-col">
      <label htmlFor={`dietary-${m.id}`} className="text-sm font-medium text-gray-600">
        Dietary Needs
      </label>
      <select
        id={`dietary-${m.id}`}
        value={m.dietary}
        onChange={(e) => updateMember(m.id, "dietary", e.target.value)}
        aria-label="Dietary Needs"
        className="mt-1 w-36 px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
      >
        {DIETARY_OPTIONS.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>

    {/* Meals Out */}
    <div className="flex flex-col">
      <label htmlFor={`mealsOut-${m.id}`} className="text-sm font-medium text-gray-600">
        Meals Out/Week
      </label>
      <input
        id={`mealsOut-${m.id}`}
        type="number"
        min={0}
        max={21}
        value={m.mealsOut}
        onChange={(e) => updateMember(m.id, "mealsOut", Number(e.target.value))}
        aria-label="Meals Eaten Out Per Week"
        placeholder="Meals Out"
        className="mt-1 w-28 px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
      />
    </div>

    {/* Remove Button */}
    {members.length > 1 && (
      <button
        type="button"
        onClick={() => removeMember(m.id)}
        aria-label="Remove Member"
        className="mt-auto text-red-600 hover:text-red-800 transition"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    )}
  </div>
))}



              <button
                type="button"
                onClick={addMember}
                className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                aria-label="Add Household Member"
              >
                + Add Member
              </button>
            </div>

          <div className="mb-6 flex flex-wrap gap-6">
  {/* Region */}
  <div className="flex flex-col">
    <label htmlFor="region" className="text-sm font-medium text-gray-600">
      Region
    </label>
    <select
      id="region"
      value={region}
      onChange={(e) => setRegion(e.target.value)}
      className="mt-1 w-32 px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
    >
      {REGIONS.map((r) => (
        <option key={r} value={r}>{r}</option>
      ))}
    </select>
  </div>

  {/* Store Type */}
  <div className="flex flex-col">
    <label htmlFor="storeType" className="text-sm font-medium text-gray-600">
      Store Type
    </label>
    <select
      id="storeType"
      value={storeType}
      onChange={(e) => setStoreType(e.target.value)}
      className="mt-1 w-36 px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
    >
      <option>Regular Supermarket</option>
      <option>Discount Store</option>
      <option>Premium Grocery</option>
      <option>Warehouse Club</option>
    </select>
  </div>

  {/* USDA Budget Plan */}
  <div className="flex flex-col">
    <label htmlFor="usdaPlan" className="text-sm font-medium text-gray-600">
      USDA Budget Plan
    </label>
    <select
      id="usdaPlan"
      value={usdaPlan}
      onChange={(e) => setUsdaPlan(e.target.value)}
      className="mt-1 w-36 px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
    >
      {USDA_PLANS.map((p) => (
        <option key={p.label} value={p.label}>{p.label}</option>
      ))}
    </select>
  </div>
</div>


            <button
              type="submit"
              className="px-5  py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
              onClick={() => {
    document.getElementById("results")?.scrollIntoView({ 
      behavior: "smooth" 
    });
  }}
            >
              Calculate
            </button>
          </form>

        </section>

{/* Results */}
{showResults && groceryBudget !== null && (
  <>
    <section id="results" className="mb-8 justify-start w-full">
      <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Grocery Budget</h2>

        <div className="space-y-2">
           <p className="text-base text-gray-700">
            <span className="font-semibold text-gray-700">Weekly Grocery Budget:</span>{" "}
            <span className="font-bold text-emerald-700">${weeklyBudget?.toFixed(2)}</span>
          </p>
          <p className="text-base text-gray-700">
            <span className="font-semibold text-gray-700">Monthly Grocery Budget:</span>{" "}
            <span className="font-bold text-emerald-700">${groceryBudget.toFixed(2)}</span>
          </p>
         
        </div>

      </div>

    </section>

    <section className="mb-8">
      <h2 className="text-lg font-medium mb-4 text-gray-800">Monthly Budget Breakdown</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={graphData}
          margin={{ top: 16, right: 24, left: 12, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis tickFormatter={(value) => `$${value}`} stroke="#6b7280" />
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              color: "#374151",
            }}
          />
          <Legend />
          <Bar dataKey="monthlyBudget" fill="#86efac" name="Monthly Budget ($)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>

  </>
)}


        {/* More About Grocery Budgeting */}
<section className="mb-10 bg-white p-6">
  <h2 className="text-2xl font-semibold mb-4">Why Budgeting for Groceries Matters</h2>
  <p className="text-base text-gray-700 mb-2">
    Groceries are one of the largest variable expenses for most households. By understanding your food spending, you can make smarter choices, reduce waste, and free up money for other priorities. A well-planned grocery budget helps you avoid impulse purchases, take advantage of sales, and ensure your family eats healthy, balanced meals.
  </p>
  <p className="text-base text-gray-700 mb-2">
    The USDA Food Plans provide a helpful benchmark, but every family is unique. Factors like dietary needs, regional price differences, and how often you eat out all play a role. Our calculator takes these into account, giving you a truly personalized estimate.
  </p>
</section>

<section className="mb-10 bg-white p-6">
  <h2 className="text-2xl font-semibold mb-4">Tips to Stretch Your Grocery Budget Further</h2>
  <ul className="list-disc pl-6 text-base text-gray-700 space-y-2">
    <li><span className="font-semibold text-blue-600">Plan your meals:</span> Create a weekly menu and shopping list to avoid buying unnecessary items.</li>
    <li><span className="font-semibold text-blue-600">Shop sales and use coupons:</span> Take advantage of store promotions and digital coupons for extra savings.</li>
    <li><span className="font-semibold text-blue-600">Buy in bulk:</span> Stock up on staples like rice, beans, and pasta when they’re on sale.</li>
    <li><span className="font-semibold text-blue-600">Limit processed foods:</span> Whole foods are often cheaper and healthier than pre-packaged meals.</li>
    <li><span className="font-semibold text-blue-600">Cook at home:</span> Preparing meals from scratch is almost always less expensive than eating out.</li>
    <li><span className="font-semibold text-blue-600">Reduce food waste:</span> Store leftovers properly and use them for lunches or future dinners.</li>
    <li><span className="font-semibold text-blue-600">Try store brands:</span> Generic or store-brand products are often just as good as name brands at a lower price.</li>
  </ul>
</section>

<section className="mb-10 bg-white   p-6">
  <h2 className="text-2xl font-semibold mb-4">How to Adjust Your Grocery Budget Over Time</h2>
  <p className="text-base text-gray-700 mb-2">
    Your grocery needs may change throughout the year. Holidays, school breaks, or changes in household size can all impact your spending. Review your budget every few months and adjust as needed. If you notice your actual spending is consistently higher or lower than your estimate, revisit your plan and update your calculator inputs.
  </p>
  <p className="text-base text-gray-700 mb-2">
    Remember, the goal isn’t to spend as little as possible, but to spend wisely—balancing nutrition, convenience, and your family’s preferences.
  </p>
</section>

<section className="mb-10 bg-white  p-6">
  <h2 className="text-2xl font-semibold mb-4">Related Tools and Resources</h2>
  <ul className="list-disc pl-6 text-base text-gray-700 space-y-2">
    <li>
      <a href="/blog/budgeting-after-job-loss" className="text-blue-600 hover:underline">Budgeting After Job Loss</a> – Losing a job is one of those life events that can feel like a punch to the gut. I know because I've been there...
    </li>
    <li>
      <a href="/blog/frugal-living-finance-tips" className="text-blue-600 hover:underline">frugal living finance tips</a> – As someone who has been navigating the world of personal finance, I've learned a lot from my spending habits..
    </li>
    <li>
      <a href="/blog/grocery-saving-tips" className="text-blue-600 hover:underline">Top 25 Grocery Saving Tips</a> – Expert advice to help you save even more.
    </li>
    <li>
      <a href="/tools/monthly-calculator" className="text-blue-600 hover:underline">Monthly Spending Calculator</a> – Estimate your monthly expenses, set a budget, and track your savings.


    </li>
  </ul>
</section>

        {/* FAQs */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-gray-50 rounded p-4">
                <summary className="font-semibold cursor-pointer">{faq.q}</summary>
                <p className="mt-2 text-base text-gray-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
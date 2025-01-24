import React, { useState } from 'react';
import { 
  Layout, 
  Palette, 
  Monitor, 
  Smartphone, 
  ShoppingBag, 
  Code, 
  Mail,
  ExternalLink
} from 'lucide-react';

const templates = [
  {
    id: 1,
    name: "Modern E-commerce",
    category: "E-commerce",
    description: "A sleek and conversion-optimized template for online stores",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=2340",
    features: ["Product Gallery", "Shopping Cart", "Checkout Flow", "Mobile Responsive"],
    price: "$999"
  },
  {
    id: 2,
    name: "Portfolio Pro",
    category: "Portfolio",
    description: "Showcase your work with this minimalist portfolio design",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=2340",
    features: ["Project Gallery", "About Section", "Contact Form", "Blog Ready"],
    price: "$799"
  },
  {
    id: 3,
    name: "Restaurant Deluxe",
    category: "Business",
    description: "Perfect for restaurants and food service businesses",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2340",
    features: ["Menu Display", "Reservation System", "Location Map", "Photo Gallery"],
    price: "$899"
  }
];

const categories = ["All", "E-commerce", "Portfolio", "Business"];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredTemplates = templates.filter(template => 
    selectedCategory === "All" ? true : template.category === selectedCategory
  );

  return (
    <div className="min-h-screen text-sm bg-gray-50">

      {/* Hero Section */}
      <div className="bg-indigo-700 w-full mb-12 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Premium Website Templates</h2>
          <p className="text-xl text-indigo-100 max-w-2xl">
            Launch your online presence with our professionally designed, fully responsive website templates.
          </p>
        </div>
      </div>

        {/* Category Filter */}
        <div className="flex space-x-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map(template => (
            <div key={template.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="space-y-2 mb-4">
                  {template.features.map(feature => (
                    <div key={feature} className="flex items-center text-sm text-gray-500">
                      <div className="w-1 h-1 bg-indigo-600 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-indigo-600">{template.price}</span>
                  <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default App;

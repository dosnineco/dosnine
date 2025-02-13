import { useState } from "react";
import { 
  BarChart2, 
  Calculator, 
  Mail, 
  DollarSign,
  Settings,
  Search,
  Award
} from "lucide-react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const tools = [
    {
      title: "Website Analytics",
      description: "Track and analyze your website traffic data",
      icon: BarChart2,
      path: "/tools/website-traffic",
      color: "text-blue-600",
      bgHover: "hover:bg-blue-50",
    },
    {
      title: "Leaderboard",
      description: "Track and analyze your Clickaway data",
      icon: BarChart2,
      path: "leaderboard",
      color: "text-orange-600",
      bgHover: "hover:bg-orange-50",
    },
    
    {
      title: "Bespoke Studio",
      description: "See the vision of your site.",
      icon: Award,
      path: "/studio",
      color: "text-yellow-600",
      bgHover: "hover:bg-yellow-50",
    },
    {
      title: "Service Quoting Tool",
      description: "Generate professional service quotes instantly",
      icon: Calculator,
      path: "/tools/quote",
      color: "text-purple-600",
      bgHover: "hover:bg-purple-50",
    },
    {
      title: "Email Template Tool",
      description: "Manage and use email templates efficiently",
      icon: Mail,
      path: "/tools/email-template",
      color: "text-red-600",
      bgHover: "hover:bg-red-50",
    },
    {
      title: "Salary Calculator",
      description: "Convert salary to hourly rates and vice versa",
      icon: DollarSign,
      path: "/tools/salary-to-hourly",
      color: "text-yellow-600",
      bgHover: "hover:bg-yellow-50",
    },
  ];

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
    
            <p className="text-inherit font-semibold text-xl mb-2">
            <Settings className="animate-spin	 inline mr-2"/>

            Dashboard
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-inherit" />
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <a
                  key={tool.path}
                  href={tool.path}
                  className={`group block p-3 py-2 rounded-lg border border-gray-200 transition-all duration-200 ${tool.bgHover}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-2 rounded-lg ${tool.color} bg-opacity-10`}>
                      <Icon className={`w-6 h-6 ${tool.color}`} />
                    </div>
                    <h2 className="text-lg font-semibold text-inherit">
                      {tool.title}
                    </h2>
                  </div>
                  <p className="text-inherit text-sm">
                    {tool.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // For dynamic imports
import { supabase } from "lib/supabase";
import { arrayMove } from "@dnd-kit/sortable";
import { LuArrowUp, LuArrowDown, LuTrash } from "react-icons/lu";
import { FiSave, FiTrash, FiCopy } from 'react-icons/fi';

// Dynamically import components with SSR disabled
const componentMap = {
  BreadcrumbsMinimal: dynamic(() => import("../../components/BreadCrumbs/BreadcrumbsMinimal"), { ssr: false }),
  BreadcrumbsPillStyle: dynamic(() => import("../../components/BreadCrumbs/BreadcrumbsPillStyle"), { ssr: false }),
  BreadcrumbsStepperStyle: dynamic(() => import("../../components/BreadCrumbs/BreadcrumbsStepperStyle"), { ssr: false }),
  BreadcrumbsWithCurrentPage: dynamic(() => import("../../components/BreadCrumbs/BreadcrumbsWithCurrentPage"), { ssr: false }),
  BreadcrumbsWithIcons: dynamic(() => import("../../components/BreadCrumbs/BreadcrumbsWithIcons"), { ssr: false }),
  CalendlyEmbed: dynamic(() => import("../../components/Misc/CalendlyEmbed"), { ssr: false }),
  ContactForm: dynamic(() => import("../../components/ContactForms/ContactForm"), { ssr: false }),
  LegalContactForm: dynamic(() => import("../../components/ContactForms/LegalContactForm"), { ssr: false }),
  MarketingContact: dynamic(() => import("../../components/ContactForms/MarketingContact"), { ssr: false }),
  MedicalContactForm: dynamic(() => import("../../components/ContactForms/MedicalContactForm"), { ssr: false }),
  CountdownTimer: dynamic(() => import("../../components/Misc/CountdownTimer"), { ssr: false }),
  Faq: dynamic(() => import("../../components/Faqs/Faq"), { ssr: false }),
  Footer: dynamic(() => import("../../components/Footers/Footer"), { ssr: false }),
  Header: dynamic(() => import("../../components/Headers/Header"), { ssr: false }),
  Hero: dynamic(() => import("../../components/Heros/Hero"), { ssr: false }),
  Howitworks: dynamic(() => import("../../components/Heros/Howitworks"), { ssr: false }),
  PhoneNumber: dynamic(() => import("../../components/Misc/PhoneNumber"), { ssr: false }),
  Services: dynamic(() => import("../../components/Services/Services"), { ssr: false }),
  WhatsNew: dynamic(() => import("../../components/Heros/WhatsNew"), { ssr: false }),
  HeroCentered: dynamic(() => import("../../components/Heros/HeroCentered.js"), { ssr: false }),
  HeroWithBackground: dynamic(() => import("../../components/Heros/HeroWithBackground.js"), { ssr: false }),
  HeroFullscreen: dynamic(() => import("../../components/Heros/HeroFullscreen"), { ssr: false }),
  HeroSplit: dynamic(() => import("../../components/Heros/HeroSplit"), { ssr: false }),
  HeroMinimal: dynamic(() => import("../../components/Heros/HeroMinimal"), { ssr: false }),
  HeroCards: dynamic(() => import("../../components/Heros/HeroCards"), { ssr: false }),
  HeroVideo: dynamic(() => import("../../components/Heros/HeroVideo"), { ssr: false }),
  AdventureGrid: dynamic(() => import("../../components/Services/AdventureGrid"), { ssr: false }),
  IconCards: dynamic(() => import("../../components/Services/IconCards"), { ssr: false }),
  SplitCards: dynamic(() => import("../../components/Services/SplitCards"), { ssr: false }),
  OverlayShowcase: dynamic(() => import("../../components/Services/OverlayShowcase"), { ssr: false }),
  FeatureCards: dynamic(() => import("../../components/Services/FeatureCards"), { ssr: false }),
};

const servicesList = Array.from({ length: 100 }, (_, i) => `Service ${i + 1}`);

export default function BespokeStudio() {
  const [canvasItems, setCanvasItems] = useState([]);
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase.from("templates").select("*");
      if (error) console.error("Error fetching templates:", error.message);
      else setSavedTemplates(data);
    };

    fetchTemplates();
  }, []);

  const handleDragStart = (event, componentName) => {
    if (typeof window !== "undefined") {
      event.dataTransfer.setData("componentName", componentName);
    }
  };

  const handleDrop = (event) => {
    if (typeof window !== "undefined") {
      const componentName = event.dataTransfer.getData("componentName");
      if (componentName) {
        const newComponent = {
          id: `${componentName}-${canvasItems.length + 1}`, // Unique ID
          name: componentName,
        };
        setCanvasItems((prev) => [...prev, newComponent]);
      }
    }
  };

  const loadTemplate = (template) => {
    setCanvasItems(JSON.parse(template.template));
    setBusinessName(template.business_name);
    setServicesOffered(template.services_offered);
    setSelectedTemplate(template.id);
  };

  const moveComponent = (fromIndex, toIndex) => {
    setCanvasItems((prev) => arrayMove(prev, fromIndex, toIndex));
  };

  const deleteComponent = (index) => {
    setCanvasItems((prev) => prev.filter((_, i) => i !== index));
  };

  const saveTemplate = async () => {
    const templateData = {
      template: JSON.stringify(canvasItems),
      business_name: businessName,
      services_offered: servicesOffered
    };

    if (selectedTemplate) {
      const { error } = await supabase
        .from("templates")
        .update(templateData)
        .eq("id", selectedTemplate);
      if (error) {
        console.error("Error updating template:", error.message);
      } else {
        alert("Template updated successfully!");
      }
    } else {
      const { error } = await supabase
        .from("templates")
        .insert([templateData]);
      if (error) {
        console.error("Error saving template:", error.message);
      } else {
        alert("Template saved successfully!");
      }
    }

    // Clear all fields
    setCanvasItems([]);
    setBusinessName("");
    setServicesOffered("");
    setSelectedTemplate(null);

    // Fetch updated templates
    const { data, error } = await supabase.from("templates").select("*");
    if (error) console.error("Error fetching templates:", error.message);
    else setSavedTemplates(data);
  };

  const deleteTemplate = async () => {
    if (selectedTemplate) {
      const { error } = await supabase
        .from("templates")
        .delete()
        .eq("id", selectedTemplate);
      if (error) {
        console.error("Error deleting template:", error.message);
      } else {
        alert("Template deleted successfully!");
        setCanvasItems([]);
        setBusinessName("");
        setServicesOffered("");
        setSelectedTemplate(null);

        // Fetch updated templates
        const { data, error } = await supabase.from("templates").select("*");
        if (error) console.error("Error fetching templates:", error.message);
        else setSavedTemplates(data);
      }
    }
  };

  const copyComponentsAsList = () => {
    const componentList = canvasItems.map((item) => `<${item.name} />`).join("\n");
    navigator.clipboard
      .writeText(componentList)
      .then(() => {
        alert("Components copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy components:", err);
      });
  };

  return (
    <>
      <header className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Bespoke Studio</h1>
      </header>

      <div className="min-h-screen bg-gray-50 w-full flex flex-col md:flex-row">
        {/* Components Library */}
        <aside className="md:w-64 w-full h-auto md:h-[calc(100vh-4rem)] p-4 bg-white border-r overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Components Library</h2>
          <div className="grid gap-2">
            {Object.keys(componentMap).map((componentName) => (
              <div
                key={componentName}
                draggable
                onDragStart={(e) => handleDragStart(e, componentName)}
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-move shadow-sm"
              >
                <span className="text-sm font-medium text-gray-600">{componentName}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:h-[calc(100vh-4rem)] overflow-y-auto">
          <div 
            className="w-full min-h-[60vh] bg-white rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors p-4 md:p-6"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {canvasItems.length === 0 && (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Drag components here to start building
              </div>
            )}
            
            <div className="space-y-4">
              {canvasItems.map((item, index) => {
                const Component = componentMap[item.name];
                return (
                  <div key={item.id} className="group relative border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute -top-3 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => moveComponent(index, index - 1)}
                        disabled={index === 0}
                        className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50"
                      >
                        <LuArrowUp size={16} />
                      </button>
                      <button
                        onClick={() => moveComponent(index, index + 1)}
                        disabled={index === canvasItems.length - 1}
                        className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50"
                      >
                        <LuArrowDown size={16} />
                      </button>
                      <button
                        onClick={() => deleteComponent(index)}
                        className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      >
                        <LuTrash size={16} />
                      </button>
                    </div>
                    <Component />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls Section */}
          <div className="mt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Services Offered
                </label>
                <input
                  type="text"
                  value={servicesOffered}
                  onChange={(e) => setServicesOffered(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={saveTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiSave size={18} />
                Save Template
              </button>
              <button
                onClick={deleteTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FiTrash size={18} />
                Delete
              </button>
              <button
                onClick={copyComponentsAsList}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <FiCopy size={18} />
                Copy Components
              </button>
            </div>
          </div>
        </main>

        {/* Saved Templates */}
        <aside className="md:w-64 w-full h-auto md:h-[calc(100vh-4rem)] p-4 bg-white border-l overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Saved Templates</h2>
          <div className="space-y-2">
            {savedTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => loadTemplate(template)}
                className={`p-3 rounded-lg border cursor-pointer hover:border-blue-400 transition-colors ${
                  selectedTemplate === template.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <p className="text-sm font-medium text-gray-600 truncate">
                  {template.business_name || "Untitled Template"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(template.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // For dynamic imports
import { supabase } from "lib/supabase";
import { arrayMove } from "@dnd-kit/sortable";
import { LuArrowUp, LuArrowDown, LuTrash } from "react-icons/lu";
import { FiSave, FiTrash, FiCopy } from 'react-icons/fi';

// Dynamically import components with SSR disabled
const componentMap = {
  BreadCrumbs: dynamic(() => import("../components/BreadCrumbs"), { ssr: false }),
  CalendlyEmbed: dynamic(() => import("../components/CalendlyEmbed"), { ssr: false }),
  ContactForm: dynamic(() => import("../components/ContactForm"), { ssr: false }),
  CountdownTimer: dynamic(() => import("../components/CountdownTimer"), { ssr: false }),
  Faq: dynamic(() => import("../components/Faq"), { ssr: false }),
  Footer: dynamic(() => import("../components/Footer"), { ssr: false }),
  Header: dynamic(() => import("../components/Header"), { ssr: false }),
  Hero: dynamic(() => import("../components/Hero"), { ssr: false }),
  Howitworks: dynamic(() => import("../components/Howitworks"), { ssr: false }),
  PhoneNumber: dynamic(() => import("../components/PhoneNumber"), { ssr: false }),
  Services: dynamic(() => import("../components/Services"), { ssr: false }),
  WhatsNew: dynamic(() => import("../components/WhatsNew"), { ssr: false }),
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
      <header className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-6 shadow-md">
        <h1 className="text-4xl font-extrabold text-center tracking-wide">Bespoke Studio</h1>
      </header>
      <div className="min-h-screen bg-gray-100 w-full flex">
        {/* Components Library */}
        <aside className="m-3 rounded-lg w-64 h-screen bg-gray-100 p-4 border-r overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Components Library</h2>
          {Object.keys(componentMap).map((componentName) => (
            <div
              key={componentName}
              draggable
              onDragStart={(e) => handleDragStart(e, componentName)}
              className="p-2 bg-white border rounded mb-2 shadow-sm cursor-pointer"
            >
              {componentName}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main
          className="rounded-lg flex-1 m-3 h-screen bg-gray-100 p-4 overflow-y-auto"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="min-h-[500px] bg-gray-50 border rounded p-4">
            <h2 className="text-lg font-bold mb-4">Canvas</h2>
            {canvasItems.map((item, index) => {
              const Component = componentMap[item.name];
              return (
                <div key={item.id} className="relative mb-2">
                  <div className="absolute top-0 right-0 flex space-x-1">
                    <button
                      onClick={() => moveComponent(index, index - 1)}
                      disabled={index === 0}
                      className="bg-gray-300 text-black px-2 py-1 text-xs rounded disabled:opacity-50 flex items-center"
                    >
                      <LuArrowUp className="mr-1" />
                    </button>
                    <button
                      onClick={() => moveComponent(index, index + 1)}
                      disabled={index === canvasItems.length - 1}
                      className="bg-gray-300 text-black px-2 py-1 text-xs rounded disabled:opacity-50 flex items-center"
                    >
                      <LuArrowDown className="mr-1" />
                    </button>
                    <button
                      onClick={() => deleteComponent(index)}
                      className="bg-red-500 text-white px-2 py-1 text-xs rounded flex items-center"
                    >
                      <LuTrash className="mr-1" />
                    </button>
                  </div>
                  <Component />
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Services Offered
              </label>
              <input
                type="text"
                value={servicesOffered}
                onChange={(e) => setServicesOffered(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex space-x-4">
            <button
                onClick={saveTemplate}
                className="px-4 py-2 bg-blue-500 text-white rounded shadow flex items-center space-x-2"
              >
                <FiSave />
                <span>Save</span>
              </button>
              <button
                onClick={deleteTemplate}
                className="px-4 py-2 bg-red-500 text-white rounded shadow flex items-center space-x-2"
              >
                <FiTrash />
                <span>Delete</span>
              </button>
              <button
                onClick={copyComponentsAsList}
                className="px-4 py-2 bg-green-500 text-white rounded shadow flex items-center space-x-2"
              >
                <FiCopy />
                <span>Copy Components</span>
              </button>
            </div>
          </div>
        </main>

        {/* Saved Templates */}
        <aside className="m-3 rounded-lg w-64 h-screen bg-gray-100 p-4 border-l overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Saved Templates</h2>
          {savedTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => loadTemplate(template)}
              className="p-2 bg-white border rounded mb-2 shadow-sm cursor-pointer"
            >
              Business Name: {template.business_name || "Untitled"}
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
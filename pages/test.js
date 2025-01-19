import { useState } from "react";
import dynamic from "next/dynamic"; // For dynamic imports
import { supabase } from "lib/supabase";
import { arrayMove } from "@dnd-kit/sortable";
import { LuArrowUp, LuArrowDown, LuTrash } from "react-icons/lu";

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
  ImagePopup: dynamic(() => import("../components/ImagePopup"), { ssr: false }),
  Notification: dynamic(() => import("../components/Notification"), { ssr: false }),
  PageViewTracker: dynamic(() => import("../components/PageViewTracker"), { ssr: false }),
  Pagination: dynamic(() => import("../components/Pagination"), { ssr: false }),
  PhoneNumber: dynamic(() => import("../components/PhoneNumber"), { ssr: false }),
  QuillEditor: dynamic(() => import("../components/QuillEditor"), { ssr: false }),
  SearchFilterSort: dynamic(() => import("../components/SearchFilterSort"), { ssr: false }),
  Seo: dynamic(() => import("../components/Seo"), { ssr: false }),
  Services: dynamic(() => import("../components/Services"), { ssr: false }),
  TemplateTable: dynamic(() => import("../components/TemplateTable"), { ssr: false }),
  WhatsNew: dynamic(() => import("../components/WhatsNew"), { ssr: false }),
  YouTubeVideo: dynamic(() => import("../components/YouTubeVideo"), { ssr: false }),
};

export default function BespokeStudio() {
  const [canvasItems, setCanvasItems] = useState([]);

  // Handle drag and drop
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

  const moveComponent = (fromIndex, toIndex) => {
    setCanvasItems((prev) => arrayMove(prev, fromIndex, toIndex));
  };

  const deleteComponent = (index) => {
    setCanvasItems((prev) => prev.filter((_, i) => i !== index));
  };

  const saveTemplate = async () => {
    const { error } = await supabase
      .from("templates")
      .insert([{ template: JSON.stringify(canvasItems) }]);
    if (error) {
      console.error("Error saving template:", error.message);
    } else {
      alert("Template saved successfully!");
    }
  };

  return (
    <>
         <header className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-6 shadow-md">
        <h1 className="text-4xl font-extrabold text-center tracking-wide">
          Bespoke Studio
        </h1>
      </header>
    <div className="min-h-screen bg-gray-100	w-full flex ">
      {/* Components Library */}

      <aside
        className=" m-3  rounded-lg	 w-64 h-screen bg-gray-100 p-4 border-r overflow-y-auto"
      >
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

      {/* Drag-and-Drop Canvas */}
      <main
        className="rounded-lg	 flex-1 m-3 h-screen bg-gray-100 p-4 overflow-y-auto"
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
        <button
          onClick={saveTemplate}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
        >
          Publish
        </button>
      </main>
    </div>
    </>
  );
}

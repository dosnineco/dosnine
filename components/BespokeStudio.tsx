import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Settings, Layout, Type, Image, Menu, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

type ComponentType = {
  id: string;
  type: string;
  variant: string;
};

type DragItem = {
  id: string;
  index: number;
  type: string;
};

const componentTypes = {
  hero: ['centered', 'split', 'fullscreen'],
  features: ['grid', 'list', 'cards'],
  content: ['text-image', 'text-only', 'multi-column'],
  navigation: ['simple', 'dropdown', 'mega-menu'],
};

const Component: React.FC<{
  component: ComponentType;
  index: number;
  moveComponent: (dragIndex: number, hoverIndex: number) => void;
  removeComponent: (id: string) => void;
}> = ({ component, index, moveComponent, removeComponent }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { id: component.id, index, type: 'component' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'component',
    hover: (item: DragItem, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="bg-white rounded-lg shadow-sm p-4 mb-3 cursor-move"
      style={{ opacity }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Layout className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="font-medium text-gray-900">{component.type}</h3>
            <p className="text-sm text-gray-500">Variant: {component.variant}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => moveComponent(index, Math.max(0, index - 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronUp className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => moveComponent(index, index + 1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => removeComponent(component.id)}
            className="p-1 hover:bg-gray-100 rounded text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const BespokeStudio: React.FC = () => {
  const [components, setComponents] = useState<ComponentType[]>([]);
  const [selectedType, setSelectedType] = useState<string>('hero');
  const [selectedVariant, setSelectedVariant] = useState<string>(componentTypes.hero[0]);

  const addComponent = () => {
    const newComponent = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedType,
      variant: selectedVariant,
    };
    setComponents([...components, newComponent]);
  };

  const moveComponent = (dragIndex: number, hoverIndex: number) => {
    const newComponents = [...components];
    const [removed] = newComponents.splice(dragIndex, 1);
    newComponents.splice(hoverIndex, 0, removed);
    setComponents(newComponents);
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter((c) => c.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bespoke Studio</h1>
        <p className="text-gray-600">
          Build your website by selecting and arranging components
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Component Library</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Component Type
                </label>
                <select
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setSelectedVariant(componentTypes[e.target.value as keyof typeof componentTypes][0]);
                  }}
                >
                  {Object.keys(componentTypes).map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Variant
                </label>
                <select
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                >
                  {componentTypes[selectedType as keyof typeof componentTypes].map((variant) => (
                    <option key={variant} value={variant}>
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={addComponent}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Add Component
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px]">
            <h2 className="text-xl font-semibold mb-4">Website Preview</h2>
            {components.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Settings className="w-12 h-12 mb-2" />
                <p>Drag and drop components to build your website</p>
              </div>
            ) : (
              <div className="space-y-2">
                {components.map((component, index) => (
                  <Component
                    key={component.id}
                    component={component}
                    index={index}
                    moveComponent={moveComponent}
                    removeComponent={removeComponent}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BespokeStudio;
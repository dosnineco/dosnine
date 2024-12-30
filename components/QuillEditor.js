import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles

const QuillEditor = ({ template, onClose, onSave }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = new Quill(quillRef.current, {
        theme: 'snow',
      });

      quill.root.innerHTML = template.template_content; // Set the initial content

      // Handle save button click
      const handleSaveClick = () => {
        const updatedContent = quill.root.innerHTML;
        onSave({ ...template, template_content: updatedContent });
        onClose();
      };

      // Handle copy button click
      const handleCopyClick = () => {
        const range = document.createRange();
        range.selectNodeContents(quill.root);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
        alert('Content copied to clipboard');
      };

      // Attach the save handler to the save button
      const saveButton = document.getElementById('save-button');
      if (saveButton) {
        saveButton.addEventListener('click', handleSaveClick);
      }

      // Attach the copy handler to the copy button
      const copyButton = document.getElementById('copy-button');
      if (copyButton) {
        copyButton.addEventListener('click', handleCopyClick);
      }

      // Clean up the event listeners on unmount
      return () => {
        if (saveButton) {
          saveButton.removeEventListener('click', handleSaveClick);
        }
        if (copyButton) {
          copyButton.removeEventListener('click', handleCopyClick);
        }
      };
    }
  }, [template, onSave, onClose]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-xl font-bold mb-4">Edit Template</h2>
        <div ref={quillRef} className="mb-4" style={{ height: '300px' }}></div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="py-1 px-3 bg-red-500 text-white rounded-md">
            Cancel
          </button>
          <button id="save-button" className="py-1 px-3 bg-blue-500 text-white rounded-md">
            Save
          </button>
          <button id="copy-button" className="py-1 px-3 bg-green-500 text-white rounded-md">
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuillEditor;
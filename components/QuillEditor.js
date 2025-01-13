import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles

const QuillEditor = ({ template, onClose, onSave }) => {
  const quillRef = useRef(null);
  const [subject, setSubject] = useState(template.subject);
  const [recipient, setRecipient] = useState(template.recipient);

  useEffect(() => {
    if (quillRef.current) {
      const quill = new Quill(quillRef.current, {
        theme: 'snow',
      });

      quill.root.innerHTML = template.template_content; // Set the initial content

      // Handle save button click
      const handleSaveClick = () => {
        const updatedContent = quill.root.innerHTML;
        onSave({ ...template, subject, recipient, template_content: updatedContent });
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
  }, [template, subject, recipient, onSave, onClose]);

  return (
    <div className="z-100 fixed inset-0 bg-white flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full h-full max-h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Template</h2>
          <button onClick={onClose} className="text-inherit">
            Exit
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-inherit font-bold mb-2" htmlFor="subject">
            Subject:
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="h-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-inherit font-bold mb-2" htmlFor="recipient">
            Recipient:
          </label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="h-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div ref={quillRef} className="mb-4 h-96"></div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="py-1 px-3 bg-red-500 text-inherit rounded-md">
            Cancel
          </button>
          <button id="save-button" className="py-1 px-3 bg-blue-500 text-inherit rounded-md">
            Save
          </button>
          <button id="copy-button" className="py-1 px-3 bg-green-500 text-inherit rounded-md">
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuillEditor;
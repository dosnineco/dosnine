import { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const convertToText = () => {
    // Split text by new lines, then split each line by tabs or spaces
    const rows = inputText.split('\n').map(row => row.trim().split(/\s+/));
    
    // Convert rows back to a formatted string
    const formattedText = rows.map(row => row.join('\t')).join('\n');
    setOutputText(formattedText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
    setCopied(true)
  };

  return (
    <div className="min-h-screen mt-7 container mx-auto">
      <div className="mx-auto bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-inherit mb-6 text-center"> Text to excel converter</h1>

        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg mb-4"
          rows="10"
          value={inputText}
          onChange={handleTextChange}
          placeholder="Paste your text here"
        />

        <div className="text-center mb-4">
          <button
            onClick={convertToText}
            className="bg-emerald-500 text-inherit px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Convert to Text
          </button>
        </div>

        {outputText && (
          <div>
        
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg mb-4"
              rows="10"
              value={outputText}
              readOnly
            />
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 text-sm "
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
           
          </div>
        )}
      </div>
    </div>
  );
}
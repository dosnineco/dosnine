import { useRouter } from 'next/router';
import { FaEdit, FaTrash, FaThumbtack, FaEye } from 'react-icons/fa';

export default function TemplateTable({ templates, handlePin, handleDelete, setSelectedTemplate }) {
    const router = useRouter();

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Email Templates</h2>

            <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-4 font-medium text-inherit border-b border-gray-300">Subject</th>
                        {/* <th className="px-6 py-4 font-medium text-inherit border-b border-gray-300">Recipient</th> */}
                        <th className="px-6 py-4 font-medium text-inherit border-b border-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {templates.map((template) => (
                        <tr key={template.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 border-b border-gray-300">
                                <input
                                    type="text"
                                    value={template.subject}
                                    onChange={(e) =>
                                        setTemplates((prevTemplates) =>
                                            prevTemplates.map((t) =>
                                                t.id === template.id ? { ...t, subject: e.target.value } : t
                                            )
                                        )
                                    }
                                    className="h-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </td>
                    
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    onClick={() => handlePin(template.id, template.is_pinned)}
                                    className={`p-2 rounded-md ${template.is_pinned ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-black'}`}
                                    title="Pin/Unpin"
                                >
                                    <FaThumbtack />
                                </button>
                                <button
                                    onClick={() => setSelectedTemplate(template)}
                                    className="p-2 bg-blue-500 text-white rounded-md"
                                    title="Edit"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(template.id)}
                                    className="p-2 bg-red-500 text-white rounded-md"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                                <button
                                    onClick={() => router.push(`/template/${template.id}`)}
                                    className="p-2 bg-purple-500 text-white rounded-md"
                                    title="View"
                                >
                                    <FaEye />
                                </button>
                       
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
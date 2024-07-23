import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";

const FileUpload = ({ getFiles }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("LEGAL");
  const [loading, setLoading] = useState(false);
  const [canMemberSee, setCanMemberSee] = useState(false);

  const { user } = useContext(UserContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file && !title) {
      setTitle(file.name);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!selectedFile) {
      toast.error("No file selected");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("category", category);
    formData.append("owner", canMemberSee ? 'user' : user.user.role.toLowerCase());

    try {
      const response = await fetch(
        `http://localhost:3002/api/document/upload/${title}`,
        {
          method: "POST",
          headers: { authorization: user.token },
          body: formData,
        }
      );
      const result = await response.json();
      if (result.success) {
        getFiles();
        toast.success("File uploaded successfully");
        resetForm();
      } else {
        toast.error("Error uploading the file");
      }
    } catch (error) {
      console.error("Error during file upload", error);
      toast.error("Error during file download");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setTitle("");
    setCategory("LEGAL");
    setCanMemberSee(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Download a file</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          File title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the file title"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <option value="LEGAL">Legal</option>
          <option value="TECH">Technical</option>
          <option value="BUSINESS">Business</option>
          <option value="ACADEMIC">Academic</option>
          <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-1">
            File
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="fileUpload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input id="fileUpload" name="fileUpload" type="file" className="sr-only" onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, PDF until 10MB</p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <input
            id="canMemberSee"
            type="checkbox"
            checked={canMemberSee}
            onChange={(e) => setCanMemberSee(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="canMemberSee" className="ml-2 block text-sm text-gray-900">
          Visible to members
          </label>
        </div>
        {selectedFile && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{selectedFile.name} selected</span>
          </div>
        )}
        <button
          onClick={handleUpload}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Download the file
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;

const Loader = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);
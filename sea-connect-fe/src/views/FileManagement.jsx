import React, { useContext, useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import { UserContext } from "../Context/UserContext";
import FilesList from "../adminComponents/FilesManagement/FilesList";

const FileManagement = () => {
  const [userFiles, setUserFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(UserContext);

  const getAllFiles = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:3002/api/document", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data.length) {
          setUserFiles(result.data);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllFiles();
  }, []);

  const filteredFiles = userFiles.filter(file =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <div className="p-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Files Management</h2>
      </div>

      {user.role === 'ADMIN' && <FileUpload getFiles={getAllFiles} />}

      <h2 className="p-4 text-2xl">My Files</h2>

      <div className="px-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or categorie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {filteredFiles.length ? (
        <FilesList files={filteredFiles} setUserFiles={setUserFiles} />
      ) : (
        <h2 className="text-center">No file found</h2>
      )}
    </section>
  );
};

export default FileManagement;
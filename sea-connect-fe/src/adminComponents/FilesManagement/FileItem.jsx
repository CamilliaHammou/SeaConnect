import React from 'react';

const FileItem = ({ file, user, onDelete }) => {
  const downloadFile = (title) => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", user.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://185.216.27.140:3002/api/document/${title}`, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = title;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-white p-4 mb-2 rounded-md shadow-md flex items-center justify-between">
      <h2 className="font-medium text-lg">{file.title}</h2>

      <div>
        <p className="text-sm text-gray-500">{file.category}</p>
      </div>
      <div>
        <button
          onClick={() => downloadFile(file.title)}
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md mr-2"
        >
          Download
        </button>
        {user.role === 'ADMIN' && (
          <button
            onClick={() => onDelete(file.title)}
            className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default FileItem;

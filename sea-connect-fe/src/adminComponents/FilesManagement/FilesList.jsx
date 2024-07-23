import { useContext } from "react";
import FileItem from "./FileItem";
import { UserContext } from "../../Context/UserContext";
import { toast } from 'react-toastify';

const FilesList = ({ files, setUserFiles }) => {
  const { user } = useContext(UserContext);

  const deleteFile = (title) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", user.token);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:3002/api/document/delete/${title}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          //update the file list by removing the deleted file
          const updatedFiles = files.filter(file => file.title !== title);
          setUserFiles(updatedFiles);
          toast.success("File Deleted");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error deleting file");
      });
  }

  const renderFiles = files.map((file) => (
    <FileItem file={file} key={file.id} user={user} onDelete={deleteFile} />
  ));
  
  return <div>{renderFiles}</div>;
};

export default FilesList;


















// import { useContext } from "react";
// import FileItem from "./FileItem";
// import { UserContext } from "../../Context/UserContext";

// const FilesList = ({ files }) => {
//   const { user } = useContext(UserContext);

//   const renderFiles = files.map((file) => (
//     <FileItem file={file} key={file.id} user={user} />
//   ));
//   return <div>{renderFiles}</div>;
// };

// export default FilesList;



// const deleteFile = (itle) => {
//   const myHeaders = new Headers();
//   myHeaders.append("authorization", user.token);

//   const requestOptions = {
//     method: "DELETE",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   fetch(`http://localhost:3002/api/document/${title}`, requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       if (result.success) {
//         getFiles();
//         toast.success("File Deleted");
//       }
//     })
//     .catch((error) => console.error(error));
// }

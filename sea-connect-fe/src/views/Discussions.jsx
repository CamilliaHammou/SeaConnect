import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { UserContext } from "../Context/UserContext";

const Discussions = () => {
  const { user } = useContext(UserContext);
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!user) return;
    fetchDiscussions();
  }, [user]);

  const fetchDiscussions = () => {
    const requestOptions = {
      method: "GET",
      headers: { "authorization": user.token },
      redirect: "follow",
    };

    fetch("http://localhost:3002/api/discussion/", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setDiscussions(result.data);
        }
      })
      .catch(error => console.error('Failed to load discussions', error));
  };

  const selectDiscussion = async (discussionId) => {
    setSelectedDiscussion(discussionId);
    const requestOptions = {
      method: "GET",
      headers: { "authorization": user.token },
      redirect: "follow",
    };

    const response = await fetch(`http://localhost:3002/api/discussion/get-comment/${discussionId}`, requestOptions);
    const result = await response.json();
    if (result.success) {
      setComments(result.data);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!commentId) {
      console.error('Comment ID is undefined');
      return;
    }

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authorization": user.token
      }
    };

    try {
      const response = await fetch(`http://localhost:3002/api/discussion/delete-comment/${commentId}`, requestOptions);
      const result = await response.json();
      if (result.success) {
        setComments(comments.filter(comment => comment.id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment', error);
    }
  };

  const openModal = (event, discussionId) => {
    event.stopPropagation();
    setSelectedDiscussion(discussionId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": user.token
      },
      body: JSON.stringify({ comment: newComment, discussionId: selectedDiscussion }),
    };

    try {
      const response = await fetch(`http://localhost:3002/api/discussion/add-comment`, requestOptions);
      const result = await response.json();
      if (result.success) {
        setComments([...comments, { ...result.data, userEmail: user.user.email, date: new Date().toISOString() }]);
        setNewComment('');
        closeModal();
      }
    } catch (error) {
      console.error('Failed to submit comment', error);
    }
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="mx-auto max-w-[1200px]">
          <div className="bg-red-500 my-6 text-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">No User Found</h2>
            <p className="text-lg">Log Into Your Account</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row mx-auto max-w-[1200px] my-6 me-0">
        <div className="md:w-2/3 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Discussions</h2>
          <ul>
            {discussions.map(discussion => (
              <li key={discussion.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => selectDiscussion(discussion.id)}>
                <h3 className="font-semibold">{discussion.title}</h3>
                <p>{discussion.description}</p>
                <button onClick={(e) => openModal(e, discussion.id)} className="mt-2 text-blue-500 hover:text-blue-700">Add Comment</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/3 bg-white p-4 rounded-lg shadow-md mt-6 md:mt-0 md:ml-6">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          <ul>
            {comments.map(comment => (
              <li key={comment.id} className="p-2 border-b">
                <p><strong>{comment.userEmail}</strong> commented on <strong>{new Date(comment.date).toLocaleString()}</strong>:</p>
                <p>{comment.comment}</p>
                <button onClick={() => handleDeleteComment(comment.id)} className="text-red-500 hover:text-red-700">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add a Comment</h2>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
            />
            <div className="mt-4 flex justify-end">
              <button onClick={closeModal} className="mr-2 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">Cancel</button>
              <button onClick={handleSubmitComment} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Submit Comment</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Discussions;

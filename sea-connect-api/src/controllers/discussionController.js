import Discussion from "../models/discussion.js";

const startDiscussion = async (req, res) => {
  const body = req.body;

  if (!body.title || !body.description) return res.status(400).json({ message: "fields are missing", success: false });

  const data = {
    title: body.title,
    description: body.description,
    date: new Date(),
  }

  try {
    const discussion = await Discussion.createDiscussion(data);
    res.status(201).json({ message: "Discussion created successfully", success: true, data: discussion });
  } catch (err) {
    res.status(500).json({ message: "Error creating Discussion", success: false, error: err.message });
  }
}

const addComment = async (req, res) => {
  const body = req.body;

  if (!body.comment || !body.discussionId) return res.status(400).json({ message: "fields are missing", success: false });

  const data = {
    comment: body.comment,
    discussionId: body.discussionId,
    date: new Date(),
    userId: req.user.id,
    userEmail: req.user.email
  }

  try {
    const comment = await Discussion.addComment(data);
    res.status(201).json({ message: "Comment added successfully", success: true, data: comment });
  } catch (err) {
    res.status(500).json({ message: "Error adding comment", success: false, error: err.message });
  }
}


const getComments = async (req, res) => {
  const discussionId = req.params.discussionId;
  if (!discussionId) return res.status(400).json({ message: "Discussion ID is required", success: false });

  try {
    const comments = await Discussion.getComments(discussionId);
    res.status(200).json({ message: "Comments retrieved successfully", success: true, data: comments });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Comments", success: false, error: err.message });
  }
}

const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;

  if (!commentId) return res.status(400).json({ message: "Comment ID is required", success: false });

  try {
    const comment = await Discussion.deleteComment(commentId, req.user);
    res.status(200).json({ message: "Comment deleted successfully", success: true, data: comment });
  } catch (err) {
    res.status(500).json({ message: "Error deleting Comment", success: false, error: err.message });
  }
}

const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.getAllDiscussions();
    res.status(200).json({ message: "Discussions retrieved successfully", success: true, data: discussions });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Discussions", success: false, error: err.message });
  }
}

export { startDiscussion, addComment, getComments, deleteComment, getAllDiscussions }

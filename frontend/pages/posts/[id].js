// frontend/pages/posts/[id].js (Display, Update, Delete Post)
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPost, updatePost, deletePost } from '../../lib/api';

function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);  // Edit mode state
  const [editedContent, setEditedContent] = useState(''); // State for edited content

    const refreshPost = async () => {
    if (id) {
    try {
    const fetchedPost = await getPost(id);
    setPost(fetchedPost);
    setEditedContent(fetchedPost.content); // Initialize for editing
    setLoading(false);
    } catch (err) {
    setError(err);
    setLoading(false);
    }
    }
    };
  useEffect(() => {

      refreshPost()
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updatePost(id, { content: editedContent });
      setEditMode(false); // Exit edit mode on successful update
      refreshPost();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id);
      router.push('/'); // Redirect to home page after deletion
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      {editMode ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{post.content}</p>
          <p>By: {post.user.username}</p>
          <button onClick={() => setEditMode(true)}>Edit Post</button>
          <button onClick={handleDelete}>Delete Post</button>
        </div>
      )}
    </div>
  );
}

export default PostPage;
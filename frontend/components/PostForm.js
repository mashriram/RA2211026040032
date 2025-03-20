 // frontend/components/PostForm.js (Create and Update Post form)
 import { useState } from 'react';

 function PostForm({ onPostCreated, existingPost, onPostUpdated }) {
   const [content, setContent] = useState(existingPost ? existingPost.content : '');
   const [userId, setUserId] = useState(existingPost ? existingPost.userId : ''); // For simplicity
     const [message, setMessage] = useState('')

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       if (existingPost) {
         // Update existing post
         await onPostUpdated(existingPost.id, { content, userId });
         setMessage("Updated")
       } else {
         // Create new post
         await onPostCreated({ content, userId: parseInt(userId, 10) }); // Ensure userId is a number
           setMessage('Created')
       }
       setContent(''); // Clear form after successful submission
       setUserId('');
     } catch (error) {
       console.error("Form submission failed:", error);
       setMessage("Failed")
     }
   };

   return (
     <form onSubmit={handleSubmit}>
       <textarea
         value={content}
         onChange={(e) => setContent(e.target.value)}
         placeholder="What's on your mind?"
         required
       />
         {
             !existingPost && (
                 <input
                     type="number"
                     value={userId}
                     onChange={(e) => setUserId(e.target.value)}
                     placeholder="User ID"
                     required
                 />
             )
         }

       <button type="submit">{existingPost ? 'Update Post' : 'Create Post'}</button>
         {message && <p>{message}</p>}
     </form>
   );
 }

 export default PostForm;
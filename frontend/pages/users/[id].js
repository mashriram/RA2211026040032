import { useRouter } from 'next/router';
    import { useEffect, useState } from 'react';
    import UserProfile from '../../components/UserProfile';
    import { getUser, updateUser, deleteUser} from '../../lib/api';
    import {useRouter} from "next/navigation";

    function UserPage() {
        const router = useRouter();
        const { id } = router.query;
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [editMode, setEditMode] = useState(false);
        const [editedUsername, setEditedUsername] = useState('');

        useEffect(() => {
            if (id) {
                async function fetchUser() {
                    try {
                        const data = await getUser(id);
                        setUser(data);
                        setEditedUsername(data.username); // Initialize edited username
                        setLoading(false);
                    } catch (err) {
                        setError(err);
                        setLoading(false);
                    }
                }
                fetchUser();
            }
        }, [id]);

        const handleUpdate = async () => {
            try {
                await updateUser(id, { username: editedUsername });
                // Refresh user data after update
                const updatedUser = await getUser(id);
                setUser(updatedUser);
                setEditMode(false); // Exit edit mode

            } catch (error) {
                console.error("Update failed", error);
            }
        };
        const handleDelete = async() => {
            try{
                await deleteUser(id)
                await router.push('/')
            }
            catch(error){
                console.error('Delete error', error)
            }
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (!user) {
            return <div>User not found.</div>;
        }
        return (
            <div>
                {editMode ? (
                    <div>
                        <input
                            type="text"
                            value={editedUsername}
                            onChange={(e) => setEditedUsername(e.target.value)}
                        />
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <UserProfile user={user} />
                        <button onClick={() => setEditMode(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete User</button>
                    </div>
                )}

            </div>
        );
    }

    export default UserPage;
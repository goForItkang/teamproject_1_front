import {useEffect, useState} from "react";
import {deleteLike, getLikes, postLike} from "../api/LikeApi";
import styles from "../css/likeTool.module.css";
import {FaRegThumbsUp, FaThumbsUp} from "react-icons/fa";


const LikeTool = ( data ) => {
    const commentId = data.commentId
    // console.log("commentId : " + commentId)
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                setLoading(true);
                const response = await getLikes(commentId);
                setLikes(response.totalLike || 0);
                setIsLiked(response.clicked || false);
            } catch (error) {
                console.error('Error fetching likes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLikes();
    }, [commentId]);

    const handleLike = async () => {
        try {
            setLoading(true);
            await postLike(commentId);
            setLikes((prev) => prev + 1);
            setIsLiked(true);
        } catch (error) {
            console.error('Error adding like:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUnlike = async () => {
        try {
            setLoading(true);
            await deleteLike(commentId);
            setLikes((prev) => Math.max(0, prev - 1));
            setIsLiked(false);
        } catch (error) {
            console.error('Error removing like:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={`${styles.button} ${isLiked ? styles.buttonLiked : styles.buttonUnliked}`}
            onClick={isLiked ? handleUnlike : handleLike}
            disabled={loading}
        >
            {loading ? '...' : (
                <>
                    {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                    {" " +likes}
                </>
            )}
        </button>
    );
};

export default LikeTool;
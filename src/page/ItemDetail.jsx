// src/page/ItemDetail.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../api/ItemApi";
import { getEmail } from '../utils/Jwt';

import styles from "../css/itemDetail.module.css";
import {
    createChildComment,
    createComment,
    deleteComment,
    getChildComments,
    getItemComments,
    patchComment
} from "../api/CommentApi";
import LikeTool from "../component/LikeTool";
import RatingTool from "../component/RatingTool";

const ItemDetail = () => {
    return (
        <>
            <ItemDetailForm />
            <CommentForm />
        </>
    );
};

const ItemDetailForm = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);

    const fetchItemDetail = async (itemId) => {
        try {
            const data = await getItem(itemId);
            setItem(data);
        } catch (error) {
            console.error("상품 상세 정보를 가져오는데 실패했습니다.", error);
        }
    };

    useEffect(() => {
        if (itemId) {
            fetchItemDetail(itemId);
        }
    }, [itemId]);

    if (!item) return <p>상품 정보를 로딩 중...</p>;

    return (
        <div className={styles.itemContainer}>
            <div className={styles.itemImageSection}>
                <img src={item.itemImg} alt={item.itemName} className={styles.itemImage}/>
            </div>
            <div className={styles.itemInfoSection}>
                <h1 className={styles.itemTitle}>{item.itemName}</h1>
                <p className={styles.itemDescription}>{item.itemDesc}</p>
                <div className={styles.priceSection}>
                    <span className={styles.originalPrice}>{item.itemPrice.toLocaleString()}원</span>
                    <span className={styles.stock}>
                        재고: {item.itemStock > 0 ? `${item.itemStock}개` : "품절"}
                    </span>
                </div>
                <div className={styles.extraInfo}>
                    <p>브랜드: {item.itemBrand}</p>
                    <p>카테고리: {item.category}</p>
                    <p>평점: {item.averageRating}</p>
                    <button className={styles.buyButton}> 구매하기</button>
                </div>
            </div>
        </div>
    );
};

const CommentForm = () => {
    const {itemId} = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [childComments, setChildComments] = useState({});
    const [newChildComment, setNewChildComment] = useState({});
    const [expandedComments, setExpandedComments] = useState({});
    const [editingComment, setEditingComment] = useState(null);
    const [updatedComment, setUpdatedComment] = useState('');
    const [email, setEmail] = useState('');
    const [newRating, setNewRating] = useState(0);

    useEffect(() => {
        const email = getEmail();
        setEmail(email);
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            const itemComments = await getItemComments(itemId);
            setComments(itemComments);
        };

        fetchComments();
    }, [itemId]);

    const handleCommentSubmit = async () => {
        if (newRating === 0) {
            alert("평점을 입력하세요")
            return;
        }

        if (!newComment) return;

        const commentData = {
            content: newComment,
            rating : newRating
        };
        const success = await createComment(itemId, commentData);

        if (success) {
            setNewComment('');
            const itemComments = await getItemComments(itemId);
            setComments(itemComments);
        }
    };

    const refreshChild = async(parentId) => {
        const children = await getChildComments(parentId);
        setChildComments(prevState => ({
            ...prevState,
            [parentId]: children
        }));
    }

    const handleChildCommentSubmit = async (parentId) => {
        const childCommentData = { content: newChildComment[parentId] };

        const success = await createChildComment(parentId, childCommentData);

        if (success) {
            setNewChildComment(prevState => ({
                ...prevState,
                [parentId]: ''
            }));

            refreshChild(parentId)

        }
    };

    const toggleViewReplies = async (parentId) => {
        if (expandedComments[parentId]) {
            setExpandedComments(prevState => ({
                ...prevState,
                [parentId]: false
            }));
        } else {
            // 이미 댓글을 가져왔으면 다시 요청하지 않도록 처리
            if (!childComments[parentId]) {
                const children = await getChildComments(parentId);
                setChildComments(prevState => ({
                    ...prevState,
                    [parentId]: children
                }));
            }

            setExpandedComments(prevState => ({
                ...prevState,
                [parentId]: true
            }));
        }
    };

    const handleEditClick = (comment) => {
        setEditingComment(comment);
        setUpdatedComment(comment.content);
    };

    const handleUpdateComment = async () => {
        if (!updatedComment) return;

        const updatedCommentData = { ...editingComment, content: updatedComment };
        const success = await patchComment(updatedCommentData);

        if (success) {
            setEditingComment(null);
            setUpdatedComment('');
            const itemComments = await getItemComments(itemId);
            setComments(itemComments);
        }
    };

    const handleUpdateChildComment = async (parentId) => {
        if (!updatedComment) return;

        const updatedCommentData = { ...editingComment, content: updatedComment };
        const success = await patchComment(updatedCommentData);

        if (success) {
            setNewChildComment(prevState => ({
                ...prevState,
                [parentId]: ''
            }));
            refreshChild(parentId)
        }
    };


    const handleDeleteComment = async (commentId) => {
        const success = await deleteComment(commentId);

        if (success) {
            const itemComments = await getItemComments(itemId);
            setComments(itemComments);
        }
    };

    const handleDeleteChildComment = async (parentId, commentId) => {
        const success = await deleteComment(commentId);

        if (success) {
            refreshChild(parentId)
        }
    };



    return (
        <div className={styles.commentSection}>
            <h2>댓글 작성</h2>

            <RatingTool selectedRating={newRating} setSelectedRating={setNewRating}/>
            <textarea
                className={styles.textarea}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 작성하세요"
            />
            <button className={styles.submitButton} onClick={handleCommentSubmit}>댓글 작성</button>

            <h2>댓글 목록</h2>
            {comments.length ? (
                comments.map((comment) => (
                    comment.parentCommentId == null &&
                    <div key={comment.id} className={styles.commentBox}>


                        <div className={styles.commentHeader}>
                            <strong>{comment.email}</strong> ({new Date(comment.created_date).toLocaleString()})
                            {` - 평점 : ${comment.rating}`}
                        </div>
                        {editingComment?.id === comment.id ? (
                            <div className={styles.editComment}>
                                <textarea
                                    className={styles.textarea}
                                    value={updatedComment}
                                    onChange={(e) => setUpdatedComment(e.target.value)}
                                />
                                <button className={styles.submitButton} onClick={handleUpdateComment}>수정 완료</button>
                            </div>
                        ) : (
                            <p className={styles.commentText}>{comment.content}</p>
                        )}
                        <div className={styles.commentActions}>
                            {email === comment.email && (
                                <div>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => handleEditClick(comment)}
                                    >
                                        수정
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDeleteComment(comment.id)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            className={styles.toggleRepliesButton}
                            onClick={() => toggleViewReplies(comment.id)}
                        >
                            {expandedComments[comment.id] ? "댓글 닫기" : "댓글 보기"}
                        </button>

                        {/*좋아요*/}
                        <LikeTool commentId = {comment.id} />


                        {expandedComments[comment.id] && (
                            <div className={styles.childComments}>
                                {childComments[comment.id]?.length ? (
                                    childComments[comment.id].map((childComment) => (
                                        <div key={childComment.id} className={styles.childComment}>
                                            <p><strong>{childComment.email}</strong> ({new Date(childComment.created_date).toLocaleString()})</p>
                                            {editingComment?.id === childComment.id ? (
                                                <div className={styles.editComment}>
                                                    <textarea
                                                        className={styles.textarea}
                                                        value={updatedComment}
                                                        onChange={(e) => setUpdatedComment(e.target.value)}
                                                    />
                                                    <button className={styles.submitButton} onClick={() => {handleUpdateChildComment(comment.id); setEditingComment(null);}}>수정 완료</button>
                                                </div>
                                            ) : (
                                                <p>{childComment.content}</p>
                                            )}
                                            <div className={styles.commentActions}>
                                                {email === childComment.email && (
                                                    <div>
                                                        <button
                                                            className={styles.editButton}
                                                            onClick={() => handleEditClick(childComment)}
                                                        >
                                                            수정
                                                        </button>
                                                        <button
                                                            className={styles.deleteButton}
                                                            onClick={() => handleDeleteChildComment(comment.id,childComment.id)}
                                                        >
                                                            삭제
                                                        </button>
                                                    </div>
                                                )}
                                                <LikeTool commentId={childComment.id} />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>댓글이 없습니다.</p>
                                )}
                            </div>
                        )}

                        <div className={styles.childCommentInput}>
                            <textarea
                                className={styles.textarea}
                                value={newChildComment[comment.id] || ''}
                                onChange={(e) => setNewChildComment(prevState => ({
                                    ...prevState,
                                    [comment.id]: e.target.value
                                }))}
                                placeholder="댓글을 작성하세요"
                            />
                            <button
                                className={styles.submitButton}
                                onClick={() => handleChildCommentSubmit(comment.id)}
                            >
                                댓글 작성
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>댓글이 없습니다.</p>
            )}
        </div>
    );
};




export default ItemDetail;

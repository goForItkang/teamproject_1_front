import {useParams} from "react-router-dom";
import {createContext, useContext, useEffect, useState} from "react";
import {createItem, getItem} from "../api/ItemApi";
import styles from '../css/itemReview.module.css';
import {StarRating} from "../component/RatingTool";
import {SubmitButton} from "../component/SubmitButton";
import {createComment2, createParentComment} from "../api/CommentApi";

const ItemReview = () => {
    useEffect(() => {
        const header = document.querySelector("header"); // <Header>를 감싼 태그 찾기
        if (header) header.style.display = "none"; // 숨기기

        return () => {
            if (header) header.style.display = "block"; // 페이지 나갈 때 다시 보이게 하기
        };
    }, []);


    return(
        <>
            <ReviewContextProvider>
                <ReviewForm/>
            </ReviewContextProvider>
        </>
    )
}

const ReviewForm = () => {
    const {itemId} = useParams();
    const {selectedStars, setSelectedStars} = useContext(ReviewContext)
    const {reviewContent, setReviewContent} = useContext(ReviewContext)
    const {imageFiles, setImageFiles} = useContext(ReviewContext)

    const  [item, setItem] = useState('');

    const fetchItemDetail = async (itemId) => {
        try {
            const data = await getItem(itemId);
            setItem(data);

            // console.table(data)
        } catch (error) {
            console.error("상품 상세 정보를 가져오는데 실패했습니다.", error);
        }
    };

    useEffect(() => {
        fetchItemDetail(itemId);
    }, []);

    const isSubmitPossible = () =>{
        if(selectedStars > 0){
            return true;
        }

        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('content', reviewContent);
        form.append('rating', selectedStars);

        imageFiles.forEach((file) => {
            form.append("commentFiles", file);
        });

        try {
            const response = await createParentComment(itemId, form);

            if (response.ok) {
                alert('댓글 저장 성공');
            }
            else{
                alert('댓글 저장 실패')
            }
        } catch (err) {
            console.error(err);
            alert('댓글 저장 실패: ' + err.message);
        }
    };


    return(
        <>
            <div>
                <form className={styles['form-container']} onSubmit={handleSubmit}>
                    <ItemDetail
                        item={item}
                    />

                    <div className={styles['review-star-container']}>
                        <div className={styles['review-font']}>
                            상품 만족도
                        </div>

                        <StarRating
                            size={60}
                            totalStars={5}
                            selectedStars={selectedStars}
                            setSelectedStars={setSelectedStars}
                        />
                    </div>

                    <div className={styles['blank']}></div>

                    <ReviewDetail/>

                    <UploadPicture
                        max={5}
                    />

                    <div className={styles['blank']}></div>

                    <SubmitButton
                        isSubmitPossible={isSubmitPossible}
                        buttonName={"등록"}
                    />
                </form>
            </div>
        </>
    )
}

const ItemDetail = ({item}) => {
    return (
        <div className={styles['item-container']}>
            <img
                className={styles['item-image']}
                src={item.itemImg} alt={item.itemName}
            />
            <div className={styles['item-detail']}>
                <div className={styles['item-detail__brand']}>
                    {item.itemBrand}
                </div>
                <div className={styles['item-detail__name']}>
                    {item.itemName}
                </div>
                <div className={styles['item-detail__delivery']}>
                    무료 배송
                </div>
            </div>
        </div>
    )
}

const ReviewDetail = ({inputMax = 5000}) => {
    const {reviewContent, setReviewContent} = useContext(ReviewContext)
    // const [inputContent, setInputContent] = useState("")


    return (
        <>
            <div className={styles['review-container']}>
                <div className={styles['review__menu-font']}>
                    상세 리뷰
                </div>

                <div className={styles['review__input-container']}>
                    <textArea
                        className={styles['review__input']}
                        placeholder="(선택사항)"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        maxlength={inputMax}
                    />
                    <div className={styles['review__input-length']}>
                        {reviewContent.length} / {inputMax}
                    </div>
                </div>
            </div>

        </>
    )
}

const UploadPicture = ({max = 5}) => {
    const {imageFiles, setImageFiles} = useContext(ReviewContext)
    // const [imageFiles, setImageFiles] = useState([])
    const [imageUrls, setImageUrls] = useState([])


    const upload = () => {
        document.getElementById("commentImages").click();
    }

    const onChangeInput = (e) => {

        const { name, value, type, files } = e.target;

        if (type === "file" && name === "commentImages") {
           if(imageFiles.length + files.length > max){
               alert(`${max}개의 사진만 등록 가능합니다.`)
               return
           }

            setImageFiles((prevImages) => [...prevImages, ...Array.from(files)]);
        }

    }

    useEffect(  () => {


        imageUrls.forEach((url) => URL.revokeObjectURL(url));

        const newImageUrls = imageFiles.map((file) => URL.createObjectURL(file));
        setImageUrls(newImageUrls);
        // // 정리 함수 추가 (컴포넌트 언마운트 시 URL 해제)
        return () => {
            newImageUrls.forEach((url) => URL.revokeObjectURL(url));
        };

    },[imageFiles])
    return (
        <>  {
            imageUrls.length === 0 &&
            <div
                className={styles['picture-upload-container']}
                onClick={() => upload()}
            >
                <img
                    className={styles['picture-icon']}
                    src={"/images/-icon-picture.svg"}
                    alt={"none"}
                />
                <div className={styles['picture-upload__font']}>
                    사진 첨부
                </div>
            </div>
            }
            {
                imageUrls.length > 0 && (
                    <div className={styles['picture-icon-container']}>
                        {imageUrls.map((imageUrl, index) =>
                            <img
                                className={styles['picture-uploaded']}
                                src={imageUrl}
                            />
                        )}

                        <img
                            className={styles['picture-upload-icon']}
                            src={'/images/-icon-picture-upload.svg'}
                            onClick={() => upload()}
                        />
                    </div>

                )
            }

            <input
                className={styles['picture-upload__input']}
                type="file"
                id="commentImages"
                name="commentImages"
                multiple
                onChange={(e) => onChangeInput(e)}
            />
        </>
    )
}


export const ReviewContext = createContext(null)

export const ReviewContextProvider = (props) => {
    const [selectedStars, setSelectedStars] = useState(0);
    const [reviewContent, setReviewContent] = useState('')
    const [imageFiles, setImageFiles] = useState([])

    return (
        <ReviewContext.Provider value={{selectedStars, setSelectedStars, reviewContent, setReviewContent, imageFiles, setImageFiles}}>
            {props.children}
        </ReviewContext.Provider>
    )
}



export default ItemReview;

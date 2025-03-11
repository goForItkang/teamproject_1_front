export const ShareKakao = (item) =>{
    const {Kakao} = window
    const kakaoJavaScriptKey = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY
    const defaultUrl = "http://localhost:3000"
    const currentUrl = window.location.href;

    Kakao.cleanup();

    Kakao.init(kakaoJavaScriptKey);

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: item.itemName,
            description: item.itemDesc,
            imageUrl:
            item.itemImg,
            link: {
                mobileWebUrl: currentUrl,
            },
        },
        buttons: [
            {
                title: '상품 보러가기',
                link: {
                    mobileWebUrl: currentUrl,
                },
            },
        ],
    });
}
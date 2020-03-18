import i18n from "i18next";
import { initReactI18next } from "react-i18next";
i18n.use(initReactI18next).init({
    interpolation: {
        escapeValue: false
    },
    lng: "ko",
    fallbackLng: "ko",
    resources: {
        ko: {
            translation: {
                mainEditor: {
                    ageRange10s: "10대",
                    ageRange20s: "20대",
                    ageRange30s: "30대",
                    "ageRange40+": "40+",
                    upload: "업로드",
                    layers: "레이어",
                    settingUp: "캔버스 설정 ..",
                    uploadingImage: "이미지 업로드 중 ..",
                    addingImage: "이미지 추가 중 ..",
                    undo: "실행 취소",
                    redo: "다시 하다",
                    in: "에",
                    out: "밖",
                    delete: "지우다",
                    front: "앞",
                    back: "뒤",
                    left: "왼쪽",
                    center: "센터",
                    right: "권리",
                    sides: "측면",
                    uploadDetailedImage: "상세 이미지 업로드",
                    selectAgeRange: "연령대 선택",
                    imagesUploadedByOwner: "소유자가 업로드 한 이미지",
                    fandioGraphicLibrary: "FANDIO 그래픽 라이브러리",
                    exportingImages: "이미지 내보내기",
                    collaborationInstructions: "협업 지침",
                    addImages: "이미지 추가",
                    addText: "텍스트 추가",
                    editProductDetails: "제품 세부 사항 편집",
                    free: "무료 이미지 사용",
                    colors: "그림 물감",
                    sizes: "크기",
                    completeCollaboration: "완벽한 협업",
                    completePurchase: "구매 완료",
                    createProduct: "제품 만들기",
                    final: "결제시 최종 비용 반영",
                    selectFont: "글꼴을 선택하십시오",
                    addToCart: "장바구니에 담기",
                    try: "꽃, 자동차 등을 시험해보십시오."
                },
                navigation: {
                    collaboration: "콜라보레이션 ",
                    custom: "커스텀 ",
                    brand: "브랜드",
                    logout: "로그아웃",
                    login: "로그인",
                    artist: "아티스트",
                    language: "한국어",
                    infoManage: "내정보관리",
                    launchBrand: "브랜드 런칭하기"
                },
                footer: {
                    addressLine1:
                        "(주) 디오션코리아 | 서울특별시 강남구 선릉로 152길 10",
                    addressLine2:
                        "대표 : 김두환 | 사업자등록번호 : 439-81-00129",
                    addressLine3: "통신판매업신고 : 2016-서울서초-1740",
                    addressLine4:
                        "고객센터 02-548-0328 | 상담시간 : 10:00~18:30 (주말제외)",
                    legalNotice: "법적고지",
                    terms: "이용약관",
                    privacy: "개인정보처리방침",
                    relatedSite: "관련사이트",
                    copywriteLine1:
                        "모든 콘텐츠의 저작권은 저작권자 혹은 제공자(처)에 있으며",
                    copywriteLine2:
                        "이를 저작권자의 동의 없이 무단 사용 및 도용하는 경우 저작권법 등에 따라 민형사상 법적 책임을 질 수 있습니다.",
                    service: "고객센터"
                },
                search: {
                    placeholder: "수색",
                    popular: "인기 검색어",
                    shirts: "셔츠",
                    shortSleeves: "반팔티",
                    hoodiesMen: "후드 맨투맨"
                },
                collaborationFilter: {
                    artistCountry: {
                        korea: "한국",
                        usa: "미국",
                        china: "중국",
                        japan: "일본",
                        taiwan: "대만",
                        vietnam: "베트남",
                        canada: "캐나다",
                        australia: "호주"
                    },
                    ageRange: "연령대",
                    productCategory: "상품 카테고리",
                    short: "정렬 기준",
                    shortBy: {
                        view: "조회순",
                        best: "판매량순",
                        new: "신상품순",
                        lowestPrice: "낮은가격순",
                        highestPrice: "높은가격순"
                    },
                    s: "년"
                },
                productCategory: {
                    jackets: "아우터",
                    hoodies: "후드/집업",
                    tshirts: "티셔츠",
                    paintsShorts: "바지 & 반바지",
                    hats: "모자",
                    bags: "가방/파우치",
                    phoneCase: "휴대폰 케이스",
                    blankets: "담요",
                    pillow: "쿠션",
                    decor: "홈데코",
                    others: "기타 액세서리"
                },
                productDetail: {
                    price: "가격",
                    delivery: "배송",
                    size: "사이즈", // Not Found
                    totalAmount: "총 상품 금액",
                    productDetail: "상품상세정보", // Not Found
                    review: "리뷰",
                    write: "작성하기",
                    shopBag: "쇼핑백",
                    buy: "지금 구매"
                },
                brandioArtist: {
                    artist: "아티스트",
                    artistCountry: "아티스트 국가",
                    nationality: "국적",
                    numberofProducts: "보유상품수",
                    representativeBrand: "대표브랜드",
                    CollaborationProgress: "진행 중인 콜라보",
                    msgPlcHolder: "메세지를 입력하세요",
                    sendBtn: "메세지 전송하기"
                },
                createBrand: {
                    tagline:
                        "간단한 정보만 입력하면 브랜드를 등록할 수 있습니다.",
                    brandName: "브랜드명",
                    brandNameEnglish: "영문브랜드명", // Not Found
                    brandNameKo: "한글브랜드명", // Not Found
                    brandUrl: "브랜드몰 URL",
                    brandUrlHelpText: "브랜드몰에바로갈수있는URL주소입니다.",
                    brandLogo: "브랜드 로고",
                    brandLogoHelpText:
                        "브랜드 로고 미등록시 FANDIO 로고로 대체됩니다.",
                    brandCoverImage: "브랜드몰 커버 이미지", // Not Found
                    brandCoverHelpText:
                        "권장 크기 : 640 x 480 이상 참고 이미지는 최대 10개까지 설정할 수 있습니다.", // Not Found
                    brandSlogan: "브랜드 슬로건",
                    brandInto: "브랜드 소개",
                    brandTermIntoText:
                        "이용약관 및 브랜디오 운영정책에 동의합니다", // Not Found
                    termOfUse: "이용약관",
                    applyBtn: "브랜드 신청하기"
                },
                termCondition: {
                    checkbox: "이용약관및브랜디오운영정책에동의합니다", // Not Found
                    heading: "이용약관",
                    articalOne: "제 1 조 (목적)",
                    articalOneDesc:
                        '이 약관은 (주)디오션코리아(이하 "회사")가 제공하는 팬디오&브랜디오 (이하”서비스”) 관련 제반 서비스 이용과 관련하여 “회사”와 “사용자” 사이의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 한다.',
                    articalTwo: "제 2 조 (정의)",
                    articalTwotag:
                        "이 약관에서 사용하는 용어의 정의는 다음과 같다.",
                    articalTwoDesc:
                        '"서비스"라 함은 모든 종류의 디지털 단말기와 상관없이 "사용자"가 이용할 수 있는 “아트인블록”관련 제반 서비스를 의미한다.',
                    linethree:
                        '”사용자"라 함은 회사의 "서비스"에 접속하여 이 약관에 따라 "회사"와 이용계약을 체결하고 "회사"가 제공하는 "서비스"를 이용하는 고객을 의미한다. ”활동 아이디(활동 ID)"라 함은"사용자"의 식별과 "서비스" 이용을 위하여 “사용자”가 설정하는 문자 또는 숫자의 조합을 의미한다.',
                    linefour:
                        '"비밀번호"라 함은"사용자"가 설정한 "활동아이디"와 일치되는 "사용자"임을 식별하고 개인정보 보호를 위해"사용자" 자신이 정한 문자 또는 숫자의 조합을 의미한다.',
                    linefive:
                        '"게시물"이라 함은"사용자"가 "서비스"를 이용함에 있어 "서비스”상에 게시한 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미한다.'
                },
                brandioCollaborationCard: {
                    name: "상품명",
                    type: "제품 종류",
                    size: "사이즈",
                    return: "콜라보 참여 수익률", // Not Found
                    price: "상품 판매 가격",
                    image: "이미지",
                    collaborationReq: "콜라보 요청사항",
                    apply: "콜라보레이션 신청하기", // Not Found
                    returnHelpText:
                        "이 금액은 팬디오 수수료를 제외한 금액입니다."
                },
                brandioCollaborationList: {
                    day: "일", // Not Found
                    hrs: "시간",
                    min: "분", // Not Found
                    left: "남음",
                    desc: "콜라버 공유 수익률" // Not Found
                },
                brandioIllustration: {
                    myBrand: "내 브랜드",
                    myInfo: "내 정보관리",
                    brandList: "브랜드 목록",
                    illustrationList: "일러스트",
                    msg: "내 메세지", // Not Foundssss
                    announceCollaboration: "일러스트 업로드하기", // Not Found
                    applyWithdrawal: "출금하기", // Not Found
                    myShoping: "출금신청하기", // Not Found
                    cart: "내 쇼핑",
                    confirmPurchaase: "구매내역 확인", // Not Found
                    shipping: "배송지관리", // Not Found
                    return: "주문취소/ 교환/ 반품관리", // Not Found
                    artwork: "아트워크",
                    price: "판매가", // Not Found
                    updiol: "업르도일", // Not Found
                    state: "상태", // Not Found
                    revenue: "수익",
                    delete: "삭제하기",
                    cumulativeSales: "누적판매"
                },
                brandioMessage: {
                    myMsg: "내 메세지",
                    msgContent: "메세지 내용",
                    sender: "보낸사람", // Not Found
                    date: "메세지 내용", // Not Found
                    reply: "답장하기",
                    delete: "삭제하기"
                },
                uploadIllustration: {
                    tagLine:
                        "상품을등록하면팬디오사이트에서상품을판매할수있습니다.", // Not Found
                    upload: "작품 업로드", // Not Found
                    helpText: "권장 크기 : 640 x 480 이상",
                    helpText2: "이미지는 최대 10개까지 설정할 수 있습니다",
                    setIllustration: "세트 예술작품", // Not Found
                    uploadFile: "파일 업로드하기",
                    registerSingleProduct: "일러스트 등록하기"
                },
                brandioCreateProduct: {
                    tagline: "상품등록 정보",
                    productName: "상품명 ",
                    productForm: "상품 형태",
                    collabrationProduct: "콜라보레이션 상품",
                    signleItem: "단독 상품",
                    collInformation: "콜라보레이션 정보",
                    collTitle: "콜라보레이션 제목",
                    collPhoto: "콜라보레이션 제공사진",
                    collReq: "콜라보레이션 요청사항",
                    selectProduct: "콜라보레이션 요청사항 ",
                    noOfPages: "프린팅 가능 면수",
                    front: "앞면",
                    back: "뒷면",
                    left: "왼팔",
                    right: "오른팔",
                    productPriceSetting: "상품가격 설정",
                    collFeeSetting: "콜라보 수수료 설정",
                    estimatRevnue: "예상 수익",
                    commodityPrice: "상품 가격",
                    productPrice: "제품 원가 ‑",
                    printingExtra: "프린팅 추가 비용",
                    fendioFee: "팬디오 수수료",
                    collFee: "콜라보레이터 수수료",
                    cost: "원가",
                    color: "색상",
                    size: "사이즈",
                    apply: "콜라보레이션 신청하기",
                    editorBtn: "편집기로 상품 제작하기"
                },
                notification: {
                    before: "전에",
                    chkMsg: "메세지 확인",
                    followMe: "팔로우 하기",
                    following: "팔로잉",
                    message: "메세지"
                },
                editor: {
                    request: "요청사항",
                    customHow: "커스텀, 어떻게 할까",
                    reply: "재보기",
                    incision: "자르기",
                    forward: "앞으로",
                    backword: "뒤로",
                    upsDown: "상하반전",
                    leftRightInve: "좌우반전",
                    left: "왼쪽",
                    middle: "가운데",
                    rightSide: "오른쪽",
                    up: "위로",
                    under: "아래로",
                    layer: "레이어",
                    imageUpload: "이미지업로드",
                    text: "텍스트",
                    figure: "도형",
                    tempStorage: "임시저장",
                    dropbox: "내보관함",
                    front: "앞",
                    rear: "뒤",
                    ooh: "우"
                },
                mydio: {
                    followers: "팔로워",
                    follow: "팔로우"
                },
                myOrder: {
                    fandioMyOrderList: "내 주문리스트 뭉치",
                    menu: {
                        orderShipping: "주문 / 배송 문의",
                        ShoppingCart: "쇼핑 카트",
                        correctionOfDel: "배송 정보 수정"
                    },
                    desc: "기술",
                    brandName: "상표명",
                    proctStyle: "제품 스타일",
                    size: "크기",
                    qty: "계속해서",
                    price: "가격",
                    action: "동작",
                    link: "진행",
                    name: "이름",
                    contact: "접촉",
                    Country: "국가",
                    City: "시티",
                    Zipcode: "우편 번호",
                    detailAddress: "상세 주소"
                },
                faq: {
                    faq: "자주하는 질문",
                    customerCenter: "고객 센터",
                    number: "번호",
                    questions: "질문",
                    q1: "17 개의 주문을 확인하고 싶습니다..",
                    q2:
                        "16 개의 다른 아이템을 주문했지만 일부만 취소하고 싶습니다.",
                    q3: "배송까지 얼마나 걸립니까?",
                    q4: "비회원을 위해 주문할 수 있습니까?",
                    q5: "주문을 취소하고 싶습니다."
                },
                event: {
                    event: "행사",
                    magazine: "잡지",
                    eventList: "이벤트리스트",
                    magazineList: " 잡지 목록"
                },
                misc: {
                    dueDate: "마감일",
                    startedFollowing: "님이 회원님을 팔로우하기 시작했습니다",
                    selectBrand: "브랜드 선택 *",
                    sliderh1: "나만의 패션 브랜드를 시작하십시오",
                    slider1line1:
                        " Brando에서는 자신 만의 컨텐츠를 만들 수있습니다",
                    slider1line2: "상품 판매를 지원할 수 있습니다",
                    silder1btn: "브랜드 런칭",
                    slider2h1: "브랜드 디자인을 시작하기가 어렵습니다.",
                    slider2line1: "걱정 마세요! 여러 아티스트와의 협업",
                    slider2line2:
                        "우리는 당신이 당신의 브랜드를 시작하는 데도움이 협력",
                    slider2btn: "더 알아보기",
                    slider3h1: "브랜드 디자인을 시작하기가 어렵습니다.",
                    slider311: "다양한 유형의 소량 생산",
                    slider312: "시스템 지원",
                    slider321: "온라인 브랜드 런칭",
                    slider322: "그리고 제품 디자인",
                    slider331: "주문 기반 제품 신청",
                    slider332: "생산 및 운송 지원",
                    slider341: "주문 기반 제품 신청",
                    slider342: "생산 및 운송 지원",
                    slider351: "협업 연결",
                    slider352: "유통 채널 판매 등록",
                    uploadProduct: "상품 업로드하기",
                    withdrawtag:
                        " 계정 수입을 확인하고 인출 요청을 제기하십시오! 요청이 접수되면 영업일 기준 2 ~ 3 일 내에 송금됩니다.",
                    yourRevenue: "당신의 수익",
                    withdrawinfo: "아래에 인출 할 금액을 입력하십시오",
                    withdrawbtn: "출금 요청 제출",
                    salesHisory: "판매내역",
                    id: "아이디",
                    dateTime: "일시",
                    total: "총",
                    currentlySelling: "판매중",
                    awaiting: "승인대기중",
                    approve: "승인하기",
                    noData: "자료 없음",
                    createProduct: "제품 만들기",
                    upload: "업로드",
                    aifile: "AI 파일",
                    productDisplayImg: "제품 디스플레이 이미지",
                    productDescImg: "제품 설명 이미지",
                    noHistory: "사용 가능한 기록이 없습니다.",
                    korean: "한국어",
                    english: "영어",
                    japanese: "일본어",
                    vietnamese: "베트남어",
                    noBrandCreated: "현재 등록된 브랜드가 없습니다.",
                    menuItem: "메뉴 항목을 클릭하십시오",
                    actionSuccsess: "작업이 성공적으로 진행됩니다",
                    termsCondn: "이용 약관에 동의하십시오",
                    enterPrice: "가격을 입력하십시오",
                    incPrice: "제품 가격 인상",
                    slctBrand: "브랜드를 선택하십시오",
                    enterProduct: "제품명을 입력하십시오",
                    enterBrand: "브랜드 이름을 입력하십시오",
                    brandURL: "브랜드 URL을 입력하십시오",
                    acceptTerms: "약관에 동의하십시오",
                    brandSlogan: "브랜드 슬로건을 입력하십시오",
                    actionProcess: "작업이 성공적으로 처리되었습니다",
                    prodDlt: "제품이 삭제되었습니다",
                    uploadImg: "자세한 이미지를 먼저 업로드하십시오",
                    createProd: "만들어진 제품",
                    setProd: "제품명을 설정하십시오",
                    setProdPrice: "제품 가격을 설정하십시오",
                    slctBrand: "브랜드를 선택하십시오",
                    uploadFile:
                        "적어도 하나의 디스플레이 사진을 업로드하십시오",
                    uploadAIFile: "AI 파일을 업로드하십시오",
                    wrong: "문제가 발생했습니다",
                    sentMsg: "메시지 전송 됨",
                    selfMsg: "자신에게 메시지를 보낼 수 없습니다",
                    dltMsg: "메시지가 성공적으로 삭제되었습니다",
                    deletedSuccess: "성공적으로 삭제되었습니다",
                    pageExist: "이 페이지는 존재하지 않습니다",
                    viewMore: "더보기",
                    termConditionError: "이용 약관에 동의하십시오",
                    applyWithdrawl: "신청 철수",
                    checkRevenue:
                        "계정 수익을 확인하고 인출 요청을 제기하십시오! 요청이 접수되면 영업일 기준 2 ~ 3 일 내에 송금됩니다.",
                    withdrawAmt: "아래에 인출 할 금액을 입력하십시오",
                    withdrawReq: "출금 요청 제출",
                    illustratnWorth1: "당신의 그림 가치",
                    illustratnWorth2: "에 사용되었다",
                    individualHeading1: "개별 제품",
                    individualHeading2: "가치",
                    individualHeading3: "에 팔렸다",
                    collaborationHeading1: "협업 공유",
                    collaborationHeading2: "에 대한",
                    collaborationHeading3: "에 적립되었다",
                    yourRevenue: "당신의 수익",
                    transHistory: "거래 내역",
                    submtRvw: "검토 제출",
                    brand: "상표:",
                    price: "가격:",
                    prodName: "상품명:",
                    size: "크기:",
                    qty: "수량:",
                    noNotificatn: "새로운 알림이 없습니다",
                    login: "로그인",
                    copyright: "저작권 © 2019 FANDIO Inc. 모든 권리 보유.",
                    loadProducts: "모든 제품 로딩",
                    withdrawReqSbmt: "출금 요청이 제출되었습니다!",
                    paypalAdded: "Paypal.me 이름이 성공적으로 추가되었습니다",
                    createBrand: "당신은 성공적으로 브랜드를 만들었습니다!",
                    designSendOwnr: "소유자에게 성공적으로 전송 된 디자인",
                    prodCreate: "제품이 성공적으로 생성되었습니다",
                    higherWithdrawAmt: "인출 금액은 수입보다 높을 수 없습니다!",
                    enterWithdrawAmt: "Plese는 출금 금액을 입력",
                    imgSize: "이미지는 2MB보다 작아야합니다!",
                    uploadJPG: "JPG / PNG 파일 만 업로드 할 수 있습니다!",
                    imgSize5MB: "파일은 5MB보다 작아야합니다!",
                    uploadAIFile: "AI 파일 만 업로드 할 수 있습니다!",
                    noProductcrated: "제품이 없습니다",
                    addPaypal: "Paypal.me 이름 추가",
                    enterPaypal: "Paypal.me 사용자 이름 입력"
                }
            }
        },
        en: {
            translation: {
                mainEditor: {
                    ageRange10s: "10s",
                    ageRange20s: "20s",
                    ageRange30s: "30s",
                    "ageRange40+": "40+",
                    upload: "Upload",
                    layers: "Layers",
                    settingUp: "Setting up canvas..",
                    uploadingImage: "Uploading image..",
                    addingImage: "Adding image..",
                    undo: "UNDO",
                    redo: "REDO",
                    in: "IN",
                    out: "OUT",
                    delete: "DELETE",
                    front: "FRONT",
                    back: "BACK",
                    left: "LEFT",
                    center: "CENTER",
                    right: "RIGHT",
                    sides: "SIDES",
                    uploadDetailedImage: "Upload Detailed Image",
                    selectAgeRange: "Select Age Range",
                    imagesUploadedByOwner: "Images Uploaded By Owner",
                    fandioGraphicLibrary: "FANDIO Graphic Library",
                    exportingImages: "Exporting images",
                    collaborationInstructions: "Collaboration Instructions",
                    addImages: "Add Images",
                    addText: "Add Text",
                    editProductDetails: "Edit Product Details",
                    free: "Free To Use Images",
                    colors: "Colors",
                    sizes: "Sizes",
                    completeCollaboration: "Complete Collaboration",
                    completePurchase: "Complete Purchase",
                    createProduct: "Create Product",
                    final: "Final cost reflected at checkout",
                    selectFont: "Select font",
                    addToCart: "Add To Cart",
                    try: "Try flowers, cars etc."
                },
                navigation: {
                    collaboration: "Collaboration",
                    custom: "Custom",
                    brand: "Brand",
                    logout: "Logout",
                    login: "Login",
                    artist: "Artist",
                    language: "Language",
                    infoManage: "MyInfo",
                    launchBrand: "Launch your brand"
                },
                footer: {
                    addressLine1:
                        "Dioce Korea Co., Ltd. | 10 Seolleung-ro 152-gil, Gangnam-gu, Seoul,",
                    addressLine2:
                        "CEO: Kim Doo Hwan | Business Registration Number: 439-81-00129",
                    addressLine3:
                        "Communication dealer report: 2016-Seoul Seocho-1740",
                    addressLine4:
                        "Customer Center 02-548-0328 | Consultation Hours: 10: 00 ~ 18: 30 (excluding weekends)",
                    legalNotice: "Legal Notice",
                    terms: "Terms of Use",
                    privacy: "Privacy Policy",
                    relatedSite: "Related Site",
                    copywriteLine1:
                        "The copyright of all content belongs to the copyright holder or provider.",
                    copywriteLine2:
                        "Unauthorized use or theft without the consent of the copyright holder may be subject to civil and criminal liability under copyright law",
                    service: "Service Center"
                },
                search: {
                    placeholder: "Search",
                    popular: "Popular Searches",
                    shirts: "Shirts",
                    shortSleeves: "Short Sleeves",
                    hoodiesMen: "Hoodies Men"
                },
                collaborationFilter: {
                    artistCountry: {
                        korea: "Korea",
                        usa: "United States of America",
                        china: "China",
                        japan: "Japan",
                        taiwan: "Taiwan",
                        vietnam: "Vietnam",
                        canada: "Canada",
                        australia: "Australia"
                    },
                    ageRange: "Age Range",
                    productCategory: "Product category",
                    short: "Sort By",
                    shortBy: {
                        view: "View By",
                        best: "Bestsellers",
                        new: "Newest First",
                        lowestPrice: "Lowest Price First",
                        highestPrice: "Highest Price First"
                    },
                    s: "s"
                },
                productCategory: {
                    clothing: "Clothing",
                    // tshirts: "T-shirts",
                    // paintsShorts: "Pants & Shorts",
                    // hats: "Hats",
                    // bags: "Bags",
                    phoneCase: "Phone Cases",
                    blankets: "Blankets",
                    pillow: "Pillow Covers",
                    decor: "Decor",
                    others: "Other Accessories"
                },
                productDetail: {
                    price: "Price",
                    delivery: "Delivery",
                    size: "Size",
                    totalAmount: "Total Product Amount",
                    productDetail: "Product Detail",
                    review: "Review",
                    write: "Write",
                    shopBag: "Shopping Bag",
                    buy: "Buy Now"
                },
                brandioArtist: {
                    artist: "Artist",
                    artistCountry: "Artist country",
                    nationality: "Nationality",
                    numberofProducts: "Number of Products",
                    representativeBrand: "Representative Brand",
                    CollaborationProgress: "Collaboration in progress",
                    msgPlcHolder: "Write a message",
                    sendBtn: "Send Message"
                },
                createBrand: {
                    tagline:
                        "You can register a brand by entering simple information.",
                    brandName: "Brand name",
                    brandNameEnglish: "English brand name",
                    brandNameKo: "Korean Brand Name",
                    brandUrl: "Brand Mall URL",
                    brandUrlHelpText:
                        "The URL address where you can go to the brand mall.",
                    brandLogo: "Brand logo",
                    brandLogoHelpText:
                        "If the brand logo is not registered, it will be replaced by the FANDIO logo.",
                    brandCoverImage: "Brand Mall Cover Image",
                    brandCoverHelpText: "Recommended size: 640 x 640 or more",
                    brandSlogan: "Brand slogan",
                    brandInto: "Brand introduction",
                    brandTermIntoText:
                        "I agree to the Terms of Use and Brand Operation Policy",
                    termOfUse: "Terms of Use",
                    applyBtn: "Apply"
                },
                termCondition: {
                    checkbox:
                        "I agree to the Terms of Use and Brand Operation Policy",
                    heading: "Terms of Use",
                    articalOne: "Article 1 [Purpose]",
                    articalOneDesc:
                        'These Terms and Conditions shall govern the rights, obligations and responsibilities between the Company and the User in connection with the use of all services related to Pandio & Brandio (hereinafter referred to as "Service") provided by DOCEAN KOREA. The purpose is to prescribe matters and other necessary matters.',
                    articalTwo: "Article 2 [Definitions]",
                    articalTwotag:
                        "The definitions of terms used in this agreement are as follows.",
                    articalTwoDesc:
                        '"Service" means all the services related to "Art In Block" that can be used by "User" regardless of all kinds of digital terminals.',
                    linethree:
                        '"User" means a customer who accesses the "Service" of the Company, enters into a contract with the "Company" and uses the "Service" provided by the "Company" in accordance with these Terms and Conditions. "I" means a combination of letters or numbers set by "User" to identify "User" and to use "Service".',
                    linefour:
                        '"Password" means a combination of letters or numbers defined by the "user" for the purpose of identifying the "user" matching the "activity ID" set by the "user" and protecting personal information.',
                    linefive:
                        '"Post" means the information, articles, photos, videos, and various files and links posted on the "Service" when the "User" uses the "Service."'
                },
                brandioCollaborationCard: {
                    name: "product name",
                    type: "Product type",
                    size: "size",
                    return: "Return on Collaboration",
                    price: "Product selling price",
                    image: "image",
                    collaborationReq: "Collaboration Request",
                    apply: "Apply",
                    returnHelpText:
                        "This amount is exclusive of the fandio fee."
                },
                brandioCollaborationList: {
                    day: "Days",
                    hrs: "Hours",
                    min: "Minutes",
                    left: "Left",
                    desc: "Collaboration share yield"
                },
                brandioIllustration: {
                    myBrand: "My Brand",
                    myInfo: "My Information Management",
                    brandList: "Brand List",
                    illustrationList: "Artworks",
                    msg: "My Message",
                    announceCollaboration: "Announce Collaboration",
                    applyWithdrawal: "Apply for Withdrawal",
                    myShoping: "My shopping",
                    cart: "shopping basket",
                    confirmPurchaase: "Confirm purchase",
                    shipping: "Shipping management",
                    return: "Cancel Order / Exchange / Return Management",
                    artwork: "ArtWork",
                    price: "Price",
                    updiol: "Updiol",
                    state: "State",
                    revenue: "Reveneue",
                    delete: "Delete",
                    cumulativeSales: "Cumulative Sales"
                },
                brandioMessage: {
                    myMsg: "My Message",
                    msgContent: "Message content",
                    sender: "Sender",
                    date: "sent date",
                    reply: "Reply",
                    delete: "Delete"
                },
                uploadIllustration: {
                    tagLine:
                        "Once you register a product, you can sell it on the Fandio site.",
                    upload: "Upload Artwork",
                    helpText: "Recommended size: 640 x 480 or more",
                    helpText2: "You can set up to 10 images.",
                    setIllustration: "Set artwork",
                    uploadFile: "Upload a file",
                    registerSingleProduct: "Register your illustration"
                },
                brandioCreateProduct: {
                    tagline: "Product Registration Information",
                    productName: "Product name",
                    productForm: "Product form",
                    collabrationProduct: "Collaboration product",
                    signleItem: "Single item",
                    collInformation: "Collaboration Information",
                    collTitle: "Collaboration in title",
                    collPhoto: "Collaboration offer photo",
                    collReq: "Collaboration Request",
                    selectProduct: "Select Product ",
                    noOfPages: "Number of printable pages",
                    front: "Front",
                    back: "Back",
                    left: "Left",
                    right: "Right",
                    productPriceSetting: "Product price setting",
                    collFeeSetting: "Collaboration fee setting",
                    estimatRevnue: "Estimated Revenue",
                    commodityPrice: "Commodity price",
                    productPrice: "Product Cost-",
                    printingExtra: "Printing extra",
                    fendioFee: "Fandio fee",
                    collFee: "Collaborator Fee",
                    cost: "Cost",
                    color: "Color",
                    size: "Size",
                    apply: "Apply for collaboration",
                    editorBtn: "Create an item with the editor"
                },
                notification: {
                    before: "before",
                    chkMsg: "Check message",
                    followMe: "Follow me",
                    following: "Following",
                    message: "Message"
                },
                editor: {
                    request: "Requests",
                    customHow: "Custom how",
                    reply: "Replay",
                    incision: "Incision",
                    forward: "Forward",
                    backword: "Backwards",
                    upsDown: "Upside down",
                    leftRightInve: "Left and Right Inversion",
                    left: "Left",
                    middle: "Middle",
                    rightSide: "Right side",
                    up: "Up",
                    under: "Under",
                    layer: "Layer",
                    imageUpload: "Image upload",
                    text: "Text",
                    figure: "Figure",
                    tempStorage: "Temporary storage",
                    dropbox: "Dropbox",
                    front: "Front",
                    rear: "Rear",
                    ooh: "Ooh"
                },
                mydio: {
                    followers: "Followers",
                    follow: "Follow"
                },
                myOrder: {
                    fandioMyOrderList: "Fandio my order list",
                    menu: {
                        orderShipping: "Order / Shipping",
                        ShoppingCart: "Shopping cart",
                        correctionOfDel: "Correction of delivery"
                    },
                    desc: "Description",
                    brandName: "Brand Name",
                    proctStyle: "Product Style",
                    size: "Size",
                    qty: "Qty",
                    price: "Price",
                    action: "Action",
                    link: "Proceeding",
                    name: "Name",
                    contact: "Contact",
                    Country: "Country",
                    City: "City",
                    Zipcode: "Zipcode",
                    detailAddress: "Detail Address"
                },
                faq: {
                    faq: "FAQ",
                    customerCenter: "Customer Center",
                    number: "Number",
                    questions: "Questions",
                    q1: "I want to check 17 orders.",
                    q2:
                        "I ordered 16 different items,but I only want to cancel some.",
                    q3: "How long does it take to ship?",
                    q4: "Can I order for non-members?",
                    q5: "I want to cancel my order."
                },
                event: {
                    event: "Event",
                    magazine: "Magazine",
                    eventList: "Event List",
                    magazineList: "Magazine List"
                },
                misc: {
                    dueDate: "Due Date",
                    startedFollowing: "Started following you",
                    selectBrand: "Select Brand *",
                    sliderh1: "Start your own fashion brand",
                    slider1line1: " Brando lets you create your own content",
                    slider1line2: "I can help you sell your items",
                    silder1btn: "Brand launch",
                    slider2h1: "It's hard to get started with brand design.",
                    slider2line1:
                        "Don't worry! Collaborate with multiple artists",
                    slider2line2: "We cooperate to help you start your brand",
                    slider2btn: "Learn More",
                    slider3h1: "It's hard to get started with brand design.",
                    slider311: "Produce small quantities of various types",
                    slider312: "system support",
                    slider321: "Online brand launch",
                    slider322: "and product design",
                    slider331: "Request Order-Based Product",
                    slider332: "Production and shipping support",
                    slider341: "Request an Order-Based Product",
                    slider342: "Production and transportation support",
                    slider351: "collaboration link",
                    slider352: "Register distribution channel sales",
                    uploadProduct: "Upload Product",
                    withdrawtag:
                        "Check your account revenue and raise a withdrawal request with us! Money will get sent in 2-3 business days upon a successful request.",
                    yourRevenue: "Your Revenue",
                    withdrawinfo:
                        "Please enter the amount you would like to withdraw below",
                    withdrawbtn: "Submit withdrawal request",
                    salesHisory: "Sales history",
                    id: "Id",
                    dateTime: "Date",
                    total: "Total",
                    currentlySelling: "Currently Selling",
                    awaiting: "Awaiting Approval",
                    approve: "Approve",
                    noData: "No data available",
                    createProduct: "Create Product",
                    upload: "Upload",
                    aifile: "AI file",
                    productDisplayImg: "Product Display Images",
                    productDescImg: "Product Description Image",
                    noHistory: "No history available",
                    korean: "Korean",
                    english: "English",
                    japanese: "Japanese",
                    vietnamese: "Vietnamese",
                    noBrandCreated: "You haven't created any brands yet.",
                    menuItem: "Click on menu item.",
                    actionSuccsess: "Action procces successfully",
                    termsCondn: "Please accept terms&condition",
                    enterPrice: "Please enter price",
                    incPrice: "Increase product price",
                    slctBrand: "Please select Brand",
                    enterProduct: "Please enter product name",
                    enterBrand: "Please Enter Brand name",
                    brandURL: "Please Enter Brand URL",
                    acceptTerms: "Please accept Terms",
                    brandSlogan: "Please enter brand slogan",
                    actionProcess: "Action processed successfully",
                    prodDlt: "Product has been deleted",
                    uploadImg: "Please upload detailed image first",
                    createProd: "Created product",
                    setProd: "Please set product name",
                    setProdPrice: "Please set product price",
                    slctBrand: "Please select Brand",
                    uploadFile: "Please Upload atleast 1 display picture",
                    uploadAIFile: "Please upload AI file",
                    wrong: "Something went wrong",
                    sentMsg: "Message sent",
                    selfMsg: "You can not sent message to self",
                    dltMsg: "Message deleted successfully",
                    deletedSuccess: "Deleted successfully",
                    pageExist: "This page does not exist",
                    viewMore: "view more",
                    termConditionError: "Please accept terms and conditions",
                    applyWithdrawl: "Apply for withdrawal",
                    checkRevenue:
                        "Check your account revenue and raise a withdrawal request with us! Money will get sent in 2-3 business days upon a successful request.",
                    withdrawAmt:
                        "Please enter the amount you would like to withdraw below",
                    withdrawReq: "Submit withdrawal request",
                    illustratnWorth1: "Your illustration worth",
                    illustratnWorth2: "was used on",
                    individualHeading1: "Your individual product for",
                    individualHeading2: "worth",
                    individualHeading3: "was sold on",
                    collaborationHeading1: "Your collaboration share worth",
                    collaborationHeading2: "for",
                    collaborationHeading3: "was credited on",
                    yourRevenue: "Your Revenue",
                    transHistory: "Transaction History",
                    submtRvw: "Submit Review",
                    brand: "Brand:",
                    price: "Price:",
                    prodName: "Product Name:",
                    size: "Size:",
                    qty: "Quantity:",
                    noNotificatn: "No New Notifications",
                    login: "Log In",
                    copyright:
                        "Copyright © 2019 FANDIO Inc. All rights reserved.",
                    loadProducts: "Loading all products",
                    withdrawReqSbmt: "Withdrawal request submitted!",
                    paypalAdded: "Paypal.me name added successfully",
                    createBrand: "You have created the brand successfuly!",
                    designSendOwnr: "Designs sent to owner successfully",
                    prodCreate: "Your product was created successfully",
                    higherWithdrawAmt:
                        "Withdrawal amount can not be higher than revenue earned!",
                    enterWithdrawAmt: "Plese enter withdrawal amount",
                    imgSize: "Image must smaller than 2MB!",
                    uploadJPG: "You can only upload JPG/PNG file!",
                    imgSize5MB: "File must smaller than 5MB!",
                    uploadAIFile: "You can only upload AI file!",
                    noProductcrated: "No product",
                    addPaypal: "Add Paypal.me Name",
                    enterPaypal: "Enter Paypal.me username"
                }
            }
        }
    }
});

export default i18n;

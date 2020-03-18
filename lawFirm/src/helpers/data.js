// 공통 사용 데이터

// 권한 리스트
export const authList = [
  { name: '일반', value: 'GENERAL', color: 'green' },
  { name: '계약담당자', value: 'Role.Legal.ContractAdmin', color: 'orange' },
  { name: '사내변호사', value: 'Role.Legal.InternalLawyer', color: 'purple' },
  { name: '사외변호사', value: 'Role.Legal.ExternalLawyer', color: 'blue' },
  { name: '관리자', value: 'Role.Legal.SuperAdmin', color: 'red' },
];

export const statusList = [
  { name: '오픈', value: 'open', color: 'light-gray', fontColor: 'white' },
  { name: '진행', value: 'progress', color: 'light', fontColor: 'black' },
  { name: '완료', value: 'finish', color: 'dark', fontColor: 'white' },
];

// 사용 여부
export const isUseList = [{ name: '사용', value: 1, color: 'blue' }, { name: '미사용', value: 0, color: 'red' }];

// 답변 여부
export const isAnswerList = [{ name: '답변', value: 1, color: 'blue' }, { name: '미답변', value: 0, color: 'red' }];

// 휴대폰 번호 국가 리스트
export const countryCodePhone = [
  { value: 1, text: '+1 미국' },
  { value: 33, text: '+33 프랑스' },
  { value: 34, text: '+34 스페인' },
  { value: 44, text: '+44 영국' },
  { value: 49, text: '+49 독일' },
  { value: 61, text: '+61 호주' },
  { value: 65, text: '+65 싱가포르' },
  { value: 81, text: '+81 일본' },
  { value: 82, text: '+82 한국' },
  { value: 86, text: '+86 중국' },
  { value: 852, text: '+852 홍콩' },
  { value: 886, text: '+886 대만' },
];

// DEMO용 계정 정보
export const demoLoginInfo = [
  {
    id: 1,
    text: 'kimhh',
    value: { email: 'kimhh@humaxit.com', password: '1111' },
  },
  // {
  //   id: 1,
  //   text: 'Admin (관리자)',
  //   value: { email: 'admin@humaxdigital.com', password: '1122' },
  // },
  // {
  //   id: 2,
  //   text: 'ContractAdmin (계약서 관리자)',
  //   value: { email: 'contractadmin@humaxdigital.com', password: '2233' },
  // },
  // {
  //   id: 3,
  //   text: 'ExternalLawyer (외부 변호사)',
  //   value: { email: 'externalLawyer@humaxdigital.com', password: '3344' },
  // },
  // {
  //   id: 4,
  //   text: 'InternalLawyer (내부 변호사)',
  //   value: { email: 'internalLawyer@humaxdigital.com', password: '4455' },
  // },
  // {
  //   id: 5,
  //   text: 'User (일반 사용자)',
  //   value: { email: 'user@humaxdigital.com', password: '5566' },
  // },
];

// 권한포함 모든 메뉴
export const allMenuData = [
  {
    name: 'pages.legalTitle',
    data: [
      {
        name: 'pages.home',
        icon: 'zmdi zmdi-view-dashboard zmdi-hc-fw',
        data: [{ link: '/app/main', name: 'pages.link' }],
      },
      {
        name: 'pages.case',
        icon: 'zmdi zmdi-book',
        data: [{ link: '/app/case', name: 'pages.case' }],
      },
      {
        name: 'pages.systemMng',
        icon: 'zmdi zmdi-settings zmdi-hc-fw',
        data: [{ link: '/app/userMng', name: 'pages.UserMng' }, { link: '/app/notice-mng', name: '공지 관리' }],
      },
    ],
  },
];

import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        // 컬러 팔레틑만 놓는 타입은 아님
        // 마진 간격이라든지, 폰트 사이즈라든지, 그림자 두께하든지, 애니메이션의 시간이라든지
        colors: {
            background: {
                default: string; // 앱의 가장 밑바탕 배경색
                paper: string; // 사이드 바, 카드, 모달 등 실제 내용이 적혀지는 div에 사용할 배경색
            };
            text: {
                default: string; // 기본 글자색
                disabled: string; // 비활성화 되거나 덜 중요한 보조 글자색
            };
            divider: string; // 선, 테두리, 구분선에 사용할 색
            primary: string; // 메인 브랜트 컬러
            secondary: string; // 보조 포인트 컬러
            success: string; // 성공 또는 긍정적인 상황을 나타내는 컬러
            error: string; // 오류 또는 부정적인 상황을 나타내는 컬러
            warning: string; // 경고 또는 주의를 나타내는 컬러
            info: string; // 정보 또는 참고를 나타내는 컬러
        };
    }
}
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- 문자열 관련 메서드를 제공하는 JSTL (EL 형식) --%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원 탈퇴</title>
    <link rel="stylesheet" href="/resources/css/main-style.css">
    <link rel="stylesheet" href="/resources/css/myPage-style.css">
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
</head>
<body>
    <main>
        <jsp:include page="/WEB-INF/views/common/header.jsp" />

        <section class="myPage-content">
            <%-- 사이드 메뉴 불러오기 --%>
            <jsp:include page="/WEB-INF/views/member/sideMenu.jsp"/> 

            <section class="myPage-main">
                <h1 class="myPage-title">회원 탈퇴</h1>
                <span class="myPage-subject">현재 비밀번호가 일치하는 경우 탈퇴할 수 있습니다.</span>

                <form action="delete" method="post" name="myPage-frm" id="memberDeleteForm">
                    <div class="myPage-row">
                        <label>비밀번호</label>
                        <input type="password" name="memberPw" id="memberPw" maxlength="20">
                    </div>
                    <div class="myPage-row info-title">
                        <label>회원 탈퇴 약관</label>
                    </div>
                        <pre class="secession-terms">
제 1조
이 약관은 샘플입니다.

① 약관 내용 1

② 약관 내용 2

③ 약관 내용 3

④ 약관 내용 4

⑤ 약관 내용 5 

제 2조
이 약관은 샘플입니다.

① 약관 내용 1

② 약관 내용 2

③ 약관 내용 3

④ 약관 내용 4

⑤ 약관 내용 5 

                        </pre>
                        <div>
                            <input type="checkbox" name="agree" id="agree">
                            <label for="agree">위 약관에 동의합니다.</label>
                        </div>
                                        
                    <button class="myPage-submit">탈퇴</button>
                </form>

            </section>
        </section>

    </main>

    <jsp:include page="/WEB-INF/views/common/footer.jsp" />


    <script src="/resources/js/member/myPage.js"></script>


</body>
</html>
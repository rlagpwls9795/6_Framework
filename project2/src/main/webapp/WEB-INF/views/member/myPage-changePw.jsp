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
    <title>비밀번호 변경</title>
    <link rel="stylesheet" href="/resources/css/main-style.css">
    <link rel="stylesheet" href="/resources/css/myPage-style.css">
    <!-- fontawesome 사이트 아이콘 이용 -->
    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
</head>
<body>
    <main>
        <jsp:include page="/WEB-INF/views/common/header.jsp" />

        <section class="myPage-content">

            <%-- 사이드 메뉴 불러오기 --%>
            <jsp:include page="/WEB-INF/views/member/sideMenu.jsp"/> 

            <section class="myPage-main">
                <h1 class="myPage-title">비밀번호 변경</h1>
                <span class="myPage-subject">현재 비밀번호가 일치하는 경우 새 비밀번호로 변경할 수 있습니다.</span>

                            <%-- 상대주소 --%>
                <form action="changePw" method="post" name="myPage-frm" id="changePwForm">
                    <div class="myPage-row">
                        <label>현재 비밀번호</label>
                        <input type="password" name="currentPw" id="currentPw" maxlength="20">
                    </div>
                    <div class="myPage-row">
                        <label>새 비밀번호</label>
                        <input type="password"  name="newPw" id="newPw" maxlength="20">
                    </div>
                    <div class="myPage-row">
                        <label>새 비밀번호 확인</label>
                        <input type="password" name="newPwConfirm" id="newPwConfirm" maxlength="20">
                    </div>
                    
                    <button class="myPage-submit">변경하기</button>
                </form>

            </section>
        </section>

    </main>

    <jsp:include page="/WEB-INF/views/common/footer.jsp" />


    <!-- myPage.js를 externel 방식으로 추가 -->
    <script src="/resources/js/member/myPage.js"></script>
</body>
</html>
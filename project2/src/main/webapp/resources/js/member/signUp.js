
// 유효성 검사 결과 저장 JS 객체
// JS 객체 = {K:V, K:V, ..} (Map 형식, Key는 String)

// 변수명.key 또는 변수명["key"]를 이용해 객체 속성 접근 가능
const checkObj = {
    "memberEmail" : false, 
    "memberPw" : false, 
    "memberPwConfirm" : false, 
    "memberNickname" : false, 
    "memberTel" : false
};

// 회원가입 양식이 제출되었을 때
document.getElementById("signUp-frm").addEventListener("submit", function(event){

    // for in 구문 : 객체의 key값을 순서대로 접근하는 반복문
    // [작성법]
    // for(let 변수명 in 객체명){}      ( 변수명 == key )
    // -> 객체에서 순서대로 key를 꺼내 변수에 저장

    // checkObi의 속성 중 하나라도 false가 있다면 제출 이벤트 제거
    for(let key in checkObj){
        
        let str;
        
        // checkObj의 속성 하나를 꺼내 값을 검사했는데 false인 경우
        if(!checkObj[key]) {
            switch(key) {
                case "memberEmail" : str="이메일이 유효하지 않습니다."; break;
                case "memberPw" :  str="비밀번호가 유효하지 않습니다."; break;
                case "memberPwConfirm" :  str="비밀번호 확인이 유효하지 않습니다."; break;
                case "memberNickname" :  str="닉네임이 유효하지 않습니다."; break;
                case "memberTel" :  str="전화번호가 유효하지 않습니다."; break;
            }

            alert(str);
            document.getElementById(key).focus();
            event.preventDefault();
            return;
        }
    }
    

});

// 이메일 유효성 검사
const memberEmail = document.getElementById("memberEmail");
const emailMessage = document.getElementById("emailMessage");

// input 이벤트 : input 태그에 입력이 되었을 경우 (모든 입력 인식)
memberEmail.addEventListener("input", function(){

    // 문자가 입력되지 않은 경우
    if(memberEmail.value.trim().length==0) {
        emailMessage.innerText="메일을 받을 수 있는 이메일을 입력해주세요.";
        memberEmail.value="";

        // confirm, error 클래스 제거
        emailMessage.classList.remove("confirm", "error");

        // 유효성 검사확인 객체에 현재 상태 저장
        checkObj.memberEmail = false;
        return;
    }

    // 정규 표현식을 이용한 유효성 검사
    const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
    if(regEx.test(memberEmail.value)){
        emailMessage.innerText="유효한 이메일 형식입니다.";
        emailMessage.classList.add("confirm");
        emailMessage.classList.remove("error");

        checkObj.memberEmail = true;
    } else {
        emailMessage.innerText="이메일 형식이 유효하지 않습니다.";
        emailMessage.classList.add("error");
        emailMessage.classList.remove("confirm");
    
        checkObj.memberEmail = false;
    }

});


// 비밀번호 유효성 검사
const memberPw = document.getElementById("memberPw");
const memberPwConfirm = document.getElementById("memberPwConfirm");
const pwMessage = document.getElementById("pwMessage");

memberPw.addEventListener("input", function(){

    // 비밀번호가 입력되지 않은 경우
    if(memberPw.value.trim().length==0) {
        pwMessage.innerText="영어, 숫자, 특수문자(!,@,#,-,_) 6~20 글자 사이로 입력하세요.";
        memberPw.value="";
        pwMessage.classList.remove("confirm", "error");
        checkObj.memberPw = false;
        return;
    }

    const regEx = /^[A-Za-z\d!@#\-\_]{6,20}$/;

    if(regEx.test(memberPw.value)) { // 유효한 비밀번호

        checkObj.memberPw=true;
        
        // 유효한 비밀번호 + 확인 작성 X
        if(memberPwConfirm.value.trim().length==0) {
            pwMessage.innerText="유효한 비밀번호 형식입니다.";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");

        } else { // 유효한 비밀번호 + 확인 작성 O --> 둘이 같은 지 비교
            
            // 비밀번호가 입력될 때 비밀번호 확인에 작성된 값과 일치하는 지 검사
            if(memberPw.value!=memberPwConfirm.value) {
                pwMessage.innerText="비밀번호가 일치하지 않습니다.";
                pwMessage.classList.add("error");
                pwMessage.classList.remove("confirm");
                checkObj.memberPwConfirm=false;
            } else {
                pwMessage.innerText="비밀번호가 일치합니다.";
                pwMessage.classList.remove("error");
                pwMessage.classList.add("confirm");
                checkObj.memberPwConfirm=true;
            }

        }
        
    } else {
        pwMessage.innerText="비밀번호 형식에 유효하지 않습니다.";
        pwMessage.classList.remove("confirm");
        pwMessage.classList.add("error");
        checkObj.memberPw=false;
    }
    

});


// 비밀번호 확인 유효성 검사
memberPwConfirm.addEventListener("input",function(){

    // 비밀번호가 유효할 경우에만 '비밀번호 == 비밀번호 확인' 검사
    if(checkObj.memberPw==true) {

        if(memberPwConfirm.value == memberPw.value) {
            pwMessage.innerText="비밀번호가 일치합니다.";
            pwMessage.classList.remove("error");
            pwMessage.classList.add("confirm");
            checkObj.memberPwConfirm=true;
        } else{
            pwMessage.innerText="비밀번호가 일치하지 않습니다.";
            pwMessage.classList.add("error");
            pwMessage.classList.remove("confirm");
            checkObj.memberPwConfirm=false;
        }

    } else { // 비밀번호가 유효하지 않은 경우
        checkObj.memberPwConfirm=false;
    }


});



// 닉네임 유효성 검사
const memberNickname = document.getElementById("memberNickname");
const nicknameMessage = document.getElementById("nicknameMessage");

memberNickname.addEventListener("input",function(){

    if(memberNickname.value.trim().length==0) {
        nicknameMessage.innerText="한글,영어,숫자로만 2~10글자 사이로 입력하세요.";
        nicknameMessage.classList.remove("confirm","error");
        checkObj.memberNickname=false;
        return;
    }

    const regEx = /^[A-Za-x가-힣\d]{2,10}$/;

    if(regEx.test(memberNickname.value)){

        // ** 닉네임 중복검사 코드 추가 예정 **

        nicknameMessage.innerText="유효한 닉네임 형식입니다.";
        nicknameMessage.classList.add("confirm");
        nicknameMessage.classList.remove("error");
        checkObj.memberNickname=true;
    } else{
        nicknameMessage.innerText="유효하지 않은 닉네임 형식입니다.";
        nicknameMessage.classList.remove("confirm");
        nicknameMessage.classList.add("error");
        checkObj.memberNickname=false;
    }


});


// 전화번호 유효성 검사
const memberTel = document.getElementById("memberTel");
const telMessage = document.getElementById("telMessage");

memberTel.addEventListener("input",function(){

    if(memberTel.value.trim().length==0) {
        telMessage.innerText="전화번호를 입력해주세요.(- 제외)";
        telMessage.classList.remove("confirm","error");
        checkObj.memberTel=false;
        return;
    }

    const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;

    if(regEx.test(memberTel.value)){
        telMessage.innerText="유효한 전화번호 형식입니다.";
        telMessage.classList.add("confirm");
        telMessage.classList.remove("error");
        checkObj.memberTel=true;
    } else{
        telMessage.innerText="유효하지 않은 전화번호 형식입니다.";
        telMessage.classList.remove("confirm");
        telMessage.classList.add("error");
        checkObj.memberTel=false;
    }


});



























// 유효성 검사 결과 저장 JS 객체
// JS 객체 = {K:V, K:V, ..} (Map 형식, Key는 String)

// 변수명.key 또는 변수명["key"]를 이용해 객체 속성 접근 가능
const checkObj = {
    "memberEmail" : false, 
    "memberPw" : false, 
    "memberPwConfirm" : false, 
    "memberNickname" : false, 
    "memberTel" : false,
    "authKey" : false
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
                case "authKey" : str="인증이 완료되지 않았습니다."; break;
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

        // 이메일이 유효한 형식이라면 중복되는 이메일이 있는지 검사
        // -> AJAX 이용

        // jQuery를 이용한 ajax 코드
        // $.ajax(JS 객체)
        // $ : jQuery 기호
        // $.ajax() : jQuery에서 제공하는 ajax라는 이름의 함수
        // JS 객체 : {K:V, K:V, ...}
        // $.ajax() 함수의 매개변수로 전달되는 객체에는 반드시 "url"이라는 key가 포함되어야 하며
        // 선택적으로 data, type, dataType, success, error, complete, async 등을 포함시킬 수 있다

        $.ajax({
            "url" : "/emailDupCheck", // 비동기 통신을 진행 할 서버 요청 주소
            data : {"memberEmail": memberEmail.value},  //JS -> 서버로 전달할 값 (여러 개 가능)
            type : "GET", // 데이터 전달 방식(GET/POST)
            success : (result) => { // 비동기 통신을 성공해서 응답을 받았을 때
                // result : 서버로부터 전달 받은 응답 데이터 (매개변수 이름은 자유)

                console.log(result);

                if(result==0) { // 중복 아님
                    emailMessage.innerText="사용가능한 이메일 입니다.";
                    emailMessage.classList.add("confirm");
                    emailMessage.classList.remove("error");
                    checkObj.memberEmail=true;
                } else { // 중복
                    emailMessage.innerText="이미 사용중인 이메일 입니다.";
                    emailMessage.classList.remove("confirm");
                    emailMessage.classList.add("error");
                    checkObj.memberEmail=false;
                }
            },
            error : () => { // 비동기 통신이 실패했을 때 수행
                console.log("ajax 통신 실패");
            },
            complete : () => { // success, error 수행 여부 관계없이 무조건 수행
                console.log("중복 검사 수행 완료");
            }
        });

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

    const regEx = /^[A-Za-z가-힣\d]{2,10}$/;

    if(regEx.test(memberNickname.value)){

        // ** 닉네임 중복검사 코드 추가 예정 **
        const param = {"memberNickname" : memberNickname.value}

        $.ajax({
            url : '/nicknameDupCheck',
            data : param,
            // type : 'GET', // type 미작성 시 기본값 GET
            success : (res) => {
                    // 매개변수 res == 서버 비동기 통신 응답 데이터

                if(res==0){
                    nicknameMessage.innerText="사용 가능한 닉네임 입니다.";
                    nicknameMessage.classList.add("confirm");
                    nicknameMessage.classList.remove("error");
                    checkObj.memberNickname=true;
                } else {
                    nicknameMessage.innerText="이미 사용중인 닉네임 입니다.";
                    nicknameMessage.classList.remove("confirm");
                    nicknameMessage.classList.add("error");
                    checkObj.memberNickname=false;
                }
            },
            error : () => {
                console.log("닉네임 중복 검사 실패");
            },
            complete : tempFn 
                        // function tempFn(){
                        //      console.log("닉네임 검사 완료");
                        // } ==> 함수 이름만 적으면 안에 내용이 출력

        });



    } else{
        nicknameMessage.innerText="유효하지 않은 닉네임 형식입니다.";
        nicknameMessage.classList.remove("confirm");
        nicknameMessage.classList.add("error");
        checkObj.memberNickname=false;
    }


});

function tempFn(){
    console.log("닉네임 검사 완료");
}


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


//--------------------------------------------------------------------------
// 이메일 인증코드 발송 / 확인
// 인증번호 발송
const sendAuthKeyBtn = document.getElementById("sendAuthKeyBtn");
const authKeyMessage = document.getElementById("authKeyMessage");
let authTimer;
let authMin = 4;
let authSec = 59;


sendAuthKeyBtn.addEventListener("click", function(){
    authMin = 4;
    authSec = 59;

    checkObj.authKey = false;

    if(checkObj.memberEmail){ // 중복이 아닌 이메일인 경우
        $.ajax({
            url : "/sendEmail/signUp",
            data : {"email": memberEmail.value},
            success : (result) => {
                if(result > 0){
                    console.log("인증 번호가 발송되었습니다.")
                }else{
                    console.log("인증번호 발송 실패")
                }
            }, error : () => {
                console.log("이메일 발송 중 에러 발생");
            }
        })

        alert("인증번호가 발송 되었습니다.");

        
        authKeyMessage.innerText = "05:00";
        authKeyMessage.classList.remove("confirm");

        authTimer = window.setInterval(()=>{

            authKeyMessage.innerText = "0" + authMin + ":" + (authSec<10 ? "0" + authSec : authSec);
            
            // 남은 시간이 0분 0초인 경우
            if(authMin == 0 && authSec == 0){
                checkObj.authKey = false;
                clearInterval(authTimer);
                return;
            }

            // 0초인 경우
            if(authSec == 0){
                authSec = 60;
                authMin--;
            }


            authSec--; // 1초 감소

        }, 1000)

    } else{
        alert("중복되지 않은 이메일을 작성해주세요.");
        memberEmail.focus();
    }

});


// 인증 확인
const authKey = document.getElementById("authKey");
const checkAuthKeyBtn = document.getElementById("checkAuthKeyBtn");

checkAuthKeyBtn.addEventListener("click", function(){

    if(authMin > 0 || authSec > 0){ // 시간 제한이 지나지 않은 경우에만 인증번호 검사 진행

        $.ajax({
            url : "/sendEmail/checkAuthKey",
            data : {"inputKey": authKey.value},
            success : (result) => {

                if(result > 0){
                    clearInterval(authTimer);
                    authKeyMessage.innerText = "인증되었습니다.";
                    authKeyMessage.classList.add("confirm");
                    checkObj.authKey = true;

                } else{
                    alert("인증번호가 일치하지 않습니다.")
                    checkObj.authKey = false;
                }
            }, 
            
            error : () => {
                console.log("인증코드 확인 오류");
            }
            
        })

    } else{
        alert("인증 시간이 만료되었습니다. 다시 시도해주세요.")
    }


});























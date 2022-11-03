
// << 비밀번호 변경 유효성 검사 >>

const changePwForm = document.getElementById("changePwForm");

if(changePwForm != null) { //changePwForm 요소가 존재할 때만 수행
    changePwForm.addEventListener("submit", function(event){

        // ** 이벤트 핸들러 매개변수 event || e **
        // -> 현재 발생한 이벤트 정보를 가지고 있는 event 객체가 전달됨
        console.log(event);

        const currentPw = document.getElementById("currentPw");
        const newPw = document.getElementById("newPw");
        const newPwConfirm = document.getElementById("newPwConfirm");
        
        // 현재 비밀번호가 작성되지 않았을 때
        if(currentPw.value.trim().length==0){
            alertAndFocusAndDelete(currentPw, "현재 비밀번호를 입력해주세요.")

            // return false; --> 인라인 이벤트 모델 onsubmit = "return 함수명()"; 에서 사용
            
            event.preventDefault(); 
            // preventDefault() : 이벤트를 수행하지 못하게 하는 함수 
            //                    --> 기본 이벤트 삭제

            return;
        }

        // 새 비밀번호가 작성되지 않았을 때
        if(newPw.value.trim().length==0){
            alertAndFocusAndDelete(newPw, "새 비밀번호를 입력해주세요.")

            event.preventDefault();
            return;
        }
        
        // 새 비밀번호 확인이 작성되지 않았을 때
        if(newPwConfirm.value.trim().length==0){
            alertAndFocusAndDelete(newPwConfirm, "새 비밀번호를 확인해주세요.")

            event.preventDefault();
            return;
        } 


        // 비밀번호 정규식 검사



        // 새 비밀번호와 새 비밀번호 확인이 같은 지 검사
        if(newPw.value != newPwConfirm.value){
            alertAndFocus(newPwConfirm,"새 비밀번호가 일치하지 않습니다.");
            event.preventDefault();
        }

    });

}

// 경고창 출력 + 포커스 이동 + 값 삭제
function alertAndFocusAndDelete(input, str) {
    alert(str);
    input.focus();
    input.value="";
}

// 경고창 출력 + 포커스 이동
function alertAndFocus(input, str) {
    alert(str);
    input.focus();
}

// << 회원 탈퇴 >>

// 회원 탈퇴 표준 이벤트 모델
const memberDeleteForm = document.getElementById("memberDeleteForm");
if(memberDeleteForm !=null){

    memberDeleteForm.addEventListener("submit", function(event){

        const memberPw = document.getElementById("memberPw");
        const agree = document.getElementById("agree");
        
        // 1) 비밀번호 미작성
        if(memberPw.value.trim().length==0){
            alertAndFocusAndDelete(memberPw, "비밀번호를 입력해주세요.");
            event.preventDefault();

            return;
        }

        // 2) 동의 체크가 되지 않는 경우
        if(!agree.checked) {
            alertAndFocus(agree, "탈퇴를 동의하시면 체크를 눌러주세요.")
            event.preventDefault();

            return;
        }

        // 3) 1, 2 번이 모두 유효할 때 정말 탈퇴할 것인지 확인하는 confirm 출력
        if(!confirm("정말 탈퇴를 진행하시겠습니까?")) {
            alert("탈퇴가 취소되었습니다.")
            event.preventDefault();
        }
    
    });

}

// 회원 탈퇴 인라인 이벤트 모델
// form 태그에 onsubmit="return deleteConfirm()" 추가

// function deleteConfirm() {

//     const memberPw = document.getElementById("memberPw");
//     const agree = document.getElementById("agree");

//     // 1) 비밀번호 미작성
//     if(memberPw.value.trim().length==0){
//         alertAndFocusAndDelete(memberPw, "비밀번호를 입력해주세요.");
//         return false;
//     }

//     // 2) 동의 체크가 되지 않는 경우
//     if(!agree.checked) {
//         alertAndFocus(agree, "탈퇴를 동의하시면 체크를 눌러주세요.")
//         return false;
//     }

//     // 3) 1, 2 번이 모두 유효할 때 정말 탈퇴할 것인지 확인하는 confirm 출력
//     if(!confirm("정말 탈퇴를 진행하시겠습니까?")) {
//         return false;
//     }

// }











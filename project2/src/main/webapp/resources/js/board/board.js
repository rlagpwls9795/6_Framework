/* 상세 조회......... */




// 목록으로 버튼 만들기
const goToListBtn = document.getElementById("goToListBtn");
goToListBtn.addEventListener("click",()=>{

    // location : 주소, 주소창과 관련된 내장 객체
    // location.href : 현재 주소 (전체)
    // location.href = "주소" : 작성된 주소 요청
    // location.pathname : 현재 요청 주소만을 반환 (프로토콜, IP, 포트 제외)
    // location.search : queryString만 반환

    const pathname = location.pathname; //  /board/1/1500
    const queryString = location.search; //  ?cp=7
    const url =  pathname.substring(0,pathname.lastIndexOf("/"))+queryString; // /board/1?cp=7

    location.href=url;


});

/* 좋아요 버튼 클릭 시 동작 */
// (전역변수 memberNo, boardNo 사용 (boardDetail.jsp) ) 
const boardLike = document.getElementById("boardLike");
boardLike.addEventListener("click",e=>{

    // 로그인 X 상태
    if(memberNo == ""){
        alert("로그인 후 이용해주세요.")
        return;
    }

    // 하트의 다음 형제 요소
    const likeCount = e.target.nextElementSibling;

    // 로그인 O 상태 + 좋아요 X 상태
    if(e.target.classList.contains('fa-regular')) { 
        // 이벤트가 발생한 요소의 클래스가 fa-regular를 포함할 때 == 빈 하트(좋아요가 눌러져 있지 않음)
        
        $.ajax({
            url:'/boardLikeUp',
            data : {"memberNo": memberNo, "boardNo": boardNo},
            type : 'GET',
            success : (result)=>{

                if(result>0){
                    e.target.classList.remove('fa-regular');
                    e.target.classList.add('fa-solid');
                    likeCount.innerText = Number(likeCount.innerText)+1;
                } else {
                    console.log("증가 실패");
                }
            },
            error : ()=>{console.log("증가 에러");}
        });
        
    }
    // 로그인 O 상태 + 좋아요 O 상태 == 채워진 하트
    else {

        $.ajax({
            url:'/boardLikeDown',
            data : {"memberNo": memberNo, "boardNo": boardNo},
            type : 'GET',
            success : (result)=>{

                if(result>0) {
                    e.target.classList.add('fa-regular');
                    e.target.classList.remove('fa-solid');
                    likeCount.innerText = Number(likeCount.innerText)-1;
                } else {
                    console.log("감소 실패");
                }
            },
            error : ()=>{console.log("감소 에러");}
        });
        
    }



});








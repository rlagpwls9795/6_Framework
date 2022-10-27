package edu.kh.project.member.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.project.member.model.service.MyPageService;
import edu.kh.project.member.model.vo.Member;

// 클래스 레벨에 작성된 @RequestMapping
// -> 요청 주소 중 공통된 부분을 작성하여 해당 유형의 요청을 모두 받아들인다고 알림
@RequestMapping("/member/myPage")
@SessionAttributes("loginMember")//탈퇴 성공 시 로그아웃에 사용
@Controller //bean 등록
public class MyPageController {

	@Autowired
	private MyPageService service;
	
	//내 정보 페이지 이동
	@GetMapping("/info")
	public String info() {
		return "member/myPage-info";
	}
	
	@PostMapping("/info")
	public String updateInfo(Member inputMember, String[] memberAddress, 
							@SessionAttribute("loginMember") Member loginMember,
							RedirectAttributes ra) {
		
		// inputMember : 입력 받은 memberNickname / memberTel / memberAddress(가공 필요)
		// memberAddress : 입력된 우편번호, 주소, 상세주소가 담긴 배열
		
		// @SessionAttribute("loginMember") Member loginMember
		// -> 세션의 속성 중 "loginMember"를 키로 가지는 값을 매개변수 loginMember에 대입
	    // 기존 방법
	    // HttpSession session = req.getSession();
	    // Member loginMember = (Member)session.getAttribute("loginMember");
		
		// 1. 로그인된 회원 정보에서 회원 번호를 얻어와 inputMember에 저장
		inputMember.setMemberNo(loginMember.getMemberNo());
		
		// 2. inputMember.memberAddress의 값에 따라 변경
		if(inputMember.getMemberAddress().equals(",,")) { //주소 미작성
			inputMember.setMemberAddress(null);
		} else {
			String address = String.join(",,", memberAddress);
			inputMember.setMemberAddress(address);
		}
		
		// 회원 정보 수정 서비스 호출 후 결과 반환 받기
		int result = service.updateInfo(inputMember);
		
		String message = null;
		
		if(result>0) {
			message="회원정보가 수정되었습니다.";

			// DB와 session 동기화
			loginMember.setMemberNickname(inputMember.getMemberNickname());
			loginMember.setMemberTel(inputMember.getMemberTel());
			loginMember.setMemberAddress(inputMember.getMemberAddress());
			
		} else {
			message="회원정보 수정 실패";	
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:info";
	}
	
	// 비밀번호 변경 페이지 이동
	@GetMapping("/changePw")
	public String changePw() {
		return "member/myPage-changePw";
	}
	
	
	@PostMapping("/changePw")
	public String changePw(@SessionAttribute("loginMember") Member loginMember,
							/*String currentPw, String newPw, //파라미터 각각 전달 받기 */
							@RequestParam Map<String, Object> paramMap,
							RedirectAttributes ra) {
		
		// @RequestParam Map<String, Object> paramMap : 모든 파라미터를 Map 형식으로 얻어 와 저장
		
		// 1. loginMember에서 회원 번호를 얻어 와 paramMap에 추가
		paramMap.put("memberNo", loginMember.getMemberNo());
		
		// 2. 서비스 호출 후 결과 반환 받기
		int result = service.changePw(paramMap);
		
		String path=null;
		String message=null;
		
		if(result>0) {
			message="비밀번호가 변경되었습니다.";
			path="info";
			
		} else {
			message="현재 비밀번호가 일치하지 않습니다.";	
			path="changePw";
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:"+path;
	}
	
	
	// 회원 탈퇴 페이지 이동
	@GetMapping("/delete")
	public String memberDelete() {
		return "member/myPage-delete";
	}
	
	@PostMapping("/delete")
	public String memberDelete(@SessionAttribute("loginMember") Member loginMember,
								String memberPw, SessionStatus status, RedirectAttributes ra ) {
		
		int result = service.memberDelete(loginMember.getMemberNo(), memberPw);
							// MEMBER_DEL_FL = 'Y'으로 UPDATE
		
		String path=null;
		String message=null;
		
		if(result>0) {
			message="탈퇴되었습니다.";
			path="/";
			
			//로그아웃
			status.setComplete();
			
		} else {
			message="비밀번호가 일치하지 않습니다.";	
			path="delete";
		}
		
		ra.addFlashAttribute("message", message);
		
		//status.setComplete(); // 세션 무효화
		// -> 클래스 레벨에 작성된
		// @SessionAttributes("key")에 작성된 key가 일치하는 값만 무효화
		
		// ex) session에서 "loginMember"를 없애야 한다
		// ==> @SessionAttributes("loginMember")
		// ==> status.setComplete();
		
		return "redirect:"+path;
	}
	
}




















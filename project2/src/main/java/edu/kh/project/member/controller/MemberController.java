package edu.kh.project.member.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.project.member.model.service.MemberService;
import edu.kh.project.member.model.vo.Member;

// 회원 관련 요청을 받는 controller

/* 
*  Controller : 프레젠테이션 레이어 
*				웹 애플리케이션으로 전달받은 클라이언트의 요청을
*				알맞은 서비스로 연결하고
*				서비스에서 반환된 결과에 따라
*				알맞은 화면으로 응답하는 방법을 제어하는 역할
*/

// Controller 어노테이션 : 컴파일러에게 현재 클래스가 Controller임을 알려줌 
//						+ bean 등록 (Spring이 객체로 만들어서 관리한다라는 뜻)
@Controller

// SessionAttributes 어노테이션 : Model에 추가된 속성 중 Key가 일치하는 속성을 session scope 속성으로 추가
@SessionAttributes({"loginMember", "message"})
public class MemberController {
	
	// @Autowired 
	// => bean scanning을 통해 bean으로 등록된 객체 중 알맞은 객체를 DI(의존성 주입)해주는 어노테이션
	// 자동 연결 규칙 : 타입이 같거나 상속 관계인 bean을 자동으로 DI
	
	// * 공용으로 사용할 Service 객체 생성 *
	@Autowired
	private MemberService service;
	
	// @RequestMapping : 클라이언트의 요청을 처리할 클래스/메서드를 지정하는 어노테이션
	// == HandlerMapping
	
// *** 파라미터를 전달 받는 방법
// 1. HttpServletRequest를 이용하는 방법
	
	// 로그인 요청 (POST)
	//@RequestMapping(value = "/member/login", method=RequestMethod.POST )
	public String login(HttpServletRequest req) {
		
		String inputEmail = req.getParameter("inputEmail");
		String inputPw = req.getParameter("inputPw");
		
		System.out.println(inputEmail);
		System.out.println(inputPw);
		
		// * forward 방법 * : prefix / suffix를 제외한 나머지 jsp 경로 작성
		// * redirect 방법 * : "redirect:요청주소"; 작성		
		return "redirect:/";
	}
	
// 2. @RequestParam 어노테이션 사용
//    - 메서드 매개변수에 전달받은 파라미터를 주입하는 어노테이션
	// [속성]
	// value : 전달 받은 input 태그의 name 속성값
		   
	// required : 입력된 name 속성값 파라미터 필수 여부 지정(기본값 true)
	// -> required = true인 파라미터가 존재하지 않는다면 400 Bad Request 에러 발생
	// -> required = true인 파라미터가 null인 경우에도 400 Bad Request
	// -> required = false인 경우 전달된 파라미터가 없으면 null
	// 
	
	// defaultValue : 파라미터 중 일치하는 name 속성 값이 없을 경우에 대입할 값 지정.
	// -> required = false인 경우 사용
	
//	@RequestMapping(value = "/member/login", method=RequestMethod.POST )	
	public String login(@RequestParam("inputEmail") String email, 
			@RequestParam(value="inputPw2", required=false, defaultValue="1234") String pw,
			String inputPw) {
		
		System.out.println(email);
		System.out.println(pw);	
		System.out.println(inputPw);
		
		return "redirect:/";
	}
	
	// * @RequestParam 생략하기 *
	// 조건 : 매개변수 이름 == input name 속성 값
//	@RequestMapping(value = "/member/login", method=RequestMethod.POST )	
	public String login(String inputEmail, String inputPw) {
		System.out.println(inputEmail);
		System.out.println(inputPw);
		
		return "redirect:/";
	}
	
	//@RequestMapping(value="/member/login", method=RequestMethod.POST)
	//==@PostMapping("/member/login") //POST 방식의 /member/login 요청 연결
	//@GetMapping("/member/login") //Get 방식의 /member/login 요청 연결

	
// 3. @ModelAttribute 어노테이션 이용	
	// [작성법]
	// @ModelAttribute VO타입 매개변수명
	// -> 파라미터의 name 속성 값이 지정된 VO의 필드명과 같다면
	//    해당 VO 객체의 필드에 파라미터 세팅
	
	// [조건]
	// 1. name 속성 값과 필드명이 같아야 함
	// 2. VO에 반드시 기본 생성자가 존재해야 함
	// 3. VO에 반드시 setter가 존재해야 함
	
	// * @ModelAttribute 어노테이션 생략 가능
	// == 커맨드 객체
	
	// * 참고 *
	// Controller 메서드 매개변수에 객체를 작성하면 자동으로 생성되거나 얻어올 수 있는 이유
	// -> Spring Container에서 Argument Resolver(매개변수 해결사) 제공해서 유연하게 처리함
	
	@PostMapping("/member/login")
	public String login(/* @ModelAttribute */ Member inputMember, 
				Model model, RedirectAttributes ra, @RequestParam(value="saveId", required=false) String saveId, //saveId == 체크박스 값 얻어오기
				HttpServletResponse resp, @RequestHeader(value="referer") String referer) { //resp == 쿠키 전달용
		
		
		// Model : 데이터 전달용 객체
		// - 데이터를 Map 형식으로 저장하여 전달하는 객체로서 requestScope가 기본값
		// + @SessionAttributes 어노테이션과 함께 작성 시 session scope로 변환 가능
		
		// RedirectAttributes
		// - 리다이렉트 시 값을 전달하는 용도의 객체
		// - 응답 전 : requeset scope
		// - redirect 중 : session scope
		// - 응답 후 : request scope
		


		
		// 서비스 호출 후 결과 반환 받기
		Member loginMember = service.login(inputMember);
		
		String path=null; // 리다이렉트 경로를 저장할 변수
		
		if(loginMember!=null) {
			path="/";
			
			// 로그인 성공 시 세션에 추가
			
			// addAttribute("K",V) == req.setAttribute("K", V)
			model.addAttribute("loginMember", loginMember);
			// -> requset scope 상태
			
			// @SessionAttributes("loginMember") 클레스를 위에 추가하면
			// -> session scope로 변환
			
			//*******************************************************
			// 쿠키 생성
			Cookie cookie = new Cookie("saveId", loginMember.getMemberEmail());
			// 쿠키 유지 시간 지정 
			if(saveId!=null) { //체크되었을 때
				//1년 동안 유지
				cookie.setMaxAge(60*60*24*365);
			} else { //체크 되어있지 않았을 때
				//0초 동안 유지 -> 생성과 동시에 삭제
				// -> 클라이언트의 쿠키 파일을 삭제
				cookie.setMaxAge(0);
			}
			
			//쿠키가 사용될 경로 지정
			cookie.setPath("/"); // localhost 밑에 모든 경로에서 사용
			
			//생성된 쿠키를 응답 객체에 담아서 클라이언트에게 전달
			resp.addCookie(cookie);
			//*******************************************************
			
			
		} else { 
			//기존 방법 : path=req.getHeader("referer");
			//새로운 방법 : @RequestHeader(value="referer") String referer를 메서드 매개변수로
			
			path=referer;  //로그인 요청 전 페이지 주소 (referer)
			
			// 로그인 실패 시 "아이디 또는 비밀번호가 일치하지 않습니다." 세션에 추가
			
//			model.addAttribute("message", "아이디 또는 비밀번호가 일치하지 않습니다.");
			// -> 메인 페이지 주소에 메세지 값이 노출
			// -> RedirectAttributes로 변환
			
			// addFlashAttribute() : 잠깐 session scope 에 추가
			ra.addFlashAttribute("message", "아이디 또는 비밀번호가 일치하지 않습니다.");			

		}
		
		return "redirect:"+path;
	}
	
	
	
	// 로그인 페이지로 이동
	@GetMapping("/member/login")
	public String loginPage() {
		
		return "member/login";
	}
	
	
	//로그아웃
	@GetMapping("/member/logout")
	public String logout(SessionStatus status) {
		
		// 기존 방법 : 
		// HttpServletRequest req;
		// HttpSession session = req.getSession();
		// session.invalidate();
		// -> X -> 왜? @SessionAttributes로 session scope에 등록된 값을 무효화시키려면
		//			   SessionStatus라는 별도의 객체를 이용해야 한다.
		
		status.setComplete();  //세션 무효화
		
		return "redirect:/";
	}
	
	
	//회원가입 페이지
	@GetMapping("/member/signUp")
	public String signUpPage(){
		return "member/signUp";
	}
	
	//회원가입
	@PostMapping("/member/signUp")
	public String signUp(Member inputMember /*커맨드 객체*/ , 
						String[] memberAddress /*name 속성 값이 memberAddress인 값을 배열로 반환*/ ,
						RedirectAttributes ra, @RequestHeader("referer") String referer) {
		
		// 한글이 깨지는 이유 -> POST 요청 시 인코딩 처리 필요 -> 인코딩 필터 처리(web.xml)
		
		// Spring은 
		// 1) 같은 name 속성을 가진 input 태그의 값을 값,값,값,값,... 자동으로 하나의 문자열로 만들어줌
		// 2) input type="text"의 값이 작성되지 않은 경우 null이 아닌 빈 칸으로 값을 얻어 옴
		
		if(inputMember.getMemberAddress().equals(",,")) {
			// 주소가 작성되지 않은 경우 ==> null
			inputMember.setMemberAddress(null);
		} else {
			// 주소가 작성된 경우 ==> 주소,,주소,,주소
			inputMember.setMemberAddress(String.join(",,", memberAddress));
		}
		
		// 서비스 호출 후 결과 반환 받기
		int result = service.signUp(inputMember);
		
		String path=null;
		String message=null;
		
		if(result>0 ) {
			path="/";
			message="회원 가입 성공";
		} else {
			path=referer;
			message="회원 가입 실패";
			
			// 이전 페이지로 돌아갔을 때 입력했던 값을 같이 전달
			inputMember.setMemberPw(null); //비밀번호 삭제
			ra.addFlashAttribute("tempMember", inputMember);
			
		}
		
		ra.addFlashAttribute("message", message);
				
		return "redirect:"+path;
	}
	
	
	/* spring 예외 처리 방법 (3종류, 중복 사용 가능)
	 * 1순위 : try-catch / throws 예외 처리 구문
	 * 		  -> 메서드 단위로 처리
	 * 
	 * 2순위 : @ExceptionHandler 어노테이션
	 * 		  -> 클래스 단위로 처리
	 * 		  - 하나의 controller에서 발생하는 예외를 하나의 메서드에 모아서 처리 
	 * 
	 * 3순위 : @ControllerAdvice 어노테이션
	 * 		  -> 전역(웹 애플리케이션)에서 발생하는 예외 모아서 처리
	 *		  - 별도의 클래스로 작성 
	 * */

	// MemberController에서 발생하는 모든 예외 모아서 처리
//	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e, Model model) {
		
		// 매개변수 Exception e : 발생한 예외를 전달 받는 매개변수
		e.printStackTrace();
		
		model.addAttribute("errorMessage", "회원관련 서비스 이용 중 문제가 발생했습니다.");
		model.addAttribute("e", e);
		
		return "common/error";
	}
	
}

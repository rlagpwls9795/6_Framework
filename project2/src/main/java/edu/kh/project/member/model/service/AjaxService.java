package edu.kh.project.member.model.service;

// 서비스 인터페이스 만든 이유
// 설계, 유지보수성 향상, AOP 때문
public interface AjaxService {

	/** 이메일 중복검사 service
	 * @param memberEmail
	 * @return result
	 */
	int emailDupCheck(String memberEmail);

}

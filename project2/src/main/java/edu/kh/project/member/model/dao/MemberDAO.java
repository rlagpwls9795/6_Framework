package edu.kh.project.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.project.member.model.vo.Member;

@Repository //persistence 레이어, 영속성(파일, DB)을 가진 클래스 + bean 등록
public class MemberDAO {
	
	//DBCP + 마이바티스 이용 객체 DI
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 로그인 DAO
	 * @param memberEmail
	 * @return loginMember
	 */
	public Member login(String memberEmail) {
		
		//     sqlSession.selectOne("매퍼이름.태그id", SQL 작성 시 필요한 값);
		return sqlSession.selectOne("memberMapper.login", memberEmail);
	}
	
}

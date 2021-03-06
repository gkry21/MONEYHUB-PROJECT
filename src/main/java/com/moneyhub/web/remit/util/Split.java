package com.moneyhub.web.remit.util;

import java.util.ArrayList;
import java.util.List;

/*split 과 [] 배열과 친해지기*/
public class Split {
	public static void main(String[] args) {
		String data = "기준_일자\r\n" + "거래_일련_번호\r\n" + "고객_번호\r\n" + "순번\r\n"
				+ "거래_종류_코드\r\n" + "거래_상태_코드\r\n" + "변경_사유_코드\r\n"
				+ "계좌_번호\r\n" + "국가_코드\r\n" + "환율\r\n" + "생성_아이디\r\n"
				+ "생성_일자\r\n" + "수정_아이디\r\n" + "수정_일자\r\n" + "기준_일자\r\n"
				+ "거래_일련_번호\r\n" + "고객_번호\r\n" + "거래_종류_코드\r\n"
				+ "거래_상태_코드\r\n" + "변경_사유_코드\r\n" + "계좌_번호\r\n" + "국가_코드\r\n"
				+ "환율\r\n" + "생성_아이디\r\n" + "생성_일자\r\n" + "수정_아이디\r\n"
				+ "수정_일자\r\n" + "기준_일자\r\n" + "거래_일련_번호\r\n" + "고객_번호\r\n"
				+ "순번\r\n" + "수수료_종류_코드\r\n" + "수수료_상세_코드\r\n" + "수수료_금액\r\n"
				+ "생성_아이디\r\n" + "생성_일자\r\n" + "수정_아이디\r\n" + "수정_일자\r\n"
				+ "기준_일자\r\n" + "거래_일련_번호\r\n" + "고객_번호\r\n" + "수취_여부\r\n"
				+ "수취_일자\r\n" + "수취_여권_이름\r\n" + "수취_일련_번호\r\n" + "수취_장소\r\n"
				+ "생성_아이디\r\n" + "생성_일자\r\n" + "수정_아이디\r\n" + "수정_일자\r\n"
				+ "국가_코드\r\n" + "기준_일자\r\n" + "환율\r\n" + "생성_아이디\r\n"
				+ "생성_일자\r\n" + "수정_아이디\r\n" + "수정_일자\r\n" + "고객_번호\r\n"
				+ "이메일\r\n" + "고객_이름\r\n" + "비밀_번호\r\n" + "고객_상태_코드\r\n"
				+ "가입_일자\r\n" + "탈퇴_일자\r\n" + "생성_아이디\r\n" + "생성_일자\r\n"
				+ "수정_아이디\r\n" + "수정_일자\r\n" + "고객_번호\r\n" + "계좌_번호\r\n"
				+ "은행_코드\r\n" + "계좌_상태_코드\r\n" + "생성_아이디\r\n" + "생성_일자\r\n"
				+ "수정_아이디\r\n" + "수정_일자\r\n" + "기준_일자\r\n" + "고객_번호\r\n"
				+ "계좌_번호\r\n" + "순번\r\n" + "은행_코드\r\n" + "계좌_상태_코드\r\n"
				+ "변경_사유_코드\r\n" + "비고\r\n" + "생성_아이디\r\n" + "생성_일자\r\n"
				+ "수정_아이디\r\n" + "수정_일자\r\n" + "관리자_번호\r\n" + "이메일\r\n"
				+ "사원_이름\r\n" + "비밀_번호\r\n" + "상태_코드\r\n" + "권한_코드\r\n"
				+ "가입_일자\r\n" + "탈퇴_일자\r\n" + "생성_아이디\r\n" + "생성_일자\r\n"
				+ "수정_아이디\r\n" + "수정_일자\r\n" + "코드\r\n" + "코드_이름\r\n"
				+ "순번\r\n" + "상세_코드\r\n" + "상세_코드_이름\r\n" + "생성_아이디\r\n"
				+ "생성_일자\r\n" + "수정_아이디\r\n" + "수정_일자\r\n" + "순번\r\n"
				+ "제목\r\n" + "내용\r\n" + "생성_아이디\r\n" + "생성_일자\r\n"
				+ "수정_아이디\r\n" + "수정_일자\r\n";

		String[] colNm = data.split("\r\n");
		List<String> list = new ArrayList<String>();
		
		for(int i = 0; i < colNm.length; i++){
			String[] colDetail = colNm[i].split("_");
			for(int j = 0; j < colDetail.length; j++){
				boolean flag = false;
				for(int k = 0; k < list.size(); k++){
					if (colDetail[j].equals(list.get(k))) {
						flag = true;
					}
				}
				if(!flag){
					list.add(colDetail[j]);
				}
			}
		}
		System.out.println(list);
		
	};

}

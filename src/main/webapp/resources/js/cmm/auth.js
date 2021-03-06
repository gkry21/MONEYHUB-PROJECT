"use strict"
var auth = auth || {}
auth =(()=>{
	const WHEN_ERR = 'js파일을 찾지 못했습니다.'
	let _, js, img, auth_vue_js, cookie_js, exch, cus
	
	let init =()=>{
		_ = $.ctx()
		js = $.js()
		img = $.img()
		exch = $.exch()
		cus = $.cusInfo()
		auth_vue_js = js + '/vue/auth_vue.js'
		cookie_js = js + '/cmm/cookie.js'
		
	}
	let onCreate =x=>{
		init()
		$.when(
			$.getScript(auth_vue_js),
			$.getScript(cookie_js)
		)
		.done(()=>{
			setContentView(x)
			
		})
		.fail(()=>{
			alert(WHEN_ERR)
		})
	}
	
	let setContentView =x=>{
		if( x === 'join' ){
			join_1_page()
			join_2_page_btn()
			login_page_a()
		}
		else{
			login_page()
			login()
		}
		
	}
	let login_page =()=>{
		$('#root')
		.html(auth_vue.login_body(_))
		
		$(auth_vue.login())
		.appendTo('.themoin-login')
		
		$('#login_logo')
		.click(()=>{
			app.onCreate()
			$('html').scrollTop(0)
		})

		$('#cemail').val('song@gmail.com')
		$('#cpwd').val('aa')


		join_2_page_btn()
	}
	
	let login_page_a =()=>{
		$('<p style="margin: 33px auto 0px;"><a>이미 회원이신가요?</a></p>')
		.appendTo('.moin-login')
		.click(()=>{
			login_page()
			login()
		})
	}
	
	let login =()=>{
		$('<button/>')
		.text('로그인')
		.addClass('btn-submit')
		.appendTo('.moin-login form.login')
		.click(e=>{
			e.preventDefault()
			$.ajax({
				url : _ + '/customers/login/'+ $('#cemail').val() + '/',
				type : 'POST',
				data : JSON.stringify({
					cemail : $('#cemail').val(),
					cpwd : $('#cpwd').val()
				}),
				dataType : 'json',
				contentType : 'application/json',
				success : d=>{
					if(d.msg === 'SUCCESS'){
						sessionStorage.setItem('cus', JSON.stringify(d.cus))
						sessionStorage.setItem('acc', JSON.stringify(d.acc))
						mypage.onCreate()
					}
					else{
						alert('이메일 및 비밀번호를 확인해주세요.')
						$('#login_pwd').text('이메일 및 비밀번호를 확인해주세요.')
						$('#login_pwd').css('color', 'red')
					}					
				},
				error : e=>{
					alert('login ajax 실패')  
				}
			})
		})
	}
	
	let join_1_page =()=>{
		$('#root')
		.html(auth_vue.login_body(_))
		
		$('#login_logo')
		.click(()=>{
			app.onCreate()
			$('html').scrollTop(0)
		})
		
		$(auth_vue.join_1())
		.appendTo('.themoin-login')
	}
	
	let join_2_page_btn =()=>{
		$('<button>'+
		  '	<img src="https://img.themoin.com/public/img/login-email.svg">'+
		  '		<p class="newmoin-text-text-button">이메일로<br>시작하기</p>'+
		  '</button>')
		.prependTo('.buttons')
		.click(()=>{
			$('#root')
			.html(auth_vue.join_body(_))
			
			$('#join_logo')
			.click(()=>{
				app.onCreate()
				$('html').scrollTop(0)
			})
			
			$(auth_vue.join_2(img))
			.appendTo('.themoin-signup')
			
			$('#agree_box_all')
				.click(function(){
					if($(this).children('div').hasClass("checked") == true){
						$('#agree_box_all div.box').attr('class', 'box')
			        	$('#agree_box_1 div.box').attr('class', 'box')
			        	$('#agree_box_2 div.box').attr('class', 'box')
			        	$('#agree_box_3 div.box').attr('class', 'box')
					}
			        else{
			        	$('#agree_box_all div.box').attr('class', 'box checked')
			        	$('#agree_box_1 div.box').attr('class', 'box checked')
			        	$('#agree_box_2 div.box').attr('class', 'box checked')
			        	$('#agree_box_3 div.box').attr('class', 'box checked')
			        }
				})
			$.each(['1', '2', '3'], (i, j)=>{
				$('#agree_box_' + j)
				.click(function(){
					if($(this).children('div').hasClass("checked") == true){
						$('#agree_box_'+ j +' div.box').attr('class', 'box')
					}
			        else{
			        	$('#agree_box_'+ j +' div.box').attr('class', 'box checked')
			        	
			        }
				})
			})
			
			$('#code_dropdown')
			.click(function(){
				$(this).attr('class', 'moin-input-group moin-dropdown open')
				$('ul.dropdown-menu').toggle()
			})
			
			$('#code_dropdown .dropdown-toggle')
			.text('+82 (South Korea)')
			.append('<img class="pull-right" src="https://img.themoin.com/public/img/ic-dropdown-p.png">')
			
			$('ul.dropdown-menu li a')
			.click(function(){
				$('#code_dropdown .dropdown-toggle')
				.text($(this).text())
				.append('<img class="pull-right" src="https://img.themoin.com/public/img/ic-dropdown-p.png">')
				
			})
			
			join()
		})
	}

	// 이메일 검사 정규식
	var mailJ = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	// 비밀번호 정규식
	var pwJ = /^[A-Za-z0-9]{2,12}$/;
	// 이름 정규식
	var nameJ = /^[가-힣]{1,10}$/;

	let join =()=>{
		existId()
		
		$('#cpwd').blur(function(){
			if(pwJ.test($('#cpwd').val())){
				$('#pwd_check').text('사용가능한 비밀번호입니다.')
				$('#pwd_check').css('color', 'blue')
			}else{
				$('#pwd_check').text('숫자 or 문자로만 2~12자리 입력')
				$('#pwd_check').css('color', 'red')
			}
		})
		$('#cfm_cpwd').blur(function(){
			if($('#cpwd').val() != $('#cfm_cpwd').val()){
				$('#pwd2_check').text('비밀번호가 일치하지 않습니다.')
				$('#pwd2_check').css('color','red')
			}else{
				$('#pwd2_check').text('비밀번호가 일치합니다.')
				$('#pwd2_check').css('color','blue')
			}
		})
		$('#fname').blur(function(){
			if(nameJ.test($('#fname').val())){
				$('#fname_check').text('')
			}else{
				$('#fname_check').text('이름을 다시 확인해주세요.')
				$('#fname_check').css('color','red')
			}
		})
		$('#lname').blur(function(){
			if(nameJ.test($('#lname').val())){
				$('#lname_check').text('')
			}else{
				$('#lname_check').text('이름(성)을 다시 확인해주세요.')
				$('#lname_check').css('color','red')
			}
		})
		
		// 생일 유효성 검사
		var birthJ = false;
	
		// 생년월일 birthJ 유효성 검사
		$('#birth').blur(function(){
		var dateStr = $('#birth').val();		
		var year = Number(dateStr.substr(0,4)); // 입력한 값의 0~4자리까지 (연)
		var month = Number(dateStr.substr(4,2)); // 입력한 값의 4번째 자리부터 2자리 숫자
		var day = Number(dateStr.substr(6,2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일)
		var today = new Date(); // 날짜 변수 선언
		var yearNow = today.getFullYear(); // 올해 연도 가져옴
		
	    if (dateStr.length <=8) {
			// 연도의 경우 1900 보다 작거나 yearNow 보다 크다면 false를 반환합니다.
		    if (1900 > year || year > yearNow){
		    	
		    	$('#birth_check').text('생년월일을 확인해주세요.');
				$('#birth_check').css('color', 'red');
		    	
		    }else if (month < 1 || month > 12) {
		    		
		    	$('#birth_check').text('생년월일을 확인해주세요.');
				$('#birth_check').css('color', 'red'); 
		    
		    }else if (day < 1 || day > 31) {
		    	
		    	$('#birth_check').text('생년월일을 확인해주세요.');
				$('#birth_check').css('color', 'red'); 
		    	
		    }else if ((month==4 || month==6 || month==9 || month==11) && day==31) {
		    	 
		    	$('#birth_check').text('생년월일을 확인해주세요.');
				$('#birth_check').css('color', 'red'); 
		    	 
		    }else if (month == 2) {
		    	 
		       	var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
		       	
		     	if (day>29 || (day==29 && !isleap)) {
		     		
		     		$('#birth_check').text('생년월일을 확인해주세요.');
					$('#birth_check').css('color', 'red'); 
				}else{
					$('#birth_check').text('');
					birthJ = true;
				}// end of if (day>29 || (day==29 && !isleap))
		     	
		    }else{
		    	
		    	$('#birth_check').text(''); 
				birthJ = true;
			}// end of if
			
			}else{
				// 1.입력된 생년월일이 8자 초과할때 : auth:false
				$('#birth_check').text('생년월일을 확인해주세요.');
				$('#birth_check').css('color', 'red');
			}
		})
		
		
		$('<button/>')
		.text('가입완료')
		.addClass('btn-submit')
		.appendTo('.moin-login form.signup')
		.click(e=>{
			e.preventDefault()
			if($('#cpwd').val() === $('#cfm_cpwd').val() && $('#cpwd').val().length > 0){
				if($('#lname').val().length > 0 && $('#fname').val().length > 0
						&& $('#zip').val().length > 0 && $('#addr').val().length > 0 
						&& $('#daddr').val().length > 0 && $('#birth').val().length > 0){
					$.ajax({
						url : _+'/customers/',
						type : 'POST',
						data : JSON.stringify({
							cemail : $('#cemail').val(),
							cpwd : $('#cpwd').val(),
							cname : $('#lname').val() + $('#fname').val(),
							zip : $('#zip').val(),
							addr : $('#addr').val(),
							daddr : $('#daddr').val(),
							birth : $('#birth').val()

						}),
						dataType : 'json',
						contentType : 'application/json',
						success : d=>{
							if(d.msg === 'SUCCESS'){
								login_page()
								login()
//								alert('회원가입이 완료되었습니다.')
							}else{
//								alert('회원가입 실패')
								alert('시스템 확인 중입니다.')
								return false
							}
						},
						error : e=>{
							alert('잘못 입력된 부분이 있습니다.1')
							return false
						}
					})
				}else{
					alert('잘못 입력된 부분이 있습니다.2')
				}
			}else{
				alert('잘못 입력된 부분이 있습니다.3')
				return false
			}
		})
	}
	
	let existId =()=>{
		$('<input id="cemail" class="fs-block"'+
				' placeholder="youremail@email.com" type="text" tabindex="0" value="">'+
				'<div style="height:20px; margin-top:10px"></div>')
			.appendTo('#moneyhub-id')
			
		$('#cemail').keyup(()=>{
			if($('#cemail').val().length >= 1){
				$.ajax({
					url : _+'/customers' + '/existid/' + encodeURIComponent($('#cemail').val()) + '/',
					type: 'GET',
					data: JSON.stringify({
						cemail : $('#cemail').val()
					}),
					dataType : 'json',
					contentType : 'application/json',
					success: d=>{
						if(d.msg === 'Y'){
							$('#moneyhub-id div')
							.text('이미 있는 아이디입니다.')
							.css({
								color : 'red'
							})

						}else{
							$('#moneyhub-id div')
							.text('사용 가능한 이메일입니다.')
							.css({
								color : 'blue'
							})
						}
					}
				})
			}
		})
	}

	return { onCreate }
})()
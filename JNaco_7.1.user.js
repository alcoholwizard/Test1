// ==UserScript==
// @name        JNaco_7.1
// @namespace   http://diveintomark.org/projects/greasemonkey/
// @description 主帳號版本
//
// @include     http:*app.mbga-platform.jp/*

// @version     1
// @grant       none
// ==/UserScript==

var offset_height = 0;
var finish_friend = 0;
var foodmin = 5660;
var institution_set = 0;
var want_war = 0;
var iframe_offset = 0;
var set_role_total = 29;
var SS10 = 0;
var move_target = 2;
//抽籤用
var NP_cost = 500;
var NP_toget = 0;
//賣卡用
var onsale_now = 0;
var onsale_max = 4;
var i_role = 50;
var role_price_offset = -10;
var card_price_0 = 200;
var card_price_91 = 180;
var card_price_121 = 100;
var card_price_151 = 150;
var card_price_200 = 220;
var sell_count = 0;
var cancel_sell_count = 0;
var regist_count = 0;
//記數專用
var train_num = 0;
var error_count = 0;
var count = 0;
var skill_count = 0;
var to_role_count = 0;
var check_count = 0;
var newRole_count = 0;
var train_count = 0;
var role_total = 0;
var check_count1 = 0;
var lottery_count = 0;
var off_height = 96;
var bomb_max = 80;
//建設專用變數
var institution_count = 0;

//合戰專用變數
var war_count = Math.floor(Math.random() * 2);
var battle_we = Math.floor(Math.random() * 2);
var battle_select = (Math.floor(Math.random() * 3) * 2);

//設定建設起始 陣列 0 為 :館

function refresh() {
	//跳往大名番付  等待重刷視窗
	jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_12.png?270977831"]')[0].click();

}

function drag_and_drop(train_num) {

	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	target.dispatchEvent(evt);

	var evt1 = document.createEvent("MouseEvents");
	evt1.initMouseEvent("mousemove", true, true, window, 0, 0, 0, 280, 278 + (50 * train_num) + off_height, false, false, false, false, 0, null);
	target.dispatchEvent(evt1);

	var evt2 = document.createEvent("MouseEvents");
	evt2.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	train_count = 1;
	target.dispatchEvent(evt2);

}

function sale_drag_and_drops(offset_X, offset_Y) {

	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	target.dispatchEvent(evt);

	var evt1 = document.createEvent("MouseEvents");
	evt1.initMouseEvent("mousemove", true, true, window, 0, 0, 0, offset_Y, offset_X, false, false, false, false, 0, null);
	target.dispatchEvent(evt1);

	var evt2 = document.createEvent("MouseEvents");
	evt2.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	sell_count = sell_count + 1;
	target.dispatchEvent(evt2);
	return;

}

function sub_train() {
	//指定命令列
	var ele_cmd00 = document.getElementById("cmd_00");
	var ele_cmd01 = document.getElementById("cmd_01");
	if (train_count == "1") {//確認進行訓練
		if (jQuery('div[id $= "neko-alert-dynamic-main"]').length == 2) {//可點OK或confirm
			if (jQuery('div[id $= "neko-alert-dynamic-ok-ng-buttons"]')[1].style.display != "none") {//有OK可點時
				train_count = 0;
				jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png"]')[2].click();
				return;
			} else if (jQuery('div[id $= "neko-alert-dynamic-confirm-button"]')[1].style.display != "none") {//有confirm可點時
				train_count = 0;
				jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_confirm.png"]')[2].click();
				return;
			} else {
				train_count = 0;
				jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]')[jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]').length - 1].click();
			}
		} else if (jQuery('div[id $= "neko-alert-dynamic-main"]').length > 2) {//產生錯誤,有一個對話框以上，觀幣對話框
			jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]')[jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]').length - 1].click();
			train_count = 0;
			return;
		} else {
			train_count = 0;
			return;
		}
	} else if (train_count == "0") {
		if (ele_cmd00 && ele_cmd00.innerHTML.match(/\d+/g)[0] == 0 && ele_cmd00.innerHTML.match(/\d+/g)[1] == 0 && ele_cmd00.innerHTML.match(/\d+/g)[2] < 40) {
			return;
		} else if (ele_cmd01 && ele_cmd01.innerHTML.match(/\d+/g)[0] == 0 && ele_cmd01.innerHTML.match(/\d+/g)[1] == 0 && ele_cmd01.innerHTML.match(/\d+/g)[2] < 40) {
			return;
		}
		var ele = document.getElementById("reserve-pool").getElementsByTagName("img");
		if (ele && jQuery('div[id $= "neko-alert-dynamic-main"]').length < 2) {

			for (var i = 55,
			    ele_length = ele.length; i < ele_length; i++) {//設定起始56為培育武將一中的第一格,出征時變成61
				if ((i < 0) && ((ele[i].className.match("trade-limit")) || (ele[i].className.match("teppo ui-draggable")) || (ele[i].className.match("kiba ui-draggable")))) {
					target = ele[i];

					train_num = 1;
					//訓練 地
					drag_and_drop(train_num);
					return;
				} else if (((ele[i].className.match("ashigaru ui-draggable")) || (ele[i].className.match("teppo ui-draggable")) || (ele[i].className.match("kiba ui-draggable"))) && (!(ele[i + 1].src == "http://210.140.157.168/img/UI/icon/anm_attention.gif"))) {

					target = ele[i];
					labelNames:
					switch(ele[i + 1].src) {
					case "http://210.140.157.168/img/UI/icon/mini_elements_00.png":
						//火訓練
						var ele5 = document.getElementById("buildingimg").getElementsByTagName("img");
						if (ele5) {
							for (var J = 0,
							    ele_length5 = ele5.length; J < ele_length5; J++) {
								if (((ele5[J]).className == "map00 type03 running") || ((ele5[J]).className == "map00 type03 drop constructing ui-droppable")) {
									break labelNames;
								}
							}
							train_num = 0;
							//火武將
							drag_and_drop(train_num);
							return;
						} else
							return;
					case "http://210.140.157.168/img/UI/icon/mini_elements_01.png":
						//地訓練
						var ele5 = document.getElementById("buildingimg").getElementsByTagName("img");
						if (ele5) {
							for (var J = 0,
							    ele_length5 = ele5.length; J < ele_length5; J++) {
								if (((ele5[J]).className == "map06 type04 running") || ((ele5[J]).className == "map06 type04 drop constructing ui-droppable")) {
									break labelNames;
								}
							}
							train_num = 1;
							//地武將
							drag_and_drop(train_num);
							return;
						} else
							return;
					case "http://210.140.157.168/img/UI/icon/mini_elements_02.png":
						//風訓練
						var ele5 = document.getElementById("buildingimg").getElementsByTagName("img");
						if (ele5) {
							for (var J = 0,
							    ele_length5 = ele5.length; J < ele_length5; J++) {
								if ((((ele5[J]).className == "map12 type05 running")) || ((ele5[J]).className == "map12 type05 drop constructing ui-droppable")) {
									break labelNames;
								}
							}
							train_num = 2;
							//風武將
							drag_and_drop(train_num);
							return;
						} else
							return;
					case "http://210.140.157.168/img/UI/icon/mini_elements_03.png":
						//水訓練
						var ele5 = document.getElementById("buildingimg").getElementsByTagName("img");
						if (ele5) {
							for (var J = 0,
							    ele_length5 = ele5.length; J < ele_length5; J++) {
								if (((ele5[J]).className == "map18 type06 running") || ((ele5[J]).className == "map18 type06 drop constructing ui-droppable")) {
									break labelNames;
								}
							}
							train_num = 3;
							//水武將
							drag_and_drop(train_num);
							return;
						} else
							return;
					case "http://210.140.157.168/img/UI/icon/mini_elements_04.png":
						//空訓練
						var ele5 = document.getElementById("buildingimg").getElementsByTagName("img");
						if (ele5) {
							for (var J = 0,
							    ele_length5 = ele5.length; J < ele_length5; J++) {
								if (((ele5[J]).className == "map24 type07 running") || ((ele5[J]).className == "map24 type07 drop constructing ui-droppable")) {
									break labelNames;
								}
							}
							train_num = 4;
							//空武將
							drag_and_drop(train_num);
							return;
						} else
							return;
					}
				}
			}
		} else {
			train_count == 1;
			return;
		}
	} else
		return;
}

function newRole_click() {
	if (newRole_count == "0") {
		if (role_total > 0) {//如果培育武將少逾25格
			var ele1 = document.getElementsByClassName("recruit-button");
			if (ele1.length > 0) {// 如果還有保管武將
				newRole_count = 1;
				ele1[0].click();
				return;
			} else//如果沒武將就回到里
			{
				document.getElementById("nyaomikuji-map").click();
				return;
			}
		} else//培育武將沒格子,回到里
		{
			jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
			return;
		}

	} else if (newRole_count == "1") {
		role_total = role_total - 1;
		newRole_count = 0;
		jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png"]')[2].click()
		//點選確定
		return;
	} else
		return;

}

function sale_skill_click() {

	if (onsale_now > 0) {
		if (skill_count == "0") {
			var ele = document.getElementById("content").getElementsByTagName("div");
			for (var i = 0,
			    ele_length = ele.length; i < ele_length; i++) {
				if (ele[i].className.match("card-front card-learn")) {
					//人物主要的圖片辨識
					var role_name = ele[i-1].children[2].src;
					var role_now_exp = ele[i+1].children[5].innerHTML.match(/\d+/g)[0];
					var role_set_exp = role_set(role_name)[2];
					var role_sell_num = role_set(role_name)[0];
					var role_now_deed = ele[i+1].children[3].innerHTML.match(/\d+/g)[0];
					if (role_set_exp == role_now_exp) {//設定值 = 修練綜合

						if (role_sell_num == 3 && role_now_deed < 91) {

							//如果是設定的(珍)卡 且功勳小於91的跳過
							continue;
						} else {
							skill_count = 1;
							ele[i].click();
							return;
							break;
						}
					} else if (role_set_exp > role_now_exp) {
						//設定值 > 修練綜合
						continue;
						/*skill_count = 1;
						 ele[i].click();
						 return;*/
					} else {//其他大於
						if ((role_sell_num == 3 && role_now_deed < 91) || (role_sell_num == 4)) {//如果是設定的(珍)卡 且功勳小於91的跳過
							continue;
						} else {
							skill_count = 1;
							ele[i].click();
							return;
							break;
						}
					}
				}
			}
			var ele1 = document.getElementById("content").getElementsByTagName("a");
			for (var i = 0,
			    ele1_length = ele1.length; i < ele1_length; i++) {
				if (ele1[i].innerHTML == "&gt;") {
					ele1[i].click();
					//否則進入下一頁
					return;
					break;
				}
			}
			//最終頁時,進入交易所
			jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_09.png?3340404468"]')[0].click();
			return;
		} else if (skill_count == "1") {

			skill_count = 0;
			onsale_now = onsale_now - 1;
			document.getElementById("dlg-learn-get-button").click();
			//點選確定,也可點強化
			return;
		} else {
			return;
		}
	} else {
		//進入交易所
		jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_09.png?3340404468"]')[0].click();
		//jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_09.png?1462696969"]')[0].click();
		return;
	}
}

function card_sell() {
	if (cancel_sell_count > 0) {//已經取消之前掛賣的卡片後進入...注意!!!目前設定只取消一回。
		if (onsale_now > 0) {//有格子可以掛的時候...進入
			if (sell_count == "0") {//開始依序拉武將
				var ele = document.getElementById("reserve-pool").getElementsByTagName("img");
				for (i_role,
				ele_length = ele.length; i_role < ele_length; i_role++) {//設定起始56為培育武將一中的第一格
					if (ele[i_role].className.match("card-face ui-draggable")) {
						if ((ele[i_role].offsetParent)) {

							var offset_top = ele[i_role].parentElement.parentElement.style.top.match(/\d+/g);
							var offset_X = -300;
							var offset_Y = 90 - offset_top;
						} else {
							var offset_X = 245;
							var offset_Y = 420;
						}
						target = ele[i_role];
						setTimeout(sale_drag_and_drops, 100, offset_Y, offset_X);
						return;
					}
				}
				i_role = 50;
				//已經沒有武將可以 回到里
				jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
				return;

			} else if (sell_count == "1") {//比對武將的條件，設定價格，薦舉日數，或者把不符合條件的武將跳過。

				if (document.getElementById("sell-card").childElementCount > 1) {//確認薦舉格子中已經有武將,取得ID，設定價格。薦舉天數。
					//人物主要的圖片辨識
					var role_name = document.getElementsByClassName("card-front card-illust")[0].src;
					var role_now_deed = document.getElementsByClassName("card-back card-deed")[0].innerHTML.match(/\d+/g);
					var role_now_exp = document.getElementsByClassName("card-back card-refine-total")[0].innerHTML.match(/\d+/g)[0];
					var role_sell_num = role_set(role_name)[0];
					var set_card_price = role_set(role_name)[1]
					var role_set_exp = role_set(role_name)[2];
					var card_skill = role_set(role_name)[3];
					if ((role_set_exp <= role_now_exp ) && (role_sell_num == 1 || role_sell_num == 3)) {
						//如果卡片的功勳值於設定值(沒設定的卡都是傳回4)
						if (document.getElementsByClassName(card_skill)[0].innerHTML) {//有點開技能的才掛

							if (role_now_exp < 21) {//修練小於21 且設定為要賣的卡,注意:要保留的武將綜合修練度一定要大於21)
								if (role_now_deed <= 90 && role_sell_num == 1) {//功勳小逾90的卡
									document.getElementById("form_point").value = card_price_0 + set_card_price + Math.floor(Math.random() * 25) * 5;
									document.getElementById("form_term").children[2].selected = true;
									sell_count = 2;
									return;
								} else if (90 < role_now_deed && role_now_deed <= 120) {
									document.getElementById("form_point").value = card_price_0 + card_price_91 + set_card_price + Math.floor(Math.random() * 25) * 5;
									document.getElementById("form_term").children[2].selected = true;
									sell_count = 2;
									return;
								} else if (120 < role_now_deed && role_now_deed <= 150) {
									document.getElementById("form_point").value = card_price_0 + card_price_121 + set_card_price + Math.floor(Math.random() * 25) * 5;
									document.getElementById("form_term").children[2].selected = true;
									sell_count = 2;
									return;
								} else if (150 < role_now_deed && role_now_deed <= 200) {
									document.getElementById("form_point").value = card_price_0 + card_price_151 + set_card_price + Math.floor(Math.random() * 25) * 5;
									document.getElementById("form_term").children[2].selected = true;
									sell_count = 2;
									return;
								} else if (200 < role_now_deed && role_now_deed <= 255) {
									document.getElementById("form_point").value = card_price_0 + card_price_200 + set_card_price + Math.floor(Math.random() * 25) * 5;
									document.getElementById("form_term").children[2].selected = true;
									sell_count = 2;
									return;
								} else {//功勳小於90和超過220的跳過
									i_role = i_role + 1;
									sell_count = 0;
									return;
								}
							} else {//修練值大於等於12,跳過(要保留的卡)
								i_role = i_role + 1;
								sell_count = 0;
								return;
							}
						} else {//修練值大於等於12,跳過(要保留的卡)
							i_role = i_role + 1;
							sell_count = 0;
							return;
						}
					} else if ((role_set_exp <= role_now_exp ) && role_sell_num == 0) {
						if (20 < role_now_exp) {//卡片有設定值 但設定值大於現在的修練度(還沒練好的卡)，跳過。
							i_role = i_role + 1;
							sell_count = 0;
							return;
						} else {//修練值大於及等於設定值
							var role_name = document.getElementsByClassName("card-back card-name")[0].innerHTML;
							var card_skill = role_set(role_name)[3];
							if (document.getElementsByClassName(card_skill)[0].innerHTML) {//技能格已經有點開的...掛
								var set_card_price = role_price_offset + parseInt(role_now_deed / 50) * 40 + role_set(role_name)[1] + Math.floor(Math.random() * 5) * 5;
								//輸入價格
								document.getElementById("form_point").value = set_card_price;
								//設定薦舉7日
								document.getElementById("form_term").children[2].selected = true;
								sell_count = 2;
								return;
							} else {//沒有點開技能的卡片，跳過。
								i_role = i_role + 1;
								sell_count = 0;
								return;
							}
						}
					} else {//沒有設定值的  全部保留
						i_role = i_role + 1;
						sell_count = 0;
						return;
					}
				} else {//沒有拉到武將或者lag，重新再拉一次。
					i_role = i_role + 1;
					sell_count = 0;
					return;
				}
			} else if (sell_count == "2") {//確定送出薦舉
				if (regist_count == "0") {
					document.getElementById("regist-button").click();
					regist_count = regist_count + 1;
					return;
				} else if (regist_count == "1") {
					if (jQuery('div[id $= "neko-alert-dynamic-main"]').length == 2) {//可點OK或confirm
						if (jQuery('div[id $= "neko-alert-dynamic-ok-ng-buttons"]')[1].style.display != "none") {//有OK可點時
							jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png"]')[2].click();
							sell_count = 0;
							onsale_now = onsale_now - 1;
							regist_count = 0;
							i_role = 50;
							return;
						} else if (jQuery('div[id $= "neko-alert-dynamic-confirm-button"]')[1].style.display != "none") {//有confirm可點時
							jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_confirm.png"]')[2].click();
							sell_count = 0;
							onsale_now = onsale_now - 1;
							regist_count = 0;
							i_role = 50;
							return;
						} else {
							jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]')[jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]').length - 1].click();
							sell_count = 0;
							onsale_now = onsale_now - 1;
							regist_count = 0;
							i_role = 50;
						}
					} else if (jQuery('div[id $= "neko-alert-dynamic-main"]').length > 2) {//產生錯誤,有一個對話框以上，觀幣對話框
						jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]')[jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]').length - 1].click();
						sell_count = 0;
						onsale_now = onsale_now - 1;
						regist_count = 0;
						i_role = 50;
						return;
					} else {//沒有拉到武將等待(但有可能產生逾時的狀態??而根本沒有武將)
						jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]')[jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]').length - 1].click();
						sell_count = 0;
						onsale_now = onsale_now - 1;
						regist_count = 0;
						i_role = 50;
						return;
					}
					/*var ele_click = document.getElementsByClassName("neko-alert-button neko-button")[9];
					 if (jQuery('div[id $= "neko-alert-dynamic-main"]').length == 2) {//如果有需確認視窗
					 if (jQuery('div[id $= "neko-alert-ok-button"]')[1].style.left != "0px") {//如果可以送出
					 jQuery('div[id $= "neko-alert-ok-button"]')[1].click();
					 sell_count = 0;
					 onsale_now = onsale_now - 1;
					 regist_count = 0;
					 i_role = 50;
					 return;
					 } else if (jQuery('div[id $= "neko-alert-confirm-button"]')[1].style.left != "0px") {//錯誤 沒有價格  或沒有武將
					 jQuery('div[id $= "neko-alert-confirm-button"]')[1].click();
					 sell_count = 0;
					 regist_count = 0;
					 i_role = 50;
					 return;
					 } else {//關閉其他錯誤視窗，跳回重拉
					 jQuery('div[id $= "neko-alert-close"]')[1].click();
					 sell_count = 0;
					 regist_count = 0;
					 i_role = 50;
					 return;
					 }
					 }*/
				}
			} else {
				return;
			}
		} else {
			i_role = 50;
			//沒有格子可掛賣 ,到里
			jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
			return;
		}
	} else {//先把已經在架上的卡片取消
		var sell_cancel = document.getElementsByClassName("sell-cancel");
		if (sell_cancel.length > 0) {
			sell_cancel[0].click();
			jQuery('span[id $= "neko-alert-dynamic-ok-button"]')[1].childNodes[0].click();
			return;
		} else {//將cancel_sell_count設1，不再進入取消薦舉的迴圈。
			cancel_sell_count = 1;
			return;
		}
	}
}

function skill_click() {
	if (skill_count == "0") {
		var ele = document.getElementById("content").getElementsByTagName("div");
		if (ele) {
			for (var i = 0,
			    ele_length = ele.length; i < ele_length; i++) {
				if (ele[i].className.match("card-front card-learn")) {
					//人物主要的圖片辨識
					var role_name = ele[i-1].children[2].src;
					var role_now_exp = ele[i+1].children[5].innerHTML.match(/\d+/g)[0];
					var role_set_exp = role_set(role_name)[2];
					if (role_set_exp == role_now_exp) {//設定值 = 修練綜合
						continue;
						/*skill_count = 1;
						 ele[i].click();
						 return;*/
					} else if (role_set_exp > role_now_exp) {//設定值 > 修練綜合
						//continue;
						skill_count = 1;
						ele[i].click();
						return;
					} else {//沒設定值的 或卡片本身沒練之前就有修練綜合的
						continue;
						/*skill_count = 1;
						 ele[i].click();
						 return;*/
					}

				}
			}
		} else
			return;
		var ele1 = document.getElementById("content").getElementsByTagName("a");
		if (ele1) {
			for (var i = 0,
			    ele1_length = ele1.length; i < ele1_length; i++) {
				if (ele1[i].innerHTML == "&gt;") {
					ele1[i].click();
					//否則進入下一頁
					return;
				}
			}
		} else
			return;
		document.getElementById("work-head").getElementsByTagName("span")[5].click();
		return;
		//最終頁時,到保管武將
	} else if (skill_count == "1") {
		skill_count = 0;
		jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_learn.png"]')[0].click();
		//點選確定,也可點強化
		return;
	} else
		return;
}

function click_start() {
	if (jQuery('img[src $= "http://210.140.157.168/img/campaign/2016AprilFool/btn_2016april_3739994902.gif"]').length > 0) {

		jQuery('img[src $= "http://210.140.157.168/img/campaign/2016AprilFool/btn_2016april_3739994902.gif"]')[0].click();
		return;

	} else if (jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_game_start.gif?2931816670"]').length > 0) {
		jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_game_start.gif?2931816670"]')[0].click();
		return;
	} else if (jQuery('img[src $= "http://210.140.157.168/img/news/2015AprilFool/btn_2015april_1_3539029232.gif"]').length > 0) {

		jQuery('img[src $= "http://210.140.157.168/img/news/2015AprilFool/btn_2015april_1_3539029232.gif"]')[0].click();
		return;

	} else if (jQuery('img[src $= "http://210.140.157.168/img/news/2015AprilFool/btn_2015april_2_4160623707.gif"]').length > 0) {

		jQuery('img[src $= "http://210.140.157.168/img/news/2015AprilFool/btn_2015april_2_4160623707.gif"]')[0].click();
		return;

	} else {
		//alert("找不到登入按鍵")
		return;
	}

}

function construction() {
	var institution_total = 0;

	institution_total = jQuery('img[src $= "http://210.140.157.168/img/pages/village/institution_temp.gif?4139460434"]').length;
	if (institution_count == 0) {

		if (institution_total <= 2) {//有N隻以上在建設則跳出

			if (jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_enlarge.png?2923292642"]').length > institution_set) {
				jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_enlarge.png?2923292642"]')[institution_set].click();
				institution_count = 1;
				return;
			} else {
			}

		} else {
			return;
		}
	} else if (institution_count == 1) {
		if (jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png"]').length > 2) {
			jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png"]')[2].click();
			institution_count = 0;
			return;
		} else {
			institution_count = 0;
			return;
		}

	} else {
		return;
	}
}

function visit_friend() {
	if (count == "0") {//進入順位下未曾拜訪過的戰友
		var ele = document.getElementById("reserve-pool").getElementsByTagName("img");
		var ele_alert = document.getElementsByClassName("neko-alert-button neko-button");
		if (ele_alert.length <= 12) {

			for (var i = 53,
			    ele_length = ele.length; i < ele_length; i++) {//設定起始56為培育武將一中的第一格
				if (ele[i].className.match("protected ui-draggable")) {//設定只有是"protected ui-draggable(保護狀態下)"的武將才能進行訪問。
					target = ele[i];

					var evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					target.dispatchEvent(evt);

					var evt1 = document.createEvent("MouseEvents");
					evt1.initMouseEvent("mousemove", true, true, window, 0, 0, 0, 464, 228 + off_height, false, false, false, false, 0, null);
					target.dispatchEvent(evt1);
					var evt2 = document.createEvent("MouseEvents");
					evt2.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					count = 1;
					target.dispatchEvent(evt2);
					return;
				} else if (i == (ele_length - 1)) {//回到里。
					count = 0;
					jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();

					return;
				}
			}
		} else {
			count = 1;
			return;
		}
	} else if (count == "1") {//在有確認進行拜訪對話框的時候進入

		if (jQuery('div[id $= "neko-alert-dynamic-main"]').length == 2) {//可點OK或confirm
			if (jQuery('div[id $= "neko-alert-dynamic-ok-ng-buttons"]')[1].style.display != "none") {//有OK可點時
				count = 2;
				jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png"]')[2].click();
				return;
			} else if (jQuery('div[id $= "neko-alert-dynamic-confirm-button"]')[1].style.display != "none") {//有confirm可點時
				count = 2;
				jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_confirm.png"]')[2].click();
				return;
			} else {
				count = 0;
				jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]')[jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]').length - 1].click();
			}
		} else if (jQuery('div[id $= "neko-alert-dynamic-main"]').length > 2) {//產生錯誤,有一個對話框以上，觀幣對話框
			jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]')[jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]').length - 1].click();

			return;
		} else {//沒有拉到武將等待(但有可能產生逾時的狀態??而根本沒有武將)
			jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]')[jQuery('img[src $= "http://210.140.157.168/img/UI/button/close_icon.gif"]').length - 1].click();
			count = 0;
			return;
		}
	} else if (count == "2") {//在沒有對話框準備點選下一位朋友時候進入
		var ele_alert = document.getElementsByClassName("neko-alert-button neko-button");
		if (ele_alert.length <= 12) {
			var ele_next = document.getElementsByClassName("next-friend-button neko-button");
			if (ele_next.length > 0) {
				count = 0;
				ele_next[0].click();
				return;
			} else {//最後一名友人回到里
				count = 0;
				jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
				return;
			}
		} else {
			count = 1;
			return;
		}
	} else {
		return;
	}

}

function BombMacker() {

	// 開發奧義圖檔(動作) :ele_developskill 有幾座開發所 就有幾張圖
	var ele_developskill = jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_developskill.png?2901536498"]');
	// 奧義開發所的圖檔:ele_BombFactory (一個完成的開發所有兩張圖,當開發所數量2的時候  ele_BombFactory為4)
	var ele_BombFactory = jQuery('img[src $= "http://210.140.157.168/img/pages/village/institution_010_3622080282.png"]')
	//如果已經確認可開發(有確認鍵)，則直接點選確認
	if (jQuery('span[id $= "neko-alert-dynamic-close"]').length == 3) {
		jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png"]')[3].click();

		return;
	} else {
		// 點選奧義開發所，如果在開發中，則圖檔會變成開發中(所以不用計入)
		if (ele_developskill[ele_developskill.length - 1].title == "奥義開発をする") {
			// 使用迴圈進行判斷及點選開發所，只有開發所的第一張圖片能進行判斷，所以i必須+2
			for (var i = 0; i < ele_developskill.length; i++) {
				if (ele_BombFactory[i].nextElementSibling.src == "http://210.140.157.168/img/pages/village/lv_9.gif") {
					ele_developskill[i].click();
					return;
				}
			}
			return;
			// BombMacker()的空迴圈處

		} else if (ele_developskill[ele_developskill.length - 1].title == "") {
			if (!(document.getElementById('skill-num207')) || (document.getElementById('skill-num207').innerHTML < bomb_max )) {

				if (document.getElementById('01skill207')) {
					document.getElementById('01skill207').click();
				} else {
					document.getElementById('11skill207').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num208')) || (document.getElementById('skill-num208').innerHTML < bomb_max )) {
				if (document.getElementById('01skill208')) {
					document.getElementById('01skill208').click();
				} else {
					document.getElementById('11skill208').click();
				}
				ele_developskill[2].click();
				return;
			}

			//點選要生產的奧義
			//水屬性奧義

			if (!(document.getElementById('skill-num222')) || (document.getElementById('skill-num222').innerHTML < bomb_max )) {
				if (document.getElementById('01skill222')) {
					document.getElementById('01skill222').click();
				} else {
					document.getElementById('11skill222').click();
				}
				ele_developskill[ele_developskill.length - 1].click();
				return;
			} else if (!(document.getElementById('skill-num223')) || (document.getElementById('skill-num223').innerHTML < bomb_max )) {
				if (document.getElementById('01skill223')) {
					document.getElementById('01skill223').click();
				} else {
					document.getElementById('11skill223').click();
				}
				ele_developskill[ele_developskill.length - 1].click();
				return;
			} else if (!(document.getElementById('skill-num225')) || (document.getElementById('skill-num225').innerHTML < bomb_max )) {
				if (document.getElementById('01skill225')) {
					document.getElementById('01skill225').click();
				} else {
					document.getElementById('11skill225').click();
				}
				ele_developskill[ele_developskill.length - 1].click();
				return;
			} else if (!(document.getElementById('skill-num231')) || (document.getElementById('skill-num231').innerHTML < bomb_max )) {
				if (document.getElementById('01skill231')) {
					document.getElementById('01skill231').click();
				} else {
					document.getElementById('11skill231').click();
				}
				ele_developskill[ele_developskill.length - 1].click();
				return;
			} else if (!(document.getElementById('skill-num232')) || (document.getElementById('skill-num232').innerHTML < bomb_max )) {
				if (document.getElementById('01skill232')) {
					document.getElementById('01skill232').click();
				} else {
					document.getElementById('11skill232').click();
				}
				ele_developskill[ele_developskill.length - 1].click();
				return;
			}

			//點選要生產的奧義
			//空屬性奧義

			if (!(document.getElementById('skill-num267')) || (document.getElementById('skill-num267').innerHTML < bomb_max )) {
				if (document.getElementById('01skill267')) {
					document.getElementById('01skill267').click();
				} else {
					document.getElementById('11skill267').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num268')) || (document.getElementById('skill-num268').innerHTML < bomb_max )) {
				if (document.getElementById('01skill268')) {
					document.getElementById('01skill268').click();
				} else {
					document.getElementById('11skill268').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num270')) || (document.getElementById('skill-num270').innerHTML < bomb_max )) {
				if (document.getElementById('01skill270')) {
					document.getElementById('01skill270').click();
				} else {
					document.getElementById('11skill270').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num273')) || (document.getElementById('skill-num273').innerHTML < bomb_max )) {
				if (document.getElementById('01skill273')) {
					document.getElementById('01skill273').click();
				} else {
					document.getElementById('11skill273').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num274')) || (document.getElementById('skill-num274').innerHTML < bomb_max )) {
				if (document.getElementById('01skill274')) {
					document.getElementById('01skill274').click();
				} else {
					document.getElementById('11skill274').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num276')) || (document.getElementById('skill-num276').innerHTML < bomb_max)) {
				if (document.getElementById('01skill276')) {
					document.getElementById('01skill276').click();
				} else {
					document.getElementById('11skill276').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num277')) || (document.getElementById('skill-num277').innerHTML < bomb_max)) {
				if (document.getElementById('01skill277')) {
					document.getElementById('01skill277').click();
				} else {
					document.getElementById('11skill277').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num279')) || (document.getElementById('skill-num279').innerHTML < bomb_max)) {
				if (document.getElementById('01skill279')) {
					document.getElementById('01skill279').click();
				} else {
					document.getElementById('11skill279').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num280')) || (document.getElementById('skill-num280').innerHTML < bomb_max)) {
				if (document.getElementById('01skill280')) {
					document.getElementById('01skill280').click();
				} else {
					document.getElementById('11skill280').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num210')) || (document.getElementById('skill-num210').innerHTML < bomb_max )) {
				if (document.getElementById('01skill210')) {
					document.getElementById('01skill210').click();
				} else {
					document.getElementById('11skill210').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num216')) || (document.getElementById('skill-num216').innerHTML < bomb_max )) {
				if (document.getElementById('01skill216')) {
					document.getElementById('01skill216').click();
				} else {
					document.getElementById('11skill216').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num217')) || (document.getElementById('skill-num217').innerHTML < bomb_max)) {
				if (document.getElementById('01skill217')) {
					document.getElementById('01skill217').click();
				} else {
					document.getElementById('11skill217').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num218')) || (document.getElementById('skill-num218').innerHTML < bomb_max)) {
				if (document.getElementById('01skill218')) {
					document.getElementById('01skill218').click();
				} else {
					document.getElementById('11skill218').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num219')) || (document.getElementById('skill-num219').innerHTML < bomb_max)) {
				if (document.getElementById('01skill219')) {
					document.getElementById('01skill219').click();
				} else {
					document.getElementById('11skill219').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num220')) || (document.getElementById('skill-num220').innerHTML < bomb_max)) {
				if (document.getElementById('01skill220')) {
					document.getElementById('01skill220').click();
				} else {
					document.getElementById('11skill220').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num221')) || (document.getElementById('skill-num221').innerHTML < bomb_max)) {
				if (document.getElementById('01skill221')) {
					document.getElementById('01skill221').click();
				} else {
					document.getElementById('11skill221').click();
				}
				ele_developskill[2].click();
				return;
			}//火屬性奧義
			else if (!(document.getElementById('skill-num237')) || (document.getElementById('skill-num237').innerHTML < bomb_max )) {
				if (document.getElementById('01skill237')) {
					document.getElementById('01skill237').click();
				} else {
					document.getElementById('11skill237').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num238')) || (document.getElementById('skill-num238').innerHTML < bomb_max )) {
				if (document.getElementById('01skill238')) {
					document.getElementById('01skill238').click();
				} else {
					document.getElementById('11skill238').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num239')) || (document.getElementById('skill-num239').innerHTML < bomb_max )) {
				if (document.getElementById('01skill239')) {
					document.getElementById('01skill239').click();
				} else {
					document.getElementById('11skill239').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num240')) || (document.getElementById('skill-num240').innerHTML < bomb_max )) {
				if (document.getElementById('01skill240')) {
					document.getElementById('01skill240').click();
				} else {
					document.getElementById('11skill240').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num241')) || (document.getElementById('skill-num241').innerHTML < bomb_max )) {
				if (document.getElementById('01skill241')) {
					document.getElementById('01skill241').click();
				} else {
					document.getElementById('11skill241').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num242')) || (document.getElementById('skill-num242').innerHTML < bomb_max)) {
				if (document.getElementById('01skill242')) {
					document.getElementById('01skill242').click();
				} else {
					document.getElementById('11skill242').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num246')) || (document.getElementById('skill-num246').innerHTML < bomb_max)) {
				if (document.getElementById('01skill246')) {
					document.getElementById('01skill246').click();
				} else {
					document.getElementById('11skill246').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num249')) || (document.getElementById('skill-num249').innerHTML < bomb_max)) {
				if (document.getElementById('01skill249')) {
					document.getElementById('01skill249').click();
				} else {
					document.getElementById('11skill249').click();
				}
				ele_developskill[2].click();
				return;
			} else if (!(document.getElementById('skill-num250')) || (document.getElementById('skill-num250').innerHTML < bomb_max)) {
				if (document.getElementById('01skill250')) {
					document.getElementById('01skill250').click();
				} else {
					document.getElementById('11skill250').click();
				}
				ele_developskill[2].click();
				return;
			}
			//陷阱3
			else if (!(document.getElementById('skill-num209')) || (document.getElementById('skill-num209').innerHTML < bomb_max )) {
				if (document.getElementById('01skill209')) {
					document.getElementById('01skill209').click();
				} else {
					document.getElementById('11skill209').click();
				}
				ele_developskill[2].click();
				return;
			}//干殺3
			else if (!(document.getElementById('skill-num233')) || (document.getElementById('skill-num233').innerHTML < bomb_max )) {
				if (document.getElementById('01skill233')) {
					document.getElementById('01skill233').click();
				} else {
					document.getElementById('11skill233').click();
				}
				ele_developskill[ele_developskill.length - 1].click();
				return;
			}//風林火山3
			else if (!(document.getElementById('skill-num275')) || (document.getElementById('skill-num275').innerHTML < bomb_max)) {
				if (document.getElementById('01skill275')) {
					document.getElementById('01skill275').click();
				} else {
					document.getElementById('11skill275').click();
				}
				ele_developskill[2].click();
				return;
			}//闇討ち 3
			else if (!(document.getElementById('skill-num281')) || (document.getElementById('skill-num281').innerHTML < bomb_max)) {
				if (document.getElementById('01skill281')) {
					document.getElementById('01skill281').click();
				} else {
					document.getElementById('11skill281').click();
				}
				ele_developskill[2].click();
				return;
			}//籠絡の計
			else if (!(document.getElementById('skill-num278')) || (document.getElementById('skill-num278').innerHTML < bomb_max)) {
				if (document.getElementById('01skill278')) {
					document.getElementById('01skill278').click();
				} else {
					document.getElementById('11skill278').click();
				}
				ele_developskill[2].click();
				return;
			}//醫心方
			else if (!(document.getElementById('skill-num224')) || (document.getElementById('skill-num224').innerHTML < bomb_max )) {
				if (document.getElementById('01skill224')) {
					document.getElementById('01skill224').click();
				} else {
					document.getElementById('11skill224').click();
				}
				ele_developskill[ele_developskill.length - 1].click();
				return;
			}//釣瓶擊 LVˇ3
			else if (!(document.getElementById('skill-num251')) || (document.getElementById('skill-num251').innerHTML < bomb_max)) {
				if (document.getElementById('01skill251')) {
					document.getElementById('01skill251').click();
				} else {
					document.getElementById('11skill251').click();
				}
				ele_developskill[2].click();
				return;
			} else {

				alert("奧義完成");

			}
		}
	}
}

function show_height() {
	if (document.getElementById("page-lock")) {
		var page_lock = document.getElementById("page-lock");
		var iframe_height = document.body.clientHeight + iframe_offset;
		var iframe_text = document.getElementById("mframe").previousElementSibling.innerHTML;
		check_count = 0;
		//已經進入迴圈把check_count歸零。避免一直重刷
		if (page_lock.style.display == "none") {
			if (error_count < 15) {//偵錯 :如果畫面無法點選 卡住
				if (jQuery('div[id $= "neko-alert-dynamic-main"]').length >= 2) {
					error_count = error_count + 1;
				} else {
					error_count = 0;
				}
			} else {
				setTimeout(refresh, 20);
				return;
			}
			check_count = 0;
			//alert(iframe_text);
			switch(iframe_text) {
			//里畫面
			case "のぶニャがの野望 - 里":
				//點掉廣告、或者提示訊息
				if (document.getElementById("notify").className) {//
					if ((jQuery('span[id $= "neko-alert-dynamic-close"]').length == 2)) {
						jQuery('span[id $= "neko-alert-dynamic-close"]')[1].childNodes[0].click()
						return;
					} else if (jQuery('div[id $= "neko-alert-close"]').length == 2) {
						jQuery('div[id $= "neko-alert-close"]')[1].click();
						return;
					} else {
						//alert(jQuery('span[id $= "neko-alert-dynamic-close"]').length);
						////SS10 = clearInterval(SS10);
						setTimeout(refresh, 20);
						return;
					}
				}
				//拜訪畫面，已進入戰友的里
				else if (document.getElementById("villageinfo").className == "left visit friend") {

					setTimeout(visit_friend, 100);
					return;
				}
				//判斷要執行的任務；打賊、貓場所、里戰
				else if (((!(document.getElementById("doing").children[0])) || (!(document.getElementById("doing").children[0].innerHTML.match("移動")))) && (!document.getElementById("finish_move")) && (document.getElementById("element_food").innerHTML > foodmin)) {
					//打賊專用
					jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_02.png?4281192292"]')[0].click();
					//維護專用
					//jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_03.png?2723319667"]')[0].click();
					//貓場所專用:
					//var ele = document.getElementById('mapbg').getElementsByTagName('area');
					//ele[23].click();
					//里戰專用:
					//jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_go.png?1969351945"]')[0].click();
					break;
				}
				//處理里畫面中拜訪好友
				else if (((document.getElementById("villageinfo").className == "left wrestle wrplreg") || (document.getElementById("villageinfo").className == "left")) && (!(document.getElementById("finish_329"))) && (finish_friend == 0)) {

					if (document.getElementById("my-friend").className == "close") {

						document.getElementById("friend-button").click();
						return;
					} else {
						var ele = document.getElementById("my-friend-content").getElementsByTagName("a");
						if (ele.length > 0) {//有抓到圖  避免lag沒有抓到
							for (var i = 0,
							    ele_length = ele.length; i < ele_length; i++) {
								if (ele[i].style.color == "rgb(0, 0, 238)") {
									ele[i].click();
									return;
								}
							}

							finish_friend = 1;
						} else {//如果沒抓到 關閉朋友欄 重來
							document.getElementById("friend-button").click();
							return;
						}
					}
				}
				//開始掛賣
				else if (to_role_count == "0") {
					onsale_now = jQuery('img[src $= "http://210.140.157.168/img/UI/icon/action_02.png?3612740047"]').length;
					if (onsale_now < 2) {//如果掛賣中的卡片少於N-1張 開始掛賣
						onsale_now = onsale_max - (onsale_now);
						jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_07.png?2036366120"]')[0].click();
						to_role_count = 1;
						return;
					} else {
						to_role_count = 1;
						return;
					}
				} else if (to_role_count == "1") {//點開訓練技能,要掛賣的話注意::要把to_role_count 比對"1"
					to_role_count = 2;
					role_total = set_role_total - document.getElementsByClassName("reserve-face card-face").length;
					jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_07.png?2036366120"]')[0].click();
					return;
				} else {
					//檢測其他命令時間是否快到了
					var ele_cmd00 = document.getElementById("cmd_00");
					if (ele_cmd00 && ele_cmd00.innerHTML.match(/\d+/g)[0] == 0 && ele_cmd00.innerHTML.match(/\d+/g)[1] == 0 && ele_cmd00.innerHTML.match(/\d+/g)[2] < 40) {

						return;
					} else {

						setTimeout(BombMacker, 20);
						return;
					}
					return;
				}

				break;
			case "のぶニャがの野望 - 地図":
				//Map
				if (document.getElementById("notify").className) {//揀選確認
					if ((jQuery('span[id $= "neko-alert-dynamic-close"]').length == 2)) {
						jQuery('span[id $= "neko-alert-dynamic-close"]')[1].childNodes[0].click()
						return;
					} else {
						setTimeout(refresh, 20);
					}
				} else if (document.getElementById("move_1")) {
					jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
					return;
				} else {
					var ele_2 = jQuery('img[src $= "http://210.140.157.168/img/pages/map/map_point_icon_02.gif?4057352426"]');
					if (ele_2.length >= 2 && (want_war == 0)) {//當日有開啟合戰 && 設定要打合暫
						var ele_1 = jQuery('a[href $= "/war/war_setup.htm"]');
						if (ele_1.length == 1) {//使用"現在的據點"來判斷已選定或鄰近戰場
							ele_1[0].click();
							return;
						} else if (ele_1.length == 0) {//尚未選定戰場
							if (ele_2.length >= 2) {//開啟兩場或兩場以上
								ele_2[war_count].parentNode.nextElementSibling.childNodes[9].children[0].children[0].click();
								return;
							} else {
								jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
								return;
							}

						} else {
							jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
							return;
						}
					} else {//打敵軍專用

						var ele = jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png?1918473456"]');
						for (var i = 14; i < ele.length; i++) {
							if (ele[i].parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.title == "敵軍") {

								ele[i].click();
								return;
							}
						}
						var next_position = check_position(document.getElementById("notify_count_title").childNodes[1].childNodes[2].data);
						document.getElementById(next_position).children[3].children[0].children[0].click()
						/*var ele = jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png?1918473456"]');
						 //攻城戰
						 var ele_3 = jQuery('img[src $= "http://210.140.157.168/img/pages/map/map_point_icon_03.gif?1085009533"]');
						 if ((ele.length - ele_2.length) > 15) {//如果有可攻擊對象
						 if ((ele.length - ele_2.length - ele_3.length) == 16) {
						 if (ele[15 + ele_2.length].parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.title == "敵軍" || ele[15 + ele_2.length].parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.title == "") {
						 ele[move_target].click();
						 return;
						 } else {
						 ele[15 + ele_2.length].click();
						 return;
						 }
						 } else if ((ele.length - ele_2.length - ele_3.length) > 16) {
						 if (ele[15 + ele_2.length + ele_3.length].parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.title == "敵軍" || ele[15 + ele_2.length].parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.title == "") {
						 ele[16 + ele_2.length + ele_3.length].click();
						 return;
						 } else {
						 ele[15 + ele_2.length + ele_3.length].click();
						 return;
						 }
						 return;
						 }
						 } else {//移動到下一城
						 ele[move_target].click();
						 return;
						 }*/

					}
				}

				break;
			case 802:
				//合戰挑選戰場
				var ele = jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png?1918473456"]');
				if (ele.length == 2) {//條件成立時需要選邊
					ele[battle_we].click();
					return;
				} else if (ele.length == 0) {//已選邊 進入戰鬥
					var ele_battle = jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_enterthewar.png?1319654491"]');
					if (ele_battle.length == 6) {//合戰中
						ele_battle[battle_select + 1].click();
						return;
					} else {//可能產生錯誤 或是更新戰場狀況?
						jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
						return;
					}
				} else {//可能產生錯誤 回到里
					jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
					return;
				}

				break;
			case "のぶニャがの野望":
				//貓場所選單的"參戰"
				if (jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_go.png?1969351945"]').length > 1) {
					jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_go.png?1969351945"]')[1].click();
					return;

				}
				//點選一般出征、全國對戰
				else if (jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_enterthewar.png?1319654491"]').length > 0) {
					jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_enterthewar.png?1319654491"]')[0].click();
					return;
				}
				//連續抽貓籤
				else {

					if ((document.getElementById("lottery_point").innerHTML > NP_toget) && (jQuery('input[src $= "http://210.140.157.168/img/UI/button/btn_omikuji_repeat.png"]').length > 0)) {
						if (lottery_count == "0") {
							lottery_count = 1;
							jQuery('input[src $= "http://210.140.157.168/img/UI/button/btn_omikuji_repeat.png"]')[0].click();
							return;
						} else if (lottery_count == "1") {
							lottery_count = 0;
							jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png"]')[2].click();
							return;
						}
					} else {
						//回到里
						jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
						return;
					}
					break;
				}
				break;

			case "のぶニャがの野望 - 武将一覧":
				//點選技能(每頁1隻或7隻以上武將)
				var ele = document.getElementById("work-head").getElementsByTagName("span");

				/*for (var i = 0, ele_length = ele.length; i < ele_length; i++) {//確定哪一個頁面
				 if (ele[i].style.color == "rgb(4, 68, 26)") {
				 if (ele[i].innerHTML == "\n<b>出陣武将</b>") {
				 ele[3].click();
				 return;
				 } else if (ele[i].innerHTML == "\n<b>育成武将</b>") {
				 setTimeout(skill_click, 100);
				 return;
				 } else if (ele[i].innerHTML == "\n<b>保管武将</b>") {
				 setTimeout(newRole_click, 100);
				 return;
				 }
				 }
				 }
				 */
				for (var i = 0,
				    ele_length = ele.length; i < ele_length; i++) {//確定哪一個頁面
					if (ele[i].style.color == "rgb(4, 68, 26)") {
						if (ele[i].innerHTML == "\n<b>出陣武将</b>") {
							ele[3].click();
							return;
						} else if (ele[i].innerHTML == "\n<b>育成武将</b>") {
							if (to_role_count == "2") {//點開技能 準備訓練
								setTimeout(skill_click, 100);
								return;
							} else if (to_role_count == "1") {
								setTimeout(sale_skill_click, 100);
								return;
							} else {//當機時 to_role_count無值 回到里
								jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
								return;
							}
						} else if (ele[i].innerHTML == "\n<b>保管武将</b>") {
							setTimeout(newRole_click, 100);
							return;
						}
					}
				}
				break;
			case "のぶニャがの野望 - 推挙武将選択":
				//交易所薦舉頁面  從0個薦舉開始到9個
				//揀選確認
				onsale_now = jQuery('img[src $= "http://210.140.157.168/img/UI/icon/action_02.png?3612740047"]').length;
				onsale_now = 10 - (onsale_now);
				if (document.getElementById("sell-card")) {
					setTimeout(card_sell, 100);
					return;
				} else {
					setTimeout(refresh, 20);
				}
				//交易所薦舉頁面
				break;
			case "のぶニャがの野望 - 推挙武将一覧":

				//交易所錄用頁面

				var trade_sell_btn = jQuery('a[href $= "/card/trade_sell.htm"]');
				if (trade_sell_btn.length > 0) {
					trade_sell_btn[0].click()
					return;
				} else {
					jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
					return;
				}

				break;
			case "のぶニャがの野望 - 部隊編成":
			case "のぶニャがの野望 - 番付":
				//程式迴圈停止
				//程式迴圈停止
				SS10 = clearInterval(SS10);
				alert("迴圈已停止");
				break;
			case "のぶニャがの野望 - ニャオみくじ":
				//抽貓籤
				var redBold = document.getElementsByClassName('red bold');
				var redBoldNum1;
				//吉籤
				var redBoldNum2;
				//福籤
				for (var i = 0; i < redBold.length; i++) {
					if (redBold[i].innerHTML == 'ニャオ福クーポン') {
						redBoldNum1 = i + 1;
						break;
					}
				}
				for (var i = 0; i < redBold.length; i++) {
					if (redBold[i].innerHTML == 'ニャオ吉クーポン') {
						redBoldNum2 = i + 1;
						break;
					}
				}
				//吉籤
				if ((redBold.length) && (redBold[redBoldNum1].innerHTML != "0")) {//抽福籤
					if (lottery_count == "0") {
						if (jQuery('input[src $= "http://210.140.157.168/img/UI/button/btn_omikuji_05.png?1310546372"]'))
							jQuery('input[src $= "http://210.140.157.168/img/UI/button/btn_omikuji_05.png?1310546372"]')[0].click();
						lottery_count = 1;
						return;
					} else if (lottery_count == "1") {
						lottery_count = 0;
						jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png"]')[2].click()
						return;
					}
				} else if ((redBold.length) && (redBold[redBoldNum2].innerHTML != "0")) {//抽吉籤
					if (lottery_count == "0") {
						if (jQuery('input[src $= "http://210.140.157.168/img/UI/button/btn_omikuji_04.png"]'))
							jQuery('input[src $= "http://210.140.157.168/img/UI/button/btn_omikuji_04.png"]')[0].click();
						lottery_count = 1;
						return;
					} else if (lottery_count == "1") {
						lottery_count = 0;
						jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png"]')[2].click()
						return;
					}
				} else if (document.getElementById("lottery_point").innerHTML > NP_cost) {
					NP_toget = document.getElementById("lottery_point").innerHTML - NP_cost;
					if (lottery_count == "0") {
						jQuery('input[src $= "http://210.140.157.168/img/UI/button/btn_omikuji_03.png"]')[0].click();
						lottery_count = 1;
						return;
					} else if (lottery_count == "1") {
						lottery_count = 0;
						jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_yes.png"]')[2].click()
						return;
					}
				}
				break;
			case "のぶニャがの野望 - 武将強化":
				//重新整理 reload
				window.parent.location.reload();
				break;

			case 773 :
			case 1443:
			case 1607:
			case 2208:
			case 2133:
			case 1785:
			case 1907:
			case 1763:
			case 2407:
			case 2541:
				//活動 訊息 點選確認
				if (document.getElementById("notify").className) {//揀選確認
					if ((jQuery('span[id $= "neko-alert-dynamic-close"]').length == 2)) {
						jQuery('span[id $= "neko-alert-dynamic-close"]')[1].childNodes[0].click()
						return;
					} else if (jQuery('div[id $= "neko-alert-close"]').length == 2) {
						jQuery('div[id $= "neko-alert-close"]')[1].click();
						return;
					} else {
						//alert(jQuery('span[id $= "neko-alert-dynamic-close"]').length);
						////SS10 = clearInterval(SS10);
						setTimeout(refresh, 20);
						return;
					}
				} else if (document.getElementById("nyaomikuji_result")) {
					jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_main_01.png?1178782638"]')[0].click();
				} else {
					jQuery('img[src $= "http://210.140.157.168/img/UI/button/btn_confirm.png?3515881966"]')[0].click();
				}
				break;

			default:
				if (check_count1 < 3) {
					check_count1 = check_count1 + 1
					return;
				} else {//跑5次後都沒有進入遊戲  更新網頁
					setTimeout(refresh, 20);
					check_count1 = 0;
					return;
				}
				break;
			}

		} else {//話面鎖定
			return;
		}
	} else {//如果沒有抓到iframe 和page_lock 等5次迴圈
		switch(document.body.clientHeight) {
		case 814+ offset_height:
		case 815+ offset_height:
		case 816+ offset_height:

			setTimeout(click_start, 50);
			break;
		default:
			break;
		}
		if (check_count < 20) {
			check_count = check_count + 1
			return;
		} else {//跑5次後都沒有進入遊戲  更新網頁
			setTimeout(refresh, 20);
			check_count = 0;
			return;
		}
	}

}

//Main program====
document.body.onload = function() {
	setTimeout(click_start, 3500);
	SS10 = setInterval(show_height, 5000);
}
function role_set(card_src) {
	//名單技能維護要點(版本分類依照http://nobunyaganoyabo.wiki.fc2.com/wiki)
	//技能以日文為主；
	//搜尋關鍵字"//待更新技能"
	//特殊卡不掛賣的 需要設定為[4,.....]
	switch(card_src) {
		//////////////活動抽到的(極)卡////////////

		case "http://210.140.157.168/img/card/illustration/card_chara_00462_4168971557.png":
			//ガラシャム (極)伽羅喵  神の恩寵
			return [3, 600000, 6, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00599_2209703599.png":
			//たちばニャ宗茂 (極)立喵宗茂 左近将監
			return [3, 200000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00559_4094582904.png":
			//上杉かげキャッツ (極)上杉喵勝 寡黙
			return [3, 250000, 10, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00279_629825937.png":
			//北のミャンどころ (極)北政所喵 まんかかさま
			return [3, 120000, 8, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00651_1217289777.png":
			//ニャンの利休 (極)喵利休 茶聖
			return [3, 200000, 12, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00582_3454251407.png":
			//黒田ボンベイ (極)黑喵官兵衛 二兵衛
			return [3, 80000, 12, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00758_1195011946.png":
			//片倉スコじゅうろう (極)片倉小十喵  潮風
			return [3, 70000, 10, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00141_4237776310.png":
			//とくニャわ家康  (極)德喵家康  三河の狸親父
			return [3, 250000, 1, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00530_1497354999.png":
			//もがミー義光 (極)最上義喵  虎将
			return [3, 60000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00109_1674371804.png":
			//シャムづ義弘 (極)島津貓弘鬼島津
			return [3, 60000, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00496_387435613.png":
			//まえニャ利家 (極)前喵利家 加賀百万石
			return [3, 100000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00286_2060517230.png":
			//明智みスフィで  (極)明智喵秀 本能寺の変
			return [3, 60000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00040_488371038.png":
			//おミーちの方 (極)阿市喵 小豆袋
			return [3, 80000, 10, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00397_3664642576.png":
			//ニャオえ兼続 (極)喵江兼續 愛の一字
			return [3, 180000, 10, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00287_3315212207.png":
			//ニャっとり半蔵 (極)喵部半藏 伊賀流護身法
			return [3, 50000, 8, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00157_2126832115.png":
			//濃姫ニャン (極)濃姬喵   内助之功
			return [3, 60000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00123_2356805923.png":
			//ミケだ信玄 (極)武田喵玄 甲斐之虎
			return [3, 200000, 3, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00050_1597526338.png":
			//織田のぶニャが  (極)織田信長 第六天魔王
			return [3, 200000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00034_712855454.png":
			//上杉ニャンしん (極)上杉喵信 越後の龍
			return [3, 200000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00130_3015128735.png":
			//伊達まシャムね (極)咪達政宗 独眼竜
			return [3, 200000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00177_2721028679.png":
			//まえニャ慶次 (極)前喵慶次 大ふへん者
			return [3, 60000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00288_3862688347.png":
			//毛利もとニャり (極)貓利元就 陰徳太平記
			return [3, 200000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00146_3321515305.png":
			//とよとミー秀吉 (極)喵臣秀吉 刀狩り
			return [3, 100000, 10, "card-back card-skill3"];
		///////////////2016/03/30 「中国の謀将」///////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00976_1902551784.png":
			//宇喜多ニャオいえ  (極)宇喜多直喵  暗中飛躍
			return [3, 999999, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00923_4104279545.png":
			// 妙玖ニャン  (稀)妙玖喵  猫に経
			return [2, 100000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00903_977637687.png":
			//毛利キャッツなが   (稀)毛利咪永  七将星
			return [2, 60000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00977_2022282431.png":
			//陶ペルかた   (稀)陶喵賢  大寧寺の変
			return [2, 50000, 6, "card-back card-skill1"];
		case "NA":
			//待更新技能，圖  (珍)ビづき種実
			return [1, 999999, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00924_2495985501.png":
			//田尻アメたね 毛づくろい
			return [1, 200, 12, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00978_3115909641.png":
			//待更新技能(珍)しょうじゅミャる 騎射
			return [1, 2000, 10, "card-back card-skill1"];
		///////////////	2016/02/29 「五周年だけど四天王」///////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00949_2778712169.png":
			//待更新技能 ミィ直政 (極)貓伊直政  英雄勇士
			return [3, 600000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00900_2108356631.png":
			//かニィ才蔵  (稀)可喵才藏  みそ合戦
			return [2, 30000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00952_3878897499.png":
			//宇佐美さだミーつ   (稀)宇佐美定喵  舟遊び
			return [2, 30000, 12, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00964_2016316794.png":
			//ニャいとう昌豊   (稀)貓藤昌豐  真の副将
			return [2, 30000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00955_1310456080.png":
			//待更新技能(珍)木下まさニャオ
			return [1, 999999, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00965_1518458761.png":
			//(珍)ふかミィ長智 陣中見舞
			return [1, 200, 10, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00966_1653950362.png":
			//川上ひさアビ (珍)智勇兼備 必殺
			return [1, 600, 6, "card-back card-skill2"];
		///////////////	2016/01/29 「ミィよしの野望」///////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00894_3757195610.png":
			//喜多ニャン (極)喜多喵  少納言
			return [3, 180000, 8, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00936_3693188229.png":
			//足利ロシアき (極)足利義喵 鞆幕府
			return [3, 400000, 10, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00937_3412162550.png":
			//細川ハバナもと (稀)細川咪元  三管領
			return [2, 30000, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00938_2100681824.png":
			//ミィよし長慶  (稀)喵好長慶  三筑
			return [2, 30000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00930_4081872661.png":
			//シンガ親次   (珍)貓賀親次  砲術
			return [1, 2000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00931_384451421.png":
			//待更新技能 吉岡ニャがます   (珍)吉岡咪增 猫目石
			return [1, 2000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00932_477605304.png":
			//田北しげかネコ   (珍)田北鎮貓  必殺
			return [1, 500, 1, "card-back card-skill1"];
		///////////////2015/12/24 「さニャだの六文銭」///////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00901_3334444444.png":
			//さニャだ昌幸 (極)真田喵幸 稀代の横着者
			return [3, 450000, 10, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00878_910356937.png":
			//五龍ニャン  (稀)五龍貓  蝶よ花よ
			return [2, 10000, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00902_462314471.png":
			//山手ニャン  (稀)山手喵  京の御前
			return [2, 50000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00908_45855130.png":
			//さニャだ大助   (稀)真田喵助  水晶の数珠
			return [2, 20000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00951_841836079.png":
			//大久保ただチカ   (珍)大久保忠貓  喝破
			return [1, 500, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00953_2630039394.png":
			//大道寺まサイベ   (珍)大道寺政喵  猫に小判
			return [1, 4000, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00953_2630039394.png":
			//猪俣くニィのり   (珍)豬俁咪憲  先駆け 地8 猫目石
			return [1, 1000, 6, "card-back card-skill1"];
		///////////////	2015/11/27 「親猫の顔が見たい」///////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00921_4202734260.png":
			//まつニャン (極)阿松喵  鍾馗陣羽織
			return [3, 850000, 8, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00865_1448855299.png":
			//木村しげニャり   (稀)木村重貓  紅花の春の朝
			return [2, 50000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00922_1010471432.png":
			//輝子ニャン   (稀)輝子喵  呑舟の魚
			return [2, 30000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00926_2514992713.png":
			//慶誾ニャン   (稀)慶誾喵  押しかけ女房
			return [2, 10000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00904_1987829198.png":
			//待更新技能 牧野やスノーり   (珍)牧野咪成
			return [1, 1000, 10, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00905_742094449.png":
			//松倉しげまシャム   (珍)松倉貓政  猫に小判
			return [1, 5000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00925_1366847942.png":
			//大ミャンどころ   (珍)大政貓  一意専心
			return [1, 1000, 6, "card-back card-skill2"];
		///////////////	2015/10/30 「甲斐の牙」//////////////////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00879_2431786770.png":
			//馬場ニャぶはる (極)馬場貓春 馬場美濃守
			return [3, 200000, 10, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00853_2789970483.png":
			//ミケだ勝頼 (稀)武田喵賴 諏訪明神の旗
			return [2, 50000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00897_3637374662.png":
			//ミケだ信繁 (稀)武田貓繁 典厩
			return [2, 10000, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00898_3151178648.png":
			//甘粕ミケもち  (稀)甘粕貓持 越後の二天
			return [2, 15000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00873_12871732.png":
			//江上ミーえたね  (珍)江上貓種  必殺 風8 肉球
			return [1, 1000, 5, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00886_2861545800.png":
			//ニャー長重   (珍)咪羽長重  一意専心
			return [1, 1000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00899_2978298210.png":
			//ヒマラいわ親吉   (珍)平喵親吉  猫に小判
			return [1, 5000, 8, "card-back card-skill2"];
		/////////////// 2015/09/29 「俺の嫁」///////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00840_406653463.png":
			// スコ鶴 (極)彥鶴喵 いわし
			return [3, 700000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00868_1809418277.png":
			// ニャりた甲斐姫  (極)甲婓喵  忍城
			return [3, 150000, 8, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00881_1726205456.png":
			// 駒姫ニャン  (稀)駒姬喵  弥陀の剣
			return [2, 30000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00882_1334909226.png":
			// 実窓ニャン  (稀)實窗喵  宰相殿
			return [2, 30000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00857_870533642.png":
			// 赤池ながト (珍)赤池長咪  必殺
			return [1, 900, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00884_2274822388.png":
			// トイ利勝 (珍)土貓利勝  毛づくろい
			return [1, 900, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00885_3637445146.png":
			// 本多ただミャさ (珍)本多喵政 猫に小判
			return [1, 4500, 6, "card-back card-skill1"];
		///////////////	2015/08/31 「忍」/////////////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00867_600562831.png":
			//ふうミャ小太郎 (極)風喵小太郎 影縫いの術
			return [3, 500000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00839_3453714658.png":
			// かミーいずミー信綱  (稀)貓泉信綱  剣聖
			return [2, 50000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00869_4063135337.png":
			// ミャミャち三太夫 (稀)百地喵太夫  二連苦無
			return [2, 10000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00870_2555198786.png":
			// 藤林ミャさやす  (稀)藤林喵保  万川集海
			return [2, 100000, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00870_2555198786.png":
			// 円城寺のフーッたね  (珍)圓城寺喵胤  猫目石
			return [1, 1500, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00871_488805633.png":
			// ニャオえ景綱   (珍)喵江景綱 猫に小判
			return [1, 3500, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00872_4048135047.png":
			//酒井ミーえつぐ    (珍)酒井咪次  喝破
			return [1, 500, 5, "card-back card-skill1"];
		///////////////	2015/07/29 「まシャムねの野望」/////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00854_2736015326.png":
			// ミャーゴ姫  (極)愛姬喵 色良き花
			return [3, 300000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00827_1290700338.png":
			// 義姫ニャン  (稀)義姬喵 お東の方
			return [2, 15000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00866_366605740.png":
			// 薄田かニャすけ (稀)薄田貓相  ヒヒ退治
			return [2, 30000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00842_195932606.png":
			// 肝付かニャつぐ  (珍)肝付貓續  猫に小判
			return [1, 3000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00849_3239841569.png":
			// ぼんてんミャる  (珍)梵貓丸  遠当て
			return [1, 3000, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00891_3950733078.png":
			//おおクレックスの局  (珍)大藏卿局喵  伏兵看破
			return [1, 600, 6, "card-back card-skill1"];
		///////////////2015/06/29 「めっちゃ好きやねん」///////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00851_1887497836.png":
			// 千姫ニャン  (極)千姬喵  播磨姫君
			return [3, 85000, 10, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00804_3744148730.png":
			// おあむニャン (稀)阿尼喵  たらい舟
			return [2, 30000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00841_2952870470.png":
			// 後藤ミャたべえ  (稀)後藤喵兵衛  大坂城五人衆
			return [2, 30000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00860_3471477892.png":
			// みシューく勘兵衛  (稀)御咪勘兵衛  荒波
			return [2, 130000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00843_3353259176.png":
			// 赤星むねミィえ  (珍)赤星統喵  連撃
			return [1, 200, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00844_3215410910.png":
			//ラグ宗是  (珍)咪久宗是  猫に小判
			return [1, 3000, 10, "card-back card-skill2"];
		case "NA":
			// 待更新技能 圖  おおたニィ義治  (普)大貓義治  援護射撃
			return [0, 300, 8, "card-back card-skill1"];
		///////////////	2015/09/08-織田的血脈///////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00829_2613473537.png":
			//お江ニャン (極)阿江喵 大御台所
			return [3, 200000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00768_817202899.png":
			//とよとミー秀頼  (稀)喵臣秀賴  かまぼこ
			return [2, 30000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00830_694027262.png":
			//シャムづ家久  (稀)島津家喵 中務大輔
			return [2, 20000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00831_2361002105.png":
			//木村オシきよ  (珍)伊貓院忠棟 猫に小判
			return [1, 4000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00832_2804153400.png":
			//いシャムいん忠棟  (珍)木村喵清 守護
			return [1, 100, 5, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00833_3193821114.png":
			//大崎ロシたか  (珍)大崎貓隆 伏兵
			return [1, 100, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00834_4067517536.png":
			//富田ショーげん  (珍)富田喵監 馬沓
			return [1, 100, 3, "card-back card-skill1"];
		///////////////2015/4/30 「しミャ左近、五月五日生まれ。」///////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00793_2501272339.png":
			//しミャ左近  (極)喵左近 鬼左近
			return [3, 350000, 12, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00764_822882080.png":
			//五郎八ニャン  (稀)五郎八喵 西館殿
			return [2, 80000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00794_3497823099.png":
			//ニャー長秀  (稀)喵羽長秀 米五郎左
			return [2, 10000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00796_4195986403.png":
			//成松のフーッかつ  (珍)成松喵勝 狙撃
			return [1, 100, 6, "card-back card-skill1"];
		case "NA":
			//待更新技能 圖 金上もりペル  (珍)金上咪備 喝破 伏兵看破
			return [1, 800, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00798_1592804506.png":
			//虎姫ニャン  (珍)虎姬喵  守護
			return [1, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00799_2095622752.png":
			//いなわシロ盛国  (珍)豬喵代盛國 ねこやなぎ
			return [1, 100, 6, "card-back card-skill1"];
		///////////////2015/3/27 「ねこの王子様っ」//////////////////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00772_4230027575.png":
			// 織田のぶたニャー  (極)織田喵忠 城介殿
			return [3, 200000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00745_3971133624.png":
			// 綾ニャン  (稀)綾喵 恩愛
			return [2, 20000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00773_1798465246.png":
			// 森ニャンまる  (稀)喵蘭丸 不動行光
			return [2, 80000, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00712_3991244522.png":
			// 色部キャッツなが  (珍)色部喵長 ねこやなぎ
			return [1, 200, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00778_4068038418.png":
			// 奥村ニャがとみ  (珍)奧村喵福  一意専心
			return [1, 1300, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00792_696999985.png":
			// 世瀬くラグド  (珍)世瀨藏貓  ねこやなぎ
			return [1, 200, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00779_2114971859.png":
			// 大友チカさだ   (普)大友貓貞  活法
			return [0, 200, 8, "card-back card-skill2"];
		///////////////2015/2/27 「スコざむらい」///////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00728_481621759.png":
			//佐々木スコじろう (極)佐佐喵小次郎  巌流
			return [3, 150000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00758_1195011946.png":
			//片倉スコじゅうろう (極)片倉小十喵  潮風
			return [3, 70000, 10, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00761_1568055864.png":
			// 柿崎ミケいえ (稀)柿崎貓家  越後第一
			return [2, 35000, 8, "card-back card-skill"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00476_1804474524.png":
			// 辰姫ニャン  (珍)辰姬喵 明鏡止水 伏兵看破
			return [1, 5000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00750_1931303173.png":
			//つミャき広忠 (珍)妻咪廣忠 信義仁
			return [1, 500, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00751_1299996029.png":
			////待更新技能 ミーぞお茂朝 (珍)貓尾茂朝
			return [1, 500, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00671_2527460023.png":
			//柴田キャッツとよ  (普)柴田勝豐 伝令
			return [0, 350, 1, "card-back card-skill1"];
		///////////////2015/1/28 「ニャンコうかい時代」///////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00658_908612897.png":
			//こばニャかわ隆景 (極)小喵川隆景 毛利両川
			return [3, 300000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00732_1961088845.png":
			// ニャたぎ冬康 (稀)喵宅冬康  仁慈
			return [2, 8000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00656_2268669482.png":
			// むらかミー通康  (稀)村喵通康 投焙烙
			return [2, 50000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00715_1609177759.png":
			// 河田ニャがちか (珍)河田貓親 一意専心
			return [1, 1000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00660_2985406632.png":
			//法輪ニャン (珍)法輪喵 喝破
			return [1, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00748_2590977354.png":
			//伊勢貞喵  (珍)伊勢貞喵 爪とぎ
			return [0, 100, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00749_2904608366.png":
			//明智ミィつただ  (普)明智咪忠 小荷駄
			return [0, 300, 1, "card-back card-skill1"];

		///////////////2014/12/24 「石山本願寺」///////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00716_3804700095.png":
			//本願寺けんニャ (極)本願寺貓如  南無阿弥陀仏
			return [3, 200000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00665_1759786062.png":
			//たかニャま右近 (稀)高喵右近  信心
			return [2, 10000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00717_818267085.png":
			//シャムづま頼廉 (稀)下間賴貓   仏敵
			return [2, 35000, 10, "card-back card-skill2"];
		case "NA":
			//待更新技能 圖 ニャいとう如安  (珍)貓藤如安  毛づくろい
			return [1, 100, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00746_3710247897.png":
			//鵜殿ながテイル  (珍)鵜殿喵照  一意専心
			return [1, 1000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00718_1024177563.png":
			//七里らいシュー  (珍)七里賴貓  策士
			return [1, 800, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00747_3061985805.png":
			//かつラパーマ氏元 (普)葛貓氏元  連撃
			return [0, 200, 1, "card-back card-skill1"];
		///////////////2014/11/28 「冬将軍」//////////////////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00713_1844222174.png":
			//たちばニャ道雪 (極)立喵道雪 雷神
			return [3, 250000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00691_3578416496.png":
			//冬姫ニャン  (稀)冬姬喵 魔王の子
			return [2, 8000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00714_1246768510.png":
			//斎藤ともボブ  (稀)齋藤咪信  越後の鍾馗
			return [2, 20000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00729_157549709.png":
			//河尻ミーでたか  (珍)河尻貓隆 一意専心
			return [1, 1000, 3, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00734_918048542.png":
			//あさひニャ泰朝  (珍)朝比咪泰朝 喝破 伝令
			return [1, 300, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00735_1053563274.png":
			//松井むねボブ  (珍)松井貓信  一意専心
			return [1, 1000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00736_1321791519.png":
			//ミィ直盛 (普)井伊直盛  渾身
			return [0, 110, 8, "card-back card-skill1"];
		///////////////2014/10/29 「黎明の天下人」/////////////////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00708_2995039348.png":
			//ミィよし長慶  (極)喵好長慶  修理大夫
			return [3, 200000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00683_2831980997.png":
			//細川ふじたキャッ   (稀)細川咪孝 文武両道
			return [3, 200000, 12, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00709_2288547038.png":
			//一休そうジャン    (稀)一休宗貓 とんちばなし
			return [2, 15000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00710_866539807.png":
			//スフィばら親憲  (珍)水貓親憲   智勇兼備
			return [1, 600, 3, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00723_1869291858.png":
			//津田のぶずミィ (珍)津田咪澄 明鏡止水
			return [1, 5000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00724_1362001696.png":
			//むラグ又兵衛  (珍)村貓又兵衛   一意専心
			return [1, 900, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00725_2029715208.png":
			//安田コーニつぐ  (珍)安田喵繼  必殺
			return [1, 500, 8, "card-back card-skill1"];
		///////////////2014/09/29 「のぶニャが包囲網」/////////////////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00720_2620492402.png":
			//藤堂たかドラ  (極)藤堂高貓   出世の白餅
			return [3, 300000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00666_4005729024.png":
			//新庄ニャン  (稀)新庄喵    母の書簡
			return [2, 25000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00721_1833461022.png":
			//真柄ニャオたか  (稀)真柄咪隆    太郎太刀
			return [2, 25000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00702_2794861607.png":
			//キャットばたけ具房 (珍)北貓具房  陣中見舞
			return [1, 150, 5, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00703_4115714782.png":
			//阿閉シャーッだゆき (珍)阿貓貞征   一意專心
			return [1, 1200, 6, "card-back card-skill2"];
		case "NA":
			//待更新技能 圖 片倉しげニャが   (珍)片倉喵長
			return [1, 2000, 0, "card-back card-name"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00662_259087942.png":
			//小浜かげたキャッツ (普)小濱貓隆  地4:警固衆
			return [0, 100, 0, "card-back card-name"];
		///////////////2014/08/29 「月光」//////////////////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00692_719964910.png":
			//やまニャか鹿介 (極)山喵鹿介 山陰の麒麟児
			return [3, 65000, 6, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00644_986681781.png":
			//ミャちづき千代  (稀)喵月千代  歩き巫女
			return [2, 10000, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00480_4072394756.png":
			//酒井たニャつぐ  (稀)酒井喵次  海老すくい
			return [2, 10000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00697_114182539.png":
			//待更新技能 あさくニャ景健  (珍)朝倉咪健
			return [1, 10000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00698_2417982939.png":
			//ミィよし長逸 (珍)喵好長逸   喝破  伏兵看破
			return [1, 600, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00700_967486701.png":
			//岩成ともミーち  (珍)岩成貓通  一意専心
			return [1, 1600, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00479_50792232.png":
			//浅井ひさミャさ (普)淺井貓政  ねこやなぎ
			return [0, 200, 1, "card-back card-skill1"];
		///////////////版本:軍師の魂////////////////////////////////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00626_108339819.png":
			//山本ニャンすけ (極)山本貓助 破軍建返し
			return [3, 400000, 12, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00684_3113835102.png":
			//ニャべしま直茂  (極)鍋島直貓  葉隠
			return [3, 200000, 10, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00685_2080504803.png":
			//ニャンこうぼう天海  (稀)南貓坊天海 陰陽道
			return [2, 15000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00687_1101865338.png":
			//あしニャ義広 (珍)蘆喵義廣  投石
			return [1, 150, 5, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00669_1128942575.png":
			//織田のぶカール  (珍)織田貓勝 信義仁
			return [1, 500, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00676_870121506.png":
			//ニャかがわ清秀 (珍)中喵清秀  ねこやなぎ
			return [1, 100, 5, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00455_2258870445.png":
			//はニャぶさ助兵衛  (珍)花貓助兵衛 智勇兼備
			return [1, 600, 6, "card-back card-skill2"];
		///////////////2014/06/30 「義愛の夫婦」/////////////////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00667_1065428341.png":
			//おおたニィ吉継 (極)大谷咪繼  刑部少輔
			return [3, 55000, 10, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00625_4233686943.png":
			//山田ニャがまさ (稀)山田喵政 戦象
			return [2, 10000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00668_3114100509.png":
			//ニャオえお船  (稀)阿船喵 姉女房
			return [2, 10000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00670_945509446.png":
			//土田ニャン  (珍)土田喵  女丈夫
			return [1, 900, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00424_483374139.png":
			//大久保ニャがやす (普)大久保長喵 毛づくろい
			return [0, 300, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00675_3508214816.png":
			//毛利ミーでもと (珍)貓利秀元 智勇兼備
			return [1, 700, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00661_2852934568.png":
			//シャムい宗室  (珍)島貓宗室 毛づくろい
			return [1, 200, 1, "card-back card-skill1"];
		///////////////版本:難波喵商人以前//////////////////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00512_1826640628.png":
			// うたニャン (珍)皎月喵  小荷馱
			return [1, 100, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00373_3101476290.png":
			// さとミィ義堯  (珍)里喵義堯  突撃 空4策士
			return [1, 200, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00552_1408245148.png":
			//柘植ミャンのじょう (珍)柘植貓之丞   援護射撃
			return [1, 500, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00632_1656130509.png":
			//於大ニャン (珍)於大喵    活法
			return [1, 200, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00112_1256121420.png":
			//諏訪ニャン (珍)諏訪喵    活法
			return [1, 200, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00602_3011342899.png":
			//だしニャン (珍)出喵 陣中見舞  活法
			return [1, 200, 9, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00225_1099035517.png":
			//安岐ニャン 安岐喵  内助の功小荷駄
			return [1, 200, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00527_19515791.png":
			//村井さだキャッツ (珍)村井貓勝 陣中見舞
			return [1, 200, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00551_2530561061.png":
			//蒲池しげなミィ (珍)蒲池貓漣 ねこやなぎ信義仁
			return [1, 500, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00434_621139201.png":
			//上杉のりミャさ (珍)上杉喵政 喝破
			return [1, 300, 5, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00311_3598201448.png":
			//鬼小島ミャーたろう (珍)鬼小島喵太郎 必殺
			return [1, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00549_2864879586.png":
			//慶誾ニャン (珍)慶誾喵   女丈夫
			return [1, 800, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00412_3404352913.png":
			//北条たかシロ (珍)北條貓廣 渾身
			return [1, 100, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00526_981193910.png":
			//お牧ニャン (珍)阿牧喵 喝破
			return [1, 400, 7, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00179_3423965789.png":
			//まつニャン (珍)阿松 内助の功
			return [1, 400, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00105_2267442755.png":
			//シャムづ家久 (普)島津家喵 狙撃
			return [0, 300, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00107_3743849598.png":
			//シャムづ歳久 (普)島津歲喵 必殺
			return [0, 750, 4, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00321_3597935845.png":
			//一条かニャさだ (普) 一條貓定 徳の心
			return [0, 230, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00124_215622938.png":
			//ミケだ信繁 (普)武田貓繁 一騎駆け
			return [0, 150, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00143_167978595.png":
			//とくニャわ秀忠 (普)德喵秀忠 竹束
			return [0, 350, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00148_1698857245.png":
			// ニャいとう昌豊 (普)貓藤昌豐 突撃
			return [0, 250, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00161_1461773555.png":
			//馬場ニャぶはる (普)馬場貓春 爪とぎ
			return [0, 150, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00172_4177701536.png":
			//細川たニャおき (普)細川貓興 馬廻衆
			return [0, 300, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00011_1882341951.png":
			//ニャたぎ冬康 (普)喵宅冬康 治療
			return [0, 130, 4, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00041_2989244905.png":
			//大内ロシたか (普)大內喵隆 雨火縄
			return [0, 50, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00047_513657612.png":
			//織田のぶキャッツ (普)織田喵雄 反撃
			return [0, 480, 4, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00048_2634055307.png":
			//織田のぶたキャッツ  (普)織田喵孝 底力
			return [0, 190, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00060_2272130204.png":
			//キャッたぎり且元 (普)貓桐且元 猫足
			return [0, 220, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00076_2412839340.png":
			//ペルシま通総 (普)貓島通總 安宅船
			return [0, 50, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00133_296228233.png":
			//千代ニャン (普)千代喵 伝令
			return [0, 340, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00163_2933918440.png":
			//はニャ姫 (普)華姬喵 おあずけ
			return [0, 120, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00168_2730673097.png":
			//北条うじミャさ (普)北條喵政 ねこじゃらし 陣羽織
			return [0, 120, 4, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00170_4152317361.png":
			//北条げんニャン (普)北條幻喵 軍配
			return [0, 90, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00239_4238355160.png":
			//毛利たキャもット (普)貓利隆元 竹束守護
			return [0, 190, 4, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00230_1254018637.png":
			//大村スフィただ (普)大村喵忠 威嚇発砲
			return [0, 190, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00237_972928744.png":
			//筒井じゅンベイ (普)筒井喵慶 横槍
			return [0, 150, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00238_1322196976.png":
			//秋田さニャすえ (普)秋田實喵 底力
			return [0, 150, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00244_2082744583.png":
			//トイガさき道順  (普)伊賀崎貓順 必中 必中空蝉の術
			return [0, 550, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00371_1687736973.png":
			//あニャこうじ頼綱 (普)姊小貓賴綱 守護
			return [0, 200, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00374_653175835.png":
			//ニャーゴロ金石斎 (普)貓來金石齋 早合
			return [0, 650, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00406_399859324.png":
			//ニャさ日本助 (普)貓佐日本助 陣中見舞(地8 警固眾)
			return [0, 200, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00019_30291205.png":
			//ミィ直政 (普)貓伊直政 單騎闖陣  威圧一騎駆け
			return [0, 150, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00122_679818168.png":
			//ミケだ逍遥軒 (普)武田貓遙軒 馬廻衆
			return [0, 355, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00176_2983932911.png":
			//本多まさニャぶ (普)本多貓信 マタタビ
			return [0, 100, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00005_2652116193.png":
			//あさくニャ義景 (普)朝倉咪景 横槍
			return [0, 150, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00009_3541839.png":
			//あしニャ盛氏 (普)蘆貓盛氏 守護
			return [0, 210, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00017_3543041330.png":
			//ニャンどう守就 (普)喵藤守就 足止め馬沓
			return [0, 120, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00022_4225776341.png":
			//石川かずミャさ (普)石川數喵 手練 早合
			return [0, 650, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00026_3180053588.png":
			//いニャどめ一夢 (普)喵富一夢 三段撃ち
			return [0, 900, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00038_4138722769.png":
			//氏家ぼくニャン (普)氏家卜喵 底力
			return [0, 190, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00058_760499385.png":
			//蠣崎よしシロ (普)蠣崎慶貓 手練
			return [0, 490, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00075_995353025.png":
			//九戸ミャさざね (普)九戶喵實 迅速
			return [0, 650, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00097_516193082.png":
			//さとミィ義弘 (普)里喵義弘 陣太鼓
			return [0, 155, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00102_3897433960.png":
			//七条かねニャか (普)七條喵仲 連擊
			return [0, 240, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00113_3386802408.png":
			//ニャンごく秀久 (普)喵石秀久 必中
			return [0, 480, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00285_1019018469.png":
			//ニャンごく秀久 (珍)喵石秀久 反撃 先駆け
			return [0, 500, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00116_3012683553.png":
			//十河ミャさやす (普)十河喵保 陣中見舞
			return [0, 310, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00135_3534030478.png":
			//ちょうソマリ盛親 (普)長宗貓部盛親 迅速 必中
			return [0, 650, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00138_3745981608.png":
			//津田ニャンちょう (普)津喵算長 焙烙玉
			return [0, 380, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00144_1212024111.png":
			//とよとミー秀次 (普)喵臣秀次 鼓舞伏兵看破
			return [0, 920, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00167_3856642372.png":
			//ペルた織部 (普)古喵織部 鼓舞
			return [0, 400, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00214_3408263090.png":
			//大久保ひコラえもん (普)大久保貓左衛門 奇襲
			return [0, 200, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00353_2724524345.png":
			//斎藤オシみつ (普)齋藤利貓 馬迴眾
			return [0, 350, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00013_3517009382.png":
			//あミャーゴ晴久 (普)尼子晴喵 貓足
			return [0, 200, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00068_1859260435.png":
			//菊姫ニャン (普)菊姬喵 治療
			return [0, 150, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00092_2838507023.png":
			//さくミャ信盛  (普)佐久喵信盛 守護
			return [0, 190, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00096_1915888018.png":
			//佐々ニャりまさ (普)佐佐貓政 早合 雙人物
			return [0, 650, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00098_4285165067.png":
			//さニャだ信之 (普)真田信咪 ねこじゃらし陣羽織
			return [0, 300, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00142_29968382.png":
			//とくニャわ信康 (普)德喵信康 迅速
			return [0, 650, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00153_1188898369.png":
			//ニャンぶ晴政 (普)貓部晴政 竹束 底力
			return [0, 350, 4, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00242_2400985881.png":
			//五徳ニャン (普)五德喵 猫足
			return [0, 190, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00001_1054078020.png":
			//明智ひでミィつ (普)明智秀咪 貓足
			return [0, 190, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00329_1988175871.png":
			//ほんニャみ光悦 (普)本阿彌貓悅 貓足 (地4 臺子點前)
			return [0, 320, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00360_2469226041.png":
			//うつのミャー国綱 (普)宇都宮喵綱 馬沓
			return [0, 380, 1, "card-back card-skill1"];
		case"http://210.140.157.168/img/card/illustration/card_chara_00045_1377126194.png":
			// ニャオえお船 (普)阿船喵 內助之功
			return [0, 270, 12, "card-back card-skill1"];
		case"http://210.140.157.168/img/card/illustration/card_chara_00052_2913669333.png":
			//お光ニャン (普)阿光喵 活法
			return [0, 490, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00195_3363109634.png":
			//やミャウち一豊 (普)喵內一豐 手練
			return [0, 450, 12, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00227_1016341167.png":
			//スノくま石宗 (普)角貓石宗 猫なで声
			return [0, 650, 12, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00327_2759101791.png":
			//奥村ニャがとみ (普)奧村喵福 活法
			return [0, 450, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00379_1433484353.png":
			//まえニャ玄以 (普)前喵玄以 陣中見舞
			return [0, 300, 12, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00006_3968331455.png":
			//浅野ニャがまさ (普)淺野喵政 鼓舞
			return [0, 400, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00240_2163376958.png":
			//伊達ペルむね 咪達輝宗 陣羽織 (火8 威壓.改)
			return [0, 190, 1, "card-back card-skill1"];
		//////////////////////----(珍)卡----//////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00117_1665548979.png":
			//メイクン雪斎 (珍)貓原雪齋 喝破
			return [1, 250, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00248_3828860899.png":
			//あニャーま梅雪 (珍)穴貓梅雪 焙烙玉
			return [1, 250, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00247_2555157657.png":
			//新庄ニャン (珍)新庄喵 竹束守護
			return [1, 150, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00235_1069916312.png":
			//トイガー重位 (珍)東貓重位 爪とぎ
			return [1, 100, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00191_2352968807.png":
			//母里ニャへえ (珍)母里貓兵衛 必殺
			return [1, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00185_3922378144.png":
			//ミャーゴ姫 (珍)愛姬喵 陣中見舞
			return [1, 250, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00137_4212772926.png":
			//津軽アメのぶ (珍)津輕貓信 傳令
			return [1, 220, 10, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00082_1152813405.png":
			//豪姫ニャン (珍)豪姬喵 手練
			return [1, 250, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00074_2520571674.png":
			//九鬼オシキャト (珍)九鬼喵隆 安宅船
			return [1, 20, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00059_1135968144.png":
			//キャッツがの局 (珍)春日局喵 伏兵看破
			return [1, 500, 10, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00031_1476172233.png":
			//いわミー重太郎 (珍)岩喵重太郎 連撃
			return [1, 200, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00189_2424049667.png":
			//ミャちづき千代 (珍)喵月千代 伏兵
			return [1, 100, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00531_1336710208.png":
			//大野はるフサ (珍)大野治貓  渾身
			return [1, 100, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00188_742323206.png":
			//もがミー義光 (珍)最上義喵 軍配
			return [1, 50, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00182_4217081228.png":
			//ミィよし長慶 (珍)喵好長慶 逗貓
			return [1, 50, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00129_160803860.png":
			//伊達ミケざね (珍)咪達成實 足止め
			return [1, 200, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00121_1391626773.png":
			//ミケだ勝頼  (珍)武田喵賴 馬沓
			return [1, 250, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00120_1358009951.png":
			//滝川かずミャす (珍)瀧川一喵 手練
			return [1, 250, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00111_4084136283.png":
			//陶ペルかた (珍)陶喵賢 ねこじゃらし底力
			return [1, 50, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00090_4218228202.png":
			//榊原ニャすまさ (珍)神原喵政 威壓
			return [1, 100, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00083_1313364506.png":
			//コーニシュ行長  (珍)小喵行長 足止め
			return [1, 100, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00080_4157935821.png":
			//ネコうそかべ親泰 (珍)香宗貓部親泰 徳の心
			return [1, 60, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00079_3121289629.png":
			//高坂ミャさのぶ (珍)高阪貓信 爪とぎ一騎駆け
			return [1, 100, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00078_721233419.png":
			//クロだ長政  (珍)黑喵長政 馬廻衆
			return [1, 110, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00053_362801648.png":
			//おにニャー左月 (珍)鬼喵左月 爪とぎ必殺
			return [1, 250, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00033_3498767314.png":
			//上杉かげドラ (珍)上杉喵虎 陣羽織
			return [1, 200, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00016_2261645659.png":
			//ニャンこくじ恵瓊 (珍)安國寺惠瓊 加護
			return [1, 500, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00156_716087941.png":
			//ネネ (珍)寧寧喵 内助の功
			return [1, 100, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00140_3313249210.png":
			//藤堂たかドラ (珍)藤堂高貓 早合
			return [1, 100, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00184_3004519178.png":
			//むらかミー義清 (珍)村上貓清 手練 馬沓
			return [1, 200, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00194_1591237144.png":
			//ニャぎゅう宗矩(珍)柳生喵矩 伏兵
			return [1, 200, 10, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00035_1006925775.png":
			//宇喜多ニャオいえ (珍)宇喜多直喵 マタタビ伏兵
			return [1, 100, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00095_3764928044.png":
			//ニャたけ義重 (珍)佐竹咪重 必殺
			return [1, 300, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00066_2756837322.png":
			//がマウ氏郷 (珍)蒲生氏喵 爪とぎ
			return [1, 100, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00099_1697947252.png":
			//さニャだ昌幸 (珍)真田喵幸軍配伝令
			return [1, 110, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00032_3910223696.png":
			//上杉かげキャッツ (珍)上杉喵勝 底力
			return [1, 100, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00042_1689998761.png":
			//おおたニィ吉継 (珍)大谷咪繼 信義仁
			return [1, 400, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00147_3685889902.png":
			//とよとミー秀頼 (珍)喵臣秀賴 猫足
			return [1, 100, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00108_2973665769.png":
			//シャムづ義久 (珍)島津義喵 ねこじゃらし
			return [1, 200, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00012_2399709844.png":
			//あミャーゴ経久 (珍)尼子經喵 迅速
			return [1, 450, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00064_2736696903.png":
			//かニィ才蔵 (珍)可喵才藏 迅速 反撃
			return [1, 450, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00243_3874293117.png":
			//キャットう段蔵  (珍)加藤貓藏 空蟬之術
			return [1, 400, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00101_1033039141.png":
			//シャルトび佐助 (珍)猿飛喵助 早合暗殺術
			return [1, 340, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00071_3605189682.png":
			//キャッかわ元春 (珍)吉貓元春 突撃 智勇兼備
			return [1, 550, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00070_4232492646.png":
			//キャットばたけ具教 (珍)北貓具教 連撃智勇兼備
			return [1, 600, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00089_1040183402.png":
			//酒井たニャつぐ (珍)酒井喵次 守護
			return [1, 150, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00197_1937957139.png":
			//やまニャか鹿介 (珍)山喵鹿介 連撃
			return [1, 50, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00281_930667815.png":
			//鶴姫ニャン (珍)鶴姬喵 陣中見舞活法
			return [1, 300, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00477_2007787424.png":
			//明智ひでミィつ (珍)明智秀咪 ねこやなぎ 信義仁
			return [0, 400, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00542_995218535.png":
			//定恵ニャン    (珍)定惠喵  陣中見舞
			return [1, 200, 3, "card-back card-skill2"];
		///////////////// 不會練到的 直接掛賣///////////////////

		case "http://210.140.157.168/img/card/illustration/card_chara_00174_3903724529.png":
			//本願寺けんニャ (珍)本願寺貓如 加護守護信義仁
			return [0, 600, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00165_862296142.png":
			//ふうミャ小太郎 (珍)風喵小太郎 幻術空蝉の術暗殺術
			return [0, 500, 10, "card-back card-skill2"];
		///////////////////只有吉籤能抽//////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00335_3018836093.png":
			//山手ニャン (普)山手喵 掩護射擊
			return [0, 600, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00349_747658024.png":
			//ヤヤ (普)彌彌喵 貓足
			return [0, 220, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00326_484128601.png":
			//平手ミャさひで (普)平手貓秀 喝破
			return [0, 250, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00219_3714710241.png":
			//三条ニャン (普)三條喵 內助之功
			return [0, 290, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00224_426202970.png":
			//おあむニャン (普)阿尼喵 德之心
			return [0, 100, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00229_3450836246.png":
			//アビシ掃部 (普)明石喵部 喝破
			return [0, 650, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00236_2627342817.png":
			//せニャ (普)瀨名喵 狙擊+++(地8 掩護射擊)
			return [0, 500, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00322_1741243831.png":
			//うえニャ宗箇 (普)上貓宗箇 台子点前 ねこやなぎ
			return [0, 200, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00131_478640127.png":
			//たニャーがしま時堯 (普)種子島時喵 早合+++(地8 掩護射擊)
			return [0, 500, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00154_2270976524.png":
			//ニーかいどう盛義 (普)喵階堂盛義 軍配
			return [0, 200, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00162_2320480546.png":
			//はニャかわ殿 (普)早川喵 陣中見舞
			return [0, 250, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00212_3152896528.png":
			//鳥居すニャえもん (普)鳥居貓右衛門 底力
			return [0, 200, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00251_1828197061.png":
			//山田ニャがまさ (普)山田喵政 必中
			return [0, 500, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00069_3088456450.png":
			//木曽よしミャさ (普)木曾義喵 馬沓
			return [0, 400, 12, "card-back card-name"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00072_38379457.png":
			//京極 たキャッツぐ (普)京極貓次 投石
			return [0, 150, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00081_2530791619.png":
			//河野みちニャオ (普)河野喵直 雨火繩
			return [0, 50, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00087_2067986700.png":
			//斎藤キャッツおき (普)齋藤貓興 貓足
			return [0, 200, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00093_2593106554.png":
			//さくミャ盛政 (普)佐久喵盛政 渾身
			return [0, 250, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00110_3555015748.png":
			//しミィず宗治 (普)清水貓治 伏兵看破
			return [0, 800, 12, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00312_2360210613.png":
			//キャッかわ広家 (普)吉川貓家 喝破
			return [0, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00020_2958981867.png":
			//ミケだ恒興 池喵恒興 陣中見舞
			return [0, 350, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00029_2676792335.png":
			//いミャがわ氏真 (普)喵川氏真 貓足
			return [0, 300, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00039_1518771592.png":
			//梅姫ニャン (普)梅姬喵 德之心
			return [0, 200, 4, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00046_2930033719.png":
			//織田うラグ (普)織田喵樂 治療+++(空12:傳令)
			return [0, 150, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00049_1145033342.png":
			//織田のぶたニャー (普)織田喵忠 守護
			return [0, 150, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00055_2494841678.png":
			//お初ニャン (普)阿初喵 陣中見舞活法
			return [0, 300, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00063_2727639726.png":
			//かニャもり長近 (普)喵森長近 マタタビ
			return [0, 250, 12, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00173_215704075.png":
			//細川ミュウさい (普)細川喵齋 德之心
			return [0, 250, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00037_2914312950.png":
			//宇佐美さだミーつ (普)宇佐美定喵 傳令
			return [0, 350, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00085_1545999893.png":
			//こばニャかわ秀秋 (普)小喵川秀秋 猫足
			return [0, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00010_3508845369.png":
			//阿蘇これミャさ (普)阿蘇喵將 奇襲
			return [0, 150, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00014_99958352.png":
			//ニャらき村重 喵木村重 陣羽織
			return [0, 250, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00015_4149970887.png":
			//ありミャー晴信 (普)有馬喵信 必中
			return [0, 250, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00318_2260808764.png":
			//喜多ニャン 喜多喵 潛力
			return [0, 100, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00615_2400609930.png":
			//あミャーゴ義久  (普)尼子義喵 陣中見舞
			return [0, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00407_2903095021.png":
			//ニャつか正家 (普)貓束正家 喝破
			return [0, 250, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00413_4045188663.png":
			//坂崎ニャオもり (普)坂崎貓勝 一騎駆け
			return [0, 100, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00502_3717706558.png":
			//ハバナ秀治 (普)波多野秀治 投石
			return [0, 150, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00528_1728743104.png":
			// 新発田ミケいえ (珍)新發田重家 貓柳 理毛
			return [1, 200, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00362_3741222973.png":
			//ニャンぶ利直 (普)南貓利直  理毛
			return [0, 200, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00217_553690998.png":
			//義姫ニャン (珍)義姬喵  焙烙玉
			return [1, 200, 10, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00350_550032052.png":
			//うらがミー宗景 (普)浦貓宗景 竹束ねこやなぎ
			return [0, 200, 4, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00614_3389409757.png":
			//林ミィでさだ (珍)林貓貞  喝破
			return [1, 300, 14, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00622_3873953655.png":
			//北条うじニャオ (珍)北條咪直  陣中見舞活法
			return [1, 200, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00631_1883200643.png":
			//いミャがわ氏親 (珍)喵川氏親  守護ねこやなぎ
			return [1, 200, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00451_1149808396.png":
			//森よしニャり (珍)森可喵  反擊
			return [1, 300, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00054_2658733332.png":
			//おにニャー綱元 (珍)鬼喵綱元 守護馬廻衆
			return [1, 200, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00653_4027349828.png":
			//国友ぜんベイ (珍)國友喵兵衛 狙撃
			return [1, 600, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00655_3580154213.png":
			//安井どうトン (普)安井貓頓  小荷駄陣中見舞
			return [0, 300, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00424_483374139.png":
			//大久保ニャがやす (普)大久保長安  毛づくろい
			return [0, 300, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00634_1266095860.png":
			//伊達ネコじろう (普)伊達小貓郎  毛づくろい
			return [0, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00422_2005931866.png":
			//堀尾オシはる (普)堀尾咪晴  ねこやなぎ
			return [0, 400, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00471_877467373.png":
			//神保ニャがもと (普)神保貓職  陣中見舞
			return [0, 300, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00563_4135016500.png":
			//大友ロシむね (普)大友義統 毛づくろい
			return [0, 250, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00084_396447030.png":
			//こばニャかわ隆景 (珍)小喵川隆景 鼓舞
			return [1, 150, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00103_2880232847.png":
			//柴田キャッツいえ (珍)柴田勝貓 破瓶
			return [1, 300, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00104_2473272294.png":
			//しミャ左近 (珍)喵左近 伏兵看破
			return [1, 200, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00155_449527923.png":
			//ニャー長秀 (珍)喵羽長秀 陣中見舞 活法
			return [1, 150, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00128_756743396.png":
			//たちばニャ宗茂  (珍)立喵宗茂 馬沓
			return [1, 270, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00192_3613282584.png":
			//森ニャンまる (珍)喵蘭丸 活法
			return [1, 300, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00004_3947013239.png":
			//あさくニャ宗滴 (珍)朝倉宗咪 威壓‧改
			return [1, 200, 10, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00021_2453581039.png":
			//ミケだ輝政 池喵輝政 渾身
			return [1, 100, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00036_3172771461.png":
			//宇喜多ミーでいえ (珍)宇喜多秀喵 足止め
			return [1, 500, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00061_4291587779.png":
			//片倉スコじゅうろう (珍)片倉小十喵 信義仁
			return [1, 500, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00073_1132428623.png":
			//セルカークレ才蔵 (珍)貓隱才藏 伏兵 幻術
			return [1, 200, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00115_1715626278.png":
			//千姫ニャン (珍)千姬喵 治療活法
			return [1, 200, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00159_2453307566.png":
			//はちスコ小六 (普)貓須賀小六 奇襲
			return [1, 1200, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00180_1340904040.png":
			//まつニャが久秀 (珍)松永貓秀  焙烙玉 策士
			return [1, 300, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00186_1964515552.png":
			//毛利ペルもと (珍)貓利輝元 馬迴眾
			return [1, 340, 10, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00171_2712418552.png":
			//北条つニャしげ (珍)北條喵成 爪とぎ地黄八幡
			return [1, 300, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00150_3773000683.png":
			//ニャがの業正 (珍)喵野業正 陣羽織
			return [1, 220, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00190_2543844814.png":
			//ミャミャち三太夫 (珍)百地喵太夫 焙烙玉 幻術
			return [1, 200, 12, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00056_634271124.png":
			//ニャりた甲斐姫 (珍)甲斐喵  守護  火8 女丈夫
			return [1, 100, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00158_2526188648.png":
			//支倉つねニャが  	(珍)支倉常喵 早合
			return [1, 400, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00215_124309262.png":
			//戸沢もりニャす (珍)戶澤盛喵 馬沓砂かけ
			return [1, 1500, 3, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00220_3942180162.png":
			//ミャリア (珍)喵利亞 陣中見舞
			return [3, 200, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00223_3534657315.png":
			//ニャがた徳本 (珍)喵田德本 藥學知識
			return [1, 1000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00233_3369774358.png":
			//丸目くニャンど (珍)丸目藏貓 必殺 月影
			return [1, 800, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00250_2780720526.png":
			//ミーこがみ典膳 (珍)御子神典膳 抜刀術
			return [1, 1800, 10, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00118_549169464.png":
			//ニャかはし紹運 (珍)貓橋紹運 威壓・改
			return [1, 800, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00234_3187880846.png":
			//飯富トラまさ (珍)飯富虎貓 一騎駆け
			return [1, 300, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00313_3223437055.png":
			//森ニャがよし (珍)森喵可 渾身 先驅 風4
			return [1, 200, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00352_754727424.png":
			//寿桂ニャン (珍)壽桂喵 喝破
			return [1, 300, 11, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00331_3943512380.png":
			//於通ニャン (珍)於通喵 喝破
			return [1, 2000, 11, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00378_1189337581.png":
			//左ニャンゴロう (珍)左貓五郎 喝破伏兵 看破
			return [1, 500, 9, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00369_1017502407.png":
			//ニャたけ義宣 (珍)貓竹義宣  ねこやなぎ
			return [1, 300, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00375_953959941.png":
			//塙ニャンえもん (珍)塙貓右衛門 爪とぎ
			return [1, 100, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00364_392703601.png":
			//麝香ニャン (珍)麝香喵 喝破
			return [1, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00370_2309842685.png":
			//ニャー助左衛門 (珍)貓屋助左衛門 貓足
			return [1, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00403_679670065.png":
			//如春ニャン (珍)如春喵 陣中見舞
			return [1, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00456_1299025040.png":
			//サイとう伝鬼坊 (珍)貓藤傳鬼坊 毛づくろい
			return [1, 150, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00457_754284071.png":
			//百武ともテネ (珍)百武賢貓 渾身
			return [1, 100, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00325_3099244477.png":
			//鳥居もとたニャ (珍)鳥居元喵 信義仁
			return [1, 500, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00449_1552088230.png":
			//まえニャ利長 (珍)前喵利長 ねこやなぎ
			return [1, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00506_3830017505.png":
			//小笠原ニャがとき (珍)小笠原咪時 伝令 喝破
			return [1, 250, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00431_3859705281.png":
			//ニィのくるわ猪助 (珍)二貓輪豬助 毛づくろい 空蝉の術
			return [1, 300, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00428_585553734.png":
			//堀ひでミャさ (珍)堀貓政 毛づくろい
			return [1, 200, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00521_196590328.png":
			//さニャだ信綱 (珍)真田咪綱 智勇兼備
			return [1, 550, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00560_123503878.png":
			//黒田セルカーずしげ (珍)黑田貓成 智勇兼備
			return [1, 550, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00196_4028649400.png":
			//ニャまがた昌景 (珍)貓縣昌景 川中島之激戰
			return [1, 500, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00057_3944772221.png":
			//柿崎ミケいえ (珍)柿崎貓家 川中島之激戰
			return [1, 400, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00216_1508393999.png":
			//甲斐ソマリん (珍)甲斐宗貓  竹束
			return [1, 100, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00601_2316660231.png":
			//ミーむら家親 (珍)三喵家親  連擊
			return [1, 200, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00145_3657071394.png":
			//とよとミー秀長 (珍)喵臣秀長 援護射撃
			return [1, 400, 10, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00323_2541296557.png":
			//太田すけミャさ (珍)太田貓正  反撃
			return [1, 200, 7, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00302_3841732047.png":
			//たけニャか半兵衛 (珍)竹喵半兵衛 喝破 猫なで声
			return [1, 200, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00007_2532762697.png":
			//足利ロシアき (珍)足利義喵  陣太鼓
			return [1, 400, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00304_1423010742.png":
			//黒田ボンベイ (珍)黑喵官兵衛 投石援護射撃
			return [1, 500, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00433_150342860.png":
			//青岳ニャン (珍)青岳喵 ねこやなぎ
			return [1, 300, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00358_348471382.png":
			//トイ宗珊 (珍)土貓宗珊  伏兵看破
			return [1, 500, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00621_1728255546.png":
			//本庄しげニャが (珍)本庄貓長  智勇兼備
			return [1, 500, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00561_3373128589.png":
			//キャッかわ経家 (珍)喵川經家  ねこやなぎ
			return [1, 200, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00430_2924767933.png":
			//つニャ宗及 (珍)津喵宗及  会合衆
			return [1, 3000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00282_1543989420.png":
			//織田キャッぽうし (珍)織田喵法師   狙撃
			return [1, 300, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00246_1773323642.png":
			//後藤ミャたべえ (珍)後藤喵兵衛   反撃
			return [1, 300, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00402_2082672624.png":
			//ありミャー豊氏 (珍)有馬喵氏   毛づくろい
			return [1, 300, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00357_1988249621.png":
			//松姫ニャン (珍)松姬喵   活法
			return [1, 300, 3, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00450_3203446988.png":
			//ロシおか憲法 (珍)吉岡憲喵   活法
			return [1, 300, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00529_455856987.png":
			//田鶴ニャン (珍)田鶴喵   活法
			return [1, 300, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00640_264056875.png":
			//スノーみ宗勝 (珍)貓美宗勝   智勇兼備
			return [1, 600, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00859_1240713794.png":
			//円城寺のフーッたね (珍)圓城寺喵胤   ねこやなぎ
			return [1, 100, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00356_2310659833.png":
			//ミケだ義信 (珍)武田義貓   ねこやなぎ
			return [1, 100, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00361_912885875.png":
			//ニャがお政景 (珍)貓尾政景   陣中見舞
			return [1, 300, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00351_2973671851.png":
			//別所ニャがはる (珍)別所貓治   ねこやなぎ
			return [1, 300, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00351_2973671851.png":
			//別所ニャがはる (珍)別所貓治   ねこやなぎ
			return [1, 300, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00469_261955334.png":
			//アビやま信友 (珍)喵山信友   毛づくろい
			return [1, 100, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00051_2069119939.png":
			//おつやニャン (珍)阿艷喵   鼓舞
			return [1, 300, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_10019_1524320526.png":
			//杉谷ぜんじゅボン (珍)杉谷善住坊   狙撃
			return [1, 600, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00241_1777844297.png":
			//つねニャン (珍)阿恒喵   横槍
			return [1, 100, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00548_3749724131.png":
			//嶺松ニャン (珍)嶺松貓   陣中見舞
			return [1, 100, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00228_2495646369.png":
			//ニャまた祐光 (珍)貓田祐光   明鏡止水
			return [1, 2000, 12, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00114_2832260735.png":
			//ニャンの利休 (珍)喵利休   茶の湯
			return [0, 1000, 6, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00654_1290532434.png":
			//茶屋シロじろう (珍)茶屋咪郎次郎   商魂
			return [1, 1000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00612_2364492507.png":
			//二本松オシつぐ (珍)二本松貓繼   策士
			return [1, 1000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00584_847152896.png":
			//もとやマンクス茂辰 (珍)本山喵辰   策士
			return [1, 100, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00584_847152896.png":
			//もとやマンクス茂辰 (珍)本山喵辰   策士
			return [1, 100, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00363_1694493111.png":
			//赤井ニャオまさ (珍)赤井貓正   渾身
			return [1, 100, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00106_1355584117.png":
			//シャムづ貴久 (珍)島津貴喵   援護射撃
			return [1, 300, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00310_4041567925.png":
			//斎藤よしキャッツ (珍)齋藤義貓   投石
			return [1, 100, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00570_4049094054.png":
			//きラグ親貞 (珍)吉喵親貞   喝破
			return [1, 300, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00467_2800291366.png":
			//十河かずミャさ (珍)十河一貓   連擊
			return [1, 100, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00152_1098831031.png":
			//ニャべしま直茂 (珍)鍋島直貓   底力
			return [1, 100, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00119_2181682379.png":
			//たかニャま右近 (珍)高喵右近   鼓舞
			return [1, 100, 4, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00489_3613523599.png":
			//はなニャン (珍)花喵   鼓舞
			return [1, 100, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00401_94428677.png":
			//小堀ニャンしゅう (珍)小堀貓州   鼓舞
			return [1, 100, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00633_1630949609.png":
			//大内さだつニャーッ (珍)   必殺
			return [1, 100, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00562_735503709.png":
			//たけニャか重門  (珍) 竹咪重門   必殺
			return [1, 300, 6, "card-back card-skill2"];
		case "NA":
			//安芸くにトラ  (珍) 安藝貓虎   智勇兼備
			return [1, 300, 6, "card-back card-skill2"];
		//
		//
		/////////////////////  -----(稀)卡  ---- ///////////////////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00492_2697237827.png":
			//さニャだ幸隆  (稀)真田幸咪 攻め弾正
			return [2, 10000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00598_1544803494.png":
			//あさくニャ宗滴  (稀)朝倉宗咪 九十九髪茄子
			return [2, 10000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00199_859076896.png":
			//ミューき秀康  (稀)結城秀喵
			return [2, 5000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00419_989662811.png":
			//千姫ニャン  (稀)千姬喵 若御台
			return [2, 5000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00337_2747331222.png":
			//ニャたけ義重  (稀)佐竹咪重 坂東太郎
			return [2, 4000, 10, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00388_1927538100.png":
			//しミャ左近  (稀)喵左近 兵貴神速
			return [2, 12000, 12, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00305_3785360674.png":
			//たちばニャ宗茂  (稀)立喵宗茂  剛勇鎮西一
			return [2, 5000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00292_1458076773.png":
			//ニャンの利休  (稀)喵利休  わび茶
			return [2, 9000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00355_1423779240.png":
			//鮭延ひでつニャ   (稀)鮭延秀貓  長谷堂の武勇
			return [2, 4000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00439_2064011625.png":
			//おおたニィ吉継   (稀)大谷咪繼  神出鬼没
			return [2, 4000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00440_865997366.png":
			//常高ニャン  (稀)常高喵  和平の願い
			return [2, 9000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00002_4225933416.png":
			//明智みスフィで  (稀)明智喵秀 三日天下 雙人物
			return [2, 9000, 12, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00024_2736526653.png":
			//石田みつニャり (稀)石田喵成 大一大萬大吉
			return [2, 9000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00086_3567442854.png":
			//雑賀ミャーゴいち (稀)雜賀喵一 八咫烏
			return [2, 8000, 10, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00290_925258483.png":
			//あミャーゴ経久  (稀)尼子經喵 八咫烏
			return [2, 4000, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00139_3829563369.png":
			//鶴姫ニャン (稀)鶴姬喵 治療
			return [2, 4000, 5, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00149_2061567210.png":
			//ニャオえ兼続 (稀)喵江兼續 直江狀
			return [2, 4000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00169_1048791373.png":
			//北条うじニャす (稀)北條喵康 相模の獅子
			return [2, 8000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00299_2376613124.png":
			//こばニャかわ隆景  (稀)小喵川隆景 陣中見舞
			return [2, 8000, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00299_2376613124.png":
			//毛利もとニャり  (稀)貓利元就  謀将
			return [2, 8000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00008_3886931886.png":
			//足利よしペル   (稀)足利喵輝  必殺剣豪将軍
			return [2, 5000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00023_30189756.png":
			//石川ごえミャン (稀)石川貓右衛門  天下の大泥棒
			return [2, 4500, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00025_2169078585.png":
			//出雲のおくニィ (稀)出雲阿喵 猫足反撃
			return [2, 4500, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00028_1972930864.png":
			//いニャ姫  (稀)稻姬喵  与一の弓
			return [2, 5500, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00030_1502380930.png":
			//いミャがわ義元 (稀)喵川義元 海道一の弓取
			return [3, 5000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00043_3254799673.png":
			//大友そうニャン (稀)大友貓麟 神の恵み
			return [2, 12000, 1, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00062_122992500.png":
			//キャットう清正 (稀)加藤咪正 一騎駆け
			return [2, 5000, 3, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00280_2874830046.png":
			//とくニャわ家康  (稀)德喵家康  薬学知識
			return [2, 9000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00067_2889326012.png":
			//ガラシャム (稀)伽羅喵 陣中見舞活法
			return [2, 5000, 3, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00077_2421027622.png":
			//黒田ボンベイ (稀)黑喵官兵衛 両兵衛の采配
			return [2, 5000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00088_3238946448.png":
			//斎藤ドラニャン (稀)齋藤貓三 美濃マムシ
			return [2, 5000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00125_753712685.png":
			//たけニャか半兵衛 (稀)竹喵半兵衛 両兵衛の采配
			return [2, 12000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00126_86897525.png":
			//たちばニャ誾千代 (稀)立喵誾千代 女英傑  雙人物
			return [2, 4500, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00132_3670840416.png":
			//チャチャ (稀)茶茶喵 貓足
			return [2, 4500, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00136_4103355974.png":
			//塚原ぼくニャン (稀)塚原卜喵 必殺 威圧・改
			return [2, 4500, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00160_3663124625.png":
			//ニャっとり半蔵  (稀)喵部半藏 猫足 鬼半蔵
			return [2, 6500, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00166_428325057.png":
			//福島ミャさのり (稀)福島貓則 磨爪
			return [2, 4000, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00175_2754456757.png":
			//本多ただキャッツ  (稀)本多貓勝   必殺 爪とぎ  蜻蛉切
			return [2, 4500, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00178_2089255978.png":
			//まえニャ利家 (稀)前喵利家 陣羽織
			return [2, 4500, 2, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00178_2089255978.png":
			//ニャぎゅう石舟斎 (稀)	柳生石喵齋 剣術指南】
			return [2, 4500, 12, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00198_218111193.png":
			//山本ニャンすけ (稀)山本貓助 伏兵看破
			return [2, 4500, 10, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00200_1723386800.png":
			//龍造寺たかのフーッ  (稀)龍造寺隆貓 肥前の熊
			return [2, 4500, 12, "card-back card-skill3"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00027_1357252908.png":
			//いニャば一鉄 (稀)喵葉一鐵 必殺
			return [2, 4000, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00044_3809893958.png":
			//お江ニャン (稀)阿江喵 迅速
			return [2, 10000, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00183_2529790700.png":
			//むらかミー武吉  (稀)村上喵吉 迅速
			return [2, 4000, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00094_2700606409.png":
			//佐々木スコじろう (稀)佐佐喵小次郎  燕返し
			return [2, 7000, 6, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00151_2693096274.png":
			//ナーゴや山三郎 (稀)名古屋貓三郎 貓足
			return [2, 8000, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00164_3598665039.png":
			// スコ鶴 (稀)彥鶴喵  鼓舞
			return [2, 20000, 1, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00213_651535039.png":
			//近衛ニャきひさ (稀)近衛喵久 足止め
			return [2, 4000, 7, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00222_600748627.png":
			//まニャせ道三 (稀)曲喵瀨道三 薬学知識
			return [2, 4500, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00226_1839664877.png":
			//へチカン (稀)茶貫 茶の湯
			return [2, 5500, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00231_229006171.png":
			//宝蔵院ニャンえい  (稀)寶藏院喵榮  十文字槍
			return [2, 4000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00232_968974191.png":
			//伊藤キャットーさい   (稀)喵藤一刀齋 抜刀術  剣術指南
			return [2, 4000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00268_1097488946.png":
			//ニャがお景虎  (稀)喵尾景虎 軍神
			return [2, 8000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00269_2855171654.png":
			//ミケだ晴信  (稀)武田貓信 甲州流兵法
			return [2, 8000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00127_656898606.png":
			//たちばニャ道雪 (稀)立喵道雪 馬廻衆
			return [2, 4500, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00317_1808651646.png":
			//足利ロシアき (稀)足利義喵 伏兵看破  雙人物
			return [2, 8000, 6, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00303_321719062.png":
			//やまニャか鹿介 (稀)山喵鹿介 暗殺術
			return [2, 4000, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00309_3251603204.png":
			//帰蝶ニャン (稀)歸蝶喵  夢見鳥
			return [2, 8000, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00342_734313114.png":
			//がマウ氏郷 (稀)蒲生氏喵  砲術
			return [2, 6000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00383_3418924376.png":
			//ちょうソマリ国親 (稀)長宗貓部國親  野の虎
			return [2, 4000, 8, "card-back card-skill1"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00630_2925798349.png":
			//太田どうカン (稀)太田貓灌  山吹の花
			return [2, 6000, 10, "card-back card-skill2"];
		//////////////極卡/////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00301_3612084272.png":
			//本多ただキャッツ (極)本多貓勝  天下無双
			return [3, 60000, 8, "card-back card-skill3"];
		//////////////譽卡/////////////////////////////////////////////////////////////////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00929_1156850831.png":
			// [X]足利ロシアき (譽)足利義喵  雁字包囲網
			return [6, 6000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_10096_2201601212.png":
			// ミャーもと武蔵 (譽)喵本武藏 櫂の木刀
			return [2, 15000, 5, "card-back card-skill2"];
		//////////////須訓練的寶卡或無法交易的卡////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00445_3652533246.png":
			//織田のぶニャが   (寶)織田信喵 策士
			return [3, 30000, 10, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00550_891556727.png":
			//伊達まシャムね   (譽)咪達政宗 伊達者
			return [3, 30000, 11, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00445_3652533246.png":
			//綾ニャン   (寶)綾喵  雪月花
			return [3, 30000, 8, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00647_3389243176.png":
			//[姫]おミーちの方   (寶)[姬]阿市喵   やすらぎ
			return [3, 30000, 3, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00647_3389243176.png":
			//ニャンの利休   (寶)喵利休   黒楽茶碗
			return [3, 30000, 12, "card-back card-skill2"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00647_3389243176.png":
			//[祝]北のミャンどころ   (寶)北政所喵   かかあ天下
			return [3, 30000, 6, "card-back card-skill2"];
		//////////////////// ----無技能-----////////////////
		case "http://210.140.157.168/img/card/illustration/card_chara_00221_2211631138.png":
			//竜子ニャン (普)龍子喵 無
			return [0, 110, 0, "card-back card-name"];
		case "http://210.140.157.168/img/card/illustration/card_chara_00018_3443392708.png":
			//ミィ直虎 (稀)貓伊直虎 無技能
			return [0, 4000, 0, "card-back card-name"];

		default:
			//
			return [4, 900000, 0, "card-back card-name"];
	}

}

function check_position(positon) {
	switch(positon) {
	case "　米沢城":
		return "detail_c2";
	case "　山形城":
		return "detail_c3";
	case "　小田原城":
		return "detail_c4";
	case "　躑躅ヶ崎館":
		return "detail_c5";
	case "　春日山城":
		return "detail_c6";
	case "　浜松城":
		return "detail_c7";
	case "　清洲城":
		return "detail_c8";
	case "　稲葉山城":
		return "detail_c9";
	case "　飯盛山城":
		return "detail_c10";
	case "　二条御所":
		return "detail_c11";
	case "　吉田郡山城":
		return "detail_c12";
	case "　月山富田城":
		return "detail_c13";
	case "　岡豊城":
		return "detail_c14";
	case "　佐嘉城":
		return "detail_c15";
	case "　府内城":
		return "detail_c16";

	default:
		//內城
		return "detail_c1";
	}
}
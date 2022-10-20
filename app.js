// app.ja

// 인터벌 함수로 시계 돌리기
setInterval(function () {
  // 시간 정보 문서 객체 (DOM) 선택
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("min");
  const sEl = document.getElementById("sec");

  // 현재 시간값 구하기
  let d = new Date(); //현재 시간 가져오기
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();

  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }

  // 시간 표시하기
  hEl.innerText = h;
  mEl.innerText = m;
  sEl.innerText = s;
}, 1000);

// 숙제 : 시간값이 1자리일 경우 앞자리 0을 주기

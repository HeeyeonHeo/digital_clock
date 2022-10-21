// app.ja

// 인터벌 함수로 시계 돌리기
setInterval(function () {
  // 시간 정보 문서 객체 (DOM) 선택
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("min");
  const sEl = document.getElementById("sec");
  const Ampm = document.getElementById("ampm");

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

  if (h >= 13) {
    ampm = "PM";
    h = h - 12;
    if (h < 10) {
      h = "0" + h;
    }
  } else {
    ampm = "AM";
    if (h < 10) {
      h = "0" + h;
    }
  }

  // 시간 표시하기
  Ampm.innerHTML = ampm;
  hEl.innerText = h;
  mEl.innerText = m;
  sEl.innerText = s;
}, 1000);

// 숙제 : 시간값이 1자리일 경우 앞자리 0을 주기

setInterval(function () {
  const yEl = document.getElementById("year");
  const moEl = document.getElementById("month");
  const d1El = document.getElementById("date1");
  const dEl = document.getElementById("day");

  let today = new Date();

  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let date = ("0" + today.getDate()).slice(-2);
  let day = today.getDay();

  if (day == 0) {
    greeting = "일요일";
  } else if (day == 1) {
    greeting = "월요일";
  } else if (day == 2) {
    greeting = "화요일";
  } else if (day == 3) {
    greeting = "수요일";
  } else if (day == 4) {
    greeting = "목요일";
  } else if (day == 5) {
    greeting = "금요일";
  } else if (day == 6) {
    greeting = "토요일";
  } else {
    greeting = "알 수 없는 요일";
  }

  yEl.innerText = year;
  moEl.innerText = month;
  d1El.innerText = date;
  dEl.innerText = `${greeting}`;
}, 1000);

(function () {
  "use strict";
  window.addEventListener("load", function () {
    var canvas = document.getElementById("canvas");

    if (!canvas || !canvas.getContext) {
      return false;
    }

    /********************
      Random Number
    ********************/

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /********************
      Var
    ********************/

    var ctx = canvas.getContext("2d");
    var X = (canvas.width = window.innerWidth);
    var Y = (canvas.height = window.innerHeight);
    var mouseX = null;
    var mouseY = null;
    var shapeNum = 300;
    var shapes = [];
    var style = {
      black: "black",
      white: "white",
      lineWidth: 4,
    };

    /********************
      Animation
    ********************/

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (cb) {
        setTimeout(cb, 17);
      };

    /********************
      Shape
    ********************/

    function Shape(ctx, x, y) {
      this.ctx = ctx;
      this.init(x, y);
    }

    Shape.prototype.init = function (x, y) {
      this.x = x;
      this.y = y;
      this.r = rand(10, 25);
      this.ga = Math.random() * Math.random() * Math.random() * Math.random();
      this.v = {
        x: Math.random(),
        y: -1,
      };
      this.l = rand(0, 20);
      this.sl = this.l;
    };

    Shape.prototype.updateParams = function () {
      var ratio = this.l / this.sl;
      //this.r *= ratio;
      this.l -= 1;
      if (this.l < 0) {
        this.init((X * (Math.random() + Math.random())) / 2, rand(0, Y));
      }
    };

    Shape.prototype.updatePosition = function () {
      this.x += Math.random();
      this.y += -Math.random();
    };

    Shape.prototype.draw = function () {
      var ctx = this.ctx;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = this.ga;
      //ctx.fillStyle = 'rgb(123, 252, 100)';
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };

    Shape.prototype.render = function (i) {
      this.updatePosition();
      this.updateParams();
      this.draw();
    };

    for (var i = 0; i < shapeNum; i++) {
      var s = new Shape(
        ctx,
        (X * (Math.random() + Math.random())) / 2,
        rand(0, Y)
      );
      shapes.push(s);
    }

    /********************
      Render
    ********************/

    function render() {
      ctx.clearRect(0, 0, X, Y);
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].render(i);
      }
      requestAnimationFrame(render);
    }

    render();

    /********************
      Event
    ********************/

    function onResize() {
      X = canvas.width = window.innerWidth;
      Y = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", function () {
      onResize();
    });

    window.addEventListener(
      "mousemove",
      function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      },
      false
    );
  });
})();

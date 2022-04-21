"use strict";
// 音楽が鳴るボタン
const play_btn = document.querySelector('#play-btn');
let sound = new Audio("/music/anpan.mp3");
play_btn.addEventListener('click', play);

function play() {
  sound.play();
} {
  class GameMaster { //ゲームの進行用のクラス
    constructor() {
      this.init(); //初期化
      this._opponent = new Opponent(DEALER_TAG, JANKEN_TYPE) //相手
      //プレイヤー側のじゃんけんのアイコンの表示
      this._player = new Array(3);
      for (let i = 0; i < this._player.length; i++) {
        this._player[i] = document.createElement("img");
        this._player[i].src = "img/" + JANKEN_TYPE[i] + ".jpg";
        PLAYER_TAG.appendChild(this._player[i]);
        this._player[i].addEventListener("click", () => {
          this.click(JANKEN_TYPE[i]); //プレイヤー側のアイコンがクリックされた時に動作するメソッド   
        });
      }
      this._opponent.shuffleImage(); //相手のアイコンをシャッフルする
      // リセットボタン
      RESET_BUTTON.addEventListener("click", () => { //リセットボタンが押された時の処理
        this._opponent.shuffleImage();
        this.init();
        let sound = new Audio("/music/janken.mp3");
        sound.play();
      });
    }
    init() { //初期化
      RESULT.textContent = "";
      RESET_BUTTON.classList.add("hidden");
    }
    click(clickType) { //クリックされた時の処理
      if (!RESET_BUTTON.classList.contains("hidden")) { //何度もクリックできないようにする
        return;
      }
      clearTimeout(this._opponent._timeoutId);
      RESET_BUTTON.classList.remove("hidden");
      this._opponent.result(clickType);
    }
  }
  class Opponent { //相手の手
    constructor() {
      this._img = document.createElement("img");
      this._rdNum = Math.floor(Math.random() * JANKEN_TYPE.length);
      this._img.src = "img/" + JANKEN_TYPE[this._rdNum] + ".jpg";
      DEALER_TAG.appendChild(this._img);
      this._timeoutId;
    }
    shuffleImage() { //ランダムにじゃんけん画像ソースの入れかえ
      this._rdNum = Math.floor(Math.random() * JANKEN_TYPE.length);
      this._img.src = "img/" + JANKEN_TYPE[this._rdNum] + ".jpg";
      this._timeoutId = setTimeout(() => {
        this.shuffleImage();
      }, 20); //50fps
    }
    result(clickType) { //じゃんけんの結果判定
      let _dealerType = JANKEN_TYPE[this._rdNum];
      //クリックすると音が流れる
      let sound = new Audio("/music/pon2.mp3");
      sound.play();
      switch (clickType) {
      case "rock": //グーをクリックした場合
        if (_dealerType === "rock") {
          RESULT.textContent = "あいこ";
        } else if (_dealerType === "scissors") {
          RESULT.textContent = "負け！";
        } else if (_dealerType === "paper") {
          RESULT.textContent = "勝ち";
          setTimeout(() => {
            window.open('http://127.0.0.1:5500/omikuji01.html')
          }, 2000);
        }
        break;
      case "scissors": //チョキをクリックした場合
        if (_dealerType === "rock") {
          RESULT.textContent = "勝ち";
          setTimeout(() => {
            window.open('http://127.0.0.1:5500/omikuji01.html')
          }, 2000);
        } else if (_dealerType === "scissors") {
          RESULT.textContent = "あいこ";
        } else if (_dealerType === "paper") {
          RESULT.textContent = "負け";
        }
        break;
      case "paper": //パーをクリックした場合
        if (_dealerType === "rock") {
          RESULT.textContent = "負け";
        } else if (_dealerType === "scissors") {
          RESULT.textContent = "勝ち！"
          setTimeout(() => {
            window.open('http://127.0.0.1:5500/omikuji01.html')
          }, 2000);
        } else if (_dealerType === "paper") {
          RESULT.textContent = "あいこ";
        }
        break;
      default:
        console.log("タイプなし");
        break;
      }
    }
  }
  const DEALER_TAG = document.querySelector(".dealer"); //タ グの取得
  const PLAYER_TAG = document.querySelector(".player"); //タグの取得
  const RESET_BUTTON = document.getElementById("resetButton"); //タグの取得
  const RESULT = document.querySelector(".result"); //タグの取得
  const JANKEN_TYPE = ["rock", "scissors", "paper"]; //じゃんけんタイプの配列
  const gameMaster = new GameMaster(); //ゲームの進行用のクラスのインスタンスの生成
}
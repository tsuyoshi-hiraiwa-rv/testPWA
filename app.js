// 変数定義
let isPlaying = false
let tapCount, time = 0
const tapBtn    = document.getElementById('js-tapBtn')
const startBtn  = document.getElementById('js-startBtn')
const countText = document.getElementById('js-count')
const timeText  = document.getElementById('js-time')

// ゲームの初期値設定
const setGame = () => {
  tapCount = 0
  time = 10000
  countText.innerText = tapCount
  timeText.innerHTML = time / 1000
}
setGame()

// タップした時にカウントを増やす
tapBtn.addEventListener('click', () => {
  if (!isPlaying) return false
  tapCount++
  countText.innerText = tapCount
})

// STARTボタンを押してゲームをスタートさせる
startBtn.addEventListener('click', () => {
  setGame()
  isPlaying = true
  tapBtn.disabled = false
  startBtn.style.display = 'none'

  const timer = setInterval( () => {
    time -= 10
    timeText.innerHTML = (time / 1000).toFixed(2)

    if (time === 0) {
      clearInterval(timer)
      isPlaying = false
      startBtn.style.display = 'inline-block'
      startBtn.innerText = 'もう一回'
    }
  }, 10)
})


//*****************************************************************************************
//  インストール
//*****************************************************************************************
//バナーの代わりに表示するボタンを登録する
registerInstallAppEvent(document.getElementById("InstallBtn"));
let installBtn = document.getElementById("InstallBtn");

//バナー表示をキャンセルし、代わりに表示するDOM要素を登録する関数
//引数１：イベントを登録するHTMLElement
function registerInstallAppEvent(elem){
  //インストールバナー表示条件満足時のイベントを乗っ取る
  window.addEventListener('beforeinstallprompt', function(event){
    console.log("beforeinstallprompt: ", event);
    event.preventDefault(); //バナー表示をキャンセル
    elem.promptEvent = event; //eventを保持しておく
    elem.style.display = "block"; //要素を表示する
    return false;
  });
  //インストール
  function installApp() {
    console.log("インストールボタンクリック");
    installBtn.style.display = "none";
    installBtn.promptEvent = null; //一度しか使えないため後始末
  }//end installApp
  //ダイアログ表示を行うイベントを追加
  elem.addEventListener("click", installApp);
}//end registerInstallAppEvent

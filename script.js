const config = {
    target: document.getElementById("target"),
    initialPage: document.getElementById("initial-form"),
    name: document.getElementById("player-name"),
    gamePage: document.getElementById("game-page"),
    startBtn: document.getElementById("form"),
    dot: `
            <!-- ドットナビゲーション -->
            <ul class="mt-2 mb-0 pb-0">
                <li><button class="dot">0</button></li>
                <li><button class="dot">1</button></li>
                <li><button class="dot">2</button></li>
                <li><button class="dot">3</button></li>
            </ul>
        `,
}

document.getElementById("startBtn").addEventListener("click", function(){
    playStart();
})

class GameItem {
    constructor(name, price, max, ownedAmount, effect, imgUrl){
        this.name = name;
        this.price = price;
        this.max = max;
        this.ownedAmount = ownedAmount;
        this.effect = effect;
        this.imgUrl = imgUrl;
    }
}

class Player {
    constructor(name, age, elapseTime, cash){
        this.name = name;
        this.age = age;
        this.elapseTime = elapseTime;
        this.cash = cash

        this.assets = [
            new GameItem("Flip machine", 15000, 500, 1, 25, "/img/burger.png"),
            new GameItem("ETF Stock", 300000, Infinity, 0, 0.001, "/img/stock.png"),
            new GameItem("ETF Bonds", 300000, Infinity, 0, 0.0007, "/img/bonds.png"),
            new GameItem("Lemonade Stand", 30000, 1000, 0, 30, "/img/lemonade.png"),
            new GameItem("Ice Cream Truck", 100000, 500, 0, 120, "/img/icecream.png"),
            new GameItem("House", 20000000, 100, 0, 32000, "/img/house.jpg"),
            new GameItem("Town House", 40000000, 100, 0, 64000, "/img/townHouse.jpg"),
            new GameItem("Mansion", 250000000, 20, 0, 50000, "/img/mansion.jpg"),
            new GameItem("Industrial Space", 1000000000, 10, 0, 2200000, "/img/industrialSpace.jpg"),
            new GameItem("Hotel Skyscraper", 10000000000, 5, 0, 25000000, "/img/hotel.jpg"),
            new GameItem("Bullet-Speed Sky Railway", 10000000000000, 1, 0, 30000000000, "/img/bullet-train-railway.jpg")
        ]
    }

    addCash(){
        let lemonade = this.assets[3].ownedAmount * this.assets[3].effect;
        let ice = this.assets[4].ownedAmount * this.assets[4].effect;
        let house = this.assets[5].ownedAmount * this.assets[5].effect;
        let town = this.assets[6].ownedAmount * this.assets[6].effect;
        let mansion = this.assets[7].ownedAmount * this.assets[7].effect;
        let industrial = this.assets[8].ownedAmount * this.assets[8].effect;
        let hotel = this.assets[9].ownedAmount * this.assets[9].effect;
        let railway = this.assets[10].ownedAmount * this.assets[10].effect;
        let bonds = Math.floor(this.assets[1].ownedAmount * this.assets[1].effect);
        let stocks = Math.floor(this.assets[2].ownedAmount * this.assets[2].effect);

        this.cash += lemonade + ice + house + town + mansion + industrial + hotel + railway + bonds + stocks;
    }
}

// 最初にgameを開始するための関数
function playStart(){
    config["player"] = new Player(
        config.name.value,
        20,
        1,
        50000,
    );
    if (config.player.name == ""){
        config.player.name = "steven"
    }
    config.initialPage.classList.add("d-none");
    config.gamePage.append(createPlayPage());
    timeElapse();
    // return player
}

// 時間経過による変化を起こすための関数経過時間の追加それによるcashの増加及び年齢の増加
function timeElapse(){
    setInterval(function(){
        config.player.elapseTime += 1;
        config.player.age = Math.floor(20 + config.player.elapseTime / 365);
        config.player.addCash();
        updateDisplayedStatus();
    }, 1000)
}

// 画面に表示されているプレイヤーステイタスを更新する関数
function updateDisplayedStatus(){
    // config.gamePage.querySelector(".name").innerHTML = player.name;
    config.gamePage.querySelector(".age").innerHTML = config.player.age.toLocaleString() + " yrs ord";
    config.gamePage.querySelector(".time").innerHTML = config.player.elapseTime.toLocaleString() + " days";
    config.gamePage.querySelector(".cash").innerHTML = "¥" + config.player.cash.toLocaleString();
}

// gameのplayページを作る関数
function createPlayPage(){
    // gameページのリセット
    config.initialPage.classList.add("d-none");
    config.gamePage.classList.remove(...config.gamePage.classList);

    // gameページの初期設定
    config.gamePage.classList.add("col-12", "p-4", "h-100", "d-flex");
    let container = document.createElement("div");
    container.classList.add("col-12", "d-flex", "h-100");

    // gameページ本文
    container.innerHTML =
    `
        <!-- 左側 -->
        <div class="col-6 bg-dark p-3 text-center h-100">
            <div class="text-white col-12 bg-secondary col-12 px-3 py-1 mb-5">
                <p class="rem2">Burgers</p>
                <p class="rem1p5 burger-num">1</p>
            </div>
            <img id="burger" src="/img/burger.png" class="img-size m-4 pb-5 burger">
        </div>

        <!-- 右側 -->
        <div class="col-6 text-white h-100 pl-3">
            <div class="rem1p3 bg-dark col-12 text-center p-1 mb-3 d-flex flex-wrap">
                <div class="col-6 p-1 my-1">
                    <p class="bg-secondary p-2 name">${config.player.name}</p>
                </div>
                <div class="col-6 p-1 my-1">
                    <p class="bg-secondary p-2 age">${config.player.age} yrs ord</p>
                </div>
                <div class="col-6 p-1 my-1">
                    <p class="bg-secondary p-2 time">${config.player.elapseTime} days</p>
                </div>
                <div class="col-6 p-1 my-1">
                    <p class="bg-secondary p-2 cash">¥${config.player.cash}</p>
                </div>
            </div>

            <!-- 真ん中箱 -->
            <div class="bg-dark col-12 py-3 px-2 h-65 center-box">
            </div>

            <!-- save関連 -->
            <div class="mt-2 pt-2 col-12 d-flex justify-content-end">
                <div class="mr-3 load-box d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-arrow-rotate-right fa-4x"></i>
                </div>
                <div class="ml-3 save-box d-flex align-items-center justify-content-center">
                    <i class="fa-regular fa-floppy-disk fa-4x"></i>
                </div>
            </div>
        </div>
    `

    // 右中央のパネル作る
    const center = container.querySelector(".center-box");
    center.append(createDisplay(0));

    // バーガーにクリックで稼ぐ機能を追加
    const burger = container.querySelector(".burger");
    burger.addEventListener("click", function(){
        config.player.cash += config.player.assets[0].ownedAmount * config.player.assets[0].effect;
        updateDisplayedStatus();
    })

    //ドットナビゲーションの現在の場所（何ページ目にいるか）
    let dotNum = container.querySelector(".is-active").innerHTML;

    //セレクタの機能追加クリックにより購入ページに飛ぶ
    selectWork(0, center);

    // ドットリストをクリックするとセレクタが変更される
    let dotList = container.querySelectorAll(".dot");
    for(let i = 0; i < dotList.length; i++){
        dotList[i].addEventListener("click", function(){
            changeCenterPanel(i);
        })
    }

    let load = container.querySelector(".load-box");
    let save = container.querySelector(".save-box");
    load.addEventListener("click", function(){
        if(localStorage.getItem("data") === null){
            alert("保存されていません")
            return
        }
        let json_data = localStorage.getItem("data");
        let obj = JSON.parse(json_data);
        config.player.name = obj.name;
        config.player.assets = obj.assets;
        config.player.age = obj.age;
        config.player.cash = obj.cash;
        config.player.elapseTime = obj.elapseTime;
        alert("ロードしました");
    })

    save.addEventListener("click", function(){
        let json_data = JSON.stringify(config.player);
        localStorage.setItem("data", json_data);
        alert("保存しました");
        json_data = "";
    })

    return container;
}

// 右中央の箱全体を作る関数
function createDisplay(page){
    let container = document.createElement("div");
    container.classList.add("w-100", "d-flex", "justify-content-center", "align-items-center", "flex-column", "h-100", "dis");
    let start = page*3;
    let end = (page+1)*3;
    // 選択できるアイテムのセレクトを縦に三つ並べる処理
    for(let i = start; i < end && i < config.player.assets.length; i++){
        container.append(createSelectBox(i));
    }

    //ドットナビゲーション
    container.innerHTML += config.dot;

    const dotList = container.querySelectorAll(".dot");
    dotList[page].classList.add("is-active");

    return container;
}

// 右中央の個別の選択画面を作る関数
function createSelectBox(index){
    // 各アイテムの箱を作るための関数
    let item = config.player.assets[index]
    let unit = index == 0?"click": "sec";
    let addEffect = item.effect;
    if(index == 1 || index == 2) addEffect = item.effect*item.price;
    let container = document.createElement("div");
    container.classList.add("h-30", "mb-2", "py-1", "px-0", "w-100", "bg-secondary", "d-flex", "select-box")

    container.innerHTML +=
    `
        <img src="${item.imgUrl}" class="pl-0 ml-1 col-3 img">
        <div class="col-7 text-left d-flex align-items-center flex-wrap px-0">
            <h3 class="col-12 text-white">${item.name}</h3>
            <div class="w-100 d-flex justify-content-between px-0">
                <p class="rem1p02 text-white col-6">¥${item.price.toLocaleString()}</p>
                <p class="pl-0 text-center rem1p02 text-green col-6">+¥${addEffect.toLocaleString()} / ${unit}</p>
            </div>
        </div>
        <div class="col-2 text-center text-white d-flex align-items-center justify-content-center">
            <p class="rem2">${item.ownedAmount}</p>
        </div>
    `
    return container;
}

// 右真ん中のパネルをドットナビゲーションに従って変更する関数
function changeCenterPanel(page){
    const center = config.gamePage.querySelector(".dis");
    center.innerHTML = "";
    let start = page*3;
    let end = (page+1)*3;
    for(let i = start; i < end && i < config.player.assets.length; i++){
        center.append(createSelectBox(i));
    }

    //ドットナビゲーション
    center.innerHTML += config.dot;

    const dotList = center.querySelectorAll(".dot");
    dotList[page].classList.add("is-active");

    for(let i = 0; i < dotList.length; i++){
        dotList[i].addEventListener("click", function(){
            changeCenterPanel(i);
        })
    }

    //セレクタの機能追加
    selectWork(page, config.gamePage.querySelector(".center-box"));
}

// 購入画面を作る関数
function createPurchase(index){
    // 購入するアイテムの格納
    const item = config.player.assets[index];
    //購入項目の単位
    let unit = "second";
    if(index == 0) unit = "click";

    //アイテムの効果を格納
    let addNumber = item.effect;//effectが存在しないらしいは？
    if(index == 1 || index == 2) addNumber = item.effect * item.price;


    let container = document.createElement("div");
    container.classList.add("w-100", "bg-secondary", "d-flex", "justify-content-center", "align-items-center", "flex-wrap", "py-3", "h-a");
    container.innerHTML =
    `
        <div class="col-12 text-white d-flex h-40">
            <div class="col-8 text-left">
                <h3>${item.name}</h3>
                <p>max purchases: ${item.max}</p>
                <p>Price: ¥${item.price.toLocaleString()}</p>
                <p>Get ${addNumber} extra yen per ${unit}</p>
            </div>
            <img src="${item.imgUrl}" class="col-4 h-100">
        </div>
        <div class="col-12 text-white mt-3 h-30">
            <h3 class="col-12">How Many would you like to purchase?</h3>
            <div class="col-12">
                <input type="number" class="col-12 form-control text-right quant" placeholder="1" value="1" min="1">
            </div>
            <p class="text-right rem1p3 mt-2 mx-3 total">Total : ¥${item.price.toLocaleString()}</p>
        </div>
        <div class="col-12 d-flex justify-content-between align-items-center h-30 pb-1">
            <div class="col-6">
                <button type="submit" class="bg-white btn btn-outline-primary btn-block back-btn">Go Back</button>
            </div>
            <div class="col-6">
                <button type="submit" class="btn btn-primary btn-block pur-btn">Purchase</button>
            </div>
        </div>
    `

    let page = 0;
    //pageを求める処理
    for (let i = 1; i <= 4; i++){
        if (index < i * 3){
            page = i-1;
            break;
        }
    }
    //戻るボタンの効果作成 何もせずに戻る
    container.querySelector(".back-btn").addEventListener("click", function(){
        purchaseAndBackBtn(page);
    })

    //購入ボタン 入力した数値を元に購入処理が行われる
    container.querySelector(".pur-btn").addEventListener("click", function(){
        purchaseItem(item, page);
    })
    return container;
}

//戻るボタンの動作
function purchaseAndBackBtn(page){
    let center = config.gamePage.querySelector(".center-box");
    //購入画面の消去
    center.innerHTML = "";

    //選択画面のappend
    center.append(createDisplay(page))

    changeCenterPanel(page);

    //選択画面の機能追加
    selectWork(page, center);
}


//購入ボタンの動作
function purchaseItem(item, page){
    let quantity = parseInt(config.gamePage.querySelector(".quant").value);

    //現在のcashと比較して購入可能かを判定する、そのうえで不可能ならばポップアップで警告する
    if(canBuy(item, quantity) == false){
        alert("cashが不足しています。購入個数を入れなおしてください。");
        return;
    }

    changeItem(item, quantity);
    purchaseAndBackBtn(page);
    if (item.name == "Flip machine"){
        config.gamePage.querySelector(".burger-num").innerHTML = item.ownedAmount
    }
}

//現在のcashと購入品×一つ当たりのcostを比較して購入できるか返す
function canBuy(item, quantity){
    if (calculator(item, quantity) > config.player.cash) return false;
    return true;
}

//アイテムの所持数を変更する
function changeItem(item, addNumber){
    //購入する商品の値段が現在所持している現金より多いかの比較多い場合は購入個数が減る
    if(calculator(item, addNumber) > config.player.cash){
        //stockだけは計算が異なる
        if (item.name == "ETF Stock"){
            for(let i = addNumber; i >= 0; i--){
                if (calculator(item, i) <= config.player.cash){
                    addNumber = i;
                    break;
                }
            }
        }
        else addNumber = Math.floor((config.player.cash/item.price));
    }

    //アイテムの所持上限に達しているときの処理
    let cost = 0;
    if(item.ownedAmount + addNumber >= item.max){
        cost = calculator(item, item.max - item.ownedAmount);
        item.ownedAmount = item.max;
    }
    //所持上限に達していないときの処理
    else{
        cost = calculator(item, addNumber);
        item.ownedAmount = item.ownedAmount+addNumber;
    }
    config.player.cash -= cost;
}

//セレクタの機能追加をする関数
function selectWork(page, parent){
    const selectList = parent.querySelectorAll(".select-box");

    for(let i = 0; i < selectList.length; i++){
        selectList[i].addEventListener("click", function(){
            parent.innerHTML = "";
            parent.append(createPurchase(i+page*3));
            let quant = parent.querySelector(".quant");
            let total = parent.querySelector(".total");
            quant.addEventListener("change", function(){
                total.innerHTML = `Total : ¥${(calculator(config.player.assets[i+page*3], quant.value)).toLocaleString()}`
            })
        })
    }
}

function calculator(item, quantity){
    let res = 0;
    if (item.name == "ETF Stock"){
        res += item.price;
        res += item.price*Math.pow(1.1, quantity-1);
    }
    else{
        res = item.price*quantity;
    }
    return res;
}
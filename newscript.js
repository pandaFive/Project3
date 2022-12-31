const config = {
    target: document.getElementById("target"),
    initialPage: document.getElementById("initial-form"),
    name: document.getElementById("player-name"),
    gamePage: document.getElementById("game-page"),
    startBtn: document.getElementById("startBtn"),
}


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
    constructor(name, age, elapseTime, cash, assets = []){
        this.name = name;
        this.age = age;
        this.elapseTime = elapseTime;
        this.cash = cash

        // TODO:mapが良いかarrが良いか？順番がある点ではarrが優れる
        // this.assets = {
        //     FlipMachine: new GameItem("Flip machine", 15000, 500, 1, 25, "https://2.bp.blogspot.com/-ydmVz8cQgiw/WGnPS4aBHVI/AAAAAAABA3M/baZ-lRZ1ViIRIfaQx1sjdSLgXPPZTGZKwCLcB/s800/hamburger_blt_burger.png"),
        //     ETFStock: new GameItem("ETF Stock", 300000, Infinity, 0, 0.001, "https://3.bp.blogspot.com/-ZRt41eX9fdk/VA7mAjFYt4I/AAAAAAAAmJc/yDevfyVymGc/s800/money_stock.png"),
        //     ETFBonds: new GameItem("ETF Bonds", 300000, Infinity, 0, 0.0007, "https://1.bp.blogspot.com/-SlXHptXp-Hg/U8Xkf0VeAVI/AAAAAAAAiyA/n9d4fdHDmJk/s800/money_saiken.png"),
        //     LemonadeStand: new GameItem("Lemonade Stand", 30000, 1000, 0, 30, "https://1.bp.blogspot.com/-tzP9gGYpFP8/XVjgHkZ40UI/AAAAAAABUMU/zQeTzUi4MjMRSXxZBI3cOqDYXwiAQhe1wCLcBGAs/s1600/drink_lemonade.png"),
        //     IceCreamTruck: new GameItem("Ice Cream Truck", 100000, 500, 0, 120, "https://2.bp.blogspot.com/-IDJ-PAml6xI/UvTd5BRmybI/AAAAAAAAdf8/qkKtOM235yw/s800/job_icecream_ya.png"),
        //     House: new GameItem("House", 20000000, 100, 0, 32000, "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_960_720.jpg"),
        //     TownHouse: new GameItem("Town House", 40000000, 100, 0, 64000, "https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_960_720.jpg"),
        //     Mansion: new GameItem("Mansion", 250000000, 20, 0, 50000, "https://cdn.pixabay.com/photo/2018/05/26/14/46/manor-house-3431460_960_720.jpg"),
        //     IndustrialSpace: new GameItem("Industrial Space", 1000000000, 10, 0, 2200000, "https://cdn.pixabay.com/photo/2018/04/05/20/14/travel-3294009_960_720.jpg"),
        //     HotelSkyscraper: new GameItem("Hotel Skyscraper", 10000000000, 5, 0, 25000000, "https://cdn.pixabay.com/photo/2012/02/21/07/27/al-abrar-mecca-15081_960_720.jpg"),
        //     BulletSpeedSkyRailway: new GameItem("Bullet-Speed Sky Railway", 10000000000000, 1, 0, 30000000000, "https://cdn.pixabay.com/photo/2018/11/30/03/35/bullet-train-3846965_960_720.jpg")
        // }
        this.assets = [
            new GameItem("Flip machine", 15000, 500, 1, 25, "https://2.bp.blogspot.com/-ydmVz8cQgiw/WGnPS4aBHVI/AAAAAAABA3M/baZ-lRZ1ViIRIfaQx1sjdSLgXPPZTGZKwCLcB/s800/hamburger_blt_burger.png"),
            new GameItem("ETF Stock", 300000, Infinity, 0, 0.001, "https://3.bp.blogspot.com/-ZRt41eX9fdk/VA7mAjFYt4I/AAAAAAAAmJc/yDevfyVymGc/s800/money_stock.png"),
            new GameItem("ETF Bonds", 300000, Infinity, 0, 0.0007, "https://1.bp.blogspot.com/-SlXHptXp-Hg/U8Xkf0VeAVI/AAAAAAAAiyA/n9d4fdHDmJk/s800/money_saiken.png"),
            new GameItem("Lemonade Stand", 30000, 1000, 0, 30, "https://1.bp.blogspot.com/-tzP9gGYpFP8/XVjgHkZ40UI/AAAAAAABUMU/zQeTzUi4MjMRSXxZBI3cOqDYXwiAQhe1wCLcBGAs/s1600/drink_lemonade.png"),
            new GameItem("Ice Cream Truck", 100000, 500, 0, 120, "https://2.bp.blogspot.com/-IDJ-PAml6xI/UvTd5BRmybI/AAAAAAAAdf8/qkKtOM235yw/s800/job_icecream_ya.png"),
            new GameItem("House", 20000000, 100, 0, 32000, "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_960_720.jpg"),
            new GameItem("Town House", 40000000, 100, 0, 64000, "https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_960_720.jpg"),
            new GameItem("Mansion", 250000000, 20, 0, 50000, "https://cdn.pixabay.com/photo/2018/05/26/14/46/manor-house-3431460_960_720.jpg"),
            new GameItem("Industrial Space", 1000000000, 10, 0, 2200000, "https://cdn.pixabay.com/photo/2018/04/05/20/14/travel-3294009_960_720.jpg"),
            new GameItem("Hotel Skyscraper", 10000000000, 5, 0, 25000000, "https://cdn.pixabay.com/photo/2012/02/21/07/27/al-abrar-mecca-15081_960_720.jpg"),
            new GameItem("Bullet-Speed Sky Railway", 10000000000000, 1, 0, 30000000000, "https://cdn.pixabay.com/photo/2018/11/30/03/35/bullet-train-3846965_960_720.jpg")
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
    let player = new Player(
        config.name.value,
        20,
        1,
        50000,
    );
    console.log(player.assets[0].name);
    config.initialPage.classList.add("d-none");
    config.gamePage.append(createPlayPage(player));
    timeElapse(player);
    // return player
}

// 時間経過による変化を起こすための関数
function timeElapse(player){
    setInterval(function(){
        player.elapseTime += 1;
        player.age = Math.floor(20 + player.elapseTime / 365);
        player.addCash();
        updateDisplayedStatus(player); // 画面実装してから有効化必須
        console.log(player.cash);
    }, 1000)
}

// 画面に表示されているプレイヤーステイタスを更新する関する
function updateDisplayedStatus(player){
    // config.gamePage.querySelector(".name").innerHTML = player.name;
    config.gamePage.querySelector(".age").innerHTML = player.age.toLocaleString() + " yrs ord";
    config.gamePage.querySelector(".time").innerHTML = player.elapseTime.toLocaleString() + " days";
    config.gamePage.querySelector(".cash").innerHTML = "¥" + player.cash.toLocaleString();
}

// gameのplayページを作る関数
function createPlayPage(player){
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
            <img id="burger" src="https://2.bp.blogspot.com/-ydmVz8cQgiw/WGnPS4aBHVI/AAAAAAABA3M/baZ-lRZ1ViIRIfaQx1sjdSLgXPPZTGZKwCLcB/s800/hamburger_blt_burger.png" class="img-size m-4 pb-5 burger">
        </div>

        <!-- 右側 -->
        <div class="col-6 text-white h-100 pl-3">
            <div class="rem1p3 bg-dark col-12 text-center p-1 mb-3 d-flex flex-wrap">
                <div class="col-6 p-1 my-1">
                    <p class="bg-secondary p-2 name">${player.name}</p>
                </div>
                <div class="col-6 p-1 my-1">
                    <p class="bg-secondary p-2 age">${player.age} yrs ord</p>
                </div>
                <div class="col-6 p-1 my-1">
                    <p class="bg-secondary p-2 time">${player.elapseTime} days</p>
                </div>
                <div class="col-6 p-1 my-1">
                    <p class="bg-secondary p-2 cash">¥${player.cash}</p>
                </div>
            </div>

            <!-- 真ん中箱 -->
            <div class="bg-dark col-12 py-3 px-2 h-65 center-box">
            </div>

            <!-- save関連 -->
            <div class="mt-2 pt-2 col-12 d-flex justify-content-end">
                <div class="mr-3 save-box"></div>
                <div class="ml-3 save-box"></div>
            </div>
        </div>
    `

    // 左中央のパネル作る
    const center = container.querySelector(".center-box");
    center.append(createDisplay(1, player));

    // バーガーにクリックで稼ぐ機能を追加
    const burger = container.querySelector(".burger");
    burger.addEventListener("click", function(){
        player.cash += player.assets[0].ownedAmount * player.assets[0].effect;
        updateDisplayedStatus(player);
    })

    // displayBox = 左中央のパネル
    // selectList = 左中央パネルの個々の項目
    const displayBox = container.querySelector(".dis");
    //個別の選択肢
    const selectList = container.querySelectorAll(".select-box");
    //ドットナビゲーションの現在の場所（何ページ目にいるか）
    let dotNum = container.querySelector(".is-active").innerHTML;
    for(let i = dotNum*3; i < (dotNum+1)*3 && i < player.assets.length; i++){
        selectList[i].addEventListener("click", function(){
            displayBox.classList.add("d-none");
            displayBox.classList.remove("d-flex");
            // index だけでいいんじゃね？
            center.append(createPurchase(i, player));

        })
    }


    return container;
}

// ページ切り替えの方法は考えなければならない
// 左中央の箱全体を作る関数
function createDisplay(page, player){
    let container = document.createElement("div");
    container.classList.add("w-100", "d-flex", "justify-content-center", "align-items-center", "flex-column", "h-100", "dis");
    let start = page*3-3;
    let end = page*3;
    console.log(player.name);
    // 選択できるアイテムのセレクトを縦に三つ並べる処理
    for(let i = start; i < end && i < player.assets.length; i++){
        console.log(i);
        container.append(createSelectBox(i, player));
    }

    container.innerHTML +=
    `
        <!-- ドットナビゲーション -->
        <ul class="mt-2 mb-0 pb-0">
            <li><button class="dot">0</button></li>
            <li><button class="dot">1</button></li>
            <li><button class="dot">2</button></li>
            <li><button class="dot">3</button></li>
        </ul>
    `
    const dotList = container.querySelectorAll(".dot");
    dotList[page-1].classList.add("is-active");

    // ドットリストに機能を追加する処理
    for(let i = 0; i < dotList.length; i++){
        dotList[i].addEventListener("click", function(){
            changeCenterPanel(i+1, player);
        })
    }

    return container;
}

// 左中央の個別の選択画面を作る関数
function createSelectBox(index, player){
    // 各アイテムの箱を作るための関数
    console.log(index);
    let item = player.assets[index]
    let unit = "click"? index == 0: "sec";
    console.log(item);
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

// 左真ん中のパネルを選択画面に戻す関数
function changeCenterPanel(page, player){
    const center = config.gamePage.querySelector("dis");
    center.querySelector(".dis").innerHTML = "";
    center.append(createSelectBox(page, player));

    center.innerHTML +=
    `
        <!-- ドットナビゲーション -->
        <ul class="mt-2 mb-0 pb-0">
            <li><button class="dot">1</button></li>
            <li><button class="dot">2</button></li>
            <li><button class="dot">3</button></li>
            <li><button class="dot">4</button></li>
        </ul>
    `
    const dotList = center.querySelectorAll(".dot");
    dotList[page].classList.add("is-active");

    for(let i = 0; i < dotList.length; i++){
        dotList[i].addEventListener("click", function(){
            changeCenterPanel(i+1, player);
        })
    }
}

// 購入画面を作る関数
function createPurchase(index, player){
    //購入品の格納
    const item = player.assets[index];

    //購入が目の単位
    let unit = "second";
    if(index == 0) unit = "click";

    //アイテムの効果を格納
    let addNumber = item.effect;
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
                <input type="number" class="col-12 form-control text-right quant" placeholder="0">
            </div>
            <p class="text-right rem1p3 mt-2 mx-3">Total : ¥${item.price.toLocaleString()}</p>
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

    // 左側中央のパネル
    let displayWindow = config.gamePage.querySelector(".dis");

    //戻るボタンの効果作成 何もせずに戻る
    container.querySelector(".back-btn").addEventListener("click", function(){
        returnDis(container, displayWindow);
    })

    //購入ボタン 入力した数値を元に購入処理が行われる
    container.querySelector(".pur-btn").addEventListener("click", function(){
        purchaseItem(item, container, displayWindow, player);
    })

    return container;
}

//戻るボタンの動作
function returnDis(curr, backPage){
    displayNone(curr);
    displayBlock(backPage);
    curr.innerHTML = ""
    backPage.classList.add("d-flex");
}


//購入ボタンの動作
//TODO:indexとplayerがあれば処理を実装できそう、つまりこんなに引数はいらないのでは？
function purchaseItem(item, curr, backPage, player){
    let quantity = parseInt(curr.querySelector(".quant").value);

    //現在のcashと比較して購入可能かを判定する、そのうえで不可能ならばポップアップで警告する
    if(canBuy(item, quantity, player) == false){
        alert("cashが不足しています。購入個数を入れなおしてください。");
        return;
    }

    cost = changeItem(item, quantity, player);
    player.assets -= cost;
    returnDis(curr, backPage);
}

function canBuy(item, quantity, person){
    if (item.price*quantity > person.cash) false;
    return true;
}
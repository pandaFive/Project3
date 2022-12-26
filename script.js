// page作成変更関連を作り直す色々ぐちゃぐちゃになっている
// どうにも整理しずらいデバッグがくそ面倒
// 目的ごとにしっかり分ける
// 関数を管理する


function displayNone(ele){
    ele.classList.remove("d-block", "d-flex");
    ele.classList.add("d-none");
}

function displayBlock(ele){
    ele.classList.remove("d-none");
}

const config = {
    target: document.getElementById("target"),
    initialPage: document.getElementById("initial-form"),
    name: document.getElementById("player-name"),
    gamePage: document.getElementById("game-page"),
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
    constructor(name, age, elapseTime, assets){
        this.name = name;
        this.age = age;
        this.elapseTime = elapseTime;
        this.assets = assets;
    }
}

// effectについては用検討する必要がある。取り敢えず今は種別を区別せず数字を格納する。
let items = {
    FlipMachine: new GameItem("Flip machine", 15000, 500, 1, 25, "https://2.bp.blogspot.com/-ydmVz8cQgiw/WGnPS4aBHVI/AAAAAAABA3M/baZ-lRZ1ViIRIfaQx1sjdSLgXPPZTGZKwCLcB/s800/hamburger_blt_burger.png"),
    ETFStock: new GameItem("ETF Stock", 300000, Infinity, 0, 0.001, "https://3.bp.blogspot.com/-ZRt41eX9fdk/VA7mAjFYt4I/AAAAAAAAmJc/yDevfyVymGc/s800/money_stock.png"),
    ETFBonds: new GameItem("ETF Bonds", 300000, Infinity, 0, 0.0007, "https://1.bp.blogspot.com/-SlXHptXp-Hg/U8Xkf0VeAVI/AAAAAAAAiyA/n9d4fdHDmJk/s800/money_saiken.png"),
    LemonadeStand: new GameItem("Lemonade Stand", 30000, 1000, 0, 30, "https://1.bp.blogspot.com/-tzP9gGYpFP8/XVjgHkZ40UI/AAAAAAABUMU/zQeTzUi4MjMRSXxZBI3cOqDYXwiAQhe1wCLcBGAs/s1600/drink_lemonade.png"),
    IceCreamTruck: new GameItem("Ice Cream Truck", 100000, 500, 0, 120, "https://2.bp.blogspot.com/-IDJ-PAml6xI/UvTd5BRmybI/AAAAAAAAdf8/qkKtOM235yw/s800/job_icecream_ya.png"),
    House: new GameItem("House", 20000000, 100, 0, 32000, "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_960_720.jpg"),
    TownHouse: new GameItem("Town House", 40000000, 100, 0, 64000, "https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_960_720.jpg"),
    Mansion: new GameItem("Mansion", 250000000, 20, 0, 50000, "https://cdn.pixabay.com/photo/2018/05/26/14/46/manor-house-3431460_960_720.jpg"),
    IndustrialSpace: new GameItem("Industrial Space", 1000000000, 10, 0, 2200000, "https://cdn.pixabay.com/photo/2018/04/05/20/14/travel-3294009_960_720.jpg"),
    HotelSkyscraper: new GameItem("Hotel Skyscraper", 10000000000, 5, 0, 25000000, "https://cdn.pixabay.com/photo/2012/02/21/07/27/al-abrar-mecca-15081_960_720.jpg"),
    BulletSpeedSkyRailway: new GameItem("Bullet-Speed Sky Railway", 10000000000000, 1, 0, 30000000000, "https://cdn.pixabay.com/photo/2018/11/30/03/35/bullet-train-3846965_960_720.jpg")
}


// itemsに変更を加えるための関数
function changeItem(item, addNumber, player){
    if(item.price*addNumber > player.assets){
        addNumber = Math.floor((player.assets/item.price));
    }
    if(item.ownedAmount + addNumber >= item.max){
        let cost = item.price * item.max - item.ownedAmount;
        item.ownedAmount = item.max;
        return cost;
    }
    else{
        let cost = item.price * addNumber;
        item.ownedAmount = item.ownedAmount+addNumber;
        return cost;
    }
}

let display = [
    [items.FlipMachine, items.ETFStock, items.ETFBonds],
    [items.LemonadeStand, items.IceCreamTruck, items.House],
    [items.TownHouse, items.Mansion, items.IndustrialSpace],
    [items.HotelSkyscraper, items.BulletSpeedSkyRailway]
]

// game画面の作成をしなければならない
function initializedPlayerStatus(){
    let name = config.name;
    let status = new Player(
        name.value,
        20,
        1,
        50000,
    );
    
    config.initialPage.classList.add("d-none");
    config.gamePage.append(createSecondPage(status));
    timeElapse(status);
}

function timeElapse(player){
    setInterval(function(){
        player.elapseTime += 1;
        player.age = Math.floor(20 + player.elapseTime / 365);
        addAssets(player);
        updateDisplayedStatus(player);
    }, 1000)
}

function addAssets(player){
    let lemonade = items.LemonadeStand.ownedAmount * items.LemonadeStand.effect;
    let ice = items.IceCreamTruck.ownedAmount * items.IceCreamTruck.effect;
    let house = items.House.ownedAmount * items.House.effect;
    let town = items.TownHouse.ownedAmount * items.TownHouse.effect;
    let mansion = items.Mansion.ownedAmount * items.Mansion.effect;
    let industrial = items.IndustrialSpace.ownedAmount * items.IndustrialSpace.effect;
    let hotel = items.HotelSkyscraper.ownedAmount * items.HotelSkyscraper.effect;
    let railway = items.BulletSpeedSkyRailway.ownedAmount * items.BulletSpeedSkyRailway.effect;
    let bonds = Math.floor(items.ETFBonds.ownedAmount * items.ETFBonds.effect);
    let stocks = Math.floor(items.ETFStock.ownedAmount * items.ETFStock.effect);

    player.assets += lemonade + ice + house + town + mansion + industrial + hotel + railway + bonds + stocks;
}

function updateDisplayedStatus(player){
    config.gamePage.querySelector(".age").innerHTML = player.age.toLocaleString() + " yrs ord";
    config.gamePage.querySelector(".time").innerHTML = player.elapseTime.toLocaleString() + " days";
    config.gamePage.querySelector(".assets").innerHTML = "¥" + player.assets.toLocaleString();
}

function createSecondPage(player){
    config.gamePage.classList.add("col-12", "p-4", "h-100", "d-flex");
    let container = document.createElement("div");
    container.classList.add("col-12", "d-flex", "h-100");

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
                    <p class="bg-secondary p-2 assets">¥${player.assets}</p>
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

    const center = container.querySelector(".center-box");
    center.append(createDisplay(0));

    const burger = container.querySelector(".burger");

    burger.addEventListener("click", function(){
        player.assets += items.FlipMachine.ownedAmount * items.FlipMachine.effect;
        updateDisplayedStatus(player);
    })

    const displayBox = container.querySelector(".dis");
    const selectList = container.querySelectorAll(".select-box");
    for(let i = 0; i < selectList.length; i++){
        let dotNum = container.querySelector(".is-active").innerHTML;
        selectList[i].addEventListener("click", function(){
            displayBox.classList.add("d-none");
            displayBox.classList.remove("d-flex");
            center.append(createPurchase(parseInt(dotNum), i, player));

        })
    }


    return container;
}


// 使われてない
// function effectDisplay(container){
//     const selectList = container.querySelectorAll(".select-box");
//     for(let i = 0; i < selectList.length; i++){
//         let dotNum = container.querySelector(".is-active").innerHTML;
//         selectList[i].addEventListener("click", function(){
//             container.classList.add("d-none");
//             container.classList.remove("d-flex");
//             center.append(createPurchase(parseInt(dotNum), i));
//         })
//     }
// }

function createDisplay(page){
    let container = document.createElement("div");
    container.classList.add("w-100", "d-flex", "justify-content-center", "align-items-center", "flex-column", "h-100", "dis");
    let selectOne = createSelectBox(page,0);
    let selectTwo = createSelectBox(page, 1);
    let selectThree;
    if(page < 3) selectThree = createSelectBox(page, 2);

    container.append(selectOne, selectTwo, selectThree);
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
    dotList[page].classList.add("is-active");

    selectOne.addEventListener("click", function(){
        changeCenterPanel();
        
    })

    return container;
}

function changeCenterPanel(player){
    const center = config.gamePage.querySelector(".center-box");
    center.querySelector(".dis").innerHTML = "";
    let page = config.gamePage.querySelector(".is-active").value;
    center.append(createSelectBox(parseInt(page), player));
}

function createSelectBox(page, index){
    // 各アイテムの箱を作るための関数
    const item = display[page][index];
    let unit = "sec";
    if(page == 0 && index == 0) unit = "click";
    let addNumber = item.effect;
    if(page == 0 && (index == 1 || index == 2)) addNumber = item.effect * item.price;
    let container = document.createElement("div");

    container.classList.add("h-30", "mb-2", "py-1", "px-0", "w-100", "bg-secondary", "d-flex", "select-box");
    container.innerHTML +=
    `
        <img src="${item.imgUrl}" class="pl-0 ml-1 col-3 img">
        <div class="col-7 text-left d-flex align-items-center flex-wrap px-0">
            <h3 class="col-12 text-white">${item.name}</h3>
            <div class="w-100 d-flex justify-content-between px-0">
                <p class="rem1p02 text-white col-6">¥${item.price.toLocaleString()}</p>
                <p class="pl-0 text-center rem1p02 text-green col-6">+¥${addNumber.toLocaleString()} / ${unit}</p>
            </div>
        </div>
        <div class="col-2 text-center text-white d-flex align-items-center justify-content-center">
            <p class="rem2">${item.ownedAmount}</p>
        </div>
    `
    return container;
}


function createPurchase(page, index, player){
    const item = display[page][index];
    let unit = "second";
    if(page == 0 && index == 0) unit = "click";
    let addNumber = item.effect;
    if(page == 0 && (index == 1 || index == 2)) addNumber = item.effect * item.price;


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
    let displayWindow = config.gamePage.querySelector(".dis");
    container.querySelector(".back-btn").addEventListener("click", function(){
        returnDis(container, displayWindow);
    })
    container.querySelector(".pur-btn").addEventListener("click", function(){
        purchaseItem(item, container, displayWindow, player);
    })

    return container;
}

// <input type="number" class="col-12 form-control text-right quant" placeholder="5" value="0">

function returnDis(curr, backPage){
    displayNone(curr);
    displayBlock(backPage);
    curr.innerHTML = ""
    backPage.classList.add("d-flex");
}

function purchaseItem(item, curr, backPage, player){
    let quantity = parseInt(curr.querySelector(".quant").value);
    cost = changeItem(item, quantity, player);
    player.assets -= cost;
    returnDis(curr, backPage);
}



// valueが変化しない原因を探る
// 原因はおそらくpurchase containerが消えずに何個も重なっているから
// だから最初のコンテナのvalueが参照され続ける
// 購入ページを離れるときにそのページのコードを消して一つ前のページを生成し手切り替える野が良いと思われる
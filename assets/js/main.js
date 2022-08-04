// API Key
// TsxsfBFtXD1hxgbraNm-sb-JF-xzEzAPFDvcXHykRvZII8n4UTm67QTkr5UXKXbSHKEhReJRQLdQhUBJhA53bSR_8vxzmzNZobwrFbsUMaGrEYWTBzRqHKVewRTpYnYx

//Had to do this in order for it to work in localhost
// For Windows:
// Open the start menu
// Type windows+R or open "Run"
// Execute the following command:
//  chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security

window.addEventListener("load", function(){
    onReady(onReadyCallback);
    let scrollAmount;
    let innerHeight = window.innerHeight;
    let container = this.document.querySelector("#restaurants-main");
    var isLoaded = false;
    var check = 1;
    var sortVal ;
    $.ajax({
        url: 'https://api.yelp.com/v3/businesses/search',
        type: 'GET',
        contentType:"application/json",
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization','Bearer TsxsfBFtXD1hxgbraNm-sb-JF-xzEzAPFDvcXHykRvZII8n4UTm67QTkr5UXKXbSHKEhReJRQLdQhUBJhA53bSR_8vxzmzNZobwrFbsUMaGrEYWTBzRqHKVewRTpYnYx');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            
        },
        dataType : 'json',
        data : {location:"San Jose, CA 95127",
                term: "restaurants"
        },
        success: function(data){
            console.log(data);
            writeCategories(data);
            writeRestaurants(data);
            $('#restaurants-header button').click(function(){
                sort(this)
            })
        },
        error:function(xhr){
            console.log(xhr);
        }
        
    })
    //infinite scroll 
    window.addEventListener("scroll", function(){
        scrollAmount = window.scrollY;
        if (window.matchMedia('(max-width: 640px)').matches) {
            if(innerHeight + scrollAmount >= container.clientHeight * (9/15)&& isLoaded === false){
                isLoaded = true;
                setVisible('.loading', true);
                onReady(onReadyCallback);
                loadMore("San Jose, CA 95127", "restaurants");
                console.log(isLoaded)
            }
        }
        else{
            if(innerHeight + scrollAmount >= container.clientHeight * 0.95 && isLoaded === false){
                isLoaded = true;
                setVisible('.loading', true);
                onReady(onReadyCallback);
                loadMore("San Jose, CA 95127", "restaurants");
                console.log(isLoaded)
            }
        }
    })
    // if (window.matchMedia('(max-width: 640px)').matches){
    //     swipedetect()
    // }
    
//function to create All Categories on site
function writeCategories(restaurantsInfo){
    let parent = $('#restaurants-header');
    let catArr= [];
    for(restaurant of restaurantsInfo.businesses){
    //console.log(restourant.categories)
        for(categorie of restaurant.categories){
      // console.log(categorie['title']); 
                if($.inArray(categorie['title'],catArr)== -1){
                    let button =document.createElement('button');
                    button.innerHTML=`${categorie['title']}`;
                    button.setAttribute('data-category',`${categorie['alias']}`);
                    button.setAttribute('class','btn')
                    parent.append(button) ;
                    catArr.push(`${categorie['title']}`);
                }
        }
    }
    //console.log(catArr)
}
//function to create all Restaurants on site
function writeRestaurants(restaurantsInfo){
    let parent = $('#restaurants-main');
    //creating main restaurant divs
    for(restaurant of restaurantsInfo.businesses){
        let newDiv = document.createElement('div');
        let a = document.createElement('a');
        //creating a tag for whole div
        a.setAttribute('href',`${restaurant.url}`)
        a.setAttribute('class','a-whole')
        newDiv.setAttribute('class', 'single-restaurant');
        let attArr = [];
        for(cat of restaurant.categories){  
            var attr = `${cat['alias']}` ;
            attArr.push(attr);
        }
        //console.log(attArr);
        newDiv.setAttribute('data-category',attArr);
       // console.log(newDiv.getAttribute('data-category'))
        parent.append(newDiv);
        //creating img div for restaurant
        let imgDiv = document.createElement('div');
        imgDiv.setAttribute('class','single-restaurant-image');
        a.append(imgDiv)
        newDiv.append(a);
        //creating img
        let img = document.createElement('img');
        img.setAttribute('src',`${restaurant.image_url}`);
        img.setAttribute('alt',`${restaurant.alias}`);
        imgDiv.append(img);
        //creating div for name field
        let nameFieldDiv = document.createElement('div');
        nameFieldDiv.setAttribute('class','single-restaurant-name');
        a.append(nameFieldDiv);
       // newDiv.append(a);
        //creating button
        let nameField= document.createElement('p');
        nameField.innerHTML=`${restaurant.name}`;
        nameFieldDiv.append(nameField);
        //creating div with price and rating as 2 separate divs
        let priceRateDiv = document.createElement('div');
        priceRateDiv.setAttribute('class','single-restaurant-price-rating');
        a.append(priceRateDiv);
        let rate = document.createElement('div');
        rate.setAttribute('class','single-restaurant-rating');
        priceRateDiv.append(rate);
        let price = document.createElement('div');
        price.setAttribute('class','single-restaurant-price');
        priceRateDiv.append(price);
        //creating starts for rating
        for(let i=0;i<5;i++){
            var icon = document.createElement('i')
            icon.setAttribute('class','fa-solid fa-star gray')
            rate.append(icon);
            if(i<restaurant.rating && restaurant.rating%1==0){
                icon.setAttribute('class','fa-solid fa-star black')
            }
            else if(i<restaurant.rating ){
                icon.setAttribute('class','fa-solid fa-star black')
                if(restaurant.rating-i==0.5 && !restaurant.rating%1==0){
                    icon.setAttribute('class','fa-solid fa-star-half-stroke black')
                }
            }
        }
        //creating  price
        let priceTag = document.createElement('p');
        if(restaurant.price) priceTag.innerHTML=`| ${restaurant.price}`;
        else priceTag.innerHTML=`| &#32&#32 `
        price.append(priceTag)
        //creating div with last button
        let lastDiv = document.createElement('div');
        lastDiv.setAttribute('class','single-restaurant-view-button');
        a.append(lastDiv);
        let  btn = document.createElement('button')
        btn.innerHTML=`VIEW`
        lastDiv.append(btn);
    }
   
}
//function onBtnClickChangeCategorie
function sort(button){
    let category = button.getAttribute('data-category');
    let restourants = $(".single-restaurant")
    for(rest of restourants){
        rest.classList.add('hide');
    }
    for(rest of restourants){
        if(rest.getAttribute('data-category').includes(category)){
            rest.classList.remove('hide');
            rest.classList.add('show');
        }
        else{
            rest.classList.remove('show');
            rest.classList.add('hide');
        }
    }
    check = 0;
    sortVal = category;
    console.log(sortVal);
}
//function to load more items 
function loadMore(location, term) { 
    $.ajax({
        url: 'https://api.yelp.com/v3/businesses/search',
        type: 'GET',
        contentType:"application/json",
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization','Bearer TsxsfBFtXD1hxgbraNm-sb-JF-xzEzAPFDvcXHykRvZII8n4UTm67QTkr5UXKXbSHKEhReJRQLdQhUBJhA53bSR_8vxzmzNZobwrFbsUMaGrEYWTBzRqHKVewRTpYnYx');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        },
        dataType : 'json',
        data : {location:location,
                term: term
        },
        success: function(data){
            if(check==1){
                console.log(data);
                writeRestaurants(data);
                $('#restaurants-header button').click(function(){
                    sort(this)
                })
            }
            else{
                //if infinite scroll should be active when there is specific category 
                writeRestaurants(data);
                let restourants = $(".single-restaurant")
                for(rest of restourants){
                    rest.classList.add('hide');
                }
                for(rest of restourants){
                    if(rest.getAttribute('data-category').includes(sortVal)){
                        rest.classList.remove('hide');
                        rest.classList.add('show');
                    }
                    else{
                        rest.classList.remove('show');
                        rest.classList.add('hide');
                    }
                }
            }
        },
        error:function(xhr){
            console.log(xhr);
        }
        
    })
 }
function setVisible(selector, visible) {
    return document.querySelector(selector).style.display = visible ? 'block' : 'none';
}
function onReadyCallback(){
    isLoaded = false; 
    setVisible('#restaurants', true);
    setVisible('.loading', false);
   
}
function onReady(callback) {
    let intervalId = window.setInterval(function(){
    if ($('body')[0] !== undefined){
        window.clearInterval(intervalId);
        callback.call(this);
    }}, 1000);
}
// function swipedetect(){
//     let touchsurface = $('#restaurants-header button'),
//     swipedir,
//     startX,
//     startY,
//     distX,
//     distY,
//     threshold = 150, //required min distance traveled to be considered swipe
//     restraint = 100, // maximum distance allowed at the same time in perpendicular direction
//     allowedTime = 300, // maximum time allowed to travel that distance
//     elapsedTime,
//     startTime
//     touchsurface.on('touchstart', function(e){
//         var touchobj = e.changedTouches[0]
//         swipedir = 'none'
//         dist = 0
//         startX = touchobj.pageX
//         startY = touchobj.pageY
//         startTime = new Date().getTime() // record time when finger first makes contact with surface
//         e.preventDefault()
//     }, false)
  
//     touchsurface.on('touchmove', function(e){
//         e.preventDefault() // prevent scrolling when inside DIV
//     }, false)
  
//     touchsurface.on('touchend', function(e){
//         var touchobj = e.changedTouches[0]
//         distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
//         distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
//         elapsedTime = new Date().getTime() - startTime // get time elapsed
//         if (elapsedTime <= allowedTime){ // first condition for awipe met
//             if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
//                 swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
//             }

//         }
//         handleswipe(swipedir)
//         e.preventDefault()
//     }, false)

//     if (swipedir =='left'){console.log('levo')}
//     else if(swipedir=='right'){
//         console.log('right');
//     }

// }
})

// API Key
// TsxsfBFtXD1hxgbraNm-sb-JF-xzEzAPFDvcXHykRvZII8n4UTm67QTkr5UXKXbSHKEhReJRQLdQhUBJhA53bSR_8vxzmzNZobwrFbsUMaGrEYWTBzRqHKVewRTpYnYx

//Had to do this in order for it to work in localhost
// For Windows:
// Open the start menu
// Type windows+R or open "Run"
// Execute the following command:
//  chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
$.ajax({
    url: 'https://api.yelp.com/v3/businesses/search',
    type: 'GET',
    contentType:"application/json",
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization','Bearer TsxsfBFtXD1hxgbraNm-sb-JF-xzEzAPFDvcXHykRvZII8n4UTm67QTkr5UXKXbSHKEhReJRQLdQhUBJhA53bSR_8vxzmzNZobwrFbsUMaGrEYWTBzRqHKVewRTpYnYx');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    },
    dataType : 'json',
    data : {location:"San Jose, CA 95127",
            term: "restaurants"
    },
    success: function(data){
        console.log(data);
        writeCategories(data);
        writeRestaurants(data);
       
    },
    error:function(xhr){
        console.log(xhr);
    }
})
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
        let nameField= document.createElement('button');
        nameField.innerHTML=`${restaurant.name}`;
        nameFieldDiv.append(nameField);
        //creating last div with price and rating as 2 separate divs
        let priceRateDiv = document.createElement('div');
        priceRateDiv.setAttribute('class','single-restaurant-price-rating');
        a.append(priceRateDiv);
        let rate = document.createElement('div');
        rate.setAttribute('class','single-restaurant-rating');
        priceRateDiv.append(rate);
        let price = document.createElement('div');
        price.setAttribute('class','single-restaurant-price');
        priceRateDiv.append(price);
        //making starts for 
        //srediti zvezdice, cele brojeve i 0.5 
        for(let i = 0;i<restaurant.rating;i++){
            if(restaurant.rating%1==0){  
                if(restaurant.rating==5){
                    let icon = document.createElement('i')
                    //<i class="fa-solid fa-star"></i>
                    icon.setAttribute('class','fa-solid fa-star black')
                    rate.append(icon);
                }
                else{
                    let icon = document.createElement('i')
                    //<i class="fa-solid fa-star"></i>
                    icon.setAttribute('class','fa-solid fa-star black')
                    rate.append(icon);
                }
            }
            else{
                
            }
        }
    }
   
}
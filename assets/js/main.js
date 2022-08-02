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
        xhr.setRequestHeader('Authorization','Bearer TsxsfBFtXD1hxgbraNm-sb-JF-xzEzAPFDvcXHykRvZII8n4UTm67QTkr5UXKXbSHKEhReJRQLdQhUBJhA53bSR_8vxzmzNZobwrFbsUMaGrEYWTBzRqHKVewRTpYnYx')
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    },
    dataType : 'json',
    data : {location:"San Jose, CA 95127",
            term: "restaurants"
    },
    success: function(data){
        console.log(data);
        writeCategories(data);
       
    },
    error:function(xhr){
        console.log('Erorrs')
        console.log(xhr)
    }
})
function writeCategories(restaurantsInfo){
    let parent = $('#restaurants-header');
    let div = document.createElement('div');
    //console.log(ul);
    let catArr= [];
    parent.append(div);
    for(restourant of restaurantsInfo.businesses){
    //console.log(restourant.categories)
        for(categorie of restourant.categories){
      // console.log(categorie['title']); 
                if($.inArray(categorie['title'],catArr)== -1){
                    let button =document.createElement('button');
                    button.innerHTML=`${categorie['title']}`
                    button.setAttribute('data-category',`${categorie['alias']}`)
                    div.append(button) 
                    catArr.push(`${categorie['title']}`)
                }
        }
    }
    //console.log(catArr)
}
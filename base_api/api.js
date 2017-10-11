class BaseApi{
    GetSuggestions(url, suggest, urlBuilder, descriptionBuilder, handler){
        var xhr = new XMLHttpRequest();
        xhr.timeout = 1000;
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState === XMLHttpRequest.DONE){
                if (xhr.status == 200) {    // Ok
                    console.log(xhr.responseText);
                    var response = JSON.parse(xhr.responseText);
                    var result = [];
                    
                    if (typeof(response) != "undefined") {
                        response.forEach(function(element) {
                            result.push({content:urlBuilder(element, handler), description:descriptionBuilder(element, handler)})
                        }, this);
                        suggest(result);
                    }
                }
            } 
            if (xhr.status == 401) { // not authorized
                suggest([{content:urlBuilder(null, handler), description:descriptionBuilder(null, handler)}])
            }
        };
        xhr.open("GET", url);
        xhr.send();
    }
}
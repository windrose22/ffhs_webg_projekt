

function request(type, url, token, contentType) {
    return new Promise(function(succeed, fail) {
        var req = new XMLHttpRequest();
        req.open(type, url, true);
        if (token) {
            req.setRequestHeader('Authorization',token);
        }
        if (contentType) {
            req.setRequestHeader('Content-Type', contentType);
        }
        req.addEventListener("load", function() {
            if (req.status < 400)
                succeed(req.responseText);
            else
                fail(new Error("Request failed: " + req.statusText));
        });
        req.addEventListener("error", function() {
            fail(new Error("Network error"));
        });
        req.send(null);
    });
}

function getPizzas() {
    request('GET',
        'https://tonyspizzafactory.herokuapp.com/api/pizzas','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4',
        'application/json;charset=UTF-8').then(function(response) {
        console.log(response);
        var json = JSON.parse(response);
        var pizzaList = document.getElementById('pizzaList');
        json.forEach(function (item) {
            var pizzaSection = getPizzaSection(item.name, item.prize,
                item.id, item.ingredients, item.imageUrl);
            pizzaList.appendChild(pizzaSection);
        });

    });
}


function getPizzaSection(name, price, id, ingredients, imageUrl) {
    console.log(name);
    console.log(price);
    console.log(ingredients);
    console.log(imageUrl);
    var section = document.createElement('section');
    section.setAttribute('class', 'card col-12 col-sm-6 col-lg-4 col-xl-3');

    var image = document.createElement('img');
    image.setAttribute('src', imageUrl);
    image.setAttribute('alt', name);
    image.setAttribute('class', 'card-img-top');
    section.appendChild(image);

    var div = document.createElement('div');
    div.setAttribute('class', 'card-body');

    var header = document.createElement('h2');
    header.setAttribute('class', 'card-title');
    header.textContent = name;

    var span = document.createElement('span');
    span.setAttribute('class', 'price float-right');
    span.textContent = price + ' ';

    var chart = document.createElement('i');
    chart.setAttribute('class', 'fa fa-shopping-cart');
    chart.setAttribute('aria-hidden', 'true');
    span.appendChild(chart);

    header.appendChild(span);
    div.appendChild(header);

    var p = document.createElement('p');
    p.setAttribute('class', 'card-text');
    p.textContent = ingredients;

    div.appendChild(p);
    section.appendChild(div);

    return section;
}
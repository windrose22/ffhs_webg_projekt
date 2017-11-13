

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
    var pizzaList = document.getElementById('pizzaList');
    request('GET',
        'https://tonyspizzafactory.herokuapp.com/api/pizzas','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4',
        'application/json;charset=UTF-8').then(function(response) {
        var json = JSON.parse(response);
        json.forEach(function (item) {
            var pizzaSection = getPizzaSection(item.name, item.prize,
                item.id, item.ingredients, item.imageUrl);
            pizzaList.appendChild(pizzaSection);
        });

    }, function(error) {
        var alert = getAlert();
        pizzaList.appendChild(alert);
    });
}

function getSalads() {
    var saladList = document.getElementById('saladList');
    request('GET',
        'https://tonyspizzafactory.herokuapp.com/api/salads','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4',
        'application/json;charset=UTF-8').then(function(response) {
        var json = JSON.parse(response);
        json.forEach(function (item) {
            var saladSection = getSaladSection(item.name, item.prize,
                item.id, item.ingredients, item.imageUrl);
            saladList.appendChild(saladSection);
        });
    }, function(error) {
        var alert = getAlert();
        saladList.appendChild(alert);
    });
}

function getSoftDrinks() {
    var softDrinkList = document.getElementById('softDrinkList');
    request('GET',
        'https://tonyspizzafactory.herokuapp.com/api/softdrinks','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4',
        'application/json;charset=UTF-8').then(function(response) {
        var json = JSON.parse(response);
        json.forEach(function (item) {
            var softDrinkSection = getSoftDrinkSection(item.name, item.prize,
                item.id, item.imageUrl, item.volume);
            softDrinkList.appendChild(softDrinkSection);
        });
    }, function(error) {
        var alert = getAlert();
        softDrinkList.appendChild(alert);
    });
}


function getPizzaSection(name, price, id, ingredients, imageUrl) {
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

function getSaladSection(name, price, id, ingredients, imageUrl) {
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
    div.appendChild(header);

    var p = document.createElement('p');
    p.setAttribute('class', 'card-text');
    p.textContent = ingredients;
    div.appendChild(p);

    var select = document.createElement('select');
    select.setAttribute('name', 'dessing');
    select.setAttribute('title', 'dressing');
    var french = document.createElement('option');
    french.textContent = 'French dressing';
    select.appendChild(french);
    var italian = document.createElement('option');
    italian.textContent = 'Italian dressing';
    select.appendChild(italian);
    div.appendChild(select);

    var span = document.createElement('span');
    span.setAttribute('class', 'price float-right card-title');
    span.textContent = price + ' ';

    var chart = document.createElement('i');
    chart.setAttribute('class', 'fa fa-shopping-cart');
    chart.setAttribute('aria-hidden', 'true');
    span.appendChild(chart);

    div.appendChild(span);

    section.appendChild(div);

    return section;
}


function getSoftDrinkSection(name, price, id, imageUrl, volume) {
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
    div.appendChild(header);

    var select = document.createElement('select');
    select.setAttribute('name', 'size');
    select.setAttribute('title', 'size');
    var size = document.createElement('option');
    size.textContent = volume;
    select.appendChild(size);
    div.appendChild(select);

    var span = document.createElement('span');
    span.setAttribute('class', 'price float-right card-title');
    span.textContent = price + ' ';

    var chart = document.createElement('i');
    chart.setAttribute('class', 'fa fa-shopping-cart');
    chart.setAttribute('aria-hidden', 'true');
    span.appendChild(chart);

    div.appendChild(span);

    section.appendChild(div);

    return section;
}

function getAlert() {
    var alert = document.createElement('div');
    alert.setAttribute('class', 'alert alert-warning');
    alert.setAttribute('role', 'alert');
    alert.textContent ='Currently, it is not possible to retrieve the item list. Please try it again later';
    return alert;
}

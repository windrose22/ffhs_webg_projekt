

function request(type, url, token, contentType, params) {
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
        req.send(params);
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
    alert.textContent ='Currently, it is not possible to retrieve the item list. Please try it again later.';
    return alert;
}

var formValidator = 5;
var wasValidated = false;
var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

assertInput = function(inputId, feedbackId, minLength,maxLength,regex) {
    var valid = true;
    var element = document.getElementById(inputId);
    var value = element.value;
    if (minLength && value.length < minLength) {
        valid = false;
    }
    if (maxLength && value.length > maxLength) {
        valid = false;
    }
    if (regex && !value.match(regex)) {
        valid=false;
    }
    handleFeedbackAndButton(element.valid, valid, feedbackId);
    element.valid = valid;
};



handleFeedbackAndButton = function(wasValid, isValid, feedbackId) {
    if (wasValid !== isValid) {
        formValidator += isValid?-1:+1;
    }
    var feedback = document.getElementById(feedbackId);
    feedback.style.display = !isValid?'block':'none';
    var submitButton = document.getElementById('submitButton');
    submitButton.disabled = (formValidator !== 0 && wasValidated);
    wasValidated = !wasValidated?formValidator===0:true;
};

assertRadio = function(name, feedbackId) {
    var valid = false;
    var buttonList = document.getElementsByName(name);
    var nrInvalidButtons = 0
    for (var i = 0; i < buttonList.length; ++i) {
        var button = buttonList[i];
        nrInvalidButtons += button.valid?0:1;
        if (button.checked) {
            valid = true;
        }
    }
    var wasValid = nrInvalidButtons < buttonList.length;
    handleFeedbackAndButton(wasValid, valid, feedbackId);
    if (wasValid !== valid) {
        for (var j = 0; j < buttonList.length; ++j) {
            var button2 = buttonList[j];
            button2.valid = valid;
        }
    }

};

addListener2Input = function(inputId, feedbackId, minLength, maxLength, regex) {
    var input = document.getElementById(inputId);
    input.addEventListener('input', function() {
        assertInput(inputId, feedbackId, minLength, maxLength, regex);
    });
    input.valid = false;
};

addListener2Radio = function(name, feedbackId) {
    var buttonList = document.getElementsByName(name);
    for (var i = 0; i < buttonList.length; ++i) {
        var button = buttonList[i];
        button.addEventListener('change', function() {
            assertRadio(name, feedbackId);
        });
        button.valid = false;
    }
};

initFeedbackValidation = function () {
    formValidator = 5;
    wasValidated = false;

    addListener2Input('namefield', 'nameFeedback', 1);
    addListener2Input('emailfield', 'emailFeedback', null, null, emailRegex);
    addListener2Input('suggestionfield', 'suggestionFeedback', 50);
    addListener2Radio('pizzaRating', 'pizzaFeedback');
    addListener2Radio('prizeRating', 'priceFeedback');
}

submitFeedback = function() {
    wasValidated = true;
    assertInput('namefield', 'nameFeedback', 1);
    assertInput('emailfield', 'emailFeedback', null, null, emailRegex);
    assertInput('suggestionfield', 'suggestionFeedback', 50);
    assertRadio('pizzaRating', 'pizzaFeedback');
    assertRadio('prizeRating', 'priceFeedback');
    if (formValidator === 0) {
        request('POST',
            'https://tonyspizzafactory.herokuapp.com/api/feedback','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4',
            'application/json;charset=UTF-8',getParams()).then(function(response) {
            updateModal();
            $('#exampleModal').modal('show');
        }, function(error) {
                var form = document.getElementById('needs-validation');
            var alert = getSubmitAlert();
            form.insertBefore(alert, form.childNodes[0]);
        });
    }
}

function getSubmitAlert() {
    var alert = document.createElement('div');
    alert.setAttribute('class', 'alert alert-warning');
    alert.setAttribute('role', 'alert');
    alert.textContent ='Currently, it is not possible to send feedback. Please try it again later.';
    return alert;
}

/* Diese Funktion sammelt die Parameters für die POST Operationen */
/* Die Parameters sind die Werte aus dem Feedback-Formular */
function getParams() {
    var pizzaRatingWert = null;
    document.getElementsByName("pizzaRating").forEach(function(item) {
        if (item.checked) {
            pizzaRatingWert = item.value;
        }
    });
    var prizeRatingWert = null;
    document.getElementsByName("prizeRating").forEach(function(item) {
        if (item.checked) {
            prizeRatingWert = item.value;
        }
    });

    // encodeURIComponent ermöglicht eine richtige Umwandlung von u.a. speziellen Zeichen
    // der umgekehrte Weg ist mit decodeURIComponent erreicht.
    var nameWert = encodeURIComponent(document.getElementsByName("name")[0].value);
    var emailWert = encodeURIComponent(document.getElementsByName("email")[0].value);
    var feedbackWert = encodeURIComponent(document.getElementsByName("feedback")[0].value);

    var feedbackObjekt = {
        "pizzaRating": pizzaRatingWert,
        "prizeRating": prizeRatingWert,
        "name": nameWert,
        "email": emailWert,
        "feedback": feedbackWert
    };

    // aus einem Json-Objekt entsprechendes String erzeugen
    return JSON.stringify(feedbackObjekt);
}


updateModal = function() {
    request('GET',
        'https://tonyspizzafactory.herokuapp.com/api/feedback','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4',
        'application/json;charset=UTF-8').then(function(response) {
            console.log(response);
            var data = JSON.parse(response);
            data = data.map(function(item) {
                return {prizeRating:item.prizeRating, pizzaRating:item.pizzaRating, count:1}
            });
        var svg = dimple.newSvg("#pizzaRatingChart", 400   , 200);
        var myChart = new dimple.chart(svg, data);
        console.log(myChart)
        myChart.setBounds(10, 10, 340, 180)
        myChart.addMeasureAxis("p", "count");
        myChart.addSeries("pizzaRating", dimple.plot.pie);
        myChart.addLegend(350, 10, 90, 180, "left");
        myChart.draw();


        var svg2 = dimple.newSvg("#priceRatingChart", 400   , 200);
        var myChart2 = new dimple.chart(svg2, data);
        console.log(myChart2)
        myChart2.setBounds(10, 10, 390, 180)
        myChart2.addMeasureAxis("p", "count");
        myChart2.addSeries("prizeRating", dimple.plot.pie);
        myChart2.addLegend(350, 10, 90, 180, "left");
        myChart2.draw();

    })
}


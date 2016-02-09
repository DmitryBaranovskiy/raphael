var data = {
    "jonasi":[0,0,0,0,98,45,0,0,3,0,28,273,202,9,0,4,0,0,7,336,97,89,5,730,317,127,121,626,195],
    "chisag":[0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "jessie":[75,13,163,183,86,105,84,367,0,0,5,0,140,68,202,42,224,338,385,225,166,204,554,0,0,0,0,0,0],
    "nlashi":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,208,441,0,0],
    "simeje":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,107,45,350,438,0,0,0,0,0,0],
    "biggyla":[7,0,38,132,0,0,69,72,0,0,86,0,0,0,0,0,0,0,0,0,0,128,0,0,0,1,0,0,0],
    "asimenye":[0,425,171,331,9,332,135,6,0,100,0,0,0,422,0,77,195,277,204,0,82,6,0,0,0,0,0,0,0],
    "kumayani":[135,67,403,178,229,122,307,136,711,452,544,346,0,20,194,87,0,0,51,0,163,0,0,0,0,0,0,0,0],
    "Administrators":[0,0,0,0,0,0,0,0,0,0,0,3,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "ndecha":[372,827,868,724,605,864,724,597,698,477,764,596,569,540,471,495,413,661,351,427,560,62,147,694,756,742,615,649,459],
    "Administrator":[0,25,88,209,53,21,36,36,40,9,128,6,37,4,33,0,22,9,0,12,0,111,0,0,0,0,0,0,0],
    "margret":[194,63,0,6,237,0,169,145,79,48,325,26,0,0,0,0,0,71,0,0,0,0,136,12,490,410,0,191,347],
    "benard":[0,248,28,91,1,330,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "oligad":[0,0,0,91,0,5,0,0,0,63,0,0,12,0,0,0,0,0,0,0,0,74,0,0,0,0,0,0,0],
    "mikmck":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]
};
var daylabels = ["18 OCT 2008", "19 OCT 2008", "20 OCT 2008", "21 OCT 2008", "22 OCT 2008", "23 OCT 2008", "24 OCT 2008", "25 OCT 2008", "26 OCT 2008", "27 OCT 2008", "28 OCT 2008", "29 OCT 2008", "30 OCT 2008", "31 OCT 2008", "1 NOV 2008", "2 NOV 2008", "3 NOV 2008", "4 NOV 2008", "5 NOV 2008", "6 NOV 2008", "7 NOV 2008", "8 NOV 2008", "9 NOV 2008", "10 NOV 2008", "11 NOV 2008", "12 NOV 2008", "13 NOV 2008", "14 NOV 2008", "15 NOV 2008"];


function DrawImpact(data, daylabels, id, userid) {
    var len = 0, users = {}, user_element = userid && document.getElementById(userid);
    for (var user in data) {
        len = data[user].length;
        break;
    }

    var r = Raphael(id, 100 * len - 50, 600);
    for (var i = 0; i < len; i++) {
        var day = [];
        for (user in data) {
            if (!users[user] && data[user][i]) {
                users[user] = {start: i, ltr: [], rtl: [], values: []};
            }
            if (users[user]) {
                if (users[user].start + 1 && !(users[user].finish + 1)) {
                    day.push({name: user, value: data[user][i]});
                }
                if (!("finish" in users[user]) && !eval(data[user].slice(i + 1).join("+"))) {
                    users[user].finish = i;
                }
            }
        }
        day.sort(function (a, b) {
            return b.value - a.value;
        });
        var y = 2;
        for (var j = 0, jj = day.length; j < jj; j++) {
            users[day[j].name].values.push(day[j].value);
            users[day[j].name].ltr.push(y);
            y += Math.max(Math.round(Math.sqrt(day[j].value * 5)), 1);
            users[day[j].name].rtl.unshift(y);
            y += 2;
        }
        r.text(i * 100 + 25, y + 10, daylabels[i]).attr({font: '9px "Arial"', "stroke-width": 0, fill: "#666"});
    }
    // draw
    var all_labels = {}, current;
    for (user in users) {
        (function (user) {
            var step = users[user].start,
                color = Raphael.getColor(.75),
                textattr = {font: '10px "Arial"', "stroke-width": 0, fill: "#fff"},
                p = r.path({fill: color}).moveTo(users[user].start * 100, users[user].ltr[0]).lineTo(users[user].start * 100 + 50, users[user].ltr[0]),
                th = (users[user].rtl[users[user].rtl.length - 1] - users[user].ltr[0]) / 2;
            all_labels[user] = [];
            if (th > 4) {
                all_labels[user].push(r.text((users[user].start) * 100 + 25, users[user].ltr[0] + th + 3, users[user].values[0]).attr(textattr));
            }
            for (var i = 1, ii = users[user].ltr.length; i < ii; i++) {
                p.cplineTo((users[user].start + i) * 100, users[user].ltr[i], 25)
                 .lineTo((users[user].start + i) * 100 + 50, users[user].ltr[i]);
                th = (users[user].rtl[ii - i - 1] - users[user].ltr[i]) / 2;
                if (th > 4) {
                    all_labels[user].push(r.text((users[user].start + i) * 100 + 25, users[user].ltr[i] + th + 3, users[user].values[i]).attr(textattr));
                }
            }
            p.lineTo(users[user].finish * 100 + 50, users[user].rtl[0]).lineTo(users[user].finish * 100, users[user].rtl[0]);
            for (var i = 1, ii = users[user].rtl.length; i < ii; i++) {
                p.cplineTo((users[user].finish - i) * 100 + 50, users[user].rtl[i], -25)
                 .lineTo((users[user].finish - i) * 100, users[user].rtl[i]);
            }
            p.andClose();
            for (var i = 0, ii = all_labels[user].length; i < ii; i++) {
                all_labels[user][i].toBack();
            }

            p[0].onmouseover = function () {
                if (all_labels[current]) {
                    for (var i = 0, ii = all_labels[current].length; i < ii; i++) {
                        all_labels[current][i].toBack();
                    }
                }
                p.toFront();
                for (var i = 0, ii = all_labels[user].length; i < ii; i++) {
                    all_labels[user][i].toFront();
                }
                current = user;
                if (user_element) {
                    user_element.style.color = color;
                    user_element.innerHTML = user;
                }
            };
        })(user);
    }
}

window.onload = function () {
    DrawImpact(data, daylabels, "holder", "user");
};

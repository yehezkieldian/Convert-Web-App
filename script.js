let listQuantities;
let optionQuantity;
let inputTop;
let inputBottom;
let optionTop;
let optionBottom;
let quantity;
let defQuantityId = 'panjang';
let quantities = [{
        name: 'Panjang',
        id: 'panjang',
        defUnitIndex: 1,
        units: [
            ["kilometer", 1000],
            ["meter", 1],
            ["centimeter", 0.01],
            ["milimeter", 0.001],
            ["mikrometer", 1e-6],
            ["nanometer", 1e-9],
            ["pikometers", 1e-12],
            ["mil", 1609.344],
            ["mil laut", 1852],
            ["yards", 0.9144],
            ["kaki", 0.3048],
            ["inci", 0.0254]
        ]
    },
    {
        name: 'Massa',
        id: 'massa',
        defUnitIndex: 0,
        units: [
            ["kilogram", 1],
            ["gram", 1e-3],
            ["miligram", 1e-6],
            ["nanogram", 1e-12],
            ["ton", 1000],
            ["kuintal", 100],
            ["pon", 0.45359237]
        ]
    },
    {
        name: 'Waktu',
        id: 'waktu',
        defUnitIndex: 7,
        units: [
            ["milenium", 31536000000],
            ["abad", 3153600000],
            ["dekade", 315360000],
            ["windu", 252288000],
            ["tahun (365 hari)", 31536000],
            ["bulan (30 hari)", 2628000],
            ["minggu", 604800],
            ["hari", 86400],
            ["jam", 3600],
            ["menit", 60],
            ["sekon", 1],
            ["milisekon", 1e-3],
            ["mikrosekon", 1e-6],
            ["nanosekon", 1e-9],
            ["picosekon", 1e-12],
        ]
    },
    {
        name: 'Temperatur',
        id: 'temperatur',
        defUnitIndex: 0,
        units: [
            ["Celsius", 'value + 273.15', 'value - 273.15'],
            ["Fahrenheit", '5/9 * (value + 459.67)', '9/5 * value - 459.67'],
            ["Kelvin", 1],
            ["Rankine", '5/9 * value', '9/5 * value'],
            ["Reaumur", '5/4 * value + 273.15', '4/5 * (value - 273.15)']
        ]
    },
    {
        name: 'Sudut',
        id: 'sudut',
        defUnitIndex: 0,
        units: [
            ["derajat", 'value/360', 'value*360'],
            ["radian", 'value / (2 * Math.PI)', 'value * 2 * Math.PI'],
            ["revolusi", 1],
            ["kuadran", 0.25],
            ["menit busur", 'value/(360*60)', 'value * (360*60)'],
            ["detik busur", 'value/(360*3600)', 'value * (360*3600)']
        ]
    },
    {
        name: 'Luas',
        id: 'luas',
        defUnitIndex: 1,
        units: [
            ["kilometer persegi", 1e6],
            ["meter persegi", 1],
            ["centimeter persegi", 1e-4],
            ["milimeter persegi", 1e-6],
            ["hektare", 1e4],
            ["mil persegi", 2589988.110336],
            ["yard persegi", 0.83612736],
            ["kaki persegi", 0.09290304],
            ["inci persegi", 0.00064516]
        ]
    },
    {
        name: 'Volume',
        id: 'volume',
        defUnitIndex: 5,
        units: [
            ["kilometer kubik", 1e12],
            ["meter kubik", 1e3],
            ["decimete kubik", 1],
            ["milimeter kubik", 1e-6],
            ["kiloliter", 1e3],
            ["liter", 1],
            ["mililiter", 1e-3],
            ["yard kubik", 764.554857984],
            ["mil kubik", 4.168181825e12],
            ["inci kubik", 0.016387064],
            ["kaki kubik", 28.316846592],
            ["galon", 3.785411784],
            ["cangkir", 0.2365882365],
            ["sendok makan", 0.01478676478125],
            ["sendok teh", 0.00492892159375]
        ]
    },
    {
        name: 'Data',
        id: 'data',
        defUnitIndex: 1,
        units: [
            ["bits", 0.125],
            ["bytes", 1],
            ["kilobits", 128],
            ["kilobytes", 1024],
            ["megabits", 131072],
            ["megabytes", 1048576],
            ["gigabits", 134217728],
            ["gigabytes", 1073741824],
            ["terabits", 137438953472],
            ["terabytes", 1099511627776],
            ["petabits", 140737488355328],
            ["petabytes", 1125899906842624],
            ["exabits", 144115188075855872],
            ["exabytes", 1152921504606846976]
        ]
    },
]

function getQuantityById(id) {
    for (let i = 0; i < quantities.length; i++) {
        if (id === quantities[i].id)
            return quantities[i];
    }
}

function onInitPage() {
    listQuantities = document.getElementById('listQuantities');
    optionQuantity = document.getElementById('optionQuantity');
    inputTop = document.getElementById('inputTop');
    inputBottom = document.getElementById('inputBottom');
    optionTop = document.getElementById('optionTop');
    optionBottom = document.getElementById('optionBottom');

    let startQuantity;
    if (!startQuantity) {
        let id = localStorageGetDefault('lastQuantityID', defQuantityId);
        startQuantity = getQuantityById(id);
    }
    if (!startQuantity) {
        startQuantity = getQuantityById(defQuantityId);
    }
    loadQuantity(startQuantity.id);
}

function loadQuantity(quantityId) {
    quantity = getQuantityById(quantityId);
    localStorage.setItem('lastQuantityId', quantityId);

    optionTop.innerHTML = '';
    optionBottom.innerHTML = '';
    let unitOptions = '';
    for (let i = 0; i < quantity.units.length; i++) {
        let title = quantity.units[i][0];
        unitOptions += '<option>' + title + '</option>';
    }
    optionTop.innerHTML = unitOptions;
    optionBottom.innerHTML = unitOptions;

    document.getElementById('quantityTitle').innerHTML = 'Konversi ' + quantity.name;

    loadUnits();

    optionQuantity.value = quantityId;
    let itemId = '';
    for (let i = 0; i < quantities.length; i++) {
        itemId = 'item' + i;
        if (quantities[i].id === quantityId) document.getElementById(itemId).className = 'selected';
        else document.getElementById(itemId).className = '';
    }

    convert();
}

function findUnitIndexByName(name) {
    for (let i = 0; i < quantity.units.length; i++) {
        if (quantity.units[i][0] === name) return i;
    }
    return -1;
}

function loadUnits() {
    optionTop.selectedIndex = findUnitIndexByName(localStorageGetDefault('top: ' + quantity.name, ''));
    if (optionTop.selectedIndex === -1) optionTop.selectedIndex = quantity.defUnitIndex;
    optionBottom.selectedIndex = findUnitIndexByName(localStorageGetDefault('bottom: ' + quantity.name, ''));
    if (optionBottom.selectedIndex === -1) optionBottom.selectedIndex = quantity.defUnitIndex;
}

document.addEventListener("DOMContentLoaded", onInitPage, false);

function localStorageGetDefault(name, defaultValue) {
    let value = localStorage.getItem(name);
    return (value !== null) ? value : defaultValue;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function convertInternal(topUnitIndex, value, bottomUnitIndex, inputResult) {

    let topUnitFactor = quantity.units[topUnitIndex][1];
    let bottomUnitFactor = quantity.units[bottomUnitIndex][1];

    if (isNumber(topUnitFactor)) {
        value = value * topUnitFactor;
    } else {
        value = eval(topUnitFactor);
    }

    if (isNumber(bottomUnitFactor)) {
        value = value / bottomUnitFactor;
    } else {
        value = eval(quantity.units[bottomUnitIndex][2]);
    }

    inputResult.value = value.toFixed(4);
}

function convert() {
    let value = parseFloat(inputTop.value);
    if (isNaN(value)) {
        inputBottom.value = '';
    } else {
        convertInternal(optionTop.selectedIndex, value, optionBottom.selectedIndex, inputBottom)
        localStorage.setItem('input' + quantity.name, value.toString());
    }
}

function convertBack() {
    let value = parseFloat(inputBottom.value);

    if (isNaN(value)) {
        inputTop.value = '';
    } else {
        let topUnitIndex = optionBottom.selectedIndex;
        let bottomUnitIndex = optionTop.selectedIndex;

        convertInternal(topUnitIndex, value, bottomUnitIndex, inputTop);
    }
}
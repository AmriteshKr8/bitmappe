var res = document.getElementById("Resolution").value;
res = parseInt(res);
updateCanvas(res);
var output_container = document.getElementById("output-container");
output_container.hidden = true;
width = Math.min(window.innerWidth - 400, window.innerHeight - 400);
setBoxSize(width);

function setBoxSize(width){
    document.querySelectorAll('.checkbox').forEach(cb => {
        checkboxSize = Math.floor(width / document.getElementById("Resolution").value);
        cb.style.width = checkboxSize + 'px';
        cb.style.height = checkboxSize + 'px';
    });
}

window.addEventListener('resize', () => {
    width = Math.min(window.innerWidth - 400, window.innerHeight - 400);
    setBoxSize(width);
});

document.getElementById("Resolution").addEventListener("input", function() {
    let res = parseInt(this.value);
    if (!isNaN(res)) {
        updateCanvas(res);
        setBoxSize(width);
    }
});

function updateCanvas(res){
    document.getElementById('canvas').innerHTML = ``;
    for (var i = 0; i < res; i++) {
        for (var j = 0; j < res; j++) {
            document.getElementById('canvas').innerHTML += 
                `<input type='checkbox' id='checkbox${i}${j}' class='checkbox' />`;
        }
        document.getElementById('canvas').innerHTML += "<br>";
    }
}

document.getElementById("check").addEventListener("click", function() {
    writeOutput(document.getElementById("Resolution").value);
});

function getCheckboxValues() {
    var checkboxes = document.querySelectorAll('.checkbox');
    var values = [];
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            values.push(1);
        } else {
            values.push(0);
        }
    });
    return splitArray(values, parseInt(document.getElementById("Resolution").value));
}

function splitArray(array, chunkSize) {
    var result = [];
    for (var i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

function writeOutput(res){
    var output = document.getElementById("output");
    var array = getCheckboxValues();
    output_container.hidden = false;
    output.innerText = "";
    output.innerText += `const uint${res}_t bitmap[${res}] = {\n`;
    for (var i = 0; i < res; i++) {
        output.innerText += "0b";
        for (var j = 0; j < res; j++) {
            output.innerText += array[i][j];
        }
        if(i < res - 1){
            output.innerText += ",\n";
        } else {
            output.innerText += "\n";
        }
    }
    output.innerText += "};\n";
}
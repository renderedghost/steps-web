document.getElementById('hexForm').addEventListener('submit', function (event) {
    event.preventDefault();
    processHexForm();
});

document.getElementById('hslForm').addEventListener('submit', function (event) {
    event.preventDefault();
    processHslForm();
});

function processHexForm() {
    let startHex = document.getElementById('startColor').value;
    let endHex = document.getElementById('endColor').value;
    let numColors = parseInt(document.getElementById('numColorsHex').value);

    let startRgb = hexToRgb(startHex);
    let endRgb = hexToRgb(endHex);

    let startHsl = rgbToHsl(...startRgb);
    let endHsl = rgbToHsl(...endRgb);

    let results = generatePalette(startHsl, endHsl, numColors);
    displayResults(results);
}

function processHslForm() {
    let startHsl = [
        parseInt(document.getElementById('startHue').value) / 360,
        parseInt(document.getElementById('startSaturation').value) / 100,
        parseInt(document.getElementById('startLightness').value) / 100
    ];
    let endHsl = [
        parseInt(document.getElementById('endHue').value) / 360,
        parseInt(document.getElementById('endSaturation').value) / 100,
        parseInt(document.getElementById('endLightness').value) / 100
    ];
    let numColors = parseInt(document.getElementById('numColorsHSL').value);

    let results = generatePalette(startHsl, endHsl, numColors);
    displayResults(results);
}

function switchTab(tab) {
    let hexForm = document.getElementById('hexForm');
    let hslForm = document.getElementById('hslForm');
    let hexTab = document.querySelector('.tab:nth-child(1)');
    let hslTab = document.querySelector('.tab:nth-child(2)');

    if (tab === 'hex') {
        hexForm.style.display = '';
        hslForm.style.display = 'none';
        hexTab.classList.add('active-tab');
        hslTab.classList.remove('active-tab');
    } else {
        hslForm.style.display = '';
        hexForm.style.display = 'none';
        hslTab.classList.add('active-tab');
        hexTab.classList.remove('active-tab');
    }
}

function generatePalette(startHsl, endHsl, numColors) {
    let hSteps = interpolate(startHsl[0], endHsl[0], numColors);
    let sSteps = interpolate(startHsl[1], endHsl[1], numColors);
    let lSteps = interpolate(startHsl[2], endHsl[2], numColors);

    let palette = [];
    for (let i = 0; i <= numColors + 1; i++) {
        let rgb = hslToRgb(hSteps[i], sSteps[i], lSteps[i]);
        let hex = rgbToHex(...rgb);
        let hsl = `HSL(${(hSteps[i] * 360).toFixed(2)}, ${(sSteps[i] * 100).toFixed(2)}%, ${(lSteps[i] * 100).toFixed(2)}%)`;
        palette.push({ hex, hsl });
    }
    return palette;
}

function displayResults(palette) {
    let resultsDiv = document.getElementById('paletteResults');
    resultsDiv.innerHTML = ''; // Clear previous results
    let list = document.createElement('ul');
    palette.forEach(color => {
        let item = document.createElement('li');
        let colorPreview = document.createElement('span');
        colorPreview.className = 'color-preview';
        colorPreview.style.backgroundColor = color.hex;
        item.appendChild(colorPreview);
        item.append(` ${color.hex} - ${color.hsl}`);
        list.appendChild(item);
    });
    resultsDiv.appendChild(list);
}

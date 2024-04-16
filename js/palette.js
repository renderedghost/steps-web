document.getElementById('colorForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let startHex = document.getElementById('startColor').value;
    let endHex = document.getElementById('endColor').value;
    let numColors = parseInt(document.getElementById('numColors').value);

    let startRgb = hexToRgb(startHex);
    let endRgb = hexToRgb(endHex);

    let startHsl = rgbToHsl(...startRgb);
    let endHsl = rgbToHsl(...endRgb);

    let results = generatePalette(startHsl, endHsl, numColors);
    displayResults(results);
});

function interpolate(value1, value2, steps) {
    let step = (value2 - value1) / (steps + 1);
    let values = [];
    for (let i = 0; i <= steps + 1; i++) {
        values.push(value1 + step * i);
    }
    return values;
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

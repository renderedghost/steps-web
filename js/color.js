// Converts a hexadecimal color value to its RGB representation.

function hexToRgb(hex) {
    // Log the intention to convert hex to RGB
    console.log(`Converting hex value ${hex} to RGB.`);

    // Check if the hex string is exactly 6 characters long
    if (hex.length !== 6) {
        console.error('Error: Hex value must be exactly 6 characters.');
        return null;  // Return null to indicate an error in input
    }

    // Parse each color component
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    // Log the extracted RGB values
    console.log(`Extracted values - R: ${r}, G: ${g}, B: ${b}`);

    // Return the RGB array
    return [r, g, b];
}


// Converts an RGB color value to its HSL representation.

function rgbToHsl(r, g, b) {
    console.log(`Converting RGB values R: ${r}, G: ${g}, B: ${b} to HSL.`);
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    console.log(`Normalized RGB values - R: ${r.toFixed(2)}, G: ${g.toFixed(2)}, B: ${b.toFixed(2)}`);
    console.log(`Max value: ${max.toFixed(2)}, Min value: ${min.toFixed(2)}, Lightness (L): ${l.toFixed(2)}`);

    if (max == min) {
        h = s = 0; // achromatic
        console.log('Color is achromatic.');
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
        console.log(`Hue (H): ${h.toFixed(2)}, Saturation (S): ${s.toFixed(2)}`);
    }

    return [h, s, l];
}


// Converts an HSL color value to its RGB representation.

function hslToRgb(h, s, l) {
    console.log(`Converting HSL values H: ${h}, S: ${s}, L: ${l} to RGB.`);
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
        console.log('Color is achromatic. RGB will be the same as the lightness value.');
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        console.log(`Temporary values - p: ${p.toFixed(2)}, q: ${q.toFixed(2)}`);

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);

        console.log(`Converted RGB values - R: ${r.toFixed(2)}, G: ${g.toFixed(2)}, B: ${b.toFixed(2)}`);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


// Converts an RGB color value to its hexadecimal representation.

function rgbToHex(r, g, b) {
    console.log(`Converting RGB values R: ${r}, G: ${g}, B: ${b} to Hex.`);
    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    console.log(`Converted Hex value: ${hex}`);
    return hex;
}
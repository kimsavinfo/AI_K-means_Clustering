/** ================================================================================
 * @author Kim SAVAROCHE
 * @date 16/10/2014
 *
 * Library for canvas
================================================================================ **/

// Draw the image in the canvas so the pixels can be handled one by one
function Lib_canvasDrawImageInCanvas(canvasID, imageID)
{
	var canvas = document.getElementById(canvasID);
	var context = canvas.getContext('2d');
	var imageSrc = document.getElementById(imageID).src;

	var imageInCanvas = new Image();

	imageInCanvas.onload = function()
	{
		canvas.width = imageInCanvas.width;
		canvas.height = imageInCanvas.height;
		context.drawImage(imageInCanvas, 0, 0, imageInCanvas.width, imageInCanvas.height);
	}

	imageInCanvas.src = imageSrc;
}

// Get all pixels from the image
// The pixel is cut in 4 section : *4
function Lib_canvasGetImagePixels(canvasID)
{
	var canvas = document.getElementById(canvasID);
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;

	var context = canvas.getContext("2d");
	var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
	var pixels = imgData.data;

	var imgPixels = [];
	for (var x = 0; x < canvas.width ; x++) 
	{
		for (var y = 0; y < canvas.height; y++) 
		{
			var pixelIndex = (y * canvas.width + x) * 4;
			var red = pixels[pixelIndex];
			var green = pixels[pixelIndex+1];
			var blue = pixels[pixelIndex+2];
			var alpha = pixels[pixelIndex+3];

			var colourRGB = [red, green, blue, alpha];

			imgPixels.push(colourRGB);
		}
	}

	return imgPixels;
}

// Convert and rgb entity to a hexa colour code
function Lib_canvasRGBToHex(colour) 
{
	function RGBToHex(rgbColour) 
	{
		var hexColour = parseInt(rgbColour).toString(16);
		return hexColour.length == 1 ? '0'+hexColour : hexColour;
	}

	return '#' + RGBToHex(colour[0]) + RGBToHex(colour[1]) + RGBToHex(colour[2]);
}
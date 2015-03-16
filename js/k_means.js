function k_means(minDistanceAccepted) 
{
	this.getMainColours = function(imgPixels, nbMainColoursWanted)
	{
		// Get colours references : not twice the same
		var clusters = getClusters();
		
		do
		{
			// Link pixels to the nearest cluster
			clusters = sortPixelsInCluster(clusters, imgPixels);

			// Get colours in center of the clusters' pixels' array
			var centers = [];
			var biggestCenterDistance = 0;
			var centersOldNewDistance;
			for (var iCluster = 0; iCluster < clusters.length; iCluster++) 
			{
				// Find the new center
				centers[iCluster] = getCenter(clusters[iCluster]);

				// Save the biggest distance beetween the old center and the new one
				centersNewOldDistance = Lib_mathsGetDistance(centers[iCluster], clusters[iCluster]);
				if(centersNewOldDistance > biggestCenterDistance)
				{
					biggestCenterDistance = centersNewOldDistance;
				}

				// The new center become the new cluster
				clusters[iCluster] = centers[iCluster];
				clusters[iCluster]["pixels"] = [];
			}
		}while(biggestCenterDistance > minDistanceAccepted)

		return centers;

		// ==========================================

		function getCenter(cluster)
		{
			var center = [];
			var nbAxes = 0;
			var pixels = cluster["pixels"];
			var pixel;
			center["nbPixels"] = pixels.length;

			// Total on each axe
			for (var iPixel = 0; iPixel < center["nbPixels"]; iPixel++) 
			{
				var pixel = cluster["pixels"][iPixel];
				nbAxes = pixel.length;

				for (var iColour = 0; iColour < nbAxes; iColour++) 
				{
					if(!center[iColour])
					{
						center[iColour] = 0;
					}

					center[iColour] += pixel[iColour];
				}
			}

			// Divide each color total to get the real center's colors value
			for (var iAxe = 0; iAxe < nbAxes; iAxe++) 
			{
				center[iAxe] /= center["nbPixels"];
			}

			return center;
		}

		function getClusters()
		{
			var clusters = [];

			while(clusters.length < nbMainColoursWanted) 
			{
				var index = Lib_mathsGetRandomInt(0, imgPixels.length);

				var colourReference = imgPixels[index];
				if(!isColourInClusters(clusters, colourReference))
				{
					colourReference["pixels"] = [];
					clusters.push(colourReference);
				}
			}

			return clusters;
		}

		function isColourInClusters(clusters, colourReference)
		{
			var present = false;

			for(var iColour = 0; iColour < clusters.length; iColour++) 
			{
				if(clusters[iColour] == colourReference)
				{
					present = true;
				}
			}

			return present;
		}

		// Each image's pixels are distributed to the closest cluster -> cluster's "pixels" array
		function sortPixelsInCluster(clusters, imgPixels)
		{
			for (var iPixel = 0; iPixel < imgPixels.length; iPixel++) 
			{
				var pixel = imgPixels[iPixel];
				var smallestDistance = Number.POSITIVE_INFINITY;
				var iClosestCluster = 0;

				// Find the closest's cluster index
				for (var iCluster = 0; iCluster < clusters.length; iCluster++) 
				{
					var distance = Lib_mathsGetDistance(clusters[iCluster], pixel);

					if(distance < smallestDistance)
					{
						smallestDistance = distance;
						iClosestCluster = iCluster;
					}
				}

				// Link the pixel with the closest cluster
				clusters[iClosestCluster]["pixels"].push(pixel);
			}

			return clusters;
		}


		
	}	
}
function Lib_mathsGetRandomInt(min, max) 
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Lib_mathsGetDistance(entityA, entityB)
{
	var distance = 0;
	var nbProperties = entityA.length;

	for (var iProperty = 0; iProperty < nbProperties; iProperty++) 
	{
		distance += (entityA[iProperty] - entityB[iProperty])*(entityA[iProperty] - entityB[iProperty])
	}

	return distance;
}
// Snack calculator
// Contains functions to help determine how much it would be worth to pay off something

const shop = await fetch("https://blaseball.com/database/shopSetup")
	.then(req => req.json());
// We might need multiple operations on this, and the endpoint is only about 60 kilobytes, so this shouldn't be too heavy.

const snacks = [
	null, // Ad
	{cost: 100}, // votes
	{cost: 2000, single: true}, // flute
	{cost: 0, single: true}, // breadcrumbs
	{cost: 1, unit: 1000}, // peanuts
	"maxBetTiers",
	"teamWinCoinTiers",
	"idolStrikeoutsTiers",
	"idolShutoutsTiers",
	"idolHomersTiers",
	"idolHitsTiers",
	"teamLossCoinTiers",
	{cost: 100, single: true}, // pizza
	{cost: 100, single: true}, // cheese board
	{cost: 100, single: true}, // apple
	"idolStealTiers",
	"blackHoleTiers",
	"floodClearTiers",
	"sunTwoTiers",
	"idolHomerAllowedTiers",
	"timeOffTiers",
	"incinerationTiers",
	"idolPitcherWinTiers",
	"idolPitcherLoseTiers",
	"consumerTiers"
];
// parallel array to (/database/shopSetup).menu

function snackDataKey(snackId) {
	(snackId instanceof Number) && snackId = menu[snackId];
	(snackId instanceof String) || (snackId = menu.findIndex()) > -1 || return null;
	return snacks[snackId];
}

function getCost(snack, end, start=0) {
	snacks.contains(snack) || snack = snackDataKey(snack);
	// I want data that's valid with what i'm expecting

	snack || return null;
	// Handles null- or empty-cases, like if someone wants Ad
	// or, if someone wants an invalid snack, snackDataKey will return null
	// works because invalid or empty-cases will be falsey

	if !(snack instanceof String) {
		snack = CostObject(snack);
		// adds a few properties that are missing so the chaining is valid
		
		snack.single && return snack.cost;
		// If you can only own one of the snack, return its cost.
		
		(end % snack.unit) && end += (snack.unit - (end % snack.unit));
		// If end is not a multiple of snack.unit, make it one by increasing end.
		
		return (end - start) * cost;
		// For all of the ones that do not have string keys, and are not one-purchases,
		// this will be the end cost.
	} // implicit else; omitted to increase performance
	// all valid strings will be keys to the snackData 
	// XXX sData global should be equivalent to await fetch(/database/shopSetup)
	//   .then(res => res.json())
	//   .then(obj => obj.snackData)

	end ??= 99;
	return sData[snack].slice(start, end).reduce(((a,b) => a + b.cost),0);
}

function CostObject(thisArg) {
	thisArg.single ??= false;
	thisArg.unit ??= 1;
	return thisArg;
}

Map.prototype.toString = function() {
	var output = "{"
	for (const [i,j] of this) {
		i instanceof String && i = i.serialize();
		j instanceof String && j = j.serialize();
		output += `${i}: ${j},`;
	}
	return output.splice(0, output.length - 1) + "}";
}
String.prototype.serialize = function() {
	return this.replaceAll(/\\./g, match => `\\\\${match}`);
}
/*Map.of = function(dictLike) {
	switch(typeof dictLike) {
		case "string":
			return Object.entries(JSON.parse(dictLike))
				.reduce((a,b) => a.set(...b), new Map())
			break;
		case "array":
			return dictLike.reduce((a,c,i) => a.set(i,c), new Map());
			break;
		case "set":
			return dictLike.entries().map(a => a[0])
				.reduce((a,b) => a.set(b,b), new Map());
			break;
		case "map":
			return dictLike
			break;
	}
}*/
// Map.extend = function(...maps) {new Map(...(maps.reverse().map(t => (t.entries() ?? t) || []).flat(1)))}

/**
 *
 *
 * @argument $callback	the callback function(key, value, map, thisArg)
 * @argument $thisArg	value to use as $this when executing $callback
**/
Map.prototype.map = function(callback, thisArg) {
	// callback should take arguments {key value map thisArg} in this order
	var t, m;
	this ?? throw new TypeError("what the fuck am i supposed to be mapping here");
	var obj = Object(this);
	// var len = obj.size >>> 0; // feels clunky
	// i'm not even going to use this lmao
	callback instanceof Function || throw new TypeError(`buddy you need to make your map function a function not whatever <${callback}> is`);
	// improving polyfill be like
	
	thisArg ??= this;
	// yeah just gonna use nullish coalescing right here don't mind me
	
	m = new Map();
	// this is all going to get hoisted anyways
	// but i wonder if declaring up there is faster...
	var k = 0;
	thisArg.forEach(function(i,j) {
		// this is literally what a for loop was made for
		// don't use a while loop here
		// that's disgusting
		// also forEach go brr
		if (obj.has(i)) {
			m.set(i, callback.call(thisArg, i, j, k, obj));
		}
		k++;
	});
	return m;
}
Map.prototype.modify = function(key, fn, thisArg) {
	thisArg ??= this;
	Map.set(key, fn(Map.get(key),key,thisArg));
}
Set.superSet = function(...sets) {
	return sets.reduce((a,b) => {
		b.values().forEach(a.add);
		return a;
	});
}
Set.subSet = function(...sets) {
	return sets.reduce((a,b) => b.values().filter(a.has));
}
Set.prototype.toString = function() {
	return `Set { ${set.keys().map(i => i instanceof String ? i.serialize() : i).join(", ")} }`
}
Set.prototype.reduce = function(callback, initialValue) {
	// callback {accumulator currVal currInex set}
	this ?? throw new TypeError("can't reduce nothing to something man, come on use some sense");
	callback instanceof Function || throw new TypeError(`i need an operation not whatever <${callback}> is`);
	var o = Object(this);
	var l = o.size;
	var u = 0;
	var k = 0;
	var value = initialValue ?? {for(let i of Object(this)){u = k = 1; return i}};
	Object(this).forEach(function(i) {
		u && (u = 0  && continue);
		value = callback(value, i, k++, this);
	});
	return value;
}

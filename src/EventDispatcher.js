/**
 * EventDispatcher.js
 * - Simple extendable event dispatching class using John Resig's simple inheritance.
 *
 * @version 0.1
 * @author John Vrbanac
 * @license GNU AGPLv3
 **/

var Event = Class.extend({
	init: function(typeStr, targetObj){
		this._type = typeStr;
		this._target = targetObj;
	},
	getTarget: function() { return this._target; },
	getType: function() { return this._type; }
});

var EventDispatcher = Class.extend({
	init: function(){
		this._listeners = [];
	},
	hasEventListener: function(typeStr, listenerFunc) {
		var exists = false;
		for (var i = 0; i < this._listeners.length; i++) {
			if (this._listeners[i].type === typeStr && this._listeners[i].listener === listenerFunc) {
				exists = true;
			}
		}

		return exists;
	},
	addEventListener: function(typeStr, listenerFunc) {
		if (this.hasEventListener(typeStr, listenerFunc)) {
			return;
		}

		this._listeners.push({type: typeStr, listener: listenerFunc});
	},
	removeEventListener: function(typeStr, listenerFunc) {
		for (var i = 0; i < this._listeners.length; i++) {
			if (this._listeners[i].type === typeStr && this._listeners[i].listener === listenerFunc) {
				this._listeners.splice(i, 1);
			}
		}
	},
	dispatchEvent: function(event) {
		for (var i = 0; i < this._listeners.length; i++) {
			if (this._listeners[i].type === event.getType()) {
				this._listeners[i].listener.call(event);
			}
		}
	}
});
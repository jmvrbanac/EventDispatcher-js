describe("EventDispatcher", function() {
	var dispatcher;

	beforeEach(function() {
		dispatcher = new EventDispatcher();
	});

	it("Can create a new instance", function() {
		expect(dispatcher).not.toBeNull();
	});

	it("can add a new event listener", function() {
		var listenerFunc = function() {};
		dispatcher.addEventListener("boom", listenerFunc);
		expect(dispatcher.hasEventListener("boom", listenerFunc)).toBe(true);
	});

	it("can remove a event listener", function() {
		var listenerFunc = function() {};
		// Add listener to remove
		dispatcher.addEventListener("boom", listenerFunc);
		expect(dispatcher.hasEventListener("boom", listenerFunc)).toBe(true);

		// Remove it
		dispatcher.removeEventListener("boom", listenerFunc);
		expect(dispatcher.hasEventListener("boom", listenerFunc)).toBe(false);
	});
	
	it("It should be able to dispatch an event", function() {
		var dispatched = false;
		var listenerFunc = function() {
			dispatched = true;
		};

		dispatcher.addEventListener("boom", listenerFunc);
		dispatcher.dispatchEvent(new Event("boom"));

		waitsFor(function() {
			return dispatched;
		});

		runs(function() {
			expect(dispatched).toBe(true);
		});
	});
});
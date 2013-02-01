(function($)
{

	// this (global) static variable stores all wished build() callbacks
	window.jquery_build_callback = [];

	//----------------------------------------------------------------------------------------- build
	/**
	 * Call build(callback) what callback functions you want to be called for future added dom elements
	 * call this.build() after you add dom elements (ie dynamic javascript add, ajax calls) to apply the same changes
	 *
	 * @param callback function the callback function
	 * @param call_now boolean optional default true
	 * @return jQuery
	 */
	$.fn.build = function (callback, call_now)
	{
		// use this.in(selector) in callback to build the elements
		this.in = function(selector)
		{
			var result = this.find(selector);
			if (this.is(selector)) {
				result = this.add(result);
			}
			return result;
		};
		//
		if (callback != undefined) {
			// add a callback function
			window.jquery_build_callback.push(callback);
			if ((call_now == undefined) || call_now) {
				this.tmpBuildCaller = callback;
				this.tmpBuildCaller();
				delete this.tmpBuildCaller;
			}
		}
		else {
			// execute all callback functions
			for (var key in jquery_build_callback) {
				callback = window.jquery_build_callback[key];
				this.tmpBuildCaller = callback;
				this.tmpBuildCaller();
			}
			delete this.tmpBuildCaller;
		}
		delete this.in;
		return this;
	}

})( jQuery );

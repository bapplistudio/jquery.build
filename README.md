jquery.build
============
jQuery events and modifiers persistant when doing ajax calls

# Overview

You can tell [jquery](http://jquery.com) to call events for new dynamically added elements with [.on()](http://api.jquery.com/on),
but what about other jquery initialisations, such as [jquery-ui](http://jqueryui.com) widgets building ?

**jquery.build** offers jquery a way to keep your new DOM elements always active.

Some live examples here :
http://saf.re/github/jquery.build/examples/simple.html

# How it works

## Declare

First you need to initialize jquery contents a little different way than [usual](http://learn.jquery.com/about-jquery/how-jquery-works).

To init some jquery active elements, you do that kind of stuff :

```javascript
$(document).ready(function() {
  $('span').click(function(event) {
    alert('Hello world');
  });
});
```

But what about if you make an ajax call that returns new &lt;span&gt; ? Or if you dynamically insert new &lt;span&gt; elements into your DOM ?
How can you keep the events, and all others jquery active elements initialization ?

With the help of the jquery.build plugin, if you ever initialize your active elements like this :

```javascript
$(document).ready(function() {
	$('body').build(function() {
		this.in('span').click(function(event) {
			alert('Hello world');
		});
	}
});
```

The build function will be immediately called for &lt;body&gt;, and will be called each time you call **.build()** (without any parameter) for your added elements.

You can declare multiple build functions, in several scripts, they all will be called at each **.build()** call.

Into a build function, this is the jquery object of the elements that will be activated. You can use all jquery methods to find and activate elements.
**jquery.build** adds **.in()** to search elements into the current builded element and the [.find()](http://jquery.com/find) children (and sub-children) elements.

## Use after an ajax call

Look at this initialization code :

```javascript
$('button').click(function() {
	$.ajax({
		url: 'foo.html',
		success: function(data) {
			$('#target').html(data);
			$('#target').children().build();
		}
	})
});
```

And the associated html code :

```html
<button>Click this for ajax</button>
<div id="target"></div>
```

The **foo.html** page can contain active elements :

```html
The foo.html page is loaded.
<span>Clickable</span> elements remain active !
```

Once the result of the ajax call generated new DOM elements into your target div, calling .build() for these new elements will call all build functions, in order to activate the loaded elements.

[Here is a live example](http://saf.re/github/jquery.build/examples/ajax.html)

## Use after dynamically adding elements

Each time you add DOM elements, call $(element).build(); to build it and it's children (and sub-children).

[Here is a live example](http://saf.re/github/jquery.build/examples/simple.html)

# Unleash its power

To unleash the power of **jquery.build** with ajax calls, consider using [jquery.xtarget](https://github.com/bapplistudio/jquery.xtarget).

This make ajax calls of HTML sub-pages very easy, and automatically uses jquery.build when loaded after each ajax calls.

# MIT License

This program and its documentation are released into MIT License :

« Copyright © Baptiste Pillot - baptiste at pillot dot fr

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

The Software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the Software. »

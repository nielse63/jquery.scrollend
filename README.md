### jQuery scrollend

A jQuery plugin that allows for window scroll-start event handling.

## Demo

See the demo <a href="http://nielse63.github.io/jquery.scrollend/" target="_blank">here</a>.

## Usage

Include both the jQuery library and the scrollend plugin in your project:

```
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="js/jquery.scrollend.js"></script>
```

Execute the scrollend method to an element, instatiate options (if so desired), and run a callback functions:

```js
$(window).scrollend({
	delay : 250
}, function() {
	// ...
});
```

Or bind an element to the event, passing in options and event handler:

```js
$(window).on('scrollend', 250, function() {
	// ...
});
```

If you want to use the default delay setting of 250ms, simply don't include the options object:

```js
$(window).scrollend(function() {
	// ...
});
```

## Options

The only option available is the delay time (in milliseconds) to execute the callback after the browser has stopped being resized. The default value is 250ms. This can be passed as either a number or object:

```js
// As a number
$(window).on('scrollend', 250, function() {
	// ...
});

// As an object
$(window).on('scrollend', { delay : 250 }, function() {
	// ...
});
```

## License

This plugin is licensed under the <a href="http://opensource.org/licenses/MIT" target="_blank">MIT license</a>.  A copy of the license is included in this package.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/nielse63/jquery-scrollend/trend.png)](https://bitdeli.com/free "Bitdeli Badge")


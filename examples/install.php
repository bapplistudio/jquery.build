<?php
/**
 * This install script download scripts needed for examples
 *
 * php -f install.php
 */

$install = array(
	'jquery.js' => 'http://code.jquery.com/jquery-1.8.3.js',
);

foreach ($install as $script => $url) {
	$data = @file_get_contents($url);
	if (!$data) {
		echo 'Error: could not download file ' . $url . "\n";
	}
	elseif (!@file_put_contents($script, $data)) {
		echo 'Error: could not save file ' . $script . "\n";
	}
	else {
		echo 'Ok: installed file ' . $script . "\n";
	}
}

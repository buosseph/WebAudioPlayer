/* Notes:
 * - Need overlay on top of #playlist on dragover to indicate adding of files
 * - Duplicates should show up. Every item in the collection should be visible
 * - Must be able to identify when #playlist is empty
 * - Finish simple file display and handling in #playlist before reimplementing audio
 */

var app = app || {};

if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported by your current browser. Please upgrade to a newer version in order to use this application.');
}

$(function() {
	new app.AppView();
});
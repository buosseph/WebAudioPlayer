/* Notes:
 * - Need overlay on top of #playlist on dragover to indicate adding of files
 * - Dropping new files deletes the TrackViews of previous files, making them inaccessable. Fix this.
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
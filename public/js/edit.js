$(document).on('ready', function(){

  var updatePreview = function(inputEl){

  };

  var $editor = $('#editor');
  var $preview = $('#preview');

  $('.preview-link').on('click', function(){

    var postMarkdown = $('#post-text').val();
    // Hide the editor
    $editor.addClass('hidden');

    // Parse the markdown in the editor to HTML
    var postHTML = markdown.toHTML(postMarkdown);

    // Update the preview with the HTML
    $preview.html(postHTML);

    // Show the preview
    $preview.removeClass('hidden');
  });

  $('.edit-link').on('click', function(){
    $preview.addClass('hidden');
    $editor.removeClass('hidden');
  });

});
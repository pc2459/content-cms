$(document).on('ready', function(){

  var tags = ['aaaa', 'bbbb', 'cccc'];

  $('#tags').tagsInput({
    'height' : '40px',
    'width' : '100%',
    'defaultText' : ''
    
  });


  var $editor = $('#editor');
  var $preview = $('#preview');

  // Switch to preview
  $('.preview-link').on('click', function(){

    $('.edit-link').removeClass('tab-style-active');
    $('.preview-link').addClass('tab-style-active');

    var postMarkdown = $('#post-text').val();
    // Hide the editor
    $editor.addClass('hidden');

    // Parse the markdown in the editor to HTML
    var postHTML = markdown.toHTML(postMarkdown);

    // Update the preview with the HTML
    $('#preview-title').html($('#post-title').val());
    $('#preview-body').html(postHTML);

    // Show the preview
    $preview.removeClass('hidden');
  });

  // Switch back to Edit mode
  $('.edit-link').on('click', function(){

    $('.edit-link').addClass('tab-style-active');
    $('.preview-link').removeClass('tab-style-active');
    $preview.addClass('hidden');
    $editor.removeClass('hidden');
  });



  // Ajax POST on save
  $('#save').on('click', function(e){
    e.preventDefault();
    var tags = $('#tags').val().split(',');
    // tags = tags.split(',');
    console.log("THE TAGS:", tags);

    var data = {
      posttitle : $('#post-title').val(),
      posttext : $('#post-text').val(),
      // postid : $(this).attr('data-id'),
      tags : tags
    };

    $.post('/admin/posts/'+$(this).attr('data-id'),
          data
    );

  });




});
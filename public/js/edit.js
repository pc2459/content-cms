$(document).on('ready', function(){


  $('#tags').tagsInput({
    'height' : '40px',
    'width' : '100%',
    'defaultText' : ''
    
  });

  $('body, #editor, .post-body, #edit-post, :text#post-title, #post-text, div.tagsinput, .published').addClass('muted-bg');


  var $editor = $('#editor');
  var $preview = $('#preview');

  // Switch to preview
  $('.preview-link').on('click', function(){


    $('body, #editor, .post-body, #edit-post, :text, #post-text, div.tagsinput,  .published').removeClass('muted-bg');

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

    $('body, #editor, .post-body, #edit-post, :text, #post-text, div.tagsinput,  .published').addClass('muted-bg');

    $('.edit-link').addClass('tab-style-active');
    $('.preview-link').removeClass('tab-style-active');
    $preview.addClass('hidden');
    $editor.removeClass('hidden');
  });

  // ================= IMAGE UPLOAD
   
  

  
  $('#imageuploader').on('submit', function(e){
    e.preventDefault();
    $(this).ajaxSubmit({
      success: function(response){
        console.log("Response:", response);
        $('#imageuploader').addClass('hidden');
        $('#successUrl').val('/images/' + response);
        $('#successUrl').removeClass('hidden');
      }
    });
  });

  $('#imageupload').on('click', function(){
    $('#imageuploader')[0].reset();
    $('#successUrl').val('').addClass('hidden');
    $('#imageuploader').removeClass('hidden');

  });





  // // Ajax POST on save
  // $('#save').on('click', function(e){
  //   e.preventDefault();
  //   var tags = $('#tags').val().split(',');
  //   // tags = tags.split(',');
  //   console.log("THE TAGS:", tags);

  //   var data = {
  //     posttitle : $('#post-title').val(),
  //     posttext : $('#post-text').val(),
  //     // postid : $(this).attr('data-id'),
  //     tags : tags
  //   };

  //   $.post('/admin/posts/'+$(this).attr('data-id'),
  //         data
  //   );

  // });




});
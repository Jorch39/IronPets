document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');
  $(function() {
    $('#userType').change(function(){
        $('.direction').hide();
        $('#' + $(this).val()).show();
    });
});
}, false);

document.addEventListener('DOMContentLoaded', () => {

  $(function() {
    $('#userType').change(function(){
        $('.direction').hide();
        $('#' + $(this).val()).show();
    });
  });

  

}, false);

$(document).ready(function() {
  $("#formButton").click(function() {
    $("#form1").show();
  });
});
$( document ).ready(function() {
    alert()
    $.ajax({
        type:"GET",
        url: "http://127.0.0.1:8000/blog/blogs/",
        dataType: 'json',
        success: function( data )
        {
            console.log(data,'yyyyyyyyyyyyyyyyyyyyyyyyyyy')
        },
        error: function (jqXHR, exception)
        {
            console.log(errors,'yyyyyyyyyyyyyyyyyyyyyyyyyyy')
        }
    })
});
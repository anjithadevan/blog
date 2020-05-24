$( document ).ready(function() {
    $("#title_error").css("display","none")
    $("#description_error").css("display","none")
    $("#blog_image_error").css("display","none")
    $.ajax({
        type:"GET",
        url: "http://127.0.0.1:8000/blog/blogs/",
        dataType: 'json',
        success: function( data ){
            if(data.length>0){
                var content = "";
                $("#blog_list").empty();
                for(i=0;i<=data.length -1;i++){
                content += `
                    <div class="card" style="width: 18rem;">
                      <img src=`+data[i].blog_image+` class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">`+data[i].title+`</h5>
                        <p class="card-text">`+data[i].description+`</p>
                        <p class="card-text">Published Date:`+getDate(data[i].published_date)+`</p>
                      </div>
                    </div>
                     `
                }
                $("#blog_list").append(content);
            }
            else{
                $("#blog_list").empty();
                $("#blog_list").append(`<h3>No Blogs Found</h3>`);
            }

        },
        error: function (jqXHR, exception)
        {
            console.log(jqXHR,'errors')
        }
    })
    $("#add_blog").click(function(e) {
        e.preventDefault()
        var error = false
        var title = $("#title").val()
        var description = $("#description").val()
        var blog_image =  $('#blog_image')[0].files[0]
        var $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
        $("#title_error").css("display","none")
        $("#description_error").css("display","none")
        $("#blog_image_error").css("display","none")
        var data = {'csrfmiddlewaretoken': $crf_token,'title':title,'description':description,'blog_image':blog_image}
        if(title == ''){
            error = true
            $("#title_error").css("display","block")
        }
        if(description == ''){
            error = true
            $("#description_error").css("display","block")
        }
        if(blog_image != undefined){
            var fileType = blog_image["type"];
            var validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/jpg"];
            if ($.inArray(fileType, validImageTypes) < 0) {
                 error = true
                $("#blog_image_error").css("display","block")
            }
        }
        else{
            delete(data['blog_image'])
        }

        if(error){
            return false
        }
        var form_data = new FormData()
        for ( var key in data ) {
            form_data.append(key, data[key]);
        }
        $.ajax({
            url: "http://127.0.0.1:8000/blog/blogs/",
            data: form_data,
            cache: false,
            processData: false,
            headers:{"X-CSRFToken": $crf_token},
            dataType    : 'json',
            contentType: false,
            type: 'POST',
            success: function (data) {
                location.reload()
            },
            error: function (jqXHR, exception){
                console.log(jqXHR,'errors')
            }
        });

    })
    function getDate(date){
    new_date = date.split('T')
    return new_date[0]
    }
});
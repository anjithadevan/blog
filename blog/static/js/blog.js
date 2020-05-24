$( document ).ready(function() {
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
                        <p class="card-text">`+data[i].published_date+`</p>
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
            console.log(errors,'errors')
        }
    })
});
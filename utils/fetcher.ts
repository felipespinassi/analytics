export const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXBvIjoidXNlciIsInR5cGUiOiJhZG1pbiIsImlkIjo1NiwibmFtZSI6IkZlbGlwZSIsImxvZ2luIjoiRmVsaXBlIiwiZW1haWwiOiJmZWxpcGVAZXhwZWR5LmNvbS5iciIsInBlcm1pc3Npb25zIjpbXSwiY29tcGFueSI6NTYsInByaW1laXJvQWNlc3NvIjpmYWxzZSwic3RhdHVzQ29udGEiOiJhdGl2byIsInBheW1lbnRJbmZvIjp7InN0YXR1cyI6InBhaWQiLCJiYW5rSWQiOiI3NDI0MjE5NiIsImR1ZV9hdCI6IjIwMjYtMDItMTFUMDI6NTk6NTkuMDAwWiJ9LCJwbGFubyI6MiwiYXBwIjoiRVhQRURZIiwiY29tcGFueU5hbWUiOiJDaGFybGVzIGRvcyBTYW50b3MgQWx2ZXMgQnJhbmNvIiwiaWF0IjoxNzcyNDk4NjAxLCJleHAiOjE3NzI1ODUwMDF9.xKu--Px7iBatZjTuef5Th4EI0Urp08KCcqpnygZfu-o",
    },
  }).then((res) => res.json());

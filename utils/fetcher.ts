export const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXBvIjoidXNlciIsInR5cGUiOiJhZG1pbiIsImlkIjo1NiwibmFtZSI6IkZlbGlwZSIsImxvZ2luIjoiRmVsaXBlIiwiZW1haWwiOiJmZWxpcGVAZXhwZWR5LmNvbS5iciIsInBlcm1pc3Npb25zIjpbXSwiY29tcGFueSI6NTYsInByaW1laXJvQWNlc3NvIjpmYWxzZSwic3RhdHVzQ29udGEiOiJhdGl2byIsInBheW1lbnRJbmZvIjp7InN0YXR1cyI6InBlbmRpbmciLCJiYW5rSWQiOiI3NDI0MjE5NiIsImR1ZV9hdCI6IjIwMjYtMDMtMTFUMDI6NTk6NTkuMDAwWiJ9LCJwbGFubyI6MiwiYXBwIjoiRVhQRURZIiwiY29tcGFueU5hbWUiOiJDaGFybGVzIGRvcyBTYW50b3MgQWx2ZXMgQnJhbmNvIiwiaWF0IjoxNzcyNzYzMjQ3LCJleHAiOjE3NzI4NDk2NDd9._qpRytzr3bay5AYGu8Eh1hBmsVRrb-aDNZpnS2fUOPc",
    },
  }).then((res) => res.json());

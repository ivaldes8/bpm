export default (promise: any) => promise
  .then((response: any) => {
    if (response.ok) return (
      [response && response.data && response.data.data ? response.data.data : null,
        response,
      response && response.data ? response.data : null
      ]
    )

    return ([response.errors, response, null])
  })
  .catch((error: any) => {
    console.log(error, "ERROR")

    return Promise.resolve([error, { ok: false }, null])
  })

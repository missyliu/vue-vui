export default (url, callback) => {
  let httpRequest = new XMLHttpRequest()

  httpRequest.onreadystatechange = () => {
    if(httpRequest.readyState === 4) {
      if(httpRequest.status === 200) {
        let data = JSON.parse(httpRequest.responseText)
        if(callback) callback(data)
      }
    }
  }
  httpRequest.open('GET', url)
  httpRequest.setRequestHeader('Accept', 'application/json')
  httpRequest.send()
}

const isUrlValid = (url = '') => {
  if (typeof (url) !== 'string') return false
  const regex = /(?:^|[ \t])((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/g
  return regex.test(url)
}
module.exports = {
  isUrlValid
}

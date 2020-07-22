export default (): string => {
  const today = new Date().toLocaleDateString()
  const reversed = today.split('/').reverse()
  const year = reversed[0]
  const month = Number(reversed[2]) < 10 ? '0' + reversed[2] : reversed[2]
  const day = Number(reversed[1]) < 10 ? '0' + reversed[1] : reversed[1]
  return year + '-' + month + '-' + day
}

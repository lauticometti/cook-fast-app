module.exports = {
  isNumber: function(n) {
    return !!n.match(/^\d+$/g)
  },
  
  isUUIDV4: function(n) {
    return !!n.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
  }
}
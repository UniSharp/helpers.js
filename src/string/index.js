(() => {
  String.prototype.slugify = function () {
    return this.toLowerCase().replace(/[:/.?=&\s]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')
  }
})()

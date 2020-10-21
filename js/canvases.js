function cvsObject() {
  let _cvs;
  let _auxCvs;

  return {
    setCanvas(cvs) {
      _cvs = cvs;
    },
    setAuxCanvas(cvs) {
      _auxCvs = cvs;
    },
    getCanvas() {
      return _cvs;
    },
    getAuxCanvas() {
      return _auxCvs;
    }

  }
}

const Canvases = cvsObject()

export { Canvases }
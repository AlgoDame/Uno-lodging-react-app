import multer from 'multer';

export = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 100000000 },

  fileFilter: (req, file, cb) => {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    if (!file.mimetype.match(/png||jpeg||jpg||gif$i/)) {
      cb(new Error('I don\'t have a clue!'))
      return;
    }

    // To accept the file pass `true`, like so:
    cb(null, true)

    // You can always pass an error if something goes wrong:

  }


}).array("files", 5)

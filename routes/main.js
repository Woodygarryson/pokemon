const router = require('express').Router();

router.get('/',  (req, res) => {
  res.render('entries/main');
});

module.exports = router;

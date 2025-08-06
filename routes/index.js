const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    services: [
      'Mobile & unit car valeting',
      'Deep interior and exterior clean',
      'Paint correction and polishing',
      'Ceramic coatings (up to 10 years)',
      'Headlight restoration',
      'Engine bay cleaning'
    ],
    benefits: [
      'Get discovered by more customers online',
      'Showcase your best work with photos and videos',
      'Offer convenient online booking',
      'Build credibility and trust with reviews',
      'Stay connected via Instagram & Facebook'
    ]
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post('/', [
	check('username', 'username is required').exists(),
	check('password', 'password is required').exists()
], (req, res) => {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	
	const { username, password } = req.body;
	
	if (username !== 'user') {
		return res.status(400).json({ errors: [{ message: 'incorrect username' }] });
	}
	
	if (password !== '12345') {
		return res.status(400).json({ errors: [{ message: 'incorrect password' }] });
	}
	
	res.json({ isAuthenticated: true });
});

module.exports = router;

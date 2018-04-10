const handleSignin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.statusMessage = "Please enter all fields.";
        return res.status(400).send();
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => res.json(user[0]))
                    .catch(err => {
                        res.statusMessage = 'User and password do not match.';
                        res.status(400).send();
                    });
            } else {
                res.statusMessage = 'User and password do not match.';
                res.status(400).send();
            }
        })
        .catch(err => {
            res.statusMessage = 'User and password do not match.';
            res.status(400).send();
        });
}

module.exports = { handleSignin };


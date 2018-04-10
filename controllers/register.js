const handleRegister = (db, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password) {
        res.statusMessage = "Please enter all fields.";
        return res.status(400).send();
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.statusMessage = 'Account successfully created.';
                    res.json(user[0]);
                });
        })
        .then(trx.commit)
        .catch(trx.rollback);  
    })
    .catch(err => {
        res.statusMessage = "Email already exists.";
        res.status(400).send();
    });
}

module.exports = { handleRegister };
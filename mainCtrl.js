var accounts = require('./accounts.json')
module.exports = {
    getAccounts: function(req, res, next) {
        var one = [];
        for (var i = 0; i < accounts.length; i++) {
            var value = true;
            for (var key in req.query) {
                if (accounts[i][key] != req.query[key]) {
                    value = false;
                    break;
                }
            }
            if (value) {
                one.push(accounts[i])
            }
        }
        res.status(200).json(one);
    },
    getAccount: function(req, res, next) {
        let one = [];
        if (parseInt(req.params.Id)) {
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i].id == req.params.Id) {
                    one.push(accounts[i]);
                }
            }
            if (!one.length) return res.status(404).send("account not found")
            res.status(200).json(one[0]);
        }
    },
    postAccount: function(req, res) {
        req.body.approved_states = req.body.approved_states.splice(', ');
        accounts.push(req.body);
        res.status(200).json(req.body);
    },
    putCardType: function(req, res, next) {
        var account;
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].id == req.params.Id) {
                accounts[i].card_type = req.body.card_type;
                account = accounts[i]
            }
        }
        res.status(200).json(account);
    },
    putState: function(req, res, next) {
        var account;
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].id == req.params.id) {
                accounts[i].approved_states.push(req.body.add);
                account = accounts[i];
            }
        }
        res.status(200).json(account);
    },
    deleteState: function(req, res, next) {
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].id == req.params.id) {
                for (var j = 0; j < accounts[i].approved_states.length; j++) {
                    if (accounts[i].approved_states[j] == req.query.state) {
                        accounts[i].approved_states.splice(j, 1);
                    }
                }
            }
        }
        res.status(200).json(accounts);
    },
    deleteAccount: function(req, res, next) {
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].id == req.params.id) {
                accounts.splice(i, 1);
            }
        }
        res.status(200).json(accounts);
    },
    update: function(req, res, next) {
        var one;
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].id == req.params.id) {
                for (var key in req.body) {
                    accounts[i][key] = req.body[key]
                    one = accounts[i];
                }
            }
        }
        res.status(200).send(one)
    }
}

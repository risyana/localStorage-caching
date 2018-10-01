module.exports = {
    "extends": [
        "airbnb-base",
        "prettier"
    ],
    "globals": {
        "window": true,
        "document": true,
        "fetch": true
    },
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": "error"
    }
};
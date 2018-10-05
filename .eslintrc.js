module.exports = {
    "extends": [
        "airbnb-base",
        "prettier"
    ],
    "globals": {
        "window": true,
        "document": true,
        "fetch": true,
        "describe": true,
        "it": true,
        "before": true,
        "after": true
    },
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": "error"
    }
};
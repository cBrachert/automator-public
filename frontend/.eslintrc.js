
module.exports = {

    'env': {
        'browser': true,
        'node': true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        "ecmaVersion": 8,
        'ecmaFeatures': {
            
        },
        'sourceType': 'module'
    },
    'rules': {
        'indent': ['error', 4, {
            'SwitchCase': 1
        }],
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'brace-style': ['error', '1tbs'],
        'array-bracket-spacing': ['error', 'never'],
        'camelcase': ['error', {'properties': 'always'}],
        'keyword-spacing': ['error'],
        'eol-last': ['error'],
        'no-trailing-spaces': ['error'],
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'no-var': 'error'
    },
    'globals': {
        '$': true,
        'angular': true
    }

}

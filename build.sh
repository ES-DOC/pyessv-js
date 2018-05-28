export PYESSV_JS_HOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $PYESSV_JS_HOME
webpack --config=./webpack.config.js --mode=production

class Utils {
    /**
     * Simplifies async-await try-catch
     * @param {Promise} promise The promise.
     * @returns {any} The array of [ err, data ].
     * @memberof Util
     */
    invoker(promise) {
        return promise
            .then((data) => {
                return [null, data];
            })
            .catch((err) => {
                return [err, null];
            });
    }
}
module.exports=Utils;

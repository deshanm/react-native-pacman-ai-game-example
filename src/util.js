
/**
 * [description]
 * @param  {int} ms milliseconds ...
 * @return {Promise}
 */
export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

import arms from '../connectors/Arms'
import * as auth from '../redux/auth'

function callFun(fn, res, dispatch, getState) {
    if (typeof fn === 'function') {
        return fn(res, dispatch, getState)
    }
}

function callFunNoParam(fn, dispatch, getState) {
    if (typeof fn === 'function') {
        return fn(dispatch, getState)
    }
}

/*
 * When something goes wrong. Like http 500, 404, 403 and etc
 */
function failHandler(dispatch, getState, onErr, onFin, error) {
    if (!onErr || callFun(onErr, error, dispatch, getState) !== true) {
        // seems error not processed, let's show error
        console.warn((error && error.message) ||
            error || 'Something goes wrong')
    }
    callFunNoParam(onFin, dispatch, getState)
}

export default function worker(
    proc,
    params,
    { onBeg, onOk, onErr, onFin } = {},
    withDelay = true
) {
    return (dispatch, getState) => {
        const { tokens } = getState().auth
        const authToken = tokens ? tokens.auth : '?'
        const refreshToken = tokens ? tokens.refresh : '?'

        callFunNoParam(onBeg, dispatch, getState)

        const procOk = (res) => {
            const okRes = res.result || res
            const hasCode = Object.prototype.hasOwnProperty.call(res, 'code')
            const isOk = !hasCode || res.code === 0
            setTimeout(() => {
                callFun(isOk ? onOk : onErr || (() => {
                    console.warn(res.error.message)
                }), okRes, dispatch, getState)
                callFunNoParam(onFin, dispatch, getState)
            }, withDelay ? 1000 : 0)
        }

        const procFail = failHandler.bind(null, dispatch, getState, onErr, onFin)

        const procTokensRefreshed = (newTokens) => {
            if (newTokens) {
                dispatch(auth.setTokens(newTokens))
            } else {
                callFunNoParam(onFin, dispatch, getState)
            }
        }

        let args = []
        args.push(authToken)
        if (Array.isArray(params)) {
            args = args.concat(params)
        } else if (params !== null) {
            args.push(params)
        }
        args.push(procOk, procFail, refreshToken, procTokensRefreshed)
        proc.apply(arms, args)
    }
}

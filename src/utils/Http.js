import { Platform } from 'react-native'
import { getErrorFromJson } from './Errors'
import Platforms from '../enums/Platforms'

export function requestArms(method, url, onOk, onFail, resultModifier) {
    const baseUrl = 'https://arms.kz/';
    const apiUrl = `${baseUrl}api/v1/`;
    const requestUrl = `${apiUrl}${url}`;

    const platform = Platform.select({
        [Platforms.IOS]: 'iOS',
        [Platforms.ANDROID]: 'Android'
    });
    fetch(requestUrl, { method, headers: { 'User-Agent': `Arms.kz ${platform} v0.01` } })
        .then((response) => {
            const contentType = response.headers.get('Content-Type') || '';
            const isJson = contentType.includes('application/json');
            let invalidContentType = false;

            if (response.ok) {
                if (isJson) {
                    response.json().then((responseJson) => {
                        let result = responseJson;
                        if (resultModifier) {
                            result = resultModifier(responseJson);
                        }
                        onOk(result);
                    });
                } else {
                    invalidContentType = true;
                }
            } else if (isJson) {
                response.json().then((responseJson) => {
                    if (onFail) {
                        onFail(responseJson);
                    }
                    console.warn(getErrorFromJson(responseJson));
                });
            } else {
                invalidContentType = true;
            }

            if (invalidContentType) {
                return Promise.reject(new Error(`Invalid content type: ${contentType}`));
            }
        })
        .catch((error) => {
            if (onFail) {
                onFail(error);
            }
            console.warn(error.message);
        });
}
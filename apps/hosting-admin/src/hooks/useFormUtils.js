import { useEffect } from 'react';
import { get, isEmpty, isString, toNumber } from 'lodash';
export const useFormUtils = ({ errors, schema }) => {
    useEffect(() => {
        if (!isEmpty(errors))
            scrollIntoError();
    }, [errors]);
    const scrollIntoError = () => {
        const formItemErrors = document.getElementsByClassName('scroll-error-anchor');
        if (formItemErrors.length) {
            formItemErrors[0]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };
    const eventInputNumber = (e) => {
        const { value } = e.target;
        if (toNumber(value) < 0) {
            return toNumber(value.slice(1));
        }
        return value ? toNumber(value) : null;
    };
    const errorDetail = (name) => errors && get(errors, name);
    const errorMessage = (name) => {
        const message = get(errors, `${name}.message`);
        return isString(message) ? message : undefined;
    };
    const error = (name) => !!get(errors, name);
    const required = (name) => {
        if (!schema)
            return false;
        const describe = schema.describe();
        const path = name.split('.');
        let current = describe;
        for (const key of path) {
            if (!current?.fields?.[key])
                return false;
            current = current.fields[key];
        }
        const tests = current?.tests ?? [];
        return tests.some((test) => test.name === 'required');
    };
    const eventCheckbox = (e) => e.target.checked;
    return {
        error,
        errorMessage,
        errorDetail,
        required,
        eventInputNumber,
        eventCheckbox,
    };
};

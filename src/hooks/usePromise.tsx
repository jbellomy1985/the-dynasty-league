import {useCallback, useEffect, useMemo, useState} from "react";

export type TApiResponse = Array<any>;

export default function usePromise(promise: Function, deps: Array<any>): TApiResponse {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [retry, setRetry] = useState<any | null>(null);

    const retryPromise = useCallback(() => {
        setRetry(Symbol("usePromise Retry Promise"));
    }, []);

    const getApiData = async () => {
        setLoading(true);
        try {
            const apiResponse = await promise();
            setData(apiResponse);
        } catch (error: any) {
            setError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        setData(null);
        setError(null);
        getApiData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, retry]);

    const response = useMemo(() => data, [data]);

    return [response, loading, error, retryPromise];
}
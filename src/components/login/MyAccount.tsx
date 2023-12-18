import React, { useEffect } from "react";

// Hooks
import { useAuthUserAttributes } from "../../hooks";

function MyAccount() {

    const [userAttributes] = useAuthUserAttributes();

    useEffect(() => {
        console.log(userAttributes);
    }, [userAttributes]);

    return (
        <div>Under Construction</div>
    )
}

export default React.memo(MyAccount);
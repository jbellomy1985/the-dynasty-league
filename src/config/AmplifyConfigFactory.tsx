export enum VerificationMethod {
    link,
    code
}

export enum AWSResponseType {
    link,
    code
}

function getVerificationMethod(method: VerificationMethod) {
    switch(method) {
        case VerificationMethod.link:
            return "link";
        case VerificationMethod.code:
            return "code";
        default:
            return "";
    }
}

function getResponseType(method: AWSResponseType) {
    switch(method) {
        case AWSResponseType.link:
            return "link";
        case AWSResponseType.code:
            return "code";
        default:
            return "";
    }
}

/**
 * Factory generator for an Amplify Config.
 */
export default class AmplifyConfigFactory {
    static userPoolId: string;
    static userPoolClientId: string;
    static signUpVerificationMethod: string;
    static domain: string;
    static scopes: Array<string>;
    static responseType: string;

    /**
     * @param {string} userPoolId The userPoolId for AWS Cognito User Pool
     * @returns {AmplifyConfigFactory} Returns the ConfigFactory for chaining
     */
    static withUserPoolId(userPoolId: string) {
        this.userPoolId = userPoolId;
        return this;
    }

    /**
     * @param {string} userPoolClientId The userPoolClientId for AWS Cognito User Pool
     * @returns {AmplifyConfigFactory} Returns the ConfigFactory for chaining
     */
    static withUserPoolClientId(userPoolClientId: string) {
        this.userPoolClientId = userPoolClientId;
        return this;
    }

    /**
     * @param {VerificationMethod} signUpVerificationMethod The sign up method to be used for AWS Cognito User Pool (link, or code)
     * @returns {AmplifyConfigFactory} Returns the ConfigFactory for chaining
     */
    static withSignUpVerificationMethod(signUpVerificationMethod: VerificationMethod) {
        this.signUpVerificationMethod = getVerificationMethod(signUpVerificationMethod);
        return this;
    }

    /**
     * @param {string} domain The OAuth domain for the AWS Cognito User Pool
     * @returns {AmplifyConfigFactory} Returns the ConfigFactory for chaining
     */
    static withDomain(domain: string) {
        this.domain = domain;
        return this;
    }

    /**
     * @param {Array<string>} scopes The scopes to be used for the OAuth domain for the AWS Cognito User Pool
     * @returns {AmplifyConfigFactory} Returns the ConfigFactory for chaining
     */
    static withScopes(scopes: Array<string>) {
        this.scopes = scopes;
        return this;
    }
    
    /**
     * @param {AWSResponseType} responseType Response type (link, code) for Auth verifications (sign in, reset password, etc..)
     * @returns {AmplifyConfigFactory} Returns the ConfigFactory for chaining
     */
    static withResponseType(responseType: AWSResponseType) {
        this.responseType = getResponseType(responseType);
        return this;
    }

    /**
     * @returns {Object} Returns object repesentation of Amplify Config
     */
    static getConfig(): Record<string, any> {
        return {
            Auth: {
                Cognito: {
                    userPoolId: this.userPoolId,
                    userPoolClientId: this.userPoolClientId,
                    signUpVerificationMethod: this.signUpVerificationMethod,
                    loginWith: {
                        oauth: {
                            domain: this.domain,
                            scopes: this.scopes,
                            redirectSignIn: ["https://jbellomy1985.github.io/the-dynasty-league"],
                            redirectSignOut: ["https://jbellomy1985.github.io/the-dynasty-league"],
                            responseType: this.responseType
                        }
                    }
                }
            }
        };
    }
}
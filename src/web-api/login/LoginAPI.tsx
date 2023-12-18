import {
    getCurrentUser,
    signIn,
    signOut,
    type SignInInput,
    type UpdatePasswordInput,
    updatePassword,
    type ConfirmSignInInput,
    confirmSignIn,
    resetPassword,
    type ResetPasswordInput,
    type ConfirmResetPasswordInput,
    confirmResetPassword,
    fetchAuthSession
} from 'aws-amplify/auth';

class LoginAPI {
    getCurrentAuthenticatedUser() {
        return getCurrentUser();
    }

    getCurrentSession() {
        return fetchAuthSession()
    }

    handleSignIn({ username , password }: SignInInput) {
        return signIn({ username, password });
    }

    handleConfirmSignIn({ challengeResponse }: ConfirmSignInInput) {
        return confirmSignIn({ challengeResponse })
    }

    handleUpdatePassword({ oldPassword, newPassword }: UpdatePasswordInput) {
        return updatePassword({ oldPassword, newPassword });
    }

    handleResetPassword({ username }: ResetPasswordInput) {
        return resetPassword({ username });
    }

    handleConfirmResetPassword({ username, confirmationCode, newPassword }: ConfirmResetPasswordInput) {
        return confirmResetPassword({ username, confirmationCode, newPassword });
    }

    handleSignOut(signOutAll: boolean = false) {
        return signOut({ global: signOutAll });
    }
}

// eslint-disable-next-line
export default new LoginAPI();
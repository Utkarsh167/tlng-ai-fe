
export const VALIDATION_MESSAGES = {
    "confirm password": {
        matchPassword: "Confirm password is not matched with new password"
    }
}
export const POPUP_MESSAGES = {
    ok: 'Ok',
    close: 'Close',
    confrim: 'Confirmation',
    no: 'No',
    yes: 'Yes',
    passwordResetTitle: 'Reset Password',
    passwordResetLink: 'Password reset link has been sent to registered email id . Please follow the link to reset password .',
    profileEdited: 'Profile has been Edited successfully.',
    passwordChanged: 'Password has been changed successfully.',
    passwordChangedTitle: 'Change Password',
    invalidResetPasswordLink: 'Reset password link is expired',
    logout: 'Logout',
    logoutConfirmation: 'Do you wish to logout?',
    // Added logoutConfirmationOnchangePasswordPage - Shivakumar A
    logoutConfirmationOnchangePasswordPage: 'You will be logged out!',
    completeProfile: 'Please complete your profile',
    notify: 'Do you want to notify user?',
    profileComplete: 'Please add the address of your office and at least one shift to continue.',
    forgotPasswordTitle: "Forgot Your Password? Don't worry send us your registered email address and we will send you steps to reset your password."
};

export const ADD_DRIVER_MESSAGES = {
    driverImage: 'Please upload a driver image',
    dlFront: 'Please upload a DL front image',
    dlRear: 'Please upload a DL rear image',
    leftPalm: 'Please upload a left palm image',
    rightPalm: 'Please upload a right palm image',
    addressProof: 'Please upload a address proof'
};

export const ADD_VENDOR_MESSAGES = {
    vendorImage: 'Vendor profile image is required'
};

export const ADD_CAB_MESSAGES = {
    selectVendor: 'Please select a vendor',
    selectDriver: 'Please select a driver'
};

export const CAB_ASSIGNED = 'This cab is assigned to some drivers.';
export const MAXIMUM_LIMIT = 'Maximum Limit has been reached.';
export const ALL_FIELDS_MANDATORY = 'Please fill required fields.';
export const PARKED_LONG = 'Parked for long time!';

// export const COMPANY_BLOCK = 'This cab is assigned to some drivers. Do you still want to delete this cab ?';

export const DRIVER_ASSIGNED = 'This driver is assigned to some cabs. Do you still want to delete this driver ?';

export const UNASSIGN_DRIVER = (driver, cab) => `Do you want to unassign ${driver} from ${cab} cab`;

export const DRIVER_UNASSIGNED = 'Driver unassigned successfully';

export const invalidFileError = (message = 'jpeg/png images') => `Only ${message} are allowed`;

export const invalidFileSize = (size = 4) => `File size can not be more than ${size} MB`;

export const COMMON_MESSAGES = {
    ADDED: (type) => toTitleCase(type) + " has been added successfully",
    DELETE: (type) => toTitleCase(type) + " has been deleted successfully",
    UPDATED: (type) => toTitleCase(type) + " has been updated successfully",
    UPLOADED: (type) => toTitleCase(type) + " has been uploaded successfully",
    VEHICLE_MUST: (type) => toTitleCase(type) + " must enter atleast one vehicle",

    BLOCKED: {
        confirm: (type) => `Do you want to Blacklist this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been blacklisted successfully`
    },
    UNBLOCKED: {
        confirm: (type) => `Do you want to whitelist this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been whitelisted successfully`
    },
    DELETED: {
        confirm: (type) => `Do you want to delete this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been deleted successfully`
    },
    // Added REMOVED object - Shivakumar A
    REMOVED: {
        confirm: (type) => `Do you want to remove this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been removed successfully`
    },
    ARCHIVE: {
        confirm: (type) => `Do you want to archive this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been archive successfully`
    },
    APPROVED: {
        confirm: (type) => `Do you want to approved this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been approved successfully`
    },
    MERGE: {
        confirm: (type) => `Do you want to merge this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been merge successfully`
    },
    DISSOLVE: {
        confirm: (type) => `Do you want to dissolve this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been dissolve successfully`
    },
    REGENRATE: {
        confirm: (type) => `Do you want to regenrate this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been regenrate successfully`
    },
    SEND: {
        confirm: (type) => `Do you want to send this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been send successfully`
    },
    REJECT: {
        confirm: (type) => `Do you want to reject this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been reject successfully`
    },
    REJECTED: {
        confirm: (type) => `Do you want to reject this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been reject successfully`
    },
    RESOLVE: {
        confirm: (type) => `Do you want to resolve this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been resolve successfully`
    },

    CANCELLED: {
        confirm: (type) => `Do you want to cancel this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been cancel successfully`
    },

    UPDATEDGROUP: {
        confirm: (type) => `Do you want to update this ${type.toLowerCase()}?`,
        success: (type) => `${toTitleCase(type)} has been updated successfully`
    }

};

export const SOMETHING_WENT_WRONG = 'Something went wrong , Please try again later.';

export const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
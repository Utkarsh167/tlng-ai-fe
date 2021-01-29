import * as routes from "./routes";
import { ENTRYLOG_LIST } from './urls';

export const LOGIN = `/${routes.ACCOUNT}/${routes.LOGIN}`;

export const FORGOT_PASSWORD = `/${routes.ACCOUNT}/${routes.FORGOT_PASSWORD}`;

export const RESET_PASSWORD = `/${routes.ACCOUNT}/${routes.RESET_PASSWORD}`;

export const SETTINGS = `/${routes.ADMIN}/${routes.SETTINGS}`;

export const ADMIN_PROFILE = `/${SETTINGS}/${routes.ADMIN_PROFILE}`;

export const CHANGE_PASSWORD = `/${SETTINGS}/${routes.CHANGE_PASSWORD}`;

export const EDIT_PROFILE = `/${SETTINGS}/${routes.EDIT_PROFILE}`;

export const ADMIN_NAME = `/${routes.ADMIN}`;

export const EMPLOYEES = `/${ADMIN_NAME}/${routes.EMPLOYEES}`;

export const EMPLOYEES_LIST = `/${ADMIN_NAME}/${routes.EMPLOYEES}/${routes.EMPLOYEES_LIST}`;

export const DRIVER = `/${ADMIN_NAME}/${routes.ENTRY_LOG}/${routes.ENTRY_LOG_LIST}`;

// export const VENDOR = `/${ADMIN_NAME}/${routes.VENDOR}`;
export const GUARD = `/${ADMIN_NAME}/${routes.ENTRY_LOG}`;


// export const CAB = `/${ADMIN_NAME}/${routes.CAB}`;

export const VEHICLE = `/${ADMIN_NAME}/${routes.VEHICLE}/${routes.VEHICLE_LIST}`;

export const ADD_EMPLOYEE = `/${ADMIN_NAME}/${routes.EMPLOYEES}/${routes.ADD}`;

export const ARCHIVED_EMPLOYEE = `/${ADMIN_NAME}/${routes.EMPLOYEES}/${routes.ARCHIVE}`;

export const EDIT_EMPLOYEE = `/${ADMIN_NAME}/${routes.EMPLOYEES}/${routes.EDIT}`;

export const ADD_ENTRY_LOG = `/${ADMIN_NAME}/${routes.ENTRY_LOG}/${routes.ADD}`;

export const ARCHIVED_ENTRY_LOG = `/${ADMIN_NAME}/${routes.ENTRY_LOG}/${routes.ARCHIVE}`;

export const EDIT_ENTRY_LOG = `/${ADMIN_NAME}/${routes.ENTRY_LOG}/${routes.EDIT}`;




export const ADD_VEHICLE = `/${ADMIN_NAME}/${routes.VEHICLE}/${routes.ADD}`;

export const ARCHIVED_VEHICLE = `/${ADMIN_NAME}/${routes.VEHICLE}/${routes.ARCHIVE}`;

export const EDIT_VEHICLE = `/${ADMIN_NAME}/${routes.VEHICLE}/${routes.EDIT}`;

export const DASHBOARD = `/${routes.ADMIN}/${routes.DASHBOARD}`;

export const DASHBOARD_LIST = `/${routes.ADMIN}/${routes.DASHBOARD}/${routes.DASHBOARD_LIST}`;



export const ADMIN_NOTIFICATION = `/${routes.ADMIN}/${routes.MAINNOTI}`;

export const WEBNOTIFICATION = `${ADMIN_NOTIFICATION}/${routes.NOTI_LIST}`;

export const NOTIFICATION = `${ADMIN_NOTIFICATION}/${routes.NOTI}`;

export const ADD_NOTIFICATION = `${ADMIN_NOTIFICATION}/${routes.ADD}`;

export const EDIT_NOTIFICATION = `/${ADMIN_NOTIFICATION}/${routes.EDIT}`;



export const SUBADMIN = `/${routes.ADMIN}/${routes.SUBADMIN}`;

export const SUBADMIN_LIST = `/${routes.ADMIN}/${routes.SUBADMIN}/${routes.SUBADMIN_LIST}`;

export const SUBADMIN_ADD = `/${routes.ADMIN}/${routes.SUBADMIN}/${routes.SUBADMIN_ADD}`;

export const SUBADMIN_EDIT = `/${routes.ADMIN}/${routes.SUBADMIN}/${routes.SUBADMIN_EDIT}`;

export const SUBADMIN_DETAIL = `/${routes.ADMIN}/${routes.SUBADMIN}/${routes.SUBADMIN_DETAIL}`;



export const AUDITS = `/${routes.ADMIN}/${routes.AUDITS}`;

export const REAL_TIME = `/${routes.ADMIN}/${routes.REAL_TIME}`;

export const SUBADMIN_ARCHIVE = `/${routes.ADMIN}/${routes.SUBADMIN}/${routes.SUBADMIN_ARCHIVE}`;

export const REPORTS = `/${routes.ADMIN}/${routes.REPORTS}`;

export const REPORTS_LIST = `/${routes.ADMIN}/${routes.REPORTS}`


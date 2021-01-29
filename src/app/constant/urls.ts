// tslint:disable-next-line:no-namespace
export const LOGIN = "admin/login";
export const FORGOT_PASSWORD = "admin/forgot-password";
export const CHANGE_PASSWORD = "admin/change-password";
export const ADMIN = "admin";
export const EDIT_ADMIN = "admin/settings/put";

export const ADMIN_DETAIL = "admin/profile";
export const RESET_PASSWORD = "common/change-forgot-password";
export const LOGOUT = "admin/logout";
export const VALIDATE_TOKEN = "common/verify-token";
// export const ADD_EMPLOYEE = "user/employee";
export const ADD_EMPLOYEE = "user/empVehicleSignup";
export const EDIT_EMPLOYEE = "user/employee";
export const VENDOR = "vendor";
export const VENDOR_LIST = "vendor/list";
export const VENDOR_DETAIL = "vendor/details";
export const BLOCK_VENDOR = "vendor/block/";
export const ADD_DRIVER = "user/driver";

export const USER_LIST = "user/list";
export const USER_DETAIL = "user/details";
export const USER = "user/";
export const USER_BY_ID = "user/employeeByEmpId";
export const BLOCK_USER = "user/block/";
export const CAB = "cab";
export const VEHICLE = "user/vehicleSignup";
export const LOCATION_NAMES = "admin/locations/getName"

export const CAB_LIST = "cab/list";
export const VEHICLE_LIST = "vehicle/list";
export const VEHICLE_EDIT = "vehicle/editVehicle";

export const ENTRYLOG_LIST = "entryLog/list"
export const ENTRYLOG_MANUAL_DETAIL = "entryLog/details"
export const ENTRYLOG_EDIT = "entryLog/edit";

export const ENTRYLOG_MANUAL_ENTRY = "entryLog/manualEntry"
 

export const CAB_ONLINE_LIST = "/cab/onlinelist";
// export const CAB_DETAIL = "cab/details";
export const VEHICLE_DETAIL = "vehicle/details";

// export const BLOCK_CAB = "cab/block/";
export const BLOCK_VEHICLE = "vehicle/block/";

export const DRIVER_SEARCH = "user/driver";
export const CAB_MAPPING = "cab/driverMapping";
export const CAB_DRIVER_MAPPING = "cab/driverMapped";
export const SINGLE_CAB_DEATIL = "cab/roaster";
export const GET_ALL_CAB_LIST = "cab/roasterList";
export const GET_ALL_NOTI_LIST = "webNotification";
export const UPLOAD_BULK_EMP = "user/bulkEmpVehicleSignup";
export const CREATE_GROUP = "routingAlgo";
export const NEW_CREATE_GROUP = "newEmpRoute";
export const GET_ALL_GROUPS = "route/list";
export const APPROVE_GROUP = "route/approve";
export const MERGE_GROUP = "route/merge";
export const DISSOLVE_GROUP = "route/dissolve";
export const REGENRATE_GROUP = "route/regenerate";
export const ROUTE_GROUP_NAME = "route/routeName";
export const ADD_NOTIFICATION = "admin-notification";
export const WEB_NOTI_LIST = "admin-notification";
export const DELETE_NOTI = "admin-notification/";
export const SEND_NOTI = "admin-notification/resend/";
export const NOTI_DETAILS = "admin-notification/details";
export const ADD_SUBADMIN = "sub-admin";
export const SUBADMIN_LIST = "sub-admin";
export const BLOCK_SUBADMIN = "sub-admin/block/";
export const DELETE_SUBADMIN = "sub-admin/";
export const DETAILS_SUBADMIN = "sub-admin/details/";
export const GET_PERMISSION = "admin/permission";
export const GET_ALL_SOS = "sos/list";
export const REJECT_SOS = "sos/reject/";
export const RESOLVE_SOS = "sos/resolve/";
export const GET_ALL_OTHERREQUEST = "userQuery/list";
export const REJECT_OTHER = "userQuery/reject/";
export const RESOLVE_OTHER = "userQuery/resolve/";
export const VENDOR_BULKUPLOAD = "vendor/bulkVendor";
export const DRIVER_BULKUPLOAD = "user/bulkDriver";
export const COMPANY_SHIFT = "cab/companyShift";
export const BULK_CABUPLOAD = "cab/bulkCab";
export const BULK_VEHICLE= "user/bulkVehicle";
export const SCOPE_API= "dashboard/scope";
export const SNAPSHOT_API= "dashboard/timeTrackSnapshot";
export const SNAPSHOT_VACANTS= "dashboard/timeTrackVacants";
export const SNAPSHOT_OCCUPIED= "dashboard/timeTrackOccupiers";
export const GET_LOCATIONS = "admin/locations/get"
export const GET_MANUAL_ENTRIES_COUNT = "entryLog/getUsers/count"
export const OCCUPANCY_VARIATION = "dashboard/historicalAggregate"
export const ANPR_REPORTS = "entryLog/getReportsEntryData"
export const MANUAL_ENTRY_LIST = "entryLog/list"
// inout graph data -- satyam
export const INOUT_GRAPH_DATA = "entryLog/inOutData"

export const GET_FILTERED_CAB = "cab";
export const ROSTER = "roster";
export const GROUP_DETAIL = "route/details";
export const ADD_REMOVE_EMP = "route";
export const GET_ALL_ROSTER = "rosterList/admin";
export const SHIFT_UPDATE = "shiftRequest";
export const SHIFT_REQUEST = "shiftRequest/list";
export const DELETE_SHIFT = "shiftRequest";
export const BULK_UPLOAD_SHIFT = "bulkShiftRequest";
export const GET_UPDATED_REQUEST = "shiftRequest/updatedGroupList";
export const UPDATE_REQUEST = "shiftRequest/rosterUpdate";
export const RESCHEDULED_LIST = "reschedule/list";
export const CANCELLED_LIST = "cancelled/list";
export const GET_CAB_FOR_ROSTER = "cab/drivers";
export const APPROVE_RESCHEDULE = "tripReschedule/accept";
export const CANCEL_RESCHEDULE = "tripReschedule/cancel";
export const GET_ALL_GROUP_FOR_ASSIGN_CAB = "route/processedList";
export const DASHBOARD = "admin/dashboard";
export const TRIP_HISTORY = "admin/dashboardTripHistory";
export const SEARCH_EMPLOYEE_BY_ID = "user/employeeByEmpId";
export const APPROVE_ADDRESS_CHANGE_REQUEST = "user/addressChangeRequest";
export const SWAP_EMPLOYEE = "route/swapEmpOrder";
export const CONTINUE_ROSTER = "rosterContinue";
export const AUDIT_LOGS = "admin/auditLog";
export const REGISTRATION_UNIQUE = "cab/isUniqueRegistarionNo";
export const CAB_BADGE_UNIQUE = "cab/isUniqueCabBadgeNo";
export const CHECK_EMPLOYEE_NUMBER_UNIQUE = "user/isUniqueMobileNo";
export const CHECK_DRIVER_NUMBER_UNIQUE = "user/isUniqueMobileNo";
// No show api route - Shivakumar A
export const NOSHOW_LIST = "noshow/list";
// empForGroup - satyam
export const EMP_FOR_GROUP = "user/getEmployeeForGroup";
// userlist with approved address - satyam
export const CURRENT_USER_LIST = "user/currentList";
export const DASHBOARD_DATA = "dashboard/cardData";
import { AccountGuard } from "../guards/account.guard";
import { HomeGuard } from "../guards/home.guard";

export const ACCOUNT_GUARD = { canLoad: [AccountGuard], canActivate: [AccountGuard] };

export const HOME_GUARD = { canLoad: [HomeGuard], canActivate: [HomeGuard] };
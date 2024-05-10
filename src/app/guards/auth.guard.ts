import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (route, state) => {
  const api=inject(ApiCallService)
  const tostr=inject(ToastrService)
  const router=inject(Router)

  if(api.isLoggedIn()){
    return true;

  }else{
    tostr.warning("Please Login First..!!")
    router.navigateByUrl('/log')
    return false
  }

};

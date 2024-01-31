import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let role : string = "test" ; 
  if(role === "admin")
  {
    return true;
  }
  else
  {
    return false;
  }
  
};

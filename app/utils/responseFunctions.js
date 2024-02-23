export const isErrorful = (res)=> {
  if("error" in res || "errors" in res){
    return true;
  }
  return false;
};

export const getError = (res)=> {
  if("error" in res) {
    return {errors : [{message: res.error}]};
  }
  return {errors: res.errors.map((err)=> {return { message: err.field + " " + err.message};})};
};
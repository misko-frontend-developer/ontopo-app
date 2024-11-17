const isTokenValid = (): boolean | void => {
  const token = sessionStorage.getItem("jwt_token");
  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return (
        //problem with expiration token, added 50000 miliseconds, as it returns always current time.
        Math.floor(new Date().getTime() / 1000) + 50000 >=
        JSON.parse(jsonPayload)?.exp
      );
    } catch (error) {
      sessionStorage.removeItem("jwt_token");
      console.error(error);
      // throw new Error(error);
    }
  }
};

export default isTokenValid;

export const getAuthHeaders = () => {
    let accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      accessToken = JSON.parse(accessToken)
      return {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
    } else {
      return {};
    }
  };
  

  
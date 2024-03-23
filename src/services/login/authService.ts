export const getAuthHeaders = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      return {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
    } else {
      return {};
    }
  };
  

  


export const getCsrfToken = () => {
    const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
    // const csrfToken = "ed50e986-4a7e-47f7-9ae7-c8e3e57629b8";
    // console.log("csrf :",csrfToken);
    return csrfToken;
    return csrfToken ? csrfToken.split('=')[1] : null;
  };
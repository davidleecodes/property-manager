import serverPath from "./server";

export async function login(email, password, loginType) {
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, loginType }),
    credentials: "include",
  };
  return await fetch(`${serverPath}/auth/login`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function loginWithCookies() {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/auth/user`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function logoutAPI() {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/auth/logout`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function newUser(values) {
  let formData = new FormData();
  const { image_url, ...data } = values;
  formData.append("file", image_url);
  formData.append("data", JSON.stringify(data));

  const fetchOptions = {
    method: "POST",
    credentials: "include",
    body: formData,
  };
  return await fetch(`${serverPath}/auth/register`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function editUser(user_id, tenant_id, values) {
  let formData = new FormData();
  formData.append("file", values.image_url);
  values.tenant_id = tenant_id;
  formData.append("data", JSON.stringify(values));

  const fetchOptions = {
    method: "PATCH",
    credentials: "include",
    body: formData,
  };
  return await fetch(`${serverPath}/auth/edit/${user_id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function deleteUser(user_id) {
  const fetchOptions = {
    method: "Delete",
    credentials: "include",
  };
  return await fetch(`${serverPath}/auth/delete/${user_id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

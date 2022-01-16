import serverPath from "./server";

export async function getTenants() {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/tenant`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function getTenantForId(id) {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/tenant/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function newTenant(values) {
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

export async function editTenant(user_id, tenant_id, values) {
  let formData = new FormData();
  formData.append("file", values.image_url);
  values.tenant_id = tenant_id;
  formData.append("data", JSON.stringify(values));

  const fetchOptions = {
    method: "PATCH",
    credentials: "include",
    body: formData,
  };
  return await fetch(`${serverPath}/user/edit/${user_id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function deleteTenant(id) {
  const fetchOptions = {
    method: "Delete",
    credentials: "include",
  };
  return await fetch(`${serverPath}/tenant/delete/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

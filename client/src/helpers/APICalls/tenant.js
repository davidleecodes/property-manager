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
  return await fetch(`${serverPath}/user/new`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

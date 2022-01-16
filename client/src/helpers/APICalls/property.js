import serverPath from "./server";

export async function getProperties() {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/property`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function getPropertyForId(id) {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/property/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function newProperty(values) {
  let formData = new FormData();
  const { image_url, ...data } = values;
  formData.append("file", image_url);
  formData.append("data", JSON.stringify(data));

  const fetchOptions = {
    method: "POST",
    credentials: "include",
    body: formData,
  };
  return await fetch(`${serverPath}/property/new`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function editProperty(id, values) {
  let formData = new FormData();
  console.log(values);
  const { image_url, units, ...data } = values;
  formData.append("file", image_url);
  data.newUnits = [];
  data.inputUnits = [];
  units.forEach((u) => {
    if (typeof u === "string") {
      data.newUnits.push(u);
    } else {
      data.inputUnits.push(u);
    }
  });
  console.log(data);
  formData.append("data", JSON.stringify(data));

  const fetchOptions = {
    method: "PATCH",
    credentials: "include",
    body: formData,
  };
  return await fetch(`${serverPath}/property/edit/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function deleteProperty(id) {
  const fetchOptions = {
    method: "Delete",
    credentials: "include",
  };
  return await fetch(`${serverPath}/property/delete/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

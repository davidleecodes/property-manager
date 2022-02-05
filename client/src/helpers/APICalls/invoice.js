import serverPath from "./server";

export async function getInvoices() {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/invoice`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Pinvoice try again" },
    }));
}

export async function getInvoiceForId(id) {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/invoice/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Pinvoice try again" },
    }));
}

export async function newInvoice(values) {
  let formData = new FormData();
  formData.append("data", JSON.stringify(values));
  const fetchOptions = {
    method: "POST",
    credentials: "include",
    body: formData,
  };
  return await fetch(`${serverPath}/invoice/new`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Pinvoice try again" },
    }));
}

export async function editInvoice(id, values) {
  let formData = new FormData();
  formData.append("data", JSON.stringify(values));
  for (var value of formData.values()) {
    console.log(value);
  }

  const fetchOptions = {
    method: "PATCH",
    credentials: "include",
    body: formData,
  };
  return await fetch(`${serverPath}/invoice/edit/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Pinvoice try again" },
    }));
}

export async function deleteInvoice(id) {
  const fetchOptions = {
    method: "Delete",
    credentials: "include",
  };
  return await fetch(`${serverPath}/invoice/delete/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Pinvoice try again" },
    }));
}

import { ref, computed, onMounted } from "vue";
import CryptoJS from "crypto-js";

const nth = function (d: any) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatCurrency = (
  locale: string,
  num: number,
  currency: string
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(num);
};

export const formattedDate = (date: string | Date) => {
  const newDate = new Intl.DateTimeFormat("en-ng", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  const suffix = nth(newDate.split(" ")[0]);

  return `${newDate.split(" ")[0]}${suffix} ${newDate.split(" ")[1]} ${
    newDate.split(" ")[2]
  }`;
};

export const shortDate = (date: string | Date) => {
  const newDate = new Intl.DateTimeFormat("en-ng", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

  const suffix = nth(newDate.split(" ")[0]);

  return `${newDate.split(" ")[0]}${suffix} ${newDate.split(" ")[1]} ${
    newDate.split(" ")[2]
  }`;
};

export const formatDate = (date: Date | string | number) => {
  const newDate = new Intl.DateTimeFormat("en-ng").format(new Date(date));

  const suffix = nth(newDate.split(" ")[0]);

  return newDate;
};

export const formatTime = (date: Date | number) => {
  const newDate = new Intl.DateTimeFormat("en-us", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(date));

  const suffix = nth(newDate.split(" ")[0]);

  return newDate;
};

export const rearrangedDate = (date: string | Date) => {
  const newDate = new Intl.DateTimeFormat("en-ng", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

  return newDate;
};

export function truncateString(str: string, n: number) {
  return str && str.length > n ? str.substring(0, n - 1) + "..." : str;
}

export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, "idyNSYnebsieHrEvB").toString();
};

export const decrypt = (text: string) => {
  return CryptoJS.AES.decrypt(text, "idyNSYnebsieHrEvB").toString(
    CryptoJS.enc.Utf8
  );
};

export const getToken = () => {
  return localStorage.getItem("expenseToken");
};

export const getUser = (name: string) => {
  return localStorage[name];
};

export const remove = (name: string) => {
  localStorage.removeItem(name);
};

export const clearAll = () => {
  localStorage.clear();
};

export const logout = () => {
  localStorage.removeItem("expenseToken");
  localStorage.removeItem("user");
  window.location.reload();
};

export const getUserInfo = () => {
  const data = localStorage.getItem("user");
  if (data) return decrypt(data);
};

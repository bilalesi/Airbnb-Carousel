const cloudinaryUrl = (options, url) => {
  if (!url) return url;

  let newUrl;
  // if cloudinary url
  if (url.indexOf("cloudinary.com") > -1) {
    const aUrl = url.split("/");
    const opt = Object.keys(options)
      .reduce((r, k) => [...r, `${k}_${options[k]}`], [])
      .join(",");

    newUrl = [
      ...aUrl.slice(0, aUrl.length - 2),
      opt,
      ...aUrl.slice(aUrl.length - 2)
    ].join("/");
  }

  // if not cloudinary url
  const basUrl = "https://res.cloudinary.com/realadvisor/image/fetch";
  const opt = Object.keys(options)
    .reduce((r, k) => [...r, `${k}_${options[k]}`], [])
    .join(",");
  newUrl = [basUrl, opt, url].join("/");

  // use proxy
  return newUrl.replace(
    "res.cloudinary.com/realadvisor/image",
    "res.realadvisor.ch"
  );
};

export default cloudinaryUrl;

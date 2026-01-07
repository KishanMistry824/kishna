// src/utils/shareUtils.js

export const shareJob = (platform, job) => {
  const jobUrl = window.location.href;
  const message = `🚀 Check out this job: ${job.title} at ${job.company.name}\n📍 ${job.locations[0]?.city}, ${job.locations[0]?.state}\n💰 ${job.salary?.min} - ${job.salary?.max} ${job.salary?.currency}\n\nApply here: ${jobUrl}`;

  let shareLink = "";

  switch (platform) {
    case "linkedin":
      shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;
      break;
    case "whatsapp":
      shareLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
      break;
    case "x":
      shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
      break;
    default:
      return;
  }

  window.open(shareLink, "_blank");
};

export const copyJobLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    return true; // success
  } catch (err) {
    return false; // failed
  }
};

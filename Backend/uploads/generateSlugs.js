const fs = require("fs");
const slugify = require("slugify");

// Load your original jobs JSON
const jobs = require("../../my-portal-app/src/Data/Jobs/Jobs_Data.json");

// Store all slugs to ensure uniqueness
const existingSlugs = new Set();

const jobsWithSlug = jobs.map(job => {
    let baseSlug = slugify(
        [job.title, job.company?.name, job.locations?.[0]?.city].filter(Boolean).join(" "), 
        { lower: true, strict: true }
    );

    if (!baseSlug) baseSlug = job.jobCode;

    let slug = baseSlug;
    let count = 1;

    // Ensure slug is unique
    while (existingSlugs.has(slug)) {
        slug = `${baseSlug}-${count}`;
        count++;
    }

    existingSlugs.add(slug);
    job.slug = slug;

    return job;
});

// Write new JSON with unique slugs
fs.writeFileSync("jobs_ready.json", JSON.stringify(jobsWithSlug, null, 2));
console.log("jobs_ready.json created with unique slugs ✅");

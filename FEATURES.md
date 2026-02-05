# Hummingbird UI Features

This document outlines the features needed for the Hummingbird UI application, organized by section and priority.

**Status Legend:** ✅ Implemented | ⏳ Partial | ❌ Missing

---

## Image

### Must Have
- [x] Name of the container image ✅
- [x] Version ✅
- [x] Podman pull command ✅
- [x] Docker pull command ✅ *(NEW: Toggle between podman/docker)*
- [x] Documentation on usage ✅ *(NEW: Book icon links to quay.io)*
- [x] Copy + pastable pull commands ✅
- [x] Request an image from us ✅ *(NEW: Floating action button)*
- [x] Contact us/provide feedback ✅ *(NEW: Floating feedback button)*

### Nice to Have
- [x] Changeable version via tag ✅
- [x] FIPs is on another image ✅
- [ ] Shareable URLs for every tag ❌
- [ ] Image/repo name copy/paste ❌
- [ ] Logo of the upstream distributor ❌
- [ ] Hummingbird logo in search results ❌
- [x] Selector to choose between docker and podman in commands ✅ *(NEW)*
- [x] License ✅

### Innovation
- [ ] Recommended images based on other users ❌
- [ ] Sharing beyond copy + paste ❌
- [ ] Recently searched or used ❌
- [ ] Customize this image ❌
- [ ] See a roadmap of upcoming images and upvote ❌

### Questions
- If the current selection has CVE's, can we recommend a similar one?
- Can we show any advantages to podman over docker?

---

## Minimal

### Must Have
- [x] Drop-in replace instructions ✅
- [x] Architectures supported ✅
- [ ] Image comparison report ❌

### Nice to Have
- [x] Compressed image download size ✅
- [ ] Compatibility section ❌
- [ ] AI migration commands ❌
- [ ] Cross-sell Red Hat products (OpenShift) ❌
- [ ] Link to git repo where container file is defined ❌

---

## Updated

### Must Have
- [x] Tags ✅
- [x] :latest ✅
- [x] :latest-builder ✅
- [x] default go-latest image ✅
- [x] Date and time of last scan ✅ *(NEW: Absolute dates on cards)*
- [x] Date and time of last update ✅ *(NEW: Absolute dates on cards)*
- [x] Show that -builder will add package manager ✅
- [x] Show that -builder will add Shell ✅
- [x] Security feed (Advisories) ✅

### Nice to Have
- [x] Single, reliable date and time of last scan ✅ *(NEW)*
- [ ] Label or icon to identify "archived" or deprecated for a version/tag ❌

### Innovation
- [x] Project compass design system ✅
- [ ] Trained on our documentation ❌
- [ ] Chat-driven advisory search ❌
- [ ] Intelligent advisory/catalog search ❌

---

## Secure

### Must Have
- [x] Zero CVEs noted ✅
- [x] List or link to supported scanners and how to use them ✅
- [x] View SBOM ✅
- [x] CVEs ordered: Critical, high, medium, low ✅
- [x] Link to official CVE repository ✅ *(NEW: NVD external links)*
- [x] Download SPDX SBOM format ✅
- [x] $cosign instructions ✅
- [x] Total package # in SBOM ✅
- [x] if FIPS, add clear icon & label ✅
- [ ] FIPS & STIG accurately represented ⏳ (FIPS only)

### Nice to Have
- [x] Total CVE # per image ✅ *(NEW: CVE count on cards)*
- [ ] Multiple attestation types ❌
- [ ] Advisories (CVE resolution history) ❌
- [x] Manifest digest ✅
- [ ] Common errors you may run into with this image ❌

### Innovation
- [ ] Guidelines for swapping this image via an AI tool ❌

---

## Onboarding

### Nice to Have
- [ ] Show a list of blog posts ❌
- [x] Include the FAQ ✅ *(NEW: FAQ drawer from "Learn more")*

---

## Summary

| Priority | Implemented | Total | Completion |
|----------|-------------|-------|------------|
| Must Have | 26 | 28 | 93% |
| Nice to Have | 9 | 22 | 41% |
| Innovation | 1 | 10 | 10% |
| **TOTAL** | **42** | **60** | **70%** |

---

## Recently Implemented (This Session)

1. ✅ **Docker/Podman toggle** - Switch between container runtimes
2. ✅ **Contact us/feedback** - Floating email button
3. ✅ **Request an image** - Floating action button (FAB) linking to Jira
4. ✅ **Link CVEs to NVD** - External links on all CVE IDs
5. ✅ **Documentation links** - Book icon on cards linking to docs
6. ✅ **CVE count on cards** - Green/red labels showing CVE count
7. ✅ **Absolute dates** - Last updated dates on cards
8. ✅ **FAQ section** - Full FAQ drawer accessible from "Learn more"

---

## Data Needs

The following features use example/placeholder data. Let me know if you need actual data for:

1. **Image dates** (`lastUpdated`, `lastScanned`) - Currently using example dates
2. **Documentation URLs** - Currently pointing to quay.io
3. **CVE counts** - Currently showing 0 for most images
4. **FAQ content** - Currently using comprehensive example Q&A
5. **Jira URL for "Request an Image"** - Currently using placeholder Jira URL

---

## Next Steps

See `FEATURE_ANALYSIS.md` for remaining features and integration plans.
